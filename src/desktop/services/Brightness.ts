import { debounce } from 'src/utils/debounce'

type CallbackType = (_: any, ...args: any) => void

/**
 * Brightness service.
 *
 * Performance notes:
 * - Reading is done by reading the sysfs file directly (cheap, no fork).
 * - Writing is done asynchronously via `light -S` (when sysfs backlight is
 *   present) or `ddcutil setvcp` (fallback). Async is critical: a synchronous
 *   exec blocks the AGS event loop for ~80ms per change, which freezes the UI
 *   when keybinds repeat (binde fires ~30 times/sec while held).
 * - Writes are coalesced via debounce: only the most recent target value gets
 *   flushed to the hardware, regardless of how many slider/keybind events
 *   fire. This is what makes rapid F1/F2 spam feel snappy.
 * - We DO NOT monitor the sysfs file: the kernel updates it after our own
 *   write, which would loop back and trigger another re-read. We are the only
 *   writer that matters.
 */
class BrightnessService extends Service {
  static {
    Service.register(
      this,
      { 'intensity-changed': ['float'] },
      { 'intensity': ['float', 'rw'] },
    )
  }

  // Detect which backend to use. `ls -w1` is fine on Linux.
  #interface = (() => {
    try {
      const out = Utils.exec("sh -c 'ls -w1 /sys/class/backlight 2>/dev/null | head -1'")
      return out && out.length > 0 ? out.trim() : null
    }
    catch {
      return null
    }
  })()

  #brightnessFile = this.#interface ? `/sys/class/backlight/${this.#interface}/brightness` : null
  #maxBrightnessFile = this.#interface ? `/sys/class/backlight/${this.#interface}/max_brightness` : null
  #maxBrightness = 100
  #intensity = 0
  #pendingWrite = false
  #lastWriteAt = 0
  #flushScheduled = false
  #targetValue = -1
  #setScreenValueDebounced: (percent: number) => void

  constructor() {
    super()
    this.#setScreenValueDebounced = debounce(this.#scheduleFlush.bind(this), 40)
    this.#initialize()

    // gate on a timestamp, not a boolean: a stalled DDC write must never
    // disable the sysfs poll permanently
    if (this.#brightnessFile) {
      Utils.interval(2000, () => {
        if (Date.now() - this.#lastWriteAt > 1500) this.#readCurrent()
        return true
      })
    }
  }

  async #initialize() {
    if (this.#interface && this.#maxBrightnessFile) {
      try {
        const maxStr = await Utils.readFileAsync(this.#maxBrightnessFile)
        const max = parseInt(maxStr.trim(), 10)
        if (!isNaN(max) && max > 0) this.#maxBrightness = max
      }
      catch { /* keep default 100 */ }
      this.#readCurrent()
    }
    else {
      // No sysfs backlight: query via ddcutil (slow, only at startup).
      try {
        const out = await Utils.execAsync([
          'bash',
          '-c',
          "ddcutil getvcp 10 --brief --noverify --sleep-multiplier .1 | awk '{print $4}'",
        ])
        const v = parseInt(out, 10)
        if (!isNaN(v)) this.#setIntensity(v)
      }
      catch { /* leave at 0 */ }
    }
  }

  async #readCurrent() {
    if (!this.#brightnessFile) return
    try {
      const raw = await Utils.readFileAsync(this.#brightnessFile)
      const v = parseInt(raw.trim(), 10)
      if (!isNaN(v)) this.#setIntensity(Math.round((v / this.#maxBrightness) * 100))
    }
    catch { /* ignore */ }
  }

  #setIntensity(value: number) {
    if (value === this.#intensity) return
    this.#intensity = value
    this.notify('intensity')
    this.emit('intensity-changed', this.#intensity)
  }

  get intensity() {
    return isNaN(this.#intensity) ? 0 : this.#intensity
  }

  set intensity(percent) {
    percent = Math.max(0, Math.min(Math.round(percent), 100))
    if (percent === this.#intensity) return
    // Update UI immediately for responsiveness.
    this.#setIntensity(percent)
    // Schedule the (potentially slow) hardware write.
    this.#targetValue = percent
    this.#setScreenValueDebounced(percent)
  }

  #scheduleFlush(_percent: number) {
    // _percent is whatever the debouncer received last; #targetValue is the
    // canonical "what we want the screen to be" value.
    if (this.#flushScheduled) return
    this.#flushScheduled = true
    // Defer to next tick so any same-frame writes coalesce.
    Utils.timeout(1, () => {
      this.#flushScheduled = false
      this.#flushIfIdle()
      return false
    })
  }

  #flushIfIdle() {
    if (this.#pendingWrite || this.#targetValue < 0) return
    const value = this.#targetValue
    this.#targetValue = -1
    this.#pendingWrite = true
    this.#lastWriteAt = Date.now()

    const cmd = this.#interface
      ? ['light', '-S', String(value)]
      : ['ddcutil', 'setvcp', '10', String(value), '--noverify', '--sleep-multiplier', '.1']

    Utils.execAsync(cmd)
      .catch(err => console.error('Brightness write failed:', err))
      .finally(() => {
        this.#pendingWrite = false
        this.#lastWriteAt = Date.now()
        // If a newer target arrived while we were writing, flush again.
        if (this.#targetValue >= 0) this.#flushIfIdle()
      })
  }

  connect(event = 'intensity-changed', callback: CallbackType) {
    return super.connect(event, callback)
  }
}

const service = new BrightnessService

export default service

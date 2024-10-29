import { debounce } from 'src/utils/debounce'

type CallbackType = (_: any, ...args: any) => void

class BrightnessService extends Service {
  static {
    Service.register(
      this,
      { 'intensity-changed': ['float'] },
      { 'intensity': ['float', 'rw'] },
    )
  }

  #setScreenValueDebounced: (percent: number) => void
  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'") || null
  #store = this.#interface ? `/sys/class/backlight/${this.#interface}/brightness` : null
  #intensity = 0

  constructor() {
    super()

    // Monitor external changes (available only for backlight interface)
    Utils.monitorFile(this.#store, () => this.#onExternalChange())

    // Debounce setter
    this.#setScreenValueDebounced = debounce(this.#setScreenValue.bind(this))

    // update #intensity at start
    this.#initialize()
  }

  #initialize() {
    if (this.#interface) {
      this.#intensity = parseInt(Utils.exec('light'))
      this.notify('intensity')
      this.emit('intensity-changed', this.#intensity)
    }
    else {
      Utils
        .execAsync(['bash', '-c', "ddcutil getvcp 10 --brief --noverify --sleep-multiplier .1 | awk '{print $4}'"])
        .then(out => {
          this.#intensity = out ? parseInt(out) : 0
          this.notify('intensity')
          this.emit('intensity-changed', this.#intensity)
        })
    }
  }

  get intensity() {
    return isNaN(this.#intensity) ? 0 : this.#intensity
  }

  set intensity(percent) {
    percent = Math.max(0, Math.min(Math.round(percent), 100))

    this.#intensity = percent

    this.#setScreenValueDebounced(percent)
  }

  #setScreenValue(percent: number) {
    if (this.#interface) {
      Utils.exec(`light -S ${percent}`)
    }
    else {
      Utils.exec(`ddcutil setvcp 10 ${percent} --noverify --sleep-multiplier .1`)
    }
    this.notify('intensity')
    this.emit('intensity-changed', this.#intensity)
  }

  #onExternalChange() {
    this.#intensity = parseInt(Utils.exec('light'))

    this.notify('intensity')
    this.emit('intensity-changed', this.#intensity)
  }

  connect(event = 'intensity-changed', callback: CallbackType) {
    return super.connect(event, callback)
  }
}

const service = new BrightnessService

export default service


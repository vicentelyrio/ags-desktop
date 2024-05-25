import { debounce } from "src/utils/debounce"

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
  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")
  #store = `/sys/class/backlight/${this.#interface}/brightness`
  #intensity = 0

  constructor() {
    super()

    // Monitor external changes
    Utils.monitorFile(this.#store, () => this.#onChange())

    // update #screenValue at start
    this.#onChange()

    // Debounce setter
    this.#setScreenValueDebounced = debounce(this.#setScreenValue.bind(this))
  }

  get intensity() {
    return this.#intensity
  }

  set intensity(percent) {
    percent = Math.max(0, Math.min(percent, 100))

    this.#setScreenValueDebounced(percent)
  }

  #setScreenValue(percent: number) {
    Utils.execAsync(`light -S ${percent}`)
  }

  #onChange() {
    this.#intensity = parseInt(Utils.exec('light'))

    this.emit('changed')
    this.notify('intensity')
    this.emit('intensity-changed', this.#intensity)
  }

  connect(event = 'intensity-changed', callback: CallbackType) {
    return super.connect(event, callback)
  }
}

const service = new BrightnessService

export default service

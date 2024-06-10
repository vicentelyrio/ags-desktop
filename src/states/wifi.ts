export const KNOWN_NETWORKS = '/home/vicentelyrio/.config/ags/data/.known_networks'

export type AccessPoint = {
  bssid: string | null
  address: string | null
  lastSeen: number
  ssid: string | null
  active: boolean
  strength: number
  frequency: number
  iconName?: string
}

export const selectedAP = Variable<AccessPoint | null>(null)

export const selectedAPPass = Variable<string | null>(null)

const icon_validating = 'network-wireless-acquiring-symbolic'
const icon_missing = 'network-wireless-no-route-symbolic'
const icon_error = 'network-wireless-disabled-symbolic'
const icon_success = 'network-wireless-signal-good-symbolic'
const timeout = 3000

export function notifyMissing() {
  Utils.notify({
    summary: 'Wi-Fi',
    body: 'Missing credentials',
    iconName: icon_missing,
    timeout
  })
}

export function notifySuccess(ssid: string) {
  Utils.notify({
    summary: 'Wi-Fi',
    body: `Connection established to ${ssid}`,
    iconName: icon_success,
    timeout
  })
}

export function notifyAttempt(ssid: string) {
  Utils.notify({
    summary: 'Wi-Fi',
    body: `Attempting to connect to ${ssid}`,
    iconName: icon_validating,
    timeout
  })
}

export function notifyError(ssid: string, error: string) {
  Utils.notify({
    summary: 'Wi-Fi',
    body: `Error trying to connect to ${ssid}: ${error}`,
    iconName: icon_error,
    timeout
  })
}

// Connect to new
export function connectToNetwork() {
  const { ssid } = selectedAP.value as AccessPoint
  const pass = selectedAPPass.value

  if (!ssid || !pass) return notifyMissing()

  notifyAttempt(ssid)

  Utils
    .execAsync(`nmcli device wifi connect "${ssid}" password "${pass}"`)
    .then(() => {
      notifySuccess(ssid)
      const knownNetworks = Utils.readFile(KNOWN_NETWORKS).split('\n')
      Utils.writeFileSync(knownNetworks.concat(ssid).join('\n'), KNOWN_NETWORKS)
    })
    .catch((error) => { notifyError(ssid, error) })
}

// Connect to new
export function reconnectToNetwork({ ssid }: AccessPoint) {
  if (!ssid) return notifyMissing()

  notifyAttempt(ssid)

  Utils
    .execAsync(`nmcli con up "${ssid}"`)
    .then(() => { notifySuccess(ssid) })
    .catch((error) => { notifyError(ssid, error) })
}

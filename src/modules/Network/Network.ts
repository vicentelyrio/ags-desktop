import { AGS_NETWORK } from 'src/constants/windows'
import { PopupWindow } from 'src/components/PopupWindow/PopupWindow'
import { wifiConnections } from 'src/states/wifi'

type AccessPoint = {
  bssid: string | null
  address: string | null
  lastSeen: number
  ssid: string | null
  active: boolean
  strength: number
  frequency: number
  iconName?: string
}
const network = await Service.import('network')

function Separator() {
  return Widget.Separator({
    vertical: true,
    className: 'network__separator',
  })
}

function Toggle() {
  return Widget.Box({
    className: 'network__toggle',
    hexpand: true,
    children: [
      Widget.Label({
        className: 'network__toggle__label',
        label: 'Wi-Fi',
        hpack: 'start',
        hexpand: true,
      }),
      Widget.Switch({
        className: 'network__toggle__switch',
        state: network.wifi.enabled,
        onActivate: () => network.toggleWifi()
      }),
    ]
  })
}

function NetworkItem(ap: AccessPoint) {
  return Widget.Button({
    onClicked: () => {
      console.log(ap)
    },
    className: ap.active ? 'network__list__item network__list__item--active' : 'network__list__item',
    child: Widget.Box({
      children: [
        Widget.Icon({
          className: 'network__list__item__icon',
          icon: ap.iconName,
          size: 20
        }),
        Widget.Label({
          label: ap.ssid,
          className: 'network__list__item__label',
        })
      ]
    })
  })
}

function Networks(networks: AccessPoint[]) {
  return Widget.Scrollable({
    className: 'network__list__scroll',
    css: `min-height: ${Math.min(networks.length * 46, 600)}px`,
    vscroll: 'automatic',
    hscroll: 'never',
    child: Widget.Box({
      vertical: true,
      children: networks
        .sort((a, b) => b.strength - a.strength)
        .sort((a, b) => a.active === b.active ? -1 : 1)
        .map(NetworkItem)
    })
  })
}

function Wifis() {
  network.wifi.scan()

  const knownNetworks = wifiConnections.value.split('\n')

  let [primaryNetworks, secondaryNetworks] = network.wifi.access_points
    .reduce((acc, ap) => {
      if (knownNetworks.indexOf(String(ap.ssid)) > -1) { acc[0].push(ap) }
      else { acc[1].push(ap) }

      return acc
    }, [[] as AccessPoint[], [] as AccessPoint[]])

  return Widget.Box({
    className: 'network__container',
    vertical: true,
    children: [
      Toggle(),
      Separator(),
      Networks(primaryNetworks),
      Separator(),
      Networks(secondaryNetworks),
    ]
  })
}

export function Network(monitor = 0) {
  return (
    PopupWindow(monitor, {
      name: AGS_NETWORK,
      monitor,
      className: 'network',
      visible: false,
      layer: 'overlay',
      anchor: ['top', 'right'],
      child: Wifis()
    })
  )
}


import { AGS_NETWORK } from 'src/constants/windows'
import { PopupWindow } from 'src/components/PopupWindow/PopupWindow'

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

function Networks() {
  network.wifi.scan()

  return Widget.Scrollable({
    className: 'network__list__scroll',
    vscroll: 'always',
    hscroll: 'never',
    child: Widget.Box({
      vertical: true,
      children: network.wifi.access_points
        .sort((a, b) => b.strength - a.strength)
        .sort((a, b) => a.active === b.active ? -1 : 1)
        .map(NetworkItem)
    })
  })
}

function WifiNetwork() {
  const Separator = Widget.Separator({
    vertical: true,
    className: 'network__separator',
  })

  return Widget.Box({
    className: 'network__container',
    vertical: true,
    children: [
      Toggle(),
      Separator,
      Networks(),
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
      child: WifiNetwork()
    })
  )
}


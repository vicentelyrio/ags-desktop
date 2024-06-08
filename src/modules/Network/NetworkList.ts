import { AGS_NETWORK, AGS_NETWORK_CONFIRM } from 'src/constants/windows'
import { type AccessPoint, selectedAP, reconnectToNetwork } from 'src/states/wifi'

const network = await Service.import('network')

function NetworkItem(ap: AccessPoint, primary: boolean) {
  return Widget.Button({
    onClicked: () => {
      App.closeWindow(AGS_NETWORK)

      if (primary) {
        reconnectToNetwork(ap)
      }
      else {
        selectedAP.setValue(ap)
        App.openWindow(AGS_NETWORK_CONFIRM)
      }
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

function NetworksList(networks: AccessPoint[], primary: boolean) {
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
        .map((ap) => NetworkItem(ap, primary))
    })
  })
}

export function SecondaryNetworks(networks: AccessPoint[]) {
  if (!network.wifi.enabled) return Widget.Box()

  if (!networks.length) {
    return Widget.Button({
      className: 'network__list__scan',
      label: 'Scan networks',
      hpack: 'start',
      hexpand: true,
      onClicked: network.wifi.scan
    })
  }

  return NetworksList(networks, false)
}

export function PrimaryNetworks(networks: AccessPoint[]) {
  if (!networks.length || !network.wifi.enabled) {
    return Widget.Label({
      className: 'network__list__empty',
      label: 'Not connected',
      hpack: 'start',
      hexpand: true,
    })
  }

  return NetworksList(networks, true)
}


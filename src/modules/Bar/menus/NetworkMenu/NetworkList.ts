import { AGS_BAR_NETWORK_MENU, AGS_BAR_NETWORK_MENU_CONFIRM } from 'src/constants/windows'
import { type AccessPoint, selectedAP, reconnectToNetwork } from 'src/states/wifi'

const network = await Service.import('network')

function NetworkItem(ap: AccessPoint, primary: boolean) {
  return Widget.Button({
    onClicked: () => {
      App.closeWindow(AGS_BAR_NETWORK_MENU)

      if (primary) {
        reconnectToNetwork(ap)
      }
      else {
        selectedAP.setValue(ap)
        App.openWindow(AGS_BAR_NETWORK_MENU_CONFIRM)
      }
    },
    className: ap.active ? 'bar__network__list__item bar__network__list__item--active' : 'bar__network__list__item',
    child: Widget.Box({
      children: [
        Widget.Icon({
          className: 'bar__network__list__item__icon',
          icon: ap.iconName,
          size: 20
        }),
        Widget.Label({
          label: ap.ssid,
          className: 'bar__network__list__item__label',
        })
      ]
    })
  })
}

function NetworksList(networks: AccessPoint[], primary: boolean) {
  return Widget.Scrollable({
    className: 'bar__network__list__scroll',
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
      className: 'bar__network__list__scan',
      label: 'Scan networks',
      hpack: 'start',
      vexpand: true,
      onClicked: network.wifi.scan
    })
  }

  return NetworksList(networks, false)
}

export function PrimaryNetworks(networks: AccessPoint[]) {
  if (!networks.length || !network.wifi.enabled) {
    return Widget.Label({
      className: 'bar__network__list__empty',
      label: 'Not connected',
      hpack: 'start',
      hexpand: true,
    })
  }

  return NetworksList(networks, true)
}


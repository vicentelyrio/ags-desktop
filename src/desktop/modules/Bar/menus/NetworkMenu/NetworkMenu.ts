import { AGS_BAR_NETWORK_MENU, AGS_BAR_NETWORK_MENU_CONFIRM } from 'src/desktop/constants/windows'
import { PopupWindow } from 'src/desktop/components/PopupWindow/PopupWindow'
import { Dialog } from 'src/desktop/components/Dialog/Dialog'

import {
  type AccessPoint,
  selectedAP,
  selectedAPPass,
  connectToNetwork,
  KNOWN_NETWORKS,
} from 'src/desktop/states/wifi'

import { NetworkToggle } from './NetworkToggle'
import { PrimaryNetworks, SecondaryNetworks } from './NetworkList'
import { NetworkDialog } from './NetworkDialog'

const network = await Service.import('network')

function Separator() {
  return Widget.Separator({
    vertical: true,
    className: 'bar__network__separator',
  })
}

function WifiEnabled() {
  return Widget.Box({
    vertical: true,
    setup: (self) => self.hook(network.wifi, () => {
      const knownNetworks = Utils.readFile(KNOWN_NETWORKS).split('\n')

      const [primaryNetworks, secondaryNetworks] = network.wifi.access_points.reduce((acc, ap) => {
        if (knownNetworks.indexOf(String(ap.ssid)) > -1) { acc[0].push(ap) }
        else { acc[1].push(ap) }

        return acc
      }, [[] as AccessPoint[], [] as AccessPoint[]])

      self.children = [
        PrimaryNetworks(primaryNetworks),
        Separator(),
        SecondaryNetworks(secondaryNetworks),
      ]
    }),
  })
}

function Wifis() {
  selectedAP.setValue(null)
  selectedAPPass.setValue(null)

  return Widget.Box({
    className: 'bar__network__container',
    vertical: true,
    children: [
      NetworkToggle(),
      Separator(),
      WifiEnabled(),
    ]
  })
}

export function NetworkMenu(monitor = 0) {
  return [
    ...PopupWindow(monitor, {
      name: AGS_BAR_NETWORK_MENU,
      monitor,
      className: 'bar__network',
      visible: false,
      layer: 'overlay',
      anchor: ['top', 'right'],
      child: Wifis()
    }),
    Dialog({
      name: AGS_BAR_NETWORK_MENU_CONFIRM,
      monitor,
      visible: false,
      layer: 'overlay',
    }, {
      onConfirm: () => {
        connectToNetwork()
        App.closeWindow(AGS_BAR_NETWORK_MENU_CONFIRM)
      },
      content: NetworkDialog()
    })
  ]
}


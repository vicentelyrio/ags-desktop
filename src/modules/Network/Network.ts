import { AGS_NETWORK, AGS_NETWORK_CONFIRM } from 'src/constants/windows'
import { PopupWindow } from 'src/components/PopupWindow/PopupWindow'
import { Dialog } from 'src/components/Dialog/Dialog'

import {
  type AccessPoint,
  selectedAP,
  selectedAPPass,
  connectToNetwork,
  KNOWN_NETWORKS,
} from 'src/states/wifi'

import { NetworkToggle } from './NetworkToggle'
import { PrimaryNetworks, SecondaryNetworks } from './NetworkList'
import { NetworkDialog } from './NetworkDialog'

const network = await Service.import('network')

function Separator() {
  return Widget.Separator({
    vertical: true,
    className: 'network__separator',
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
    className: 'network__container',
    vertical: true,
    children: [
      NetworkToggle(),
      Separator(),
      WifiEnabled(),
    ]
  })
}

export function Network(monitor = 0) {
  return [
    ...PopupWindow(monitor, {
      name: AGS_NETWORK,
      monitor,
      className: 'network',
      visible: false,
      layer: 'overlay',
      anchor: ['top', 'right'],
      child: Wifis()
    }),
    Dialog({
      name: AGS_NETWORK_CONFIRM,
      monitor,
      visible: false,
      layer: 'overlay',
    }, {
      onConfirm: () => {
        connectToNetwork()
        App.closeWindow(AGS_NETWORK_CONFIRM)
      },
      content: NetworkDialog()
    })
  ]
}


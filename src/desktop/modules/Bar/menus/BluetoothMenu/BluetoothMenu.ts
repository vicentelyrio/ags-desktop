import GLib from 'gi://GLib?version=2.0'
import { AGS_BAR_BLUETOOTH_MENU } from 'src/desktop/constants/windows'

import { PopupWindow } from 'src/desktop/components/PopupWindow/PopupWindow'
import { Connecteds, Devices } from './Devices'
import { Toggle } from './Toggle'
import { BluetoothDevice } from 'types/service/bluetooth'
import { scanning } from 'src/desktop/states/bluetooth'

const bluetooth = await Service.import('bluetooth')

const HOME = GLib.getenv('HOME')
const SCANNER = `${HOME}/ags/src/desktop/scripts/bluetooth_scan.sh`

function Separator() {
  return Widget.Separator({
    vertical: true,
    className: 'bar__network__separator',
  })
}

function Enabled() {
  return Widget.Box({
    vertical: true,
    setup: (self) => self.hook(bluetooth, (self) => {
      const [devices, connecteds] = bluetooth.devices.reduce((acc, device) => {
        acc[Number(device.connected)].push(device)
        return acc
      }, [[] as BluetoothDevice[], [] as BluetoothDevice[]])

      self.children = [
        Connecteds(connecteds),
        Separator(),
        Devices(devices),
      ]
    })
  })
}

function DeviceList() {
  return Widget.Box({
    className: 'bar__bluetooth__container',
    vertical: true,
    children: [
      Toggle(),
      Separator(),
      Enabled(),
      Separator(),
      Widget.Box({
        setup: (self) => self.hook(scanning, () => {
          self.child = scanning.value
            ? Widget.Spinner()
            : Widget.Button({
              className: 'bar__bluetooth__list__scan',
              label: 'Scan devices',
              hpack: 'start',
              vexpand: true,
              onClicked: () => {
                Utils.subprocess([
                  'bash',
                  '-c',
                  `${SCANNER} 10`
                ])
                scanning.value = true
                setTimeout(() => scanning.value = false, 10000)
              }
            })
        }),
      }),
    ]
  })
}

export function BluetoothMenu(monitor = 0) {
  bluetooth.connect('device-removed', (bl: any) => {
    Utils.notify({
      summary: bl.name ?? bl.alias,
      body: 'Connection established',
      iconName: `${bl.icon_name}-symbolic`,
      timeout: 4000
    })
  })

  return [
    ...PopupWindow(monitor, {
      name: AGS_BAR_BLUETOOTH_MENU,
      monitor,
      className: 'bar__bluetooth',
      visible: false,
      layer: 'overlay',
      anchor: ['top', 'left'],
      child: DeviceList(),
    }),
  ]
}


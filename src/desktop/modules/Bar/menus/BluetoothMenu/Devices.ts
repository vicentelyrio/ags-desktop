import { AGS_BAR_BLUETOOTH_MENU } from 'src/desktop/constants/windows'

import { BluetoothDevice } from 'types/service/bluetooth'

const bluetooth = await Service.import('bluetooth')

function Item(bl: BluetoothDevice, connected: boolean) {
  return Widget.Button({
    onClicked: () => {
      App.closeWindow(AGS_BAR_BLUETOOTH_MENU)
      bl.setConnection(!connected)
    },
    className: bl.connected
      ? 'bar__bluetooth__list__item bar__bluetooth__list__item--active'
      : 'bar__bluetooth__list__item',
    child: Widget.CenterBox({
      startWidget: Widget.Label({
        label: bl.name ?? bl.alias,
        className: 'bar__bluetooth__list__item__label',
        hpack: 'start'
      }),
      endWidget: Widget.Box({
        hpack: 'end',
        spacing: 14,
        children: [
          bl.connected && Widget.Label({ label: `${bl.battery_percentage}%` }),
          Widget.Icon({ icon: `${bl.icon_name}-symbolic`, size: 18 }),
        ]
      })
    })
  })
}

function List(devices: BluetoothDevice[], primary: boolean) {
  return Widget.Scrollable({
    className: 'bar__bluetooth__list__scroll',
    css: `min-height: ${Math.min(devices.length * 46, 600)}px`,
    vscroll: 'automatic',
    hscroll: 'never',
    child: Widget.Box({
      vertical: true,
      children: devices
        .sort((a, b) => a.connected === b.connected ? -1 : 1)
        .map((ap) => Item(ap, primary))
    })
  })
}

export function Devices(devices: BluetoothDevice[]) {
  if (!devices.length || !bluetooth.enabled) {
    return Widget.Label({
      className: 'bar__bluetooth__list__empty',
      label: 'No devices listed',
      hpack: 'start',
      hexpand: true,
    })
  }

  return List(devices, false)
}

export function Connecteds(devices: BluetoothDevice[]) {
  if (!devices.length || !bluetooth.enabled) {
    return Widget.Label({
      className: 'bar__bluetooth__list__empty',
      label: 'No devices connected',
      hpack: 'start',
      hexpand: true,
    })
  }

  return List(devices, true)
}


import { AGS_BAR } from 'src/desktop/constants/windows'

import { SystemLogo } from './components/SystemLogo'
import { Workspaces } from './components/Workspaces'
import { Clock } from './components/Clock'
import { Bluetooth } from './components/Bluetooth'
import { Systray } from './components/Systray'
import { Volume } from './components/Volume'
import { Brightness } from './components/Brightness'
import { Client } from './components/Client'
import { Divider } from './components/Divider'
import { Media } from './components/Media'
import { Network } from './components/Network'
import { BarBg } from './components/BarBg'
import { System } from './components/System'

import { SystemMenu } from './menus/SystemMenu/SystemMenu'
import { SystemInfoMenu } from './menus/SystemInfoMenu/SystemInfoMenu'
import { NetworkMenu } from './menus/NetworkMenu/NetworkMenu'
import { MediaMenu } from './menus/MediaMenu/MediaMenu'
import { BluetoothMenu } from './menus/BluetoothMenu/BluetoothMenu'

function Left() {
  return Widget.Box({
    className: 'bar__left',
    spacing: 16,
    children: [
      SystemLogo(),
      Workspaces(),
      Client(),
    ],
  })
}

function Center() {
  return Widget.Box({
    className: 'bar__left',
    spacing: 8,
    children: [
      Media(),
    ],
  })
}

function Right() {
  return Widget.Box({
    className: 'bar__right',
    hpack: 'end',
    spacing: 16,
    children: [
      Systray(),
      Divider(),
      System(),
      Divider(),
      Network(),
      Bluetooth(),
      Divider(),
      Brightness(),
      Volume(),
      Divider(),
      Clock(),
    ],
  })
}

function BarWindow(monitor = 0) {
  return Widget.Window({
    name: AGS_BAR,
    className: 'bar',
    monitor,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
      setup: BarBg,
      vexpand: false,
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  })
}

export function Bar(monitor = 0) {
  return [
    BarWindow(monitor),
    MediaMenu(monitor),
    ...SystemMenu(monitor),
    ...NetworkMenu(monitor),
    ...SystemInfoMenu(monitor),
    ...BluetoothMenu(monitor),
  ]
}

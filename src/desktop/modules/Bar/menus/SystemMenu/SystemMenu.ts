import { AGS_BAR_SYSTEM_MENU } from 'src/desktop/constants/windows'
import { PopupWindow } from 'src/desktop/components/PopupWindow/PopupWindow'
import GLib from 'gi://GLib?version=2.0'

const HOME = GLib.getenv('HOME')

function Separator() {
  return Widget.Separator({
    vertical: true,
    className: 'bar__system-menu__separator',
  })
}

function Action(action: () => void) {
  App.closeWindow(AGS_BAR_SYSTEM_MENU)
  action()
}

function Menu() {
  return Widget.Box({
    vertical: true,
    className: 'bar__system-menu__container',
    children: [
      Widget.Button({
        className: 'bar__system-menu__item',
        onPrimaryClick: () => Action(() => Utils.exec('reboot')),
        label: 'Restart',
        xalign: 0
      }),
      Widget.Button({
        className: 'bar__system-menu__item',
        onPrimaryClick: () => Action(() => Utils.exec('shutdown now')),
        label: 'Shutdown',
        xalign: 0
      }),
      Separator(),
      Widget.Button({
        className: 'bar__system-menu__item',
        onPrimaryClick: () => Action(() => (
          Utils.subprocess(['bash', '-c', `${HOME}/.config/ags/run/greet-show.sh`])
        )),
        label: 'Lock screen',
        xalign: 0
      }),
      Widget.Button({
        className: 'bar__system-menu__item',
        onPrimaryClick: () => Action(() => Utils.exec('hyprctl dispatch exit')),
        label: 'Logout',
        xalign: 0
      }),
    ]
  })
}

export function SystemMenu(monitor = 0) {
  return PopupWindow(monitor, {
    name: AGS_BAR_SYSTEM_MENU,
    monitor,
    className: 'system-menu',
    visible: false,
    layer: 'overlay',
    anchor: ['top', 'left'],
    child: Menu()
  })
}


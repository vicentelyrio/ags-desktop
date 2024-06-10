import { AGS_SYSTEM_MENU } from 'src/constants/windows'
import { PopupWindow } from 'src/components/PopupWindow/PopupWindow'

function Separator() {
  return Widget.Separator({
    vertical: true,
    className: 'system-menu__separator',
  })
}

function Action(action:string) {
  App.closeWindow(AGS_SYSTEM_MENU)
  Utils.exec(action)
}

function Menu() {
  return Widget.Box({
    vertical: true,
    className: 'system-menu__container',
    children: [
      Widget.Button({
        className: 'system-menu__item',
        onPrimaryClick: () => Action('reboot'),
        label: 'Restart',
        xalign: 0
      }),
      Widget.Button({
        className: 'system-menu__item',
        onPrimaryClick: () => Action('shutdown now'),
        label: 'Shutdown',
        xalign: 0
      }),
      Separator(),
      Widget.Button({
        className: 'system-menu__item',
        onPrimaryClick: () => Action('hyprlock'),
        label: 'Lock screen',
        xalign: 0
      }),
      Widget.Button({
        className: 'system-menu__item',
        onPrimaryClick: () => Action('hyprctl dispatch exit'),
        label: 'Logout',
        xalign: 0
      }),
    ]
  })
}

export function SystemMenu(monitor = 0) {
  return PopupWindow(monitor, {
    name: AGS_SYSTEM_MENU,
    monitor,
    className: 'system-menu',
    visible: false,
    layer: 'overlay',
    anchor: ['top', 'left'],
    child: Menu()
  })
}


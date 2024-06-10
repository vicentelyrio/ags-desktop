import { AGS_SYSTEM_MENU } from "src/constants/windows"

export function SystemLogo() {
  const logo = Widget.EventBox({
    onPrimaryClick: () => {
      App.toggleWindow(AGS_SYSTEM_MENU)
    },
    child: Widget.Icon({
      icon: 'arch-symbolic',
      className: 'bar__logo',
      size: 22
    })
  })

  return Widget.Box({
    children: [logo]
  })
}

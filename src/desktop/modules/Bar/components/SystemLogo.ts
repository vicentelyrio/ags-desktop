import { AGS_BAR_SYSTEM_MENU } from 'src/desktop/constants/windows'

export function SystemLogo() {
  const logo = Widget.Button({
    className: 'bar__unstyled__button',
    onClicked: () => {
      App.toggleWindow(AGS_BAR_SYSTEM_MENU)
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

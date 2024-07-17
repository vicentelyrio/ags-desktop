import { onOpenMenu } from 'src/desktop/components/PopupWindow/PopupWindow'
import { AGS_BAR_SYSTEM_MENU } from 'src/desktop/constants/windows'
import { getBounds } from 'src/utils/getBounds'

export function SystemLogo() {
  const logo = Widget.Button({
    className: 'bar__unstyled__button',
    onPrimaryClickRelease: (self) => {
      const { x } = getBounds(self)
      onOpenMenu(AGS_BAR_SYSTEM_MENU, x, 6)
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

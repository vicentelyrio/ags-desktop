import { onOpenMenu } from 'src/desktop/components/PopupWindow/PopupWindow'
import { AGS_BAR_BLUETOOTH_MENU } from 'src/desktop/constants/windows'
import { getBounds } from 'src/utils/getBounds'

const bluetooth = await Service.import('bluetooth')

export function Bluetooth() {
  const icon = Widget.EventBox({
    onPrimaryClick: (self) => {
      const { centerx } = getBounds(self)
      onOpenMenu(AGS_BAR_BLUETOOTH_MENU, centerx - 175, 6)
    },
    onSecondaryClick: () => {
      Utils.exec(`hyprctl dispatch -- exec overskride`)
    },
    child: Widget.Icon({
      icon: bluetooth.bind('enabled').as(on => `bluetooth-${on ? 'active' : 'disabled'}-symbolic`),
      className: 'bar__bluetooth_icon',
      size: 16
    })
  })

  return Widget.Box({
    children: [
      icon
    ]
  })
}


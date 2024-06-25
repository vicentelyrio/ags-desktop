import { AGS_BAR_NETWORK_MENU } from 'src/desktop/constants/windows'

const network = await Service.import('network')

const WifiIndicator = () => Widget.Icon({
  icon: network.wifi.bind('icon_name'),
  size: 20
})

const WiredIndicator = () => Widget.Icon({
  icon: network.wired.bind('icon_name'),
  size: 20
})

export function Network() {
  return Widget.Button({
    className: 'bar__unstyled__button',
    child: Widget.Stack({
      children: {
        wifi: WifiIndicator(),
        wired: WiredIndicator(),
      },
      shown: network.bind('primary').as(p => p || 'wifi'),
    }),
    onClicked: () => {
      App.toggleWindow(AGS_BAR_NETWORK_MENU)
    },
  })
}

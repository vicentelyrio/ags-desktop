import { AGS_NETWORK } from 'src/constants/windows'

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
  return Widget.EventBox({
    child: Widget.Stack({
      children: {
        wifi: WifiIndicator(),
        wired: WiredIndicator(),
      },
      shown: network.bind('primary').as(p => p || 'wifi'),
    }),
    onPrimaryClick: () => App.toggleWindow(AGS_NETWORK),
  })
}

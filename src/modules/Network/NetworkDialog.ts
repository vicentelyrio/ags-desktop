import { AGS_NETWORK_CONFIRM } from 'src/constants/windows'
import { connectToNetwork, selectedAP, selectedAPPass } from 'src/states/wifi'

export function NetworkDialog() {
  return Widget.Box({
    className: 'network__dialog',
    vertical: true,
    hpack: 'fill',
    children: [
      Widget.Label({
        className: 'network__dialog__title',
        label: selectedAP.bind().as(ap => `Connect to ${ap?.ssid}`),
        hpack: 'start',
        xalign: 0,
        wrap: true,
      }),
      Widget.Label({
        className: 'network__dialog__description',
        label: `Type the password to connect to this Wi-Fi network`,
        hpack: 'start',
        xalign: 0,
        wrap: true,
      }),
      Widget.Entry({
        className: 'network__dialog__input',
        placeholderText: 'Password',
        visibility: false,
        onChange: ({ text }) => {
          if (!text || typeof text !== 'string') return

          selectedAPPass.setValue(text)
        },
        onAccept: () => {
          connectToNetwork()
          App.closeWindow(AGS_NETWORK_CONFIRM)
        }
      })
    ]
  })
}


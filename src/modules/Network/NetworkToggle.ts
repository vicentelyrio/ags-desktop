const network = await Service.import('network')

export function NetworkToggle() {
  return Widget.Box({
    className: 'network__toggle',
    hexpand: true,
    children: [
      Widget.Label({
        className: 'network__toggle__label',
        label: 'Wi-Fi',
        hpack: 'start',
        hexpand: true,
      }),
      Widget.Switch({
        className: 'network__toggle__switch',
        state: network.wifi.enabled,
        onActivate: () => network.toggleWifi()
      }),
    ]
  })
}


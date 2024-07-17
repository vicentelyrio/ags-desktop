const bluetooth = await Service.import('bluetooth')

export function Toggle() {
  return Widget.Box({
    className: 'bar__bluetooth__toggle',
    hexpand: true,
    children: [
      Widget.Label({
        className: 'bar__bluetooth__toggle__label',
        label: 'Bluetooth',
        hpack: 'start',
        hexpand: true,
      }),
      Widget.Switch({
        className: 'bar__bluetooth__toggle__switch',
        state: bluetooth.enabled,
        onActivate: () => bluetooth.toggle()
      }),
    ]
  })
}


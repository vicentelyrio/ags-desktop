export function Actions() {
  return (
    Widget.Box({
      vpack: 'center',
      hpack: 'center',
      spacing: 32,
      children: [
        Widget.EventBox({
          onPrimaryClick: () => () => Utils.exec('reboot'),
          child: Widget.Icon({
            className: 'greet__reboot',
            icon: 'view-refresh-symbolic',
            size: 24
          })
        }),
        Widget.EventBox({
          onPrimaryClick: () => () => Utils.exec('shutdown now'),
          child: Widget.Icon({
            className: 'greet__shutdown',
            icon: 'system-shutdown-symbolic',
            size: 24
          })
        })
      ]
    })
  )
}


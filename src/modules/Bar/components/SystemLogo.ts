import Gdk from "types/@girs/gdk-3.0/gdk-3.0"

export function SystemLogo() {
  const logo = Widget.EventBox({
    onPrimaryClick: (icon, event) => {
      menu.popup_at_widget(icon, Gdk.Gravity.SOUTH_EAST, Gdk.Gravity.NORTH_EAST, event)
    },
    child: Widget.Icon({
      icon: 'arch-symbolic',
      className: 'bar__logo',
      size: 22
    })
  })

  const items = [
    {
      label: 'Restart',
      action: () => Utils.exec('reboot')
    },
    {
      label: 'Shutdown',
      action: () => Utils.exec('shutdown now')
    },
    {
      label: 'Lock screen',
      action: () => Utils.exec('hyprlock')
    },
    {
      label: 'Logout',
      action: () => Utils.exec('hyprctl dispatch exit')
    },
  ]

  const menu = Widget.Menu({
    children: items.map(({ label, action }) => (
      Widget.MenuItem({
        onActivate: action,
        child: Widget.Label({ label, xalign: 0 })
      })
    ))
  })

  // const Menu = Widget.Box({
  //   name: MENU,
  //   setup: self => self.keybind('Escape', () => {
  //     App.closeWindow(MENU)
  //   }),
  //   visible: false,
  //   child: Widget.Box({
  //     vertical: true,
  //     children: [
  //       Widget.Icon({
  //         icon: 'arch-symbolic'
  //       }),
  //     ],
  //     setup: self => self.hook(App, (_, windowName) => {
  //       if (windowName !== MENU)
  //       return
  //     }),
  //   })
  // })

  return Widget.Box({
    children: [logo]
  })
}

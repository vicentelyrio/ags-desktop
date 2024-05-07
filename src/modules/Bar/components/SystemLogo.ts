export function SystemLogo() {
  return Widget.EventBox({
    child: Widget.Icon({
      icon: 'arch-symbolic',
      className: 'bar__logo',
      size: 22
    })
  })
}

export function Message() {
  return Widget.Label({
    className: 'greetd__message',
    wrap: true,
    max_width_chars: 35,
    hpack: 'center',
    hexpand: true,
    xalign: .5,
  })
}

import GLib from 'gi://GLib?version=2.0'

export function Avatar() {
  const AVATAR = GLib.getenv('THEME_AVATAR')
  return Widget.Box({
    className: 'greet__avatar',
    hpack: 'center',
    vpack: 'center',
    expand: false,
    css: `background-image: url("${AVATAR}")`,
  })
}

import GLib from 'gi://GLib?version=2.0'
const THEME = GLib.getenv('THEME_FOLDER')

export function Avatar() {
  return Widget.Box({
    className: 'greet__avatar',
    hpack: 'center',
    vpack: 'center',
    expand: false,
    css: `background-image: url("${THEME}/assets/avatar.jpg")`,
  })
}

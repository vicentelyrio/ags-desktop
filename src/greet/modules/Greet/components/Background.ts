import GLib from 'gi://GLib?version=2.0'

export function Background() {
  const WALLPAPER = GLib.getenv('THEME_WALLPAPER_CURRENT')
  const FOLDER = GLib.getenv('THEME_WALLPAPER_FOLDER')

  return Widget.Overlay({
    className: 'greet__auth__background',
    expand: true,
    child: Widget.Box({
      className: 'greet__auth__wallpaper',
      expand: true,
      css: `background-image: url("${FOLDER}/${WALLPAPER}")`,
    }),
    overlay: Widget.Box({
      className: 'greet__auth__cover',
      expand: true,
    }),
  })
}

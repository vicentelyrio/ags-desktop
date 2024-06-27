export function Avatar() {
  return Widget.Box({
    className: 'greet__avatar',
    hpack: 'center',
    vpack: 'center',
    expand: false,
    css: `background-image: url("/usr/share/archtheme/night/assets/avatar.jpg")`,
  })
}

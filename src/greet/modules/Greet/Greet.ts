import { Avatar } from './components/Avatar'
import { Clock } from './components/Clock'
import { Date } from './components/Date'
import { Username } from './components/Username'
import { Input } from './components/Input'

export const Greet = Widget.Window({
  className: 'greet',
  name: 'greet',
  anchor: ['top', 'left', 'right', 'bottom'],
  keymode: 'exclusive',
  child: Widget.Overlay({
    className: 'greet__overlay',
    child: Widget.Overlay({
      className: 'greet__auth__background',
      expand: true,
      child: Widget.Box({
        className: 'greet__auth__wallpaper',
        expand: true,
        css: `background-image: url("/home/vicentelyrio/themes/night/assets/wallpapers/flowers.png")`,
      }),
      overlay: Widget.Box({
        className: 'greet__auth__cover',
        expand: true,
      }),
    }),
    overlays: [
      Widget.Overlay({
        child: Widget.Box({ expand: true }),
        overlays: [
          Widget.CenterBox({
            vertical: true,
            startWidget: Widget.Box({
              vertical: true,
              vpack: 'center',
              children: [
                Clock(),
                Date(),
              ]
            }),
            centerWidget: Widget.Box({
              vertical: true,
              vpack: 'center',
              children: [
                Avatar(),
                Username(),
                Input()
              ]
            })
          })
        ]
      })
    ],
  }),
})

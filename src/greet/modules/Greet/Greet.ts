import GLib from 'gi://GLib?version=2.0'

import { Avatar } from './components/Avatar'
import { Clock } from './components/Clock'
import { Date } from './components/Date'
import { Username } from './components/Username'
import { Input } from './components/Input'

const THEME = GLib.getenv('THEME_FOLDER')

export const Greet = Widget.Window({
  className: 'greetd',
  name: 'greetd',
  anchor: ['top', 'left', 'right', 'bottom'],
  keymode: 'on-demand',
  child: Widget.Overlay({
    className: 'greet__overlay',
    child: Widget.Overlay({
      className: 'greet__auth__background',
      expand: true,
      child: Widget.Box({
        className: 'greet__auth__wallpaper',
        expand: true,
        css: `background-image: url("${THEME}/assets/wallpapers/flowers.png")`,
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

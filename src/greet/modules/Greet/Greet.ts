import { Avatar } from './components/Avatar'
import { Clock } from './components/Clock'
import { Date } from './components/Date'
import { Username } from './components/Username'
import { Input } from './components/Input'
import { Background } from './components/Background'

export const Greet = Widget.Window({
  className: 'greet',
  name: 'greet',
  anchor: ['top', 'left', 'right', 'bottom'],
  keymode: 'exclusive',
  exclusivity: 'exclusive',
  layer: 'overlay',
  child: Widget.Overlay({
    className: 'greet__overlay',
    child: Background(),
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

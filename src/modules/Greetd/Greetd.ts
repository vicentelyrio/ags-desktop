import { Clock } from './components/Clock'
import { Auth } from './Auth'

const auth = Auth()

export const Greetd = Widget.Window({
  className: 'greetd',
  name: 'greetd',
  anchor: ['top', 'left', 'right', 'bottom'],
  // keymode: 'exclusive',
  setup: (self: any) => {
    self.set_default_size(500, 500)
    self.show_all()
    (auth.attribute as any)?.password?.grab_focus?.()
  },
  child: Widget.Overlay({
    className: 'greetd__overlay',
    child: Widget.Box({ expand: true }),
    overlays: [
      Clock(),
      auth,
    ],
  }),
})

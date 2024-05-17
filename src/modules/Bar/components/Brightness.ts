import brightness from '../../../services/Brightness'

export function Brightness() {
  const slider = Widget.Slider({
    hexpand: true,
    draw_value: false,
    on_change: self => brightness.screen_value = self.value,
    value: brightness.bind('screen_value'),
  })

  const label = Widget.Label({
    label: brightness.bind('screen_value').as(v => `${v}`),
    setup: self => self.hook(brightness, (self, screenValue) => {
      self.label = screenValue ?? 0
      self.label = `${brightness.screen_value}`
    }, 'screen-changed'),
  })

  return Widget.Box({
    class_name: 'brightness',
    css: 'min-width: 180px',
    children: [label, slider],
  })
}

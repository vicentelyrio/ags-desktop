import brightness from '../../../services/Brightness'

export function Brightness() {
  const icons = {
    20: 'brightness-0',
    50: 'brightness-1',
    80: 'brightness-2',
    100: 'brightness-3',
  } as const

  function getIcon(intensity: number) {
    const iconKey = Object.keys(icons).find((threshold) => Number(threshold) >= intensity)
    const icon = icons[Number(iconKey)] ?? icons[20]
    return `${icon}-symbolic`
  }

  const icon = Widget.Icon({
    class_name: 'bar__brightness__icon',
    size: 22,
    setup: self => self.hook(brightness, (self, intensity) => {
      self.icon = getIcon(intensity ?? 0)
    }, 'intensity-changed'),
  })

  const slider = Widget.Slider({
    hexpand: true,
    drawValue: false,
    onChange: (self) => brightness.intensity = self.value * 100,
    value: brightness.bind('intensity').as(v => v / 100),
    class_name: 'bar__brightness__slider',
  })

  return Widget.Box({
    class_name: 'bar__brightness',
    spacing: 6,
    children: [icon, slider],
  })
}

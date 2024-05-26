import brightness from '../../../services/Brightness'

export function Brightness() {
  const icons = {
    20: 'brightness-0',
    50: 'brightness-1',
    80: 'brightness-2',
    100: 'brightness-3',
  } as const

  function getIcon() {
    const intensity = brightness.intensity

    const icon = Object.keys(icons).find((threshold) => {
      return Number(threshold) >= intensity
    })

    return `${icons[Number(icon) ?? 34]}-symbolic`
  }

  const icon = Widget.Icon({
    class_name: 'bar__volume__icon',
    icon: Utils.watch(getIcon(), brightness, getIcon),
    size: 22
  })

  const slider = Widget.Slider({
    hexpand: true,
    drawValue: false,
    onChange: self => brightness.intensity = self.value * 100,
    value: brightness.bind('intensity').as(v => v / 100),
    class_name: 'bar__brightness__slider',
  })

  return Widget.Box({
    class_name: 'bar__brightness',
    spacing: 6,
    children: [icon, slider],
  })
}

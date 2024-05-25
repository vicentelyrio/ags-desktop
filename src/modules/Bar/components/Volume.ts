const audio = await Service.import('audio')

export function Volume() {
  const icons = {
    0: 'muted',
    1: 'low',
    34: 'medium',
    67: 'high',
    101: 'overamplified',
  } as const

  function getIcon() {
    const icon = audio.speaker.is_muted ? 0 : Object.keys(icons).find((threshold) => (
      Number(threshold) >= audio.speaker.volume * 100
    ))

    return `audio-volume-${icons[icon ?? 34]}-symbolic`
  }

  const icon = Widget.Icon({
    class_name: 'bar__volume__icon',
    icon: Utils.watch(getIcon(), audio.speaker, getIcon),
  })

  const slider = Widget.Slider({
    class_name: 'bar__volume__slider',
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => audio.speaker.volume = value,
    setup: self => self.hook(audio.speaker, () => {
      self.value = audio.speaker.volume || 0
    }),
  })

  return Widget.Box({
    class_name: 'bar__volume',
    children: [icon, slider],
    spacing: 6,
  })
}


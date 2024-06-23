import { time } from 'src/states/date'

export function Clock() {
  return Widget.CenterBox({
    className: 'greetd__clock',
    hexpand: true,
    center_widget: Widget.Label({
      className: 'greetd__clock__label',
      label: time.bind().as(c => `${c}`),
    })
  })
}


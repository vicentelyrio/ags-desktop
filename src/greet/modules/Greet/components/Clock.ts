import { time } from 'src/desktop/states/date'

export function Clock() {
  return Widget.CenterBox({
    className: 'greet__clock',
    hexpand: true,
    center_widget: Widget.Label({
      className: 'greet__clock__label',
      label: time.bind().as(c => `${c}`),
    })
  })
}


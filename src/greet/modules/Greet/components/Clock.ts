import { time } from 'src/greet/states/date'

export function Clock() {
  return Widget.Label({
    className: 'greet__clock__label',
    label: time.bind().as(c => `${c}`),
  })
}


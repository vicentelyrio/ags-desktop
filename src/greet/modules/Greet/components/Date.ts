import { date } from 'src/greet/states/date'

export function Date() {
  return Widget.Label({
    className: 'greet__date__label',
    label: date.bind().as(c => `${c}`),
  })
}


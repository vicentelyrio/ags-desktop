import { dayjs } from 'src/utils/locale'

const date = Variable('', {
  poll: [1000*60*10, function() {
    return dayjs().format('ddd  D  MMM')
  }]
})

const time = Variable('', {
  poll: [2000, function() {
    return dayjs().format('HH:MM')
  }]
})

export function Clock() {
  return (
    Widget.Box({
      spacing: 16,
      className: 'bar__clock',
      children: [
        Widget.EventBox({
          child: Widget.Label({
            className: 'bar__clock__date',
            label: date.bind(),
          })
        }),
        Widget.EventBox({
          child: Widget.Label({
            className: 'bar__clock__time',
            justification: 'right',
            label: time.bind(),
          })
        }),
      ]
    })
  )
}


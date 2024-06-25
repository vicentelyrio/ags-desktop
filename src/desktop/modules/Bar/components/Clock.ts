import { date, time } from 'src/desktop/states/date'

export function Clock() {
  return (
    Widget.Box({
      spacing: 16,
      className: 'bar__clock',
      children: [
        Widget.EventBox({
          child: Widget.Icon({
            class_name: 'bar__clock__icon',
            icon: 'x-office-calendar-symbolic',
          }),
        }),
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


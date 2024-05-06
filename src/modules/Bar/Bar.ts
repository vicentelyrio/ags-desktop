import { dayjs } from 'src/utils/locale'

const time = Variable('', {
  poll: [1000, function() {
    return dayjs().format('L')
  }],
})

export const Bar = (monitor: number) => Widget.Window({
  name: `bar-${monitor}`,
  className: 'bar',
  anchor: ['top', 'left', 'right'],
  exclusivity: 'exclusive',
  child: Widget.CenterBox({
    start_widget: Widget.Label({
      hpack: 'center',
      label: 'Welcome to AGS!',
    }),
    end_widget: Widget.Label({
      hpack: 'center',
      label: time.bind(),
    }),
  }),
})



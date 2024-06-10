import { AGS_SYSTEM_INFO } from 'src/constants/windows'
import { cpuRaw, cpuLabel, ramRaw, ramLabel } from 'src/states/system'

const cpuProgress = Widget.CircularProgress({
  value: cpuRaw.bind(),
  className: 'system-info__graph',
  child: Widget.Label({
    className: 'system-info__graph__label',
    label: cpuLabel.bind()
  }),
})

const ramProgress = Widget.CircularProgress({
  value: ramRaw.bind(),
  className: 'system-info__graph',
  child: Widget.Label({
    className: 'system-info__graph__label',
    label: ramLabel.bind()
  }),
})

function System() {
  return Widget.Box({
    className: 'system-info__container',
    spacing: 8,
    children: [
      cpuProgress,
      ramProgress,
    ]
  })
}

export function SystemInfo(monitor = 0) {
  return (
    Widget.Window({
      name: AGS_SYSTEM_INFO,
      monitor,
      className: 'system-info',
      layer: 'bottom',
      anchor: ['bottom', 'right'],
      child: System()
    })
  )
}


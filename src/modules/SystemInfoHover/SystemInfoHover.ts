import { PopupWindow } from 'src/components/PopupWindow/PopupWindow'
import { AGS_SYSTEM_INFO_HOVER } from 'src/constants/windows'
import { cpuRaw, cpuLabel, ramRaw, ramLabel } from 'src/states/system'

const cpuProgress = Widget.CircularProgress({
  value: cpuRaw.bind(),
  className: 'system-info-hover__graph',
  child: Widget.Label({
    className: 'system-info-hover__graph__label',
    label: cpuLabel.bind()
  }),
})

const ramProgress = Widget.CircularProgress({
  value: ramRaw.bind(),
  className: 'system-info-hover__graph',
  child: Widget.Label({
    className: 'system-info-hover__graph__label',
    label: ramLabel.bind()
  }),
})

function System() {
  return Widget.Box({
    className: 'system-info-hover__container',
    spacing: 8,
    children: [
      cpuProgress,
      ramProgress,
    ]
  })
}

export function SystemInfoHover(monitor = 0) {
  return PopupWindow(monitor, {
    name: AGS_SYSTEM_INFO_HOVER,
    monitor,
    className: 'system-info-hover',
    visible: false,
    layer: 'overlay',
    anchor: ['top', 'right'],
    child: System()
  })
}


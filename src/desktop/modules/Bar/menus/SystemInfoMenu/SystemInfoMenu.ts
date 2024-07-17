import { PopupWindow } from 'src/desktop/components/PopupWindow/PopupWindow'
import { AGS_BAR_SYSTEM_INFO_MENU } from 'src/desktop/constants/windows'
import { cpuRaw, cpuLabel, ramRaw, ramLabel } from 'src/desktop/states/system'

const cpuProgress = Widget.CircularProgress({
  value: cpuRaw.bind(),
  className: 'bar__system-info__graph',
  child: Widget.Label({
    className: 'bar__system-info__graph__label',
    label: cpuLabel.bind()
  }),
})

const ramProgress = Widget.CircularProgress({
  value: ramRaw.bind(),
  className: 'bar__system-info__graph',
  child: Widget.Label({
    className: 'bar__system-info__graph__label',
    label: ramLabel.bind()
  }),
})

function System() {
  return Widget.Box({
    className: 'bar__system-info__container',
    spacing: 8,
    children: [
      cpuProgress,
      ramProgress,
    ]
  })
}

export function SystemInfoMenu(monitor = 0) {
  return PopupWindow(monitor, {
    name: AGS_BAR_SYSTEM_INFO_MENU,
    monitor,
    className: 'bar__system-info',
    visible: false,
    layer: 'overlay',
    anchor: ['top', 'left'],
    child: System()
  })
}


import { AGS_BAR_SYSTEM_INFO_MENU } from 'src/constants/windows'
import { cpuRaw, ramRaw } from 'src/states/system'

const cpuProgress = Widget.CircularProgress({
  value: cpuRaw.bind(),
  className: 'bar__progress',
  child: Widget.Label({
    className: 'bar__progress__label',
    label: 'C'
  }),
})

const ramProgress = Widget.CircularProgress({
  value: ramRaw.bind(),
  className: 'bar__progress',
  child: Widget.Label({
    className: 'bar__progress__label',
    label: 'R'
  }),
})

export function System() {
  return Widget.EventBox({
    onPrimaryClick: () => App.toggleWindow(AGS_BAR_SYSTEM_INFO_MENU),
    child: Widget.Box({
      spacing: 8,
      children: [
        cpuProgress,
        ramProgress,
      ]
    })
  })
}

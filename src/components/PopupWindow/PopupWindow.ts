import { WindowProps } from 'types/widgets/window'

export const PopupWindow = (monitor = 0, props: WindowProps) => {
  const closerName = `${props.name as string}_CLOSER`

  function close() {
    App.closeWindow(props.name as string)
  }

  const win = Widget.Window(props)

  win.connect('notify::visible', (window) => {
    if (window.name === props.name) {
      App.toggleWindow(closerName)
    }
  })

  const closer = Widget.Window({
    css: 'background: transparent;',
    name: closerName,
    visible: props?.visible,
    layer: 'top',
    monitor,
    anchor: ['top', 'bottom', 'left', 'right'],
    child: Widget.EventBox({
      onPrimaryClick: close,
      onSecondaryClick: close,
      onMiddleClick: close
    }),
    keymode: 'exclusive',
    setup: (self) => self.keybind('Escape', close),
  })

  return [closer, win]
}


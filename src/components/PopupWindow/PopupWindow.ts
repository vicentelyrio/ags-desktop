import { WindowProps } from 'types/widgets/window'

export function PopupWindow(monitor = 0, windowProps: WindowProps) {
  const name = windowProps.name as string
  const closerName = `${name}_CLOSER`

  function close() {
    App.closeWindow(name)
  }

  const win = Widget.Window(windowProps)

  win.connect('notify::visible', (window) => {
    if (window.name === name) {
      App.toggleWindow(closerName)
    }
  })

  const closer = Widget.Window({
    css: 'background: transparent;',
    name: closerName,
    visible: windowProps?.visible,
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


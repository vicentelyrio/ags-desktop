import { WindowProps } from 'types/widgets/window'

const PREFIX = 'closer'

export function PopupWindow(monitor = 0, windowProps: WindowProps) {
  const name = windowProps.name as string
  const closerName = `${PREFIX}_${name}`

  function close() {
    App.closeWindow(name)
    App.closeWindow(closerName)
  }

  const win = Widget.Window({
    ...windowProps,
    attribute: 'popup'
  })

  win.connect('notify::visible', (window) => {
    // skip actions for other windows
    if (window.name !== name) return

    App.toggleWindow(closerName)

    if (window.visible) {
      // close other popups
      App.windows.forEach((win) => {
        // skip windows that isn't popups
        if ((win as any).attribute !== 'popup') return

        // skip hidden windows
        if (!win.visible) return

        // skip if is the current window
        if (win.name === name) return

        App.toggleWindow(win?.name as string)
      })
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


import { WindowProps } from 'types/widgets/window'

const PREFIX = 'closer'

export function PopupWindow(monitor = 0, windowProps: WindowProps) {
  const name = windowProps.name as string
  const closerName = `${PREFIX}_${name}`

  function close() {
    App.closeWindow(name)
    App.closeWindow(closerName)
  }

  // The menu itself owns the keyboard grab (for Escape-to-close). Putting
  // `keymode: 'exclusive'` on the closer overlay (top layer) instead causes
  // the closer to steal pointer focus from the menu (overlay layer) under
  // recent gtk-layer-shell, so clicking a menu item closed the menu without
  // ever firing the button's onPrimaryClick.
  const win = Widget.Window({
    ...windowProps,
    attribute: 'popup',
    keymode: windowProps.keymode ?? 'on-demand',
    setup: (self) => {
      // Allow the caller's setup to still run if provided.
      if (typeof windowProps.setup === 'function') {
        try { windowProps.setup(self) } catch { /* ignore */ }
      }
      self.keybind('Escape', close)
    },
  })

  win.connect('notify::visible', (window) => {
    // skip actions for other windows
    if (window.name !== name) return

    App.toggleWindow(closerName)

    if (window.visible) {
      // close other popups
      App.windows.forEach((w) => {
        // skip windows that aren't popups
        if ((w as any).attribute !== 'popup') return
        // skip hidden windows
        if (!w.visible) return
        // skip the current window
        if (w.name === name) return

        App.toggleWindow(w?.name as string)
      })
    }
  })

  // Invisible full-screen catcher that closes the popup when the user clicks
  // anywhere outside the menu. Kept on `top` layer so the menu (overlay)
  // visually and interactively sits above it.
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
      onMiddleClick: close,
    }),
  })

  return [closer, win]
}

export function onOpenMenu(windowName: string, x: number, y: number) {
  const currentWindow: any = App.windows.find(({ name }) => name === windowName)

  currentWindow.child.css = `
    margin-top: ${y}px;
    margin-left: ${x}px;
  `

  App.toggleWindow(windowName)
}

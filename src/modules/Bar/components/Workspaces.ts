const hyprland = await Service.import('hyprland')

export function Workspaces() {
  const activeId = hyprland.active.workspace.bind('id')
  const workspaces = hyprland
    .bind('workspaces')
    .as((ws) => ws.map(({ id }) => {
      if (id < 0) return

      return (
        Widget.EventBox({
          cursor: 'pointer',
          className: 'bar__ws__btn',
          onPrimaryClick: () => hyprland.messageAsync(`dispatch workspace ${id}`),
          child: Widget.Icon({
            icon: 'dot-symbolic',
            class_name: activeId.as(i => (
              `${i === id ? 'bar__ws__icon--selected' : 'bar__ws__icon'}`
            )),
            size: 16
          })
        })
      )
    }))

  return Widget.Box({
    className: 'bar__ws',
    children: workspaces as any,
    spacing: 4
  })
}


const hyprland = await Service.import('hyprland')

export function Workspaces() {
  const workspaces = Array(10).fill(0).map((_, index) => {
    return (
      Widget.EventBox({
        attribute: index + 1,
        cursor: 'pointer',
        className: 'bar__ws__btn',
        onPrimaryClick: () => {
          hyprland.messageAsync(`dispatch workspace ${index + 1}`)
        },
        child: Widget.Icon({
          icon: 'dot-symbolic',
          size: 16
        })
      })
    )
  })

  return Widget.Box({
    className: 'bar__ws',
    children: workspaces,
    setup: (self) => self.hook(hyprland, () => self.children.forEach((btn) => {
      const visible = hyprland.workspaces.some(ws => ws.id >= btn.attribute)
      const existent = hyprland.workspaces.some(ws => ws.id === btn.attribute)
      const active = hyprland.active.workspace.id === btn.attribute

      btn.visible = visible
      btn.child.class_name = buildClassName(active, existent)
    }))
  })
}

function buildClassName(active: boolean, existent: boolean) {
  let classname = 'bar__ws__icon'

  if (active) return `${classname} bar__ws__icon--selected`
  if (existent) return `${classname} bar__ws__icon--existent`

  return classname
}

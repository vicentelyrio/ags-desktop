const hyprland = await Service.import('hyprland')

export function BarBg(self: any) {
  self.hook(hyprland, () => {
    const active = Number(Utils.exec(`sh -c "hyprctl activewindow | grep workspace | awk -F ' ' '{print $2}'"`))

    const currentWS = hyprland.getWorkspace(hyprland.active.workspace.id)
    const currentEmpty = (currentWS?.windows ?? 0) === 0
    const special = hyprland.getWorkspace(-98)
    const specialEmpty = (special?.windows ?? 0) === 0

    const hideBg = active < 0 ? (specialEmpty && currentEmpty) : currentEmpty

    self.class_name = hideBg ? 'bar__wrapper bar__wrapper--empty' : 'bar__wrapper'
  })
}


const hyprland = await Service.import('hyprland')

export function Client() {
  return Widget.Label({
    class_name: 'bar__client',
    label: hyprland.active.client.bind('title'),
  })
}


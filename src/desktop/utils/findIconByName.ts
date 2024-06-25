import Gtk from 'gi://Gtk?version=3.0'

const iconList = Gtk.IconTheme.get_default().list_icons(null)

export function findIconByName(name: string) {
  return iconList.find((icon) => (
    icon.split('-').includes(name)
  ))
}


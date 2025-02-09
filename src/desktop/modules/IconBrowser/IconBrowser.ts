import Gtk from 'gi://Gtk?version=3.0'
import { AGS_ICONS } from 'src/desktop/constants/windows'

const IconPicker = () => {
  const selected = Widget.Label({
    css: 'font-size: 1.2em;',
    label: 'Click on an icon te get its name',
    selectable: true,
  })

  const flowbox = Widget.FlowBox({
    min_children_per_line: 7,
    row_spacing: 12,
    column_spacing: 12,
    vpack: 'start',
    hpack: 'start',
    setup: self => {
      self.connect('child-activated', (_, child) => {
        selected.label = child.get_child()?.iconName || ''
      })

      Gtk.IconTheme.get_default().list_icons(null).sort().map(icon => {
        !icon.endsWith('.symbolic') && self.insert(Widget.Icon({
          icon,
          size: 38,
        }), -1)
      })

      self.show_all()
    },
  })

  const entry = Widget.Entry({
    placeholder_text: 'Type to seach...',
    primary_icon_name: 'system-search-symbolic',
    on_change: ({ text }) => flowbox.get_children().forEach(child => {
      child.visible = child.get_child().iconName.includes(text)
    }),
  })

  return Widget.Box({
    css: 'padding: 30px;',
    spacing: 20,
    vertical: true,
    children: [
      entry,
      Widget.Scrollable({
        hscroll: 'never',
        vscroll: 'always',
        hexpand: true,
        vexpand: true,
        css: 'min-width: 400px;'
          + 'min-height: 500px;',
        child: flowbox,
      }),
      selected,
    ],
  })
}

export function IconBrowser(monitor = 0) {
  return Widget.Window({
    monitor,
    name: AGS_ICONS,
    setup: (self) => (
      self.keybind('Escape', () => App.closeWindow(AGS_ICONS))
    ),
    visible: false,
    keymode: 'exclusive',
    child: IconPicker(),
  })
}


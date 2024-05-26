// import Gtk from 'gi://Gtk'
import { Bar } from 'src/modules/Bar/Bar'
import { Launcher } from 'src/modules/Launcher/Launcher'

// const list = Gtk.IconTheme.get_default().list_icons(null)
// console.log(list)

App.config({
  style: './main.css',
  icons: `${App.configDir}/assets`,
  windows: [
    Bar(0),
    Launcher
    // Widget.Window({
    //   monitor: 0,
    //   name: `icon test`,
    //   anchor: ['top', 'left', 'right'],
    //   child: Widget.CenterBox({
    //     center_widget: Widget.Box({
    //       spacing: 2,
    //       children: list.filter(name => name.match(/^bright/)).map((icon) => {
    //       console.log(icon)
    //         return Widget.Icon({ icon, size: 40 })
    //       })
    //     })
    //   }),
    // })
  ]
})


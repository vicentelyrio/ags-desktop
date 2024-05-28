import { SystemLogo } from './components/SystemLogo'
import { Workspaces } from './components/Workspaces'
import { Clock } from './components/Clock'
import { Bluetooth } from './components/Bluetooth'
import { Systray } from './components/Systray'
import { Volume } from './components/Volume'
import { Notification } from './components/Notification'
import { Brightness } from './components/Brightness'
import { Client } from './components/Client'
import { Divider } from './components/Divider'

const hyprland = await Service.import('hyprland')

// const mpris = await Service.import('mpris')
// const battery = await Service.import('battery')

// we don't need dunst or any other notification daemon
// because the Notifications module is a notification daemon itself

// function Media() {
//   const label = Utils.watch('', mpris, 'player-changed', () => {
//     if (mpris.players[0]) {
//       const { track_artists, track_title } = mpris.players[0]
//       return `${track_artists.join(', ')} - ${track_title}`
//     } else {
//       return 'Nothing is playing'
//     }
//   })
//
//   return Widget.Button({
//     class_name: 'media',
//     on_primary_click: () => mpris.getPlayer('')?.playPause(),
//     on_scroll_up: () => mpris.getPlayer('')?.next(),
//     on_scroll_down: () => mpris.getPlayer('')?.previous(),
//     child: Widget.Label({ label }),
//   })
// }

function Left() {
  return Widget.Box({
    className: 'bar__left',
    spacing: 16,
    children: [
      SystemLogo(),
      Workspaces(),
      Client(),
    ],
  })
}

function Center() {
  return Widget.Box({
    className: 'bar__left',
    spacing: 8,
    children: [
      // Media(),
    ],
  })
}

function Right() {
  return Widget.Box({
    className: 'bar__right',
    hpack: 'end',
    spacing: 16,
    children: [
      Notification(),
      Systray(),
      Divider(),
      Bluetooth(),
      Divider(),
      Brightness(),
      Volume(),
      Divider(),
      Clock(),
    ],
  })
}

export function Bar(monitor = 0) {
  return Widget.Window({
    name: `bar-${monitor}`,
    className: 'bar',
    monitor,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
      setup: (self) => {
        self.hook(hyprland, () => {
          const currentWS = hyprland.getWorkspace(hyprland.active.workspace.id)
          const currentEmpty = (currentWS?.windows ?? 0) === 0
          const special = hyprland.getWorkspace(-98)
          const specialEmpty = (special?.windows ?? 0) === 0

          const hideBg = special ? (specialEmpty && currentEmpty) : currentEmpty

          self.class_name = hideBg ? 'bar__wrapper bar__wrapper--empty' : 'bar__wrapper'
        })
      },
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  })
}


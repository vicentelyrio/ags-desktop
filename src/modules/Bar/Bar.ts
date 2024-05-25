import { SystemLogo } from './components/SystemLogo'
import { Workspaces } from './components/Workspaces'
import { Clock } from './components/Clock'
import { Bluetooth } from './components/Bluetooth'
import { Systray } from './components/Systray'
import { Volume } from './components/Volume'
import { Notification } from './components/Notification'
import { Brightness } from './components/Brightness'

// const hyprland = await Service.import('hyprland')
// const mpris = await Service.import('mpris')
// const battery = await Service.import('battery')


// function ClientTitle() {
//   return Widget.Label({
//     class_name: 'client-title',
//     label: hyprland.active.client.bind('title'),
//   })
// }

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
      // ClientTitle(),
    ],
  })
}

function Center() {
  return Widget.Box({
    className: 'bar__left',
    spacing: 8,
    children: [
      // Media(),
      Notification(),
      Systray(),
    ],
  })
}

function Right() {
  return Widget.Box({
    className: 'bar__right',
    hpack: 'end',
    spacing: 16,
    children: [
      Bluetooth(),
      Notification(),
      Brightness(),
      Volume(),
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
      className: 'bar__wrapper',
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  })
}


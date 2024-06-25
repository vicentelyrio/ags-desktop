import GLib from 'gi://GLib?version=2.0'

import { Avatar } from './components/Avatar'
import { Clock } from './components/Clock'
import { Message } from './components/Message'
import { Password } from './components/Password'
// import { Auth } from './Auth'

// const auth = Auth()

const greetd = await Service.import('greetd')
const userName = Utils.exec(['bash', '-c', "'find /home -maxdepth 1 -printf '%f\n' | tail -n 1'"])
const loggingin = Variable(false)

const CMD = GLib.getenv('ASZTAL_DM_CMD')
  || 'Hyprland'

const ENV = GLib.getenv('ASZTAL_DM_ENV')
  || 'WLR_NO_HARDWARE_CURSORS=1 _JAVA_AWT_WM_NONREPARENTING=1'

async function login(pw: string) {
  loggingin.value = true

  return greetd.login(userName, pw, CMD, ENV.split(/\s+/))
    .catch((res) => {
      loggingin.value = false
      // response.label = res?.description || JSON.stringify(res)
      // password.text = ''
      // revealer.reveal_child = true
    })
}

export const Greet = Widget.Window({
  className: 'greetd',
  name: 'greetd',
  anchor: ['top', 'left', 'right', 'bottom'],
  // keymode: 'exclusive',
  // setup: () => {
  //   (auth.attribute as any)?.password?.grab_focus?.()
  // },
  child: Widget.Overlay({
    className: 'greet__overlay',
    child: Widget.Box({ expand: true }),
    overlays: [
      // Widget.Overlay({
      //   child: Widget.Box({
      //     className: 'greet__auth__background',
      //     vertical: true,
      //     children: [
      //       Widget.Box({
      //         className: 'greet__auth__wallpaper',
      //         css: `background-image: url(~/.config/themes/night/assets/wallpapers/flowers.png)`,
      //       }),
      //       Widget.Box({
      //         className: 'greet__auth__contrast',
      //         vexpand: true,
      //       }),
      //     ]
      //   }),
      //   overlay: Widget.Box({
      //     className: 'greet__auth__content',
      //     vpack: 'end',
      //     vertical: true,
      //     children: [
      //       Avatar(),
      //       Widget.Box({
      //         hpack: 'center',
      //         children: [
      //           // Widget.Icon(icons.ui.avatar),
      //           Widget.Label(userName),
      //         ],
      //       }),
      //       Widget.Box({
      //         className: 'greet__auth__info',
      //         children: [
      //           Widget.Spinner({
      //             visible: loggingin.bind(),
      //             active: true,
      //           }),
      //           Widget.Icon({
      //             visible: loggingin.bind().as(b => !b),
      //             // icon: icons.ui.lock,
      //           }),
      //           Password(login),
      //         ]
      //       }),
      //     ]
      //   }),
      // }),
      // Widget.Box({
      //   className: 'greet__auth__response',
      //   child: Message()
      // }),

      Widget.CenterBox({
        className: 'greet__content',
        hexpand: true,
        center_widget: Clock(),
        end_widget: Password(login),
      })
    ],
  }),
})

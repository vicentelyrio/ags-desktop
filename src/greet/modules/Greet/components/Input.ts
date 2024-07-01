import GLib from 'gi://GLib?version=2.0'

import { Message } from './Message'
import { Password } from './Password'
import { username } from './Username'

const greetd = await Service.import('greetd')

const password = Password(onLogin)

const response = Message()

const revealer = Widget.Revealer({
  transition: 'slide_down',
  child: response,
})

const HOME = GLib.getenv('HOME')

function isGreetdContext() {
  const greetEnv = GLib.getenv('GREETD_SOCK')
  return greetEnv !== null
}

function onError(error: string) {
  response.label = error
  password.text = ''
  revealer.reveal_child = true
}

async function onLogin(pass: string) {
  try {
    if (isGreetdContext()) {
      return greetd
        .login(username, pass, `/etc/greetd/start-session.sh`)
        .catch(() => onError('Unauthorized'))
    }

    Utils.authenticateUser(username, pass)
      .then(() => Utils.subprocess(['bash', '-c', `${HOME}/.config/ags/run/greet-hide.sh`]))
      .catch(() => onError('Unauthorized'))
  }
  catch (res) {
    return onError('Error trying to login')
  }
}

export function Input() {
  return Widget.Box({
    className: 'greet__input',
    hpack: 'center',
    vertical: true,
    children: [
      password,
      revealer
    ]
  })
}

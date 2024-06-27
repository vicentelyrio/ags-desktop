import { Message } from './Message'
import { Password } from './Password'
import { username } from './Username'

const greetd = await Service.import('greetd')

const loggingin = Variable(false)

const password = Password(onLogin)

const response = Message()

const revealer = Widget.Revealer({
  transition: 'slide_down',
  child: response,
})

async function onLogin(pass: string) {
  loggingin.value = true

  return greetd
    .login(username, pass, '/home/vicentelyrio/.config/ags/scripts/start-session.sh')
    .catch((res) => {
      loggingin.value = false
      response.label = res?.description || JSON.stringify(res)
      password.text = ''
      revealer.reveal_child = true
    })
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

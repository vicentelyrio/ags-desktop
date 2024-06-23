export function Password(onLogin: (text: string) => void) {
  return Widget.Entry({
    placeholder_text: 'Password',
    hexpand: true,
    visibility: false,
    className: 'greetd__password',
    on_accept: ({ text }) => onLogin(text || ''),
  })
}


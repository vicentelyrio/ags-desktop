export function Password(onLogin: (text: string) => void) {
  return Widget.Entry({
    vexpand: false,
    xalign: 0.5,
    visibility: false,
    className: 'greet__password__field',
    on_accept: ({ text }) => onLogin(text || ''),
  })
}


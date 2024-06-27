// export const username = Utils.exec(['bash', '-c', `users`])
export const username = 'vicentelyrio'

export function Username() {
  return Widget.Label({
    className: 'greet__username',
    label: username,
  })
}

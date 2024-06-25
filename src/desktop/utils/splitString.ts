export function splitString(str: string, interval: number) {
  let parts: string[] = []
  for (let i = 0; i < str.length; i += interval) {
    parts.push(str.substring(i, i + interval))
  }
  return parts.join(' ')
}

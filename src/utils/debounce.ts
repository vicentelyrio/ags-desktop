import { Source } from 'types/@girs/glib-2.0/glib-2.0.cjs'

export function debounce<T extends Function>(cb: T, wait = 20) {
  let h: Source | number = 0

  const callable = (...args: any) => {
    clearTimeout(h as Source)
    h = setTimeout(() => cb(...args), wait)
  }

  return <T>(<any>callable)
}

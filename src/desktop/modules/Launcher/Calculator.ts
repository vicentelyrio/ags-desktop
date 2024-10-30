import { evaluate } from 'mathjs'
import { SearchType, searchInput } from 'src/desktop/states/launcher'

export const CALCULATION_REGEX = /^((\d+(\.\d+)?\s*[a-zA-Z]+\s+to\s+[a-zA-Z]+)|([0-9+\-*/^().,=\s]+)|([a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*\)))+$/

export function Calculator() {
  return Widget.Box({
    className: 'launcher__calc',
    setup: self => self.hook(searchInput, () => {
      const { text, type } = searchInput.value
      self.visible = !!text && type === SearchType.CALC
    }),
    children: [
      Widget.Label({
        className: 'launcher__calc__label',
        setup: self => self.hook(searchInput, () => {
          self.label = String('= ' + evaluate(searchInput.value.text))
        }),
      })
    ]
  })
}


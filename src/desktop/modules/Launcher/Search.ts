import { AGS_LAUNCHER } from 'src/desktop/constants/windows'
import { SearchType, searchInput } from 'src/desktop/states/launcher'
import { CALCULATION_REGEX } from './Calculator'
import { onProjectSelected, getList } from './Projects'

const { query } = await Service.import('applications')

function setVar(text: string, type: SearchType) {
  searchInput.setValue({ text, type })
}

function resetVar() {
  setVar('', SearchType.APP)
}

export function SearchBox() {
  return Widget.Entry({
    className: 'launcher__search',
    hexpand: true,
    onAccept: () => {
      const { type, text } = searchInput.value

      if (type === SearchType.APP) {
        query(text)[0].launch()
      }

      if (type === SearchType.PROJECT) {
        onProjectSelected(getList(text)[0])
      }

      App.closeWindow(AGS_LAUNCHER)
    },
    onChange: ({ text }) => {
      if (!text) {
        return resetVar()
      }

      if (text.startsWith(' ')) {
        setVar(String(text), SearchType.PROJECT)
        return
      }

      if (CALCULATION_REGEX.test(String(text))) {
        setVar(String(text), SearchType.CALC)
        return
      }

      setVar(String(text), SearchType.APP)
    }
  })
}

import { AGS_LAUNCHER } from 'src/desktop/constants/windows'
import { SearchType, searchInput } from 'src/desktop/states/launcher'
import { Calculator } from './Calculator'
import { AppList } from './Apps'
import { SearchBox } from './Search'
import { Projects } from './Projects'

const { reload } = await Service.import('applications')

function setVar(text: string, type: SearchType) {
  searchInput.setValue({ text, type })
}

function resetVar() {
  setVar('', SearchType.APP)
}

const appList = AppList()
const search = SearchBox()
const calc = Calculator()
const projects = Projects()

function Applauncher() {
  return Widget.Box({
    className: 'launcher__box',
    vertical: true,
    children: [
      search,
      appList,
      calc,
      projects,
    ],
    setup: self => self.hook(App, (_, windowName, visible) => {
      if (windowName !== AGS_LAUNCHER) return

      if (visible) {
        reload()
        search.text = ''
        search.grab_focus()
        resetVar()
      }
    }),
  })
}

export function Launcher(monitor = 0) {
  return Widget.Window({
    className: 'launcher',
    monitor,
    name: AGS_LAUNCHER,
    setup: (self) => (
      self.keybind('Escape', () => App.closeWindow(AGS_LAUNCHER))
    ),
    visible: false,
    keymode: 'exclusive',
    child: Applauncher(),
  })
}


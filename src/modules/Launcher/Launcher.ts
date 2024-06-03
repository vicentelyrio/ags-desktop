import { Application } from 'types/service/applications'
import { evaluate } from 'mathjs'
import createFuzzySearch from '@nozbe/microfuzz'

const { query, list, reload } = await Service.import('applications')

const WINDOW_NAME = 'ags-launcher'

const CALCULATION_REGEX = /^((\d+(\.\d+)?\s*[a-zA-Z]+\s+to\s+[a-zA-Z]+)|([0-9+\-*/^().,=\s]+)|([a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*\)))+$/

enum SearchType {
  APP = 'app',
  CALC = 'calc',
}

type SearchInputType = {
  text: string
  type: SearchType
}

const apps = createFuzzySearch(list, {
  getText: (item) => [item.name, item.description],
})

const searchInput = Variable<SearchInputType>({
  text: '',
  type: SearchType.APP,
})

function setVar(text: string, type: SearchType) {
  searchInput.setValue({ text, type })
}

function resetVar() {
  setVar('', SearchType.APP)
}

function AppItem(app: Application) {
  return Widget.Button({
    className: 'launcher__item',
    onClicked: () => {
      App.closeWindow(WINDOW_NAME)
      app.launch()
    },
    child: Widget.Box({
      className: 'launcher__item__container',
      children: [
        Widget.Icon({
          className: 'launcher__item__icon',
          icon: app.icon_name || '',
          size: 22,
        }),
        Widget.Label({
          className: 'launcher__item__label',
          label: app.name,
          xalign: 0,
          vpack: 'center',
          truncate: 'end',
        })
      ]
    })
  })
}

function AppList() {
  return Widget.Scrollable({
    className: 'launcher__scroll',
    hscroll: 'never',
    setup: self => self.hook(searchInput, () => {
      const { text, type } = searchInput.value
      const total = apps(text).length
      const height = Math.min(total * 46, 500)

      self.visible = !!text && type === SearchType.APP && total > 0
      self.css = `min-height: ${height}px;`
    }),
    child: Widget.Box({
      className: 'launcher__list',
      vertical: true,
      spacing: 2,
      setup: self => self.hook(searchInput, () => {
        const { text } = searchInput.value

        self.children = apps(text).map(({ item }) => AppItem(item))
      }),
    })
  })
}

function Calc() {
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

function SearchBox() {
  return Widget.Entry({
    className: 'launcher__search',
    hexpand: true,
    onAccept: () => {
      query(searchInput.value.text)[0].launch()
      App.closeWindow(WINDOW_NAME)
    },
    onChange: ({ text }) => {
      if (!text) {
        return resetVar()
      }

      let type = SearchType.APP

      if (CALCULATION_REGEX.test(String(text))) {
        type = SearchType.CALC
      }

      setVar(String(text), type)
    }
  })
}

function Applauncher() {
  const appList = AppList()
  const search = SearchBox()
  const calc = Calc()

  return Widget.Box({
    className: 'launcher__box',
    vertical: true,
    children: [
      search,
      appList,
      calc,
    ],
    setup: self => self.hook(App, (_, windowName, visible) => {
      if (windowName !== WINDOW_NAME) return

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
    name: WINDOW_NAME,
    setup: (self) => (
      self.keybind('Escape', () => App.closeWindow(WINDOW_NAME))
    ),
    visible: false,
    keymode: 'exclusive',
    child: Applauncher(),
  })
}


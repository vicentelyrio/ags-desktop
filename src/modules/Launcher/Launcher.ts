import { Application } from 'types/service/applications'

const { query, list, reload } = await Service.import('applications')

const WINDOW_NAME = 'ags-launcher'

const searchInput = Variable('')

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
          size: 42,
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
      const total = query(searchInput.value).length
      const height = Math.min(total * 74, 500)

      self.visible = !!searchInput.value
      self.css = `min-height: ${height}px;`
    }),
    child: Widget.Box({
      className: 'launcher__list',
      vertical: true,
      spacing: 12,
      children: list.map(AppItem),
      setup: self => self.hook(searchInput, () => {
        self.children = query(searchInput.value).map(AppItem)
      }),
    })
  })
}

function SearchBox() {
  return Widget.Entry({
    className: 'launcher__search',
    hexpand: true,
    onAccept: () => {
      query(searchInput.value)[0].launch()
      App.closeWindow(WINDOW_NAME)
    },
    onChange: ({ text }) => {
      searchInput.setValue(String(text))
    }
  })
}

function Applauncher() {
  const appList = AppList()
  const search = SearchBox()

  return Widget.Box({
    className: 'launcher__box',
    vertical: true,
    children: [
      search,
      appList,
    ],
    setup: self => self.hook(App, (_, windowName, visible) => {
      if (windowName !== WINDOW_NAME) return

      if (visible) {
        reload()
        search.text = ''
        search.grab_focus()
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

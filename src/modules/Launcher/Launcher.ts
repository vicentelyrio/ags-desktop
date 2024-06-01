import { Application } from 'types/service/applications'

const { query } = await Service.import('applications')

const WINDOW_NAME = 'applauncher'

const AppItem = (app: Application) => {
  return Widget.Button({
    className: 'launcher__item',
    on_clicked: () => {
      App.closeWindow(WINDOW_NAME)
      app.launch()
    },
    attribute: { app },
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
        }),
      ],
    }),
  })
}

const Applauncher = () => {
  // list of application buttons
  let applications = query('').map(AppItem)

  // container holding the buttons
  const list = Widget.Box({
    className: 'launcher__list',
    vertical: true,
    children: applications,
    spacing: 12,
  })

  // repopulate the box, so the most frequent apps are on top of the list
  function repopulate() {
    applications = query('').map(AppItem)
    list.children = applications
  }

  // search entry
  const search = Widget.Entry({
    className: 'launcher__search',
    hexpand: true,

    // to launch the first item on Enter
    on_accept: () => {
      // make sure we only consider visible (searched for) applications
      const results = applications.filter((item) => item.visible)

      if (results[0]) {
        App.toggleWindow(WINDOW_NAME)
        results[0].attribute.app.launch()
      }
    },

    // filter out the list
    on_change: ({ text }) => applications.forEach(item => {
      item.visible = item.attribute.app.match(text ?? '')
    }),
  })

  return Widget.Box({
    className: 'launcher__box',
    vertical: true,
    children: [
      search,

      // wrap the list in a scrollable
      Widget.Scrollable({
        className: 'launcher__scroll',
        hscroll: 'never',
        child: list,
      }),
    ],
    setup: self => self.hook(App, (_, windowName, visible) => {
      if (windowName !== WINDOW_NAME)
      return

      // when the applauncher shows up
      if (visible) {
        repopulate()
        search.text = ''
        search.grab_focus()
      }
    }),
  })
}

export const Launcher = Widget.Window({
  className: 'launcher',
  name: WINDOW_NAME,
  setup: self => self.keybind('Escape', () => {
    App.closeWindow(WINDOW_NAME)
  }),
  visible: false,
  keymode: 'exclusive',
  child: Applauncher(),
})

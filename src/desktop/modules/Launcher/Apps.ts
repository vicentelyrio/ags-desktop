import { Application } from 'types/service/applications'
import createFuzzySearch from '@nozbe/microfuzz'
import { AGS_LAUNCHER } from 'src/desktop/constants/windows'
import { SearchType, searchInput } from 'src/desktop/states/launcher'

const { list } = await Service.import('applications')

const sortedApps: Application[] = list
  .sort((a, b) => a.name.localeCompare(b.name))
  .sort((a, b) => b.frequency - a.frequency)

const apps = createFuzzySearch(sortedApps, {
  getText: (item) => [item.name, item.description],
})

function Item(app: Application) {
  return Widget.Button({
    className: 'launcher__item',
    onClicked: () => {
      App.closeWindow(AGS_LAUNCHER)
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

export function AppList() {
  return Widget.Scrollable({
    className: 'launcher__scroll',
    hscroll: 'never',
    setup: self => self.hook(searchInput, () => {
      const { text, type } = searchInput.value
      const total = text.trim().length > 0 ? apps(text).length : list.length
      const height = Math.min(total * 48, 500)

      self.visible = type === SearchType.APP
      self.css = `min-height: ${height}px;`
    }),
    child: Widget.Box({
      className: 'launcher__list',
      vertical: true,
      spacing: 2,
      setup: self => self.hook(searchInput, () => {
        const { text } = searchInput.value
        self.children =  text.trim().length > 0
          ? apps(text).map(({ item }) => Item(item))
          : list.map((item) => Item(item))
      }),
    })
  })
}


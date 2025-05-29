import GLib from 'gi://GLib?version=2.0'

import createFuzzySearch from '@nozbe/microfuzz'
import { AGS_LAUNCHER } from 'src/desktop/constants/windows'
import { SearchType, searchInput } from 'src/desktop/states/launcher'

const HOME = GLib.getenv('HOME')
const LAUNCHER = `${HOME}/.config/hypr/scripts/projects/launcher.sh`

export const PROJECTS = `${HOME}/.config/ags/data/.projects.json`

export type Project = {
  name: string
  icon: string
  path: string
  windows: string[]
}

const contents = Utils.readFile(PROJECTS)
const projectJson: Project[] = JSON.parse(contents) ?? [] as Project[]
const sortedProjects: Project[] = projectJson.sort((a, b) => a.name.localeCompare(b.name))

const projectList = createFuzzySearch(sortedProjects, {
  getText: (item) => [item.name],
})

export function getList(query: string) {
  if (!query) return sortedProjects

  return query.trim().length > 0
    ? projectList(query).map(({ item }) => item)
    : sortedProjects
}

function findFreeWorkspace() {
  const workspace = Utils.exec(`bash -c "hyprctl workspaces | grep 'ID' | awk '{print $3}'"`)
  const workspaceIDs = String(workspace).trim().split('\n').reduce((acc, index) => {
    const value = parseInt(index)
    if (isNaN(value) || value <= 0) return acc
    return [...acc, value]
  }, [] as number[])

  workspaceIDs.sort((a, b) => a - b)

  for (let i = 0; i < workspaceIDs.length; i++) {
    if (workspaceIDs[i] !== i + 1) {
      return i + 1
    }
  }
  return workspaceIDs.length + 1
}

export function onProjectSelected({ path, windows }: Project) {
  const workspace = findFreeWorkspace()

  // Open windows
  windows.forEach(() => {
    Utils.subprocess(['bash', '-c', `${LAUNCHER} ${path} ${workspace}`])
  })

  // Open special workspace
  Utils.subprocess(['bash', '-c', `${LAUNCHER} ${path} special`])

  App.closeWindow(AGS_LAUNCHER)
}

function Item(item: Project) {
  return Widget.Button({
    className: 'launcher__item',
    onClicked: () => onProjectSelected(item),
    child: Widget.Box({
      className: 'launcher__item__container',
      children: [
        Widget.Icon({
          className: 'launcher__item__icon',
          icon: item.icon || '',
          size: 22,
        }),
        Widget.Label({
          className: 'launcher__item__label',
          label: item.name,
          xalign: 0,
          vpack: 'center',
          truncate: 'end',
        })
      ]
    })
  })
}

export function Projects() {
  return Widget.Scrollable({
    className: 'launcher__scroll',
    hscroll: 'never',
    setup: self => self.hook(searchInput, () => {
      const { text, type } = searchInput.value
      const total = text.trim().length > 0
        ? projectList(text).length
        : sortedProjects.length
      const height = Math.min(total * 48, 500)

      self.visible = type === SearchType.PROJECT
      self.css = `min-height: ${height}px;`
    }),
    child: Widget.Box({
      className: 'launcher__list',
      vertical: true,
      spacing: 2,
      setup: self => self.hook(searchInput, () => {
        self.children = getList(searchInput.value.text).map((item) => Item(item))
      }),
    })
  })
}


const systemtray = await Service.import('systemtray')

export function Systray() {
  const items = systemtray.bind('items').as(items => items.map(Item))

  return Widget.Box({
    spacing: 6,
    className: 'bar__systray',
    children: items
  })
}

function Item(item: any) {
  return (
    Widget.Button({
      className: 'bar__systray__item',
      child: Widget.Icon({ icon: item.bind('icon') }),
      on_primary_click: (_, event) => item.activate(event),
      on_secondary_click: (_, event) => item.openMenu(event),
      tooltip_markup: item.bind('tooltip_markup'),
    })
  )
}

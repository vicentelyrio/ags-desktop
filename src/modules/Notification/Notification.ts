const notifications = await Service.import('notifications')

function NotificationIcon({ app_entry, app_icon, image }) {
  if (image) {
    return Widget.Box({
      css: `background-image: url('${image}');`
        + 'background-size: contain;'
        + 'background-repeat: no-repeat;'
        + 'background-position: center;',
    })
  }

  let icon = 'dialog-information-symbolic'

  if (Utils.lookUpIcon(app_icon)) icon = app_icon

  if (app_entry && Utils.lookUpIcon(app_entry)) icon = app_entry

  return Widget.Box({ child: Widget.Icon(icon) })
}

function Notification(n: any) {
  const icon = Widget.Box({
    vpack: 'start',
    className: 'notification__icon',
    child: NotificationIcon(n),
  })

  const title = Widget.Label({
    className: 'notification__title',
    xalign: 0,
    justification: 'left',
    hexpand: true,
    maxWidthChars: 24,
    truncate: 'end',
    wrap: true,
    label: n.summary,
    useMarkup: true,
  })

  const body = Widget.Label({
    className: 'notification__body',
    hexpand: true,
    xalign: 0,
    useMarkup: true,
    // maxWidthChars: 36,
    // truncate: 'end',
    justification: 'left',
    label: n.body,
    wrap: true,
  })

  const actions = Widget.Box({
    className: 'notification__actions',
    children: n.actions.map(({ id, label }) => Widget.Button({
      className: 'notification__actions__button',
      onClicked: () => {
        n.invoke(id)
        n.dismiss()
      },
      child: Widget.Label(label),
    })),
  })

  const info = Widget.Box({
    className: 'notification__info',
    vertical: true,
    children: [
      title,
      body,
      actions,
    ]
  })

  return Widget.EventBox({
    attribute: { id: n.id },
    onPrimaryClick: n.dismiss,
    child: Widget.Box({
      className: `notification notification--${n.urgency}`,
      vertical: true,
      child: Widget.Box({
        className: 'notification__container',
        children: [
          icon,
          info,
        ]
      })
    })
  })
}

export function NotificationPopups(monitor = 0) {
  const list = Widget.Box({
    vertical: true,
    children: notifications.popups.map(Notification),
  })

  function onNotified(_: any, id: number) {
    const n = notifications.getNotification(id)
    if (n) list.children = [Notification(n), ...list.children]
  }

  function onDismissed(_: any, id: number) {
    list.children.find(n => n.attribute.id === id)?.destroy()
  }

  list.hook(notifications, onNotified, 'notified')
    .hook(notifications, onDismissed, 'dismissed')

  return Widget.Window({
    monitor,
    name: `ags-notifications`,
    className: 'notifications',
    layer: 'overlay',
    anchor: ['top', 'right'],
    child: Widget.Box({
      className: 'notifications',
      vertical: true,
      child: list,
    }),
  })
}

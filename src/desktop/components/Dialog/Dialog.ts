import { Widget as WidgetType } from 'types/@girs/gtk-3.0/gtk-3.0.cjs'
import { WindowProps } from 'types/widgets/window'

export type DialogProps = {
  title?: string | WidgetType
  description?: string | WidgetType
  content?: WidgetType
  onConfirm: () => void
}

function DialogTitle(title?: string | WidgetType) {
  if (!title || typeof title === 'string') {
    return  Widget.Label({
      label: title,
      className: 'dialog__title',
      hpack: 'start',
      wrap: true,
      xalign: 0,
    })
  }

  return title
}

function DialogDescription(description?: string | WidgetType) {
  if (!description || typeof description === 'string') {
    return  Widget.Label({
      label: description,
      className: 'dialog__description',
      hpack: 'start',
      wrap: true,
      xalign: 0,
    })
  }

  return description
}

function DialogActions(onConfirm: () => void, onCancel: () => void) {
  return Widget.Box({
    className: 'dialog__actions',
    spacing: 12,
    hpack: 'end',
    children: [
      Widget.Button({
        className: 'dialog__actions__cancel',
        label: 'CANCEL',
        onClicked: onCancel,
      }),
      Widget.Button({
        className: 'dialog__actions__confirm',
        label: 'CONFIRM',
        onClicked: onConfirm,
      }),
    ]
  })
}

function DialogBox(props: DialogProps, onCancel: () => void) {
  const { content, title, description, onConfirm } = props

  const children = content
    ? [
      content,
      DialogActions(onConfirm, onCancel),
    ]
    : [
      DialogTitle(title),
      DialogDescription(description),
      DialogActions(onConfirm, onCancel),
    ]

  return Widget.Box({
    className: 'dialog__box',
    vpack: 'fill',
    vertical: true,
    child: Widget.Box({
      className: 'dialog__content',
      vpack: 'fill',
      vertical: true,
      spacing: 8,
      children
    })
  })
}

export function Dialog(windowProps: WindowProps, dialogProps: DialogProps) {
  const name = windowProps.name as string

  function close() {
    App.closeWindow(name)
  }

  const win = Widget.Window({
    ...windowProps,
    className: 'dialog',
    child: DialogBox(dialogProps, close),
    keymode: 'exclusive',
    setup: (self) => self.keybind('Escape', close),
  })

  return win
}


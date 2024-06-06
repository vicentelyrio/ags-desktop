import { AGS_MEDIA_PREVIEW } from 'src/constants/windows'
import { lastMediaPlayed } from 'src/states/media'
import { findIconByName } from 'src/utils/findIconByName'
import { MprisPlayer } from 'types/service/mpris'

const mpris = await Service.import('mpris')

const FALLBACK_ICON = 'audio-x-generic-symbolic'

function Preview(player: MprisPlayer) {
  if (!player || player?.play_back_status === 'Stopped') return Widget.Box()

  const img = Widget.Box({
    className: 'mediaPreview__cover',
    vpack: 'start',
    css: player.bind('cover_path').transform(p => `background-image: url('${p}');`),
  })

  const title = Widget.Label({
    className: 'mediaPreview__title',
    wrap: true,
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 22,
    label: player.bind('track_title'),
  })

  const artist = Widget.Label({
    className: 'mediaPreview__artist',
    wrap: true,
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 30,
    label: player.bind('track_artists').transform(a => a.join(', ')),
  })

  const icon = Widget.Icon({
    className: 'mediaPreview__icon',
    hexpand: true,
    hpack: 'end',
    vpack: 'start',
    tooltip_text: player.identity || '',
    icon: player.bind('name').transform((name) => {
      return findIconByName(name) ?? FALLBACK_ICON
    }),
  })

  return Widget.Box({
    className: 'mediaPreview__container',
    children: [
      img,
      Widget.Box({
        hexpand: true,
        children: [
          Widget.Box({
            vertical: true,
            vpack: 'center',
            children: [ title, artist ]
          }),
          icon,
        ]
      })
    ]
  })
}

export function MediaPreview(monitor = 0) {
  return (
    Widget.Window({
      name: AGS_MEDIA_PREVIEW,
      monitor,
      className: 'mediaPreview',
      visible: false,
      layer: 'overlay',
      anchor: ['top'],
      child: Widget.EventBox({
        child: Utils.merge([mpris.bind('players'), lastMediaPlayed.bind()], (players, last) => {
          return Preview(last ? last : players[0])
        }),
        onHoverLost: () => App.closeWindow(AGS_MEDIA_PREVIEW),
      })
    })
  )
}


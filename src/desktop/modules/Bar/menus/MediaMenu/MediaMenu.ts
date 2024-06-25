import { AGS_BAR_MEDIA_MENU } from 'src/desktop/constants/windows'
import { lastMediaPlayed } from 'src/desktop/states/media'
import { findIconByName } from 'src/desktop/utils/findIconByName'
import { MprisPlayer } from 'types/service/mpris'

const mpris = await Service.import('mpris')

const FALLBACK_ICON = 'audio-x-generic-symbolic'

function Preview(player: MprisPlayer) {
  if (!player || player?.play_back_status === 'Stopped') return Widget.Box()

  const img = Widget.Box({
    className: 'bar__media__cover',
    vpack: 'start',
    css: player.bind('cover_path').transform(p => `background-image: url('${p}');`),
  })

  const title = Widget.Label({
    className: 'bar__media__title',
    wrap: true,
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 22,
    label: player.bind('track_title'),
  })

  const artist = Widget.Label({
    className: 'bar__media__artist',
    wrap: true,
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 30,
    label: player.bind('track_artists').transform(a => a.join(', ')),
  })

  const icon = Widget.Icon({
    className: 'bar__media__icon',
    hexpand: true,
    hpack: 'end',
    vpack: 'start',
    tooltip_text: player.identity || '',
    icon: player.bind('name').transform((name) => {
      return findIconByName(name) ?? FALLBACK_ICON
    }),
  })

  return Widget.Box({
    className: 'bar__media__container',
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

export function MediaMenu(monitor = 0) {
  return (
    Widget.Window({
      name: AGS_BAR_MEDIA_MENU,
      monitor,
      className: 'bar__media',
      visible: false,
      layer: 'overlay',
      anchor: ['top'],
      child: Widget.EventBox({
        child: Utils.merge([mpris.bind('players'), lastMediaPlayed.bind()], (players, last) => {
          return Preview(last ? last : players[0])
        }),
        onHoverLost: () => App.closeWindow(AGS_BAR_MEDIA_MENU),
      })
    })
  )
}


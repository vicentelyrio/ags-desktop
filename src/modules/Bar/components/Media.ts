import { MprisPlayer } from 'types/service/mpris'

const mpris = await Service.import('mpris')

const lastPlayed = Variable('')

// const FALLBACK_ICON = 'audio-x-generic-symbolic'
const PLAY_ICON = 'media-playback-start-symbolic'
const PAUSE_ICON = 'media-playback-pause-symbolic'
const PREV_ICON = 'media-skip-backward-symbolic'
const NEXT_ICON = 'media-skip-forward-symbolic'

function className(cl: string, status: boolean) {
  return status ? cl : `${cl} ${cl}--disabled`
}

function Player(player: MprisPlayer) {
  // const img = Widget.Box({
  //   class_name: 'bar__player__cover',
  //   vpack: 'start',
  //   css: player.bind('cover_path').transform(p => ` background-image: url('${p}'); `),
  // })

  // const title = Widget.Label({
  //   class_name: 'bar__player__title',
  //   label: player.bind('track_title'),
  // })

  // const icon = Widget.Icon({
  //   className: 'bar__player__icon',
  //   hexpand: true,
  //   hpack: 'center',
  //   vpack: 'center',
  //   size: 20,
  //   tooltip_text: player.identity || '',
  //   icon: Utils.merge([player.bind('name'), player.bind('entry')], (name, entry) => (
  //     findIconByName(entry || name) ?? FALLBACK_ICON
  //   )),
  // })

  const playPause = Widget.Button({
    onClicked: () => player.playPause(),
    className: player.bind('can_play').as(s => className('bar__player__play', s)),
    child: Widget.Icon({
      icon: player.bind('play_back_status').transform(s => {
        switch (s) {
          case 'Playing': return PAUSE_ICON
          case 'Paused':
          case 'Stopped': return PLAY_ICON
        }
      }),
    }),
  })

  const previous = Widget.Button({
    onClicked: () => player.previous(),
    className: player.bind('can_go_prev').as(s => className('bar__player__previous', s)),
    child: Widget.Icon(PREV_ICON),
  })

  const next = Widget.Button({
    onClicked: () => player.next(),
    className: player.bind('can_go_next').as(s => className('bar__player__next', s)),
    child: Widget.Icon(NEXT_ICON),
  })

  return Widget.Box({
    className: 'bar__player',
    spacing: 4,
    visible: lastPlayed.bind().as((s) => s === player.name),
    children: [
      previous,
      playPause,
      next,
    ]
  })
}

export function Media() {
  const players = mpris.bind('players')

  mpris.connect('changed', (service) => {
    const player = service.players.find((p) => p.play_back_status === 'Playing')

    if (player) lastPlayed.value = player.name
  })

  return Widget.Box({
    children: players.as(p => p.map(Player)),
  })
}

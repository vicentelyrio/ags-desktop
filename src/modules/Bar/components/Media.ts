import { MprisPlayer } from 'types/service/mpris'
import { lastMediaPlayed } from 'src/states/media'
import { AGS_BAR_MEDIA_MENU } from 'src/constants/windows'

const mpris = await Service.import('mpris')

const PLAY_ICON = 'media-playback-start-symbolic'
const PAUSE_ICON = 'media-playback-pause-symbolic'
const PREV_ICON = 'media-skip-backward-symbolic'
const NEXT_ICON = 'media-skip-forward-symbolic'

function className(cl: string, status: boolean) {
  return status ? cl : `${cl} ${cl}--disabled`
}

function DefaultButtons() {
  const playPause = Widget.Button({
    className: className('bar__player__play', false),
    child: Widget.Icon(PLAY_ICON),
  })

  const previous = Widget.Button({
    className: className('bar__player__previous', false),
    child: Widget.Icon(PREV_ICON),
  })

  const next = Widget.Button({
    className: className('bar__player__next', false),
    child: Widget.Icon(NEXT_ICON),
  })

  return [previous, playPause, next]
}

function Buttons(player: MprisPlayer) {
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

  return [previous, playPause, next]
}

function Player(player?: MprisPlayer) {
  const buttons = player ? Buttons(player) : DefaultButtons()

  return Widget.EventBox({
    onHover: () => App.openWindow(AGS_BAR_MEDIA_MENU),
    onHoverLost: () => App.closeWindow(AGS_BAR_MEDIA_MENU),
    child: Widget.Box({
      className: 'bar__player',
      spacing: 4,
      children: buttons
    })
  })
}

export function Media() {
  return Widget.Box({
    child: Utils.merge([mpris.bind('players'), lastMediaPlayed.bind()], (players, last) => {
      if (players.length === 0) return Player()

      return Player(last ? last : players[0])
    })
  })
}

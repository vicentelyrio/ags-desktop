import { AGS_MEDIA_PREVIEW } from 'src/constants/windows'
import { Source } from 'types/@girs/glib-2.0/glib-2.0.cjs'
import { MprisPlayer } from 'types/service/mpris'

const mpris = await Service.import('mpris')
let timer: Source

export const lastMediaPlayed = Variable<MprisPlayer | null>(null)

// Manage Last Media Played
mpris.connect('changed', (service) => {
  const player = service.players.find((p) => p.play_back_status === 'Playing')

  if (player) lastMediaPlayed.setValue(player)
})

mpris.connect('player-closed', (service) => {
  const player = service.players.find((p) => lastMediaPlayed?.value?.name === p.name)

  if (!player) lastMediaPlayed.setValue(null)
})

// Player Preview timeout
App.connect('window-toggled', (_app, windowname, visible) => {
  if (windowname !== AGS_MEDIA_PREVIEW) return

  clearTimeout(timer)

  if (visible) {
    timer = setTimeout(() => {
      App.closeWindow(AGS_MEDIA_PREVIEW)
    }, 2000)
  }
})

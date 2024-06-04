import { MprisPlayer } from 'types/service/mpris'

const mpris = await Service.import('mpris')

export const lastMediaPlayed = Variable<MprisPlayer | null>(null)

mpris.connect('changed', (service) => {
  const player = service.players.find((p) => p.play_back_status === 'Playing')

  if (player) lastMediaPlayed.setValue(player)
})

mpris.connect('player-closed', (service) => {
  const player = service.players.find((p) => lastMediaPlayed?.value?.name === p.name)

  if (!player) lastMediaPlayed.setValue(null)
})


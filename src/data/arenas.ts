import type { Arena, Game } from '../types'

const normalize = (value: string) => value.trim().toLocaleLowerCase('nb-NO')

export const arenas: Arena[] = [
  {
    id: 'arena:cc-amfi',
    name: 'CC Amfi',
    aliases: ['CC Amfi', 'Hamar OL-Amfi', 'Hamar Olympiske Amfi', 'Nordlyshallen'],
    city: 'Hamar',
    latitude: 60.80095,
    longitude: 11.03778,
    nearRadiusMeters: 1000,
    arrivalRadiusMeters: 250,
  },
]

export function arenaForGame(game: Game): Arena | undefined {
  const arenaName = normalize(game.arena)
  return arenas.find((arena) =>
    arena.aliases.some((alias) => normalize(alias) === arenaName),
  )
}

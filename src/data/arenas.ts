import type { Arena, Game } from '../types'

const normalize = (value: string) => value.trim().toLocaleLowerCase('nb-NO')

const defaultRadii = {
  nearRadiusMeters: 1000,
  arrivalRadiusMeters: 250,
}

export const arenas: Arena[] = [
  {
    id: 'arena:cc-amfi',
    name: 'CC Amfi',
    aliases: ['CC Amfi', 'Hamar OL-Amfi', 'Hamar Olympiske Amfi', 'Nordlyshallen'],
    city: 'Hamar',
    latitude: 60.80095,
    longitude: 11.03778,
    ...defaultRadii,
  },
  {
    id: 'arena:nobelhallen',
    name: 'Nobelhallen',
    aliases: ['Nobelhallen'],
    city: 'Karlskoga',
    latitude: 59.33667,
    longitude: 14.52028,
    ...defaultRadii,
  },
  {
    id: 'arena:sparta-amfi',
    name: 'Sparta Amfi',
    aliases: ['Sparta Amfi', 'Sparta amfi'],
    city: 'Sarpsborg',
    latitude: 59.28054,
    longitude: 11.08824,
    ...defaultRadii,
  },
  {
    id: 'arena:zondacrypto-arena',
    name: 'zondacrypto Arena',
    aliases: ['zondacrypto Arena', 'Zondacrypto Arena', 'Eisstadion Davos', 'Vaillant Arena'],
    city: 'Davos',
    latitude: 46.79854,
    longitude: 9.82639,
    ...defaultRadii,
  },
  {
    id: 'arena:vernets',
    name: 'Patinoire des Vernets',
    aliases: ['Patinoire des Vernets', 'Les Vernets'],
    city: 'Genève',
    latitude: 46.1945,
    longitude: 6.13301,
    ...defaultRadii,
  },
  {
    id: 'arena:nokia-areena',
    name: 'Nokia Areena',
    aliases: ['Nokia Areena', 'Nokia Arena'],
    city: 'Tampere',
    latitude: 61.4936,
    longitude: 23.77394,
    ...defaultRadii,
  },
  {
    id: 'arena:dnb-arena',
    name: 'DNB Arena',
    aliases: ['DNB Arena'],
    city: 'Stavanger',
    latitude: 58.9535,
    longitude: 5.69037,
    ...defaultRadii,
  },
  {
    id: 'arena:leangen-arena',
    name: 'Leangen Arena',
    aliases: ['Leangen Arena'],
    city: 'Trondheim',
    latitude: 63.42775,
    longitude: 10.46622,
    ...defaultRadii,
  },
  {
    id: 'arena:nordkraft-arena',
    name: 'Nordkraft Arena',
    aliases: ['Nordkraft Arena'],
    city: 'Narvik',
    latitude: 68.4359,
    longitude: 17.41168,
    ...defaultRadii,
  },
  {
    id: 'arena:schjongshallen',
    name: 'Schjongshallen',
    aliases: ['Schjongshallen'],
    city: 'Hønefoss',
    latitude: 60.1571,
    longitude: 10.2629,
    ...defaultRadii,
  },
  {
    id: 'arena:hakons-hall',
    name: 'Håkons Hall',
    aliases: ['Håkons Hall', 'Hakons Hall'],
    city: 'Lillehammer',
    latitude: 61.12387,
    longitude: 10.47395,
    ...defaultRadii,
  },
  {
    id: 'arena:stjernehallen',
    name: 'Stjernehallen',
    aliases: ['Stjernehallen'],
    city: 'Fredrikstad',
    latitude: 59.22583,
    longitude: 10.94563,
    ...defaultRadii,
  },
  {
    id: 'arena:jordal-amfi',
    name: 'Jordal Amfi',
    aliases: ['Jordal Amfi'],
    city: 'Oslo',
    latitude: 59.91117,
    longitude: 10.78396,
    ...defaultRadii,
  },
  {
    id: 'arena:varner-arena',
    name: 'Varner Arena',
    aliases: ['Varner Arena', 'Risenga Ishall'],
    city: 'Asker',
    latitude: 59.82466,
    longitude: 10.4473,
    ...defaultRadii,
  },
  {
    id: 'arena:eidsiva-arena',
    name: 'Eidsiva Arena',
    aliases: ['Eidsiva Arena', 'Kristins Hall', 'Kristins hall'],
    city: 'Lillehammer',
    latitude: 61.12319,
    longitude: 10.47147,
    ...defaultRadii,
  },
]

export function arenaForGame(game: Game): Arena | undefined {
  const arenaName = normalize(game.arena)
  return arenas.find((arena) =>
    arena.aliases.some((alias) => normalize(alias) === arenaName),
  )
}

import type { ArchivePerson } from './types'

export interface ChampionPlayerEntry {
  sourceName: string
  archiveName: string
  championships: 1 | 2 | 3 | 4 | 5
}

const sourceUrl = 'https://www.sil.no/historietirsdag-10-gull/'
const verifiedAt = '2026-09-28'

const aliases: Record<string, string> = {
  'Janne Karlsson': 'Jan Karlsson',
  'Andre M. Hansen': 'André Manskov Hansen',
  'Tom C. Myhre': 'Tom Cato Myhre',
  'Simen L Hansen': 'Simen Løvhaug Hansen',
  'Simen A. Edvardsen': 'Simen André Edvardsen',
  'Henrik Fayen Vestavik': 'Henrik Fayen-Vestavik',
}

function rows(championships: ChampionPlayerEntry['championships'], names: string[]): ChampionPlayerEntry[] {
  return names.map((sourceName) => ({ sourceName, archiveName: aliases[sourceName] ?? sourceName, championships }))
}

export const championPlayers: ChampionPlayerEntry[] = [
  ...rows(5, ['Tom Erik Olsen', 'Ole Eskild Dahlstrøm', 'Pål Johnsen']),
  ...rows(4, ['Petter Salsten', 'Martin Åhlberg', 'Alexander Smirnov', 'Magnus Østeraas', 'Martin Rønnild', 'Jacob Berglund']),
  ...rows(3, ['Erik Kristiansen', 'Pål Martinsen', 'Jon-Hroar Nordstrøm', 'Carl Oscar Bøe Andersen', 'Tommy Larsen', 'Jim Marthinsen', 'Svein Harald Arnesen', 'Morten Fjeld', 'Jonas Norgren', 'Eirik Skadsdammen', 'Lars Erik Hesbråten', 'Andreas Martinsen', 'Stefan Espeland', 'Andreas Dahl', 'Sander Hurrød', 'Sverre Rønningen', 'Andreas Hjelm', 'Kenneth Pappalardo', 'Marcus Bryhnisveen', 'Axel Sandnes', 'Markus Stensrud', 'Mathias Papuga']),
  ...rows(2, ['Peter Madach', 'Rune Gulliksen', 'Patrick Eide', 'Klas Forfang', 'Lubos Sikela', 'Jouri Leonov', 'Torkil Brustad', 'Geir Svendsberget', 'Snorre Hallem', 'Michael Smithurst', 'Mattias Livf', 'Cato Ørbæk', 'Joakim Jensen', 'Christian Bull', 'Victor Svensson', 'Samuel Solem', 'Adrian Saxrud-Danielsen', 'Austin Cangelosi', 'Mats Bakke Olsen', 'Joe Gatenby', 'David Aas-Larsen']),
  ...rows(1, ['Petter Thoresen', 'Janne Karlsson', 'Kent Inge Kristiansen', 'Jan Tore Rønningen', 'Tommy Marthinsen', 'Andre M. Hansen', 'Tom C. Myhre', 'Fredrik Möller', 'Mads Hansen', 'Joakim Andersson', 'Johnny Bruun', 'Anders Kolbuholen', 'Ole Fredrik Kirkebye', 'Mikael Bohman', 'Antti Rahkonen', 'Joakim Persson', 'Igor Alexandrov', 'Knut Henrik Spets', 'Chris Marinucci', 'Jarkko Väänänen', 'Christian Olasveengen', 'Mikael Tjällden', 'Ola Johannessen', 'Simen Saxrud', 'Christian Saxrud', 'Geir Østberg', 'Linus Stensson', 'Johan Älgekrans', 'Henric Höglund', 'Eerikki Koivu', 'Kristian Forsberg', 'Chris Leinweber', 'Teemu Khovakka', 'Martin Thelander', 'Lars Løkken Østli', 'Jon T. Rømoen', 'Martin B. Huse', 'Trygve Hillestad', 'Mats L. Mostue', 'Simen H. Johannessen', 'Ruben Smith', 'Kodie Curran', 'Mikael Zettergren', 'Christian Larrivée', 'Robin Dahlstrøm', 'Josh Nicholls', 'Jimmy Andersson', 'Hampus Gustafsson', 'Kjetil Martinsen', 'Mikkel Søgaard', 'Simen L Hansen', 'Kenney Morrison', 'Mikael Dokken', 'Simen A. Edvardsen', 'Emil Frøshaug', 'Oskar Östlund', 'Robert Hestmann', 'Jonas Strand', 'Patrick Thoresen', 'Peter Quenneville', 'Eirik Salsten', 'Martin Johnsen', 'Jakub Kindl', 'Maxim Trepanier', 'Villiam Strøm', 'Jacob Lundell Noer', 'Alex D’Orio', 'Cole Schneider', 'Håvard Salsten', 'Trym Gran', 'Colin Campbell', 'Zach O’Brien', 'Amil Krupic', 'Olle Liss', 'Isac Skedung', 'Oliver Nilsgård', 'Henrik Fayen Vestavik']),
]

function slugifyName(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/æ/gi, 'ae')
    .replace(/ø/gi, 'o')
    .replace(/å/gi, 'a')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function buildChampionSupplementPlayers(existingPlayers: ArchivePerson[]): ArchivePerson[] {
  const existingNames = new Set(existingPlayers.map((player) => player.fullName))

  return championPlayers
    .filter((entry) => !existingNames.has(entry.archiveName))
    .map((entry) => ({
      id: `player-champion-${slugifyName(entry.archiveName)}`,
      title: entry.archiveName,
      fullName: entry.archiveName,
      slug: `${slugifyName(entry.archiveName)}-norgesmester`,
      summary: `${entry.archiveName} er dokumentert som ${entry.championships === 1 ? 'norgesmester' : `${entry.championships}-gangers norgesmester`} med Storhamar.`,
      body: [
        `Storhamars offisielle oppsummering etter NM-gullet i 2026 fører ${entry.sourceName} med ${entry.championships} ${entry.championships === 1 ? 'norgesmesterskap' : 'norgesmesterskap'} for klubben.`,
        'Dette er en kildebasert minimumsprofil. Sesonger, draktnummer, statistikk og biografi fylles først når de er kontrollert mot SIL-arkivets spiller- og sesongmateriale.',
      ],
      completeness: 'partial',
      sources: ['storhamar-official'],
      media: [],
      related: [],
      seasonIds: [],
      honourIds: [],
      roles: ['spiller', 'norgesmester'],
      tags: [`nm-gull:${entry.championships}`, `source:${sourceUrl}`],
      lastVerifiedAt: verifiedAt,
    }))
}

export const championPlayersSummary = {
  totalUniqueChampions: championPlayers.length,
  fiveTimeChampions: championPlayers.filter((entry) => entry.championships === 5).length,
  fourTimeChampions: championPlayers.filter((entry) => entry.championships === 4).length,
  threeTimeChampions: championPlayers.filter((entry) => entry.championships === 3).length,
  twoTimeChampions: championPlayers.filter((entry) => entry.championships === 2).length,
  oneTimeChampions: championPlayers.filter((entry) => entry.championships === 1).length,
  sourceUrl,
} as const

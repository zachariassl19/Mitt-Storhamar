import type { ArchivePerson, ArchiveMedia } from './types'

const verifiedAt = '2026-10-06'

const adrianMedia: ArchiveMedia = {
  id: 'media-player-adrian-saxrud-danielsen',
  type: 'photo',
  src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/asaxdanielsen.jpg?resize=600%2C408',
  alt: 'Adrian Saxrud-Danielsen i Storhamar',
  caption: 'Adrian Saxrud-Danielsen, egenutviklet back med ni registrerte Storhamar-sesonger.',
  credit: 'SIL-arkivet',
  sourceId: 'silarkivet',
  sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
  personIds: ['player-adrian-saxrud-danielsen'],
  rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
}

export const verifiedPlayerSupplements: ArchivePerson[] = [
  {
    id: 'player-adrian-saxrud-danielsen',
    title: 'Adrian Saxrud-Danielsen',
    fullName: 'Adrian Saxrud-Danielsen',
    slug: 'adrian-saxrud-danielsen',
    summary: 'Egenutviklet Storhamar-back med ni registrerte sesonger fordelt på 2008–15 og 2022–25. To ganger norgesmester og to ganger seriemester.',
    body: [
      'Adrian Saxrud-Danielsen debuterte på A-laget som 16-åring og etablerte seg gradvis som back i Storhamar før han dro ut sommeren 2015.',
      'Etter sju sesonger utenfor klubben, med spill i blant annet Danmark, Sverige, Østerrike og England samt norske opphold, vendte han tilbake til Storhamar i 2022.',
      'SIL-arkivets oppdaterte spillerprofil fører ni Storhamar-sesonger totalt, draktnummer 27 og 47 og perioden 2008–15 / 2022–25. Den eldre alumni-teksten som bare dekker første periode skal derfor ikke brukes som full karrierefasit.',
    ],
    completeness: 'verified',
    sources: ['silarkivet'],
    media: [adrianMedia],
    related: [
      { kind: 'season', id: 'season-2008-09' },
      { kind: 'season', id: 'season-2010-11' },
      { kind: 'season', id: 'season-2011-12' },
      { kind: 'season', id: 'season-2012-13' },
      { kind: 'season', id: 'season-2013-14' },
      { kind: 'season', id: 'season-2014-15' },
      { kind: 'season', id: 'season-2022-23' },
      { kind: 'season', id: 'season-2023-24' },
      { kind: 'season', id: 'season-2024-25' },
    ],
    born: '1992-09-27',
    birthPlace: 'Hamar',
    position: 'Back',
    shirtNumbers: [27, 47],
    storhamarPeriods: [
      { fromSeasonId: 'season-2008-09', toSeasonId: 'season-2014-15' },
      { fromSeasonId: 'season-2022-23', toSeasonId: 'season-2024-25' },
    ],
    seasonIds: [
      'season-2008-09',
      'season-2010-11',
      'season-2011-12',
      'season-2012-13',
      'season-2013-14',
      'season-2014-15',
      'season-2022-23',
      'season-2023-24',
      'season-2024-25',
    ],
    honourIds: ['honour-2024-league', 'honour-2024-nm', 'honour-2025-league', 'honour-2025-nm'],
    roles: ['spiller', 'egenutviklet', 'back'],
    tags: ['verified-player-profile', '9-sesonger', 'back'],
    lastVerifiedAt: verifiedAt,
  },
]

export function applyVerifiedPlayerSupplements(players: ArchivePerson[]) {
  const supplementNames = new Set(verifiedPlayerSupplements.map((player) => player.fullName))
  return [
    ...players.filter((player) => !supplementNames.has(player.fullName)),
    ...verifiedPlayerSupplements,
  ]
}

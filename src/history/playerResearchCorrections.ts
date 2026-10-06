import type { ArchivePerson } from './types'

// Kilde: SIL-arkivet / Alumni S (kontrollert 06.10.2026).
// Viktig: 2 gullsesonger i researchregisteret er IKKE lik totalt antall Storhamar-sesonger.
const adrianSeasons = [
  'season-2008-09',
  'season-2010-11',
  'season-2011-12',
  'season-2012-13',
  'season-2013-14',
  'season-2014-15',
  'season-2022-23',
  'season-2023-24',
  'season-2024-25',
]

const adrianPhoto = {
  id: 'media-player-adrian-saxrud-danielsen',
  type: 'photo' as const,
  src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/asaxdanielsen.jpg?resize=600%2C408',
  alt: 'Adrian Saxrud-Danielsen i Storhamar-drakt',
  caption: 'Adrian Saxrud-Danielsen – back med ni sesonger i Storhamar.',
  credit: 'SIL-arkivet',
  sourceId: 'silarkivet',
  sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
  personIds: ['player-roster-adrian-saxrud-danielsen'],
  rightsNote: 'Historisk bilde fra SIL-arkivet. Bruk av materialet følger prosjektets avtale med arkivet.',
}

export function enrichVerifiedPlayers(players: ArchivePerson[]): ArchivePerson[] {
  return players.map((player) => {
    if (player.fullName !== 'Adrian Saxrud-Danielsen') return player
    return {
      ...player,
      title: 'Adrian Saxrud-Danielsen',
      summary: 'Hamar-gutt og egenutviklet back med ni Storhamar-sesonger: 2008/09, 2010/11–2014/15 og 2022/23–2024/25.',
      body: [
        'Adrian debuterte på A-laget som 16-åring og spilte i Storhamar fram til 2015. Etter flere sesonger i andre klubber og land kom han tilbake til Storhamar i 2022.',
        'Han spilte tre nye sesonger i gult og blått og var med på både serie- og NM-gullene i 2024 og 2025. Sesongen 2024/25 ble hans beste, og han spilte seg inn i Norges VM-tropp.',
        'SIL-arkivet teller totalt ni sesonger. Det gamle visningstallet «to sesonger» kom fra gullstallkoblinger, ikke fra hele spillerhistorikken.',
      ],
      position: 'Back',
      born: '1992-09-27',
      birthPlace: 'Hamar',
      nationality: 'Norge',
      shirtNumbers: [27, 47],
      storhamarPeriods: [
        { fromSeasonId: 'season-2008-09', toSeasonId: 'season-2014-15', note: 'En enkelt kamp i 2008/09; neste A-lagskamper fra 2010/11.' },
        { fromSeasonId: 'season-2022-23', toSeasonId: 'season-2024-25' },
      ],
      seasonIds: adrianSeasons,
      honourIds: ['honour-2024-league', 'honour-2024-nm', 'honour-2025-league', 'honour-2025-nm'],
      completeness: 'verified',
      sources: [...new Set([...player.sources, 'silarkivet'])],
      media: player.media.some((media) => media.src === adrianPhoto.src) ? player.media : [adrianPhoto, ...player.media],
      related: adrianSeasons.map((id) => ({ kind: 'season' as const, id })),
      tags: [...(player.tags ?? []), 'season-count:verified:9', 'https://silarkivet.no/alumni/alumni-s/'],
      lastVerifiedAt: '2026-10-06',
    }
  })
}

import type { ArchiveJersey, ArchiveMedia } from './types'

const seasonId = 'season-2025-26'
const kitArchive = 'https://thekitarchive.com/hockey/storhamar-2025-26-jerseys/'
const verifiedAt = '2026-11-03'

function image(id: string, src: string, alt: string, sourceUrl: string): ArchiveMedia {
  return {
    id, type: 'jersey', src, alt,
    caption: alt + '. Bildet viser begge sider av drakten.',
    credit: 'Hockey Jersey Archive',
    sourceUrl,
    seasonIds: [seasonId],
    rightsNote: 'Eksternt dokumentasjonsbilde. Bildekilden har egne rettigheter; videre bruk krever avklaring.',
  }
}

export const jerseys2025Chl: ArchiveJersey[] = [
  {
    id: 'jersey-2025-26-chl-home',
    title: '2025/26 · CHL · Hjemme',
    slug: '2025-26-chl-hjemme',
    summary: 'Blå og gul CHL-hjemmedrakt for 2025/26. Det mørke draktsettet fulgte turneringens draktregler.',
    body: [
      'Storhamar Hockey presenterte draktene 27. juli 2025 før hjemmekampene mot Eisbären Berlin og Sparta Praha.',
      'CHL stilte krav til mørk hjemmedrakt. Storhamar valgte derfor et design i gult og blått med en tydelig klubbidentitet. Draktene var eksklusive for Europa-turneringen og ble produsert etter CHLs maler.',
    ],
    completeness: 'verified', sources: ['storhamar-chl-2025', 'silarkivet'],
    media: [image(
      'media-2025-26-chl-home',
      'https://thekitarchive.com/hockey/image/2025/08/09/J4lbAILmEEl0YtL/storhamar-2025-26-european-home-1-jersey.jpg',
      'Storhamars blå og gule CHL-hjemmedrakt 2025/26',
      kitArchive,
    )],
    related: [{ kind: 'season', id: seasonId }, { kind: 'europe', id: 'europe-2025-26-chl' }],
    fromSeasonId: seasonId, toSeasonId: seasonId, seasonIds: [seasonId],
    usage: ['europe', 'home'], colours: ['blå', 'gul'],
    playerIds: [], notableMomentIds: [],
    tags: ['CHL','Europa','2025/26','hjemme','CHL-drakt'],
    lastVerifiedAt: verifiedAt,
  },
  {
    id: 'jersey-2025-26-chl-away',
    title: '2025/26 · CHL · Borte',
    slug: '2025-26-chl-borte',
    summary: 'Hvit CHL-bortedrakt med gule og blå detaljer. Klubben valgte en lysere farge enn vanlig.',
    body: [
      'Den hvite bortedrakten for CHL 2025/26 ble presentert sammen med det mørkeblå hjemmesettet 27. juli 2025.',
      'Storhamar Hockey beskrev hvitt som den foretrukne lyse fargen under CHL-reglene og valgte denne fargen for å gjøre noe annerledes. Blå og gule detaljer sørget for å bevare klubbidentiteten.',
    ],
    completeness: 'verified', sources: ['storhamar-chl-2025', 'silarkivet'],
    media: [image(
      'media-2025-26-chl-away',
      'https://thekitarchive.com/image/2025/08/09/cFjT7cYEAN58nYM/storhamar-2025-26-european-away-1-jersey.jpg',
      'Storhamars hvite CHL-bortedrakt 2025/26 med blå og gule detaljer',
      'https://thekitarchive.com/hockey/storhamar-2025-26-european-away-1-jersey/85068/',
    )],
    related: [{ kind: 'season', id: seasonId }, { kind: 'europe', id: 'europe-2025-26-chl' }],
    fromSeasonId: seasonId, toSeasonId: seasonId, seasonIds: [seasonId],
    usage: ['europe', 'away'], colours: ['hvit', 'blå', 'gul'],
    playerIds: [], notableMomentIds: [],
    tags: ['CHL','Europa','2025/26','borte','CHL-drakt'],
    lastVerifiedAt: verifiedAt,
  },
]

// Original photos are attributed to Hockey Jersey Archive in each media record.

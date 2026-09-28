import type { ArchiveLegend, ArchiveTimelineEvent } from './types'

const verifiedAt = '2026-09-28'

// Storhamar Hockey er primærkilden for denne nyere milepælen.
// Klubben omtaler Marthe Østeraas som den første kvinnelige utøveren i norsk hockey
// som har fått draktnummeret sitt heist i taket.
export const womenHistoryLegends: ArchiveLegend[] = [
  {
    id: 'legend-marthe-osteraas',
    title: 'Marthe Østeraas · #21',
    fullName: 'Marthe Østeraas',
    slug: 'marthe-osteraas-i-taket',
    summary: 'Pioner for kvinne- og jentehockeyen i Storhamar. Nummer 21 ble heist i taket 28. februar 2026, og hun ble den første kvinnelige utøveren i norsk hockey som fikk denne æren.',
    body: [
      'Marthe Østeraas var en foregangsperson for kvinne- og jentehockeyen i Storhamar. Som ung spilte hun med gutta fordi det ikke fantes et eget tilbud for jenter.',
      'Før hun avsluttet spillerkarrieren hadde hun vært en sentral pådriver for å få opprettet damelag og hockeytilbud for jenter i flere aldre i klubben. Hun spilte også for andre norske klubber med kvinnelag og har senere vært dommer i en årrekke.',
      '28. februar 2026 ble nummer 21 heist i taket i forbindelse med damelagets kamp mot Lillehammer. Storhamar Hockey beskrev henne da som den første kvinnelige utøveren i norsk hockey som hadde fått denne æren.',
    ],
    completeness: 'verified',
    sources: ['storhamar-official'],
    media: [],
    related: [
      { kind: 'season', id: 'season-2025-26' },
      { kind: 'timeline', id: 'timeline-2026-marthe-osteraas-21' },
    ],
    shirtNumbers: [21],
    storhamarPeriods: [{ note: 'Spilte i Storhamar fra ung alder og var senere sentral i utviklingen av klubbens jente- og dametilbud. Eksakte sesonger kvalitetssikres i spillerarkivet.' }],
    seasonIds: ['season-2025-26'],
    honourIds: [],
    roles: ['spiller', 'pioner', 'dommer', 'hedret draktnummer'],
    honouredNumber: 21,
    honouredAt: '2026-02-28',
    honourReason: 'Foregangsperson for kvinne- og jentehockeyen i Storhamar og norsk hockey.',
    lastVerifiedAt: verifiedAt,
  },
]

export const womenHistoryTimeline: ArchiveTimelineEvent[] = [
  {
    id: 'timeline-2026-marthe-osteraas-21',
    title: 'Historisk: Marthe Østeraas #21 i taket',
    slug: '2026-marthe-osteraas-21-i-taket',
    summary: '28. februar 2026 ble Marthe Østeraas’ nummer 21 heist i taket. Hun ble den første kvinnelige utøveren i norsk hockey som fikk denne æren.',
    body: [
      'Hedringen markerte både Marthe Østeraas’ egen innsats og hennes betydning for utviklingen av kvinne- og jentehockeyen i Storhamar.',
      'Milepælen skal behandles som en sentral del av klubbhistorien og ikke bare som en fotnote på en spillerprofil.',
    ],
    completeness: 'verified',
    sources: ['storhamar-official'],
    media: [],
    related: [
      { kind: 'legend', id: 'legend-marthe-osteraas' },
      { kind: 'season', id: 'season-2025-26' },
    ],
    date: '2026-02-28',
    year: 2026,
    era: 'Tre strake dobler',
    importance: 'major',
    lastVerifiedAt: verifiedAt,
  },
]

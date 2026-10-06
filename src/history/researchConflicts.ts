export interface HistoryResearchConflict {
  id: string
  entityId: string
  field: string
  status: 'open' | 'resolved'
  preferredValue?: string
  alternatives: Array<{ value: string; source: string; url: string; note?: string }>
  resolutionNote?: string
  lastCheckedAt: string
}

// Deliberately kept in code so contradictory historic numbers are visible to future
// research work instead of silently choosing whichever number was found first.
export const historyResearchConflicts: HistoryResearchConflict[] = [
  {
    id: 'conflict-1969-70-top-scorer-goals',
    entityId: 'season-1969-70',
    field: 'topScorers.goals',
    status: 'open',
    alternatives: [
      {
        value: '13',
        source: 'SIL-arkivet – sesongoversikt',
        url: 'https://silarkivet.no/sesonger/',
        note: 'Sesongoversikten og spillerprofilen er ikke helt samstemte.',
      },
      {
        value: '14',
        source: 'SIL-arkivet – spillerprofil',
        url: 'https://silarkivet.no/alumni/',
        note: 'Må avstemmes mot kamp-for-kamp-data før konflikt lukkes.',
      },
    ],
    lastCheckedAt: '2026-09-28',
  },
  {
    id: 'conflict-1991-92-rune-gulliksen-points',
    entityId: 'season-1991-92',
    field: 'topScorers.points',
    status: 'resolved',
    preferredValue: '57 totalt / 53 Eliteserien + 4 sluttspill',
    alternatives: [
      {
        value: '53',
        source: 'SIL-arkivet – samlet sesongoversikt',
        url: 'https://silarkivet.no/sesonger/',
        note: 'Dette tallet samsvarer med Rune Gulliksens spillerprofil for Eliteserien alene: 31 mål + 22 assist = 53 poeng.',
      },
      {
        value: '57',
        source: 'SIL-arkivet – detaljsiden for 1991/92',
        url: 'https://silarkivet.no/sesonger/90-tallet/1991-92/',
        note: 'Detaljsidens sesongtall inkluderer sluttspillet. Spillerprofilen fører ytterligere 4 sluttspillpoeng, slik at 53 + 4 = 57.',
      },
      {
        value: '53 serie + 4 sluttspill = 57 totalt',
        source: 'SIL-arkivet – Rune Gulliksen spillerprofil',
        url: 'https://silarkivet.no/alumni/alumni-g/',
      },
    ],
    resolutionNote: 'Tallene motsier ikke hverandre når avgrensningen gjøres eksplisitt. Bruk 53 for Eliteserien alene og 57 for serie + sluttspill.',
    lastCheckedAt: '2026-10-06',
  },
  {
    id: 'conflict-1996-97-dahlstrom-points',
    entityId: 'season-1996-97',
    field: 'topScorers.points',
    status: 'resolved',
    preferredValue: '92 totalt / 88 serie+sluttspill',
    alternatives: [
      {
        value: '92 totalt; 88 serie+sluttspill',
        source: 'SIL-arkivet – detaljsiden for 1996/97 og Dahlstrøm-profilen',
        url: 'https://silarkivet.no/sesonger/90-tallet/1996-97/',
        note: 'Detaljsiden forklarer eksplisitt at 92 er alle turneringer, mens statistikkfeltet viser 88 med sluttspill.',
      },
      {
        value: '94',
        source: 'SIL-arkivet – samlet sesongoversikt',
        url: 'https://silarkivet.no/sesonger/',
        note: 'Avviker fra både detaljsiden og spillerbiografien og må avstemmes mot kamp-for-kamp-statistikken.',
      },
    ],
    resolutionNote: 'Detaljsiden for 1996/97 oppgir eksplisitt 92 poeng i alle turneringer og 88 i serie + sluttspill. Dahlstrøms spillerprofil bekrefter 92 totalt. Tallet 94 i den samlede sesongindeksen behandles derfor som en indeksfeil, men beholdes som dokumentert alternativ.',
    lastCheckedAt: '2026-10-06',
  },
]

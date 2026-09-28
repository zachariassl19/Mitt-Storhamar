export const canonicalLeagueChampionshipIds = [
  'honour-1993-first-eliteserie', // 1992/93
  'honour-1993-first-series',    // 1993/94
  'honour-1995-league',          // 1994/95
  'honour-1997-league',          // 1996/97
  'honour-2001-league',          // 2000/01
  'honour-2004-league',          // 2003/04
  'honour-2006-league',          // 2005/06
  'honour-2018-league',          // 2017/18
  'honour-2024-league',          // 2023/24
  'honour-2025-league',          // 2024/25
  'honour-2026-league',          // 2025/26
] as const

export const canonicalNorwegianChampionshipIds = [
  'honour-1995-nm',
  'honour-1996-nm',
  'honour-1997-nm',
  'honour-2000-nm',
  'honour-2004-nm',
  'honour-2008-nm',
  'honour-2018-nm',
  'honour-2024-nm',
  'honour-2025-nm',
  'honour-2026-nm',
] as const

export const canonicalChampionshipSummary = {
  leagueChampionships: 11,
  norwegianChampionships: 10,
  lastCompletedSeason: '2025/26',
  note: 'Storhamars offisielle merittoversikt teller både Eliteserie-del 2 i 1992/93 og første seriedel i 1993/94 som seriemesterskap. Datidens todelte serieformat forklares på de enkelte merittsidene.',
  sourceUrl: 'https://www.sil.no/klubben/',
} as const

import { historyArchive } from './catalog'
import { leadersForSeason } from './leadershipChronology'
import { careerTotals, careerStatDiscrepancies, careerNamesRepeated } from './careerTotals'
import { documentedNumberRows, officialNumberSourceIssues } from './numberIndex'
import type { ArchiveBase, ArchiveSeason } from './types'

/**
 * Checks what is ACTUALLY present in Mitt Storhamar, not just whether a
 * history object exists. A referenced source is not equivalent to a complete
 * season-by-season matchbook. Missing fields must remain visibly unresolved.
 */
export interface SeasonHistoryCoverage {
  id: string
  label: string
  startYear: number
  documentedRoster: number
  hasLeaguePosition: boolean
  hasFullLeagueTotals: boolean
  hasTopScorers: boolean
  hasCoach: boolean
  hasCaptain: boolean
  jerseyCount: number
  hasImageReference: boolean
  issues: string[]
  isPandemicException: boolean
}
export function linkedSeasonJerseys(season: ArchiveSeason) {
  return historyArchive.jerseys.filter((jersey) =>
    jersey.seasonIds.includes(season.id) ||
    season.jerseyIds.includes(jersey.id) ||
    (jersey.fromSeasonId && jersey.toSeasonId &&
      Number(jersey.fromSeasonId.slice(7,11)) <= season.startYear &&
      season.startYear <= Number(jersey.toSeasonId.slice(7,11)))
  )
}

export function seasonHistoryCoverage(season: ArchiveSeason): SeasonHistoryCoverage {
  const jerseys = linkedSeasonJerseys(season)
  const leadership = leadersForSeason(season.startYear)
  const hasFullLeagueTotals = season.standings.some((row) =>
    row.gamesPlayed != null && row.wins != null && row.points != null)
  const hasLeaguePosition = season.standings.some((row) => row.position != null)
  const hasCoach = season.coaches.length > 0 || leadership.coaches.length > 0
  const hasCaptain = season.captains.length > 0 || leadership.captains.length > 0
  const hasImageReference = season.media.length > 0 || jerseys.some((jersey) => jersey.media.length > 0)
  const isPandemicException = season.id === 'season-2020-21'
  const issues: string[] = []
  if (season.roster.length === 0) issues.push('Full spillerstall er ikke koblet til sesongen')
  if (!hasFullLeagueTotals) issues.push('Komplette serie-/tabelltall mangler i appen')
  if (!season.topScorers?.length) issues.push('Toppscorerstatistikk er ikke registrert')
  if (!hasCoach && season.startYear >= 1976) issues.push('Ingen dokumentert trener for sesongen')
  if (!hasCaptain && season.startYear >= 1982) issues.push('Ingen dokumentert kaptein for sesongen')
  if (jerseys.length === 0) issues.push('Drakter er ikke koblet til sesongen')
  if (!hasImageReference) issues.push('Ingen historisk bildekilde er knyttet til sesongen')
  if (isPandemicException) issues.push('2020/21 ble ikke fullført på grunn av pandemien')
  return {
    id:season.id,label:season.displayName,startYear:season.startYear,
    documentedRoster:season.roster.length,hasLeaguePosition,hasFullLeagueTotals,
    hasTopScorers:Boolean(season.topScorers?.length),hasCoach,hasCaptain,
    jerseyCount:jerseys.length,hasImageReference,issues,isPandemicException,
  }
}

export const seasonAudit = historyArchive.seasons
  .map(seasonHistoryCoverage)
  .sort((a,b)=>b.startYear-a.startYear)

const entities: ArchiveBase[] = [
  ...historyArchive.seasons, ...historyArchive.honours,...historyArchive.jerseys,
  ...historyArchive.legends,...historyArchive.players,...historyArchive.arenas,
  ...historyArchive.europe,...historyArchive.records,...historyArchive.timeline,
]

export const historyAuditSummary = {
  totalSeasons: seasonAudit.length,
  seasonsWithRosters: seasonAudit.filter((season)=>season.documentedRoster>0).length,
  seasonsWithFullLeagueTotals: seasonAudit.filter((season)=>season.hasFullLeagueTotals).length,
  seasonsWithJerseys: seasonAudit.filter((season)=>season.jerseyCount>0).length,
  seasonsWithImageSources: seasonAudit.filter((season)=>season.hasImageReference).length,
  seasonsWithoutOpenIssues: seasonAudit.filter((season)=>season.issues.length===0).length,
  careerStatisticRows: careerTotals.length,
  careerSourceDiscrepancies: careerStatDiscrepancies.length,
  careerRepeatedNames: careerNamesRepeated.length,
  numberHistoryRows: documentedNumberRows.length,
  numberSourceIssues: officialNumberSourceIssues.length,
  archiveEntries: entities.length,
  archiveEntriesWithImages: entities.filter((entry)=>entry.media.length>0).length,
  archiveEntriesPartial: entities.filter((entry)=>entry.completeness !== 'verified').length,
  currentNotImported: [
    'Komplette kampfakta og resultatlister er ikke importert kamp for kamp fra alle 69 sesonger.',
    'SIL-arkivets samlede adelskalender er hentet inn. Fullstendige kamp- og sesongtall per spiller er fortsatt ikke importert.',
    '2020/21 er en historisk ufullført sesong og kan aldri merkes som ferdigspilt.',
    'Et historisk bilde i arkivet kan være en ekstern lenke; bildeadressen er ikke automatisk kontrollert for tilgjengelighet.',
  ],
} as const

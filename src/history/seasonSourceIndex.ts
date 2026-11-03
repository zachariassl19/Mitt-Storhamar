import snapshot from './seasonsIndexFull.json'

/** Exact SIL-archive index labels without invented per-game stats.
 * 1957/58–1959/60 had an abbreviated five-column index.
 */
export interface SeasonIndexEntry {
  id: string
  season: string
  sourceUrl: string
  placement: string | null
  postSeason: string | null
  leadingPlayer: string | null
  leadingStatistic: string | null
  averageAttendance: string | null
}
export const officialSeasonIndexSource = snapshot.source
export const seasonIndexEntries: SeasonIndexEntry[] = snapshot.entries.map((entry) => {
  const cells=entry.cells
  const early=cells.length===5
  const values=early
    ? {postSeason:null,player:cells[2],statistic:cells[3],attendance:cells[4]}
    : {postSeason:cells[2],player:cells[3],statistic:cells[4],attendance:cells[5]}
  function nonempty(value: string | undefined) {
    const clean=value?.trim()
    return !clean || clean==='–' || clean==='-' ? null : clean
  }
  return {
    id:'season-'+entry.season,
    season:entry.season,
    sourceUrl:entry.sourceUrl,
    placement:nonempty(cells[1]),
    postSeason:nonempty(values.postSeason ?? ''),
    leadingPlayer:nonempty(values.player),
    leadingStatistic:nonempty(values.statistic),
    averageAttendance:nonempty(values.attendance),
  }
})
export const seasonIndexById=new Map(seasonIndexEntries.map((entry)=>[entry.id,entry]))
export function officialSeasonIndex(id: string) {
  return seasonIndexById.get(id)
}

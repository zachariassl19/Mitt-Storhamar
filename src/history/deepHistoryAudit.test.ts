import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import { careerTotalForName, careerTotals, careerStatDiscrepancies, careerNamesRepeated } from './careerTotals'
import { historyAuditSummary, linkedSeasonJerseys, seasonAudit, seasonHistoryCoverage } from './coverageAudit'
import { coachTerms, captainTerms, leadersForSeason } from './leadershipChronology'
import { numberIndex, documentedNumberRows, officialNumberSourceIssues } from './numberIndex'
import { archiveRelationships } from './archiveExplorer'

describe('Storhamar historical source control', () => {
  it('reviews all 69 completed-era seasons without hiding missing data', () => {
    expect(seasonAudit).toHaveLength(69)
    expect(historyAuditSummary.totalSeasons).toBe(69)
    expect(historyAuditSummary.seasonsWithRosters).toBeLessThanOrEqual(69)
    expect(historyAuditSummary.seasonsWithoutOpenIssues).toBeLessThan(69)
    expect(seasonAudit[0].id).toBe('season-2025-26')
    expect(seasonAudit.at(-1)?.id).toBe('season-1957-58')
    const early = seasonHistoryCoverage(historyArchive.seasons.find((item)=>item.id==='season-1957-58')!)
    expect(early.issues.some((issue)=>issue.includes('spillerstall'))).toBe(true)
    expect(seasonAudit.find((item)=>item.id==='season-2020-21')?.isPandemicException).toBe(true)
  })

  it('includes reciprocal historical jersey connections on season pages', () => {
    const season = historyArchive.seasons.find((entry)=>entry.id==='season-2024-25')!
    expect(linkedSeasonJerseys(season).length).toBeGreaterThan(0)
    expect(archiveRelationships('season', season).some((link)=>link.kind==='jersey')).toBe(true)
  })

  it('lists all known SIL coaches and captains by period, including midseason changes', () => {
    expect(coachTerms.length).toBeGreaterThanOrEqual(30)
    expect(captainTerms.length).toBeGreaterThanOrEqual(19)
    expect(leadersForSeason(1975).coaches).toHaveLength(0)
    expect(leadersForSeason(1983).coaches.length).toBeGreaterThanOrEqual(2)
    expect(leadersForSeason(2017).captains.some((term)=>term.name==='Kodie Curran')).toBe(true)
    expect(leadersForSeason(2025).captains.some((term)=>term.name==='Jacob Berglund')).toBe(true)
  })

  it('preserves documented SSU founding in the timeline with a primary registry source', () => {
    const event=historyArchive.timeline.find((entry)=>entry.id==='timeline-2001-ssu-founded')
    expect(event?.date).toBe('2001-10-25')
    expect(event?.sources).toContain('brreg-ssu')
    expect(historyArchive.sources.some((source)=>source.id==='brreg-ssu' && source.url.includes('brreg.no'))).toBe(true)
  })

  it('includes selected sourced milestones without inventing match facts', () => {
    for(const id of ['timeline-1961-first-official-game','timeline-2004-amfi-crowd-record','timeline-2022-2250-games','timeline-2023-goal-10000']){
      const event=historyArchive.timeline.find((item)=>item.id===id)
      expect(event?.sources).toContain('sil-milepaeler')
      expect(event?.completeness).toBe('verified')
    }
  })

  it('keeps the full 455-row SIL archive table as historical snapshots, not live statistics', () => {
    expect(careerTotals).toHaveLength(455)
    const pal = careerTotalForName('Pål Johnsen')
    expect(pal).toMatchObject({games:963,goals:286,assists:585,points:871})
    expect(careerTotalForName('Erik Kristiansen')?.points).toBe(915)
    expect(careerTotalForName('Eirik Skadsdammen')?.games).toBe(907)
    expect(careerStatDiscrepancies).toHaveLength(5)
    expect(careerNamesRepeated).toContain('Bjørn Stenberg')
    expect(careerTotalForName('Bjørn Stenberg')).toBeUndefined()
  })

  it('imports all 487 documented number usages and keeps both source anomalies', () => {
    expect(numberIndex).toHaveLength(98)
    expect(documentedNumberRows).toHaveLength(487)
    expect(officialNumberSourceIssues).toHaveLength(2)
    expect(numberIndex[0].number).toBe('01')
    expect(numberIndex.at(-1)?.number).toBe('98')
    expect(numberIndex.find((row)=>row.number==='08')?.holders.some((person)=>person.name==='Eirik Skadsdammen')).toBe(true)
    expect(numberIndex.find((row)=>row.number==='94')?.holders.some((person)=>person.name==='Sverre Rønningen')).toBe(true)
  })
})

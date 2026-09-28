import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import { expectedCompletedSeasonIds, historyAudit, permanentHistoricalExceptions } from './historyAudit'

describe('full Storhamar history audit', () => {
  it('contains every completed season from 1957/58 through 2025/26 exactly once', () => {
    const actualIds = historyArchive.seasons.map((season) => season.id)

    expect(expectedCompletedSeasonIds).toHaveLength(69)
    expect(actualIds).toHaveLength(69)
    expect(new Set(actualIds).size).toBe(actualIds.length)
    expect(new Set(actualIds)).toEqual(new Set(expectedCompletedSeasonIds))
    expect(historyAudit.seasonCoverage.missingSeasonIds).toEqual([])
    expect(historyAudit.seasonCoverage.unexpectedSeasonIds).toEqual([])
  })

  it('has no gaps in the chronological year sequence', () => {
    const sorted = [...historyArchive.seasons].sort((a, b) => a.startYear - b.startYear)
    const gaps = sorted.slice(1).filter((season, index) => season.startYear !== sorted[index].startYear + 1)
    expect(gaps.map((season) => season.id)).toEqual([])
  })

  it('contains every canonical title, Europe campaign and rafter legend', () => {
    expect(historyAudit.canonicalCoverage.missingLeagueChampionships).toEqual([])
    expect(historyAudit.canonicalCoverage.missingNorwegianChampionships).toEqual([])
    expect(historyAudit.canonicalCoverage.missingEuropeCampaigns).toEqual([])
    expect(historyAudit.canonicalCoverage.missingRafterLegends).toEqual([])
  })

  it('keeps permanent historical exceptions explicit', () => {
    const covidSeason = historyArchive.seasons.find((season) => season.id === 'season-2020-21')
    expect(covidSeason?.completeness).toBe('partial')
    expect(permanentHistoricalExceptions.some((entry) => entry.entityId === 'season-2020-21')).toBe(true)
  })

  it('uses the resolved dates for recent source conflicts', () => {
    const league2024 = historyArchive.honours.find((honour) => honour.id === 'honour-2024-league')
    const league2026 = historyArchive.honours.find((honour) => honour.id === 'honour-2026-league')
    const larrivee = historyArchive.legends.find((legend) => legend.id === 'legend-christian-larrivee')

    expect(league2024?.completeness).toBe('verified')
    expect(league2024?.decidingGame).toContain('22.02.2024')
    expect(league2026?.completeness).toBe('verified')
    expect(league2026?.decidingGame).toContain('26.02.2026')
    expect(larrivee?.honouredAt).toBe('2022-08-27')
  })

  it('reports the seven-point archive pass without hiding genuine research gaps', () => {
    const coverage = historyAudit.sevenPointCoverage

    expect(coverage.jerseysAndRealImages.silEntriesMappedToArchive).toBe(coverage.jerseysAndRealImages.silIndexEntries)
    expect(coverage.jerseysAndRealImages.newerOfficialVariantsTracked).toBe(4)
    expect(coverage.rafters.legendsPresent).toBe(coverage.rafters.canonicalLegends)
    expect(coverage.rafters.legendsWithRealMedia).toBe(coverage.rafters.canonicalLegends)
    expect(coverage.honours.leagueChampionshipsPresent).toBe(coverage.honours.leagueChampionshipsExpected)
    expect(coverage.honours.norwegianChampionshipsPresent).toBe(coverage.honours.norwegianChampionshipsExpected)
    expect(coverage.europe.verifiedCampaigns).toBe(coverage.europe.completedCampaignsExpected)
    expect(coverage.playersAndRosters.documentedNorwegianChampions).toBe(129)
    expect(coverage.playersAndRosters.championsRepresentedInArchive).toBe(129)
    expect(coverage.playersAndRosters.partialTitleRosters).toContain('season-2025-26')
    expect(coverage.seasonBySeasonControl.presentCompletedSeasons).toBe(69)
    expect(coverage.seasonBySeasonControl.openConflictIds.length).toBeGreaterThan(0)
  })
})

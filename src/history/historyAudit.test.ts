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

  it('audits every player profile and connects verified season statistics', () => {
    const coverage = historyAudit.sevenPointCoverage.playersAndRosters
    const adrian = historyArchive.players.find((player) => player.fullName === 'Adrian Saxrud-Danielsen')

    expect(coverage.playerResearchReview).toHaveLength(historyArchive.players.length)
    expect(coverage.seasonsWithPlayerStats).toBeGreaterThanOrEqual(5)
    expect(coverage.playerStatRows).toBeGreaterThan(100)
    expect(coverage.unmatchedSeasonStatNames).toEqual([])
    expect(adrian?.completeness).toBe('verified')
    expect(adrian?.position).toBe('Back')
    expect(adrian?.seasonIds).toHaveLength(9)
  })

  it('reuses the same verified media across related archive views', () => {
    const player = historyArchive.players.find((item) => item.fullName === 'Eirik Skadsdammen')
    const legend = historyArchive.legends.find((item) => item.fullName === 'Eirik Skadsdammen')
    const season2025 = historyArchive.seasons.find((item) => item.id === 'season-2025-26')
    const honour2025 = historyArchive.honours.find((item) => item.id === 'honour-2025-league')
    const classicArena = historyArchive.arenas.find((item) => item.id === 'arena-hakons-hall')
    const classicRecord = historyArchive.records.find((item) => item.id === 'record-2023-hockey-classic-attendance')
    const classicTimeline = historyArchive.timeline.find((item) => item.id === 'timeline-2023-hockey-classic-record')

    expect(player?.media.length).toBeGreaterThan(0)
    expect(legend?.media.length).toBeGreaterThan(0)
    const playerImages = new Set(player?.media.map((media) => media.src) ?? [])
    const sharedPersonImages = legend?.media.filter((media) => playerImages.has(media.src)) ?? []
    expect(sharedPersonImages.length).toBeGreaterThan(0)

    expect(season2025?.media.length).toBeGreaterThan(0)
    expect(honour2025?.media.length).toBeGreaterThan(0)

    const classicSources = [classicArena, classicRecord, classicTimeline]
      .flatMap((item) => item?.media.map((media) => media.src) ?? [])
    expect(new Set(classicSources).size).toBeLessThan(classicSources.length)
  })

  it('reuses the same verified person media across player and legend views', () => {
    const commonNames = historyArchive.players
      .map((player) => player.fullName)
      .filter((name) => historyArchive.legends.some((legend) => legend.fullName === name))

    expect(commonNames.length).toBeGreaterThan(0)

    for (const name of commonNames) {
      const player = historyArchive.players.find((entry) => entry.fullName === name)
      const legend = historyArchive.legends.find((entry) => entry.fullName === name)
      const playerSources = new Set(player?.media.map((media) => media.src))
      const legendSources = new Set(legend?.media.map((media) => media.src))
      const shared = [...playerSources].filter((src) => legendSources.has(src))
      expect(shared.length).toBeGreaterThan(0)
    }
  })

  it('tracks media coverage for every archive section', () => {
    const coverage = historyAudit.mediaCoverage
    expect(coverage.players.total).toBe(historyArchive.players.length)
    expect(coverage.seasons.total).toBe(69)
    expect(coverage.players.withMedia).toBeGreaterThan(75)
    expect(coverage.honours.withMedia).toBeGreaterThan(0)
    expect(coverage.jerseys.withMedia).toBeGreaterThan(0)
    expect(coverage.europe.withMedia).toBeGreaterThan(0)
    expect(coverage.records.withMedia).toBeGreaterThan(0)
    expect(coverage.timeline.withMedia).toBeGreaterThan(0)
  })

  it('reports the seven-point archive pass without hiding genuine research gaps', () => {
    const coverage = historyAudit.sevenPointCoverage

    expect(coverage.jerseysAndRealImages.silEntriesMappedToArchive).toBe(coverage.jerseysAndRealImages.silIndexEntries)
    expect(coverage.jerseysAndRealImages.newerOfficialVariantsTracked).toBe(5)
    expect(coverage.rafters.legendsPresent).toBe(coverage.rafters.canonicalLegends)
    expect(coverage.rafters.legendsWithRealMedia).toBe(coverage.rafters.canonicalLegends)
    expect(coverage.honours.leagueChampionshipsPresent).toBe(coverage.honours.leagueChampionshipsExpected)
    expect(coverage.honours.norwegianChampionshipsPresent).toBe(coverage.honours.norwegianChampionshipsExpected)
    expect(coverage.europe.verifiedCampaigns).toBe(coverage.europe.completedCampaignsExpected)
    expect(coverage.playersAndRosters.documentedNorwegianChampions).toBe(129)
    expect(coverage.playersAndRosters.championsRepresentedInArchive).toBe(129)
    expect(coverage.playersAndRosters.partialTitleRosters).toContain('season-2025-26')
    expect(coverage.seasonBySeasonControl.presentCompletedSeasons).toBe(69)
    expect(coverage.seasonBySeasonControl.openConflictIds).toEqual(['conflict-1969-70-top-scorer-goals'])
    expect(historyAudit.researchConflicts.resolved).toContain('conflict-1991-92-rune-gulliksen-points')
    expect(historyAudit.researchConflicts.resolved).toContain('conflict-1996-97-dahlstrom-points')
  })
})

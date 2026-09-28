import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import { championPlayers } from './championPlayers'
import { canonicalEuropeCampaignIds } from './europeRegistry'
import { canonicalLeagueChampionshipIds, canonicalNorwegianChampionshipIds } from './honoursRegistry'
import { canonicalRafterLegendIds } from './legendRegistry'
import { championshipRosterResearch } from './rosterResearch'

const recentJerseyIds = [
  'jersey-2025-26-series',
  'jersey-2025-preseason-hamar',
  'jersey-2025-pink-cancer',
  'jersey-2025-hockey-classic',
]

describe('History 1–7 full-control pass', () => {
  it('1: keeps the missing 2025/26 jersey variants in the actual archive with real media', () => {
    for (const id of recentJerseyIds) {
      const jersey = historyArchive.jerseys.find((entry) => entry.id === id)
      expect(jersey, id).toBeDefined()
      expect(jersey?.seasonIds).toContain('season-2025-26')
      expect(jersey?.media.length ?? 0).toBeGreaterThan(0)
      expect(jersey?.media.every((item) => Boolean(item.sourceUrl && item.credit))).toBe(true)
    }
  })

  it('2: contains every canonical I taket profile exactly once with sourced real media', () => {
    const ids = historyArchive.legends.map((legend) => legend.id)
    for (const id of canonicalRafterLegendIds) {
      expect(ids.filter((candidate) => candidate === id), id).toHaveLength(1)
      const legend = historyArchive.legends.find((entry) => entry.id === id)
      expect((legend?.body?.length ?? 0) + (legend?.summary ? 1 : 0), id).toBeGreaterThan(0)
      expect(legend?.rafterStatus, id).toBeDefined()
      expect(legend?.media.length ?? 0, id).toBeGreaterThan(0)
      expect(legend?.media.every((item) => Boolean(item.src && item.sourceUrl && item.credit)), id).toBe(true)
    }
  })

  it('3: contains all league/NM titles and real media for every NM title', () => {
    const ids = new Set(historyArchive.honours.map((honour) => honour.id))
    for (const id of [...canonicalLeagueChampionshipIds, ...canonicalNorwegianChampionshipIds]) {
      expect(ids.has(id), id).toBe(true)
      const honour = historyArchive.honours.find((entry) => entry.id === id)
      expect(honour?.sources.length ?? 0, id).toBeGreaterThan(0)
      expect((honour?.body?.length ?? 0) + (honour?.summary ? 1 : 0), id).toBeGreaterThan(0)
    }

    for (const id of canonicalNorwegianChampionshipIds) {
      const honour = historyArchive.honours.find((entry) => entry.id === id)
      expect(honour?.media.length ?? 0, id).toBeGreaterThan(0)
      expect(honour?.media.every((item) => Boolean(item.src && item.sourceUrl && item.credit)), id).toBe(true)
    }
  })

  it('4: keeps every completed Europe campaign verified and documented', () => {
    const byId = new Map(historyArchive.europe.map((campaign) => [campaign.id, campaign]))
    for (const id of canonicalEuropeCampaignIds) {
      const campaign = byId.get(id)
      expect(campaign?.completeness, id).toBe('verified')
      expect(campaign?.sources.length ?? 0, id).toBeGreaterThan(0)
      expect(campaign?.opponentNames.length ?? 0, id).toBeGreaterThan(0)
      expect(campaign?.outcome, id).toBeTruthy()
    }
  })

  it('5: connects verified title rosters and represents all 129 documented champions', () => {
    const playerIds = new Set(historyArchive.players.map((player) => player.id))
    const playerNames = new Set(historyArchive.players.map((player) => player.fullName))

    for (const research of championshipRosterResearch.filter((entry) => entry.status === 'verified-complete')) {
      const season = historyArchive.seasons.find((entry) => entry.id === research.seasonId)
      expect(season, research.seasonId).toBeDefined()
      expect(season?.roster.length, research.seasonId).toBe(research.players.length)
      expect(new Set(season?.roster.map((entry) => entry.personId)).size, research.seasonId).toBe(research.players.length)
      expect(season?.roster.every((entry) => playerIds.has(entry.personId)), research.seasonId).toBe(true)
    }

    expect(championPlayers).toHaveLength(129)
    expect(new Set(championPlayers.map((entry) => entry.archiveName)).size).toBe(129)
    for (const champion of championPlayers) {
      expect(playerNames.has(champion.archiveName), champion.sourceName).toBe(true)
    }
  })

  it('6: preserves the central arena, record and major-moment objects', () => {
    const arenaIds = new Set(historyArchive.arenas.map((arena) => arena.id))
    const recordIds = new Set(historyArchive.records.map((record) => record.id))
    const timelineIds = new Set(historyArchive.timeline.map((event) => event.id))

    for (const id of [
      'arena-storhamarbana', 'arena-storhamar-kunstisbane', 'arena-storhamar-ishall', 'arena-hamar-ol-amfi',
      'arena-gjovik-fjellhall', 'arena-hakons-hall', 'arena-jordal-amfi-old', 'arena-jordal-amfi-new',
      'arena-sparta-amfi', 'arena-leangen-ishall', 'arena-manglerudhallen', 'arena-lorenskog-ishall', 'arena-dnb-arena',
    ]) {
      expect(arenaIds.has(id), id).toBe(true)
    }
    for (const id of ['record-2017-world-longest-game', 'record-2023-hockey-classic-attendance', 'record-2024-28-straight-wins', 'record-2024-117-points', 'record-2025-perfect-playoffs', 'record-2026-seven-straight-finals']) {
      expect(recordIds.has(id), id).toBe(true)
    }
    for (const id of ['timeline-2023-hockey-classic-record', 'timeline-2025-perfect-playoffs', 'timeline-2026-third-straight-double']) {
      expect(timelineIds.has(id), id).toBe(true)
    }
  })

  it('7: has a continuous 69-season historical run through 2025/26', () => {
    const expected = Array.from({ length: 69 }, (_, index) => {
      const start = 1957 + index
      const end = String((start + 1) % 100).padStart(2, '0')
      return `season-${start}-${end}`
    })
    const actual = historyArchive.seasons.map((season) => season.id)
    expect(new Set(actual)).toEqual(new Set(expected))
    expect(historyArchive.seasons.every((season) => season.sources.length > 0)).toBe(true)
  })
})

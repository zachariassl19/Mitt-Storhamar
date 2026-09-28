import { describe, expect, it } from 'vitest'
import { championshipRosterResearch } from './rosterResearch'

describe('championship roster research', () => {
  it('keeps every verified roster free of duplicate names', () => {
    const duplicateSeasons = championshipRosterResearch
      .filter((entry) => entry.status === 'verified-complete')
      .filter((entry) => new Set(entry.players).size !== entry.players.length)
      .map((entry) => entry.seasonId)

    expect(duplicateSeasons).toEqual([])
  })

  it('has complete sourced rosters for the 2023/24 and 2024/25 league champions', () => {
    const roster2024 = championshipRosterResearch.find((entry) => entry.seasonId === 'season-2023-24')
    const roster2025 = championshipRosterResearch.find((entry) => entry.seasonId === 'season-2024-25')

    expect(roster2024?.status).toBe('verified-complete')
    expect(roster2024?.players.length).toBe(25)
    expect(roster2025?.status).toBe('verified-complete')
    expect(roster2025?.players.length).toBe(24)
  })

  it('does not pretend the 2025/26 roster is complete before the full register is checked', () => {
    const roster2026 = championshipRosterResearch.find((entry) => entry.seasonId === 'season-2025-26')
    expect(roster2026?.status).toBe('partial')
    expect(roster2026?.note).toBeTruthy()
  })
})

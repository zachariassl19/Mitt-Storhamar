import { describe, expect, it } from 'vitest'
import type { Game, GameDayRecord } from '../types'
import { gameFeatures, gameStatusClass, isFridayGame } from './gamePresentation'

function game(patch: Partial<Game> = {}): Game {
  return {
    id: 'game:test',
    season: '2026/27',
    startsAt: '2026-11-20T19:00:00+01:00',
    competition: 'EHL',
    homeTeam: 'Storhamar',
    awayTeam: 'Frisk Asker',
    arena: 'CC Amfi',
    city: 'Hamar',
    ...patch,
  }
}

function record(actual: GameDayRecord['attendanceActual']): GameDayRecord {
  return {
    gameId: 'game:test',
    attendanceActual: actual,
    entryType: 'unknown',
    ticketCost: null,
    completed: true,
    updatedAt: '2026-11-21T12:00:00.000Z',
  }
}

describe('game presentation', () => {
  it('marks Friday EHL games with Superfredag presentation', () => {
    const match = game()
    expect(isFridayGame(match)).toBe(true)
    expect(gameFeatures(match).map((feature) => feature.key)).toContain('superfriday')
  })

  it('marks CHL, Hockey Classic and Vålerenga rivalry independently', () => {
    expect(gameFeatures(game({ competition: 'CHL' })).map((feature) => feature.key)).toContain('chl')
    expect(gameFeatures(game({ arena: 'Håkons Hall', startsAt: '2026-10-24T18:00:00+02:00' })).map((feature) => feature.key)).toContain('classic')
    expect(gameFeatures(game({ awayTeam: 'Vålerenga', startsAt: '2026-10-03T16:00:00+02:00' })).map((feature) => feature.key)).toContain('rivalry')
  })

  it('gives confirmed attendance priority over future plan styling', () => {
    const match = game({ startsAt: '2026-09-17T19:00:00+02:00' })
    expect(gameStatusClass(match, 'yes', record('attended'), new Date('2026-09-23T12:00:00+02:00').getTime())).toBe('status-attended')
    expect(gameStatusClass(match, 'yes', record('not_attended'), new Date('2026-09-23T12:00:00+02:00').getTime())).toBe('status-not-attended')
  })
})

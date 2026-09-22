import { describe, expect, it } from 'vitest'
import { games } from '../data/games'
import type { Game, GameDayRecord, Trip } from '../types'
import { confirmedLocalCareerStats } from './careerStats'
import { canConfirmAttendance, getGameTemporalState } from './gameTime'
import { createTripForGame } from './trips'
import { calculateCarCost, type CarSettings } from './travelSettings'

function gameAt(startsAt: string, result?: [number, number]): Game {
  return {
    id: `test:${startsAt}`,
    season: '2026/27',
    startsAt,
    competition: 'EHL',
    homeTeam: 'Storhamar',
    awayTeam: 'Testlaget',
    arena: 'CC Amfi',
    city: 'Hamar',
    homeScore: result?.[0],
    awayScore: result?.[1],
  }
}

function record(gameId: string, actual: GameDayRecord['attendanceActual'], completed = true): GameDayRecord {
  return {
    gameId,
    attendanceActual: actual,
    entryType: 'unknown',
    ticketCost: null,
    completed,
    updatedAt: '2026-09-22T12:00:00.000Z',
  }
}

function trip(gameId: string, status: Trip['status'], km: number, cost: number): Trip {
  return {
    id: `trip:${gameId}`,
    gameId,
    status,
    desiredArrivalMinutesBefore: 30,
    createdAt: '2026-09-22T12:00:00.000Z',
    updatedAt: '2026-09-22T12:00:00.000Z',
    legs: [
      {
        id: `leg:${gameId}`,
        order: 0,
        direction: 'outbound',
        fromName: 'Hjem',
        toName: 'Arena',
        transport: 'car',
        km,
        durationMinutes: 60,
        estimatedCost: cost,
        actualCost: null,
      },
    ],
  }
}

describe('2026/27 game data', () => {
  it('contains a complete sorted Storhamar schedule without duplicate IDs', () => {
    expect(games).toHaveLength(50)
    expect(new Set(games.map((game) => game.id)).size).toBe(games.length)
    expect(games.every((game) => game.homeTeam === 'Storhamar' || game.awayTeam === 'Storhamar')).toBe(true)

    const timestamps = games.map((game) => new Date(game.startsAt).getTime())
    expect(timestamps).toEqual([...timestamps].sort((a, b) => a - b))
  })

  it('contains both already played and upcoming games around 22 September 2026', () => {
    const reference = new Date('2026-09-22T12:00:00+02:00').getTime()
    const past = games.filter((game) => new Date(game.startsAt).getTime() < reference)
    const future = games.filter((game) => new Date(game.startsAt).getTime() > reference)

    expect(past.length).toBeGreaterThan(0)
    expect(future.length).toBeGreaterThan(0)
    expect(past.some((game) => typeof game.homeScore === 'number' && typeof game.awayScore === 'number')).toBe(true)
    expect(future.some((game) => game.homeScore == null && game.awayScore == null)).toBe(true)
  })
})

describe('temporal match flow', () => {
  it('separates future, matchday, live, post-game and finished states', () => {
    const match = gameAt('2026-09-24T18:30:00+02:00')

    expect(getGameTemporalState(match, new Date('2026-09-23T12:00:00+02:00'))).toBe('FUTURE')
    expect(getGameTemporalState(match, new Date('2026-09-24T12:00:00+02:00'))).toBe('GAME_DAY_BEFORE_START')
    expect(getGameTemporalState(match, new Date('2026-09-24T19:00:00+02:00'))).toBe('IN_PROGRESS')
    expect(getGameTemporalState(match, new Date('2026-09-24T22:00:01+02:00'))).toBe('POST_GAME_PENDING')

    const finished = gameAt('2026-09-17T19:00:00+02:00', [2, 1])
    expect(getGameTemporalState(finished, new Date('2026-09-17T19:05:00+02:00'))).toBe('FINISHED')
  })

  it('never allows actual attendance before post-game', () => {
    const match = gameAt('2026-09-24T18:30:00+02:00')
    expect(canConfirmAttendance(match, new Date('2026-09-24T12:00:00+02:00'))).toBe(false)
    expect(canConfirmAttendance(match, new Date('2026-09-24T19:30:00+02:00'))).toBe(false)
    expect(canConfirmAttendance(match, new Date('2026-09-24T22:00:01+02:00'))).toBe(true)
  })
})

describe('attendance and career statistics', () => {
  it('does not count a planned trip or a plan as attended', () => {
    const planned = trip('future-game', 'planned', 250, 500)
    const stats = confirmedLocalCareerStats({}, [planned])
    expect(stats).toEqual({ attendedGames: 0, completedTrips: 0, km: 0, travelCost: 0 })
  })

  it('counts only completed actual attendance and completed trips', () => {
    const records = {
      old: record('old', 'attended'),
      new: record('new', 'attended'),
      no: record('no', 'not_attended'),
      unfinished: record('unfinished', 'attended', false),
    }
    const trips = [
      trip('old', 'completed', 100, 200),
      trip('new', 'planned', 300, 600),
      trip('no', 'completed', 400, 800),
      trip('unfinished', 'completed', 500, 1000),
    ]

    const stats = confirmedLocalCareerStats(records, trips)
    expect(stats.attendedGames).toBe(2)
    expect(stats.completedTrips).toBe(1)
    expect(stats.km).toBe(100)
    expect(stats.travelCost).toBe(200)
  })

  it('supports historical game IDs as well as current-season IDs', () => {
    const records = {
      'game:2024-historical': record('game:2024-historical', 'attended'),
      'game:2026-current': record('game:2026-current', 'attended'),
    }
    const trips = [
      trip('game:2024-historical', 'completed', 150, 250),
      trip('game:2026-current', 'completed', 200, 300),
    ]

    const stats = confirmedLocalCareerStats(records, trips)
    expect(stats.attendedGames).toBe(2)
    expect(stats.completedTrips).toBe(2)
    expect(stats.km).toBe(350)
  })
})

describe('travel planning', () => {
  it('creates Hjem → arena → Hjem without counting it as completed', () => {
    const match = gameAt('2026-09-24T18:30:00+02:00')
    const planned = createTripForGame(match)

    expect(planned.status).toBe('planned')
    expect(planned.legs).toHaveLength(2)
    expect(planned.legs[0].fromName).toBe('Hjem')
    expect(planned.legs[0].toName).toBe('CC Amfi')
    expect(planned.legs[1].fromName).toBe('CC Amfi')
    expect(planned.legs[1].toName).toBe('Hjem')
  })

  it('calculates car cost per 100 km from consumption and energy price', () => {
    const settings: CarSettings = {
      energy: 'gasoline',
      consumptionPer100: 6.46,
      energyUnitPrice: 19.42,
    }
    expect(calculateCarCost(100, settings)).toBeCloseTo(125.45, 1)
    expect(calculateCarCost(null, settings)).toBeNull()
  })
})

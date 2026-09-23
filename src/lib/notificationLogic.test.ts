import { describe, expect, it } from 'vitest'
import type { Game, Trip } from '../types'
import { departureTimeForTrip, notificationCandidates } from './notificationLogic'
import { defaultNotificationSettings } from './notificationSettings'

const game: Game = {
  id: 'game:test',
  season: '2026/27',
  startsAt: '2026-09-24T18:30:00+02:00',
  competition: 'EHL',
  homeTeam: 'Storhamar',
  awayTeam: 'Ringerike',
  arena: 'CC Amfi',
  city: 'Hamar',
}

const trip: Trip = {
  id: 'trip:test',
  gameId: game.id,
  status: 'planned',
  desiredArrivalMinutesBefore: 30,
  createdAt: '2026-09-23T10:00:00.000Z',
  updatedAt: '2026-09-23T10:00:00.000Z',
  legs: [
    {
      id: 'out',
      order: 0,
      direction: 'outbound',
      fromName: 'Hjem',
      toName: 'CC Amfi',
      transport: 'car',
      km: 150,
      durationMinutes: 120,
      estimatedCost: 250,
      actualCost: null,
    },
    {
      id: 'back',
      order: 1,
      direction: 'return',
      fromName: 'CC Amfi',
      toName: 'Hjem',
      transport: 'car',
      km: 150,
      durationMinutes: 120,
      estimatedCost: 250,
      actualCost: null,
    },
  ],
}

describe('notification timing', () => {
  it('calculates DRA from outbound travel and desired arrival', () => {
    const departure = departureTimeForTrip(game, trip)
    expect(departure?.toISOString()).toBe('2026-09-24T14:00:00.000Z')
  })

  it('offers a tomorrow reminder after 18:00 the evening before', () => {
    const settings = { ...defaultNotificationSettings, enabled: true }
    const due = notificationCandidates({
      now: new Date('2026-09-23T21:20:00+02:00'),
      games: [game],
      trips: [trip],
      records: {},
      settings,
      smartGameDayEnabled: true,
    })
    expect(due.some((item) => item.id === `game-tomorrow:${game.id}`)).toBe(true)
  })

  it('offers DRA at the calculated departure time', () => {
    const settings = { ...defaultNotificationSettings, enabled: true }
    const due = notificationCandidates({
      now: new Date('2026-09-24T16:01:00+02:00'),
      games: [game],
      trips: [trip],
      records: {},
      settings,
      smartGameDayEnabled: false,
    })
    expect(due.some((item) => item.id === `departure:${game.id}`)).toBe(true)
  })

  it('does not offer a finish reminder after the game is completed', () => {
    const settings = { ...defaultNotificationSettings, enabled: true }
    const due = notificationCandidates({
      now: new Date('2026-09-24T22:30:00+02:00'),
      games: [game],
      trips: [trip],
      records: {
        [game.id]: {
          gameId: game.id,
          attendanceActual: 'attended',
          entryType: 'purchased',
          ticketCost: 200,
          completed: true,
          completedAt: '2026-09-24T21:00:00+02:00',
          updatedAt: '2026-09-24T21:00:00+02:00',
        },
      },
      settings,
      smartGameDayEnabled: false,
    })
    expect(due.some((item) => item.id === `finish-game:${game.id}`)).toBe(false)
  })
})

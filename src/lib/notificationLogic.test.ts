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

  it('uses the supporter-chosen date and time instead of the DRA calculation', () => {
    const chosen = '2026-09-23T08:15:00+02:00'
    const changed = {...trip, plannedDepartureAt:chosen}
    expect(departureTimeForTrip(game,changed)?.toISOString()).toBe('2026-09-23T06:15:00.000Z')
    expect(departureTimeForTrip(game,{...changed,legs:[]})?.toISOString()).toBe('2026-09-23T06:15:00.000Z')
    expect(departureTimeForTrip(game,{...changed,plannedDepartureAt:null})?.toISOString()).toBe('2026-09-24T14:00:00.000Z')
    expect(departureTimeForTrip(game,{...changed,plannedDepartureAt:'not-a-date'})).toBeNull()
    expect(departureTimeForTrip(game,{...changed,plannedDepartureAt:game.startsAt})).toBeNull()
  })

  it('offers manually selected DRA even without a calculated route', () => {
    const chosen = {...trip, plannedDepartureAt:'2026-09-23T09:30:00+02:00', legs:[]}
    const due = notificationCandidates({
      now:new Date('2026-09-23T09:31:00+02:00'),games:[game],trips:[chosen],records:{},
      settings:{...defaultNotificationSettings,enabled:true},smartGameDayEnabled:false,
    })
    const message=due.find(item=>item.id===`departure:${game.id}`)
    expect(message?.body).toContain('09:30')
  })

  it('does not send departure reminders for a declined game', () => {
    const due = notificationCandidates({
      now: new Date('2026-09-24T16:01:00+02:00'), games:[game], trips:[trip], records:{},
      plans:{[game.id]:'no'}, settings:{...defaultNotificationSettings,enabled:true}, smartGameDayEnabled:false,
    })
    expect(due.some(item => item.id === `departure:${game.id}`)).toBe(false)
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

  it('does not offer a finish reminder when the supporter answered no', () => {
    const settings = { ...defaultNotificationSettings, enabled: true }
    const due = notificationCandidates({
      now: new Date('2026-09-24T22:30:00+02:00'),
      games: [game],
      trips: [trip],
      records: {},
      plans: { [game.id]: 'no' },
      settings,
      smartGameDayEnabled: false,
    })
    expect(due.some((item) => item.id === `finish-game:${game.id}`)).toBe(false)
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

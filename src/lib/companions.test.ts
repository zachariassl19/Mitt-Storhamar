import { describe, expect, it } from 'vitest'
import { DEFAULT_COMPANIONS, summarizeCompanions, type GameCompanionSelection } from './companions'
import type { Game, GameDayRecord } from '../types'

const games: Game[] = [
  {
    id: 'home-game',
    season: '2026/27',
    startsAt: '2026-09-01T19:00:00+02:00',
    competition: 'EHL',
    homeTeam: 'Storhamar',
    awayTeam: 'Frisk Asker',
    arena: 'CC Amfi',
  },
  {
    id: 'away-game',
    season: '2026/27',
    startsAt: '2026-09-02T19:00:00+02:00',
    competition: 'EHL',
    homeTeam: 'Vålerenga',
    awayTeam: 'Storhamar',
    arena: 'Jordal Amfi',
  },
  {
    id: 'solo-game',
    season: '2026/27',
    startsAt: '2026-09-03T19:00:00+02:00',
    competition: 'EHL',
    homeTeam: 'Storhamar',
    awayTeam: 'Stavanger Oilers',
    arena: 'CC Amfi',
  },
]

function attended(gameId: string): GameDayRecord {
  return {
    gameId,
    attendanceActual: 'attended',
    entryType: 'unknown',
    ticketCost: null,
    completed: true,
    completedAt: '2026-09-04T00:00:00.000Z',
    updatedAt: '2026-09-04T00:00:00.000Z',
  }
}

describe('reisefølge', () => {
  it('har Mamma, Pappa og Fredrik som standardvalg', () => {
    expect(DEFAULT_COMPANIONS.map((person) => person.name)).toEqual(['Mamma', 'Pappa', 'Fredrik'])
  })

  it('teller flere personer på samme kamp og skiller hjemme, borte og alene', () => {
    const selections: Record<string, GameCompanionSelection> = {
      'home-game': { gameId: 'home-game', status: 'known', companionIds: ['mamma', 'pappa'], updatedAt: '2026-09-04T00:00:00.000Z' },
      'away-game': { gameId: 'away-game', status: 'known', companionIds: ['mamma'], updatedAt: '2026-09-04T00:00:00.000Z' },
      'solo-game': { gameId: 'solo-game', status: 'known', companionIds: [], updatedAt: '2026-09-04T00:00:00.000Z' },
    }
    const records = {
      'home-game': attended('home-game'),
      'away-game': attended('away-game'),
      'solo-game': attended('solo-game'),
    }

    const summary = summarizeCompanions(DEFAULT_COMPANIONS, selections, records, games)
    const mamma = summary.people.find((person) => person.id === 'mamma')!
    const pappa = summary.people.find((person) => person.id === 'pappa')!

    expect(summary.registeredGames).toBe(3)
    expect(summary.soloGames).toBe(1)
    expect(summary.topCompanion?.name).toBe('Mamma')
    expect(mamma.games).toBe(2)
    expect(mamma.homeGames).toBe(1)
    expect(mamma.awayGames).toBe(1)
    expect(pappa.games).toBe(1)
    expect(summary.topCombination?.names).toEqual(['Mamma', 'Pappa'])
  })

  it('teller ikke reisefølge på kamper som ikke er bekreftet besøkt', () => {
    const records: Record<string, GameDayRecord> = {
      'home-game': { ...attended('home-game'), attendanceActual: 'not_attended' },
    }
    const selections: Record<string, GameCompanionSelection> = {
      'home-game': { gameId: 'home-game', status: 'known', companionIds: ['mamma'], updatedAt: '2026-09-04T00:00:00.000Z' },
    }
    const summary = summarizeCompanions(DEFAULT_COMPANIONS, selections, records, games)
    expect(summary.registeredGames).toBe(0)
    expect(summary.people.find((person) => person.id === 'mamma')?.games).toBe(0)
  })
})

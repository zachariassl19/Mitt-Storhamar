import { describe, expect, it } from 'vitest'
import {
  departureChecklistItems,
  departureChecklistKind,
  departureChecklistProgress,
} from './departureChecklist'
import type { Game } from '../types'

const baseGame: Game = {
  id: 'game:test',
  season: '2026/27',
  startsAt: '2026-10-10T18:30:00+02:00',
  competition: 'EHL',
  homeTeam: 'Storhamar',
  awayTeam: 'Stavanger Oilers',
  arena: 'CC Amfi',
  city: 'Hamar',
}

describe('departure checklist types', () => {
  it('uses the home checklist for a Storhamar home game', () => {
    expect(departureChecklistKind(baseGame)).toBe('home')
    expect(departureChecklistItems(baseGame).map((item) => item.label)).toEqual([
      'Akkreditering',
      'Drakt',
      'Skjerf',
      'Lader',
      'Drikke',
      'SSU-genser',
      'Ørepropper',
      'Lommebok',
    ])
  })

  it('uses the compact away checklist without accreditation', () => {
    const away: Game = {
      ...baseGame,
      id: 'game:away',
      homeTeam: 'Ringerike',
      awayTeam: 'Storhamar',
      arena: 'Schjongshallen',
      city: 'Hønefoss',
    }

    expect(departureChecklistKind(away)).toBe('away')
    expect(departureChecklistItems(away).map((item) => item.label)).toEqual([
      'Lader',
      'Drakt',
      'Skjerf',
      'SSU-genser',
      'Ørepropper',
      'Lommebok',
    ])
  })

  it('adds accreditation back for Hockey Classic', () => {
    const classic: Game = {
      ...baseGame,
      id: 'game:classic',
      homeTeam: 'Lillehammer',
      awayTeam: 'Storhamar',
      arena: 'Håkons Hall',
      city: 'Lillehammer',
      special: 'Håkons Hall',
    }

    expect(departureChecklistKind(classic)).toBe('classic')
    expect(departureChecklistItems(classic).map((item) => item.label)).toEqual([
      'Akkreditering',
      'Lader',
      'Drakt',
      'Skjerf',
      'SSU-genser',
      'Ørepropper',
      'Lommebok',
    ])
  })

  it('counts only items that belong to the current game type', () => {
    const away: Game = {
      ...baseGame,
      id: 'game:away-progress',
      homeTeam: 'Ringerike',
      awayTeam: 'Storhamar',
      arena: 'Schjongshallen',
    }

    const progress = departureChecklistProgress({
      checked: {
        accreditation: true,
        charger: true,
        jersey: true,
      },
    }, away)

    expect(progress).toEqual({
      checked: 2,
      total: 6,
      percent: 33,
      complete: false,
    })
  })
})

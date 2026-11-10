import { describe, expect, it } from 'vitest'
import type { Game } from '../types'
import { canConfirmAttendance, groupGamesForAttendance } from './gameTime'

function makeGame(id: string, startsAt: string): Game {
  return {
    id, startsAt, season: '2026/27', competition: 'EHL',
    homeTeam: 'Storhamar', awayTeam: 'Narvik', arena: 'CC Amfi',
  }
}

describe('match list attendance availability', () => {
  const kickoff = '2026-11-12T18:30:00+01:00'
  const game = makeGame('today', kickoff)

  it('keeps an upcoming match in the future list before faceoff', () => {
    const grouped = groupGamesForAttendance([game], new Date('2026-11-12T18:00:00+01:00'))
    expect(grouped.future.map(item => item.id)).toEqual(['today'])
    expect(grouped.live).toHaveLength(0)
    expect(grouped.past).toHaveLength(0)
  })

  it('does not treat a started match as historical before it is over', () => {
    const during = new Date('2026-11-12T19:00:00+01:00')
    const grouped = groupGamesForAttendance([game], during)
    expect(grouped.live.map(item => item.id)).toEqual(['today'])
    expect(grouped.past).toHaveLength(0)
    expect(canConfirmAttendance(game, during)).toBe(false)
  })

  it('moves a finished match to the historical list', () => {
    const after = new Date('2026-11-12T21:00:01+01:00')
    const grouped = groupGamesForAttendance([game], after)
    expect(grouped.past.map(item => item.id)).toEqual(['today'])
    expect(grouped.live).toHaveLength(0)
    expect(canConfirmAttendance(game, after)).toBe(true)
  })

  it('handles tomorrow, an ongoing match, and an already scored match at once', () => {
    const yesterday = { ...makeGame('scored', '2026-11-11T18:30:00+01:00'), homeScore: 4, awayScore: 2 }
    const tomorrow = makeGame('tomorrow', '2026-11-13T18:30:00+01:00')
    const grouped = groupGamesForAttendance([tomorrow, game, yesterday], new Date('2026-11-12T19:00:00+01:00'))
    expect(grouped.future.map(item => item.id)).toEqual(['tomorrow'])
    expect(grouped.live.map(item => item.id)).toEqual(['today'])
    expect(grouped.past.map(item => item.id)).toEqual(['scored'])
  })
})

import { describe, expect, it } from 'vitest'
import { compareCalendarToGames, createUpcomingCalendarIcs, parseCalendarIcs } from './calendarSync'
import type { Game } from '../types'

const game: Game = {
  id: 'test-game',
  season: '2026/27',
  startsAt: '2026-10-01T17:00:00.000Z',
  competition: 'EHL',
  homeTeam: 'Storhamar',
  awayTeam: 'Frisk Asker',
  arena: 'CC Amfi',
  city: 'Hamar',
}

describe('calendar sync', () => {
  it('exports upcoming games with stable Mitt Storhamar UID', () => {
    const ics = createUpcomingCalendarIcs([game], new Date('2026-09-01T00:00:00Z'))
    expect(ics).toContain('UID:mitt-storhamar-test-game@mitt-storhamar')
    expect(ics).toContain('SUMMARY:Storhamar – Frisk Asker · EHL')
    expect(ics).toContain('LOCATION:CC Amfi\\, Hamar')
  })

  it('parses an exported event and finds no change when it matches', () => {
    const ics = createUpcomingCalendarIcs([game], new Date('2026-09-01T00:00:00Z'))
    const events = parseCalendarIcs(ics)
    expect(events).toHaveLength(1)
    expect(compareCalendarToGames(events, [game], new Date('2026-09-01T00:00:00Z'))).toHaveLength(0)
  })

  it('finds changed time and arena without mutating the canonical game', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'BEGIN:VEVENT',
      'UID:mitt-storhamar-test-game@mitt-storhamar',
      'DTSTART:20261001T180000Z',
      'SUMMARY:Storhamar – Frisk Asker · EHL',
      'LOCATION:Håkons Hall, Lillehammer',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const suggestions = compareCalendarToGames(parseCalendarIcs(ics), [game], new Date('2026-09-01T00:00:00Z'))
    expect(suggestions).toHaveLength(1)
    expect(suggestions[0].changes).toEqual(['time', 'arena'])
    expect(game.startsAt).toBe('2026-10-01T17:00:00.000Z')
    expect(game.arena).toBe('CC Amfi')
  })
})

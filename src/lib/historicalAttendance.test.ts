import { describe, expect, it } from 'vitest'
import { confirmedHistoricalAttendance } from './historicalAttendance'

const date = '2026-11-03T18:00:00.000Z'

describe('historical attendance from the game list', () => {
  it('confirms Ja immediately so the green button and career stats can update', () => {
    const record = confirmedHistoricalAttendance('game:stjernen', 'attended', undefined, date)
    expect(record).toMatchObject({ attendanceActual: 'attended', completed: true, completedAt: date })
  })

  it('preserves ticket and entry data when confirming Ja again', () => {
    const record = confirmedHistoricalAttendance('game:stjernen', 'attended', {
      gameId: 'game:stjernen', attendanceActual: 'attended', entryType: 'purchased',
      ticketCost: 125, completed: true, completedAt: '2026-10-31T19:00:00.000Z',
      updatedAt: '2026-10-31T19:00:00.000Z',
    }, date)
    expect(record.entryType).toBe('purchased')
    expect(record.ticketCost).toBe(125)
    expect(record.completedAt).toBe('2026-10-31T19:00:00.000Z')
  })

  it('confirms Nei, clears ticket and does not mark attendance', () => {
    const record = confirmedHistoricalAttendance('game:stjernen', 'not_attended', {
      gameId: 'game:stjernen', attendanceActual: 'attended', entryType: 'purchased',
      ticketCost: 125, completed: true, updatedAt: date,
    }, date)
    expect(record).toMatchObject({ attendanceActual: 'not_attended', completed: true, entryType: 'unknown', ticketCost: null })
  })
})

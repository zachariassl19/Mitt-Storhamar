import type { GameDayRecord } from '../types'

/** Historical attendance is an actual result, never just an unconfirmed plan. */
export function confirmedHistoricalAttendance(
  gameId: string,
  actual: 'attended' | 'not_attended',
  existing?: GameDayRecord,
  now = new Date().toISOString(),
): GameDayRecord {
  const sameCompleted = existing?.completed && existing.attendanceActual === actual
  return {
    gameId,
    attendanceActual: actual,
    entryType: actual === 'attended' ? existing?.entryType ?? 'unknown' : 'unknown',
    ticketCost: actual === 'attended' ? existing?.ticketCost ?? null : null,
    completed: true,
    completedAt: sameCompleted ? existing?.completedAt ?? now : now,
    updatedAt: now,
  }
}

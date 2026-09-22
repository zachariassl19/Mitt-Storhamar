import type { Game } from '../types'

export type GameTemporalState =
  | 'FUTURE'
  | 'GAME_DAY_BEFORE_START'
  | 'IN_PROGRESS'
  | 'POST_GAME_PENDING'
  | 'FINISHED'

function osloDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Oslo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${map.year}-${map.month}-${map.day}`
}

export function isGameDay(game: Game, now = new Date()) {
  return osloDateKey(new Date(game.startsAt)) === osloDateKey(now)
}

export function getGameTemporalState(game: Game, now = new Date()): GameTemporalState {
  const startsAt = new Date(game.startsAt)
  const startMs = startsAt.getTime()
  const nowMs = now.getTime()
  const expectedEndMs = startMs + 2.5 * 60 * 60 * 1000
  const hasResult = typeof game.homeScore === 'number' && typeof game.awayScore === 'number'

  if (hasResult) return 'FINISHED'
  if (nowMs < startMs) return isGameDay(game, now) ? 'GAME_DAY_BEFORE_START' : 'FUTURE'
  if (nowMs <= expectedEndMs) return 'IN_PROGRESS'
  return 'POST_GAME_PENDING'
}

export function canConfirmAttendance(game: Game, now = new Date()) {
  const state = getGameTemporalState(game, now)
  return state === 'FINISHED' || state === 'POST_GAME_PENDING'
}

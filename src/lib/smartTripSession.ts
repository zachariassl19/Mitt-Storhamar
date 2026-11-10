import type { Game } from '../types'

/**
 * A temporary, locally owned navigation session. No coordinates are persisted.
 * This key intentionally does NOT start with "mitt-storhamar:" – that prefix
 * is included in the opt-in Supabase cloud backup.
 */
const KEY = 'private-native-trip-session:v1'
export const SMART_TRIP_CHANGED = 'private-native-trip-session-changed'

export interface SmartTripSession {
  gameId: string
  startedAt: string
  expiresAt: string
}

const HOUR = 60 * 60 * 1000
const MAX_BEFORE = 72 * HOUR
const AFTER = 5 * HOUR

export function canStartSmartTrip(game: Game, now = Date.now()) {
  const kickOff = Date.parse(game.startsAt)
  return Number.isFinite(kickOff) && now >= kickOff - MAX_BEFORE && now < kickOff + AFTER
}

export function makeSmartTripSession(game: Game, now = Date.now()): SmartTripSession | null {
  if (!canStartSmartTrip(game, now)) return null
  return {
    gameId: game.id,
    startedAt: new Date(now).toISOString(),
    expiresAt: new Date(Date.parse(game.startsAt) + AFTER).toISOString(),
  }
}

export function isSmartTripActive(session: SmartTripSession | null, now = Date.now()) {
  return Boolean(session && Number.isFinite(Date.parse(session.expiresAt)) && Date.parse(session.expiresAt) > now)
}

export function readSmartTripSession(now = Date.now()): SmartTripSession | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    const item = parsed as Partial<SmartTripSession>
    if (typeof item.gameId !== 'string' || typeof item.startedAt !== 'string' || typeof item.expiresAt !== 'string') return null
    const session: SmartTripSession = { gameId:item.gameId, startedAt:item.startedAt, expiresAt:item.expiresAt }
    if (!isSmartTripActive(session, now)) {
      localStorage.removeItem(KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function saveSmartTripSession(session: SmartTripSession | null) {
  try {
    if (session) localStorage.setItem(KEY, JSON.stringify(session))
    else localStorage.removeItem(KEY)
  } finally {
    if (typeof window !== 'undefined') window.dispatchEvent(new Event(SMART_TRIP_CHANGED))
  }
}

/** Do not keep GPS active the whole day if there is no event to travel to. */
export function smartTripCandidates(games: Game[], now = Date.now()): Game[] {
  return games
    .filter((game)=>Number.isFinite(Date.parse(game.startsAt)) &&
      Date.parse(game.startsAt) + AFTER > now &&
      Date.parse(game.startsAt) < now + 14 * 24 * HOUR)
    .sort((a,b)=>Date.parse(a.startsAt)-Date.parse(b.startsAt))
}

/** Background plugin only reports once movement exceeds the filter. */
export function nativeDistanceFilter(metersToArena: number | null): number {
  if (metersToArena == null || metersToArena > 25_000) return 200
  if (metersToArena > 5000) return 100
  return 50
}

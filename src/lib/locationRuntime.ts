import type { ArenaProximity } from '../types'

const STORAGE_KEY = 'mitt-storhamar:smart-location-status:v1'
export const SMART_LOCATION_STATUS_EVENT = 'mitt-storhamar:smart-location-status'

export type SmartLocationState = 'idle' | 'watching' | 'manual' | 'error'

export interface SmartLocationStatus {
  gameId: string
  state: SmartLocationState
  proximity: ArenaProximity
  distanceMeters: number | null
  accuracyMeters: number | null
  observedAt: string | null
  reliable: boolean
  error?: string
}

function loadAll(): Record<string, SmartLocationStatus> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, SmartLocationStatus>
  } catch {
    return {}
  }
}

export function loadSmartLocationStatus(gameId: string): SmartLocationStatus | null {
  if (typeof localStorage === 'undefined') return null
  return loadAll()[gameId] ?? null
}

export function lastProximityForGame(gameId: string, maxAgeMs = 12 * 60 * 60 * 1000): ArenaProximity {
  const status = loadSmartLocationStatus(gameId)
  if (!status?.observedAt) return 'outside'
  const age = Date.now() - new Date(status.observedAt).getTime()
  if (!Number.isFinite(age) || age < 0 || age > maxAgeMs) return 'outside'
  return status.proximity
}

export function publishSmartLocationStatus(status: SmartLocationStatus) {
  try {
    const current = loadAll()
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [status.gameId]: status }))
  } catch {
    // Runtime-status skal fortsatt fungere selv om lokal lagring er blokkert.
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SMART_LOCATION_STATUS_EVENT, { detail: status }))
  }
}

export function subscribeSmartLocationStatus(
  gameId: string,
  listener: (status: SmartLocationStatus) => void,
) {
  if (typeof window === 'undefined') return () => undefined

  const handler = (event: Event) => {
    const status = (event as CustomEvent<SmartLocationStatus>).detail
    if (status?.gameId === gameId) listener(status)
  }

  window.addEventListener(SMART_LOCATION_STATUS_EVENT, handler)
  return () => window.removeEventListener(SMART_LOCATION_STATUS_EVENT, handler)
}

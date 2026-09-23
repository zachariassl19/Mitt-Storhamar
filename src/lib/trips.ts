import type { Game, Trip, TripLeg, TransportMode } from '../types'

const TRIPS_KEY = 'mitt-storhamar:trips:v1'
export const TRIPS_CHANGED_EVENT = 'mitt-storhamar:trips-changed'

export function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(TRIPS_KEY)
    return raw ? (JSON.parse(raw) as Trip[]) : []
  } catch {
    return []
  }
}

function persistTrips(trips: Trip[]) {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(TRIPS_CHANGED_EVENT, { detail: trips }))
  }
}

export function subscribeTrips(listener: (trips: Trip[]) => void) {
  if (typeof window === 'undefined') return () => undefined

  const onCustom = (event: Event) => {
    const custom = event as CustomEvent<Trip[]>
    listener(custom.detail ?? loadTrips())
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === TRIPS_KEY) listener(loadTrips())
  }

  window.addEventListener(TRIPS_CHANGED_EVENT, onCustom)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(TRIPS_CHANGED_EVENT, onCustom)
    window.removeEventListener('storage', onStorage)
  }
}

export function saveTrip(trip: Trip): Trip[] {
  const current = loadTrips()
  const index = current.findIndex((item) => item.id === trip.id)
  const next = index >= 0
    ? current.map((item) => (item.id === trip.id ? trip : item))
    : [...current, trip]
  persistTrips(next)
  return next
}

export function deleteTrip(tripId: string): Trip[] {
  const next = loadTrips().filter((trip) => trip.id !== tripId)
  persistTrips(next)
  return next
}

export function tripForGame(trips: Trip[], gameId: string) {
  const latest = typeof window !== 'undefined' ? loadTrips() : trips
  return latest.find((trip) => trip.gameId === gameId) ?? trips.find((trip) => trip.gameId === gameId)
}

export function createTripForGame(game: Game): Trip {
  const now = new Date().toISOString()
  const defaultFrom = 'Hjem'
  const arena = game.arena
  return {
    id: `trip:${game.id}`,
    gameId: game.id,
    status: 'planned',
    desiredArrivalMinutesBefore: 30,
    createdAt: now,
    updatedAt: now,
    legs: [
      createLeg(0, 'outbound', defaultFrom, arena, 'car'),
      createLeg(1, 'return', arena, defaultFrom, 'car'),
    ],
  }
}

export function createLeg(
  order: number,
  direction: TripLeg['direction'],
  fromName = '',
  toName = '',
  transport: TransportMode = 'car',
): TripLeg {
  return {
    id: `leg:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
    order,
    direction,
    fromName,
    toName,
    transport,
    km: null,
    durationMinutes: null,
    estimatedCost: null,
    actualCost: null,
  }
}

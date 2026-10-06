import { arenaForGame } from '../data/arenas'
import type { Arena, ArenaProximity, Game, SmartGameDayEvent } from '../types'

const EARTH_RADIUS_METERS = 6_371_000

function toRadians(value: number) {
  return (value * Math.PI) / 180
}

export function distanceMeters(
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number,
) {
  const dLat = toRadians(latitudeB - latitudeA)
  const dLon = toRadians(longitudeB - longitudeA)
  const lat1 = toRadians(latitudeA)
  const lat2 = toRadians(latitudeB)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

  return EARTH_RADIUS_METERS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function classifyArenaProximity(arena: Arena, distance: number): ArenaProximity {
  const arrivalRadius = arena.arrivalRadiusMeters ?? 250
  const nearRadius = arena.nearRadiusMeters ?? 1000

  if (distance <= arrivalRadius) return 'arrived'
  if (distance <= nearRadius) return 'near'
  return 'outside'
}

export function classifyArenaProximityWithAccuracy(
  arena: Arena,
  distance: number,
  accuracy: number,
  previous: ArenaProximity = 'outside',
): ArenaProximity {
  const arrivalRadius = arena.arrivalRadiusMeters ?? 250
  const nearRadius = arena.nearRadiusMeters ?? 1000
  const uncertainty = Number.isFinite(accuracy) ? Math.max(0, accuracy) : nearRadius

  // Krev at hele GPS-usikkerhetssirkelen er innenfor grensen før vi
  // beveger oss "innover". Det hindrer falske ankomstsignaler på svak GPS.
  if (distance + uncertainty <= arrivalRadius) return 'arrived'
  if (distance + uncertainty <= nearRadius) return 'near'

  // Tilsvarende må hele usikkerhetssirkelen være utenfor nærsonen før
  // vi markerer at brukeren har forlatt arenaområdet.
  if (distance - uncertainty > nearRadius) return 'outside'

  // Uklart punkt: behold forrige tilstand i stedet for å hoppe frem og tilbake.
  return previous
}

export function isReliableArenaPosition(arena: Arena, position: GeolocationPosition) {
  const nearRadius = arena.nearRadiusMeters ?? 1000
  return Number.isFinite(position.coords.accuracy) && position.coords.accuracy <= Math.min(300, nearRadius / 2)
}

export function isSameOsloDate(a: Date, b: Date) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Oslo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(a) === formatter.format(b)
}

export function eventFromPosition(
  game: Game,
  position: GeolocationPosition,
  previousProximity: ArenaProximity = 'outside',
): SmartGameDayEvent | null {
  const arena = arenaForGame(game)
  if (!arena || arena.latitude == null || arena.longitude == null) return null

  const distance = distanceMeters(
    position.coords.latitude,
    position.coords.longitude,
    arena.latitude,
    arena.longitude,
  )
  const proximity = classifyArenaProximityWithAccuracy(
    arena,
    distance,
    position.coords.accuracy,
    previousProximity,
  )

  let type: SmartGameDayEvent['type'] | null = null
  if (proximity === 'arrived' && previousProximity !== 'arrived') type = 'arrived_at_arena'
  else if (proximity === 'near' && previousProximity === 'outside') type = 'near_arena'
  else if (proximity === 'outside' && previousProximity !== 'outside') type = 'left_arena'

  if (!type) return null

  return {
    gameId: game.id,
    arenaId: arena.id,
    type,
    observedAt: new Date(position.timestamp).toISOString(),
    distanceMeters: Math.round(distance),
    accuracyMeters: Math.round(position.coords.accuracy),
  }
}

export function shouldSuggestAttendance(
  game: Game,
  events: SmartGameDayEvent[],
  now = new Date(),
) {
  if (!isSameOsloDate(new Date(game.startsAt), now) && now < new Date(game.startsAt)) return false

  const hasArrival = events.some(
    (event) => event.gameId === game.id && event.type === 'arrived_at_arena',
  )
  if (!hasArrival) return false

  const expectedGameEnd = new Date(new Date(game.startsAt).getTime() + 2.5 * 60 * 60 * 1000)
  return now >= expectedGameEnd || events.some(
    (event) => event.gameId === game.id && event.type === 'left_arena',
  )
}

export function requestCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation støttes ikke på denne enheten.'))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15_000,
      maximumAge: 60_000,
    })
  })
}

// GPS er kun et signal. Denne modulen setter aldri attendanceActual direkte.

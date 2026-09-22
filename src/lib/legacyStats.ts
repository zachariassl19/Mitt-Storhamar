import type { GameDayRecord, HubExport, PuckHunterHistory } from '../types'

export interface LegacyCareerStats {
  attendedGameIds: Set<string>
  confirmedKm: number
}

function hubAttendedIds(hubData: HubExport | null) {
  return new Set(
    (hubData?.attendance ?? [])
      .filter((entry) => entry.attendanceActual === 'attended')
      .map((entry) => entry.gameId),
  )
}

export function confirmedLegacyCareerStats(
  hubData: HubExport | null,
  puckHunterHistory: PuckHunterHistory | null,
  records: Record<string, GameDayRecord>,
): LegacyCareerStats {
  const hubAttended = hubAttendedIds(hubData)
  const attendedGameIds = new Set<string>(hubAttended)

  for (const game of puckHunterHistory?.games ?? []) {
    if (game.attendanceActual === 'ATTENDED') attendedGameIds.add(`puckhunter:${game.importId}`)
  }

  for (const record of Object.values(records)) {
    if (record.completed && record.attendanceActual === 'attended') attendedGameIds.add(record.gameId)
  }

  const completedTrips = new Set(
    (hubData?.trips ?? [])
      .filter((trip) => trip.status === 'completed')
      .map((trip) => trip.id),
  )
  const gameForTrip = new Map((hubData?.tripGames ?? []).map((link) => [link.tripId, link.gameId]))

  const confirmedTripIds = new Set<string>()
  for (const tripId of completedTrips) {
    const gameId = gameForTrip.get(tripId)
    if (!gameId) continue

    // Historical PuckHunter trips originate from an attendance-only import.
    // Current-season HUB trips still require explicit attended status.
    if (hubAttended.has(gameId) || gameId.startsWith('game:puckhunter:')) {
      confirmedTripIds.add(tripId)
    }
  }

  const confirmedKm = (hubData?.tripLegs ?? []).reduce((sum, leg) => {
    if (!confirmedTripIds.has(leg.tripId)) return sum
    return sum + (typeof leg.km === 'number' && leg.km > 0 ? leg.km : 0)
  }, 0)

  return { attendedGameIds, confirmedKm }
}

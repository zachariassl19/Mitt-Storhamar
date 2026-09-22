import type { GameDayRecord, HubExport } from '../types'

export interface LegacyCareerStats {
  attendedGameIds: Set<string>
  confirmedKm: number
}

export function confirmedLegacyCareerStats(
  hubData: HubExport | null,
  records: Record<string, GameDayRecord>,
): LegacyCareerStats {
  const attendedGameIds = new Set(
    (hubData?.attendance ?? [])
      .filter((entry) => entry.attendanceActual === 'attended')
      .map((entry) => entry.gameId),
  )

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
    if (gameId && attendedGameIds.has(gameId)) confirmedTripIds.add(tripId)
  }

  const confirmedKm = (hubData?.tripLegs ?? []).reduce((sum, leg) => {
    if (!confirmedTripIds.has(leg.tripId)) return sum
    return sum + (typeof leg.km === 'number' && leg.km > 0 ? leg.km : 0)
  }, 0)

  return { attendedGameIds, confirmedKm }
}

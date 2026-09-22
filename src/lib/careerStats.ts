import type { GameDayRecord, Trip } from '../types'

export interface ConfirmedCareerStats {
  attendedGames: number
  completedTrips: number
  km: number
  travelCost: number
}

export function confirmedLocalCareerStats(
  records: Record<string, GameDayRecord>,
  trips: Trip[],
): ConfirmedCareerStats {
  const attendedGameIds = new Set(
    Object.values(records)
      .filter((record) => record.completed && record.attendanceActual === 'attended')
      .map((record) => record.gameId),
  )

  const completedTrips = trips.filter(
    (trip) => trip.status === 'completed' && attendedGameIds.has(trip.gameId),
  )

  const km = completedTrips.reduce(
    (sum, trip) => sum + trip.legs.reduce((legSum, leg) => legSum + (leg.km ?? 0), 0),
    0,
  )

  const travelCost = completedTrips.reduce(
    (sum, trip) => sum + trip.legs.reduce(
      (legSum, leg) => legSum + (leg.actualCost ?? leg.estimatedCost ?? 0),
      0,
    ),
    0,
  )

  return {
    attendedGames: attendedGameIds.size,
    completedTrips: completedTrips.length,
    km,
    travelCost,
  }
}

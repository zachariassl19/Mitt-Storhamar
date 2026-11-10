import type { Game, Trip, TripLeg } from '../types'

export interface TravelHistoryRow {
  trip: Trip
  game: Game | null
  /** Used for ordering only. For unknown games this is when the trip was last edited, not the match date. */
  date: Date
  matchDate: Date | null
  km: number | null
  cost: number | null
  hasEstimatedCost: boolean
  hasUnknownKm: boolean
  hasUnknownCost: boolean
}

function recordedKm(leg: TripLeg): number | null {
  return leg.km != null && Number.isFinite(leg.km) && leg.km >= 0 ? leg.km : null
}

function recordedCost(leg: TripLeg): number | null {
  const cost = leg.actualCost ?? leg.estimatedCost
  return cost != null && Number.isFinite(cost) && cost >= 0 ? cost : null
}

/** Never invent a match date or pass off a partial journey as fully recorded. */
export function travelHistoryRows(trips: Trip[], games: Game[], now = Date.now()): TravelHistoryRow[] {
  const byId = new Map(games.map(game => [game.id, game]))
  return trips.map(trip => {
    const game = byId.get(trip.gameId) ?? null
    const matchDate = game ? new Date(game.startsAt) : null
    const updatedAt = Date.parse(trip.updatedAt)
    const date = matchDate ?? new Date(Number.isFinite(updatedAt) ? updatedAt : 0)
    const kmValues = trip.legs.map(recordedKm)
    const costValues = trip.legs.map(recordedCost)
    const knownKm = kmValues.filter((value): value is number => value !== null)
    const knownCost = costValues.filter((value): value is number => value !== null)

    return {
      trip, game, date, matchDate,
      km: knownKm.length ? knownKm.reduce((sum, km) => sum + km, 0) : null,
      cost: knownCost.length ? knownCost.reduce((sum, cost) => sum + cost, 0) : null,
      hasEstimatedCost: trip.legs.some(leg => leg.actualCost == null && recordedCost(leg) !== null),
      hasUnknownKm: kmValues.some(value => value === null),
      hasUnknownCost: costValues.some(value => value === null),
    }
  }).sort((a, b) => {
    const aUpcoming = a.game && a.trip.status === 'planned' && a.date.getTime() > now
    const bUpcoming = b.game && b.trip.status === 'planned' && b.date.getTime() > now
    if (aUpcoming && !bUpcoming) return -1
    if (!aUpcoming && bUpcoming) return 1
    return aUpcoming && bUpcoming
      ? a.date.getTime() - b.date.getTime()
      : b.date.getTime() - a.date.getTime()
  })
}

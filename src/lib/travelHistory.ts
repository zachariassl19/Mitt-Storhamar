import type { Game, Trip } from '../types'

export interface TravelHistoryRow {
  trip: Trip
  game: Game | null
  date: Date
  km: number | null
  cost: number | null
  hasEstimatedCost: boolean
}

/** Reuse saved trips, never estimate missing distance or money. */
export function travelHistoryRows(trips: Trip[], games: Game[], now = Date.now()): TravelHistoryRow[] {
  const byId = new Map(games.map(game => [game.id, game]))
  return trips.map(trip => {
    const game = byId.get(trip.gameId) ?? null
    const knownKm = trip.legs.filter(leg => leg.km != null && Number.isFinite(leg.km))
    const knownCost = trip.legs.filter(leg => (leg.actualCost ?? leg.estimatedCost) != null)
    return {
      trip, game,
      date: new Date(game?.startsAt ?? trip.updatedAt),
      km: knownKm.length ? knownKm.reduce((sum, leg) => sum + (leg.km ?? 0), 0) : null,
      cost: knownCost.length ? knownCost.reduce((sum, leg) => sum + (leg.actualCost ?? leg.estimatedCost ?? 0), 0) : null,
      hasEstimatedCost: knownCost.some(leg => leg.actualCost == null && leg.estimatedCost != null),
    }
  }).sort((a,b) => {
    const aUpcoming = a.game && a.trip.status === 'planned' && a.date.getTime() > now
    const bUpcoming = b.game && b.trip.status === 'planned' && b.date.getTime() > now
    if (aUpcoming && !bUpcoming) return -1
    if (!aUpcoming && bUpcoming) return 1
    return aUpcoming && bUpcoming
      ? a.date.getTime() - b.date.getTime()
      : b.date.getTime() - a.date.getTime()
  })
}

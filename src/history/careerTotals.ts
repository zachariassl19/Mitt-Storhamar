import sourceSnapshot from './careerTotalsFull.json'

/**
 * SIL-arkivets adelskalender er en FROSSET kildekopi fra 2025/26.
 * Tall som avviker internt i kilden beholdes, og avvik vises for brukeren.
 * De skal aldri automatisk "korrigeres" ved å summere mål og assists.
 */
export interface CareerTotal {
  name: string
  position: string
  seasons: number
  games: number
  goals: number
  assists: number
  points: number
  penaltyMinutes: number
}
export const careerTotalsSource = sourceSnapshot.source
export const careerTotalsSnapshotSeason = sourceSnapshot.asOf
export const careerTotalsSnapshotDate = sourceSnapshot.fetchedAt
export const careerTotals: CareerTotal[] = sourceSnapshot.entries

export const careerStatDiscrepancies = careerTotals.filter((entry) =>
  entry.goals + entry.assists !== entry.points
)
export const careerNamesRepeated = Array.from(
  new Set(careerTotals.map((entry) => entry.name).filter((name,index,names) => names.indexOf(name)!==index))
)

/** An ambiguous duplicate name is not sufficient to identify a single profile. */
export function careerTotalForName(name: string): CareerTotal | undefined {
  const matches = careerTotals.filter((entry) => entry.name === name)
  return matches.length === 1 ? matches[0] : undefined
}

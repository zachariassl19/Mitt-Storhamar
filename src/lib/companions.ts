import type { Game, GameDayRecord } from '../types'

export interface Companion {
  id: string
  name: string
  custom?: boolean
}

export interface GameCompanionSelection {
  gameId: string
  status: 'known' | 'unknown' | 'unset'
  companionIds: string[]
  updatedAt: string
}

export interface CompanionPersonStat extends Companion {
  games: number
  homeGames: number
  awayGames: number
}

export interface CompanionSummary {
  registeredGames: number
  unknownGames: number
  soloGames: number
  people: CompanionPersonStat[]
  topCompanion: CompanionPersonStat | null
  topCombination: { names: string[]; games: number } | null
}

const CUSTOM_COMPANIONS_KEY = 'mitt-storhamar:companions:v1'
const GAME_COMPANIONS_KEY = 'mitt-storhamar:game-companions:v1'

export const DEFAULT_COMPANIONS: Companion[] = [
  { id: 'mamma', name: 'Mamma' },
  { id: 'pappa', name: 'Pappa' },
  { id: 'fredrik', name: 'Fredrik' },
]

export function loadCompanions(): Companion[] {
  let custom: Companion[] = []
  try {
    const raw = localStorage.getItem(CUSTOM_COMPANIONS_KEY)
    custom = raw ? (JSON.parse(raw) as Companion[]) : []
  } catch {
    custom = []
  }

  const byId = new Map(DEFAULT_COMPANIONS.map((person) => [person.id, person]))
  for (const person of custom) {
    if (!person?.id || !person?.name?.trim()) continue
    byId.set(person.id, { ...person, name: person.name.trim(), custom: true })
  }
  return [...byId.values()]
}

export function addCompanion(name: string): Companion[] {
  const clean = name.trim()
  if (!clean) return loadCompanions()

  const current = loadCompanions()
  const existing = current.find((person) => person.name.localeCompare(clean, 'nb-NO', { sensitivity: 'base' }) === 0)
  if (existing) return current

  const person: Companion = {
    id: `person:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
    name: clean,
    custom: true,
  }
  const custom = [...current.filter((item) => item.custom), person]
  localStorage.setItem(CUSTOM_COMPANIONS_KEY, JSON.stringify(custom))
  return [...DEFAULT_COMPANIONS, ...custom]
}

export function loadGameCompanionSelections(): Record<string, GameCompanionSelection> {
  try {
    const raw = localStorage.getItem(GAME_COMPANIONS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, GameCompanionSelection>) : {}
  } catch {
    return {}
  }
}

export function companionSelectionForGame(gameId: string): GameCompanionSelection {
  const current = loadGameCompanionSelections()[gameId]
  return current ?? {
    gameId,
    status: 'unset',
    companionIds: [],
    updatedAt: new Date().toISOString(),
  }
}

export function saveGameCompanionSelection(selection: GameCompanionSelection) {
  const current = loadGameCompanionSelections()
  const next = { ...current, [selection.gameId]: selection }
  localStorage.setItem(GAME_COMPANIONS_KEY, JSON.stringify(next))
  return next
}

export function summarizeCompanions(
  companions: Companion[],
  selections: Record<string, GameCompanionSelection>,
  records: Record<string, GameDayRecord>,
  gameList: Game[],
): CompanionSummary {
  const personMap = new Map(companions.map((person) => [person.id, person]))
  const gameMap = new Map(gameList.map((game) => [game.id, game]))
  const statMap = new Map<string, CompanionPersonStat>()
  for (const person of companions) statMap.set(person.id, { ...person, games: 0, homeGames: 0, awayGames: 0 })

  let registeredGames = 0
  let unknownGames = 0
  let soloGames = 0
  const combinations = new Map<string, { names: string[]; games: number }>()

  for (const record of Object.values(records)) {
    if (!record.completed || record.attendanceActual !== 'attended') continue
    const selection = selections[record.gameId]
    if (!selection || selection.status !== 'known') {
      unknownGames += 1
      continue
    }

    registeredGames += 1
    const uniqueIds = [...new Set(selection.companionIds.filter((id) => personMap.has(id)))]
    if (uniqueIds.length === 0) {
      soloGames += 1
      continue
    }

    const game = gameMap.get(record.gameId)
    const names = uniqueIds.map((id) => personMap.get(id)!.name).sort((a, b) => a.localeCompare(b, 'nb-NO'))
    const combinationKey = names.join('|')
    const combination = combinations.get(combinationKey) ?? { names, games: 0 }
    combination.games += 1
    combinations.set(combinationKey, combination)

    for (const id of uniqueIds) {
      const stat = statMap.get(id)
      if (!stat) continue
      stat.games += 1
      if (game?.homeTeam === 'Storhamar') stat.homeGames += 1
      else if (game?.awayTeam === 'Storhamar') stat.awayGames += 1
    }
  }

  const people = [...statMap.values()].sort((a, b) => b.games - a.games || a.name.localeCompare(b.name, 'nb-NO'))
  const topCompanion = people.find((person) => person.games > 0) ?? null
  const topCombination = [...combinations.values()].sort((a, b) => b.games - a.games || b.names.length - a.names.length)[0] ?? null

  return { registeredGames, unknownGames, soloGames, people, topCompanion, topCombination }
}

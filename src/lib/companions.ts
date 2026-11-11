import type { Game, GameDayRecord } from '../types'

export interface Companion {
  id: string
  name: string
  custom?: boolean
  /** Hidden names are omitted from future choices but retained for past game history. */
  hidden?: boolean
  /** Used by private cloud sync to stop old name edits from overriding newer ones. */
  updatedAt?: string
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

function storedCompanions(): Companion[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CUSTOM_COMPANIONS_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((value): value is Companion => (
      value && typeof value === 'object' &&
      typeof value.id === 'string' && value.id.trim().length > 0 &&
      typeof value.name === 'string' && value.name.trim().length > 0
    ))
  } catch {
    return []
  }
}

/** Include hidden names for historical game statistics and existing selections. */
export function loadAllCompanions(): Companion[] {
  const byId = new Map(DEFAULT_COMPANIONS.map(person => [person.id, { ...person }]))
  for (const person of storedCompanions()) {
    const isDefault = DEFAULT_COMPANIONS.some(defaultPerson => defaultPerson.id === person.id)
    byId.set(person.id, {
      ...person,
      name: person.name.trim(),
      custom: !isDefault,
      hidden: person.hidden === true,
    })
  }
  return [...byId.values()]
}

/** Active names only, including any user overrides of the original defaults. */
export function loadCompanions(): Companion[] {
  return loadAllCompanions().filter(person => !person.hidden)
}

function storeCompanion(person: Companion): void {
  const current = storedCompanions()
  const next = current.filter(entry => entry.id !== person.id)
  next.push({ ...person, updatedAt: new Date().toISOString() })
  localStorage.setItem(CUSTOM_COMPANIONS_KEY, JSON.stringify(next))
}

function sameName(a: string, b: string) {
  return a.localeCompare(b, 'nb-NO', { sensitivity: 'base' }) === 0
}

export interface CompanionEditResult {
  success: boolean
  message: string
}

export function renameCompanion(id: string, name: string): CompanionEditResult {
  const clean = name.trim()
  if (!clean) return { success: false, message: 'Skriv inn et navn.' }
  if (clean.length > 80) return { success: false, message: 'Navnet kan ikke være lengre enn 80 tegn.' }
  const all = loadAllCompanions()
  const person = all.find(entry => entry.id === id)
  if (!person) return { success: false, message: 'Fant ikke personen.' }
  if (all.some(entry => entry.id !== id && sameName(entry.name, clean))) {
    return { success: false, message: 'Navnet finnes allerede. Bruk den eksisterende personen.' }
  }
  storeCompanion({ ...person, name: clean })
  return { success: true, message: `Navnet er endret til ${clean}. Tidligere registreringer er beholdt.` }
}

/** Archive instead of erasing: old registered games retain their person identifiers. */
export function hideCompanion(id: string): CompanionEditResult {
  const person = loadAllCompanions().find(entry => entry.id === id)
  if (!person) return { success: false, message: 'Fant ikke personen.' }
  storeCompanion({ ...person, hidden: true })
  return { success: true, message: `${person.name} er fjernet fra listen. Tidligere kampregistreringer er beholdt.` }
}

export function restoreCompanion(id: string): CompanionEditResult {
  const all = loadAllCompanions()
  const person = all.find(entry => entry.id === id)
  if (!person) return { success: false, message: 'Fant ikke personen.' }
  if (all.some(entry => entry.id !== id && !entry.hidden && sameName(entry.name, person.name))) {
    return { success: false, message: 'Et aktivt navn er allerede likt. Gi personen et annet navn først.' }
  }
  storeCompanion({ ...person, hidden: false })
  return { success: true, message: `${person.name} kan velges igjen.` }
}

export function addCompanion(name: string): Companion[] {
  const clean = name.trim()
  if (!clean || clean.length > 80) return loadCompanions()

  const existing = loadAllCompanions().find(person => sameName(person.name, clean))
  if (existing) {
    if (existing.hidden) restoreCompanion(existing.id)
    return loadCompanions()
  }

  const person: Companion = {
    id: `person:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
    name: clean,
    custom: true,
  }
  storeCompanion(person)
  return loadCompanions()
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

  const people = [...statMap.values()]
    .filter(person => !person.hidden || person.games > 0)
    .sort((a, b) => b.games - a.games || a.name.localeCompare(b.name, 'nb-NO'))
  const topCompanion = people.find((person) => person.games > 0) ?? null
  const topCombination = [...combinations.values()].sort((a, b) => b.games - a.games || b.names.length - a.names.length)[0] ?? null

  return { registeredGames, unknownGames, soloGames, people, topCompanion, topCombination }
}

import { gameFeatures } from './gamePresentation'
import type { Game } from '../types'

export interface DepartureChecklistData {
  checked: Record<string, boolean>
  updatedAt?: string
}

export type DepartureChecklistKind = 'home' | 'away' | 'classic'

export interface DepartureChecklistItem {
  key: string
  label: string
}

const HOME_ITEMS: DepartureChecklistItem[] = [
  { key: 'accreditation', label: 'Akkreditering' },
  { key: 'jersey', label: 'Drakt' },
  { key: 'scarf', label: 'Skjerf' },
  { key: 'charger', label: 'Lader' },
  { key: 'drink', label: 'Drikke' },
  { key: 'ssu_sweater', label: 'SSU-genser' },
  { key: 'earplugs', label: 'Ørepropper' },
  { key: 'wallet', label: 'Lommebok' },
]

const AWAY_ITEMS: DepartureChecklistItem[] = [
  { key: 'charger', label: 'Lader' },
  { key: 'jersey', label: 'Drakt' },
  { key: 'scarf', label: 'Skjerf' },
  { key: 'ssu_sweater', label: 'SSU-genser' },
  { key: 'earplugs', label: 'Ørepropper' },
  { key: 'wallet', label: 'Lommebok' },
]

const CLASSIC_ITEMS: DepartureChecklistItem[] = [
  { key: 'accreditation', label: 'Akkreditering' },
  ...AWAY_ITEMS,
]

const PREFIX = 'mitt-storhamar:departure:'
export const DEPARTURE_CHECKLIST_EVENT = 'mitt-storhamar:departure-checklist-changed'

export function departureChecklistKind(game: Game): DepartureChecklistKind {
  if (gameFeatures(game).some((feature) => feature.key === 'classic')) return 'classic'
  return game.homeTeam === 'Storhamar' ? 'home' : 'away'
}

export function departureChecklistKindLabel(game: Game) {
  const kind = departureChecklistKind(game)
  if (kind === 'classic') return 'HOCKEY CLASSIC'
  if (kind === 'home') return 'HJEMMEKAMP'
  return 'BORTEKAMP'
}

export function departureChecklistItems(game: Game): DepartureChecklistItem[] {
  const kind = departureChecklistKind(game)
  if (kind === 'classic') return CLASSIC_ITEMS
  if (kind === 'home') return HOME_ITEMS
  return AWAY_ITEMS
}

export function loadDepartureChecklist(gameId: string): DepartureChecklistData {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFIX + gameId) || '{}') as Partial<DepartureChecklistData>
    return { checked: saved.checked ?? {}, updatedAt: saved.updatedAt }
  } catch {
    return { checked: {} }
  }
}

export function saveDepartureChecklist(gameId: string, data: DepartureChecklistData) {
  const next: DepartureChecklistData = {
    ...data,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(PREFIX + gameId, JSON.stringify(next))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DEPARTURE_CHECKLIST_EVENT, { detail: { gameId, data: next } }))
  }
  return next
}

export function departureChecklistProgress(data: DepartureChecklistData, game: Game) {
  const items = departureChecklistItems(game)
  const total = items.length
  const checked = items.filter((item) => data.checked[item.key]).length
  return {
    checked,
    total,
    percent: Math.round((checked / total) * 100),
    complete: checked === total,
  }
}

export function subscribeDepartureChecklist(
  gameId: string,
  listener: (data: DepartureChecklistData) => void,
) {
  if (typeof window === 'undefined') return () => undefined

  const handler = (event: Event) => {
    const custom = event as CustomEvent<{ gameId: string; data: DepartureChecklistData }>
    if (custom.detail?.gameId === gameId) listener(custom.detail.data)
  }
  const storageHandler = (event: StorageEvent) => {
    if (event.key === PREFIX + gameId) listener(loadDepartureChecklist(gameId))
  }

  window.addEventListener(DEPARTURE_CHECKLIST_EVENT, handler)
  window.addEventListener('storage', storageHandler)
  return () => {
    window.removeEventListener(DEPARTURE_CHECKLIST_EVENT, handler)
    window.removeEventListener('storage', storageHandler)
  }
}

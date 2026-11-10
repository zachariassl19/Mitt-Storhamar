import type { Game } from '../types'

export const GAME_OVERRIDES_KEY = 'mitt-storhamar:game-overrides:v1'
export const GAME_OVERRIDES_CHANGED_EVENT = 'mitt-storhamar:game-overrides-changed'

export interface GameOverride {
  startsAt?: string
  arena?: string
  updatedAt: string
}

export type GameOverrides = Record<string, GameOverride>

export function loadGameOverrides(): GameOverrides {
  if (typeof localStorage === 'undefined') return {}
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(GAME_OVERRIDES_KEY) || '{}')
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as GameOverrides : {}
  } catch { return {} }
}

/** Modify the existing game objects so every consumer shares the approved schedule. */
export function applyGameOverrides(games: Game[], overrides: GameOverrides): void {
  for (const game of games) {
    const override = overrides[game.id]
    if (!override) continue
    if (typeof override.startsAt === 'string' && Number.isFinite(Date.parse(override.startsAt))) {
      game.startsAt = override.startsAt
    }
    if (typeof override.arena === 'string' && override.arena.trim()) game.arena = override.arena.trim()
  }
  games.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
}

export function saveGameOverride(games: Game[], gameId: string, patch: Omit<GameOverride,'updatedAt'>) {
  const game = games.find((entry) => entry.id === gameId)
  if (!game) throw new Error('Kampen finnes ikke i terminlisten.')
  if (patch.startsAt && !Number.isFinite(Date.parse(patch.startsAt))) throw new Error('Ugyldig kampdato.')
  const current = loadGameOverrides()
  current[gameId] = { ...current[gameId], ...patch, updatedAt: new Date().toISOString() }
  localStorage.setItem(GAME_OVERRIDES_KEY, JSON.stringify(current))
  applyGameOverrides(games, current)
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(GAME_OVERRIDES_CHANGED_EVENT))
}

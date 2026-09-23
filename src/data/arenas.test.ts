import { describe, expect, it } from 'vitest'
import { games } from './games'
import { arenaForGame } from './arenas'

describe('arena GPS registry', () => {
  it('has coordinates for every arena used by the 2026/27 games', () => {
    const missing = games
      .filter((game) => {
        const arena = arenaForGame(game)
        return !arena || arena.latitude == null || arena.longitude == null
      })
      .map((game) => `${game.arena} (${game.city ?? 'ukjent by'})`)

    expect([...new Set(missing)]).toEqual([])
  })
})

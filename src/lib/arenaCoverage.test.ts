import { describe, expect, it } from 'vitest'
import { arenaForGame } from '../data/arenas'
import { games } from '../data/games'

describe('arena GPS coverage', () => {
  it('has coordinates for every arena used by the current schedule', () => {
    const missing = [...new Set(
      games
        .filter((game) => {
          const arena = arenaForGame(game)
          return !arena || arena.latitude == null || arena.longitude == null
        })
        .map((game) => game.arena),
    )]

    expect(missing).toEqual([])
  })
})

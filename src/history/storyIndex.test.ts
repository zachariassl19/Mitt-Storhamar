import { describe, expect, it } from 'vitest'
import { indexedPlayerStories, searchPlayerStories } from './storyIndex'
import { playerStories } from './playerStories'

describe('accessible player stories', () => {
  it('lists all written biographies with a valid and openable archive profile', () => {
    const stories = indexedPlayerStories()
    expect(stories).toHaveLength(playerStories.length)
    expect(stories).toHaveLength(25)
    expect(new Set(stories.map((entry) => entry.story.name)).size).toBe(stories.length)
    expect(stories.every((entry) => entry.kind === 'legend' || entry.kind === 'player')).toBe(true)
  })

  it('finds a narrative by Norwegian name, important events, and accent variants', () => {
    expect(searchPlayerStories('Skadsdammen').some((entry) => entry.story.name === 'Eirik Skadsdammen')).toBe(true)
    expect(searchPlayerStories('marthe osteraas').some((entry) => entry.story.name === 'Marthe Østeraas')).toBe(true)
    expect(searchPlayerStories('217 minutter').some((entry) => entry.story.name === 'Joakim Jensen')).toBe(true)
    expect(searchPlayerStories('umatchable-nonsense')).toHaveLength(0)
  })
})

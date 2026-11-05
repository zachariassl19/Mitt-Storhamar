import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import { featuredPlayerStoryNames, playerStories, playerStoryForName } from './playerStories'

describe('historical player biographies', () => {
  it('has 25 individual, readable stories for players in the actual archive', () => {
    expect(playerStories).toHaveLength(25)
    expect(new Set(playerStories.map((story) => story.name)).size).toBe(playerStories.length)
    for (const story of playerStories) {
      const person = [...historyArchive.legends, ...historyArchive.players]
        .find((player) => player.fullName === story.name)
      expect(person, 'Missing archive profile for ' + story.name).toBeDefined()
      expect(story.lead.length).toBeGreaterThan(40)
      expect(story.chapters.length, story.name).toBeGreaterThanOrEqual(2)
      expect(story.sources.length, story.name).toBeGreaterThan(0)
    }
  })

  it('writes as narrative, without interrupting biographies with source verification prose', () => {
    for (const story of playerStories) {
      const prose = [story.lead, ...story.chapters.map((chapter) => chapter.text)].join(' ')
      expect(prose, story.name).not.toMatch(/SIL-arkivets (adelskalender|spillerprofil|oversikt)|kilden (er bekreftet|fastslår)|kildekontrollert/i)
      expect(story.chapters.every((chapter) => chapter.heading.length > 3 && chapter.text.length > 70)).toBe(true)
      expect(story.sources.every((source) => source.label && /^https:\/\//.test(source.url))).toBe(true)
    }
  })

  it('has source-linked key events for Skadsdammen, Jensen and Smithurst', () => {
    const skads = playerStoryForName('Eirik Skadsdammen')!
    expect(skads.chapters.map((part) => part.text).join(' ')).toMatch(/2008/)
    expect(skads.chapters.map((part) => part.text).join(' ')).toMatch(/Team Skogen/)
    expect(playerStoryForName('Joakim Jensen')!.chapters.map((part) => part.text).join(' ')).toMatch(/217 minutter og 14 sekunder/)
    expect(playerStoryForName('Michael Smithurst')!.chapters.map((part) => part.text).join(' ')).toMatch(/81 minutter og 54 sekunder/)
  })

  it('features meaningful player stories from different eras', () => {
    expect(featuredPlayerStoryNames.length).toBe(8)
    for (const name of featuredPlayerStoryNames) {
      expect(playerStoryForName(name), name).toBeDefined()
      expect(historyArchive.legends.some((item) => item.fullName === name) ||
        historyArchive.players.some((item) => item.fullName === name)).toBe(true)
    }
  })
})

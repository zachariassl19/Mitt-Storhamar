import { historyArchive } from './catalog'
import { playerStories } from './playerStories'
import type { PlayerStory } from './playerStories'
import type { ArchivePerson } from './types'

export interface IndexedPlayerStory {
  kind: 'player' | 'legend'
  person: ArchivePerson
  story: PlayerStory
}

function normalizeQuery(input: string) {
  return input.toLocaleLowerCase('nb-NO').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
    .trim()
}

/** One findable article per written biography, not a misleading list of all player records. */
export function indexedPlayerStories(): IndexedPlayerStory[] {
  return playerStories.flatMap((story) => {
    const legend = historyArchive.legends.find((entry) => entry.fullName === story.name)
    if (legend) return [{ kind: 'legend' as const, person: legend, story }]
    const player = historyArchive.players.find((entry) => entry.fullName === story.name)
    return player ? [{ kind: 'player' as const, person: player, story }] : []
  }).sort((a,b) => a.story.name.localeCompare(b.story.name, 'nb-NO'))
}

export function searchPlayerStories(query: string): IndexedPlayerStory[] {
  const cleaned = normalizeQuery(query)
  const entries = indexedPlayerStories()
  if (!cleaned) return entries
  return entries.filter(({story}) => {
    const searchable = normalizeQuery([
      story.name, story.lead,
      ...story.chapters.flatMap((chapter) => [chapter.heading, chapter.text]),
    ].join(' '))
    return cleaned.split(/\s+/).every((word) => searchable.includes(word))
  })
}

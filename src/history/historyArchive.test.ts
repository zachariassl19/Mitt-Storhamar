import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'

function allEntities() {
  return [
    ...historyArchive.seasons,
    ...historyArchive.honours,
    ...historyArchive.jerseys,
    ...historyArchive.legends,
    ...historyArchive.players,
    ...historyArchive.arenas,
    ...historyArchive.europe,
    ...historyArchive.records,
    ...historyArchive.timeline,
  ]
}

describe('history archive', () => {
  it('starts with the verified early-history research block', () => {
    expect(historyArchive.seasons.map((season) => season.id)).toContain('season-1957-58')
    expect(historyArchive.seasons.map((season) => season.id)).toContain('season-1960-61')
    expect(historyArchive.jerseys.map((jersey) => jersey.id)).toContain('jersey-1957-67')
    expect(historyArchive.legends.map((legend) => legend.id)).toContain('legend-steinar-johansen')
    expect(historyArchive.arenas.map((arena) => arena.id)).toContain('arena-storhamarbana')
  })

  it('uses unique entity ids', () => {
    const ids = allEntities().map((entity) => entity.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('never publishes researched archive entities without a source', () => {
    const withoutSources = allEntities().filter((entity) => entity.sources.length === 0).map((entity) => entity.id)
    expect(withoutSources).toEqual([])
  })

  it('requires provenance for every archive image', () => {
    const invalidMedia = allEntities()
      .flatMap((entity) => entity.media)
      .filter((media) => !media.src || !media.alt || (!media.sourceId && !media.sourceUrl))
      .map((media) => media.id)

    expect(invalidMedia).toEqual([])
  })

  it('keeps the first jersey tied to a real SIL image and source', () => {
    const jersey = historyArchive.jerseys.find((entry) => entry.id === 'jersey-1957-67')
    expect(jersey?.manufacturer).toBe('Ramah')
    expect(jersey?.media[0]?.src).toContain('silarkivet.no')
    expect(jersey?.media[0]?.credit).toBe('SIL-arkivet')
  })

  it('does not mistake missing historic data for zero', () => {
    const firstSeason = historyArchive.seasons.find((season) => season.id === 'season-1957-58')
    expect(firstSeason?.standings[0]?.gamesPlayed).toBeUndefined()
    expect(firstSeason?.standings[0]?.points).toBeUndefined()
  })
})

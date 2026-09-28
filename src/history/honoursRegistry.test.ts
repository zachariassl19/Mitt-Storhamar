import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import {
  canonicalChampionshipSummary,
  canonicalLeagueChampionshipIds,
  canonicalNorwegianChampionshipIds,
} from './honoursRegistry'

describe('Storhamar championship archive', () => {
  it('contains every canonical league championship exactly once', () => {
    const actual = historyArchive.honours
      .filter((honour) => honour.honourType === 'league-championship')
      .map((honour) => honour.id)

    expect(actual).toHaveLength(canonicalChampionshipSummary.leagueChampionships)
    expect(new Set(actual).size).toBe(actual.length)
    expect(new Set(actual)).toEqual(new Set(canonicalLeagueChampionshipIds))
  })

  it('contains every canonical Norwegian championship exactly once', () => {
    const actual = historyArchive.honours
      .filter((honour) => honour.honourType === 'norwegian-championship')
      .map((honour) => honour.id)

    expect(actual).toHaveLength(canonicalChampionshipSummary.norwegianChampionships)
    expect(new Set(actual).size).toBe(actual.length)
    expect(new Set(actual)).toEqual(new Set(canonicalNorwegianChampionshipIds))
  })

  it('keeps the two historical 1993-era league championships distinct', () => {
    const first = historyArchive.honours.find((honour) => honour.id === 'honour-1993-first-eliteserie')
    const second = historyArchive.honours.find((honour) => honour.id === 'honour-1993-first-series')

    expect(first?.seasonId).toBe('season-1992-93')
    expect(first?.competition).toBe('Eliteserien del 2')
    expect(second?.seasonId).toBe('season-1993-94')
    expect(second?.competition).toBe('Eliteserien del 1')
  })
})

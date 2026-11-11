import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import {
  eliteProspectsSeasonLink,
  seasonDisplayName,
  ELITE_PROSPECTS_STORHAMAR_URL,
} from './eliteProspectsSeason'

describe('Elite Prospects sesongvelger', () => {
  it('links to the correct team-specific season route for checked historic examples', () => {
    expect(eliteProspectsSeasonLink(1969)).toEqual({
      url: 'https://www.eliteprospects.com/team/181/storhamar/1969-1970',
      directSeason: true,
    })
    expect(eliteProspectsSeasonLink(1980).url).toBe('https://www.eliteprospects.com/team/181/storhamar/1980-1981')
    expect(eliteProspectsSeasonLink(1995).url).toBe('https://www.eliteprospects.com/team/181/storhamar/1995-1996')
    expect(eliteProspectsSeasonLink(2025).url).toBe('https://www.eliteprospects.com/team/181/storhamar/2025-2026')
  })

  it('uses the verified team page rather than promising old or current-year roster coverage', () => {
    expect(eliteProspectsSeasonLink(1960)).toEqual({url: ELITE_PROSPECTS_STORHAMAR_URL, directSeason:false})
    expect(eliteProspectsSeasonLink(2026)).toEqual({url: ELITE_PROSPECTS_STORHAMAR_URL, directSeason:false})
  })

  it('renders season labels correctly across century boundaries', () => {
    expect(seasonDisplayName(1969)).toBe('1969/70')
    expect(seasonDisplayName(1999)).toBe('1999/00')
    expect(seasonDisplayName(2026)).toBe('2026/27')
  })

  it('provides a valid link for every local archive season without making up early season URLs', () => {
    for (const season of historyArchive.seasons) {
      const link = eliteProspectsSeasonLink(season.startYear)
      expect(link.url.startsWith(ELITE_PROSPECTS_STORHAMAR_URL)).toBe(true)
      if (season.startYear < 1969) {
        expect(link.url).toBe(ELITE_PROSPECTS_STORHAMAR_URL)
        expect(link.directSeason).toBe(false)
      }
    }
  })
})

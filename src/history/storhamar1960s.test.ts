import { describe, expect, it } from 'vitest'
import { storhamar1960s } from './storhamar1960s'
import { historySources } from './sources'

describe('historisk 60-tallsoversikt', () => {
  it('has a traceable primary source for its decade totals', () => {
    expect(historySources.find(source => source.id === 'sil-1960s')?.url).toBe(storhamar1960s.sourceUrl)
    expect(historySources.find(source => source.id === 'sil-1960s')?.primary).toBe(true)
  })

  it('keeps the 105 games consistent with the historical match results', () => {
    expect(storhamar1960s.wins + storhamar1960s.draws + storhamar1960s.losses).toBe(storhamar1960s.games)
  })

  it('does not present incomplete goalscorer coverage as a definitive all-time record', () => {
    expect(storhamar1960s.scorerDataIncomplete).toBe(true)
  })

  it('links Elite Prospects to the actual Storhamar team, as a secondary source', () => {
    const ep = historySources.find(source => source.id === 'eliteprospects')
    expect(ep?.url).toBe('https://www.eliteprospects.com/team/181/storhamar')
    expect(ep?.primary).toBe(false)
    expect(historySources.find(source => source.id === 'eliteprospects-storhamar-2026-27')?.url)
      .toContain('/storhamar/2026-2027')
  })
})

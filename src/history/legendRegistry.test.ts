import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import { canonicalRafterLegendIds, canonicalRafterSummary } from './legendRegistry'

describe('Storhamar rafter legends', () => {
  it('contains every canonical person honoured in the rafters exactly once', () => {
    const ids = historyArchive.legends
      .filter((legend) => canonicalRafterLegendIds.includes(legend.id as (typeof canonicalRafterLegendIds)[number]))
      .map((legend) => legend.id)

    expect(ids).toHaveLength(canonicalRafterSummary.totalHonouredPeople)
    expect(new Set(ids)).toEqual(new Set(canonicalRafterLegendIds))
  })

  it('gives every canonical rafter legend a proper profile', () => {
    const incomplete = canonicalRafterLegendIds.filter((id) => {
      const legend = historyArchive.legends.find((entry) => entry.id === id)
      return !legend || !legend.summary || !legend.body?.length || !legend.honourReason || !legend.rafterStatus
    })

    expect(incomplete).toEqual([])
  })

  it('preserves Marthe Østeraas as a major historical first', () => {
    const marthe = historyArchive.legends.find((legend) => legend.id === 'legend-marthe-osteraas')
    expect(marthe?.honouredNumber).toBe(21)
    expect(marthe?.honouredAt).toBe('2026-02-28')
    expect(marthe?.summary).toContain('første kvinnelige')
  })
})

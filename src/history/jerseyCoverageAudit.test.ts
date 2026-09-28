import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import { silJerseyCoverage } from './jerseyCoverage'
import { canonicalJerseyCoverageLinks, officialJerseyCoverageLinks } from './jerseyCanonicalCoverage'

describe('Storhamar jersey archive coverage', () => {
  it('maps every SIL-archive jersey index entry to a real archive entity', () => {
    const expectedLabels = new Set(silJerseyCoverage.map((entry) => entry.label))
    const mappedLabels = new Set(canonicalJerseyCoverageLinks.map((entry) => entry.label))
    expect(mappedLabels).toEqual(expectedLabels)

    const jerseyIds = new Set(historyArchive.jerseys.map((jersey) => jersey.id))
    for (const link of canonicalJerseyCoverageLinks) {
      expect(link.archiveIds.length, link.label).toBeGreaterThan(0)
      for (const id of link.archiveIds) {
        expect(jerseyIds.has(id), `${link.label} -> ${id}`).toBe(true)
      }
    }
  })

  it('keeps newer official 2025/26 variants even before SIL index catches up', () => {
    const jerseyIds = new Set(historyArchive.jerseys.map((jersey) => jersey.id))
    for (const link of officialJerseyCoverageLinks) {
      for (const id of link.archiveIds) {
        const jersey = historyArchive.jerseys.find((entry) => entry.id === id)
        expect(jerseyIds.has(id), `${link.label} -> ${id}`).toBe(true)
        expect(jersey?.media.length ?? 0, id).toBeGreaterThan(0)
      }
    }
  })
})

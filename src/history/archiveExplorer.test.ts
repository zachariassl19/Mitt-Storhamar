import { describe, expect, it } from 'vitest'
import { historyArchive, historyCategories } from './catalog'
import {
  archiveItem, archiveItems, archiveRelationships, entryYear, historyChapters,
  isBrowsableKind, matchesArchiveSearch, sourceRoleLists,
} from './archiveExplorer'
import type { BrowsableKind } from './archiveExplorer'

describe('public Storhamar history explorer', () => {
  const browsable: BrowsableKind[] = ['season','honour','jersey','legend','player','arena','europe','record','timeline']

  it('connects every existing primary category to a nonempty searchable archive', () => {
    for (const kind of browsable) {
      expect(isBrowsableKind(kind)).toBe(true)
      expect(archiveItems(kind).length).toBeGreaterThan(0)
    }
    expect(historyCategories).toHaveLength(13)
    expect(archiveItems('season')).toHaveLength(69)
    expect(archiveItems('europe').length).toBeGreaterThanOrEqual(13)
  })

  it('keeps the early eras and three contemporary championships accessible', () => {
    for (const id of ['season-1957-58','season-1994-95','season-2023-24','season-2024-25','season-2025-26']) {
      const season = archiveItem('season', id)
      expect(season, id).toBeDefined()
      expect(entryYear('season', season!)).toBeGreaterThanOrEqual(1957)
    }
    for (const id of ['honour-1995-nm','honour-2024-nm','honour-2025-nm','honour-2026-nm']) {
      expect(archiveItem('honour', id), id).toBeDefined()
    }
  })

  it('searches Norwegian names and supports accents', () => {
    const entries = archiveItems('player')
    const profile = entries.find((item) => item.title.toLocaleLowerCase('nb-NO').includes('østli'))
    if (profile) expect(matchesArchiveSearch(profile, 'ostli')).toBe(true)
    expect(matchesArchiveSearch(archiveItem('season','season-1957-58')!, '1957')).toBe(true)
    expect(matchesArchiveSearch(archiveItem('jersey','jersey-1957-67')!, 'svart gul')).toBe(true)
  })

  it('connects season pages to documented jerseys and related history', () => {
    const season=archiveItem('season','season-1957-58')!
    const related=archiveRelationships('season', season)
    expect(related.some((link)=>link.kind==='jersey' && link.id==='jersey-1957-67')).toBe(true)
    expect(archiveRelationships('jersey', archiveItem('jersey','jersey-1957-67')!).some((link)=>link.kind==='season')).toBe(true)
  })

  it('keeps photos and their source/credit attached', () => {
    const jersey=archiveItem('jersey','jersey-1957-67')!
    expect(jersey.media.length).toBeGreaterThan(0)
    expect(jersey.media.every((photo)=>photo.src && photo.alt && photo.credit && photo.sourceUrl)).toBe(true)
    expect(historyArchive.jerseys.some((item)=>item.id==='jersey-2025-26-series')).toBe(true)
  })

  it('only links curated narratives to real archive entities or documented pages', () => {
    expect(historyChapters.length).toBeGreaterThanOrEqual(8)
    for (const chapter of historyChapters) {
      expect(chapter.sourceUrl.startsWith('https://silarkivet.no/')).toBe(true)
      expect(chapter.paragraphs.length).toBeGreaterThan(0)
      for (const link of chapter.archiveLinks) {
        expect(archiveItem(link.kind,link.id), chapter.id + ' → ' + link.id).toBeDefined()
      }
      if (chapter.imageJerseyId) {
        expect(archiveItem('jersey',chapter.imageJerseyId)?.media.length).toBeGreaterThan(0)
      }
    }
  })

  it('provides real SIL sources for coaches and captains', () => {
    expect(sourceRoleLists.captain.entries.length).toBeGreaterThan(10)
    expect(sourceRoleLists.coach.entries.length).toBeGreaterThan(20)
    expect(sourceRoleLists.captain.sourceUrl).toContain('silarkivet.no')
    expect(sourceRoleLists.coach.sourceUrl).toContain('silarkivet.no')
  })
})

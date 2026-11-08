import { describe, expect, it } from 'vitest'
import { filteredSSUHighlights, highlightCategories, ssuHighlights, ssuHighlight } from './ssuHighlights'
import {
  ssuChapters, ssuFoundationDate, ssuPhotos, ssuSource,
  ssuSources, ssuTimeline,
} from './ssuHistory'

describe('SSU as its own Storhamar history chapter', () => {
  it('keeps the official 25 October 2001 founding date rather than unsupported dates', () => {
    expect(ssuFoundationDate).toBe('2001-10-25')
    expect(ssuTimeline.find((event) => event.id === '2001')?.date).toBe(ssuFoundationDate)
    expect(ssuTimeline.find((event) => event.id === '2026')?.date).toBe('2026-10-25')
    expect(ssuSource('registry')?.url).toContain('brreg.no')
  })

  it('treats the earlier supporterforening as an unverified secondary-source lead', () => {
    const early = ssuTimeline.find((event) => event.id === 'old-club')
    expect(early?.beforeSSU).toBe(true)
    expect(early?.uncertain).toBe(true)
    expect(early?.sourceIds).toContain('predecessor')
    expect(ssuSource('predecessor')?.note).toMatch(/mangler primærkilde/)
  })

  it('has a separate SSU history after the older supporter culture', () => {
    const earlier = ssuTimeline.filter((event) => event.beforeSSU)
    const union = ssuTimeline.filter((event) => !event.beforeSSU)
    expect(earlier.length).toBeGreaterThanOrEqual(3)
    expect(union.length).toBeGreaterThanOrEqual(18)
    expect(ssuChapters).toHaveLength(12)
    expect(new Set(ssuChapters.map((chapter) => chapter.id)).size).toBe(ssuChapters.length)
    expect(ssuChapters.some((chapter) => chapter.title.includes('Køllebladet'))).toBe(true)
  })

  it('references real source URLs for each historical event and chapter', () => {
    expect(ssuSources.length).toBeGreaterThanOrEqual(7)
    for (const source of ssuSources) expect(source.url).toMatch(/^https:\/\//)
    for (const event of ssuTimeline) {
      expect(event.sourceIds.length, event.id).toBeGreaterThan(0)
      for (const id of event.sourceIds) expect(ssuSource(id), event.id + ': ' + id).toBeDefined()
    }
    for (const chapter of ssuChapters) {
      expect(chapter.paragraphs.length, chapter.id).toBeGreaterThanOrEqual(2)
      for (const id of chapter.sourceIds) expect(ssuSource(id), chapter.id + ': ' + id).toBeDefined()
    }
  })

  it('has documented SSU away-trip photos with attribution and CC licensing', () => {
    expect(ssuPhotos).toHaveLength(4)
    for (const photo of ssuPhotos) {
      expect(photo.src).toMatch(/^https:\/\/thumb\.wikimedia\.org\//)
      expect(photo.credit).toContain('Repstad')
      expect(photo.originalUrl).toContain('commons.wikimedia.org/wiki/File:')
      expect(photo.licenseUrl).toContain('creativecommons.org/licenses/by-sa/4.0')
      expect(photo.alt.length).toBeGreaterThan(20)
    }
  })

  it('highlights 17 independently sourced episodes in five purposeful themes', () => {
    expect(ssuHighlights).toHaveLength(17)
    expect(highlightCategories).toHaveLength(5)
    expect(new Set(ssuHighlights.map((item)=>item.id)).size).toBe(ssuHighlights.length)
    for(const item of ssuHighlights) {
      expect(item.teaser.length, item.id).toBeGreaterThan(30)
      expect(item.paragraphs.length, item.id).toBeGreaterThanOrEqual(2)
      expect(item.sourceIds.length, item.id).toBeGreaterThan(0)
      for(const id of item.sourceIds) expect(ssuSource(id), item.id+' → '+id).toBeDefined()
      if(item.photoId) expect(ssuPhotos.find((photo)=>photo.id===item.photoId)).toBeDefined()
    }
    const filtered = filteredSSUHighlights('travel')
    expect(filtered.length).toBeGreaterThan(2)
    expect(filtered.every((item)=>item.category==='travel')).toBe(true)
    expect(filteredSSUHighlights('all')).toHaveLength(ssuHighlights.length)
  })

  it('does not misattribute older supporter culture or club victories to SSU', () => {
    expect(ssuHighlight('1982-first-supporters')?.beforeSSU).toBe(true)
    expect(ssuHighlight('1991-kollebladet')?.beforeSSU).toBe(true)
    expect(ssuHighlight('2001-founding')?.date).toBe('2001-10-25')
    expect(ssuHighlight('2023-six-buses')?.keyFact).toContain('6 busser')
    expect(ssuHighlight('2024-final-tickets')?.sourceIds).toContain('vif-final-2024')
    expect(ssuHighlight('2025-fanzine-booknight')?.sourceIds).toContain('history-night-2025')
  })

  it('preserves first-party SSU membership and travel sources without inventing social media posts', () => {
    expect(ssuSource('member-signup-2026')?.url).toContain('pameldinger.no')
    expect(ssuSource('official-trips-2026')?.url).toContain('ssu.pameldinger.no')
    expect(ssuSource('stolte-bonder-2023')?.url).toContain('sil.no')
    expect(ssuTimeline.find((event)=>event.id==='2026-ringerike')?.date).toBe('2026-10-20')
    expect(ssuTimeline.find((event)=>event.id==='2026-hockey-classic')?.date).toBe('2026-10-24')
    expect(ssuHighlight('2023-stolte-bonder')?.paragraphs.join(' ')).toMatch(/ikke en påstand om at SSU/)
    expect(ssuHighlight('2026-october-trips')?.sourceIds).toContain('official-trips-2026')
    expect(ssuSources.some((source)=>/instagram.com|facebook.com/.test(source.url))).toBe(false)
  })

  it('keeps difficult history separate from celebratory featured highlights', () => {
    expect(ssuTimeline.find((event)=>event.id==='2002-apology')?.sourceIds).toContain('utrop-2002')
    expect(ssuHighlights.some((item)=>item.title.includes('hets'))).toBe(false)
    expect(ssuTimeline.find((event)=>event.id==='2017-marathon')?.date).toBe('2017-03-12')
  })
})

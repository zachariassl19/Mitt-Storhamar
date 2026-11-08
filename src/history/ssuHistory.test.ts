import { describe, expect, it } from 'vitest'
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
    expect(union.length).toBeGreaterThanOrEqual(6)
    expect(ssuChapters.length).toBeGreaterThanOrEqual(6)
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
    expect(ssuPhotos).toHaveLength(2)
    for (const photo of ssuPhotos) {
      expect(photo.src).toMatch(/^https:\/\/thumb\.wikimedia\.org\//)
      expect(photo.credit).toContain('Repstad')
      expect(photo.originalUrl).toContain('commons.wikimedia.org/wiki/File:')
      expect(photo.licenseUrl).toContain('creativecommons.org/licenses/by-sa/4.0')
      expect(photo.alt.length).toBeGreaterThan(20)
    }
  })
})

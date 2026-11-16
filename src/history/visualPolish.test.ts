import { describe, expect, it } from 'vitest'
import {
  audienceAverageLabel,
  historyBackLabel,
  jerseyUsageLabels,
  visibleShirtNumber,
} from './visualPolish'

describe('visuell betatest: draktnummer', () => {
  const all = [{number:'08'}, {number:'41'}]
  it('does not display the old 08 details when only 41 matches', () => {
    expect(visibleShirtNumber('08', [{number:'41'}])).toBe('41')
    expect(visibleShirtNumber('08', all)).toBe('08')
  })
  it('never shows stale details when search finds nothing', () => {
    expect(visibleShirtNumber('08', [])).toBe(null)
  })
})

describe('visuell betatest: tilbake til riktig side', () => {
  const previous = (section:string) => ({section,selection:null,chapterId:null})
  it('goes back to the trainer and player story listings', () => {
    expect(historyBackLabel(previous('coach'))).toBe('Tilbake til trenere')
    expect(historyBackLabel(previous('stories'))).toBe('Tilbake til spillerhistoriene')
    expect(historyBackLabel(previous('numbers'))).toBe('Tilbake til draktnumrene')
  })
  it('can return to a chapter or linked detail view', () => {
    expect(historyBackLabel({section:'overview',selection:null,chapterId:'some-chapter'})).toBe('Tilbake til epoken')
    expect(historyBackLabel({section:'coach',selection:{kind:'player',id:'1'},chapterId:null})).toBe('Tilbake til forrige oppføring')
  })
})

describe('visuell betatest: språkvask og dataformat', () => {
  it('removes only the stray trailing hyphen without rewriting source data', () => {
    const original='3669-'
    expect(audienceAverageLabel(original)).toBe('3669')
    expect(original).toBe('3669-')
    expect(audienceAverageLabel('3157')).toBe('3157')
    expect(audienceAverageLabel(null)).toBe(null)
  })
  it('shows Norwegian jersey usage instead of raw English enum values', () => {
    expect(jerseyUsageLabels.preseason).toBe('Oppkjøring')
    expect(jerseyUsageLabels.third).toBe('Tredjedrakt')
    expect(jerseyUsageLabels.home).toBe('Hjemmedrakt')
  })
})

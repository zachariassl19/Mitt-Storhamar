import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addCompanion,
  hideCompanion,
  loadAllCompanions,
  loadCompanions,
  renameCompanion,
  restoreCompanion,
  summarizeCompanions,
} from './companions'
import { mergeCloudStorage } from './cloudSyncMerge'
import type { Game, GameDayRecord } from '../types'

const KEY = 'mitt-storhamar:companions:v1'

class TestStorage {
  private readonly data = new Map<string, string>()
  getItem(key: string): string | null { return this.data.get(key) ?? null }
  setItem(key: string, value: string) { this.data.set(key, value) }
  removeItem(key: string) { this.data.delete(key) }
  clear() { this.data.clear() }
}

beforeEach(() => vi.stubGlobal('localStorage', new TestStorage()))
afterEach(() => vi.unstubAllGlobals())

describe('reisefølge: redigere og fjerne navn', () => {
  it('lets the user correct any custom name without changing the personal ID', () => {
    const [added] = addCompanion('Stainleo').filter(person => person.custom)
    expect(added.name).toBe('Stainleo')
    expect(renameCompanion(added.id, 'Leo').success).toBe(true)
    const [corrected] = loadCompanions().filter(person => person.id === added.id)
    expect(corrected.name).toBe('Leo')
    expect(loadCompanions().some(person => person.name === 'Stainleo')).toBe(false)
  })

  it('allows the original default names to be renamed and removed', () => {
    expect(renameCompanion('mamma', 'Mor').success).toBe(true)
    expect(loadCompanions().find(person => person.id === 'mamma')?.name).toBe('Mor')
    expect(hideCompanion('pappa').success).toBe(true)
    expect(loadCompanions().some(person => person.id === 'pappa')).toBe(false)
    expect(loadAllCompanions().find(person => person.id === 'pappa')?.hidden).toBe(true)
    expect(restoreCompanion('pappa').success).toBe(true)
    expect(loadCompanions().some(person => person.id === 'pappa')).toBe(true)
  })

  it('rejects conflicting names and blank edits instead of silently merging people', () => {
    const added = addCompanion('Sara').find(person => person.name === 'Sara')!
    expect(renameCompanion(added.id, 'Mamma').success).toBe(false)
    expect(renameCompanion(added.id, '   ').success).toBe(false)
    expect(loadCompanions().find(person => person.id === added.id)?.name).toBe('Sara')
  })

  it('restores hidden names when added again, rather than duplicating their IDs', () => {
    const id = addCompanion('Leon').find(person => person.name === 'Leon')!.id
    hideCompanion(id)
    expect(loadCompanions().some(person => person.id === id)).toBe(false)
    addCompanion('Leon')
    expect(loadCompanions().filter(person => person.name === 'Leon').map(person => person.id)).toEqual([id])
  })

  it('keeps old match stats tied to the person after a rename and archive', () => {
    const personId = addCompanion('Leoo').find(person => person.name === 'Leoo')!.id
    renameCompanion(personId, 'Leo')
    hideCompanion(personId)
    const game: Game = {
      id: 'old', startsAt: '2026-10-31T16:00:00+01:00', season: '2026/27',
      competition: 'EHL', homeTeam: 'Stjernen', awayTeam: 'Storhamar', arena: 'Stjernehallen',
    }
    const record: GameDayRecord = {
      gameId: game.id, attendanceActual: 'attended', entryType: 'unknown',
      ticketCost: null, completed: true, updatedAt: '2026-11-01T10:00:00Z',
    }
    const result = summarizeCompanions(loadAllCompanions(), {
      old: { gameId: 'old', status: 'known', companionIds: [personId], updatedAt: '2026-11-01T10:00:00Z' },
    }, { old: record }, [game])
    expect(result.topCompanion?.name).toBe('Leo')
    expect(result.topCompanion?.games).toBe(1)
    expect(result.soloGames).toBe(0)
  })

  it('private cloud merge keeps a later removal over an older device copy', () => {
    const person = addCompanion('Sara').find(person => person.name === 'Sara')!
    const remoteOld = localStorage.getItem(KEY)!
    hideCompanion(person.id)
    const localNew = localStorage.getItem(KEY)!
    const merged = mergeCloudStorage({ [KEY]: remoteOld }, { [KEY]: localNew })
    const rows = JSON.parse(merged[KEY]) as Array<{ id: string, hidden?: boolean }>
    expect(rows.find(entry => entry.id === person.id)?.hidden).toBe(true)
  })
})

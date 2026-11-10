import { describe, expect, it } from 'vitest'
import { mergeCloudStorage } from './cloudSyncMerge'

describe('cloud storage merge', () => {
  it('restores cloud attendance on conflicts while keeping local-only games', () => {
    const key = 'mitt-storhamar:attendance-plan:v1'
    const merged = mergeCloudStorage(
      { [key]: JSON.stringify({ a: 'yes', b: 'no' }) },
      { [key]: JSON.stringify({ a: 'no', c: 'maybe' }) },
    )

    expect(JSON.parse(merged[key])).toEqual({ a: 'yes', b: 'no', c: 'maybe' })
  })

  it('keeps the newest trip by updatedAt', () => {
    const key = 'mitt-storhamar:trips:v1'
    const merged = mergeCloudStorage(
      {
        [key]: JSON.stringify([
          { id: 'trip:1', gameId: 'g1', updatedAt: '2026-10-07T20:00:00.000Z', legs: [] },
        ]),
      },
      {
        [key]: JSON.stringify([
          { id: 'trip:1', gameId: 'g1', updatedAt: '2026-10-07T21:00:00.000Z', legs: [{ km: 312 }] },
        ]),
      },
    )

    expect(JSON.parse(merged[key])[0].legs).toEqual([{ km: 312 }])
  })

  it('keeps local-only storage keys', () => {
    const merged = mergeCloudStorage(
      { 'mitt-storhamar:remote:v1': JSON.stringify({ enabled: true }) },
      { 'mitt-storhamar:local:v1': JSON.stringify({ value: 1 }) },
    )

    expect(merged['mitt-storhamar:remote:v1']).toBeDefined()
    expect(merged['mitt-storhamar:local:v1']).toBeDefined()
  })
})

describe('deleted entities stay deleted across device merges', () => {
  const deletedKey = 'mitt-storhamar:deleted-entities:v1'
  const tripKey = 'mitt-storhamar:trips:v1'
  const purchaseKey = 'mitt-storhamar:purchases:v1'

  it('does not restore a deleted trip from an older remote copy', () => {
    const merged = mergeCloudStorage({
      [tripKey]:JSON.stringify([{id:'trip:1',gameId:'g1',updatedAt:'2026-11-01T10:00:00Z'}]),
    },{
      [tripKey]:'[]',
      [deletedKey]:JSON.stringify({'trip:trip:1':'2026-11-02T10:00:00Z'}),
    })
    expect(JSON.parse(merged[tripKey])).toEqual([])
  })

  it('retains delete markers from both devices and removes old purchases', () => {
    const merged = mergeCloudStorage({
      [purchaseKey]:JSON.stringify([{id:'purchase:1',updatedAt:'2026-11-01T10:00:00Z'}]),
      [deletedKey]:JSON.stringify({'purchase:purchase:1':'2026-11-02T12:00:00Z'}),
    },{
      [purchaseKey]:'[]',
      [deletedKey]:JSON.stringify({'trip:trip:2':'2026-11-02T15:00:00Z'}),
    })
    expect(JSON.parse(merged[purchaseKey])).toEqual([])
    expect(Object.keys(JSON.parse(merged[deletedKey]))).toHaveLength(2)
  })

  it('accepts a deliberate later restoration of an old id', () => {
    const merged = mergeCloudStorage({
      [tripKey]:JSON.stringify([{id:'trip:1',updatedAt:'2026-11-03T10:00:00Z'}]),
      [deletedKey]:JSON.stringify({'trip:trip:1':'2026-11-02T10:00:00Z'}),
    },{[tripKey]:'[]'})
    expect(JSON.parse(merged[tripKey])).toHaveLength(1)
  })
})

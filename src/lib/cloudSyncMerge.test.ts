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

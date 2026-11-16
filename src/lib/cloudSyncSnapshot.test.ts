import { describe, expect, it } from 'vitest'
import { reconcileAfterRemoteFetch } from './cloudSyncSnapshot'

const TRIPS = 'mitt-storhamar:trips:v1'
const ATTENDANCE = 'mitt-storhamar:attendance-plan:v1'

describe('private cloud sync slow-network safety', () => {
  it('does not discard a trip saved locally while fetching cloud state', async () => {
    let receiveCloud!: (value: { storage: Record<string,string> }) => void
    let localState: Record<string,string> = { [TRIPS]: '[]' }
    const pending = reconcileAfterRemoteFetch(
      () => new Promise<{ storage: Record<string,string> }>(resolve => { receiveCloud = resolve }),
      remote => remote.storage,
      () => ({ ...localState }),
    )

    // A new trip is saved after the request starts but before it returns.
    localState = { [TRIPS]: JSON.stringify([{id:'trip:a',gameId:'a',updatedAt:'2026-11-16T13:00:01Z'}]) }
    receiveCloud({ storage: { [TRIPS]: '[]' } })
    const { local, merged } = await pending

    expect(JSON.parse(local[TRIPS])).toHaveLength(1)
    expect(JSON.parse(merged[TRIPS]).map((trip: { id: string }) => trip.id)).toEqual(['trip:a'])
  })

  it('keeps a late offline attendance change even if the response has older data', async () => {
    let receiveCloud!: (value: { storage: Record<string,string> }) => void
    let local: Record<string,string> = {}
    const pending = reconcileAfterRemoteFetch(
      () => new Promise<{ storage: Record<string,string> }>(resolve => { receiveCloud = resolve }),
      remote => remote.storage,
      () => ({ ...local }),
    )
    local = { [ATTENDANCE]: JSON.stringify({ game1:'yes' }) }
    receiveCloud({ storage: { [ATTENDANCE]: JSON.stringify({game2:'maybe'}) } })
    const { merged } = await pending
    expect(JSON.parse(merged[ATTENDANCE])).toEqual({game1:'yes',game2:'maybe'})
  })

  it('restores remote data on a fresh device with no local app storage', async () => {
    const cloud = { [TRIPS]: JSON.stringify([{ id:'trip:remote', updatedAt:'2026-11-10T10:00:00Z' }]) }
    const result = await reconcileAfterRemoteFetch(
      async () => ({ storage: cloud }),
      remote => remote.storage,
      () => ({}),
    )
    expect(result.merged).toEqual(cloud)
  })

  it('keeps a late local edit if the account has no cloud snapshot yet', async () => {
    let receiveCloud!: (value: null) => void
    let local: Record<string,string> = {}
    const pending = reconcileAfterRemoteFetch(
      () => new Promise<null>(resolve => { receiveCloud = resolve }),
      () => null,
      () => ({ ...local }),
    )
    local = { [TRIPS]: JSON.stringify([{id:'trip:offline'}]) }
    receiveCloud(null)
    const result = await pending
    expect(JSON.parse(result.merged[TRIPS])[0].id).toBe('trip:offline')
  })
})

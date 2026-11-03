import { afterEach, describe, expect, it, vi } from 'vitest'
import { calculateTrainRailDistance, isNamedTrainStation } from './enturRail'

afterEach(() => vi.unstubAllGlobals())

function station(id: string, name: string) {
  return { properties: {
    id,
    names: { default: name },
    stopPlaceTypes: ['railStation'],
    transportModes: [{ mode: 'rail' }],
  } }
}

describe('Entur rail distance', () => {
  it('requires explicit stations rather than assuming a home address is a station', async () => {
    expect(isNamedTrainStation('Hjem')).toBe(false)
    await expect(calculateTrainRailDistance('Stange', 'Hjem')).rejects.toThrow('togstasjon')
  })

  it('resolves the stations and uses Entur km rather than road distance', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:111', 'Stange stasjon')] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:222', 'Halden')] }) })
      .mockResolvedValueOnce({ ok: true, text: async () => '247' })
    vi.stubGlobal('fetch', fetchMock)
    expect(await calculateTrainRailDistance('Stange', 'Halden stasjon')).toEqual({ km: 247, source: 'Entur' })
    expect(fetchMock).toHaveBeenCalledTimes(3)
    expect(fetchMock.mock.calls[2][0]).toContain('stop-place-distances')
  })

  it('leaves manual entry available when Entur reports an unknown route', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:111', 'Stange')] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:222', 'Halden')] }) })
      .mockResolvedValueOnce({ ok: true, text: async () => '-1' })
    vi.stubGlobal('fetch', fetchMock)
    await expect(calculateTrainRailDistance('Stange', 'Halden')).rejects.toThrow('ingen registrert togavstand')
  })
})

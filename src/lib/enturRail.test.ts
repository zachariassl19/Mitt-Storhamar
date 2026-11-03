import { afterEach, describe, expect, it, vi } from 'vitest'
import { calculateTrainRailDistance, isNamedTrainStation } from './enturRail'

afterEach(() => vi.unstubAllGlobals())

function station(id: string, name: string, role = 'standalone') {
  return { properties: {
    id,
    names: { default: name },
    stopPlaceTypes: ['railStation'],
    transportModes: [{ mode: 'rail' }],
    stopPlaceRole: role,
  } }
}

describe('Entur train distance API', () => {
  it('rejects Hjem as a railway station', async () => {
    expect(isNamedTrainStation('Hjem')).toBe(false)
    await expect(calculateTrainRailDistance('Stange', 'Hjem')).rejects.toThrow('togstasjon')
  })

  it('uses Halden rail child and parses Enturs verified 236 km response', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:708', 'Stange stasjon')] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [
        station('NSR:StopPlace:60053', 'Halden stasjon', 'parent'),
        station('NSR:StopPlace:192', 'Halden stasjon', 'child'),
      ] }) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({
        organisationId: 1,
        fromStopPlaceId: 'NSR:StopPlace:708',
        toStopPlaceId: 'NSR:StopPlace:192',
        distance: 236,
      }) })
    vi.stubGlobal('fetch', fetchMock)
    const result = await calculateTrainRailDistance('Stange', 'Halden stasjon')
    expect(result).toEqual({ km: 236, source: 'Entur' })
    const lookupUrl = fetchMock.mock.calls[0][0] as string
    expect(lookupUrl).toContain('multimodal=child')
    expect(lookupUrl).toContain('stopPlaceTypes=railStation')
    const distanceUrl = fetchMock.mock.calls[2][0] as string
    expect(distanceUrl).toContain('NSR:StopPlace:708/NSR:StopPlace:192')
    expect(distanceUrl).toContain('organisationId=1')
  })

  it('allows manual fallback when Entur returns a missing distance', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:708', 'Stange stasjon')] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:192', 'Halden stasjon', 'child')] }) })
      .mockResolvedValueOnce({ ok: false, status: 404 })
    vi.stubGlobal('fetch', fetchMock)
    await expect(calculateTrainRailDistance('Stange', 'Halden')).rejects.toThrow('ikke registrert togavstand')
  })

  it('handles stations without known rail connections', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:708', 'Stange stasjon')] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ features: [station('NSR:StopPlace:192', 'Halden stasjon', 'child')] }) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ distance: -1 }) })
    vi.stubGlobal('fetch', fetchMock)
    await expect(calculateTrainRailDistance('Stange', 'Halden')).rejects.toThrow('ingen registrert togavstand')
  })
})

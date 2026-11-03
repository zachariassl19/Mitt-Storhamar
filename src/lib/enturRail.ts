/**
 * Entur's station-to-station rail distance is measured along the rail network,
 * not as a straight line or a road route. Time remains manual for past trips.
 *
 * Source: https://developer.entur.no/apis/prdudisapi
 * Geocoder: https://developer.entur.no/docs/open-services/geocoder/migration-v2-v3
 */
const ENTUR_CLIENT_NAME = 'mittstorhamar-supporterapp'

interface EnturFeature {
  properties?: {
    id?: string
    names?: { default?: string; display?: string }
    transportModes?: { mode: string }[]
    stopPlaceTypes?: string[]
  }
}

function normalizedStationName(name: string) {
  return name.toLocaleLowerCase('nb-NO')
    .replace(/\s+(stasjon|st\.)$/i, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function isNamedTrainStation(name: string) {
  const value = name.trim().toLocaleLowerCase('nb-NO')
  return Boolean(value && value !== 'hjem' && value !== 'nytt stopp')
}

async function resolveRailStation(input: string): Promise<string> {
  const name = input.trim()
  if (!isNamedTrainStation(name)) {
    throw new Error('Velg togstasjon i begge ender av togstrekningen. «Hjem» er ikke en togstasjon.')
  }

  const url = new URL('https://api.entur.io/geocoder/v3/autocomplete')
  url.search = new URLSearchParams({
    q: name,
    lang: 'no',
    layers: 'stopPlace',
    limit: '10',
  }).toString()

  const response = await fetch(url.toString(), {
    headers: { 'ET-Client-Name': ENTUR_CLIENT_NAME },
  })
  if (!response.ok) throw new Error('Entur fant ikke stasjonene akkurat nå. Prøv igjen senere.')
  const data = await response.json() as { features?: EnturFeature[] }
  const matches = (data.features ?? []).filter((feature) => {
    const props = feature.properties
    const rail = props?.stopPlaceTypes?.includes('railStation') || props?.transportModes?.some((mode) => mode.mode === 'rail')
    const id = props?.id
    const title = props?.names?.default
    return rail && typeof id === 'string' && id.startsWith('NSR:StopPlace:') &&
      typeof title === 'string' && normalizedStationName(title) === normalizedStationName(name)
  })

  if (!matches.length) {
    throw new Error(`Fant ikke togstasjonen «${name}». Skriv stasjonsnavnet, for eksempel «Stange stasjon».`)
  }

  return matches[0].properties!.id!
}

export interface EnturRailDistance {
  km: number
  source: 'Entur'
}

/**
 * Entur returns a shortest known rail-network station distance in kilometres.
 * This is not a precise reconstruction of a detour or a historic train service.
 */
export async function calculateTrainRailDistance(fromStation: string, toStation: string): Promise<EnturRailDistance> {
  const [fromId, toId] = await Promise.all([
    resolveRailStation(fromStation),
    resolveRailStation(toStation),
  ])
  if (fromId === toId) return { km: 0, source: 'Entur' }

  const url = `https://api.entur.io/distance/stop-place-distances/${encodeURIComponent(fromId)}/${encodeURIComponent(toId)}`
  const response = await fetch(url, {
    headers: {
      'ET-Client-Name': ENTUR_CLIENT_NAME,
      Accept: 'application/json',
    },
  })
  if (!response.ok) throw new Error('Entur kunne ikke finne jernbaneavstand mellom stasjonene.')
  const raw = await response.text()
  let value: unknown
  try { value = JSON.parse(raw) } catch { value = raw }
  const distance = typeof value === 'number' || typeof value === 'string' ? Number(value) : NaN

  if (!Number.isFinite(distance) || distance < 0) {
    throw new Error('Entur har ingen registrert togavstand for denne strekningen. Fyll inn km manuelt.')
  }
  return { km: distance, source: 'Entur' }
}

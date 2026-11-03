/**
 * Entur railway station lookup and rail-network distance.
 *
 * Live API verified on 2026-11-03:
 *  - Geocoder needs multimodal=child to get Halden's actual rail stop (192),
 *    rather than its multimodal parent (60053).
 *  - Distance API requires organisationId=1 and responds with { distance: 236 }.
 *
 * Source: https://developer.entur.no/apis/prdudisapi
 */
const ENTUR_CLIENT_NAME = 'mittstorhamar-supporterapp'
const DISTANCE_ORGANISATION_ID = '1'

interface EnturFeature {
  properties?: {
    id?: string
    names?: { default?: string; display?: string }
    transportModes?: { mode: string }[]
    stopPlaceTypes?: string[]
    stopPlaceRole?: string
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
    stopPlaceTypes: 'railStation',
    multimodal: 'child',
    limit: '10',
  }).toString()

  let response: Response
  try {
    response = await fetch(url.toString(), {
      headers: { 'ET-Client-Name': ENTUR_CLIENT_NAME },
    })
  } catch {
    throw new Error('Kunne ikke kontakte Entur for stasjonssøk. Sjekk nettforbindelsen og prøv igjen.')
  }
  if (!response.ok) throw new Error(`Enturs stasjonssøk svarte med feil (${response.status}). Prøv igjen senere.`)

  const data = await response.json() as { features?: EnturFeature[] }
  const matches = (data.features ?? []).filter((feature) => {
    const props = feature.properties
    const isRail = props?.stopPlaceTypes?.includes('railStation') ||
      props?.transportModes?.some((mode) => mode.mode === 'rail')
    return isRail &&
      props?.stopPlaceRole !== 'parent' &&
      typeof props?.id === 'string' &&
      /^NSR:StopPlace:\d+$/.test(props.id) &&
      typeof props.names?.default === 'string' &&
      normalizedStationName(props.names.default) === normalizedStationName(name)
  })

  if (!matches.length) {
    throw new Error(`Fant ikke togstasjonen «${name}». Skriv navnet på stasjonen, for eksempel «Stange stasjon» eller «Halden stasjon».`)
  }

  return matches[0].properties!.id!
}

export interface EnturRailDistance {
  km: number
  source: 'Entur'
}

/**
 * Uses the shortest available railway distance in kilometres.
 * It is not a reconstruction of a historic detour or replacement bus.
 */
export async function calculateTrainRailDistance(fromStation: string, toStation: string): Promise<EnturRailDistance> {
  const [fromId, toId] = await Promise.all([
    resolveRailStation(fromStation),
    resolveRailStation(toStation),
  ])
  if (fromId === toId) return { km: 0, source: 'Entur' }

  const url = new URL(`https://api.entur.io/distance/stop-place-distances/${fromId}/${toId}`)
  url.searchParams.set('organisationId', DISTANCE_ORGANISATION_ID)

  let response: Response
  try {
    response = await fetch(url.toString(), {
      headers: {
        'ET-Client-Name': ENTUR_CLIENT_NAME,
        Accept: 'application/json',
      },
    })
  } catch {
    throw new Error('Kunne ikke kontakte Entur for togavstand. Sjekk nettforbindelsen og prøv igjen.')
  }

  if (response.status === 404) {
    throw new Error('Entur har ikke registrert togavstand mellom disse stasjonene. Du kan fylle inn kilometer manuelt.')
  }
  if (!response.ok) {
    throw new Error(`Enturs avstandstjeneste svarte med feil (${response.status}). Du kan fylle inn kilometer manuelt.`)
  }

  let value: unknown
  try {
    value = await response.json()
  } catch {
    throw new Error('Entur svarte i et ukjent format. Fyll inn kilometer manuelt.')
  }

  // The 2026 API responds with {"organisationId":1, "distance":236, ...}.
  const distanceValue = value && typeof value === 'object' && 'distance' in value
    ? (value as { distance: unknown }).distance
    : value
  const distance = typeof distanceValue === 'number' || typeof distanceValue === 'string'
    ? Number(distanceValue)
    : NaN

  if (!Number.isFinite(distance) || distance < 0) {
    throw new Error('Entur har ingen registrert togavstand for denne strekningen. Fyll inn km manuelt.')
  }

  return { km: distance, source: 'Entur' }
}

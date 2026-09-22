import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import type { TransportMode } from '../types'

export interface GoogleRouteResult {
  km: number
  durationMinutes: number
}

let loaderConfigured = false

function mapsApiKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() ?? ''
}

export function hasGoogleRoutesKey() {
  return Boolean(mapsApiKey())
}

function configureGoogleMapsLoader() {
  if (loaderConfigured) return

  const key = mapsApiKey()
  if (!key) throw new Error('Google Maps API-nøkkel mangler i builden.')

  // Google's supported Dynamic Library Import loader. The Routes library is
  // requested only when the user actually asks the app to calculate a route.
  setOptions({ key })
  loaderConfigured = true
}

async function loadRoutesLibrary() {
  configureGoogleMapsLoader()

  try {
    const library = await importLibrary('routes') as { Route?: any }
    if (!library?.Route) {
      throw new Error('Routes-klassen mangler i Google Maps-responsen.')
    }
    return library as { Route: any }
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    throw new Error(`Google Maps Routes kunne ikke lastes. ${detail}`)
  }
}

export function canAutoRoute(mode: TransportMode) {
  return mode === 'car' || mode === 'supporter_bus' || mode === 'taxi' || mode === 'walk' || mode === 'bike'
}

function googleTravelMode(mode: TransportMode) {
  if (mode === 'walk') return 'WALKING'
  if (mode === 'bike') return 'BICYCLING'
  return 'DRIVING'
}

export async function calculateGoogleRoute(origin: string, destination: string, mode: TransportMode): Promise<GoogleRouteResult> {
  if (!canAutoRoute(mode)) throw new Error('Denne reisemåten støttes ikke av automatisk ruteberegning ennå.')
  if (!origin.trim() || !destination.trim()) throw new Error('Både start og mål må være fylt ut.')

  const { Route } = await loadRoutesLibrary()
  const travelMode = googleTravelMode(mode)
  const request: Record<string, unknown> = {
    origin,
    destination,
    travelMode,
    region: 'NO',
    language: 'nb-NO',
    fields: ['distanceMeters', 'durationMillis'],
  }

  if (travelMode === 'DRIVING') request.routingPreference = 'TRAFFIC_AWARE'

  try {
    const { routes } = await Route.computeRoutes(request)
    const route = routes?.[0]
    const distanceMeters = route?.distanceMeters
    const durationMillis = route?.durationMillis

    if (typeof distanceMeters !== 'number' || typeof durationMillis !== 'number') {
      throw new Error('Google fant ingen brukbar rute mellom disse stedene.')
    }

    return {
      km: Math.round((distanceMeters / 1000) * 10) / 10,
      durationMinutes: Math.max(1, Math.round(durationMillis / 60_000)),
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Google fant ingen brukbar rute mellom disse stedene.') throw error
    const detail = error instanceof Error ? error.message : String(error)
    throw new Error(`Google klarte ikke å beregne ruten. ${detail}`)
  }
}

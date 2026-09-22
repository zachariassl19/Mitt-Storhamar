import type { TransportMode } from '../types'

export interface GoogleRouteResult {
  km: number
  durationMinutes: number
}

declare global {
  interface Window {
    google?: any
    __mittStorhamarGoogleMapsLoad?: Promise<void>
  }
}

function mapsApiKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() ?? ''
}

export function hasGoogleRoutesKey() {
  return Boolean(mapsApiKey())
}

function loadGoogleMaps() {
  if (window.google?.maps?.importLibrary) return Promise.resolve()
  if (window.__mittStorhamarGoogleMapsLoad) return window.__mittStorhamarGoogleMapsLoad

  const key = mapsApiKey()
  if (!key) return Promise.reject(new Error('Google Maps API-nøkkel mangler i builden.'))

  window.__mittStorhamarGoogleMapsLoad = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-mitt-storhamar-google-maps="true"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Google Maps kunne ikke lastes.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.dataset.mittStorhamarGoogleMaps = 'true'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&loading=async`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Maps kunne ikke lastes.'))
    document.head.appendChild(script)
  })

  return window.__mittStorhamarGoogleMapsLoad
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

  await loadGoogleMaps()

  const maps = window.google?.maps
  if (!maps?.importLibrary) throw new Error('Google Maps Routes-biblioteket er ikke tilgjengelig.')

  const { Route } = await maps.importLibrary('routes') as { Route: any }
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
}

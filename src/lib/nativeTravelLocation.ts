import { Capacitor, registerPlugin } from '@capacitor/core'
import type { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation'

export interface TravelFix {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

type TravelWatchError = (message: string) => void
type TravelFixCallback = (fix: TravelFix) => void

const BackgroundGeo = registerPlugin<BackgroundGeolocationPlugin>('BackgroundGeolocation')

export function supportsNativeBackgroundTracking() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android'
}

/**
 * Native: uses a foreground-service-backed watcher and visible Android status notification.
 * Web: geolocation is guaranteed only while the page stays visible.
 */
export async function startTravelLocation(
  onFix: TravelFixCallback,
  onError: TravelWatchError,
  distanceFilter = 150,
): Promise<() => Promise<void>> {
  if (supportsNativeBackgroundTracking()) {
    const id = await BackgroundGeo.addWatcher({
      backgroundTitle: 'Mitt Storhamar – reisemodus',
      backgroundMessage: 'Posisjon brukes kun mens reisen er aktiv. Åpne appen for å stoppe.',
      requestPermissions: true,
      stale: false,
      distanceFilter,
    }, (location, error) => {
      if (error) {
        onError(error.code === 'NOT_AUTHORIZED'
          ? 'Posisjon er ikke tillatt. Åpne Android-innstillinger for å gi appen posisjonstilgang.'
          : 'GPS er midlertidig utilgjengelig. Sjekk posisjonsinnstillingene.')
        return
      }
      if (!location || !Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) return
      onFix({
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: Number.isFinite(location.accuracy) ? location.accuracy : 999,
        timestamp: typeof location.time === 'number' ? location.time : Date.now(),
      })
    })
    return async () => { await BackgroundGeo.removeWatcher({ id }) }
  }

  if (!('geolocation' in navigator)) throw new Error('Posisjon støttes ikke i nettleseren.')
  let watchId: number
  try {
    watchId = navigator.geolocation.watchPosition((position) => {
      onFix({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      })
    }, (error) => {
      onError(error.code === error.PERMISSION_DENIED
        ? 'Posisjon ble avslått i nettleseren.'
        : 'GPS kan ikke oppdateres akkurat nå.')
    }, { enableHighAccuracy: false, maximumAge: 15_000, timeout: 30_000 })
  } catch {
    throw new Error('Kunne ikke starte GPS i nettleseren.')
  }
  return async () => navigator.geolocation.clearWatch(watchId)
}

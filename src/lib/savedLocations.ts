export interface SavedLocations {
  homeAddress: string
}

const SAVED_LOCATIONS_KEY = 'mitt-storhamar:saved-locations:v1'

const DEFAULT_LOCATIONS: SavedLocations = {
  homeAddress: '',
}

export function loadSavedLocations(): SavedLocations {
  try {
    const raw = localStorage.getItem(SAVED_LOCATIONS_KEY)
    if (!raw) return DEFAULT_LOCATIONS
    return { ...DEFAULT_LOCATIONS, ...(JSON.parse(raw) as Partial<SavedLocations>) }
  } catch {
    return DEFAULT_LOCATIONS
  }
}

export function saveSavedLocations(locations: SavedLocations) {
  localStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(locations))
}

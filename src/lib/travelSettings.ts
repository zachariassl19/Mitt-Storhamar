export type CarEnergy = 'electric' | 'gasoline' | 'diesel'

export interface CarSettings {
  energy: CarEnergy
  consumptionPer100: number | null
  energyUnitPrice: number | null
}

const CAR_SETTINGS_KEY = 'mitt-storhamar:car-settings:v1'

const DEFAULT_SETTINGS: CarSettings = {
  energy: 'gasoline',
  consumptionPer100: null,
  energyUnitPrice: null,
}

export function loadCarSettings(): CarSettings {
  try {
    const raw = localStorage.getItem(CAR_SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<CarSettings>) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveCarSettings(settings: CarSettings) {
  localStorage.setItem(CAR_SETTINGS_KEY, JSON.stringify(settings))
}

export function calculateCarCost(km: number | null | undefined, settings: CarSettings) {
  if (km == null || settings.consumptionPer100 == null || settings.energyUnitPrice == null) return null
  return (km / 100) * settings.consumptionPer100 * settings.energyUnitPrice
}

export type CarEnergy = 'electric' | 'gasoline' | 'diesel'

export interface CarSettings {
  energy: CarEnergy
  consumptionPer100: number | null
  energyUnitPrice: number | null
}

export interface EnergyPriceReference {
  price: number
  unit: 'kr/l' | 'kr/kWh'
  period: string
  source: string
  description: string
}

const CAR_SETTINGS_KEY = 'mitt-storhamar:car-settings:v1'

export const NORWAY_AVERAGE_ENERGY_PRICES: Record<CarEnergy, EnergyPriceReference> = {
  gasoline: {
    price: 19.42,
    unit: 'kr/l',
    period: 'august 2026',
    source: 'SSB tabell 09654',
    description: 'Norsk gjennomsnittlig utsalgspris for blyfri 95 oktan, inkl. skatter og avgifter.',
  },
  diesel: {
    price: 21.48,
    unit: 'kr/l',
    period: 'august 2026',
    source: 'SSB tabell 09654',
    description: 'Norsk gjennomsnittlig utsalgspris for avgiftspliktig diesel, inkl. skatter og avgifter.',
  },
  electric: {
    price: 1.179,
    unit: 'kr/kWh',
    period: '2. kvartal 2026',
    source: 'SSB tabell 09387',
    description: 'Norsk husholdningssnitt for kraft, nettleie og avgifter etter offentlig strømstøtte.',
  },
}

export function averageEnergyPrice(energy: CarEnergy) {
  return NORWAY_AVERAGE_ENERGY_PRICES[energy]
}

const DEFAULT_SETTINGS: CarSettings = {
  energy: 'gasoline',
  consumptionPer100: null,
  energyUnitPrice: NORWAY_AVERAGE_ENERGY_PRICES.gasoline.price,
}

export function loadCarSettings(): CarSettings {
  try {
    const raw = localStorage.getItem(CAR_SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS

    const stored = JSON.parse(raw) as Partial<CarSettings>
    const energy = stored.energy ?? DEFAULT_SETTINGS.energy

    return {
      ...DEFAULT_SETTINGS,
      ...stored,
      energy,
      energyUnitPrice: stored.energyUnitPrice ?? averageEnergyPrice(energy).price,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveCarSettings(settings: CarSettings) {
  localStorage.setItem(CAR_SETTINGS_KEY, JSON.stringify(settings))
}

export function settingsForEnergy(current: CarSettings, energy: CarEnergy): CarSettings {
  return {
    ...current,
    energy,
    energyUnitPrice: averageEnergyPrice(energy).price,
  }
}

export function calculateCarCost(km: number | null | undefined, settings: CarSettings) {
  if (km == null || settings.consumptionPer100 == null || settings.energyUnitPrice == null) return null
  return (km / 100) * settings.consumptionPer100 * settings.energyUnitPrice
}

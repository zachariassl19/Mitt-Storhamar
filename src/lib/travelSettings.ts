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

export interface ConsumptionReference {
  value: number
  unit: 'l/100 km' | 'kWh/100 km'
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

// Praktiske standardestimat for forbruk per 100 km.
// Statens vegvesen oppgir 2026-forbruk for de mest solgte modellene innen
// kompakt-, mellomklasse- og SUV-segmentene. Her brukes et enkelt snitt av
// de segmentverdiene som finnes for hver energitype, slik at appen får ett
// nøytralt utgangspunkt som brukeren kan overstyre med bilens faktiske forbruk.
export const NORWAY_AVERAGE_CONSUMPTION_PER_100: Record<CarEnergy, ConsumptionReference> = {
  gasoline: {
    value: 6.46,
    unit: 'l/100 km',
    period: '2026-referanse',
    source: 'Statens vegvesen – Energipris per 100 km',
    description: 'Snitt av oppgitte 2026-segmentverdier: 5,20 / 7,67 / 6,50 l per 100 km.',
  },
  diesel: {
    value: 5.48,
    unit: 'l/100 km',
    period: '2026-referanse',
    source: 'Statens vegvesen – Energipris per 100 km',
    description: 'Snitt av tilgjengelige 2026-segmentverdier: 5,35 / 5,60 l per 100 km.',
  },
  electric: {
    value: 15.61,
    unit: 'kWh/100 km',
    period: '2026-referanse',
    source: 'Statens vegvesen – Energipris per 100 km',
    description: 'Snitt av oppgitte 2026-segmentverdier: 15,70 / 14,90 / 16,23 kWh per 100 km.',
  },
}

export function averageEnergyPrice(energy: CarEnergy) {
  return NORWAY_AVERAGE_ENERGY_PRICES[energy]
}

export function averageConsumptionPer100(energy: CarEnergy) {
  return NORWAY_AVERAGE_CONSUMPTION_PER_100[energy]
}

const DEFAULT_SETTINGS: CarSettings = {
  energy: 'gasoline',
  consumptionPer100: NORWAY_AVERAGE_CONSUMPTION_PER_100.gasoline.value,
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
      consumptionPer100: stored.consumptionPer100 ?? averageConsumptionPer100(energy).value,
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
  if (current.energy === energy) return current

  return {
    ...current,
    energy,
    consumptionPer100: averageConsumptionPer100(energy).value,
    energyUnitPrice: averageEnergyPrice(energy).price,
  }
}

export function calculateCarCost(km: number | null | undefined, settings: CarSettings) {
  if (km == null || settings.consumptionPer100 == null || settings.energyUnitPrice == null) return null
  return (km / 100) * settings.consumptionPer100 * settings.energyUnitPrice
}

import type { ArchiveLegend, RafterHonourStatus } from './types'

interface RafterStatusOverride {
  rafterStatus: RafterHonourStatus
  rafterStatusNote: string
}

// Statusen beskriver hva kildene faktisk dokumenterer – ikke hva vi antar.
// "retired-number" brukes bare når kilden uttrykkelig sier pensjonert/fredet.
export const rafterStatusOverrides: Record<string, RafterStatusOverride> = {
  'legend-steinar-johansen': {
    rafterStatus: 'retired-number',
    rafterStatusNote: 'SIL-arkivets spillerprofil fører draktnummer 11 som pensjonert.',
  },
  'legend-erik-kristiansen': {
    rafterStatus: 'retired-number',
    rafterStatusNote: 'SIL-arkivet sier uttrykkelig at nummer 20 ble pensjonert da drakten gikk i taket i 1999.',
  },
  'legend-tom-erik-olsen': {
    rafterStatus: 'honoured-banner',
    rafterStatusNote: 'SIL-arkivet fører nummer 9 som hedret. Kilden som er kontrollert sier ikke uttrykkelig at nummeret er pensjonert.',
  },
  'legend-jonas-norgren': {
    rafterStatus: 'honoured-banner',
    rafterStatusNote: 'SIL-arkivet fører nummer 15 som hedret og beskriver et eget banner i hallen.',
  },
  'legend-christian-larrivee': {
    rafterStatus: 'honoured-banner',
    rafterStatusNote: 'Testimonialkilden beskriver eksplisitt et blått banner med bilde og nummer 23.',
  },
  'legend-ole-eskild-dahlstrom': {
    rafterStatus: 'historic-honour',
    rafterStatusNote: 'SILs milepæler dokumenterer at nummer 10 ble heist i taket 10. desember 2022. Pensjoneringsstatus er ikke eksplisitt i kilden som er kontrollert.',
  },
  'legend-patrick-thoresen': {
    rafterStatus: 'retired-number',
    rafterStatusNote: 'Storhamars egen dokumentasjon som ligger i arkivet sier at nummer 41 skulle fredes for all framtid.',
  },
  'legend-marthe-osteraas': {
    rafterStatus: 'historic-honour',
    rafterStatusNote: 'Nummer 21 ble heist i taket 28. februar 2026. Statusen beholdes som historisk heder til eventuell eksplisitt dokumentasjon om fredning/pensjonering er kontrollert.',
  },
}

export function withRafterStatus(legend: ArchiveLegend): ArchiveLegend {
  const override = rafterStatusOverrides[legend.id]
  return override ? { ...legend, ...override } : legend
}

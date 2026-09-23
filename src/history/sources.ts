import type { ArchiveSource } from './types'

export const historySources: ArchiveSource[] = [
  {
    id: 'silarkivet',
    title: 'SIL-arkivet',
    url: 'https://silarkivet.no/',
    publisher: 'SIL-arkivet',
    primary: true,
    note: 'Hovedkilde for Storhamar-historikk, sesonger, spillerhistorie, drakter, rekorder og kuriosa. Materiale herfra kan brukes i Mitt Storhamar etter avtale med prosjekteier.',
  },
  {
    id: 'storhamar-official',
    title: 'Storhamar Hockey',
    url: 'https://www.sil.no/',
    publisher: 'Storhamar Hockey',
    primary: true,
    note: 'Offisiell klubbkilde. Brukes til kontroll av nyere historikk, nyheter, profiler og klubbopplysninger.',
  },
  {
    id: 'eliteprospects',
    title: 'Elite Prospects',
    url: 'https://www.eliteprospects.com/',
    publisher: 'Elite Prospects',
    primary: false,
    note: 'Sekundær kontrollkilde for spiller- og lagstatistikk. Ikke scrap sidene automatisk.',
  },
  {
    id: 'chl',
    title: 'Champions Hockey League',
    url: 'https://www.championshockeyleague.com/',
    publisher: 'Champions Hockey League',
    primary: true,
    note: 'Primær kilde for nyere CHL-kamper, tabeller og turneringsdata der tilgjengelig.',
  },
]

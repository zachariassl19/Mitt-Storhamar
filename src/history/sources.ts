import type { ArchiveSource } from './types'

// Kildehierarki for Historie:
// 1. SIL-arkivet er hovedkilden og pekepinnen for klubbhistorien.
// 2. Storhamar Hockey, NIHF/EHL/CHL og andre primærkilder brukes som kontroll og supplement.
// 3. Redaksjonelle kilder (f.eks. TV 2 Hockey, HA, VG) brukes når de tilfører dokumentert kontekst som primærkildene ikke dekker.
// Ved reell kildekonflikt skal konflikten merkes i innholdet; vi skal ikke velge et tall eller en versjon uten forklaring.
export const historySources: ArchiveSource[] = [
  {
    id: 'silarkivet',
    title: 'SIL-arkivet',
    url: 'https://silarkivet.no/',
    publisher: 'SIL-arkivet',
    primary: true,
    note: 'HOVEDKILDE og pekepinn for Storhamar-historikk, sesonger, spillere, drakter, arenaer, rekorder og kuriosa. SIL-arkivet regner seg som offisiell Storhamar-historikk. Materiale herfra kan brukes i Mitt Storhamar etter avtale med prosjekteier.',
  },
  {
    id: 'storhamar-official',
    title: 'Storhamar Hockey',
    url: 'https://www.sil.no/',
    publisher: 'Storhamar Hockey',
    primary: true,
    note: 'Offisiell klubbkilde. Brukes som kontroll og supplement, særlig for nyere historikk, nyheter, profiler og klubbopplysninger. SIL-arkivet er fortsatt hovedpekepinnen for selve historiearkivet.',
  },
  {
    id: 'nihf',
    title: 'Norges Ishockeyforbund',
    url: 'https://www.hockey.no/',
    publisher: 'Norges Ishockeyforbund',
    primary: true,
    note: 'Primær kontrollkilde for offisielle mesterskap, seriemestere, NM, landslag, Gullpucken og nyere norsk hockeyhistorikk.',
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

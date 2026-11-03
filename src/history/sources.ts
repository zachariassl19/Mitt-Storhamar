import type { ArchiveSource } from './types'

// Kildehierarki for Historie:
// 1. SIL-arkivet er hovedkilden og pekepinnen for klubbhistorien.
// 2. Storhamar Hockey, NIHF/EHL/CHL/IIHF og andre primærkilder brukes som kontroll og supplement.
// 3. Redaksjonelle kilder (f.eks. TV 2 Hockey, HA, VG) brukes når de tilfører dokumentert kontekst som primærkildene ikke dekker.
// Ved reell kildekonflikt skal konflikten merkes i innholdet; vi skal ikke velge et tall eller en versjon uten forklaring.
export const historySources: ArchiveSource[] = [
  {
    id: 'sil-milepaeler',
    title: 'SIL-arkivet – Milepæler',
    url: 'https://silarkivet.no/tidslinje/milepaeler/',
    publisher: 'SIL-arkivet', primary: true,
    note: 'Eksakte datoer, kampnummer, publikumstall og viktige klubbhendelser fra hovedkilden.',
  },
  {
    id: 'brreg-ssu',
    title: 'Brønnøysundregistrene – Storhamar Supporter Union',
    url: 'https://virksomhet.brreg.no/nb/oppslag/enheter/994331981',
    publisher: 'Brønnøysundregistrene', primary: true,
    note: 'Verifiserer SSUs stiftelsesdato 25. oktober 2001 og organisasjonens formål.',
  },
  {
    id: 'sil-adelskalender',
    title: 'SIL-arkivet – Adelskalender total',
    url: 'https://silarkivet.no/samletabeller/adelskalender-total/',
    publisher: 'SIL-arkivet', primary: true,
    note: 'Karrieretall for offisielle senior-/seriekamper ajour pr. 2025/26.',
  },
  {
    id: 'sil-nummerhistorikk',
    title: 'SIL-arkivet – Nummerhistorikk',
    url: 'https://silarkivet.no/tidslinje/nummerhistorikk/',
    publisher: 'SIL-arkivet', primary: true,
    note: 'Historisk oversikt over draktnummer 01–98.',
  },
  {
    id: 'sil-kapteiner',
    title: 'SIL-arkivet – Kapteiner',
    url: 'https://silarkivet.no/tidslinje/kapteiner/',
    publisher: 'SIL-arkivet', primary: true,
    note: 'Oversikt over dokumenterte kapteinperioder fra 1982.',
  },
  {
    id: 'sil-trenere',
    title: 'SIL-arkivet – Trenere',
    url: 'https://silarkivet.no/tidslinje/trenere/',
    publisher: 'SIL-arkivet', primary: true,
    note: 'Oversikt over trenere og trenerbytter fra 1976.',
  },
  { id:'storhamar-chl-2025', title:'Storhamar Hockey – CHL-draktene 2025/26', url:'https://www.sil.no/chl-draktene-lansert/', publisher:'Storhamar Hockey', primary:true, note:'Offisiell lansering 27. juli 2025 av hjemmedrakt og bortedrakt for Champions Hockey League.' },
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
    id: 'iihf',
    title: 'International Ice Hockey Federation',
    url: 'https://www.iihf.com/',
    publisher: 'IIHF',
    primary: true,
    note: 'Primær kontrollkilde for eldre europeiske klubbturneringer, særlig Continental Cup, turneringsoppsett og historiske resultater.',
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

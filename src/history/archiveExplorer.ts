import { historyArchive } from './catalog'
import type { ArchiveBase, ArchiveEntityKind, ArchiveLink, HistoryArchive } from './types'

export type BrowsableKind = 'season' | 'honour' | 'jersey' | 'legend' | 'player' | 'arena' | 'europe' | 'record' | 'timeline'
const collectionKeys: Record<BrowsableKind, keyof HistoryArchive> = {
  season: 'seasons',
  honour: 'honours',
  jersey: 'jerseys',
  legend: 'legends',
  player: 'players',
  arena: 'arenas',
  europe: 'europe',
  record: 'records',
  timeline: 'timeline',
}

export function isBrowsableKind(kind: ArchiveEntityKind): kind is BrowsableKind {
  return Object.prototype.hasOwnProperty.call(collectionKeys, kind)
}

export function archiveItems(kind: BrowsableKind): ArchiveBase[] {
  return historyArchive[collectionKeys[kind]] as ArchiveBase[]
}

export function archiveItem(kind: BrowsableKind, id: string): ArchiveBase | undefined {
  return archiveItems(kind).find((item) => item.id === id)
}

export function normalizedSearchText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('nb-NO').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/å/g, 'a')
}

export function searchableText(item: ArchiveBase): string {
  const more = 'fullName' in item && typeof item.fullName === 'string' ? item.fullName : ''
  return normalizedSearchText([item.title, item.summary ?? '', ...(item.tags ?? []), more].join(' '))
}

export function matchesArchiveSearch(item: ArchiveBase, query: string): boolean {
  const clean = normalizedSearchText(query.trim())
  return clean === '' || clean.split(/\s+/).every((word) => searchableText(item).includes(word))
}

export function entryYear(kind: BrowsableKind, item: ArchiveBase): number | null {
  if (kind === 'season') return Number((item as (typeof historyArchive.seasons)[number]).startYear)
  if (kind === 'honour') return (item as (typeof historyArchive.honours)[number]).year ?? null
  if (kind === 'timeline') {
    const event = item as (typeof historyArchive.timeline)[number]
    return event.year ?? (event.date ? Number(event.date.slice(0, 4)) : null)
  }
  if (kind === 'record') {
    const record = item as (typeof historyArchive.records)[number]
    return record.date ? Number(record.date.slice(0, 4)) : null
  }
  if (kind === 'jersey') {
    const jersey = item as (typeof historyArchive.jerseys)[number]
    const year = jersey.fromSeasonId?.match(/season-(\d{4})/)?.[1] ?? jersey.seasonIds[0]?.match(/season-(\d{4})/)?.[1]
    return year ? Number(year) : Number(item.title.match(/(?:19|20)\d{2}/)?.[0]) || null
  }
  if (kind === 'europe') {
    const campaign = item as (typeof historyArchive.europe)[number]
    const year = campaign.seasonId.match(/season-(\d{4})/)?.[1]
    return year ? Number(year) : null
  }
  return null
}

export function archiveRelationships(kind: BrowsableKind, item: ArchiveBase): ArchiveLink[] {
  const collected: ArchiveLink[] = [...item.related]
  if (kind === 'season') {
    const season = item as (typeof historyArchive.seasons)[number]
    collected.push(
      ...season.honourIds.map((id) => ({ kind: 'honour' as const, id })),
      ...season.jerseyIds.map((id) => ({ kind: 'jersey' as const, id })),
      ...season.arenaIds.map((id) => ({ kind: 'arena' as const, id })),
      ...season.notableMomentIds.map((id) => ({ kind: 'timeline' as const, id })),
      ...season.roster.slice(0, 35).map((person) => ({ kind: 'player' as const, id: person.personId })),
    )
  } else if (kind === 'jersey') {
    const jersey = item as (typeof historyArchive.jerseys)[number]
    collected.push(...jersey.seasonIds.map((id) => ({ kind: 'season' as const, id })))
  } else if (kind === 'honour') {
    const honour = item as (typeof historyArchive.honours)[number]
    if (honour.seasonId) collected.push({ kind: 'season', id: honour.seasonId })
  } else if (kind === 'europe') {
    const campaign = item as (typeof historyArchive.europe)[number]
    collected.push({ kind: 'season', id: campaign.seasonId })
  } else if (kind === 'player' || kind === 'legend') {
    const person = item as (typeof historyArchive.players)[number]
    collected.push(...person.seasonIds.slice(-15).map((id) => ({ kind: 'season' as const, id })))
  }
  const unique = new Map<string, ArchiveLink>()
  for (const link of collected) {
    if (!isBrowsableKind(link.kind) || !archiveItem(link.kind, link.id)) continue
    const key = link.kind + '/' + link.id
    if (!unique.has(key)) unique.set(key, link)
  }
  return [...unique.values()]
}

export interface HistoryChapter {
  id: string
  period: string
  title: string
  summary: string
  paragraphs: string[]
  imageJerseyId?: string
  archiveLinks: { kind: BrowsableKind; id: string }[]
  sourceUrl: string
}

export const historyChapters: HistoryChapter[] = [
  {
    id: 'start', period: '1955–1961', title: 'Begynnelsen på Storhamarbana',
    summary: 'Fra fotballspillernes vintertrening til organisert ishockey på Hamar.',
    paragraphs: [
      'Interessen for ishockey på Hamar vokste etter vinter-OL i 1952. Roar Johansen og miljøet på Storhamar fikk plass til sporten, og en tidlig rink ble hentet fra Rapid i Moss.',
      'En fullstor bane med lys ble åpnet i 1957. De første årene spilte Storhamar uoffisielle kamper, før laget gradvis ble en del av seriesystemet.',
      'De første draktene var svarte og gule. Dette er en vesentlig del av klubbidentiteten som kom før de gule og blå draktene vi kjenner i dag.',
    ],
    imageJerseyId: 'jersey-1957-67',
    archiveLinks: [{kind:'season',id:'season-1957-58'},{kind:'jersey',id:'jersey-1957-67'},{kind:'arena',id:'arena-storhamarbana'}],
    sourceUrl: 'https://silarkivet.no/tidslinje/historien/',
  },
  {
    id: 'kunstis', period: '1971–1983', title: 'Fra naturis til ishall',
    summary: 'Ungdomsgenerasjonen, opprykket, kunstisen og den første ishallen.',
    paragraphs: [
      'På 1970-tallet ble naturisen en utfordring. Etter en svak periode ga det unge mannskapet klubben en ny start, og i 1977 tok Storhamar steget opp i 1. divisjon.',
      'Kunstisbana ga muligheter, men Storhamar trengte en ishall for å konkurrere med landets beste. Storhamar Ishall åpnet i 1981 og ga en ny sportslig ramme.',
      'Ved opprykket i 1982 ble hockeyen knyttet tettere til klubbens gule og blå farger. Den endringen lever fortsatt i drakttradisjonen.',
    ],
    imageJerseyId:'jersey-1967-77',
    archiveLinks:[{kind:'arena',id:'arena-storhamar-ishall'},{kind:'jersey',id:'jersey-1967-77'}],
    sourceUrl:'https://silarkivet.no/tidslinje/historien/',
  },
  {
    id: 'geriljaen',period:'1984–1990',title:'Hedmarksgeriljaen',
    summary:'Storhamar etablerte seg som utfordrer i toppen, men gullene lot vente på seg.',
    paragraphs:[
      'Trener Lasse Beckmanns lag fikk tilnavnet «Hedmarksgeriljaen». Storhamar bygde et slagkraftig lag med blant andre Erik Kristiansen og Bergseng-brødrene.',
      'Laget nådde sluttspill og tok sterke serieplasseringer, men ble lenge stående som et nesten-lag. Samtidig begynte planene for den kommende OL-hallen å ta form.',
    ],
    archiveLinks:[{kind:'season',id:'season-1984-85'},{kind:'legend',id:'legend-erik-kristiansen'}],
    sourceUrl:'https://silarkivet.no/tidslinje/historien/',
  },
  {
    id:'gullalder',period:'1992–1997',title:'OL-Amfi og den første gullalderen',
    summary:'Ny hjemmebane, første serietittel og tre strake NM-gull.',
    paragraphs:[
      '6. desember 1992 flyttet Storhamar inn i Hamar OL-Amfi. Det endret rammene rundt klubben og innledet en historisk storhetstid.',
      'Etter den første serietittelen og en tapt NM-finale mot Lillehammer i 1994 kom gjennombruddet: NM-gull i 1995, 1996 og 1997. Dette var klubbens første sammenhengende mesterskapsepoke.',
    ],
    archiveLinks:[{kind:'arena',id:'arena-hamar-ol-amfi'},{kind:'honour',id:'honour-1995-nm'},{kind:'honour',id:'honour-1996-nm'},{kind:'honour',id:'honour-1997-nm'}],
    sourceUrl:'https://silarkivet.no/tidslinje/historien/',
  },
  {
    id:'dragons',period:'1998–2007',title:'Dragons, Europa og nye mesterskap',
    summary:'Et nytt visuelt uttrykk, europeiske utfordringer og gull på 2000-tallet.',
    paragraphs:[
      'Storhamar tok navnet Dragons i bruk som markedsnavn i 1998. Samtidig var klubben allerede blitt kjent ute i Europa gjennom EHL og senere Continental Cup.',
      'NM-gullet i 2000 ble vunnet mot Vålerenga. Økonomiske utfordringer og sterke sportslige ambisjoner preget flere av disse sesongene, mens laget fortsatte å kjempe om titlene.',
    ],
    archiveLinks:[{kind:'honour',id:'honour-2000-nm'},{kind:'europe',id:'europe-1997-98-ehl'}],
    sourceUrl:'https://silarkivet.no/tidslinje/historien/',
  },
  {
    id:'motgang',period:'2008–2014',title:'Motgang, talentarbeid og kampen for klubben',
    summary:'En økonomisk krevende tid som også formet klubbens identitet.',
    paragraphs:[
      'Etter 2008 måtte Storhamar redusere utgiftene og i større grad gi egne talenter plass. Resultatene varierte, men hockeyinteressen på Hamar holdt seg levende.',
      '2014 ble et dramatisk år med økonomisk usikkerhet. Klubbens overlevelse var ikke selvfølgelig. Nettopp derfor er denne perioden en viktig del av historien, ikke bare et mellomspill mellom gullene.',
    ],
    archiveLinks:[{kind:'season',id:'season-2013-14'}],
    sourceUrl:'https://silarkivet.no/tidslinje/historien/',
  },
  {
    id:'nyttkapittel',period:'2015–2018',title:'Tilbake i Europa og tilbake på toppen',
    summary:'CHL-comeback, historisk maratonkamp og det sjuende NM-gullet.',
    paragraphs:[
      'Storhamar spilte Champions Hockey League i 2015, og Dragons-navnet ble lagt bort samme år.',
      'I 2017 kom en av hockeyhistoriens mest ekstraordinære kamper: Storhamar–Sparta gikk til 217 minutter og 14 sekunder før avgjørelsen.',
      'Året etter ble Storhamar Norgesmester igjen. Den lange veien fra økonomisk usikkerhet til nytt gull gjorde triumfen ekstra betydningsfull.',
    ],
    archiveLinks:[{kind:'record',id:'record-2017-world-longest-game'},{kind:'honour',id:'honour-2018-nm'},{kind:'europe',id:'europe-2015-16-chl'}],
    sourceUrl:'https://silarkivet.no/tidslinje/milepaeler/',
  },
  {
    id:'nygullrekke',period:'2023–2026',title:'Tre sesonger – tre nye NM-gull',
    summary:'Storhamar skrev en ny gullhistorie i 2024, 2025 og 2026.',
    paragraphs:[
      'Etter flere finaletap fikk Storhamar en ny periode med store triumfer. Seriemesterskap og NM-gull ble sikret både i 2024, 2025 og 2026.',
      'Denne epoken inkluderer imponerende resultater i seriespill, sluttspill og nye europeiske kamper. Samtidig har nye drakter og spesialdesign skapt flere kapitler i klubbens visuelle historie.',
      'Detaljene for hver sesong, gullene og spillertroppene finnes i egne arkivobjekter. Innhold merket «delvis dokumentert» er fortsatt under historisk kildekontroll.',
    ],
    imageJerseyId:'jersey-2025-26-series',
    archiveLinks:[{kind:'season',id:'season-2023-24'},{kind:'season',id:'season-2024-25'},{kind:'season',id:'season-2025-26'},{kind:'honour',id:'honour-2026-nm'}],
    sourceUrl:'https://silarkivet.no/sesonger/',
  },
]

export const sourceRoleLists = {
  captain: {
    title: 'Kapteiner', sourceUrl:'https://silarkivet.no/tidslinje/kapteiner/',
    entries: [
      ['Per Arne Kristiansen','1982–86'],['Åge Ellingsen','1986–87, 1989–90, 1991–94'],
      ['Harald Bastiansen','1987–88'],['Øystein Tronrud','1988–89'],
      ['Peter Madach','1990–91'],['Petter Salsten','1994–98'],
      ['Ole Eskild Dahlstrøm','1998–99'],['Carl Oscar Bøe Andersen','1999–00'],
      ['Michael Smithurst','2000–03'],['Mikael Tjälldén','2003–06'],
      ['Mattias Livf','2006–10'],['Pål Johnsen','2010–13'],
      ['Mads Hansen','2013–15'],['Christian Larrivée','2015–17'],
      ['Patrick Thoresen','2017, 2018–24'],['Kodie Curran','2017–18'],['Jacob Berglund','fra 2024'],
    ] as [string,string][],
  },
  coach: {
    title: 'Trenere',sourceUrl:'https://silarkivet.no/tidslinje/trenere/',
    entries: [
      ['Per Ragnar Pettersen','1976–77'],['Svenn Rakstad-Larsen','1977–79'],
      ['Mats Axelsson','1979–80'],['Steinar Johansen / J.F. Stenberg / M. Rakstad-Larsen','1980–81'],
      ['Hans Westberg','1981–83'],['Kåre Syversen','1983'],
      ['M. Lillehagen / S. Johansen m.fl.','1983–84'],['Lasse Beckmann','1984–87'],
      ['Lenny Eriksson','1987–90'],['M. Lillehagen / O.R. Holmen','1990–91'],
      ['Lennart Åhlberg','1991–94'],['Göran Sjöberg','1994–95'],
      ['Petter Thoresen','1995–2000, 2005–07, fra 2022'],
      ['Alexander Smirnov / Rune Gulliksen','2000–01'],['Rune Gulliksen','2001–02, 2009–10, 2014'],
      ['Petter Salsten','2002, 2003–05'],['Lars Molin','2002–03'],
      ['Alexander Smirnov / T. Orskaug','2007–09'],
      ['Peter Johansson','2010–11'],['Michael Smithurst','2011–14'],
      ['Alexander Smirnov','2014–16'],['Sjur Robert Nilsen','2016–17'],
      ['Fredrik Söderström','2017–19'],['Miikka Elomo','2019–20'],['Anders Gjøse','2020–22'],
    ] as [string,string][],
  },
} as const

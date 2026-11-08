/**
 * Storhamar Supporterunion — independent history collection within Historie.
 * Older supporterforening details are ONLY secondary-source leads and are never
 * represented as primary-source-confirmed organizational history.
 * Sources are linked separately from editorial narrative.
 */
export interface SSUSource {
  id: string
  label: string
  url: string
  note: string
}
export interface SSUEvent {
  id: string
  year: string
  date?: string
  title: string
  text: string
  beforeSSU?: boolean
  sourceIds: string[]
  uncertain?: boolean
}
export interface SSUChapter {
  id: string
  kicker: string
  title: string
  paragraphs: string[]
  sourceIds: string[]
}
export interface SSUPhoto {
  id: string
  src: string
  title: string
  date: string
  alt: string
  credit: string
  originalUrl: string
  licenseUrl: string
}

export const ssuFoundationDate = '2001-10-25'

export const ssuSources: SSUSource[] = [
  {
    id: 'registry',
    label: 'Brønnøysundregistrene · Storhamar Supporter Union',
    url: 'https://virksomhet.brreg.no/nb/oppslag/enheter/994331981',
    note: 'Offisiell stiftelsesdato og organisasjonens formål',
  },
  {
    id: 'early',
    label: 'Storhamar Hockey · Historietirsdag: I skjæringspunktet',
    url: 'https://www.sil.no/historietirsdag-i-skjaeringspunktet/',
    note: 'Situasjonen rundt tilskuer- og supportermiljøet i 1982',
  },
  {
    id: 'predecessor',
    label: 'Wikipedia · Storhamar Supporter Union',
    url: 'https://no.wikipedia.org/wiki/Storhamar_Supporter_Union',
    note: 'Nevner Storhamar supporterforening som en eldre forening. Opplysningen mangler primærkilde og årstallene bør undersøkes videre',
  },
  {
    id: 'fanzine',
    label: '=Enga nr. 11 (2013) · Intervju om Køllebladet',
    url: 'https://www.fanzine.no/filer/pdf/erlikenga11.pdf',
    note: 'Samtidsintervju med Stian Bekkelund om fanzinen som begynte i 1991/92',
  },
  {
    id: 'shares',
    label: 'Stavanger Aftenblad / Hamar Arbeiderblad · SSU støtter klubben (2014)',
    url: 'https://www.aftenbladet.no/sport/i/Opp8aq/har-solgt-dragons-andeler-for-102000',
    note: '34 andeler og 10 200 kroner fra SSU i mai 2014',
  },
  {
    id: 'stockholm',
    label: 'Storhamar Hockey · Møtested i Stockholm (2018)',
    url: 'https://storhamar4.rssing.com/chan-58543812/all_p45.html',
    note: 'Arkivert klubbinformasjon om SSUs felles samlingspunkt før CHL-kampen i Stockholm',
  },
  {
    id: 'commons-warner',
    label: 'Wikimedia Commons · SSU i Varner Arena (2023)',
    url: 'https://commons.wikimedia.org/wiki/File:Storhamar_Supporter_Union_P%C3%A5_bes%C3%B8k_i_Warner_Arena.jpg',
    note: 'Fotografi av bortesupporterne 24. januar 2023, Repstad, CC BY-SA 4.0',
  },
  {
    id: 'commons-sparta',
    label: 'Wikimedia Commons · SSU i Sparta Amfi (2023)',
    url: 'https://commons.wikimedia.org/wiki/File:Storhamar_Supporter_Union_p%C3%A5_bes%C3%B8k_i_Sparta_Amfi.jpg',
    note: 'Fotografi av bortesupporterne 1. oktober 2023, Repstad, CC BY-SA 4.0',
  },
  {
    id: 'arena',
    label: 'SIL-arkivet · Storhamars arenaer og tilskuere',
    url: 'https://silarkivet.no/tidslinje/historien/',
    note: 'Bakgrunn om publikumskulturens vekst på Hamar gjennom klubbens epoker',
  },
]

export const ssuChapters: SSUChapter[] = [
  {
    id: 'before',
    kicker: 'FØR UNIONEN',
    title: 'Supporterne var der før SSU',
    paragraphs: [
      'Storhamar hadde supportere lenge før det fantes en egen union. I de første årene var hockey en liten sport på Hamar, og selv etter at Storhamar Ishall åpnet i 1981 måtte klubben arbeide for å fylle tribunen.',
      'I 1982 etterlyste trener Hans Westberg en fast supportergjeng. Da laget møtte Sparta kom det mange tilreisende fra Sarpsborg. Storhamar hadde ennå ikke den organiserte tribunekulturen som senere skulle bli en så viktig del av hjemmekampene.',
      'Senere vokste et tydeligere miljø fram. En eldre organisasjon ved navn Storhamar supporterforening er omtalt som en forløper til SSU. Historien om hvem som startet den, nøyaktig når den ble dannet og hvordan den virket er foreløpig ikke godt nok dokumentert til å sette konkrete årstall på.',
    ],
    sourceIds: ['early', 'predecessor', 'arena'],
  },
  {
    id: 'founding',
    kicker: 'EN NY START',
    title: '25. oktober 2001 – Storhamar Supporter Union',
    paragraphs: [
      'Høsten 2001 fikk Storhamar en ny organisert supporterklubb. Storhamar Supporter Union skulle samle supportere og støtte hockeylaget på Hamar. En egen union ga supportersamholdet et navn som kunne følge laget på hjemmebane og bortebane.',
      'Da SSU ble stiftet hadde Storhamar allerede opplevd tre strake NM-gull på 1990-tallet, store europeiske kvelder og en voldsom vekst i hockeyinteressen. SSU ble en videreføring av engasjementet på tribunen – ikke starten på all Storhamar-support.',
      'Den offisielle stiftelsesdatoen er 25. oktober 2001. Det er denne datoen som brukes i SSUs historikk og jubileer.',
    ],
    sourceIds: ['registry', 'arena', 'predecessor'],
  },
  {
    id: 'culture',
    kicker: 'ORD OG IDENTITET',
    title: 'Køllebladet – supporternes egen stemme',
    paragraphs: [
      'Supporterkultur handler om mer enn sang og flagg. Allerede sesongen 1991/92 kom Køllebladet, et fanzine skrevet av og for hockeyfolk på Hamar. Det var før SSU ble stiftet, og ble en del av den videre supportertradisjonen.',
      'I 2013 ble ildsjelen Stian Bekkelund intervjuet om Køllebladet. Han fortalte om et supportermiljø som både kunne rose klubben og være kritisk, med humor, egne meninger og historier på papir.',
      'Fanzinen var fortsatt i omløp via SSU i 2013. Den forteller om en tid da supportere selv tok ansvar for å skrive ned og bevare hockeykulturen, lenge før stories og sosiale medier ble den naturlige kanalen.',
    ],
    sourceIds: ['fanzine'],
  },
  {
    id: 'support',
    kicker: 'MER ENN TRIBUNELIV',
    title: 'Da supporterne stilte opp for klubben',
    paragraphs: [
      'I 2014 var Storhamar inne i en vanskelig økonomisk periode. Da klubben satte i gang prosjektet «Vi bygger laget – sammen med deg», valgte SSU å kjøpe 34 andeler. Beløpet var 10 200 kroner.',
      'Stian Bekkelund var leder i SSU da andelene ble kjøpt. Engasjementet viste hvordan en supporterklubb kunne bidra også utenfor tribunen, i en tid da framtiden til laget var usikker.',
    ],
    sourceIds: ['shares'],
  },
  {
    id: 'away',
    kicker: 'GUL OG BLÅ PÅ REISE',
    title: 'Borteturer, vennskap og fellesopplevelser',
    paragraphs: [
      'For mange er en bortekamp like mye reisen, menneskene og stemningen som det som skjer på isen. SSU har vært en del av disse opplevelsene, fra norske arenaer til større europeiske hockeykvelder.',
      'Før CHL-oppgjøret mot Djurgården i september 2018 oppfordret både Storhamar Hockey og SSU de tilreisende til å samles i Stockholm. Et felles møtested og en egen samling før kampen gjorde turen til mer enn bare 60 minutter ishockey.',
      'Fotografier fra 2023 viser SSU-supportere på plass i både Varner Arena og Sparta Amfi. Dette er små øyeblikk i et langt supporterliv, men de viser det viktigste: gult og blått er med laget også når det spiller borte.',
    ],
    sourceIds: ['stockholm', 'commons-warner', 'commons-sparta'],
  },
  {
    id: 'anniversary',
    kicker: '25 ÅR',
    title: 'Et kvart århundre med SSU',
    paragraphs: [
      '25. oktober 2026 var det 25 år siden Storhamar Supporter Union ble stiftet. En generasjon med supportere har vokst opp i løpet av denne perioden, og nye har kommet til.',
      'Supporterhistorien stopper ikke med de store kampene. Den lever i turene, de gamle sangene, vennskapene og menneskene som stiller opp for klubben år etter år. SSUs egen historie fortjener derfor sin plass i Storhamars historiearkiv.',
    ],
    sourceIds: ['registry'],
  },
]

export const ssuTimeline: SSUEvent[] = [
  {
    id: '1982', year: '1982', title: 'Et miljø som ennå ikke var organisert',
    text: 'Trener Hans Westberg etterlyste en fast supportergjeng i Storhamar Ishall. Klubben hadde fått sin egen innendørsarena, men tribunekulturen var fortsatt ung.',
    beforeSSU: true, sourceIds: ['early'],
  },
  {
    id: '1991', year: '1991/92', title: 'Køllebladet blir født',
    text: 'Det egenproduserte hockeyfanzinet Køllebladet startet. Det levde videre inn i SSU-tiden og var fortsatt tilgjengelig gjennom unionen i 2013.',
    beforeSSU: true, sourceIds: ['fanzine'],
  },
  {
    id: 'old-club', year: 'Før 2001', title: 'Storhamar supporterforening',
    text: 'En eldre supporterforening nevnes som forløperen til SSU. Opplysninger om dens stiftelse og aktivitet er foreløpig ikke bekreftet av en selvstendig historisk primærkilde.',
    beforeSSU: true, uncertain: true, sourceIds: ['predecessor'],
  },
  {
    id: '2001', year: '2001', date: ssuFoundationDate, title: 'SSU stiftes',
    text: '25. oktober blir Storhamar Supporter Union stiftet med formål om å støtte Storhamar Hockey.',
    sourceIds: ['registry'],
  },
  {
    id: '2013', year: '2013', title: 'Køllebladet lever videre',
    text: 'Et intervju med SSU-profilen Stian Bekkelund forteller om fanzinens historie. Køllebladet kunne fortsatt kjøpes gjennom supporterunionen.',
    sourceIds: ['fanzine'],
  },
  {
    id: '2014', year: '2014', date: '2014-05-28', title: 'SSU støtter laget økonomisk',
    text: 'SSU kjøper 34 andeler i «Vi bygger laget – sammen med deg» for til sammen 10 200 kroner.',
    sourceIds: ['shares'],
  },
  {
    id: '2018', year: '2018', title: 'Samlingspunkt i Stockholm',
    text: 'I forkant av CHL-kampen mot Djurgården i september inviterer Storhamar Hockey og SSU til felles møtested for tilreisende fans.',
    sourceIds: ['stockholm'],
  },
  {
    id: '2023-warner', year: '2023', date: '2023-01-24', title: 'Gult og blått i Varner Arena',
    text: 'Et fotografi fra 24. januar viser Storhamar Supporter Union samlet på bortetribunen i Asker.',
    sourceIds: ['commons-warner'],
  },
  {
    id: '2023-sparta', year: '2023', date: '2023-10-01', title: 'Supporterne i Sparta Amfi',
    text: '1. oktober står SSU-supporterne på tribunen i Sarpsborg. Øyeblikket er bevart på foto.',
    sourceIds: ['commons-sparta'],
  },
  {
    id: '2026', year: '2026', date: '2026-10-25', title: 'SSU fyller 25 år',
    text: 'Et kvart århundre er gått siden stiftelsen 25. oktober 2001.',
    sourceIds: ['registry'],
  },
]

export const ssuPhotos: SSUPhoto[] = [
  {
    id: 'warner',
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Storhamar_Supporter_Union_P%C3%A5_bes%C3%B8k_i_Warner_Arena.jpg/960px-Storhamar_Supporter_Union_P%C3%A5_bes%C3%B8k_i_Warner_Arena.jpg',
    title: 'SSU i Varner Arena',
    date: '24. januar 2023',
    alt: 'Storhamar-supportere kledd i gult og blått med flagg på bortetribunen i Varner Arena',
    credit: 'Foto: Repstad · CC BY-SA 4.0',
    originalUrl: 'https://commons.wikimedia.org/wiki/File:Storhamar_Supporter_Union_P%C3%A5_bes%C3%B8k_i_Warner_Arena.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  {
    id: 'sparta',
    src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Storhamar_Supporter_Union_p%C3%A5_bes%C3%B8k_i_Sparta_Amfi.jpg/960px-Storhamar_Supporter_Union_p%C3%A5_bes%C3%B8k_i_Sparta_Amfi.jpg',
    title: 'SSU i Sparta Amfi',
    date: '1. oktober 2023',
    alt: 'Storhamar-supportere i gult og blått på bortetribunen i Sparta Amfi',
    credit: 'Foto: Repstad · CC BY-SA 4.0',
    originalUrl: 'https://commons.wikimedia.org/wiki/File:Storhamar_Supporter_Union_p%C3%A5_bes%C3%B8k_i_Sparta_Amfi.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
]

export function ssuSource(id: string): SSUSource | undefined {
  return ssuSources.find((source) => source.id === id)
}

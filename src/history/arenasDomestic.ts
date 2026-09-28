import type { ArchiveArena } from './types'

const verifiedAt = '2026-09-28'
const sourceUrl = 'https://silarkivet.no/arenaer/ovrige-arenaer/'

function arena(args: {
  id: string
  title: string
  slug: string
  city: string
  summary: string
  body: string[]
  aliases?: string[]
  opened?: string
  closed?: string
  tags?: string[]
}): ArchiveArena {
  return {
    id: args.id,
    title: args.title,
    name: args.title,
    slug: args.slug,
    summary: args.summary,
    body: args.body,
    completeness: 'verified',
    sources: ['silarkivet'],
    media: [],
    related: [],
    aliases: args.aliases,
    city: args.city,
    opened: args.opened,
    closed: args.closed,
    notableMomentIds: [],
    tags: ['bortearena', sourceUrl, ...(args.tags ?? [])],
    lastVerifiedAt: verifiedAt,
  }
}

export const domesticHistoricArenas: ArchiveArena[] = [
  arena({
    id: 'arena-jordal-amfi-old', title: 'Jordal Amfi (gamle)', slug: 'jordal-amfi-gamle', city: 'Oslo', closed: '2016',
    summary: 'En av de mest besøkte bortearenaene i Storhamar-historien og gjennom flere tiår selve hovedscenen for rivaloppgjørene mot Vålerenga.',
    body: [
      'SIL-arkivet fører 222 Storhamar-kamper på gamle Jordal: 86 ordinære seire, to overtidsseire, 18 uavgjorte/overtidstap og 116 tap, med målforskjell 813–919.',
      'Arenaen fra OL i 1952 har en spesiell symbolsk rolle i Storhamar-historien. Ishockeyen under Oslo-OL var en viktig inspirasjon for miljøet som senere bygde opp hockeyen på Storhamar.',
      'Den nest siste Storhamar-kampen på gamle Jordal ble vunnet 4–2 før arenaen ble revet etter 2016-sesongen.',
    ],
    tags: ['Vålerenga', 'rivaloppgjør', 'OL 1952'],
  }),
  arena({
    id: 'arena-jordal-amfi-new', title: 'Jordal Amfi (nye)', slug: 'jordal-amfi-nye', city: 'Oslo', opened: '2020',
    summary: 'Vålerengas nye hjemmebane og en moderne hovedscene for Storhamars største rivaloppgjør.',
    body: [
      'Nye Jordal åpnet høsten 2020. Storhamars første virkelig store serie der kom i kvartfinalen i 2022, med tette kamper og stort bortefølge.',
      'SIL-arkivets oversikt oppdatert i 2025 fører 22 kamper: 11 ordinære seire, én overtidsseier, to uavgjorte/overtidstap og åtte tap, med målforskjell 66–59 og publikumssnitt 4828.',
      'I 2024 ble det for første gang spilt NM-finalekamper mellom Vålerenga og Storhamar i den nye arenaen.',
    ],
    tags: ['Vålerenga', 'rivaloppgjør', 'NM-finale'],
  }),
  arena({
    id: 'arena-sparta-amfi', title: 'Sparta Amfi', slug: 'sparta-amfi', city: 'Sarpsborg', opened: '1965',
    summary: 'Norges første ishall og stedet der Storhamar for første gang spilte innendørs.',
    body: [
      'Sparta Amfi var et viktig reisemål allerede før Storhamar fikk egne innendørsforhold. Laget reiste hit både for istid og kamper.',
      'SIL-arkivet fører 68 kamper med 37 ordinære seire, én overtidsseier, tre uavgjorte/overtidstap og 27 tap, målforskjell 271–229.',
      'De første årene var hallen en notorisk vanskelig arena for Storhamar. Den første seieren kom i 1984.',
    ],
    tags: ['Sparta', 'første innendørskamp'],
  }),
  arena({
    id: 'arena-leangen-ishall', title: 'Leangen Ishall', slug: 'leangen-ishall', city: 'Trondheim', opened: '1977',
    summary: 'Trondheims klassiske hockeyarena og åsted for mange tøffe Storhamar-kamper mot byens skiftende topplag.',
    body: [
      'Storhamar besøkte Leangen første gang i 1979 og møtte gjennom årene Strindheim, Rosenborg og særlig Trondheim IK.',
      'SIL-arkivet fører 66 kamper, 36 ordinære seire, én overtidsseier, seks uavgjorte/overtidstap og 23 tap, målforskjell 277–203.',
      'Arenaen ble også brukt i flere forsesongsturneringer tidlig på 2000-tallet.',
    ],
    tags: ['Trondheim IK', 'Rosenborg', 'Strindheim'],
  }),
  arena({
    id: 'arena-manglerudhallen', title: 'Manglerudhallen', slug: 'manglerudhallen', city: 'Oslo', opened: '1979',
    summary: 'Den spartanske «Garasjen» som gjennom tiårene har vært en gjentakende og særpreget bortearena.',
    body: [
      'Manglerudhallen startet som en svært enkel arena og ble totalrenovert i 2004. Storhamar har møtt både Manglerud Star, LM 90 og Lambertseter her.',
      'SIL-arkivet fører 64 kamper med 40 ordinære seire, én overtidsseier, ni uavgjorte/overtidstap og 15 tap, målforskjell 268–172.',
      'I sluttspillet 2023 vant Storhamar de to bortekampene mot Manglerud med til sammen 20–1.',
    ],
    tags: ['Manglerud Star', 'Garasjen'],
  }),
  arena({
    id: 'arena-lorenskog-ishall', title: 'Lørenskog Ishall', slug: 'lorenskog-ishall', city: 'Lørenskog', opened: '1988',
    summary: 'Fast bortearena mot Lørenskog og tidligere også en kortvarig arena for Furuset.',
    body: [
      'SIL-arkivet fører 55 Storhamar-kamper i Lørenskog Ishall: 32 ordinære seire, én overtidsseier, seks uavgjorte/overtidstap og 16 tap, målforskjell 247–156.',
      'Furuset leide seg inn her i 1990/91. Senere har Storhamars offisielle kamper i hallen i hovedsak vært mot Lørenskog.',
    ],
    tags: ['Lørenskog'],
  }),
  arena({
    id: 'arena-dnb-arena', title: 'DNB Arena', slug: 'dnb-arena', city: 'Stavanger', opened: '2012',
    summary: 'Stavanger Oilers moderne hjemmebane og en av de vanskeligste bortearenaene i Storhamars nyere historie.',
    body: [
      'DNB Arena åpnet i 2012 og har vært en sentral finalearena i rivaliseringen mellom Stavanger Oilers og Storhamar.',
      'SIL-arkivets oversikt fører 50 kamper med 17 ordinære seire, to overtidsseire, ett uavgjort/overtidstap og 30 tap, målforskjell 115–154.',
      'Storhamar spilte NM-finalekamper her i 2015, 2022 og 2023.',
    ],
    tags: ['Stavanger Oilers', 'NM-finale'],
  }),
  arena({
    id: 'arena-furuset-ishall', title: 'Furuset Ishall', slug: 'furuset-ishall', city: 'Oslo', opened: '1977', closed: '1998',
    summary: 'Liten og intim Furuset-arena som ofte ble byttet ut med Jordal når de største kampene trakk mye publikum.',
    body: [
      'Furuset Ishall ble bygget etter at den midlertidige Furusetbobla forsvant. Hallen hadde få fasiliteter og tribune bare på én side.',
      'SIL-arkivet fører 25 Storhamar-kamper her: ti seire, fem uavgjorte/overtidstap og ti tap, målforskjell 95–118.',
      'Hallen ble revet i 1998 da IKEA overtok tomta.',
    ],
    tags: ['Furuset'],
  }),
  arena({
    id: 'arena-tonsberg-ishall', title: 'Tønsberg Ishall', slug: 'tonsberg-ishall', city: 'Tønsberg', opened: '1995',
    summary: 'En liten elitearena der Storhamar historisk hadde overraskende svak uttelling.',
    body: [
      'Tønsberg Ishall ble elitearena i 2012. SIL-arkivets oversikt fører fem Storhamar-kamper her, med to ordinære seire og tre tap, målforskjell 16–15.',
      'Alle de registrerte kampene var mot Tønsberg Vikings.',
    ],
    tags: ['Tønsberg Vikings'],
  }),
]

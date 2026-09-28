import type {
  ArchiveEuropeCampaign,
  ArchiveHonour,
  ArchiveJersey,
  ArchiveLegend,
  ArchivePerson,
  ArchiveRecord,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'
const olAmfiId = 'arena-hamar-ol-amfi'
const goldenJerseyId = 'jersey-1989-98'
const dragonsJerseyId = 'jersey-1998-02'

export const seasons1997To2000: ArchiveSeason[] = [
  {
    id: 'season-1997-98', title: '1997/98', slug: '1997-98', displayName: '1997/98', startYear: 1997, endYear: 1998,
    summary: 'Storhamar tok 2. plass i serien, nådde NM-finalen og debuterte i European Hockey League med seier over SC Bern.',
    body: [
      'Etter tre strake NM-gull gikk Storhamar inn i en ny fase. Laget var fortsatt helt i toppen og endte som nummer to i Eliteserien med 67 poeng på 44 kamper, bare tre poeng bak Vålerenga.',
      '23. september 1997 debuterte Storhamar i European Hockey League og slo SC Bern 2–1 etter straffer hjemme. I gruppespillet kom også en sterk 3–1-seier over VEU Feldkirch, som senere vant hele EHL-turneringen.',
      'I NM-sluttspillet slo Storhamar Stjernen 3–0 i semifinalekamper, men finalen mot Vålerenga endte med tre strake tap. Pål Johnsen er ført som sesongens poengkonge med 57 poeng i SIL-arkivets sesongoversikt.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'europe', id: 'europe-1997-98-ehl' },
      { kind: 'player', id: 'player-pal-johnsen' },
      { kind: 'player', id: 'player-tomas-berg' },
      { kind: 'legend', id: 'legend-erik-kristiansen' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Eliteserien', 'NM-sluttspill', 'European Hockey League'], coaches: ['Petter Thoresen'], captains: ['Petter Salsten'], roster: [],
    standings: [{ competition: 'Eliteserien', position: 2, gamesPlayed: 44, wins: 32, draws: 3, losses: 9, goalsFor: 213, goalsAgainst: 92, points: 67 }],
    playoffSummary: 'NM-finale. Tap 0–3 i kamper mot Vålerenga.',
    europeSummary: '3. plass i EHL-gruppe C etter seire mot SC Bern og VEU Feldkirch.',
    topScorers: [{ personId: 'player-pal-johnsen', points: 57, note: 'SIL-arkivets hovedoversikt.' }],
    honourIds: [], jerseyIds: [goldenJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-1997-ehl-debut', 'timeline-1998-final-loss'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1998-99', title: '1998/99', slug: '1998-99', displayName: '1998/99', startYear: 1998, endYear: 1999,
    summary: 'Storhamar tok tilnavnet Dragons, ble nummer to i serien, nådde NM-finalen og avanserte i Europa for første gang.',
    body: [
      'Høsten 1998 ble Storhamar markedsført som Storhamar Dragons. Det visuelle uttrykket ble endret kraftig, med Jofa-drakter dominert av flammer, skrå linjer og drageprofil.',
      'Sportslig holdt laget seg helt i toppen. Storhamar endte på 2. plass og nådde NM-finalen. Semifinalen mot Trondheim måtte helt til femte kamp, før Storhamar vant 6–3. Finalen mot Vålerenga startet med to Storhamar-seire, men VIF snudde og vant finaleserien 3–2.',
      'Continental Cup ga et historisk gjennombrudd. Storhamar vant alle tre kampene i kvartfinalegruppen i Amiens og slo hjemmelaget 4–3 i gruppefinalen. Det var klubbens første avansement i Europa. I semifinalepuljen i Düsseldorf ble det én seier og to tap.',
      'Tomas Berg var sesongens poengkonge i SIL-arkivets hovedoversikt med 63 poeng.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'jersey', id: dragonsJerseyId },
      { kind: 'europe', id: 'europe-1998-99-continental-cup' },
      { kind: 'player', id: 'player-tomas-berg' },
      { kind: 'timeline', id: 'timeline-1998-dragons' },
      { kind: 'timeline', id: 'timeline-1998-first-europe-advance' },
    ],
    competitions: ['Eliteserien', 'NM-sluttspill', 'Continental Cup'], coaches: ['Petter Thoresen'], captains: ['Petter Salsten'], roster: [],
    standings: [{ competition: 'Eliteserien', position: 2 }],
    playoffSummary: 'NM-finale. Tap 2–3 i kamper mot Vålerenga etter å ha ledet finaleserien 2–0.',
    europeSummary: 'Vant kvartfinalegruppen i Amiens og avanserte til semifinalepuljen i Düsseldorf.',
    topScorers: [{ personId: 'player-tomas-berg', points: 63, note: 'SIL-arkivets hovedoversikt.' }],
    honourIds: [], jerseyIds: [dragonsJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-1998-dragons', 'timeline-1998-first-europe-advance', 'timeline-1999-erik-number-20'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1999-00', title: '1999/00', slug: '1999-00', displayName: '1999/00', startYear: 1999, endYear: 2000,
    summary: 'Storhamar ble nummer to i serien og tok sitt fjerde NM-gull etter en dramatisk finaleseier over Vålerenga.',
    body: [
      'Storhamar Dragons endte nok en gang som nummer to i Eliteserien, men traff formen i sluttspillet. Sparta ble slått 3–0 i semifinalekamper.',
      'Finalen mot Vålerenga startet med et dramatisk 4–5-tap etter tre sudden death-perioder. Storhamar svarte med tre strake seire: 5–4 hjemme, 4–3 på Jordal og til slutt 3–2 i Hamar OL-Amfi 6. april 2000.',
      'Det var klubbens fjerde NM-gull. SIL-arkivets historietekst trekker fram Tom Erik Olsen som den store helten med to mål i den avgjørende kampen foran nesten 7000 tilskuere.',
      'Pål Johnsen var sesongens poengkonge med 76 poeng i SIL-arkivets hovedoversikt og ble etter sesongen tildelt Gullpucken.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'honour', id: 'honour-2000-nm' },
      { kind: 'player', id: 'player-pal-johnsen' },
      { kind: 'legend', id: 'legend-tom-erik-olsen' },
      { kind: 'jersey', id: dragonsJerseyId },
      { kind: 'europe', id: 'europe-1999-00-continental-cup' },
    ],
    competitions: ['Eliteserien', 'NM-sluttspill', 'Continental Cup'], coaches: ['Petter Thoresen'], captains: [], roster: [],
    standings: [{ competition: 'Eliteserien', position: 2 }],
    playoffSummary: 'Norgesmester. Vant finalen 3–1 i kamper mot Vålerenga.',
    europeSummary: 'Continental Cup. SIL-arkivet dokumenterer seks europeiske kamper denne sesongen; kampanjen holdes delvis verifisert til alle kampdetaljer er avstemt.',
    topScorers: [{ personId: 'player-pal-johnsen', points: 76, note: 'SIL-arkivets hovedoversikt.' }],
    honourIds: ['honour-2000-nm'], jerseyIds: [dragonsJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-1999-erik-number-20', 'timeline-2000-fourth-nm', 'timeline-2000-gullpuck-pal'], lastVerifiedAt: verifiedAt,
  },
]

export const honours1997To2000: ArchiveHonour[] = [
  {
    id: 'honour-2000-nm', title: 'Norgesmester 2000', slug: 'norgesmester-2000',
    summary: 'Storhamars fjerde kongepokal etter 3–1 i finalekamper mot Vålerenga.',
    body: [
      'Storhamar tapte den første finalen 4–5 etter tre sudden death-perioder, men vant deretter tre kamper på rad.',
      '6. april 2000 ble mesterskapet sikret med 3–2 hjemme i Hamar OL-Amfi. Det var klubbens første NM-gull siden 1997 og det store høydepunktet i den første Dragons-perioden.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1999-00' }, { kind: 'arena', id: olAmfiId }],
    honourType: 'norwegian-championship', seasonId: 'season-1999-00', year: 2000, competition: 'NM-sluttspill', finalOpponent: 'Vålerenga', decidingGame: 'Storhamar Dragons – Vålerenga 3–2, 06.04.2000', keyPersonIds: ['legend-tom-erik-olsen', 'player-pal-johnsen'], lastVerifiedAt: verifiedAt,
  },
]

export const jerseys1997To2000: ArchiveJersey[] = [
  {
    id: dragonsJerseyId, title: '1998–02 · Jofa Dragons', slug: '1998-02-jofa-dragons',
    summary: 'Den store visuelle omleggingen: Storhamar tok Dragons-navnet og gikk fra rette klassiske linjer til flammer, skrå linjer og drageprofil.',
    body: [
      'I 1998 tok Storhamar tilnavnet Dragons og forlot samtidig gullalderens klassiske draktdesign. Jofa leverte den nye profilen, som ble særlig populær blant yngre supportere.',
      'Draktperioden ble tett knyttet til framgang i Europa, NM-gullet i 2000 og seriegullet i 2001. 1999/00-varianten fikk en mindre drage/logo enn den første 1998/99-utgaven.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [
      {
        id: 'media-jersey-1998-99', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/98-99.png?resize=750%2C473',
        alt: 'Storhamar Dragons Jofa-drakt fra 1998/99', caption: '1998/99-varianten – første sesong med Dragons-profilen.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/1998-02/',
        seasonIds: ['season-1998-99'], personIds: ['legend-tom-erik-olsen', 'player-ole-eskild-dahlstrom', 'player-pal-johnsen', 'player-petter-salsten'], tags: ['Dragons', 'Jofa', '1998-99'],
        rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
      },
      {
        id: 'media-jersey-1999-00', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/99-00.png?resize=750%2C473',
        alt: 'Storhamar Dragons Jofa-drakt fra 1999/00', caption: '1999/00-varianten med minimalisert drage/logo – drakten fra NM-gullet i 2000.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/1998-02/',
        seasonIds: ['season-1999-00'], personIds: ['legend-tom-erik-olsen', 'player-ole-eskild-dahlstrom', 'player-pal-johnsen', 'player-petter-salsten'], tags: ['Dragons', 'Jofa', '1999-00', 'NM-gull 2000'],
        rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
      },
    ],
    related: [{ kind: 'season', id: 'season-1998-99' }, { kind: 'season', id: 'season-1999-00' }, { kind: 'honour', id: 'honour-2000-nm' }],
    fromSeasonId: 'season-1998-99', toSeasonId: 'season-2001-02', seasonIds: ['season-1998-99', 'season-1999-00'], usage: ['home', 'away'], manufacturer: 'Jofa', colours: ['gul', 'blå'],
    playerIds: ['legend-tom-erik-olsen', 'player-ole-eskild-dahlstrom', 'player-pal-johnsen', 'player-petter-salsten'], notableMomentIds: ['timeline-1998-dragons', 'timeline-1998-first-europe-advance', 'timeline-2000-fourth-nm'], tags: ['Dragons-perioden'], lastVerifiedAt: verifiedAt,
  },
]

export const legends1997To2000: ArchiveLegend[] = [
  {
    id: 'legend-erik-kristiansen', title: 'Erik Kristiansen', fullName: 'Erik Kristiansen', slug: 'erik-kristiansen-i-taket',
    summary: '«Mester Erik» – en av de største spillerne i Storhamar-historien. Nummer 20 ble hengt i taket 6. november 1999.',
    body: [
      'Erik Kristiansen var den store egenproduserte stjernen i reisen fra etableringen i toppen til gullalderen. Han var klubbens offensive symbol gjennom store deler av 1980- og 90-tallet.',
      '6. november 1999 ble drakt nummer 20 hengt i taket i forbindelse med den første testimonialmarkeringen i Storhamar-historien. Banneret gjorde ham til en av de formelt hedrede legendene i hallen.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'timeline', id: 'timeline-1999-erik-number-20' }],
    birthPlace: 'Hamar', position: 'Løper', shirtNumbers: [20], storhamarPeriods: [{ fromSeasonId: 'season-1977-78', toSeasonId: 'season-1997-98' }], seasonIds: ['season-1997-98'], honourIds: ['honour-1995-league', 'honour-1995-nm', 'honour-1996-nm', 'honour-1997-league', 'honour-1997-nm'], roles: ['spiller', 'hedret draktnummer'], honouredNumber: 20, honouredAt: '1999-11-06', honourReason: 'Lang Storhamar-karriere og en av klubbens største egenutviklede profiler.', lastVerifiedAt: verifiedAt,
  },
]

export const players1997To2000: ArchivePerson[] = [
  {
    id: 'player-tomas-berg', title: 'Tomas Berg', fullName: 'Tomas Berg', slug: 'tomas-berg',
    summary: 'Den lille svenske «Mini» satte farge på Storhamar med teknikk, kreativitet og avgjørende mål i EHL og sluttspill.',
    body: [
      'Berg kom til Storhamar i 1997 som del av den store svenskebølgen etter Bosmandommen. Han scoret sitt første Storhamar-mål da han avgjorde EHL-debuten mot SC Bern på straffer.',
      'I 1998/99 ble han sesongens poengkonge i SIL-arkivets hovedoversikt. I den andre NM-finalen mot Vålerenga sto han bak fem av Storhamars seks mål.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-1997-98-ehl' }, { kind: 'season', id: 'season-1998-99' }],
    born: '1965-01-25', birthPlace: 'Bromma', nationality: 'Sverige', position: 'Løper', shirtNumbers: [24], storhamarPeriods: [{ fromSeasonId: 'season-1997-98', toSeasonId: 'season-1998-99' }], seasonIds: ['season-1997-98', 'season-1998-99'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-joakim-persson', title: 'Joakim Persson', fullName: 'Joakim Persson', slug: 'joakim-persson',
    summary: 'Hardtarbeidende svensk ving som kom til Storhamar i 1997 og senere ble både norgesmester og seriemester.',
    body: [
      'Persson kom fra Östervåla og ble kjent for høy innsats og lojalitet. Han representerte Storhamar i flere perioder og var en del av laget som tok NM-gull i 2000.',
      'I Continental Cup-semifinalen mot Dukla Trenčín i 1998 scoret han Storhamars mål i 1–2-tapet.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-1998-99-continental-cup' }, { kind: 'honour', id: 'honour-2000-nm' }],
    born: '1974-07-09', birthPlace: 'Uppsala', nationality: 'Sverige', position: 'Løper', shirtNumbers: [14, 25, 44], storhamarPeriods: [{ fromSeasonId: 'season-1997-98', toSeasonId: 'season-1998-99' }, { fromSeasonId: 'season-2000-01', toSeasonId: 'season-2004-05' }], seasonIds: ['season-1997-98', 'season-1998-99'], honourIds: ['honour-2000-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
]

export const europe1997To2000: ArchiveEuropeCampaign[] = [
  {
    id: 'europe-1997-98-ehl', title: 'European Hockey League 1997/98', slug: 'ehl-1997-98',
    summary: 'Storhamars EHL-debut: seire over SC Bern og VEU Feldkirch og 3. plass i gruppe C.',
    body: [
      'Storhamar åpnet EHL med 2–1 over SC Bern etter straffer 23. september 1997. Tomas Berg avgjorde straffekonkurransen.',
      'Deretter fulgte en sterk 3–1-seier hjemme mot VEU Feldkirch. Mot Kölner Haie ble det 1–5 borte og 2–3 hjemme, mens returoppgjørene mot Feldkirch og Bern endte 0–3 og 1–4.',
      'Storhamar endte på 3. plass i gruppe C med fem poeng og målforskjell 9–17. Feldkirch og Kölner Haie gikk videre.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1997-98' }, { kind: 'timeline', id: 'timeline-1997-ehl-debut' }],
    seasonId: 'season-1997-98', competition: 'European Hockey League', stage: 'Gruppespill, gruppe C', opponentNames: ['SC Bern', 'VEU Feldkirch', 'Kölner Haie'], gameIds: [], outcome: '3. plass: 1 ordinær seier, 1 straffeseier, 4 tap; mål 9–17, 5 poeng.', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'europe-1998-99-continental-cup', title: 'Continental Cup 1998/99', slug: 'continental-cup-1998-99',
    summary: 'Storhamars første europeiske avansement: gruppeseier i Amiens og semifinale i Düsseldorf.',
    body: [
      'I kvartfinalegruppen i Amiens vant Storhamar 6–4 mot Nijmegen Tigers, 3–2 mot Frisk Asker og 4–3 mot vertslaget Gothiques d’Amiens. Tre seire av tre ga gruppeseier med 13–9 i målforskjell.',
      'Seieren over Amiens 11. oktober 1998 markerte klubbens første avansement i Europa. Petter Salsten scoret vinnermålet til 4–3 i tredje periode.',
      'Semifinalepuljen i Düsseldorf ga 1–2 mot Dukla Trenčín, 4–7 mot Düsseldorfer EG og 6–2 mot Stadion Liberec. Storhamar endte på 3. plass i gruppa.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1998-99' }, { kind: 'timeline', id: 'timeline-1998-first-europe-advance' }],
    seasonId: 'season-1998-99', competition: 'Continental Cup', stage: 'Kvartfinale og semifinale', opponentNames: ['Nijmegen Tigers', 'Frisk Asker', 'Gothiques d’Amiens', 'Dukla Trenčín', 'Düsseldorfer EG', 'Stadion Liberec'], gameIds: [], outcome: 'Vant kvartfinalegruppen og endte på 3. plass i semifinalepuljen.', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'europe-1999-00-continental-cup', title: 'Continental Cup 1999/00', slug: 'continental-cup-1999-00',
    summary: 'Storhamar deltok i Continental Cup også i NM-gullsesongen. Avansement er dokumentert, mens komplett kamp-for-kamp-data kvalitetssikres videre.',
    body: [
      'SIL-arkivets draktdatabase og spillerstatistikker dokumenterer både avansement i Continental Cup i 1999 og seks europeiske kamper i 1999/00-sesongen.',
      'Den separate kampoversikten var ikke fullt tilgjengelig i denne researchrunden. Kampanjen beholdes derfor som partial framfor å konstruere motstandere eller resultater.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1999-00' }, { kind: 'jersey', id: dragonsJerseyId }],
    seasonId: 'season-1999-00', competition: 'Continental Cup', opponentNames: [], gameIds: [], outcome: 'Avansement dokumentert; komplett kampoversikt under videre kildekontroll.', lastVerifiedAt: verifiedAt,
  },
]

export const records1997To2000: ArchiveRecord[] = [
  {
    id: 'record-1998-first-europe-advance', title: 'Første europeiske avansement', slug: '1998-forste-europeiske-avansement',
    summary: '11. oktober 1998 slo Storhamar Amiens 4–3 og vant Continental Cup-gruppen med tre seire av tre.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-1998-99-continental-cup' }], recordType: 'team', value: 'Første avansement i Europa', date: '1998-10-11', seasonId: 'season-1998-99', lastVerifiedAt: verifiedAt,
  },
]

export const timeline1997To2000: ArchiveTimelineEvent[] = [
  {
    id: 'timeline-1997-ehl-debut', title: 'Debut i European Hockey League', slug: '1997-ehl-debut',
    summary: '23. september 1997 slo Storhamar SC Bern 2–1 etter straffer i klubbens EHL-debut.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-1997-98-ehl' }], date: '1997-09-23', year: 1997, era: 'Nye utfordringer', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1998-final-loss', title: 'NM-finale mot Vålerenga', slug: '1998-nm-finale',
    summary: 'Storhamar slo Stjernen 3–0 i semifinalen, men tapte NM-finalen 0–3 i kamper mot Vålerenga.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1997-98' }], year: 1998, era: 'Nye utfordringer', importance: 'context', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1998-dragons', title: 'Storhamar blir Dragons', slug: '1998-dragons',
    summary: 'Høsten 1998 tok Storhamar tilnavnet Dragons og lanserte et helt nytt visuelt uttrykk med Jofa-drakter og drageprofil.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: dragonsJerseyId }, { kind: 'season', id: 'season-1998-99' }], year: 1998, era: 'Nye utfordringer', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1998-first-europe-advance', title: 'Første avansement i Europa', slug: '1998-forste-avansement-europa',
    summary: '11. oktober 1998 slo Storhamar Gothiques d’Amiens 4–3 og vant Continental Cup-gruppen i Frankrike.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-1998-99-continental-cup' }, { kind: 'record', id: 'record-1998-first-europe-advance' }], date: '1998-10-11', year: 1998, era: 'Nye utfordringer', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1999-erik-number-20', title: 'Erik Kristiansens nummer 20 i taket', slug: '1999-erik-20-i-taket',
    summary: '6. november 1999 ble Erik Kristiansen hedret med testimonial og drakt nummer 20 ble hengt i taket.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'legend', id: 'legend-erik-kristiansen' }], date: '1999-11-06', year: 1999, era: 'Nye utfordringer', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-2000-fourth-nm', title: 'Fjerde NM-gull', slug: '2000-fjerde-nm-gull',
    summary: '6. april 2000 slo Storhamar Vålerenga 3–2 hjemme og vant finaleserien 3–1.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2000-nm' }, { kind: 'arena', id: olAmfiId }], date: '2000-04-06', year: 2000, era: 'Nye utfordringer', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-2000-gullpuck-pal', title: 'Gullpucken til Pål Johnsen', slug: '2000-gullpuck-pal',
    summary: 'Etter NM-gullsesongen 1999/00 ble Pål Johnsen tildelt Gullpucken.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-pal-johnsen' }, { kind: 'season', id: 'season-1999-00' }], year: 2000, era: 'Nye utfordringer', importance: 'notable', lastVerifiedAt: verifiedAt,
  },
]

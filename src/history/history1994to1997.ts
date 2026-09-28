import type {
  ArchiveEuropeCampaign,
  ArchiveHonour,
  ArchivePerson,
  ArchiveRecord,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'
const olAmfiId = 'arena-hamar-ol-amfi'
const goldenJerseyId = 'jersey-1989-98'

export const seasons1994To1997: ArchiveSeason[] = [
  {
    id: 'season-1994-95', title: '1994/95', slug: '1994-95', displayName: '1994/95', startYear: 1994, endYear: 1995,
    summary: 'Sesongen da ventetiden tok slutt: Storhamar vant serien og ble norgesmester for første gang.',
    body: [
      'Etter finaletapet året før var målet klart: kongepokalen. Göran Sjöberg tok over som trener, Jim Marthinsen ble hentet inn på keeperplass og laget var sterkere og mer modent enn noen gang.',
      'Storhamar vant Eliteserien. 22. januar 1995 ble seriemesterskapet sikret etter 9–2 hjemme mot Trondheim. Martin Åhlberg leverte 73 poeng og 50 mål inkludert sluttspillet.',
      '23. mars 1995 kom det store øyeblikket. Storhamar slo Stjernen og vant finaleserien 3–0. Kaptein Petter Salsten ga kongepokalen rett videre til Erik Kristiansen, som endelig kunne kalles «Mester» også i bokstavelig forstand.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'honour', id: 'honour-1995-league' }, { kind: 'honour', id: 'honour-1995-nm' }, { kind: 'player', id: 'player-petter-salsten' }, { kind: 'player', id: 'player-martin-ahlberg' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Eliteserien', 'NM-sluttspill'], coaches: ['Göran Sjöberg'], captains: ['Petter Salsten'], roster: [], standings: [{ competition: 'Eliteserien', position: 1, note: 'Seriemester' }],
    playoffSummary: 'Norgesmester. Vant finalen 3–0 i kamper mot Stjernen.',
    topScorers: [{ personId: 'player-martin-ahlberg', points: 73, goals: 50, note: 'Serie og sluttspill inkludert.' }, { personId: 'player-erik-kristiansen', assists: 28, note: 'Flest assist, serie og sluttspill inkludert.' }],
    honourIds: ['honour-1995-league', 'honour-1995-nm'], jerseyIds: [goldenJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-1995-first-nm', 'timeline-1995-league'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1995-96', title: '1995/96', slug: '1995-96', displayName: '1995/96', startYear: 1995, endYear: 1996,
    summary: 'En svak start ble snudd til nytt NM-gull. Storhamar debuterte også i Europacupen og nådde semifinalerunden.',
    body: [
      'Tittelforsvaret startet tungt og kulminerte med at Göran Sjöberg forlot trenerjobben. Petter Thoresen gikk nesten direkte fra spiller til trener og fikk en bratt læringskurve.',
      'Storhamar endte på 3. plass i serien, men traff toppformen i sluttspillet. Ole Eskild Dahlstrøm leverte et enormt sluttspill og sesongen endte med 80 poeng og 40 mål/40 assist når sluttspillet regnes med.',
      '24. mars 1996 ble Storhamar norgesmester for andre gang etter 3–0 i finalekamper mot Vålerenga. Samme sesong hadde klubben debutert i Europacupen på hjemmeis mot Sokil Kyiv, HC Košice og HV71.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'honour', id: 'honour-1996-nm' }, { kind: 'europe', id: 'europe-1995-96' }, { kind: 'player', id: 'player-ole-eskild-dahlstrom' }, { kind: 'player', id: 'player-petter-thoresen' }],
    competitions: ['Eliteserien', 'NM-sluttspill', 'Europa Cup'], coaches: ['Göran Sjöberg', 'Petter Thoresen'], captains: ['Petter Salsten'], roster: [], standings: [{ competition: 'Eliteserien', position: 3 }],
    playoffSummary: 'Norgesmester. Vant finalen 3–0 i kamper mot Vålerenga.', europeSummary: 'Europacup-debut og 3. plass i semifinalepuljen på Hamar.',
    topScorers: [{ personId: 'player-ole-eskild-dahlstrom', points: 80, goals: 40, assists: 40, note: 'Serie og sluttspill inkludert; Europacup ikke medregnet.' }],
    honourIds: ['honour-1996-nm'], jerseyIds: [goldenJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-1995-europe-debut', 'timeline-1996-second-nm'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1996-97', title: '1996/97', slug: '1996-97', displayName: '1996/97', startYear: 1996, endYear: 1997,
    summary: 'En av de mest dominerende Storhamar-sesongene noensinne: seriegull, tredje NM-gull på rad og Europacup-semifinale.',
    body: [
      'Storhamar dominerte norsk hockey. I serien tok laget 68 av 72 mulige poeng med 33 seire, to uavgjorte og bare ett tap. Målforskjellen var 252–58.',
      'Laget satte klubbrekord med 32 seriekamper uten tap og 40 uten tap når sluttspillet tas med. Ole Eskild Dahlstrøm satte ny klubbrekord med 92 poeng når alle turneringer regnes sammen; i serie og sluttspill fører SIL 88 poeng.',
      'Sluttspillet ga tredje NM-gull på rad. Vålerenga ble slått 3–1 i finalekamper. Også i Europacupen nådde Storhamar semifinalerunden, og sesongen beskrives av SIL-arkivet som tidenes jubelsesong.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'honour', id: 'honour-1997-league' }, { kind: 'honour', id: 'honour-1997-nm' }, { kind: 'europe', id: 'europe-1996-97' }, { kind: 'player', id: 'player-ole-eskild-dahlstrom' }, { kind: 'player', id: 'player-pal-johnsen' }],
    competitions: ['Eliteserien', 'NM-sluttspill', 'Europa Cup'], coaches: ['Petter Thoresen'], captains: ['Petter Salsten'], roster: [],
    standings: [{ competition: 'Eliteserien', position: 1, gamesPlayed: 36, wins: 33, draws: 2, losses: 1, goalsFor: 252, goalsAgainst: 58, points: 68, note: 'Seriemester' }],
    playoffSummary: 'Norgesmester. Vant finalen 3–1 i kamper mot Vålerenga.', europeSummary: 'Nådde semifinalerunden i Europacupen.',
    topScorers: [{ personId: 'player-ole-eskild-dahlstrom', points: 88, assists: 59, note: 'Serie og sluttspill inkludert; 92 poeng når alle turneringer medregnes.' }, { personId: 'legend-tom-erik-olsen', goals: 42, note: 'Flest mål i serie og sluttspill.' }],
    honourIds: ['honour-1997-league', 'honour-1997-nm'], jerseyIds: [goldenJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-1997-third-straight-nm', 'timeline-1997-unbeaten-streak'], lastVerifiedAt: verifiedAt,
  },
]

export const honours1994To1997: ArchiveHonour[] = [
  {
    id: 'honour-1995-league', title: 'Seriemester 1994/95', slug: 'seriemester-1994-95', summary: 'Storhamar vant Eliteserien og sikret seriemesterskapet 22. januar 1995.',
    body: ['Seriegullet ble sikret etter 9–2 hjemme mot Trondheim. Det ga laget den beste mulige inngangen til jakten på klubbens første kongepokal.'], completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1994-95' }], honourType: 'league-championship', seasonId: 'season-1994-95', year: 1995, competition: 'Eliteserien', decidingGame: 'Storhamar – Trondheim 9–2, 22.01.1995', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-1995-nm', title: 'Norgesmester 1995', slug: 'norgesmester-1995', summary: 'Storhamars første NM-gull og første kongepokal, sikret 23. mars 1995.',
    body: ['Storhamar slo Stjernen 3–0 i finaleserien. I den avgjørende kampen ble Stjernen slått 6–1 i Hamar OL-Amfi.', 'Kaptein Petter Salsten overlot pokalen umiddelbart til Erik Kristiansen, et av de mest symbolske øyeblikkene i klubbhistorien.'], completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1994-95' }, { kind: 'arena', id: olAmfiId }], honourType: 'norwegian-championship', seasonId: 'season-1994-95', year: 1995, competition: 'NM-sluttspill', finalOpponent: 'Stjernen', decidingGame: 'Storhamar – Stjernen 6–1, 23.03.1995', keyPersonIds: ['player-petter-salsten', 'player-erik-kristiansen'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-1996-nm', title: 'Norgesmester 1996', slug: 'norgesmester-1996', summary: 'Andre strake NM-gull, vunnet med 3–0 i finalekamper mot Vålerenga.',
    body: ['Etter en tung sesongstart traff Storhamar maksimalformen i sluttspillet. Petter Thoresen gikk fra trenerdebut til NM-gull på bare noen måneder.', 'Finaleserien ble avgjort på Jordal 24. mars 1996 med Storhamars tredje strake finaleseier.'], completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1995-96' }], honourType: 'norwegian-championship', seasonId: 'season-1995-96', year: 1996, competition: 'NM-sluttspill', finalOpponent: 'Vålerenga', decidingGame: 'Avgjørende finalekamp på Jordal, 24.03.1996', keyPersonIds: ['player-petter-thoresen', 'player-ole-eskild-dahlstrom'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-1997-league', title: 'Seriemester 1996/97', slug: 'seriemester-1996-97', summary: 'Storhamar dominerte Eliteserien med 68 av 72 mulige poeng.',
    body: ['Laget vant 33 av 36 kamper, spilte to uavgjort og tapte bare én. Målforskjellen 252–58 viser hvor stor avstanden til resten av ligaen var.'], completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1996-97' }], honourType: 'league-championship', seasonId: 'season-1996-97', year: 1997, competition: 'Eliteserien', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-1997-nm', title: 'Norgesmester 1997', slug: 'norgesmester-1997', summary: 'Tredje NM-gull på rad etter 3–1 i finalekamper mot Vålerenga.',
    body: ['Storhamar vant kvartfinalen og semifinalen 3–0 i kamper før Vålerenga ventet i finalen.', 'Etter fire finalekamper var tredje strake kongepokal sikret. Den siste kampen endte 4–1 på Jordal 1. april 1997.'], completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1996-97' }], honourType: 'norwegian-championship', seasonId: 'season-1996-97', year: 1997, competition: 'NM-sluttspill', finalOpponent: 'Vålerenga', decidingGame: 'Vålerenga – Storhamar 1–4, 01.04.1997', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
]

export const players1994To1997: ArchivePerson[] = [
  {
    id: 'player-petter-salsten', title: 'Petter Salsten', fullName: 'Petter Salsten', slug: 'petter-salsten',
    summary: 'Landslagsback, kaptein og en av de viktigste lederfigurene i Storhamars første gullalder.',
    body: ['Salsten kom fra Furuset foran 1993/94 og ble raskt regnet som et av klubbens beste kjøp. Han var en komplett back, sterk defensivt og farlig framover.', 'Som kaptein fikk han æren av å motta Storhamars første kongepokal i 1995, men ga den umiddelbart videre til Erik Kristiansen. Totalt vant Salsten fire NM-gull og tre seriemesterskap som Storhamar-spiller og mottok Gullpucken i 1997.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-1995-nm' }, { kind: 'arena', id: olAmfiId }],
    born: '1965-03-11', position: 'Back', shirtNumbers: [2], storhamarPeriods: [{ fromSeasonId: 'season-1993-94', toSeasonId: 'season-1999-00' }], seasonIds: ['season-1994-95', 'season-1995-96', 'season-1996-97'], honourIds: ['honour-1995-league', 'honour-1995-nm', 'honour-1996-nm', 'honour-1997-league', 'honour-1997-nm'], roles: ['spiller', 'kaptein', 'landslagsspiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-pal-johnsen', title: 'Pål Johnsen', fullName: 'Pål Johnsen', slug: 'pal-johnsen',
    summary: '«Magic» – egenprodusert storspiller som ble arvtakeren etter de tidligere Storhamar-legendene.',
    body: ['Johnsen debuterte som 16-åring i 1992/93 og scoret i sitt aller første bytt. Han vokste gradvis inn i laget og eksploderte offensivt i 1996/97 med 49 seriepoeng og 15 poeng i sluttspillet.', 'SIL-arkivet omtaler ham som sin generasjons Mr. Storhamar. Karrierefasen som begynte i gullalderen skulle til slutt gi fem NM-gull, fem seriemesterskap og Gullpucken.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1996-97' }, { kind: 'honour', id: 'honour-1997-nm' }],
    born: '1976-03-17', birthPlace: 'Hamar', position: 'Løper', shirtNumbers: [18, 29, 50], storhamarPeriods: [{ fromSeasonId: 'season-1992-93', toSeasonId: 'season-1999-00' }, { fromSeasonId: 'season-2002-03', toSeasonId: 'season-2014-15' }], seasonIds: ['season-1994-95', 'season-1995-96', 'season-1996-97'], honourIds: ['honour-1995-league', 'honour-1995-nm', 'honour-1996-nm', 'honour-1997-league', 'honour-1997-nm'], roles: ['spiller', 'egenutviklet'], lastVerifiedAt: verifiedAt,
  },
]

export const europe1994To1997: ArchiveEuropeCampaign[] = [
  {
    id: 'europe-1995-96', title: 'Europa Cup 1995/96', slug: 'europa-cup-1995-96',
    summary: 'Storhamars første Europacup: seier i debuten mot Sokil Kyiv og 3. plass i semifinalepuljen på Hamar.',
    body: ['10. november 1995 spilte Storhamar sin første Europacupkamp og slo ukrainske Sokil Kyiv 4–0 i Hamar OL-Amfi. Ole Eskild Dahlstrøm scoret klubbens første Europacupmål.', 'Deretter ble det 1–3 mot HC Košice og 1–3 mot svenske HV71. Storhamar endte med én seier og to tap, 6–6 i målforskjell og 3. plass i gruppa. HV71 gikk videre.', 'Europadebuten ga klubben verdifull erfaring mot et internasjonalt nivå Storhamar til da bare hadde møtt i treningskamper.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1995-96' }, { kind: 'arena', id: olAmfiId }, { kind: 'timeline', id: 'timeline-1995-europe-debut' }],
    seasonId: 'season-1995-96', competition: 'Europa Cup', stage: 'Semifinalepulje', opponentNames: ['Sokil Kyiv', 'HC Košice', 'HV71'], outcome: '3. plass i gruppa: 1 seier, 2 tap, mål 6–6.', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'europe-1996-97', title: 'Europa Cup 1996/97', slug: 'europa-cup-1996-97',
    summary: 'Storhamar deltok igjen i Europacupen og nådde semifinalerunden.',
    body: ['SIL-arkivets sesongoversikt bekrefter semifinalerunde i Europacupen også i 1996/97. Detaljene om alle motstandere og kampfakta skal fylles fra kampoversikten før kampanjen merkes som fullt verifisert.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1996-97' }],
    seasonId: 'season-1996-97', competition: 'Europa Cup', stage: 'Semifinale', opponentNames: [], outcome: 'Semifinalerunde. Kampdetaljer under videre kildekontroll.', lastVerifiedAt: verifiedAt,
  },
]

export const records1994To1997: ArchiveRecord[] = [
  { id: 'record-1997-32-unbeaten-league', title: '32 seriekamper uten tap', slug: '1997-32-uten-tap', summary: 'Storhamar satte klubbrekord med 32 seriekamper uten tap i 1996/97.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1996-97' }], recordType: 'streak', value: 32, unit: 'seriekamper uten tap', seasonId: 'season-1996-97', lastVerifiedAt: verifiedAt },
  { id: 'record-1997-40-unbeaten-total', title: '40 kamper uten tap med sluttspill', slug: '1997-40-uten-tap', summary: 'Når sluttspillet inkluderes nådde rekka 40 kamper uten tap.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1996-97' }], recordType: 'streak', value: 40, unit: 'kamper uten tap', seasonId: 'season-1996-97', lastVerifiedAt: verifiedAt },
  { id: 'record-1997-dahlstrom-92', title: '92 poeng av Ole Eskild Dahlstrøm', slug: '1997-dahlstrom-92', summary: 'Ole Eskild Dahlstrøm satte ny klubbrekord med 92 poeng i 1996/97 når alle turneringer regnes med.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-ole-eskild-dahlstrom' }, { kind: 'season', id: 'season-1996-97' }], recordType: 'player', value: 92, unit: 'poeng, alle turneringer', seasonId: 'season-1996-97', personIds: ['player-ole-eskild-dahlstrom'], lastVerifiedAt: verifiedAt },
]

export const timeline1994To1997: ArchiveTimelineEvent[] = [
  { id: 'timeline-1995-league', title: 'Seriegull 1994/95', slug: '1995-seriegull', summary: '22. januar 1995 sikret Storhamar seriemesterskapet med 9–2 hjemme mot Trondheim.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-1995-league' }], date: '1995-01-22', year: 1995, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1995-first-nm', title: 'Første NM-gull', slug: '1995-forste-nm-gull', summary: '23. mars 1995 ble Storhamar norgesmester for første gang etter 3–0 i finaleserien mot Stjernen.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-1995-nm' }, { kind: 'arena', id: olAmfiId }], date: '1995-03-23', year: 1995, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1995-europe-debut', title: 'Europacup-debut', slug: '1995-europacup-debut', summary: '10. november 1995 slo Storhamar Sokil Kyiv 4–0 i klubbens første Europacupkamp.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-1995-96' }], date: '1995-11-10', year: 1995, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1996-second-nm', title: 'Andre NM-gull', slug: '1996-andre-nm-gull', summary: '24. mars 1996 fullførte Storhamar 3–0 i finaleserien mot Vålerenga og tok sin andre kongepokal.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-1996-nm' }], date: '1996-03-24', year: 1996, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1997-unbeaten-streak', title: 'Historisk dominans', slug: '1997-historisk-dominans', summary: '1996/97-laget tok 68 av 72 seriepoeng og gikk 32 seriekamper uten tap.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'record', id: 'record-1997-32-unbeaten-league' }, { kind: 'season', id: 'season-1996-97' }], year: 1997, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1997-third-straight-nm', title: 'Tredje NM-gull på rad', slug: '1997-tredje-nm-gull', summary: '1. april 1997 vant Storhamar 4–1 på Jordal og sikret sin tredje strake kongepokal.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-1997-nm' }], date: '1997-04-01', year: 1997, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
]

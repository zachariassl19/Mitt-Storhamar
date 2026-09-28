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
const dragonsJerseyId = 'jersey-1998-02'

export const seasons2000To2005: ArchiveSeason[] = [
  {
    id: 'season-2000-01', title: '2000/01', slug: '2000-01', displayName: '2000/01', startYear: 2000, endYear: 2001,
    summary: 'Storhamar Dragons vant Eliteserien, men tittelforsvaret i NM stoppet i semifinalen.',
    body: [
      'Etter NM-gullet våren 2000 fortsatte Storhamar som et topplag. Sesongen endte med 1. plass i Eliteserien og klubbens neste seriemesterskap, mens sluttspillet stoppet i semifinalen.',
      '25. februar 2001 slo Storhamar Sparta 7–0 hjemme. SIL-arkivets milepælsoversikt bruker kampen som datoen seriemesterskapet ble sikret. Ole Eskild Dahlstrøm er ført som sesongens poengkonge med 65 poeng i hovedoversikten.',
      '30. november 2000 kom også en historisk 15–0-seier borte mot Furuset. SIL-arkivet omtaler resultatet som tidenes største borteseier på toppnivå på det tidspunktet.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'honour', id: 'honour-2001-league' },
      { kind: 'record', id: 'record-2000-furuset-15-0' },
      { kind: 'jersey', id: dragonsJerseyId },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Eliteserien', 'NM-sluttspill', 'Continental Cup'], coaches: ['Alexander Smirnov'], captains: ['Michael Smithurst'], roster: [],
    standings: [{ competition: 'Eliteserien', position: 1, note: 'Seriemester' }],
    playoffSummary: 'Semifinale.',
    topScorers: [{ personId: 'player-ole-eskild-dahlstrom', points: 65, note: 'SIL-arkivets hovedoversikt, sesongtotal.' }],
    honourIds: ['honour-2001-league'], jerseyIds: [dragonsJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2000-furuset-15-0', 'timeline-2001-league'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2001-02', title: '2001/02', slug: '2001-02', displayName: '2001/02', startYear: 2001, endYear: 2002,
    summary: '3. plass i serien, Continental Cup-kvartfinalerunde og NM-finale etter et trenerbytte før sluttspillet.',
    body: [
      'Storhamar endte på 3. plass i Eliteserien, første gang på seks år at laget var utenfor topp to. Rune Gulliksen startet som trener, men måtte gå før sluttspillet. Sportssjef Petter Salsten tok over.',
      'Sluttspillet ble dramatisk. På grunn av junior-VM i kunstløp måtte første kvartfinale mot Sparta spilles i Gjøvik Fjellhall. Storhamar slo Sparta 2–0 i kamper og Vålerenga 3–1 i semifinalen, før Frisk Asker vant finalen 3–2 i kamper.',
      'Sesongen ble også spesiell fordi Storhamar spilte hjemmekamper på tre arenaer: Hamar OL-Amfi, Gjøvik Fjellhall og gamle Storhamar Ishall, som fikk et kort comeback da OL-Amfi var opptatt. Tom Erik Olsen toppet SIL-arkivets sesongstatistikk med 61 poeng inkludert sluttspill.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [],
    related: [
      { kind: 'europe', id: 'europe-2001-02-continental-cup' },
      { kind: 'legend', id: 'legend-tom-erik-olsen' },
      { kind: 'player', id: 'player-michael-smithurst' },
      { kind: 'player', id: 'player-mattias-livf' },
      { kind: 'arena', id: olAmfiId },
      { kind: 'timeline', id: 'timeline-2002-three-home-arenas' },
    ],
    competitions: ['Eliteserien', 'NM-sluttspill', 'Continental Cup'], coaches: ['Rune Gulliksen', 'Petter Salsten'], captains: ['Michael Smithurst'], roster: [],
    standings: [{ competition: 'Eliteserien', position: 3, gamesPlayed: 42, wins: 29, draws: 3, losses: 10, goalsFor: 189, goalsAgainst: 101, points: 61 }],
    playoffSummary: 'NM-finale. Slo Sparta 2–0 og Vålerenga 3–1 i kamper; tapte finalen 2–3 i kamper mot Frisk Asker.',
    europeSummary: 'Continental Cup: kvartfinalerunde.',
    topScorers: [{ personId: 'legend-tom-erik-olsen', points: 61, goals: 32, note: 'SIL-arkivets sesongside, inkludert sluttspill.' }, { personId: 'player-ole-eskild-dahlstrom', assists: 36, note: 'Flest assist, inkludert sluttspill.' }],
    honourIds: [], jerseyIds: [dragonsJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2002-three-home-arenas', 'timeline-2002-nm-final'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2002-03', title: '2002/03', slug: '2002-03', displayName: '2002/03', startYear: 2002, endYear: 2003,
    summary: 'Storhamar tok 2. plass i serien og nådde NM-finalen, der Vålerenga vant finaleserien 4–0.',
    body: [
      'Under svenske Lars Molin holdt Storhamar seg i toppen og endte på 2. plass i Eliteserien. Pål Johnsen er ført som sesongens poengkonge med 46 poeng i SIL-arkivets hovedoversikt.',
      'I semifinalen slo Storhamar Frisk Asker 3–1 i kamper. Finalen mot Vålerenga ble derimot ensidig resultatmessig og endte med fire strake tap.',
      'Sesongen inneholdt også Continental Cup og en rekke internasjonale treningskamper. Arkivet beholder Europa-detaljene som delvis verifisert til hele Continental Cup-kampanjen er avstemt kamp for kamp.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'player', id: 'player-pal-johnsen' },
      { kind: 'player', id: 'player-mattias-livf' },
      { kind: 'player', id: 'player-antti-rahkonen' },
      { kind: 'player', id: 'player-mikael-tjallden' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Eliteserien', 'NM-sluttspill', 'Continental Cup'], coaches: ['Lars Molin'], captains: ['Michael Smithurst'], roster: [],
    standings: [{ competition: 'Eliteserien', position: 2 }],
    playoffSummary: 'NM-finale. Slo Frisk Asker 3–1 i semifinalen og tapte finalen 0–4 i kamper mot Vålerenga.',
    europeSummary: 'Continental Cup. Kampanjen er registrert, men beholdes delvis verifisert til alle kampdetaljer er avstemt.',
    topScorers: [{ personId: 'player-pal-johnsen', points: 46, note: 'SIL-arkivets hovedoversikt, sesongtotal.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2003-nm-final'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2003-04', title: '2003/04', slug: '2003-04', displayName: '2003/04', startYear: 2003, endYear: 2004,
    summary: 'En av de store Storhamar-sesongene: seriegull og klubbens femte NM-gull etter den legendariske sjuende finalen mot Vålerenga.',
    body: [
      'Storhamar åpnet med ti strake seire, men skader gjorde midtpartiet av sesongen vanskelig. Fra midten av januar hentet laget inn et forsprang på 13 poeng til Vålerenga og vant Eliteserien med 94 poeng, to foran VIF.',
      'I sluttspillet ble Bergen slått 3–0 i kvartfinalen og Stavanger 3–0 i semifinalen. Finalen mot Vålerenga gikk helt til kamp sju og dobbel sudden death.',
      '28. mars 2004, foran 7405 tilskuere i Hamar OL-Amfi, avgjorde Michael Smithurst kampen 2–1 etter 81 minutter og 54 sekunder. Storhamar tok sin femte kongepokal og sin første serie/NM-dobbel på sju år.',
      'Tom Erik Olsen toppet sesongstatistikken med 54 poeng og 34 mål inkludert sluttspill. Antti Rahkonen ble tatt ut på Årets lag, og Mikael Tjälldén var kaptein.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'nihf'],
    media: [{
      id: 'media-season-2003-04-sil', type: 'photo', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/0304.jpg?resize=300%2C166',
      alt: 'Storhamar Dragons i gullsesongen 2003/04', caption: 'SIL-arkivets sesongbilde fra dobbelgullet 2003/04.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/sesonger/00-tallet/2003-04/',
      seasonIds: ['season-2003-04'], tags: ['2003-04', 'seriegull', 'NM-gull'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
    }],
    related: [
      { kind: 'honour', id: 'honour-2004-league' },
      { kind: 'honour', id: 'honour-2004-nm' },
      { kind: 'player', id: 'player-michael-smithurst' },
      { kind: 'player', id: 'player-antti-rahkonen' },
      { kind: 'player', id: 'player-mikael-tjallden' },
      { kind: 'legend', id: 'legend-tom-erik-olsen' },
      { kind: 'record', id: 'record-2004-7405-attendance' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Eliteserien', 'NM-sluttspill'], coaches: ['Petter Salsten'], captains: ['Mikael Tjälldén'], roster: [],
    standings: [{ competition: 'Eliteserien', position: 1, gamesPlayed: 42, wins: 29, overtimeWins: 2, overtimeLosses: 3, losses: 8, goalsFor: 151, goalsAgainst: 87, points: 94, note: 'Seriemester' }],
    playoffSummary: 'Norgesmester. Bergen 3–0, Stavanger 3–0 og Vålerenga 4–3 i finaleserien.',
    topScorers: [{ personId: 'legend-tom-erik-olsen', points: 54, goals: 34, note: 'SIL-arkivets sesongside, inkludert sluttspill.' }, { personId: 'player-antti-rahkonen', note: 'Tatt ut på Årets lag i Eliteserien.' }],
    honourIds: ['honour-2004-league', 'honour-2004-nm'], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2004-league', 'timeline-2004-smithurst-8154'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2004-05', title: '2004/05', slug: '2004-05', displayName: '2004/05', startYear: 2004, endYear: 2005,
    summary: 'Et frustrerende tittelforsvar endte med 3. plass, NM-semifinale og Continental Cup-semifinalerunde.',
    body: [
      'Etter jubelsesongen året før slet Storhamar med måltørke, ustabilitet og skader. Klubben hentet NHL-profiler under lockouten, blant andre Calgary-kaptein Chris Clark og New York Rangers-back Mike Wilson.',
      'Petter Salsten trakk seg underveis og Petter Thoresen tok over tidligere enn planlagt. Laget endte på 3. plass i UPC-Ligaen og røk i NM-semifinalen.',
      'I Europa nådde Storhamar semifinalerunden i Continental Cup. Utenfor isen markerte klubben seg også: i oktober 2004 ble Norges første mediekube i en ishall innviet i Hamar OL-Amfi.',
      'SIL-arkivets sesongside fører Pål Johnsen med 40 poeng inkludert sluttspill, mens hovedoversikten oppgir 42. Avviket beholdes som en kildekonflikt til kampstatistikken er fullstendig avstemt.',
    ],
    completeness: 'partial', sources: ['silarkivet'],
    media: [{
      id: 'media-season-2004-05-sil', type: 'photo', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/0405.jpg?resize=300%2C175',
      alt: 'Storhamar Dragons i sesongen 2004/05', caption: 'SIL-arkivets sesongbilde fra 2004/05.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/sesonger/00-tallet/2004-05/',
      seasonIds: ['season-2004-05'], tags: ['2004-05', 'UPC-Ligaen'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
    }],
    related: [
      { kind: 'europe', id: 'europe-2004-05-continental-cup' },
      { kind: 'player', id: 'player-pal-johnsen' },
      { kind: 'player', id: 'player-mattias-livf' },
      { kind: 'player', id: 'player-antti-rahkonen' },
      { kind: 'player', id: 'player-mikael-tjallden' },
      { kind: 'timeline', id: 'timeline-2004-media-cube' },
    ],
    competitions: ['UPC-Ligaen', 'NM-sluttspill', 'Continental Cup'], coaches: ['Petter Salsten', 'Petter Thoresen'], captains: ['Mikael Tjälldén'], roster: [],
    standings: [{ competition: 'UPC-Ligaen', position: 3 }], playoffSummary: 'NM-semifinale.', europeSummary: 'Semifinalerunden i Continental Cup.',
    topScorers: [{ personId: 'player-pal-johnsen', points: 40, assists: 29, note: 'Sesongsiden oppgir 40 poeng inkl. sluttspill; SILs hovedoversikt oppgir 42 poeng.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2004-media-cube'], lastVerifiedAt: verifiedAt,
  },
]

export const honours2000To2005: ArchiveHonour[] = [
  {
    id: 'honour-2001-league', title: 'Seriemester 2000/01', slug: 'seriemester-2000-01',
    summary: 'Storhamar Dragons vant Eliteserien 2000/01. Tittelen var en av de store triumfene i den første Dragons-drakten.',
    body: ['SIL-arkivet fører Storhamar på 1. plass i 2000/01 og trekker fram 7–0-seieren mot Sparta 25. februar 2001 i milepælsoversikten for seriemesterskapet.'],
    completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [], related: [{ kind: 'season', id: 'season-2000-01' }, { kind: 'jersey', id: dragonsJerseyId }],
    honourType: 'league-championship', seasonId: 'season-2000-01', year: 2001, competition: 'Eliteserien', decidingGame: 'Storhamar Dragons – Sparta 7–0, 25.02.2001', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2004-league', title: 'Seriemester 2003/04', slug: 'seriemester-2003-04',
    summary: 'Storhamar hentet inn Vålerengas store forsprang og vant Eliteserien med 94 poeng.',
    body: ['Storhamar tok 94 poeng på 42 kamper og slo Vålerenga med to poeng i gullkampen. SIL-arkivets historiske kilder bruker ulik ordinal for hvor mange seriemesterskap dette var, så Mitt Storhamar oppgir selve tittelen uten å skjule tellekonflikten.'],
    completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [], related: [{ kind: 'season', id: 'season-2003-04' }],
    honourType: 'league-championship', seasonId: 'season-2003-04', year: 2004, competition: 'Eliteserien', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2004-nm', title: 'Norgesmester 2004', slug: 'norgesmester-2004',
    summary: 'Storhamars femte kongepokal, vunnet i en legendarisk sjuende finale mot Vålerenga.',
    body: ['Finaleserien gikk til sju kamper. I den avgjørende kampen 28. mars 2004 sto det 1–1 etter ordinær tid.', 'Etter 81 minutter og 54 sekunder satte Michael Smithurst inn 2–1 foran 7405 tilskuere i Hamar OL-Amfi. Storhamar var norgesmester og fullførte dobbelgullet.'],
    completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [], related: [{ kind: 'season', id: 'season-2003-04' }, { kind: 'player', id: 'player-michael-smithurst' }, { kind: 'record', id: 'record-2004-7405-attendance' }, { kind: 'arena', id: olAmfiId }],
    honourType: 'norwegian-championship', seasonId: 'season-2003-04', year: 2004, competition: 'NM-sluttspill', finalOpponent: 'Vålerenga', decidingGame: 'Storhamar Dragons – Vålerenga 2–1 e. dobbel sudden death, 28.03.2004', keyPersonIds: ['player-michael-smithurst'], lastVerifiedAt: verifiedAt,
  },
]

export const players2000To2005: ArchivePerson[] = [
  {
    id: 'player-michael-smithurst', title: 'Michael Smithurst', fullName: 'Michael Smithurst', slug: 'michael-smithurst',
    summary: 'Kapteinen og backen som skrev seg inn i Storhamar-historien med gullmålet på 81:54 i 2004.',
    body: ['Smithurst kom fra Frisk til Storhamar i 1999 og spilte fem sesonger. SIL-arkivet framhever seriøsiteten og lederrollen hans; han var kaptein i tre sesonger fra 2000/01 til 2002/03.', 'Karrierens definitive Storhamar-øyeblikk kom 28. mars 2004, da han fra blålinja avgjorde den sjuende NM-finalen mot Vålerenga i andre forlengningsperiode.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2004-nm' }, { kind: 'timeline', id: 'timeline-2004-smithurst-8154' }],
    born: '1971-03-12', birthPlace: 'South Tidworth, England', position: 'Back', shirtNumbers: [22], storhamarPeriods: [{ fromSeasonId: 'season-1999-00', toSeasonId: 'season-2003-04' }], seasonIds: ['season-2000-01', 'season-2001-02', 'season-2002-03', 'season-2003-04'], honourIds: ['honour-2001-league', 'honour-2004-league', 'honour-2004-nm'], roles: ['spiller', 'kaptein'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-mattias-livf', title: 'Mattias Livf', fullName: 'Mattias Livf', slug: 'mattias-livf',
    summary: 'Svensk back og ledertype som ble en Storhamar-bauta gjennom ni sesonger.',
    body: ['Livf kom til Storhamar i 2001 etter spill i Trondheim. SIL-arkivet beskriver ham som en smart, solid og arbeidsom back som etter hvert utviklet seg til en tydelig leder.', 'Han fikk først A og senere C på brystet, ble norsk statsborger i 2007 og fikk seks offisielle landskamper for Norge.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2001-02' }, { kind: 'honour', id: 'honour-2004-nm' }],
    born: '1973-02-24', nationality: 'Sverige / senere Norge', position: 'Back', shirtNumbers: [5], storhamarPeriods: [{ fromSeasonId: 'season-2001-02', toSeasonId: 'season-2009-10' }], seasonIds: ['season-2001-02', 'season-2002-03', 'season-2003-04', 'season-2004-05'], honourIds: ['honour-2004-league', 'honour-2004-nm'], roles: ['spiller', 'kaptein', 'landslagsspiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-antti-rahkonen', title: 'Antti Rahkonen', fullName: 'Antti Rahkonen', slug: 'antti-rahkonen',
    summary: 'Finsk allroundback som ble en supporterfavoritt og var blant lagets viktigste spillere i gullsesongen 2003/04.',
    body: ['Rahkonen kom til Storhamar i 2002 og fikk fem sesonger i klubben. SIL-arkivet beskriver ham som solid både offensivt og defensivt, med gode pasninger og et hardt skudd.', 'I dobbelgullsesongen 2003/04 ble han tatt ut på Årets lag i Eliteserien.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2003-04' }, { kind: 'honour', id: 'honour-2004-nm' }],
    born: '1977-01-11', birthPlace: 'Tampere, Finland', nationality: 'Finland', position: 'Back', shirtNumbers: [38], storhamarPeriods: [{ fromSeasonId: 'season-2002-03', toSeasonId: 'season-2006-07' }], seasonIds: ['season-2002-03', 'season-2003-04', 'season-2004-05'], honourIds: ['honour-2004-league', 'honour-2004-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-mikael-tjallden', title: 'Mikael Tjälldén', fullName: 'Mikael Tjälldén', slug: 'mikael-tjallden',
    summary: 'Fysisk svensk back og kaptein på Storhamars dobbelmesterlag i 2003/04.',
    body: ['Tjälldén kom i 2002 og etablerte seg som en defensiv leder. SIL-arkivet beskriver ham som en tøff, fysisk back og en naturlig leder i garderoben.', 'Han bar C-en i gullsesongen 2003/04. Storhamar-karrieren fikk senere en dramatisk avslutning etter en alvorlig hodeskade.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2003-04' }, { kind: 'honour', id: 'honour-2004-nm' }],
    born: '1975-02-16', birthPlace: 'Sollefteå, Sverige', nationality: 'Sverige', position: 'Back', shirtNumbers: [33], storhamarPeriods: [{ fromSeasonId: 'season-2002-03', toSeasonId: 'season-2005-06' }], seasonIds: ['season-2002-03', 'season-2003-04', 'season-2004-05'], honourIds: ['honour-2004-league', 'honour-2004-nm'], roles: ['spiller', 'kaptein'], lastVerifiedAt: verifiedAt,
  },
]

export const europe2000To2005: ArchiveEuropeCampaign[] = [
  {
    id: 'europe-2001-02-continental-cup', title: 'Continental Cup 2001/02', slug: 'continental-cup-2001-02',
    summary: 'Storhamar deltok i Continental Cup og nådde kvartfinalerunden.', completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2001-02' }],
    seasonId: 'season-2001-02', competition: 'Continental Cup', stage: 'Kvartfinalerunde', opponentNames: [], outcome: 'Kvartfinalerunde', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'europe-2004-05-continental-cup', title: 'Continental Cup 2004/05', slug: 'continental-cup-2004-05',
    summary: 'Storhamar nådde semifinalerunden i Continental Cup.', completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2004-05' }],
    seasonId: 'season-2004-05', competition: 'Continental Cup', stage: 'Semifinalerunde', opponentNames: [], outcome: 'Semifinalerunde', lastVerifiedAt: verifiedAt,
  },
]

export const records2000To2005: ArchiveRecord[] = [
  {
    id: 'record-2000-furuset-15-0', title: '15–0 borte mot Furuset', slug: '2000-furuset-15-0',
    summary: '30. november 2000 slo Storhamar Furuset 15–0. SIL-arkivet omtaler det som tidenes største borteseier på toppnivå på det tidspunktet.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2000-01' }],
    recordType: 'game', value: '15–0', date: '2000-11-30', seasonId: 'season-2000-01', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'record-2004-7405-attendance', title: '7405 i Hamar OL-Amfi', slug: '2004-7405-tilskuere',
    summary: '7405 tilskuere så den sjuende NM-finalen mellom Storhamar og Vålerenga 28. mars 2004.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2003-04' }, { kind: 'honour', id: 'honour-2004-nm' }, { kind: 'arena', id: olAmfiId }],
    recordType: 'attendance', value: 7405, unit: 'tilskuere', date: '2004-03-28', seasonId: 'season-2003-04', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'record-2004-smithurst-8154', title: '81:54 – gullmålet', slug: '2004-smithurst-81-54',
    summary: 'Michael Smithurst avgjorde NM-finalen på 81:54, i andre sudden death-periode.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2004-nm' }, { kind: 'player', id: 'player-michael-smithurst' }],
    recordType: 'game', value: '81:54', unit: 'kamptid', date: '2004-03-28', seasonId: 'season-2003-04', personIds: ['player-michael-smithurst'], lastVerifiedAt: verifiedAt,
  },
]

export const timeline2000To2005: ArchiveTimelineEvent[] = [
  { id: 'timeline-2000-furuset-15-0', title: '15–0 på bortebane', slug: '2000-furuset-15-0', summary: '30. november 2000 slo Storhamar Furuset 15–0 i Furuset Forum.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'record', id: 'record-2000-furuset-15-0' }], date: '2000-11-30', year: 2000, era: 'Dragons-perioden', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2001-league', title: 'Seriegull 2001', slug: '2001-seriegull', summary: 'Storhamar Dragons vant Eliteserien 2000/01.', completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [], related: [{ kind: 'honour', id: 'honour-2001-league' }], year: 2001, era: 'Dragons-perioden', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2002-three-home-arenas', title: 'Tre hjemmebaner på én sesong', slug: '2002-tre-hjemmebaner', summary: 'I 2001/02 spilte Storhamar hjemmekamper i Hamar OL-Amfi, Storhamar Ishall og Gjøvik Fjellhall på grunn av andre arrangementer i OL-Amfi.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2001-02' }], year: 2002, era: 'Dragons-perioden', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2002-nm-final', title: 'NM-finale mot Frisk', slug: '2002-nm-finale', summary: 'Storhamar slo Vålerenga i semifinalen, men tapte den femte og avgjørende finalen mot Frisk Asker 0–1.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2001-02' }], date: '2002-04-02', year: 2002, era: 'Dragons-perioden', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2003-nm-final', title: 'Ny NM-finale', slug: '2003-nm-finale', summary: 'Storhamar nådde finalen igjen, men Vålerenga vant finaleserien 4–0.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2002-03' }], year: 2003, era: 'Dragons-perioden', importance: 'context', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2004-league', title: 'Seriegull etter stor opphenting', slug: '2004-seriegull', summary: 'Storhamar hentet inn Vålerengas forsprang og vant Eliteserien med 94 poeng.', completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [], related: [{ kind: 'honour', id: 'honour-2004-league' }], year: 2004, era: 'Dragons-perioden', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2004-smithurst-8154', title: '81:54 og 7405', slug: '2004-81-54-og-7405', summary: 'Michael Smithurst avgjorde den sjuende NM-finalen på 81:54 foran 7405 tilskuere. Storhamar tok sin femte kongepokal.', completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [], related: [{ kind: 'honour', id: 'honour-2004-nm' }, { kind: 'record', id: 'record-2004-smithurst-8154' }, { kind: 'record', id: 'record-2004-7405-attendance' }], date: '2004-03-28', year: 2004, era: 'Dragons-perioden', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2004-media-cube', title: 'Norges første mediekube', slug: '2004-forste-mediekube', summary: 'I oktober 2004 innviet Storhamar Norges første mediekube i en ishall i Hamar OL-Amfi.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2004-05' }, { kind: 'arena', id: olAmfiId }], year: 2004, era: 'Dragons-perioden', importance: 'notable', lastVerifiedAt: verifiedAt },
]

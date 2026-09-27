import type {
  ArchiveArena,
  ArchiveJersey,
  ArchivePerson,
  ArchiveRecord,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'

const kunstisbaneId = 'arena-storhamar-kunstisbane'
const borstadId = 'arena-borstadbana'
const ishallId = 'arena-storhamar-ishall'

export const seasons1977To1984: ArchiveSeason[] = [
  {
    id: 'season-1977-78', title: '1977/78', slug: '1977-78', displayName: '1977/78', startYear: 1977, endYear: 1978,
    summary: 'Storhamars første sesong på øverste nivå endte med 9. plass og 2. plass i nedrykkskvalifiseringen. Klubben holdt plassen.',
    body: [
      'Storhamar debuterte i 1. divisjon etter opprykket våren 1977. Kunstisbana var reist i stor grad på dugnad, men klubben var fortsatt den eneste i toppdivisjonen som spilte utendørs.',
      'Sesongen ble en brutal læreprosess, men målet ble nådd: Storhamar overlevde kvalifiseringen og beholdt plassen. Erik Svendby scoret klubbens første mål på øverste nivå i seriepremieren mot Frisk.',
      'Finn Paulsen og Terje Kojedal er oppført som toppscorere med 15 mål når kvalifiseringen regnes med. SIL-arkivet oppgir 4363 tilskuere totalt og et snitt på 485 i denne oversikten.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'],
    media: [],
    related: [
      { kind: 'arena', id: kunstisbaneId },
      { kind: 'player', id: 'player-erik-svendby' },
      { kind: 'player', id: 'player-finn-paulsen' },
      { kind: 'timeline', id: 'timeline-1977-first-top-flight-game' },
    ],
    competitions: ['1. divisjon', 'Nedrykkskvalifisering'], coaches: ['Per Ragnar Pettersen', 'Svenn Rakstad-Larsen'], captains: [], roster: [],
    standings: [{ competition: '1. divisjon', position: 9 }, { competition: 'Nedrykkskvalifisering', position: 2, note: 'Beholdt plassen' }],
    playoffSummary: '2. plass i nedrykkskvalifiseringen og fortsatt spill i 1. divisjon.',
    topScorers: [{ personId: 'player-finn-paulsen', goals: 15, note: 'SIL-arkivet oppgir Finn Paulsen og Terje Kojedal på 15 når kvalifisering inkluderes.' }],
    honourIds: [], jerseyIds: ['jersey-1977-80'], arenaIds: [kunstisbaneId], notableMomentIds: ['timeline-1977-first-top-flight-game', 'timeline-1977-kunstisbane-opens'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1978-79', title: '1978/79', slug: '1978-79', displayName: '1978/79', startYear: 1978, endYear: 1979,
    summary: 'Andre sesong i 1. divisjon endte med 10. plass og nedrykk etter 4. plass i kvalifiseringen.',
    body: [
      'Storhamar fikk det langt tyngre i sin andre toppseriesesong. Serien endte med 10. plass etter bare to seire på 18 seriekamper, og laget måtte igjen ut i kvalifisering.',
      'Kvalifiseringen endte med 4. plass og dermed retur til 2. divisjon. Steinar Johansen er oppført som sesongens fremste målscorer med 12 mål i SIL-arkivets sesongoversikt.',
      '1979 ble samtidig et organisatorisk vendepunkt: klubben begynte å hente kompetanse og spillere utenfra i langt større grad enn tidligere.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [{ kind: 'arena', id: kunstisbaneId }, { kind: 'legend', id: 'legend-steinar-johansen' }, { kind: 'timeline', id: 'timeline-1979-relegation' }],
    competitions: ['1. divisjon', 'Nedrykkskvalifisering'], coaches: [], captains: [], roster: [],
    standings: [{ competition: '1. divisjon', position: 10 }, { competition: 'Nedrykkskvalifisering', position: 4, note: 'Nedrykk til 2. divisjon' }],
    playoffSummary: '4. plass i kvalifiseringen og nedrykk til 2. divisjon.',
    topScorers: [{ personId: 'legend-steinar-johansen', goals: 12 }], honourIds: [], jerseyIds: ['jersey-1977-80'], arenaIds: [kunstisbaneId], notableMomentIds: ['timeline-1979-relegation', 'timeline-1979-first-foreign-player-coach'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1979-80', title: '1979/80', slug: '1979-80', displayName: '1979/80', startYear: 1979, endYear: 1980,
    summary: 'Storhamar tok 2. plass i 2. divisjon, men takket nei til opprykk fordi hjemmebanen skulle bygges om til ishall.',
    body: [
      'Etter nedrykket startet byggingen av en mer profesjonell klubb. Svenske Mats Axelsson ble hentet som trener, mens Bert Lindberg og Douglas Osness fylte utlendingskvoten.',
      'Storhamar ble nummer to og hadde sportslig rett til opprykk. Klubben takket likevel nei fordi kunstisbana ikke ville være tilgjengelig mens planene om en egen ishall ble realisert.',
      'Ole-Roberth Holmen toppet laget med 25 poeng og 19 mål. Vinteren var kald og snørik, noe som ifølge SIL-arkivet bare styrket ønsket om tak over isen.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [],
    related: [{ kind: 'arena', id: kunstisbaneId }, { kind: 'player', id: 'player-ole-roberth-holmen' }, { kind: 'player', id: 'player-douglas-osness' }, { kind: 'timeline', id: 'timeline-1980-declined-promotion' }],
    competitions: ['2. divisjon'], coaches: ['Mats Axelsson'], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 2, note: 'Sportslig opprykk, men klubben takket nei' }],
    playoffSummary: 'Opprykksplass, men Storhamar takket nei fordi ishallen skulle bygges.',
    topScorers: [{ personId: 'player-ole-roberth-holmen', points: 25, goals: 19 }], honourIds: [], jerseyIds: ['jersey-1977-80'], arenaIds: [kunstisbaneId], notableMomentIds: ['timeline-1979-first-foreign-player-coach', 'timeline-1980-declined-promotion'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1980-81', title: '1980/81', slug: '1980-81', displayName: '1980/81', startYear: 1980, endYear: 1981,
    summary: 'Mens Storhamar Ishall ble bygget, spilte laget 2. divisjon med Børstadbana som midlertidig hjemmebane og endte på 4. plass.',
    body: [
      '1980/81 var den eneste sesongen i klubbhistorien i denne perioden hvor Storhamar ikke hadde hjemmebase på Hamar Vest. Kunstisbana ble bygget inn, og laget brukte en midlertidig rink på Børstad.',
      'Sportslig ble det 4. plass i 2. divisjon. Erik Kristiansen er oppført som lagets poengkonge med 35 poeng i SIL-arkivets sesongoversikt.',
      'Sesongen skal forstås som et mellomår: resultatene var ikke hovedhistorien. Den store endringen var at klubben var i ferd med å få sin første innendørs hjemmebane.',
    ],
    completeness: 'partial', sources: ['silarkivet', 'storhamar-official'], media: [],
    related: [{ kind: 'arena', id: borstadId }, { kind: 'arena', id: ishallId }, { kind: 'player', id: 'player-erik-kristiansen' }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 4 }],
    topScorers: [{ personId: 'player-erik-kristiansen', points: 35 }], honourIds: [], jerseyIds: ['jersey-1980-83'], arenaIds: [borstadId], notableMomentIds: ['timeline-1981-storhamar-ishall'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1981-82', title: '1981/82', slug: '1981-82', displayName: '1981/82', startYear: 1981, endYear: 1982,
    summary: 'Første hele sesong i Storhamar Ishall endte med seier i 2. divisjon og opprykk. Storhamar har vært på øverste nivå siden.',
    body: [
      'På fire år hadde Storhamar gått fra å ha landets svakeste anleggssituasjon blant toppklubbene til å disponere Norges nyeste ishall. Svenske Hans Westberg fikk oppgaven med å utvikle både laget og klubbkulturen.',
      'Storhamar vant 2. divisjon og sikret opprykket fire runder før slutt. Westberg stilte større krav til profesjonalitet, innsats og forberedelser enn laget tidligere hadde vært vant til.',
      'Lars Bergseng kom fra Lillehammer og ble sesongens store målscorer med 35 mål. SIL-arkivet oppgir 5742 tilskuere totalt og 522 i snitt.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'],
    media: [{
      id: 'media-season-1981-82-promotion-team', type: 'photo', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/82_lag_opprykk.jpg?resize=300%2C154',
      alt: 'Storhamars opprykkslag i 1981/82', caption: 'Opprykkslaget 1981/82.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/sesonger/80-tallet/1981-82/',
      seasonIds: ['season-1981-82'], tags: ['lagbilde', 'opprykk', '1981-82'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
    }],
    related: [{ kind: 'arena', id: ishallId }, { kind: 'player', id: 'player-lars-bergseng' }, { kind: 'timeline', id: 'timeline-1982-promotion' }],
    competitions: ['2. divisjon'], coaches: ['Hans Westberg'], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 1, note: 'Opprykk til 1. divisjon' }],
    playoffSummary: 'Seriemester i 2. divisjon og direkte opprykk.', topScorers: [{ personId: 'player-lars-bergseng', goals: 35 }], honourIds: [], jerseyIds: ['jersey-1980-83'], arenaIds: [ishallId], notableMomentIds: ['timeline-1981-storhamar-ishall', 'timeline-1982-promotion'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1982-83', title: '1982/83', slug: '1982-83', displayName: '1982/83', startYear: 1982, endYear: 1983,
    summary: 'Storhamar var tilbake i 1. divisjon, tok 9. plass og holdt plassen gjennom kvalifisering. Samtidig gikk laget over til gult og blått.',
    body: [
      '1982/83 ble et vannskille. Storhamar kom tilbake til øverste nivå og har vært der siden. Hovedlaget presset samtidig gjennom at hockeyen skulle følge klubbens tradisjonelle gule og blå farger.',
      'Sportslig ble det 9. plass og kvalifisering, men laget distanserte direkte nedrykk og slo Rosenborg i kvalifiseringen. Hans Westberg fortsatte arbeidet med å profesjonalisere klubben.',
      'Øystein Tronrud kom fra Lillehammer og ble lagets poengkonge. SIL-arkivet fører ham med 57 poeng i seriespillet. Erik Kristiansen tok sine første landskamper i denne perioden.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'],
    media: [{
      id: 'media-season-1982-83-team', type: 'photo', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/8283.jpg?resize=300%2C201',
      alt: 'Storhamar-laget i sesongen 1982/83', caption: 'Storhamar 1982/83, sesongen da klubben etablerte det gule og blå uttrykket.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/sesonger/80-tallet/1982-83/',
      seasonIds: ['season-1982-83'], tags: ['lagbilde', '1982-83', 'gult-og-blått'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
    }],
    related: [{ kind: 'arena', id: ishallId }, { kind: 'player', id: 'player-oystein-tronrud' }, { kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'identity', id: 'identity-yellow-blue-1982' }],
    competitions: ['1. divisjon', 'Nedrykkskvalifisering'], coaches: ['Hans Westberg'], captains: [], roster: [], standings: [{ competition: '1. divisjon', position: 9 }],
    playoffSummary: 'Vant kvalifiseringen og holdt plassen.', topScorers: [{ personId: 'player-oystein-tronrud', points: 57, goals: 35, assists: 22, note: 'SIL-arkivets spillerstatistikk fører 57 seriepoeng.' }], honourIds: [], jerseyIds: ['jersey-1980-83'], arenaIds: [ishallId], notableMomentIds: ['timeline-1982-promotion', 'timeline-1982-yellow-blue', 'timeline-1982-first-win-vif'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1983-84', title: '1983/84', slug: '1983-84', displayName: '1983/84', startYear: 1983, endYear: 1984,
    summary: 'En turbulent sesong endte med 7. plass og seier i kvalifiseringen. Erik Kristiansen tok et tydelig steg fram som lagets store profil.',
    body: [
      'Sesongen var turbulent, blant annet på trenersiden, men Storhamar klarte igjen å sikre plassen. Serien endte med 7. plass.',
      'For sikkerhets skyld ble det spilt kvalifisering mot Strindheim. Storhamar vant 10–1 hjemme og 14–1 borte. Senere ble ligaen utvidet slik at kvalifiseringen i praksis ikke fikk betydning for Storhamars plass.',
      'Erik Kristiansen førte an med 44 seriepoeng og totalt 53 poeng inkludert kvalifiseringen. Adidas-drakten denne sesongen var første Storhamar-drakt med Norsk Tipping-logo.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'arena', id: ishallId }, { kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'jersey', id: 'jersey-1983-84' }, { kind: 'timeline', id: 'timeline-1984-qualifier' }],
    competitions: ['1. divisjon', 'Kvalifisering'], coaches: [], captains: [], roster: [], standings: [{ competition: '1. divisjon', position: 7 }],
    playoffSummary: 'Vant kvalifiseringen mot Strindheim 24–2 sammenlagt; ligaformatet ble senere utvidet.', topScorers: [{ personId: 'player-erik-kristiansen', points: 44, goals: 24, assists: 20, note: 'Seriespill. Totalt med kvalifisering: 53 poeng.' }], honourIds: [], jerseyIds: ['jersey-1983-84'], arenaIds: [ishallId], notableMomentIds: ['timeline-1984-qualifier'], lastVerifiedAt: verifiedAt,
  },
]

export const players1977To1984: ArchivePerson[] = [
  {
    id: 'player-erik-kristiansen', title: 'Erik Kristiansen', fullName: 'Erik Kristiansen', slug: 'erik-kristiansen',
    summary: 'Egenprodusert Storhamar-profil som vokste fram til å bli lagets store offensive spiller tidlig på 1980-tallet.',
    body: ['Kristiansen var med gjennom overgangen fra 2. divisjon til den permanente etableringen i toppen. Han ble poengkonge i 1980/81 med 35 poeng og utviklet seg videre under Hans Westberg.', 'I 1982/83 tok han sine første landskamper. Sesongen etter toppet han Storhamar med 44 seriepoeng og 53 poeng inkludert kvalifiseringen.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'arena', id: ishallId }, { kind: 'season', id: 'season-1983-84' }],
    birthPlace: 'Hamar', position: 'Løper', shirtNumbers: [20], storhamarPeriods: [{ fromSeasonId: 'season-1977-78' }],
    seasonIds: ['season-1977-78', 'season-1978-79', 'season-1979-80', 'season-1980-81', 'season-1981-82', 'season-1982-83', 'season-1983-84'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-lars-bergseng', title: 'Lars Bergseng', fullName: 'Lars Bergseng', slug: 'lars-bergseng',
    summary: 'Ung Lillehammer-spiller som kom til Storhamar og ble målkonge i opprykkssesongen 1981/82.',
    body: ['Bergseng kom inn som et friskt pust under Hans Westberg og scoret 35 mål i 1981/82. Han ble en viktig del av laget som vant 2. divisjon og tok Storhamar tilbake til toppen.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1981-82' }, { kind: 'arena', id: ishallId }],
    position: 'Løper', storhamarPeriods: [{ fromSeasonId: 'season-1981-82' }], seasonIds: ['season-1981-82'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-oystein-tronrud', title: 'Øystein Tronrud', fullName: 'Øystein Tronrud', slug: 'oystein-tronrud',
    summary: 'Lillehammer-profil som ble en av Storhamars viktigste spillere etter returen til 1. divisjon.',
    body: ['Tronrud kom fra Lillehammer da Storhamar hadde fått egen hall. Overgangen var nær ved å strande på overgangssummen, men ble løst.', 'Han etablerte seg raskt og førte laget med 57 seriepoeng i 1982/83. Allerede i sin andre sesong på toppnivå fikk han landskamper.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1982-83' }, { kind: 'arena', id: ishallId }],
    born: '1958-01-16', birthPlace: 'Lillehammer', position: 'Løper', shirtNumbers: [5], storhamarPeriods: [{ fromSeasonId: 'season-1982-83', toSeasonId: 'season-1988-89' }], seasonIds: ['season-1982-83', 'season-1983-84'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-douglas-osness', title: 'Douglas Osness', fullName: 'Douglas Osness', slug: 'douglas-osness',
    summary: 'Storhamars første utenlandske spiller, hentet inn i 1979 da klubben begynte å rekruttere mer aktivt utenfra.',
    body: ['SIL-arkivets milepælsoversikt fører Douglas Osness som klubbens første utenlandske spiller i 1979. Han var del av en tydelig kursendring sammen med svenske Mats Axelsson som ble første utenlandske trener.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1979-80' }, { kind: 'timeline', id: 'timeline-1979-first-foreign-player-coach' }],
    nationality: 'Canada', position: 'Løper', seasonIds: ['season-1979-80'], honourIds: [], roles: ['spiller', 'første utenlandske spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-mikael-stahl', title: 'Mikael Ståhl', fullName: 'Mikael Ståhl', slug: 'mikael-stahl',
    summary: 'Svensk forward og en av de første utenlandske forsterkningene av virkelig toppformat i Storhamar.',
    body: ['Ståhl kom sammen med Claes Westberg foran 1982/83. SIL-arkivet beskriver dem som de to første utlendingene av skikkelig format som ble hentet til klubben.', 'Han leverte 36 mål i sin ene Storhamar-sesong og brukte oppholdet som springbrett til en sterk karriere, blant annet i MoDo.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1982-83' }, { kind: 'arena', id: ishallId }],
    born: '1962-08-09', nationality: 'Sverige', position: 'Løper', shirtNumbers: [7], storhamarPeriods: [{ fromSeasonId: 'season-1982-83', toSeasonId: 'season-1982-83' }], seasonIds: ['season-1982-83'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-morten-rakstad-larsen', title: 'Morten Rakstad-Larsen', fullName: 'Morten Rakstad-Larsen', slug: 'morten-rakstad-larsen',
    summary: 'Hardtarbeidende og allsidig Storhamar-spiller som var viktig i oppbyggingen av topphockeyen.',
    body: ['Rakstad-Larsen spilte både back og forward. I den dramatiske kvalifiseringskampen mot Lambertseter i 1978 scoret han vinnermålet 14 sekunder før slutt etter at Storhamar hadde fått tre spillere sendt til legevakt.', 'Han var del av laget gjennom både toppseriedebuten, nedrykket og byggingen mot en ny etablering i toppen.'],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'season', id: 'season-1977-78' }, { kind: 'arena', id: kunstisbaneId }],
    birthPlace: 'Hamar', position: 'Back / løper', shirtNumbers: [7, 17], storhamarPeriods: [{ fromSeasonId: 'season-1971-72', toSeasonId: 'season-1981-82' }, { fromSeasonId: 'season-1983-84', toSeasonId: 'season-1983-84' }], seasonIds: ['season-1977-78', 'season-1978-79', 'season-1979-80', 'season-1980-81', 'season-1981-82', 'season-1983-84'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
]

export const arenas1977To1984: ArchiveArena[] = [
  {
    id: kunstisbaneId, title: 'Storhamar Kunstisbane', name: 'Storhamar Kunstisbane', slug: 'storhamar-kunstisbane',
    summary: 'Klubbens første kunstfrosne hjemmebane, reist i stor grad på dugnad etter opprykket i 1977.',
    body: ['Kunstisbana var aktiv fra 1977 til 1980. Den ble reist i stor grad av spillere, ledere og medlemmer, mens fagfolk tok det tekniske arbeidet.', 'Arenaen ga Storhamar kontroll over isproduksjonen for første gang og hadde tribuner på langsidene, men laget var fortsatt eneste utendørslag i 1. divisjon.', 'SIL-arkivet fører 33 offisielle kamper: 9 seire, 5 uavgjorte og 19 tap, mål 147–195 og tilskuersnitt 393. Første kamp var 2–5 mot Lambertseter 2. november 1977.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1977-78' }, { kind: 'timeline', id: 'timeline-1977-kunstisbane-opens' }],
    city: 'Hamar', opened: '1977', closed: '1980', homeFromSeasonId: 'season-1977-78', homeToSeasonId: 'season-1979-80', notableMomentIds: ['timeline-1977-kunstisbane-opens'], tags: ['hjemmebane', 'kunstis', 'utendørs', 'dugnad'], lastVerifiedAt: verifiedAt,
  },
  {
    id: borstadId, title: 'Børstadbana', name: 'Børstadbana', slug: 'borstadbana',
    summary: 'Midlertidig hjemmebane i 1980/81 mens Storhamar Ishall ble bygget på Hamar Vest.',
    body: ['Da kunstisbana ble bygget inn til ishall måtte A-laget flytte midlertidig. SIL-arkivet beskriver 1980/81 som den eneste sesongen i denne epoken der Storhamar ikke holdt til på Hamar Vest.', 'Børstadbana var en nødløsning, men gjorde det mulig å gjennomføre sesongen mens den viktigste anleggsinvesteringen i klubbens historie til da ble fullført.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1980-81' }, { kind: 'arena', id: ishallId }],
    city: 'Hamar', opened: '1980', closed: '1981', homeFromSeasonId: 'season-1980-81', homeToSeasonId: 'season-1980-81', notableMomentIds: [], tags: ['hjemmebane', 'midlertidig'], lastVerifiedAt: verifiedAt,
  },
  {
    id: ishallId, title: 'Storhamar Ishall', name: 'Storhamar Ishall', slug: 'storhamar-ishall',
    summary: 'Hallen som ga Storhamar samme grunnleggende rammevilkår som konkurrentene og gjorde klubben til en varig toppklubb.',
    body: ['Storhamar Ishall var hovedarena fra 1981 til 1992 og ble senere brukt igjen til en elitekamp i 2002. SIL-arkivet fører 194 offisielle kamper, 125 seire og et tilskuersnitt på 1425.', 'Første seniorkamp i hallen var landskampen Norge–Leksand 12. august 1981. Hallprosjektet var komplisert og krevde både privat initiativ, kommunal lånegaranti og til slutt kommunal inngripen.', 'Sportslig ble betydningen enorm: Storhamar rykket opp første sesong innendørs og etablerte seg deretter på øverste nivå.'],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'season', id: 'season-1981-82' }, { kind: 'timeline', id: 'timeline-1981-storhamar-ishall' }],
    aliases: ['Gamlehallen'], city: 'Hamar', opened: '1981', closed: '1992', homeFromSeasonId: 'season-1981-82', homeToSeasonId: 'season-1992-93', notableMomentIds: ['timeline-1981-storhamar-ishall', 'timeline-1982-promotion'], tags: ['hjemmebane', 'ishall', 'Hamar Vest'], lastVerifiedAt: verifiedAt,
  },
]

export const jerseys1977To1984: ArchiveJersey[] = [
  {
    id: 'jersey-1977-80', title: '1977–80', slug: '1977-80',
    summary: 'Draktperioden som fulgte Storhamar gjennom de første toppseriesesongene og tilbake til 2. divisjon.',
    body: ['SIL-arkivets draktdatabase skiller 1977–80 som en egen draktperiode. Denne delen skal fylles videre med variantdetaljer og flere ekte bilder når originalsidens mediefiler er kvalitetssikret.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'arena', id: kunstisbaneId }],
    fromSeasonId: 'season-1977-78', toSeasonId: 'season-1979-80', seasonIds: ['season-1977-78', 'season-1978-79', 'season-1979-80'], usage: ['home', 'away'], colours: ['gul', 'svart'], playerIds: ['player-erik-svendby', 'legend-steinar-johansen', 'player-ole-roberth-holmen'], notableMomentIds: ['timeline-1977-first-top-flight-game'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'jersey-1980-83', title: '1980–83 · Overgangen til gult og blått', slug: '1980-83',
    summary: 'Overgangsperioden hvor Storhamar gikk fra den gamle svarte/gule hockeyidentiteten til klubbens gule og blå farger.',
    body: ['SIL-arkivets draktdatabase samler 1980–83 som en egen periode. Ved opprykket i 1982 presset hovedlaget på for at hockeyen skulle følge Storhamars tradisjonelle gule og blå klubbfarger.', 'Sesongen 1982/83 ble dermed et visuelt vannskille som fortsatt preger klubbidentiteten.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'identity', id: 'identity-yellow-blue-1982' }, { kind: 'season', id: 'season-1982-83' }],
    fromSeasonId: 'season-1980-81', toSeasonId: 'season-1982-83', seasonIds: ['season-1980-81', 'season-1981-82', 'season-1982-83'], usage: ['home', 'away'], colours: ['gul', 'svart', 'blå'], playerIds: ['player-erik-kristiansen', 'player-lars-bergseng', 'player-oystein-tronrud'], notableMomentIds: ['timeline-1982-yellow-blue'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'jersey-1983-84', title: '1983/84 · Adidas', slug: '1983-84-adidas',
    summary: 'Et tydelig Adidas-design med de klassiske stripene og den første Storhamar-drakten med Norsk Tipping-logo.',
    body: ['SIL-arkivet beskriver drakten som et tidstypisk Adidas-design med tydelige striper og en relativt stram, fotballpreget passform.', 'Hjemmedrakten ble bare brukt én sesong, mens bortedrakten fortsatte én sesong til. Norsk Tipping-logoen dukket opp for første gang og har siden vært en fast del av drakthistorien.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1983-84' }, { kind: 'player', id: 'player-erik-kristiansen' }],
    fromSeasonId: 'season-1983-84', toSeasonId: 'season-1983-84', seasonIds: ['season-1983-84'], usage: ['home', 'away'], manufacturer: 'Adidas', colours: ['gul', 'blå'], playerIds: ['player-erik-kristiansen', 'player-oystein-tronrud'], notableMomentIds: [], tags: ['Norsk Tipping', 'Adidas'], lastVerifiedAt: verifiedAt,
  },
]

export const records1977To1984: ArchiveRecord[] = [
  {
    id: 'record-1977-first-top-flight-goal', title: 'Første Storhamar-mål på øverste nivå', slug: '1977-forste-toppseriemal',
    summary: 'Erik Svendby scoret Storhamars første mål i den øverste divisjonen i seriepremieren mot Frisk i 1977.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-erik-svendby' }, { kind: 'season', id: 'season-1977-78' }], recordType: 'game', date: '1977-10-02', personIds: ['player-erik-svendby'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'record-1982-three-shorthanded-one-game', title: 'Tre undertallsmål av Erik Kristiansen i samme kamp', slug: '1982-tre-undertallsmal',
    summary: 'Mot Hasle/Løren i oktober 1982 scoret Erik Kristiansen tre ganger i samme femminutters undertall. SIL-arkivet omtaler dette som stående klubbrekord.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'season', id: 'season-1982-83' }], recordType: 'player', value: 3, unit: 'undertallsmål i samme undertall', seasonId: 'season-1982-83', personIds: ['player-erik-kristiansen'], lastVerifiedAt: verifiedAt,
  },
]

export const timeline1977To1984: ArchiveTimelineEvent[] = [
  { id: 'timeline-1977-first-top-flight-game', title: 'Første kamp i 1. divisjon', slug: '1977-forste-kamp-1-divisjon', summary: '2. oktober 1977 debuterte Storhamar på øverste nivå borte mot Frisk. Erik Svendby scoret klubbens første toppseriemål.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1977-78' }, { kind: 'record', id: 'record-1977-first-top-flight-goal' }], date: '1977-10-02', year: 1977, era: 'Omstilling og etablering', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1977-kunstisbane-opens', title: 'Første kamp på Kunstisbana', slug: '1977-kunstisbane', summary: '2. november 1977 åpnet Storhamar Kunstisbane med 2–5 mot Lambertseter foran rundt 1000 tilskuere.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'arena', id: kunstisbaneId }, { kind: 'season', id: 'season-1977-78' }], date: '1977-11-02', year: 1977, era: 'Omstilling og etablering', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1979-relegation', title: 'Nedrykk til 2. divisjon', slug: '1979-nedrykk', summary: 'Andre sesong i toppdivisjonen endte med nedrykk etter kvalifisering.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1978-79' }], year: 1979, era: 'Omstilling og etablering', importance: 'context', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1979-first-foreign-player-coach', title: 'Første utenlandske spiller og trener', slug: '1979-forste-utlendinger', summary: 'Douglas Osness ble klubbens første utenlandske spiller og Mats Axelsson den første utenlandske treneren.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-douglas-osness' }, { kind: 'season', id: 'season-1979-80' }], year: 1979, era: 'Omstilling og etablering', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1980-declined-promotion', title: 'Takket nei til opprykk', slug: '1980-takket-nei-opprykk', summary: 'Storhamar tok opprykksplass i 2. divisjon, men takket nei fordi kunstisbana skulle bygges inn til ishall.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1979-80' }, { kind: 'arena', id: ishallId }], year: 1980, era: 'Omstilling og etablering', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1981-storhamar-ishall', title: 'Storhamar Ishall åpner', slug: '1981-storhamar-ishall', summary: 'Storhamar fikk endelig tak over hodet. Første seniorkamp i hallen var Norge–Leksand 12. august 1981.', completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'arena', id: ishallId }, { kind: 'season', id: 'season-1981-82' }], date: '1981-08-12', year: 1981, era: 'Omstilling og etablering', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1982-promotion', title: 'Tilbake til 1. divisjon for godt', slug: '1982-opprykk', summary: 'Storhamar vant 2. divisjon i den første hele sesongen i Ishallen og rykket opp. Klubben har siden vært på øverste nivå.', completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'season', id: 'season-1981-82' }, { kind: 'arena', id: ishallId }], year: 1982, era: 'Omstilling og etablering', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1982-yellow-blue', title: 'Hockeylaget blir gult og blått', slug: '1982-gult-og-blatt', summary: 'Ved opprykket i 1982 gikk hockeylaget over fra den gamle svarte/gule tradisjonen til Storhamars gule og blå klubbfarger.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1980-83' }, { kind: 'season', id: 'season-1982-83' }], year: 1982, era: 'Omstilling og etablering', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1982-first-win-vif', title: 'Første seier over Vålerenga', slug: '1982-forste-seier-vif', summary: '5. november 1982 slo Storhamar Vålerenga 4–3 i Storhamar Ishall, klubbens første seier over rivalen.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1982-83' }, { kind: 'arena', id: ishallId }], date: '1982-11-05', year: 1982, era: 'Omstilling og etablering', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1984-qualifier', title: '24–2 sammenlagt i kvalifiseringen', slug: '1984-kvalifisering', summary: 'Storhamar slo Strindheim 10–1 hjemme og 14–1 borte i kvalifisering. Ligaen ble siden utvidet, slik at kvalifiseringen ikke avgjorde plassen.', completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'season', id: 'season-1983-84' }], year: 1984, era: 'Omstilling og etablering', importance: 'notable', lastVerifiedAt: verifiedAt },
]

import type {
  ArchiveEuropeCampaign,
  ArchiveHonour,
  ArchiveJersey,
  ArchivePerson,
  ArchiveRecord,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'
const olAmfiId = 'arena-hamar-ol-amfi'
const ccm2018Id = 'jersey-2018-19-ccm'

export const seasons2015To2020: ArchiveSeason[] = [
  {
    id: 'season-2015-16', title: '2015/16', slug: '2015-16', displayName: '2015/16', startYear: 2015, endYear: 2016,
    summary: 'En historisk CHL-sesong med gruppeseier og åttedelsfinale, mens den hjemlige serien endte med 6. plass og NM-semifinale.',
    body: [
      'Storhamar debuterte i Champions Hockey League og skapte flere av klubbens største europeiske resultater. Laget vant gruppa foran Sparta Praha og Genève-Servette etter blant annet 2–1 i Praha, 3–0 i Genève og 5–1 hjemme mot Genève.',
      'I første utslagsrunde ble Red Bull Salzburg slått 6–3 sammenlagt. Dermed ble Storhamar det første norske laget som tok seg til åttedelsfinale i CHL. TPS Turku ble for sterke med 6–4 sammenlagt, men Europa-eventyret satte sesongen i en helt egen kategori.',
      'Hjemme i Get-Ligaen endte Storhamar på 6. plass. Jacob Berglund toppet SIL-arkivets sesongoversikt med 82 poeng når alle turneringer/sluttspill i oversikten regnes med.',
      'I NM-sluttspillet ble Sparta slått 4–2 i kvartfinalen. Semifinalen mot Stavanger Oilers gikk helt til sju kamper før Oilers vant den avgjørende kampen 3–1.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'europe', id: 'europe-2015-16-chl' },
      { kind: 'player', id: 'player-jacob-berglund' },
      { kind: 'player', id: 'player-oskar-ostlund' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Get-Ligaen', 'NM-sluttspill', 'Champions Hockey League'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 6 }],
    playoffSummary: 'Semifinale. Sparta ble slått 4–2 i kvartfinalen; Stavanger Oilers vant semifinalen 4–3 i kamper.',
    europeSummary: 'CHL: vant gruppe M, slo Red Bull Salzburg 6–3 sammenlagt og nådde 1/8-finale mot TPS Turku.',
    topScorers: [{ personId: 'player-jacob-berglund', points: 82, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2015-chl-debut', 'timeline-2015-chl-round-of-16'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2016-17', title: '2016/17', slug: '2016-17', displayName: '2016/17', startYear: 2016, endYear: 2017,
    summary: 'Storhamar tok 3. plass i serien. Kvartfinalen mot Sparta ga hockeyhistorie da kamp fem varte i 217 minutter og 14 sekunder.',
    body: [
      'Storhamar endte på 3. plass i Get-Ligaen med 76 poeng. SIL-arkivet fører tabellen med 21 ordinære seire, tre overtidsseire, sju overtidstap og 14 ordinære tap på 45 kamper.',
      'Joakim Jensen var sesongens poengkonge med 42 poeng i SIL-arkivets sesongoversikt.',
      'Kvartfinalen mot Sparta ble historisk. 12. mars 2017 startet kamp fem klokka 18.00 og var ikke ferdig før rundt 02.30. Joakim Jensen avgjorde 2–1 etter 217 minutter og 14 sekunder i den ellevte perioden.',
      'SIL-arkivet beskriver kampen som ny klubb-, norsk-, Europa- og verdensrekord i lengde. Storhamar vant likevel ikke serien: Sparta tok kvartfinalen 4–3 i kamper.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'record', id: 'record-2017-world-longest-game' }, { kind: 'player', id: 'player-joakim-jensen' }, { kind: 'player', id: 'player-oskar-ostlund' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Get-Ligaen', 'NM-sluttspill'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 3, gamesPlayed: 45, wins: 21, overtimeWins: 3, overtimeLosses: 7, losses: 14, goalsFor: 131, goalsAgainst: 104, points: 76 }],
    playoffSummary: 'Kvartfinale. Sparta vant serien 4–3 i kamper. Kamp fem ble avgjort av Joakim Jensen etter 217:14.',
    topScorers: [{ personId: 'player-joakim-jensen', points: 42, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2017-world-record-game'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2017-18', title: '2017/18', slug: '2017-18', displayName: '2017/18', startYear: 2017, endYear: 2018,
    summary: 'En av de største sesongene i klubbhistorien: 108 seriepoeng, seriegull og klubbens sjuende NM-gull.',
    body: [
      'Under Fredrik Söderström dominerte Storhamar Get-Ligaen. Laget tok 108 poeng på 45 kamper med 35 ordinære seire og en målforskjell på 183–88. Det var 15 poeng ned til Sparta på 2. plass.',
      'Seriemesterskapet ble sikret mot Frisk Asker etter 3–0 hjemme. Det finnes et datavvik i historiske kilder på den eksakte januardatoen, så selve tittelen og avgjørende kamp er verifisert mens datoen skal avstemmes i fullkontrollen.',
      'I sluttspillet ble Lørenskog slått 4–0 og Frisk Asker 4–1. Finalen mot Lillehammer endte 4–1 i kamper. Den avgjørende finalen 11. april 2018 endte 4–2 i Hamar.',
      'Kodie Curran fikk en spektakulær eneste sesong i Storhamar: 73 poeng når serie og sluttspill summeres i SIL-arkivets adelskalender. Josh Nicholls leverte ni mål og ni assist på elleve sluttspillkamper og scoret flere av de viktigste finalemålene.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [],
    related: [
      { kind: 'honour', id: 'honour-2018-league' }, { kind: 'honour', id: 'honour-2018-nm' },
      { kind: 'player', id: 'player-kodie-curran' }, { kind: 'player', id: 'player-josh-nicholls' }, { kind: 'player', id: 'player-victor-svensson' },
      { kind: 'player', id: 'player-oskar-ostlund' }, { kind: 'jersey', id: ccm2018Id }, { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Get-Ligaen', 'NM-sluttspill'], coaches: ['Fredrik Söderström'], captains: ['Kodie Curran'], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 1, gamesPlayed: 45, wins: 35, overtimeWins: 0, overtimeLosses: 3, losses: 7, goalsFor: 183, goalsAgainst: 88, points: 108, note: 'Seriemester' }],
    playoffSummary: 'Norgesmester. Lørenskog 4–0, Frisk Asker 4–1 og Lillehammer 4–1 i kamper.',
    topScorers: [{ personId: 'player-kodie-curran', points: 73, note: 'SIL-arkivets sesongoversikt / samlet serie og sluttspill.' }],
    honourIds: ['honour-2018-league', 'honour-2018-nm'], jerseyIds: [ccm2018Id], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2018-league', 'timeline-2018-seventh-nm'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2018-19', title: '2018/19', slug: '2018-19', displayName: '2018/19', startYear: 2018, endYear: 2019,
    summary: 'Dobbelt sølv: 2. plass i serien og NM-finale, samtidig som Storhamar igjen tok seg til 1/8-finale i CHL.',
    body: [
      'Storhamar gikk inn i sesongen som regjerende dobbeltmester. I Get-Ligaen endte laget på 2. plass bak Vålerenga. Patrick Thoresen toppet SIL-arkivets sesongoversikt med 91 poeng.',
      'I CHL ble Storhamar nummer to i gruppe E bak Tappara og foran Djurgården og Oceláři Třinec. 6–2 hjemme mot Třinec sikret avansementet. I åttedelsfinalen spilte Storhamar 4–4 hjemme mot Skellefteå AIK før svenskene vant returen 3–2 og 7–6 sammenlagt.',
      '4–4-kampen mot Skellefteå ble historisk: SIL-arkivet omtaler Storhamar som det første norske laget som unngikk tap mot et svensk topplag i en offisiell kamp.',
      'I NM-sluttspillet nådde Storhamar finalen, men Frisk Asker vant finaleserien 4–2. Det ga sølv både i serie og NM.',
      'Seriekampen mot Vålerenga 20. januar samlet 7115 tilskuere i CC Amfi, et av de største dokumenterte seriepublikumstallene i arenaen.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [],
    related: [
      { kind: 'europe', id: 'europe-2018-19-chl' }, { kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'player', id: 'player-victor-svensson' },
      { kind: 'player', id: 'player-oskar-ostlund' }, { kind: 'jersey', id: ccm2018Id }, { kind: 'record', id: 'record-2019-vif-7115' }, { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Get-Ligaen', 'NM-sluttspill', 'Champions Hockey League'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 2 }],
    playoffSummary: 'NM-finale. Frisk Asker ble norgesmester etter 4–2 i finalekamper mot Storhamar.',
    europeSummary: 'CHL: 2. plass i gruppe E og 1/8-finale. Skellefteå AIK vant 7–6 sammenlagt.',
    topScorers: [{ personId: 'player-patrick-thoresen', points: 91, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [ccm2018Id], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2018-chl-advance', 'timeline-2019-nm-final', 'timeline-2019-vif-7115'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2019-20', title: '2019/20', slug: '2019-20', displayName: '2019/20', startYear: 2019, endYear: 2020,
    summary: 'Storhamar tok 2. plass i serien, men sluttspillet ble aldri spilt. 11. mars 2020 ble resten av norsk ishockeysesong avlyst på grunn av koronapandemien.',
    body: [
      'Storhamar endte på 2. plass i Get-Ligaen. Patrick Thoresen var lagets poengkonge med 64 poeng i SIL-arkivets sesongoversikt, mens Rasmus Ahlholm leverte 41 poeng på 32 seriekamper.',
      'Sesongen fikk ingen sportslig avslutning. Norges Ishockeyforbund avbrøt all aktivitet med virkning fra 11. mars 2020 som følge av koronapandemien. Rangeringen i serien ble stående, men NM-sluttspillet ble ikke gjennomført.',
      'Dermed avsluttet Storhamar en sesong på 2. plass uten mulighet til å kjempe om kongepokalen. Perioden markerer også starten på pandemikapitlet som fortsatte inn i 2020/21.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [],
    related: [{ kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'player', id: 'player-rasmus-ahlholm' }, { kind: 'timeline', id: 'timeline-2020-season-cancelled' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Get-Ligaen'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 2, note: 'Sluttspillet ble avlyst på grunn av koronapandemien.' }],
    playoffSummary: 'Avlyst. NIHF avbrøt all aktivitet fra 11. mars 2020.',
    topScorers: [{ personId: 'player-patrick-thoresen', points: 64, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2020-season-cancelled'], lastVerifiedAt: verifiedAt,
  },
]

export const honours2015To2020: ArchiveHonour[] = [
  {
    id: 'honour-2018-league', title: 'Seriemester 2017/18', slug: 'seriemester-2017-18',
    summary: 'Storhamar vant Get-Ligaen med 108 poeng og 15 poengs margin til Sparta.',
    body: ['Storhamar tok 35 ordinære seire på 45 kamper og hadde målforskjellen 183–88.', 'Tittelen ble sikret med 3–0 hjemme mot Frisk Asker. Historiske kilder har et mindre avvik på eksakt dato i januar, og datoen beholdes derfor ute av objektet til fullkontrollen.'],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'season', id: 'season-2017-18' }],
    honourType: 'league-championship', seasonId: 'season-2017-18', year: 2018, competition: 'Get-Ligaen', decidingGame: 'Storhamar – Frisk Asker 3–0, januar 2018 (dato avstemmes)', keyPersonIds: ['player-kodie-curran'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2018-nm', title: 'Norgesmester 2018', slug: 'norgesmester-2018',
    summary: 'Storhamars sjuende kongepokal etter 4–1 i finalekamper mot Lillehammer.',
    body: ['Lørenskog ble slått 4–0 i kvartfinalen og Frisk Asker 4–1 i semifinalen.', '11. april 2018 vant Storhamar den avgjørende finalen 4–2 hjemme mot Lillehammer og fullførte klubbens første serie/NM-dobbel siden 1997.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2017-18' }, { kind: 'arena', id: olAmfiId }],
    honourType: 'norwegian-championship', seasonId: 'season-2017-18', year: 2018, competition: 'NM-sluttspill', finalOpponent: 'Lillehammer', decidingGame: 'Storhamar – Lillehammer 4–2, 11.04.2018', keyPersonIds: ['player-kodie-curran', 'player-josh-nicholls', 'player-oskar-ostlund'], lastVerifiedAt: verifiedAt,
  },
]

export const jerseys2015To2020: ArchiveJersey[] = [
  {
    id: ccm2018Id, title: '2018–19 · CCM blå/gul/hvit', slug: '2018-19-ccm',
    summary: 'Et historisk draktsett som gjorde blått til hovedfarge hjemme og introduserte Storhamars første hvite tredjedrakt.',
    body: [
      'CCM-settet ble lansert til sluttspillet i 2018. Den mørkeblå drakta ble hoveddrakt hjemme, mens en hvit tredjedrakt ble produsert for første gang i klubbhistorien.',
      'Draktene var forsinket og debuterte først i semifinalen mot Frisk Asker. De fulgte laget gjennom NM-gullet og ble videreført i 2018/19 med mindre sponsorendringer.',
      'SIL-arkivet trekker fram Jacob Berglund, Josh Nicholls, Oskar Östlund og Kodie Curran som stjerner i drakta. Den hvite varianten ble bare brukt i to kamper.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'season', id: 'season-2017-18' }, { kind: 'season', id: 'season-2018-19' }, { kind: 'honour', id: 'honour-2018-nm' }],
    fromSeasonId: 'season-2017-18', toSeasonId: 'season-2018-19', seasonIds: ['season-2017-18', 'season-2018-19'], usage: ['home', 'away', 'third'], manufacturer: 'CCM', colours: ['blå', 'gul', 'hvit'],
    playerIds: ['player-jacob-berglund', 'player-josh-nicholls', 'player-oskar-ostlund', 'player-kodie-curran'], notableMomentIds: ['timeline-2018-seventh-nm', 'timeline-2018-chl-advance'], lastVerifiedAt: verifiedAt,
  },
]

export const players2015To2020: ArchivePerson[] = [
  {
    id: 'player-oskar-ostlund', title: 'Oskar Östlund', fullName: 'Oskar Östlund', slug: 'oskar-ostlund',
    summary: 'Publikumsfavoritten som kom som et ubeskrevet blad og spilte seg inn blant de beste keeperne i Storhamar-historien.',
    body: ['Östlund kom til Storhamar fra østerriksk 1. divisjon foran 2015/16 og ble raskt en nøkkelspiller. Han sto blant annet en enorm CHL-sesong i debutåret.', 'Gjennom fire sesonger registrerer SIL-arkivet 236 kamper/oppføringer, 196 starter, 2,0 i snitt baklengs, 92,4 i redningsprosent og 28 shutouts. Etter 2018/19 ble han hentet av Skellefteå AIK.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-2015-16-chl' }, { kind: 'honour', id: 'honour-2018-nm' }],
    position: 'Keeper', storhamarPeriods: [{ fromSeasonId: 'season-2015-16', toSeasonId: 'season-2018-19' }], seasonIds: ['season-2015-16', 'season-2016-17', 'season-2017-18', 'season-2018-19'], honourIds: ['honour-2018-league', 'honour-2018-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-kodie-curran', title: 'Kodie Curran', fullName: 'Kodie Curran', slug: 'kodie-curran',
    summary: 'Dominant offensiv back og kaptein i dobbelgullsesongen 2017/18.',
    body: ['Curran fikk bare én sesong i Storhamar, men satte et enormt avtrykk. SIL-arkivets samlede statistikk fører 52 kamper og 73 poeng med 24 mål og 49 assist.', 'Som kaptein var han en sentral leder i laget som vant både serien og NM i 2018.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2017-18' }, { kind: 'honour', id: 'honour-2018-nm' }],
    nationality: 'Canada', position: 'Back', storhamarPeriods: [{ fromSeasonId: 'season-2017-18', toSeasonId: 'season-2017-18' }], seasonIds: ['season-2017-18'], honourIds: ['honour-2018-league', 'honour-2018-nm'], roles: ['spiller', 'kaptein'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-josh-nicholls', title: 'Josh Nicholls', fullName: 'Josh Nicholls', slug: 'josh-nicholls',
    summary: 'Goalgetter som kom inn midt i gullsesongen og leverte flere av de avgjørende målene i NM-sluttspillet 2018.',
    body: ['Nicholls ble hentet som cover da Patrick Thoresen var på vei til Russland. Han scoret fra start og blomstret særlig i sluttspillet.', 'SIL-arkivet fører 22 seriekamper med 20 poeng og elleve sluttspillkamper med ni mål og ni assist. Han scoret blant annet seiersmålet i overtida i finalekamp fire og to mål i den avgjørende finalen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2017-18' }, { kind: 'honour', id: 'honour-2018-nm' }],
    born: '1992-04-27', birthPlace: 'Richmond, BC, Canada', nationality: 'Canada', position: 'Løper', shirtNumbers: [82], storhamarPeriods: [{ fromSeasonId: 'season-2017-18', toSeasonId: 'season-2017-18' }], seasonIds: ['season-2017-18'], honourIds: ['honour-2018-league', 'honour-2018-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-victor-svensson', title: 'Victor Svensson', fullName: 'Victor Svensson', slug: 'victor-svensson',
    summary: 'Smart toveis-center og en viktig brikke i både dobbelgullet 2018 og CHL-/sølvsesongen 2018/19.',
    body: ['Svensson fulgte trener Fredrik Söderström fra Oskarshamn til Storhamar og ble raskt en sentral toveisspiller.', 'I gullsesongen leverte han 27 seriepoeng og 13 sluttspillpoeng. Året etter, i førsterekke med Patrick Thoresen, økte han produksjonen til 54 poeng på 38 seriekamper før han ble hentet til Düsseldorf i DEL.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2018-nm' }, { kind: 'europe', id: 'europe-2018-19-chl' }],
    born: '1989-12-16', birthPlace: 'Karlskrona, Sverige', nationality: 'Sverige', position: 'Løper', shirtNumbers: [39], storhamarPeriods: [{ fromSeasonId: 'season-2017-18', toSeasonId: 'season-2018-19' }], seasonIds: ['season-2017-18', 'season-2018-19'], honourIds: ['honour-2018-league', 'honour-2018-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-patrick-thoresen', title: 'Patrick Thoresen', fullName: 'Patrick Thoresen', slug: 'patrick-thoresen',
    summary: 'En av de største norske ishockeyspillerne gjennom tidene og Storhamars offensive leder fra returen til Hamar.',
    body: ['Patrick Thoresen vendte tilbake til Storhamar rundt gullperioden 2017/18 og ble deretter lagets store offensive drivkraft. I 2018/19 og 2019/20 fører SIL-arkivet ham som poengkonge med henholdsvis 91 og 64 poeng.', 'Profilen fortsetter i de neste arkivblokkene, der han senere får flere finaler, mesterskap og formell hedring i taket.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2018-19' }, { kind: 'europe', id: 'europe-2018-19-chl' }],
    position: 'Løper', storhamarPeriods: [{ fromSeasonId: 'season-2017-18', note: 'Returperioden fortsetter i senere arkivblokker.' }], seasonIds: ['season-2017-18', 'season-2018-19', 'season-2019-20'], honourIds: ['honour-2018-league', 'honour-2018-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-rasmus-ahlholm', title: 'Rasmus Ahlholm', fullName: 'Rasmus Ahlholm', slug: 'rasmus-ahlholm',
    summary: 'Produktiv svensk løper som dannet en svært farlig duo med Patrick Thoresen i den pandemiavbrutte perioden.',
    body: ['Ahlholm kom til Storhamar etter å ha markert seg i norsk hockey hos Manglerud Star og Vålerenga.', 'I 2019/20 leverte han 16 mål og 25 assist, totalt 41 poeng, på 32 seriekamper. Pandemien gjorde at han ikke fikk spille sluttspill for Storhamar den sesongen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2019-20' }, { kind: 'player', id: 'player-patrick-thoresen' }],
    born: '1990-01-19', birthPlace: 'Nacka, Sverige', nationality: 'Sverige', position: 'Løper', shirtNumbers: [40], storhamarPeriods: [{ fromSeasonId: 'season-2019-20', note: 'Fortsetter inn i pandemiårene.' }], seasonIds: ['season-2019-20'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
]

export const europe2015To2020: ArchiveEuropeCampaign[] = [
  {
    id: 'europe-2015-16-chl', title: 'Champions Hockey League 2015/16', slug: 'chl-2015-16',
    summary: 'Historisk CHL-debut: gruppeseier, seier over Salzburg og 1/8-finale mot TPS Turku.',
    body: ['Storhamar vant gruppe M med ni poeng etter tre seire på fire kamper mot Sparta Praha og Genève-Servette.', 'Red Bull Salzburg ble slått 3–1 borte og 3–2 hjemme, 6–3 sammenlagt. I 1/8-finalen vant TPS Turku 6–4 sammenlagt.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2015-16' }, { kind: 'player', id: 'player-oskar-ostlund' }],
    seasonId: 'season-2015-16', competition: 'Champions Hockey League', stage: '1/8-finale', opponentNames: ['Sparta Praha', 'Genève-Servette', 'Red Bull Salzburg', 'TPS Turku'], outcome: 'Vant gruppa, slo Salzburg 6–3 sammenlagt og ble slått ut av TPS Turku 6–4 sammenlagt.', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'europe-2018-19-chl', title: 'Champions Hockey League 2018/19', slug: 'chl-2018-19',
    summary: 'Storhamar avanserte fra en sterk CHL-gruppe og presset Skellefteå AIK til 7–6 sammenlagt i 1/8-finalen.',
    body: ['Storhamar ble nummer to i gruppe E med ni poeng etter kamper mot Tappara, Djurgården og Oceláři Třinec.', 'I 1/8-finalen endte hjemmekampen mot Skellefteå AIK 4–4. SIL-arkivet omtaler dette som første gang et norsk lag unngikk tap mot et svensk topplag i en offisiell kamp. Skellefteå vant returen 3–2 og 7–6 sammenlagt.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2018-19' }, { kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'player', id: 'player-victor-svensson' }],
    seasonId: 'season-2018-19', competition: 'Champions Hockey League', stage: '1/8-finale', opponentNames: ['Tappara', 'Djurgården', 'Oceláři Třinec', 'Skellefteå AIK'], outcome: '2. plass i gruppa. Skellefteå AIK vant 7–6 sammenlagt i 1/8-finalen.', lastVerifiedAt: verifiedAt,
  },
]

export const records2015To2020: ArchiveRecord[] = [
  {
    id: 'record-2017-world-longest-game', title: '217:14 mot Sparta', slug: '217-14-sparta-2017',
    summary: '12. mars 2017 avgjorde Joakim Jensen mot Sparta etter 217 minutter og 14 sekunders spilletid.',
    body: ['Kampen startet klokka 18.00 og var ikke ferdig før rundt 02.30. Den gikk til ellevte periode og Storhamar vant 2–1.', 'SIL-arkivet beskriver kampen som ny verdensrekord i lengde på tidspunktet. Skuddstatistikken endte 96–93.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2016-17' }, { kind: 'player', id: 'player-joakim-jensen' }],
    recordType: 'game', value: '217:14', unit: 'spilletid', date: '2017-03-12', seasonId: 'season-2016-17', personIds: ['player-joakim-jensen'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'record-2019-vif-7115', title: '7115 mot Vålerenga', slug: '7115-vif-2019',
    summary: '20. januar 2019 så 7115 tilskuere Storhamar–Vålerenga i CC Amfi.',
    body: ['Vålerenga vant kampen 4–2. Publikumstallet dokumenterer hvor stor interessen rundt rivaloppgjøret var i sølvsesongen 2018/19.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2018-19' }, { kind: 'arena', id: olAmfiId }],
    recordType: 'attendance', value: 7115, unit: 'tilskuere', date: '2019-01-20', seasonId: 'season-2018-19', lastVerifiedAt: verifiedAt,
  },
]

export const timeline2015To2020: ArchiveTimelineEvent[] = [
  { id: 'timeline-2015-chl-debut', title: 'Debut i Champions Hockey League', slug: '2015-chl-debut', summary: '20. august 2015 debuterte Storhamar i CHL med 2–3 hjemme mot Sparta Praha.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-2015-16-chl' }], date: '2015-08-20', year: 2015, era: 'Europa og ny storhetstid', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2015-chl-round-of-16', title: 'Første norske lag til CHL-åttedelsfinale', slug: '2015-chl-attedelsfinale', summary: 'Etter 6–3 sammenlagt mot Red Bull Salzburg avanserte Storhamar til 1/8-finale i CHL.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-2015-16-chl' }], year: 2015, era: 'Europa og ny storhetstid', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2017-world-record-game', title: '217:14 – verdensrekordkampen', slug: '2017-217-14', summary: 'Joakim Jensen avgjorde mot Sparta etter 217:14 i en kamp som varte til rundt 02.30.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'record', id: 'record-2017-world-longest-game' }], date: '2017-03-12', year: 2017, era: 'Europa og ny storhetstid', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2018-league', title: 'Seriemester med 108 poeng', slug: '2018-seriemester', summary: 'Storhamar dominerte Get-Ligaen og tok seriegullet med 108 poeng og 15 poengs margin.', completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'honour', id: 'honour-2018-league' }], year: 2018, era: 'Dobbelgullet', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2018-seventh-nm', title: 'Sjuende NM-gull', slug: '2018-sjuende-nm-gull', summary: '11. april 2018 slo Storhamar Lillehammer 4–2 og tok sitt sjuende NM-gull.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2018-nm' }], date: '2018-04-11', year: 2018, era: 'Dobbelgullet', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2018-chl-advance', title: 'Videre fra CHL-gruppa igjen', slug: '2018-chl-avansement', summary: 'Storhamar ble nummer to i CHL-gruppa og tok seg videre til 1/8-finale mot Skellefteå AIK.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'europe', id: 'europe-2018-19-chl' }], year: 2018, era: 'Europa og ny storhetstid', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2019-vif-7115', title: '7115 på rivaloppgjøret', slug: '2019-7115-vif', summary: '7115 tilskuere fylte CC Amfi til seriekampen mot Vålerenga 20. januar 2019.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'record', id: 'record-2019-vif-7115' }], date: '2019-01-20', year: 2019, era: 'Europa og ny storhetstid', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2019-nm-final', title: 'Dobbelt sølv i 2019', slug: '2019-nm-finale', summary: 'Storhamar endte som nummer to i serien og tapte NM-finalen 2–4 i kamper mot Frisk Asker.', completeness: 'verified', sources: ['silarkivet', 'nihf'], media: [], related: [{ kind: 'season', id: 'season-2018-19' }], year: 2019, era: 'Europa og ny storhetstid', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2020-season-cancelled', title: 'Sesongen stoppes av pandemien', slug: '2020-sesongen-stoppes', summary: 'NIHF avbrøt all ishockeyaktivitet fra 11. mars 2020. Storhamar sto på 2. plass, men NM-sluttspillet ble aldri spilt.', completeness: 'verified', sources: ['nihf', 'silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2019-20' }], date: '2020-03-11', year: 2020, era: 'Pandemien', importance: 'major', lastVerifiedAt: verifiedAt },
]

import type {
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
const missionJerseyId = 'jersey-2002-06-mission'

export const seasons2005To2010: ArchiveSeason[] = [
  {
    id: 'season-2005-06', title: '2005/06', slug: '2005-06', displayName: '2005/06', startYear: 2005, endYear: 2006,
    summary: 'Storhamar vant UPC-ligaen og tok klubbens sjette seriemesterskap, men tittelforsvaret i NM stoppet i semifinalen mot Vålerenga.',
    body: [
      'Storhamar var igjen best gjennom grunnserien. SIL-arkivets sesongoversikt fører laget på 1. plass og Mads Hansen som poengkonge med 77 poeng når sluttspillet regnes med.',
      '22. januar 2006 ble seriemesterskapet sikret etter 9–1 hjemme mot Manglerud Star. Sesongen inneholdt også en rekke store seire, blant annet 10–0 mot Trondheim, 10–0 borte mot Comet og 5–0 hjemme mot Vålerenga.',
      'I sluttspillet ble Frisk slått 4–0 i kvartfinaleserien. Semifinalen mot Vålerenga ble langt jevnere og Storhamar røk ut etter en tett serie. Mads Hansen var lagets offensive motor, mens Jonas Norgren og den unge Ruben Smith ga klubben en sterk keepersituasjon.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [],
    related: [
      { kind: 'honour', id: 'honour-2006-league' },
      { kind: 'player', id: 'player-mads-hansen' },
      { kind: 'legend', id: 'legend-jonas-norgren' },
      { kind: 'jersey', id: missionJerseyId },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['UPC-ligaen', 'NM-sluttspill'], coaches: ['Petter Thoresen'], captains: [], roster: [],
    standings: [{ competition: 'UPC-ligaen', position: 1, note: 'Seriemester' }],
    playoffSummary: 'Semifinale. Frisk ble slått 4–0 i kvartfinalen; Storhamar røk mot Vålerenga i semifinalen.',
    topScorers: [{ personId: 'player-mads-hansen', points: 77, note: '67 poeng i UPC-ligaen og 10 i sluttspillet ifølge SIL-arkivets spillerstatistikk.' }],
    honourIds: ['honour-2006-league'], jerseyIds: [missionJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2006-league', 'timeline-2006-patrick-nhl'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2006-07', title: '2006/07', slug: '2006-07', displayName: '2006/07', startYear: 2006, endYear: 2007,
    summary: 'Storhamar tok 2. plass i UPC-ligaen og nådde NM-finalen. Vålerenga vant finaleserien 4–1.',
    body: [
      'Storhamar holdt seg helt i toppen gjennom sesongen og endte som nummer to i ligaen. Christian Larrivée fikk en voldsom debut i gult og blått og står med 79 poeng i SIL-arkivets sesongoversikt.',
      'Sluttspillet ble langt og dramatisk. Stjernen ble slått 4–2 i kvartfinalen og Stavanger 4–2 i semifinalen. Finalen mot Vålerenga endte 1–4 i kamper, men inneholdt blant annet en dobbel sudden death på Jordal.',
      'Larrivée avsluttet sluttspillet med 13 mål og 19 assist på 17 kamper. SIL-arkivet omtaler de 32 poengene som rekordsifre og han ble kåret til sluttspillets beste spiller til tross for finaletapet.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'player', id: 'player-christian-larrivee' },
      { kind: 'record', id: 'record-2007-larrivee-playoff-points' },
      { kind: 'player', id: 'player-ruben-smith' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['UPC-ligaen', 'NM-sluttspill'], coaches: ['Petter Thoresen'], captains: [], roster: [],
    standings: [{ competition: 'UPC-ligaen', position: 2 }],
    playoffSummary: 'NM-finale. Slo Stjernen 4–2 og Stavanger 4–2 i kamper, før Vålerenga vant finalen 4–1.',
    topScorers: [{ personId: 'player-christian-larrivee', points: 79, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2007-50-years', 'timeline-2007-nm-final'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2007-08', title: '2007/08', slug: '2007-08', displayName: '2007/08', startYear: 2007, endYear: 2008,
    summary: 'En middels grunnserie ble snudd til et historisk sluttspill: Storhamar tok klubbens sjette NM-gull etter 4–2 i finalekamper mot Frisk Asker.',
    body: [
      'Storhamar ble nummer fire i Get-ligaen, men løftet seg kraftig da sluttspillet startet. Alexander Smirnov var tilbake som hovedtrener og den unge Ruben Smith tok et stort ansvar i mål.',
      'Stavanger ble slått 4–0 i kvartfinalen og Vålerenga 4–2 i semifinalen. I finalen vant Storhamar de tre første kampene mot Frisk Asker, før Frisk reduserte til 3–2 i finaleserien.',
      '4. april 2008 avgjorde Eirik Skadsdammen den sjette finalen i sudden death etter forarbeid av Nathan Martz. Storhamar vant 3–2 og tok sin sjette kongepokal. Ruben Smith ble kåret til sluttspillets MVP, mens Martz var sesongens poengkonge med 69 poeng.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'honour', id: 'honour-2008-nm' },
      { kind: 'player', id: 'player-nathan-martz' },
      { kind: 'player', id: 'player-ruben-smith' },
      { kind: 'player', id: 'player-joakim-jensen' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Get-ligaen', 'NM-sluttspill'], coaches: ['Alexander Smirnov'], captains: [], roster: [],
    standings: [{ competition: 'Get-ligaen', position: 4 }],
    playoffSummary: 'Norgesmester. Stavanger 4–0, Vålerenga 4–2 og Frisk Asker 4–2 i kamper.',
    topScorers: [{ personId: 'player-nathan-martz', points: 69, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: ['honour-2008-nm'], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2008-sixth-nm'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2008-09', title: '2008/09', slug: '2008-09', displayName: '2008/09', startYear: 2008, endYear: 2009,
    summary: 'Tittelforsvaret ble ujevnt. Storhamar endte på 5. plass og nådde semifinalen, mens Joakim Jensen ble lagets poengkonge med 55 poeng.',
    body: [
      'Sesongen etter NM-gullet ble mer ustabil. Storhamar varierte mellom sterke enkeltkamper og tunge perioder og endte til slutt på 5. plass i Get-ligaen.',
      'Joakim Jensen var på vei inn i rollen som en av klubbens viktigste målscorere. SIL-arkivets sesongoversikt fører ham som poengkonge med 55 poeng.',
      'Ruben Smith fortsatte som en sentral keeper, mens Jonas Norgren gikk inn i den siste delen av sin lange Storhamar-karriere og fikk en stadig tydeligere mentorrolle.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'player', id: 'player-joakim-jensen' },
      { kind: 'player', id: 'player-ruben-smith' },
      { kind: 'legend', id: 'legend-jonas-norgren' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Get-ligaen', 'NM-sluttspill'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Get-ligaen', position: 5 }],
    playoffSummary: 'Semifinale.',
    topScorers: [{ personId: 'player-joakim-jensen', points: 55, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2009-10', title: '2009/10', slug: '2009-10', displayName: '2009/10', startYear: 2009, endYear: 2010,
    summary: 'En vanskelig grunnserie endte med 8. plass etter poengtrekk, men Storhamar slo tilbake og nådde semifinalen.',
    body: [
      'Storhamar endte på 8. plass med 58 poeng. SIL-arkivet dokumenterer at klubben ble trukket fem poeng for bruk av en ikke spilleberettiget spiller, og at resultatet av tre kamper ble satt til 0–5.',
      'Sluttspillet ga en kraftig opptur. Lørenskog ble slått 4–1 i kvartfinalen. I semifinalen vant Storhamar første kamp 2–1 på Jordal, men Vålerenga snudde serien og vant 4–1 i kamper.',
      'Pål Johnsen var sesongens poengkonge med 69 poeng. Før sesongen, 4. september 2009, ble Jonas Norgren hedret med testimonialkamp og nummer 15 fikk eget banner i Hamar OL-Amfi.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'legend', id: 'legend-jonas-norgren' },
      { kind: 'player', id: 'player-pal-johnsen' },
      { kind: 'player', id: 'player-joakim-jensen' },
      { kind: 'timeline', id: 'timeline-2009-jonas-number-15' },
      { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Get-ligaen', 'NM-sluttspill'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Get-ligaen', position: 8, gamesPlayed: 48, wins: 16, overtimeWins: 6, overtimeLosses: 3, losses: 23, goalsFor: 154, goalsAgainst: 160, points: 58, note: 'Storhamar ble trukket fem poeng. Resultatet av tre kamper ble satt til 0–5.' }],
    playoffSummary: 'Semifinale. Slo Lørenskog 4–1 i kvartfinalen og tapte 1–4 i kamper mot Vålerenga.',
    topScorers: [{ personId: 'player-pal-johnsen', points: 69, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2009-jonas-number-15', 'timeline-2010-semifinal'], lastVerifiedAt: verifiedAt,
  },
]

export const honours2005To2010: ArchiveHonour[] = [
  {
    id: 'honour-2006-league', title: 'Seriemester 2005/06', slug: 'seriemester-2005-06',
    summary: 'Storhamar vant UPC-ligaen og tok klubbens sjette seriemesterskap.',
    body: ['SIL-arkivets milepælsoversikt daterer avgjørelsen til 22. januar 2006, da Storhamar slo Manglerud Star 9–1 hjemme.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2005-06' }], honourType: 'league-championship', seasonId: 'season-2005-06', year: 2006, competition: 'UPC-ligaen', decidingGame: 'Storhamar Dragons – Manglerud Star 9–1, 22.01.2006', keyPersonIds: ['player-mads-hansen'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2008-nm', title: 'Norgesmester 2008', slug: 'norgesmester-2008',
    summary: 'Storhamars sjette kongepokal etter 4–2 i finalekamper mot Frisk Asker.',
    body: ['Storhamar slo Stavanger 4–0 og Vålerenga 4–2 på veien til finalen.', '4. april 2008 ble tittelen sikret med 3–2 etter sudden death mot Frisk Asker i Hamar OL-Amfi. Eirik Skadsdammen scoret vinnermålet etter pasning fra Nathan Martz.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2007-08' }, { kind: 'arena', id: olAmfiId }], honourType: 'norwegian-championship', seasonId: 'season-2007-08', year: 2008, competition: 'NM-sluttspill', finalOpponent: 'Frisk Asker', decidingGame: 'Storhamar Dragons – Frisk Asker 3–2 e.s.d., 04.04.2008', keyPersonIds: ['player-nathan-martz', 'player-ruben-smith'], lastVerifiedAt: verifiedAt,
  },
]

export const jerseys2005To2010: ArchiveJersey[] = [
  {
    id: missionJerseyId, title: '2002–06 · Mission flammedrakt', slug: '2002-06-mission-flammedrakt',
    summary: 'Andre generasjon av Dragons-flammedrakta, levert av Mission. 2005/06-varianten ble brukt da Storhamar tok seriegull.',
    body: [
      'Mission overtok som leverandør foran 2002/03. Storhamar beholdt flammeuttrykket, men designet ble enklere og for første gang på ti år hadde klubben faste hjemme- og bortedrakter som ble alternert gjennom sesongen.',
      'I 2005/06 kom SIL-merket tilbake på brystet, mens bukser og hjelmer ble mørkere. SIL-arkivet trekker fram Patrick Yetman, Mads Hansen, Geir Svendsberget og Steffen Thoresen som profiler i denne varianten, og seriegullet som det store øyeblikket.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [
      {
        id: 'media-jersey-2005-06-home', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2005-06-h.png?resize=750%2C473',
        alt: 'Storhamar Dragons hjemme-drakt 2005/06', caption: 'Hjemmedrakta fra seriegullsesongen 2005/06.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/2002-06/', seasonIds: ['season-2005-06'], personIds: ['player-mads-hansen'], tags: ['2005-06', 'Mission', 'Dragons', 'hjemme'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
      },
      {
        id: 'media-jersey-2005-06-away', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2005-06_b.png?resize=750%2C473',
        alt: 'Storhamar Dragons borte-drakt 2005/06', caption: 'Bortedrakta fra 2005/06.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/2002-06/', seasonIds: ['season-2005-06'], personIds: ['player-mads-hansen'], tags: ['2005-06', 'Mission', 'Dragons', 'borte'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
      },
    ],
    related: [{ kind: 'season', id: 'season-2005-06' }, { kind: 'honour', id: 'honour-2006-league' }],
    fromSeasonId: 'season-2002-03', toSeasonId: 'season-2005-06', seasonIds: ['season-2002-03', 'season-2003-04', 'season-2004-05', 'season-2005-06'], usage: ['home', 'away'], manufacturer: 'Mission', colours: ['gul', 'blå'], playerIds: ['player-mads-hansen'], notableMomentIds: ['timeline-2006-league'], tags: ['Dragons-perioden', 'flammedrakt'], lastVerifiedAt: verifiedAt,
  },
]

export const players2005To2010: ArchivePerson[] = [
  {
    id: 'player-mads-hansen', title: 'Mads Hansen', fullName: 'Mads Hansen', slug: 'mads-hansen',
    summary: 'En av sin generasjons fremste norske spillere. I 2005/06 kom han tilbake til Storhamar og ble ligaens toppscorer.',
    body: ['Hansen kom først til Storhamar som lovende unggutt og vant NM i 2000. Etter opphold i Vålerenga og svensk hockey vendte han tilbake i 2005/06 og leverte 67 seriepoeng og 10 sluttspillpoeng.', 'SIL-arkivet beskriver ham som en sterk leder og en solid defensiv forward som også kunne dominere offensivt. Etter den sterke 2005/06-sesongen ble han hentet til Brynäs.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2005-06' }, { kind: 'honour', id: 'honour-2006-league' }],
    born: '1978-09-16', birthPlace: 'Oslo', position: 'Løper', shirtNumbers: [25, 24], storhamarPeriods: [{ fromSeasonId: 'season-1999-00', toSeasonId: 'season-2001-02' }, { fromSeasonId: 'season-2005-06', toSeasonId: 'season-2005-06' }, { fromSeasonId: 'season-2013-14', toSeasonId: 'season-2014-15' }], seasonIds: ['season-2005-06'], honourIds: ['honour-2006-league'], roles: ['spiller', 'landslagsspiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-christian-larrivee', title: 'Christian Larrivée', fullName: 'Christian Larrivée', slug: 'christian-larrivee',
    summary: 'Den canadiske centeren ble en av de store Storhamar-profilene i moderne tid. Første sesong i klubben endte med 79 poeng og NM-finale.',
    body: ['Larrivée kom til Storhamar foran 2006/07. Han leverte umiddelbart og avsluttet sluttspillet med 13 mål og 19 assist på 17 kamper.', 'SIL-arkivet omtaler ham som en klubblegende og talisman. Han kom senere tilbake i 2010 og ble værende gjennom en lang periode i klubben.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2006-07' }, { kind: 'record', id: 'record-2007-larrivee-playoff-points' }],
    born: '1982-08-25', birthPlace: 'Gaspé, Quebec, Canada', nationality: 'Canada', position: 'Løper', shirtNumbers: [23], storhamarPeriods: [{ fromSeasonId: 'season-2006-07', toSeasonId: 'season-2006-07' }, { fromSeasonId: 'season-2010-11', note: 'Tilbake fra 2010 og senere lang Storhamar-periode.' }], seasonIds: ['season-2006-07'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-nathan-martz', title: 'Nathan Martz', fullName: 'Nathan Martz', slug: 'nathan-martz',
    summary: 'Canadisk playmaker som ble en nøkkelspiller i NM-gullet i 2008 og sesongens poengkonge.',
    body: ['Martz ble hentet inn som erstatter for Christian Larrivée og ble raskt toneangivende. SIL-arkivet trekker spesielt fram sluttspillet i 2008, der han spilte med en håndskade og likevel dominerte.', 'I den sjette finalen mot Frisk kom pasningen fra Martz før Eirik Skadsdammen avgjorde i sudden death og sikret kongepokalen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2008-nm' }, { kind: 'season', id: 'season-2007-08' }],
    born: '1981-03-04', birthPlace: 'Chilliwack, British Columbia, Canada', nationality: 'Canada', position: 'Løper', shirtNumbers: [4], storhamarPeriods: [{ fromSeasonId: 'season-2007-08', toSeasonId: 'season-2007-08' }, { fromSeasonId: 'season-2011-12', toSeasonId: 'season-2013-14' }], seasonIds: ['season-2007-08'], honourIds: ['honour-2008-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-joakim-jensen', title: 'Joakim Jensen', fullName: 'Joakim Jensen', slug: 'joakim-jensen',
    summary: 'En av de mest effektive målscorerne i Storhamar-historien. Seniorkarrieren i klubben startet i gullsesongen 2007/08.',
    body: ['Jensen kom inn som et relativt ubeskrevet blad etter canadisk juniorhockey. Han utviklet seg raskt til en av klubbens mest pålitelige målscorere og SIL-arkivet trekker fram evnen til å finne ledige rom og avslutte.', 'Han ble poengkonge i 2008/09 med 55 poeng og skulle senere sette en rekke klubbmerker, blant annet ti sesonger på rad med minst 20 scoringer og 96 powerplaymål.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2007-08' }, { kind: 'season', id: 'season-2008-09' }],
    born: '1987-08-08', birthPlace: 'Bærum', position: 'Løper', shirtNumbers: [21], storhamarPeriods: [{ fromSeasonId: 'season-2007-08', note: 'Storhamar 2007–2019.' }], seasonIds: ['season-2007-08', 'season-2008-09', 'season-2009-10'], honourIds: ['honour-2008-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-ruben-smith', title: 'Ruben Smith', fullName: 'Ruben Smith', slug: 'ruben-smith',
    summary: 'Ung keeper som fikk sitt store gjennombrudd i NM-sluttspillet 2008 og ble kåret til sluttspillets MVP.',
    body: ['Smith kom til Hamar i tenårene for å kombinere skole og hockey og slo tidlig gjennom på A-laget. I 2008 var han en av de store årsakene til at Storhamar gikk hele veien til NM-gull.', 'SIL-arkivet omtaler ham som en markant målvakt i Dragons-historien og fører Norgesmester og sluttspillets MVP 2008 blant merittene.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2008-nm' }, { kind: 'season', id: 'season-2007-08' }],
    born: '1987-04-15', position: 'Keeper', shirtNumbers: [30], storhamarPeriods: [{ fromSeasonId: 'season-2006-07', toSeasonId: 'season-2009-10' }], seasonIds: ['season-2006-07', 'season-2007-08', 'season-2008-09', 'season-2009-10'], honourIds: ['honour-2008-nm'], roles: ['spiller', 'keeper'], lastVerifiedAt: verifiedAt,
  },
]

export const legends2005To2010: ArchiveLegend[] = [
  {
    id: 'legend-jonas-norgren', title: 'Jonas Norgren', fullName: 'Jonas Norgren', slug: 'jonas-norgren-i-taket',
    summary: 'Keeperprofilen som ble norsk, spilte 637 kamper for Storhamar og fikk nummer 15 hedret i taket i 2009.',
    body: ['Norgren kom til Hamar i 1997 og utviklet seg til en av klubbens store keeperprofiler. SIL-arkivet fører ham som nummer fire på Storhamars adelskalender med 637 kamper og med tre NM-gull og tre seriegull.', '4. september 2009 ble han hedret med testimonialkamp i Hamar OL-Amfi. Drakt nummer 15 fikk samtidig sitt eget banner i hallen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'timeline', id: 'timeline-2009-jonas-number-15' }, { kind: 'arena', id: olAmfiId }],
    born: '1972-11-10', birthPlace: 'Sala, Sverige', nationality: 'Sverige / Norge', position: 'Keeper', shirtNumbers: [15, 72], storhamarPeriods: [{ fromSeasonId: 'season-1997-98', toSeasonId: 'season-2008-09' }], seasonIds: ['season-1997-98', 'season-1998-99', 'season-1999-00', 'season-2000-01', 'season-2001-02', 'season-2002-03', 'season-2003-04', 'season-2004-05', 'season-2005-06', 'season-2006-07', 'season-2007-08', 'season-2008-09'], honourIds: ['honour-2000-nm', 'honour-2001-league', 'honour-2004-league', 'honour-2004-nm', 'honour-2006-league', 'honour-2008-nm'], roles: ['spiller', 'keeper', 'hedret draktnummer'], honouredNumber: 15, honouredAt: '2009-09-04', honourReason: 'En av Storhamars største keeperprofiler gjennom tolv sesonger.', lastVerifiedAt: verifiedAt,
  },
]

export const records2005To2010: ArchiveRecord[] = [
  {
    id: 'record-2007-larrivee-playoff-points', title: '32 poeng i sluttspillet 2007', slug: 'larrivee-32-sluttspillpoeng-2007',
    summary: 'Christian Larrivée leverte 13 mål og 19 assist, totalt 32 poeng, på 17 sluttspillkamper i 2007.',
    body: ['SIL-arkivet omtaler tallene som rekordsifre. Produksjonen kom gjennom kvartfinalen mot Stjernen, semifinalen mot Stavanger og finaleserien mot Vålerenga.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-christian-larrivee' }, { kind: 'season', id: 'season-2006-07' }], recordType: 'player', value: 32, unit: 'sluttspillpoeng', seasonId: 'season-2006-07', personIds: ['player-christian-larrivee'], lastVerifiedAt: verifiedAt,
  },
]

export const timeline2005To2010: ArchiveTimelineEvent[] = [
  { id: 'timeline-2006-league', title: 'Sjette seriemesterskap', slug: '2006-sjette-seriemesterskap', summary: '22. januar 2006 sikret Storhamar seriegullet etter 9–1 hjemme mot Manglerud Star.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2006-league' }], date: '2006-01-22', year: 2006, era: 'Dragons-perioden', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2006-patrick-nhl', title: 'Første Storhamar-produkt i NHL', slug: '2006-patrick-thoresen-nhl', summary: '6. oktober 2006 ble Patrick Thoresen det første Storhamar-produktet som spilte i NHL, for Edmonton Oilers.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [], date: '2006-10-06', year: 2006, era: 'Dragons-perioden', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2007-50-years', title: 'Ishockeygruppa 50 år', slug: '2007-ishockeygruppa-50-ar', summary: '18. mars 2007 markerte Storhamars ishockeygruppe 50 år.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2006-07' }], date: '2007-03-18', year: 2007, era: 'Dragons-perioden', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2007-nm-final', title: 'NM-finale mot Vålerenga', slug: '2007-nm-finale', summary: 'Storhamar nådde NM-finalen etter lange serier mot Stjernen og Stavanger, men Vålerenga vant finalen 4–1 i kamper.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2006-07' }], year: 2007, era: 'Dragons-perioden', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2008-sixth-nm', title: 'Sjette NM-gull', slug: '2008-sjette-nm-gull', summary: '4. april 2008 slo Storhamar Frisk Asker 3–2 etter sudden death og sikret klubbens sjette kongepokal.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2008-nm' }, { kind: 'season', id: 'season-2007-08' }], date: '2008-04-04', year: 2008, era: 'Dragons-perioden', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2009-jonas-number-15', title: 'Jonas Norgrens nummer 15 i taket', slug: '2009-jonas-norgren-15', summary: '4. september 2009 ble Jonas Norgren hedret med testimonialkamp og nummer 15 fikk eget banner i Hamar OL-Amfi.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'legend', id: 'legend-jonas-norgren' }], date: '2009-09-04', year: 2009, era: 'Dragons-perioden', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2010-semifinal', title: 'Fra åttendeplass til semifinale', slug: '2010-fra-atteplass-til-semifinale', summary: 'Etter en grunnserie med poengtrekk slo Storhamar Lørenskog 4–1 i kvartfinalen og nådde semifinalen mot Vålerenga.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2009-10' }], year: 2010, era: 'Dragons-perioden', importance: 'notable', lastVerifiedAt: verifiedAt },
]

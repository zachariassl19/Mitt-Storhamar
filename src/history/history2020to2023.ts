import type {
  ArchiveLegend,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'
const olAmfiId = 'arena-hamar-ol-amfi'

export const seasons2020To2023: ArchiveSeason[] = [
  {
    id: 'season-2020-21', title: '2020/21', slug: '2020-21', displayName: '2020/21', startYear: 2020, endYear: 2021,
    summary: 'Enda en pandemisesong uten sportslig avslutning. Storhamar står registrert på 2. plass, men sesongen ble aldri fullført og sluttspillet ble avlyst.',
    body: [
      'Koronapandemien fortsatte å styre norsk hockey gjennom 2020/21. SIL-arkivet understreker selv at sesongen aldri ble fullført, og arkivet skal derfor ikke behandle tabellen som en vanlig ferdigspilt grunnserie.',
      'I SIL-arkivets samlede sesongoversikt står Storhamar på 2. plass og Patrick Thoresen som poengkonge med 39 poeng. Det ble ikke gjennomført NM-sluttspill.',
      'Sesongen er et viktig historisk unntak: resultatene som faktisk ble spilt skal bevares, men manglende kamper og manglende sluttspill skal aldri fylles inn med antakelser.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'legend', id: 'legend-christian-larrivee' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Fjordkraft-ligaen'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Fjordkraft-ligaen', position: 2, note: 'Sesongen ble aldri fullført.' }],
    playoffSummary: 'Avlyst. Sesongen ble aldri fullført.',
    topScorers: [{ personId: 'player-patrick-thoresen', points: 39, note: 'SIL-arkivets samlede sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2021-season-unfinished', 'timeline-larrivee-number-23'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2021-22', title: '2021/22', slug: '2021-22', displayName: '2021/22', startYear: 2021, endYear: 2022,
    summary: 'Etter to avbrutte sesonger kom sluttspillet tilbake. Storhamar ble nummer seks i serien, men slo seg helt fram til NM-finalen.',
    body: [
      'Storhamar endte på 6. plass i Fjordkraft-ligaen. Patrick Thoresen var igjen lagets poengkonge og står med 61 poeng i SIL-arkivets sesongoversikt.',
      'I kvartfinalen mot Vålerenga snudde Storhamar en dramatisk serie og avanserte 4–2 i kamper. Stjernen ble deretter slått 4–1 i semifinalen.',
      'Finalen mot Stavanger Oilers ble langt tøffere. Oilers vant de fire kampene 6–0, 2–1, 3–1 og 5–2 og tok kongepokalen med 4–0 i finaleserien.',
      'Sesongen markerte likevel en viktig normalisering etter pandemien: for første gang siden 2019 ble et norsk NM-sluttspill igjen spilt helt fram til en mester.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Fjordkraft-ligaen', 'NM-sluttspill'], coaches: [], captains: [], roster: [],
    standings: [{ competition: 'Fjordkraft-ligaen', position: 6 }],
    playoffSummary: 'NM-finale. Vålerenga ble slått 4–2 i kvartfinalen og Stjernen 4–1 i semifinalen. Stavanger Oilers vant finalen 4–0 i kamper.',
    topScorers: [{ personId: 'player-patrick-thoresen', points: 61, note: 'SIL-arkivets samlede sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2022-nm-final', 'timeline-larrivee-testimonial'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2022-23', title: '2022/23', slug: '2022-23', displayName: '2022/23', startYear: 2022, endYear: 2023,
    summary: 'Storhamar tok 2. plass og nådde NM-finalen for andre år på rad. Finalen mot Stavanger Oilers måtte helt til kamp sju.',
    body: [
      'Storhamar endte på 2. plass i Fjordkraft-ligaen. Patrick Thoresen toppet igjen laget og står med 71 poeng i SIL-arkivets sesongoversikt.',
      'Sesongen inneholdt flere sterke rivaloppgjør. 1. november ble Vålerenga slått 3–2 etter straffer foran 6756 tilskuere i CC Amfi.',
      'I sluttspillet tok Storhamar seg på nytt til finalen mot Stavanger Oilers. Denne gangen ble finaleserien et langt drama som måtte avgjøres i kamp sju. Storhamar ledet serien 2–0 før Oilers slo tilbake og til slutt vant mesterskapet 4–3 i kamper.',
      '10. desember 2022 ble Ole Eskild Dahlstrøms nummer 10 hedret i taket, en formell markering av en av de største spillerne fra klubbens første gullalder.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'legend', id: 'legend-ole-eskild-dahlstrom' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Fjordkraft-ligaen', 'NM-sluttspill'], coaches: ['Petter Thoresen'], captains: ['Patrick Thoresen'], roster: [],
    standings: [{ competition: 'Fjordkraft-ligaen', position: 2 }],
    playoffSummary: 'NM-finale. Stavanger Oilers ble norgesmester etter 4–3 i finalekamper; serien måtte til kamp sju.',
    topScorers: [{ personId: 'player-patrick-thoresen', points: 71, note: 'SIL-arkivets samlede sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2022-dahlstrom-number-10', 'timeline-2023-seven-game-final'], lastVerifiedAt: verifiedAt,
  },
]

export const legends2020To2023: ArchiveLegend[] = [
  {
    id: 'legend-christian-larrivee', title: 'Christian Larrivée · #23', fullName: 'Christian Larrivée', slug: 'christian-larrivee-i-taket',
    summary: '«Talismanen» – tolv Storhamar-sesonger og nummer 23 hedret i taket. SIL-arkivet har motstridende dateringer for selve bannerhevingen.',
    body: [
      'Christian Larrivée spilte først for Storhamar i 2006/07 og kom tilbake i 2010. Over en lang andreperiode ble han en av klubbens mest profilerte og lojale utenlandske spillere.',
      'SIL-arkivets milepælsoversikt sier at drakta ble heist i taket i august 2021. Testimonialoversikten beskriver derimot at covid-19 utsatte testimonialkampen, og at banneret med nummer 23 gikk i taket etter kampen 27. august 2022.',
      'Mitt Storhamar beholder begge opplysningene synlig som en kildekonflikt i stedet for å velge én dato uten videre dokumentasjon.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-christian-larrivee' }, { kind: 'timeline', id: 'timeline-larrivee-number-23' }, { kind: 'timeline', id: 'timeline-larrivee-testimonial' }],
    born: '1982-08-25', birthPlace: 'Gaspé, Quebec, Canada', nationality: 'Canada', position: 'Løper', shirtNumbers: [23],
    storhamarPeriods: [{ fromSeasonId: 'season-2006-07', toSeasonId: 'season-2006-07' }, { fromSeasonId: 'season-2010-11', toSeasonId: 'season-2020-21' }],
    seasonIds: ['season-2006-07', 'season-2010-11', 'season-2011-12', 'season-2012-13', 'season-2013-14', 'season-2014-15', 'season-2015-16', 'season-2016-17', 'season-2017-18', 'season-2018-19', 'season-2019-20', 'season-2020-21'],
    honourIds: ['honour-2018-league', 'honour-2018-nm'], roles: ['spiller', 'hedret draktnummer'], honouredNumber: 23,
    honourReason: 'Klubblegende og «Talismanen» gjennom tolv Storhamar-sesonger.', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'legend-ole-eskild-dahlstrom', title: 'Ole Eskild Dahlstrøm · #10', fullName: 'Ole Eskild Dahlstrøm', slug: 'ole-eskild-dahlstrom-i-taket',
    summary: 'En av norsk hockeys største profiler. Nummer 10 ble heist i taket 10. desember 2022.',
    body: [
      'Dahlstrøm spilte tolv sesonger for Storhamar i periodene 1992–97 og 1998–2005. SIL-arkivet fører fem NM-gull, seks seriegull og 96 offisielle landskamper, i tillegg til Gullpucken i 1995/96.',
      'Han var en av de viktigste offensive profilene i Storhamars første gullalder og satte i 1996/97 en enorm klubbstandard med 92 poeng når alle turneringer regnes sammen.',
      '10. desember 2022 ble draktnummer 10 formelt hedret i taket.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-ole-eskild-dahlstrom' }, { kind: 'timeline', id: 'timeline-2022-dahlstrom-number-10' }],
    born: '1970-03-04', birthPlace: 'Oslo', position: 'Løper', shirtNumbers: [10],
    storhamarPeriods: [{ fromSeasonId: 'season-1992-93', toSeasonId: 'season-1996-97' }, { fromSeasonId: 'season-1998-99', toSeasonId: 'season-2004-05' }],
    seasonIds: ['season-1992-93', 'season-1993-94', 'season-1994-95', 'season-1995-96', 'season-1996-97', 'season-1998-99', 'season-1999-00', 'season-2000-01', 'season-2001-02', 'season-2002-03', 'season-2003-04', 'season-2004-05'],
    honourIds: ['honour-1995-league', 'honour-1995-nm', 'honour-1996-nm', 'honour-1997-league', 'honour-1997-nm', 'honour-2000-nm', 'honour-2001-league', 'honour-2004-league', 'honour-2004-nm'],
    roles: ['spiller', 'landslagsspiller', 'hedret draktnummer'], honouredNumber: 10, honouredAt: '2022-12-10',
    honourReason: 'En av klubbens og norsk hockeys største offensive profiler gjennom tolv Storhamar-sesonger.', lastVerifiedAt: verifiedAt,
  },
]

export const timeline2020To2023: ArchiveTimelineEvent[] = [
  {
    id: 'timeline-2021-season-unfinished', title: 'Enda en sesong uten sluttspill', slug: '2021-sesongen-ikke-fullfort',
    summary: '2020/21 ble aldri fullført. Storhamar står registrert på 2. plass, men det ble ikke spilt NM-sluttspill.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2020-21' }], year: 2021, era: 'Pandemien', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-larrivee-number-23', title: 'Christian Larrivées nummer 23 hedres', slug: 'larrivee-23-i-taket',
    summary: 'SIL-arkivet daterer selve hedringen ulikt: milepælsoversikten sier august 2021, mens testimonialoversikten beskriver bannerheving 27. august 2022.',
    body: ['Datoavviket beholdes synlig i arkivet til originalmaterialet er avstemt.'], completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [{ kind: 'legend', id: 'legend-christian-larrivee' }], year: 2021, era: 'Pandemien', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-2022-nm-final', title: 'Tilbake i NM-finalen', slug: '2022-nm-finale',
    summary: 'Storhamar slo Vålerenga og Stjernen på vei til finalen, men Stavanger Oilers vant finaleserien 4–0.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2021-22' }], year: 2022, era: 'Tilbake etter pandemien', importance: 'notable', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-larrivee-testimonial', title: 'Talismanens testimonial', slug: 'larrivee-testimonial-2022',
    summary: '27. august 2022 fikk Christian Larrivée sin utsatte testimonialkamp. 3019 tilskuere så «Les Etoiles du Talisman» slå Storhamars A-lag 11–3.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'legend', id: 'legend-christian-larrivee' }], date: '2022-08-27', year: 2022, era: 'Tilbake etter pandemien', importance: 'notable', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-2022-dahlstrom-number-10', title: 'Ole Eskild Dahlstrøms nummer 10 i taket', slug: 'dahlstrom-10-i-taket',
    summary: '10. desember 2022 ble Ole Eskild Dahlstrøms draktnummer 10 heist i taket.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'legend', id: 'legend-ole-eskild-dahlstrom' }], date: '2022-12-10', year: 2022, era: 'Legendehyllest', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-2023-seven-game-final', title: 'Finaledrama til kamp sju', slug: '2023-finale-kamp-sju',
    summary: 'Storhamar og Stavanger Oilers møttes i finale for andre året på rad. Storhamar ledet 2–0 i kamper, men Oilers snudde og vant serien 4–3.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2022-23' }], year: 2023, era: 'Veien mot gullrekka', importance: 'major', lastVerifiedAt: verifiedAt,
  },
]

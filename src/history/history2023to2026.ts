import type {
  ArchiveHonour,
  ArchiveLegend,
  ArchivePerson,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'
const olAmfiId = 'arena-hamar-ol-amfi'

export const seasons2023To2026: ArchiveSeason[] = [
  {
    id: 'season-2023-24', title: '2023/24', slug: '2023-24', displayName: '2023/24', startYear: 2023, endYear: 2024,
    summary: 'Starten på en ny gullrekke: Storhamar vant EHL og tok sitt åttende NM-gull etter finaleseier mot Vålerenga.',
    body: [
      'Storhamar dominerte den første EHL-sesongen og sikret klubbens niende seriemesterskap med 10–0 hjemme mot Comet. SIL-arkivets milepælsoversikt daterer mesterskapskampen til 22. februar 2024, mens den detaljerte kampoversikten har en åpenbar månedsfeil og viser 22.03. Selve kampen og tittelen er entydig dokumentert.',
      'Peter Quenneville var sesongens poengkonge med 88 poeng i SIL-arkivets samlede sesongoversikt. Eirik Salsten leverte en stor sesong og ble senere kåret til sluttspillets beste spiller.',
      'I sluttspillet ble Lørenskog slått 4–0 og Frisk Asker 4–1. Finalen mot Vålerenga startet med 5–1 hjemme, og Storhamar vant til slutt finaleserien 4–1.',
      '23. april 2024 ble det åttende NM-gullet sikret med 4–3 etter sudden death i CC Amfi. Dermed fullførte Storhamar klubbens første serie/NM-dobbel siden 2018.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'honour', id: 'honour-2024-league' }, { kind: 'honour', id: 'honour-2024-nm' }, { kind: 'player', id: 'player-peter-quenneville' }, { kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['EHL', 'NM-sluttspill'], coaches: ['Petter Thoresen'], captains: ['Patrick Thoresen'], roster: [],
    standings: [{ competition: 'EHL', position: 1, note: 'Seriemester' }],
    playoffSummary: 'Norgesmester. Lørenskog 4–0, Frisk Asker 4–1 og Vålerenga 4–1 i kamper.',
    topScorers: [{ personId: 'player-peter-quenneville', points: 88, note: 'SIL-arkivets samlede sesongoversikt.' }],
    honourIds: ['honour-2024-league', 'honour-2024-nm'], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2024-league', 'timeline-2024-eighth-nm'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2024-25', title: '2024/25', slug: '2024-25', displayName: '2024/25', startYear: 2024, endYear: 2025,
    summary: 'Storhamar forsvarte begge titlene: seriemesterskap nummer ti og NM-gull nummer ni.',
    body: [
      'Storhamar fortsatte dominansen og vant EHL for andre sesong på rad. 14. februar 2025 ble klubbens tiende seriemesterskap sikret med 7–0 hjemme mot Lillehammer.',
      'Cole Schneider ble en umiddelbar toppspiller etter overgangen til Hamar. Han scoret 33 mål og 64 poeng i EHL og endte med 74 poeng når sluttspillet regnes inn i SIL-arkivets sesongoversikt.',
      'I NM-finalen ventet Stavanger Oilers. Storhamar vant de tre første finalene 3–2 etter sudden death, 2–1 etter sudden death og 6–3.',
      '10. april 2025 ble mesterskapet fullført med 7–5 i DNB Arena. Finaleserien endte 4–0 og Storhamar tok sin niende kongepokal.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'honour', id: 'honour-2025-league' }, { kind: 'honour', id: 'honour-2025-nm' }, { kind: 'player', id: 'player-cole-schneider' }, { kind: 'player', id: 'player-jacob-berglund' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['EHL', 'NM-sluttspill', 'Champions Hockey League'], coaches: ['Petter Thoresen'], captains: [], roster: [],
    standings: [{ competition: 'EHL', position: 1, note: 'Seriemester' }],
    playoffSummary: 'Norgesmester. Stavanger Oilers ble slått 4–0 i finalekamper.',
    topScorers: [{ personId: 'player-cole-schneider', points: 74, note: 'SIL-arkivets samlede sesongoversikt; 64 poeng i selve EHL-grunnserien.' }],
    honourIds: ['honour-2025-league', 'honour-2025-nm'], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2025-league', 'timeline-2025-ninth-nm'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2025-26', title: '2025/26', slug: '2025-26', displayName: '2025/26', startYear: 2025, endYear: 2026,
    summary: 'Tre strake dobler: Storhamar tok seriemesterskap nummer elleve og ble norgesmester for tiende gang.',
    body: [
      'Storhamar vant EHL for tredje sesong på rad. Seriegullet ble sikret med 5–0 borte mot Lørenskog. SIL-arkivets milepælsoversikt daterer dette til 25. februar 2026, mens den detaljerte kampoversikten har kampen 26. februar. Datokonflikten beholdes synlig til fullkontrollen.',
      'Jacob Berglund var sesongens poengkonge med 70 poeng i SIL-arkivets sesongoversikt.',
      'I sluttspillet ble Lillehammer slått 4–0 i kvartfinalen og Stavanger Oilers 4–1 i semifinalen. Frisk Asker ventet i finalen og ga Storhamar den tøffeste finaleserien i gullrekka.',
      'Etter seks finalekamper sto Storhamar igjen som norgesmester. 15. april 2026 vant laget 4–1 borte i Varner Arena og tok finalen 4–2 i kamper. Det var klubbens tiende NM-gull og tredje serie/NM-dobbel på rad.',
      '17. januar 2026 ble også Patrick Thoresens nummer 41 heist i taket og fredet for framtidig bruk.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [],
    related: [{ kind: 'honour', id: 'honour-2026-league' }, { kind: 'honour', id: 'honour-2026-nm' }, { kind: 'legend', id: 'legend-patrick-thoresen' }, { kind: 'player', id: 'player-jacob-berglund' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['EHL', 'NM-sluttspill', 'Champions Hockey League'], coaches: ['Petter Thoresen'], captains: [], roster: [],
    standings: [{ competition: 'EHL', position: 1, note: 'Seriemester' }],
    playoffSummary: 'Norgesmester. Lillehammer 4–0, Stavanger Oilers 4–1 og Frisk Asker 4–2 i kamper.',
    topScorers: [{ personId: 'player-jacob-berglund', points: 70, note: 'SIL-arkivets samlede sesongoversikt.' }],
    honourIds: ['honour-2026-league', 'honour-2026-nm'], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2026-patrick-number-41', 'timeline-2026-league', 'timeline-2026-tenth-nm'], lastVerifiedAt: verifiedAt,
  },
]

export const honours2023To2026: ArchiveHonour[] = [
  {
    id: 'honour-2024-league', title: 'Seriemester 2023/24', slug: 'seriemester-2023-24',
    summary: 'Storhamars niende seriemesterskap, sikret med 10–0 hjemme mot Comet.',
    body: ['SIL-arkivets milepælsoversikt oppgir 22. februar 2024. Den detaljerte kampoversikten har samme kamp/resultat, men viser 22.03.24 selv om sluttspillet allerede var i gang da. Datoavviket markeres framfor å skjules.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2023-24' }], honourType: 'league-championship', seasonId: 'season-2023-24', year: 2024, competition: 'EHL', decidingGame: 'Storhamar – Comet 10–0, februar 2024 (SIL-datoavvik)', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2024-nm', title: 'Norgesmester 2024', slug: 'norgesmester-2024',
    summary: 'Storhamars åttende NM-gull etter 4–1 i finalekamper mot Vålerenga.',
    body: ['Storhamar vant 5–1, tapte 2–5, og fulgte opp med 4–1 og 4–2 før finalen ble avgjort i kamp fem.', '23. april 2024 vant Storhamar 4–3 etter sudden death i CC Amfi og tok kongepokalen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2023-24' }, { kind: 'arena', id: olAmfiId }], honourType: 'norwegian-championship', seasonId: 'season-2023-24', year: 2024, competition: 'NM-sluttspill', finalOpponent: 'Vålerenga', decidingGame: 'Storhamar – Vålerenga 4–3 SD, 23.04.2024', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2025-league', title: 'Seriemester 2024/25', slug: 'seriemester-2024-25',
    summary: 'Storhamars tiende seriemesterskap, sikret med 7–0 hjemme mot Lillehammer.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2024-25' }], honourType: 'league-championship', seasonId: 'season-2024-25', year: 2025, competition: 'EHL', decidingGame: 'Storhamar – Lillehammer 7–0, 14.02.2025', keyPersonIds: ['player-cole-schneider'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2025-nm', title: 'Norgesmester 2025', slug: 'norgesmester-2025',
    summary: 'Storhamars niende NM-gull etter 4–0 i finalekamper mot Stavanger Oilers.',
    body: ['Storhamar vant de to første finalene etter sudden death og tok deretter 6–3 hjemme.', '10. april 2025 ble finalen avgjort med 7–5 i Stavanger.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2024-25' }], honourType: 'norwegian-championship', seasonId: 'season-2024-25', year: 2025, competition: 'NM-sluttspill', finalOpponent: 'Stavanger Oilers', decidingGame: 'Stavanger Oilers – Storhamar 5–7, 10.04.2025', keyPersonIds: ['player-cole-schneider'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2026-league', title: 'Seriemester 2025/26', slug: 'seriemester-2025-26',
    summary: 'Storhamars ellevte seriemesterskap, sikret med 5–0 borte mot Lørenskog.',
    body: ['SIL-arkivets milepælsoversikt oppgir 25. februar 2026, mens den detaljerte EHL-kampoversikten daterer 0–5-kampen til 26. februar. Resultat og mesterskap er entydige; datoavviket beholdes til fullkontrollen.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2025-26' }], honourType: 'league-championship', seasonId: 'season-2025-26', year: 2026, competition: 'EHL', decidingGame: 'Lørenskog – Storhamar 0–5, februar 2026 (SIL-datoavvik)', keyPersonIds: ['player-jacob-berglund'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-2026-nm', title: 'Norgesmester 2026', slug: 'norgesmester-2026',
    summary: 'Storhamar ble norgesmester for tiende gang etter 4–2 i finalekamper mot Frisk Asker.',
    body: ['Finaleserien åpnet med Frisk-seier i Hamar før Storhamar vant tre på rad. Frisk reduserte i kamp fem, men Storhamar avgjorde borte i kamp seks.', '15. april 2026 ble mesterskapet sikret med 4–1 i Varner Arena. Det fullførte klubbens tredje strake serie/NM-dobbel.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2025-26' }], honourType: 'norwegian-championship', seasonId: 'season-2025-26', year: 2026, competition: 'NM-sluttspill', finalOpponent: 'Frisk Asker', decidingGame: 'Frisk Asker – Storhamar 1–4, 15.04.2026', keyPersonIds: ['player-jacob-berglund'], lastVerifiedAt: verifiedAt,
  },
]

export const players2023To2026: ArchivePerson[] = [
  {
    id: 'player-peter-quenneville', title: 'Peter Quenneville', fullName: 'Peter Quenneville', slug: 'peter-quenneville',
    summary: 'Produktiv Storhamar-forward og poengkonge i dobbelgullsesongen 2023/24.',
    body: ['Quenneville var en sentral del av BBQ-rekka allerede i 2022/23 og tok enda et steg sesongen etter. SIL-arkivet fører ham som poengkonge i 2023/24 med 88 poeng.', 'SIL-arkivets adelskalender fører 116 Storhamar-kamper og 157 poeng, fordelt på 74 mål og 83 assist, gjennom de to registrerte sesongene.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2023-24' }, { kind: 'honour', id: 'honour-2024-nm' }],
    position: 'Løper', storhamarPeriods: [{ fromSeasonId: 'season-2022-23', toSeasonId: 'season-2023-24' }], seasonIds: ['season-2022-23', 'season-2023-24'], honourIds: ['honour-2024-league', 'honour-2024-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-cole-schneider', title: 'Cole Schneider', fullName: 'Cole Schneider', slug: 'cole-schneider',
    summary: 'Amerikansk toppsignering som ble både mål- og poengkonge i sin eneste Storhamar-sesong og avsluttet den med dobbelgull.',
    body: ['Schneider kom med en lang AHL-karriere og NHL-erfaring fra Buffalo Sabres. Han fikk en sterk CHL-debut og ble etter hvert en dominant, effektiv spiller i EHL.', 'SIL-arkivet fører 33 mål og 64 poeng på 45 EHL-kamper, deretter ti poeng på elleve sluttspillkamper. Med CHL endte han med 78 poeng på 60 kamper totalt.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2024-25' }, { kind: 'honour', id: 'honour-2025-nm' }],
    born: '1990-08-26', birthPlace: 'Williamsville, NY, USA', nationality: 'USA', position: 'Løper', shirtNumbers: [24], storhamarPeriods: [{ fromSeasonId: 'season-2024-25', toSeasonId: 'season-2024-25' }], seasonIds: ['season-2024-25'], honourIds: ['honour-2025-league', 'honour-2025-nm'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
]

export const legends2023To2026: ArchiveLegend[] = [
  {
    id: 'legend-patrick-thoresen', title: 'Patrick Thoresen · #41', fullName: 'Patrick Thoresen', slug: 'patrick-thoresen-i-taket',
    summary: 'Storhamar-profil, internasjonal toppspiller og klubbbygger. Nummer 41 ble heist i taket 17. januar 2026.',
    body: ['Patrick Thoresen hadde store deler av karrieren i sterke utenlandske ligaer, men beholdt hele veien en tett tilknytning til Storhamar. Etter returen som voksen ble han en sentral kultur- og lagbygger.', 'Storhamar Hockey annonserte at nummer 41 skulle fredes for all framtid. Banneret ble heist i forbindelse med hjemmekampen mot Stavanger Oilers 17. januar 2026.', 'SIL-arkivets adelskalender etter 2025/26 fører ni Storhamar-sesonger, 401 kamper og 484 poeng.'],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'player', id: 'player-patrick-thoresen' }, { kind: 'timeline', id: 'timeline-2026-patrick-number-41' }],
    position: 'Løper', shirtNumbers: [41], storhamarPeriods: [{ note: 'Ni Storhamar-sesonger er registrert i SIL-arkivets adelskalender etter 2025/26.' }], seasonIds: ['season-2017-18', 'season-2018-19', 'season-2019-20', 'season-2020-21', 'season-2021-22', 'season-2022-23', 'season-2023-24', 'season-2024-25', 'season-2025-26'],
    honourIds: ['honour-2018-league', 'honour-2018-nm', 'honour-2024-league', 'honour-2024-nm', 'honour-2025-league', 'honour-2025-nm', 'honour-2026-league', 'honour-2026-nm'], roles: ['spiller', 'kaptein', 'landslagsspiller', 'hedret draktnummer'], honouredNumber: 41, honouredAt: '2026-01-17', honourReason: 'Internasjonal toppspiller, Storhamar-profil og klubbbygger.', lastVerifiedAt: verifiedAt,
  },
]

export const timeline2023To2026: ArchiveTimelineEvent[] = [
  { id: 'timeline-2024-league', title: 'Seriemester for niende gang', slug: '2024-seriegull', summary: 'Storhamar sikret seriegullet med 10–0 hjemme mot Comet. SIL-kilder har et datofeil/avvik på måneden.', completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2024-league' }], year: 2024, era: 'Tre strake dobler', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2024-eighth-nm', title: 'Åttende NM-gull', slug: '2024-atte-nm-gull', summary: '23. april 2024 slo Storhamar Vålerenga 4–3 etter sudden death og vant finaleserien 4–1.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2024-nm' }], date: '2024-04-23', year: 2024, era: 'Tre strake dobler', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2025-league', title: 'Seriemester for tiende gang', slug: '2025-seriegull', summary: '14. februar 2025 slo Storhamar Lillehammer 7–0 og sikret klubbens tiende seriemesterskap.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2025-league' }], date: '2025-02-14', year: 2025, era: 'Tre strake dobler', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2025-ninth-nm', title: 'Niende NM-gull', slug: '2025-niende-nm-gull', summary: '10. april 2025 vant Storhamar 7–5 i Stavanger og feide Oilers 4–0 i finaleserien.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2025-nm' }], date: '2025-04-10', year: 2025, era: 'Tre strake dobler', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2026-patrick-number-41', title: 'Patrick Thoresens #41 i taket', slug: '2026-patrick-41', summary: '17. januar 2026 heiste Storhamar nummer 41 i taket og fredet nummeret for all framtid.', completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'legend', id: 'legend-patrick-thoresen' }], date: '2026-01-17', year: 2026, era: 'Tre strake dobler', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2026-league', title: 'Seriemester for ellevte gang', slug: '2026-seriegull', summary: 'Storhamar slo Lørenskog 5–0 borte og sikret sitt ellevte seriemesterskap. SIL-kilder avviker med én dag på datoen.', completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2026-league' }], year: 2026, era: 'Tre strake dobler', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2026-tenth-nm', title: 'Norgesmester for tiende gang', slug: '2026-tiende-nm-gull', summary: '15. april 2026 vant Storhamar 4–1 borte mot Frisk Asker og tok sitt tiende NM-gull med 4–2 i finalekamper.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-2026-nm' }], date: '2026-04-15', year: 2026, era: 'Tre strake dobler', importance: 'major', lastVerifiedAt: verifiedAt },
]

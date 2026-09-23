import type { ArchivePerson, ArchiveRecord, ArchiveSeason, ArchiveTimelineEvent } from './types'

const verifiedAt = '2026-09-24'

export const seasons1961To1967: ArchiveSeason[] = [
  {
    id: 'season-1961-62', title: '1961/62', slug: '1961-62', displayName: '1961/62', startYear: 1961, endYear: 1962,
    summary: 'Storhamar vant 3. divisjon og kvalifiseringen. Klubben tok sitt første sportslige opprykk etter å ha slått Drammen BK i kvalifiseringen.',
    body: ['Utviklingen fortsatte i høyt tempo. Storhamar vant avdelingen og kvalifiseringen. En serieomlegging gjorde at laget fortsatt befant seg på nivå tre i det nye systemet, men motstanden ble sterkere.', 'Steinar Johansen er oppført som sesongens fremste målscorer med 19 mål. Eldre målstatistikk er merket som mangelfull i SIL-arkivet.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1957-67' }, { kind: 'legend', id: 'legend-steinar-johansen' }, { kind: 'arena', id: 'arena-storhamarbana' }],
    competitions: ['3. divisjon', 'Kvalifisering'], coaches: [], captains: [], roster: [], standings: [{ competition: '3. divisjon', position: 1 }], playoffSummary: 'Vant kvalifiseringen og sikret klubbens første sportslige opprykk.', topScorers: [{ personId: 'legend-steinar-johansen', goals: 19, note: 'Eldre målstatistikk er mangelfull.' }], honourIds: [], jerseyIds: ['jersey-1957-67'], arenaIds: ['arena-storhamarbana'], notableMomentIds: ['timeline-1962-first-promotion'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1962-63', title: '1962/63', slug: '1962-63', displayName: '1962/63', startYear: 1962, endYear: 1963,
    summary: 'Storhamar vant 3. divisjon på nytt og rykket opp til 2. divisjon. Det var et gjennombrudd som vakte oppsikt langt utenfor Hamar.',
    body: ['Storhamar fortsatte kometkarrieren og gikk til topps også i den sterkere avdelingen. Opprykket til 2. divisjon i 1963 gjorde Storhamar til det første laget fra Hamar, uansett idrett, på dette nivået.', 'Sven Ole Flensborg er oppført med 13 mål og som sesongens fremste målscorer.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1957-67' }, { kind: 'player', id: 'player-sven-ole-flensborg' }, { kind: 'arena', id: 'arena-storhamarbana' }],
    competitions: ['3. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '3. divisjon', position: 1 }], topScorers: [{ personId: 'player-sven-ole-flensborg', goals: 13, note: 'Eldre målstatistikk er mangelfull.' }], honourIds: [], jerseyIds: ['jersey-1957-67'], arenaIds: ['arena-storhamarbana'], notableMomentIds: ['timeline-1963-promotion'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1963-64', title: '1963/64', slug: '1963-64', displayName: '1963/64', startYear: 1963, endYear: 1964,
    summary: 'Debutsesongen i 2. divisjon endte med 8. plass og nedrykk, etter at laget gikk inn i sesongen med svekket mannskap.',
    body: ['Militærtjeneste for flere spillere svekket laget foran debuten på det nye nivået. Storhamar endte sist og rykket ned, men tilbakeslaget skulle bli kortvarig.', 'Steinar Johansen er oppført som lagets fremste målscorer med fire mål i den tilgjengelige oversikten.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1957-67' }, { kind: 'legend', id: 'legend-steinar-johansen' }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 8 }], playoffSummary: 'Nedrykk fra 2. divisjon.', topScorers: [{ personId: 'legend-steinar-johansen', goals: 4, note: 'Eldre målstatistikk er mangelfull.' }], honourIds: [], jerseyIds: ['jersey-1957-67'], arenaIds: ['arena-storhamarbana'], notableMomentIds: ['timeline-1964-relegation'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1964-65', title: '1964/65', slug: '1964-65', displayName: '1964/65', startYear: 1964, endYear: 1965,
    summary: 'Storhamar slo tilbake umiddelbart, vant 3. divisjon og kvalifiserte seg tilbake til 2. divisjon.',
    body: ['Nedrykket ble bare en kort stopp. Storhamar vant avdelingen, ble divisjonsmester og sikret nytt opprykk gjennom kvalifisering.', '28. februar 1965 spilte Storhamar sin første innendørskamp, borte mot Sparta i Sparta Amfi. Kampen endte 5–7.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1957-67' }, { kind: 'player', id: 'player-sven-ole-flensborg' }],
    competitions: ['3. divisjon', 'Kvalifisering'], coaches: [], captains: [], roster: [], standings: [{ competition: '3. divisjon', position: 1 }], playoffSummary: 'Divisjonsmester og opprykk etter kvalifisering.', topScorers: [{ personId: 'player-sven-ole-flensborg', goals: 9, note: 'SIL-arkivet fører ni mål i kvalifiseringsstatistikken; eldre målstatistikk er mangelfull.' }], honourIds: [], jerseyIds: ['jersey-1957-67'], arenaIds: ['arena-storhamarbana'], notableMomentIds: ['timeline-1965-first-indoor', 'timeline-1965-promotion'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1965-66', title: '1965/66', slug: '1965-66', displayName: '1965/66', startYear: 1965, endYear: 1966,
    summary: 'Tilbake i 2. divisjon etablerte Storhamar seg med 4. plass.',
    body: ['Etter opprykket viste Storhamar at klubben kunne hevde seg på nivået. Laget endte på 4. plass i 2. divisjon.', 'Jan Sindre Larsen er oppført som sesongens fremste målscorer med fem mål i sesongoversikten.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1957-67' }, { kind: 'player', id: 'player-jan-sindre-larsen' }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 4 }], topScorers: [{ personId: 'player-jan-sindre-larsen', goals: 5, note: 'Eldre målstatistikk er mangelfull.' }], honourIds: [], jerseyIds: ['jersey-1957-67'], arenaIds: ['arena-storhamarbana'], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1966-67', title: '1966/67', slug: '1966-67', displayName: '1966/67', startYear: 1966, endYear: 1967,
    summary: 'Storhamar tok 2. plass i 2. divisjon og avsluttet den første tiårsperioden med klubbens beste plassering på nivået så langt.',
    body: ['Sesongen markerte at Storhamar var blitt et stabilt topplag i 2. divisjon. Andreplassen var en av klubbens sterkeste plasseringer i kometkarrieren på 1960-tallet.', 'Sven Ole Flensborg avsluttet sin Storhamar-karriere som sesongens fremste målscorer med ti mål.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1957-67' }, { kind: 'player', id: 'player-sven-ole-flensborg' }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 2 }], topScorers: [{ personId: 'player-sven-ole-flensborg', goals: 10, note: 'Eldre målstatistikk er mangelfull.' }], honourIds: [], jerseyIds: ['jersey-1957-67'], arenaIds: ['arena-storhamarbana'], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
]

export const players1961To1967: ArchivePerson[] = [
  {
    id: 'player-sven-ole-flensborg', title: 'Sven Ole Flensborg', fullName: 'Sven Ole Flensborg', slug: 'sven-ole-flensborg',
    summary: 'Målfarlig Storhamar-forward som var sentral i klubbens raske klatring på 1960-tallet.',
    body: ['Flensborg debuterte på A-laget allerede som 15-åring. Han spilte sju sesonger fra 1960 til 1967 og var særlig viktig i opprykkssesongene, med 47 registrerte mål på 70 kamper i SIL-arkivets samlede statistikk.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: 'jersey-1957-67' }], position: 'Løper', storhamarPeriods: [{ fromSeasonId: 'season-1960-61', toSeasonId: 'season-1966-67' }], seasonIds: ['season-1960-61', 'season-1961-62', 'season-1962-63', 'season-1963-64', 'season-1964-65', 'season-1965-66', 'season-1966-67'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
]

export const records1961To1967: ArchiveRecord[] = [
  {
    id: 'record-1961-25-1-hjellum', title: '25–1 mot Hjellum', slug: '1961-25-1-hjellum',
    summary: '25. januar 1961 vant Storhamar 25–1 borte mot Hjellum. SIL-arkivet fører kampen som klubbens største seier i milepælsoversikten.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1960-61' }], recordType: 'game', value: '25–1', date: '1961-01-25', seasonId: 'season-1960-61', lastVerifiedAt: verifiedAt,
  },
]

export const timeline1961To1967: ArchiveTimelineEvent[] = [
  {
    id: 'timeline-1961-biggest-win', title: '25–1 mot Hjellum', slug: '1961-25-1-hjellum', summary: '25. januar 1961 tok Storhamar en 25–1-seier borte mot Hjellum.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'record', id: 'record-1961-25-1-hjellum' }], date: '1961-01-25', year: 1961, era: 'Kometkarrieren', importance: 'notable', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1962-first-promotion', title: 'Første opprykk', slug: '1962-forste-opprykk', summary: 'Storhamar slo Drammen BK i kvalifiseringen og sikret klubbens første opprykk.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1961-62' }], year: 1962, era: 'Kometkarrieren', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1964-relegation', title: 'Første nedrykk', slug: '1964-nedrykk', summary: 'Et svekket Storhamar-lag rykket ned fra 2. divisjon etter debutsesongen på nivået.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1963-64' }], year: 1964, era: 'Kometkarrieren', importance: 'context', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1965-first-indoor', title: 'Første kamp innendørs', slug: '1965-forste-kamp-innendors', summary: '28. februar 1965 spilte Storhamar sin første innendørskamp. Sparta vant 7–5 i Sparta Amfi.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1964-65' }], date: '1965-02-28', year: 1965, era: 'Kometkarrieren', importance: 'notable', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1965-promotion', title: 'Tilbake til 2. divisjon', slug: '1965-opprykk', summary: 'Storhamar vant 3. divisjon og rykket tilbake til 2. divisjon etter kvalifisering.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1964-65' }], year: 1965, era: 'Kometkarrieren', importance: 'major', lastVerifiedAt: verifiedAt,
  },
]

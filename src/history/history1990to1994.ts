import type {
  ArchiveArena,
  ArchiveHonour,
  ArchiveLegend,
  ArchivePerson,
  ArchiveRecord,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'
const oldHallId = 'arena-storhamar-ishall'
const olAmfiId = 'arena-hamar-ol-amfi'
const goldenJerseyId = 'jersey-1989-98'

export const seasons1990To1994: ArchiveSeason[] = [
  {
    id: 'season-1990-91', title: '1990/91', slug: '1990-91', displayName: '1990/91', startYear: 1990, endYear: 1991,
    summary: 'En tung overgangssesong endte med 7. plass i første seriedel og 6. plass i den andre. Tom Erik Olsen kom til Storhamar og ble poengkonge med 34 poeng.',
    body: [
      'Etter flere år nær toppen fikk Storhamar en kraftig nedtur. Lenny Eriksson ble avsatt etter 14 seriekamper da laget sto med ni poeng og lå langt under forventningene.',
      'Det viktigste som skjedde rundt klubben var likevel større enn tabellen. I oktober 1990 ble det vedtatt at en olympisk ishall med rundt 6000 plasser skulle bygges ved Storhamar. Beskjeden ga klubben et helt nytt framtidsperspektiv.',
      'Tom Erik Olsen kom til Hamar fra Frisk og scoret 21 mål og 34 poeng på 30 seriekamper. Det ble starten på 16 Storhamar-sesonger og en karriere som senere skulle gjøre nummer 9 til et hedret draktnummer.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'legend', id: 'legend-tom-erik-olsen' }, { kind: 'arena', id: oldHallId }, { kind: 'timeline', id: 'timeline-1990-ol-arena-approved' }],
    competitions: ['Eliteserien del 1', 'Eliteserien del 2'], coaches: ['Lenny Eriksson'], captains: [], roster: [],
    standings: [{ competition: 'Eliteserien del 1', position: 7 }, { competition: 'Eliteserien del 2', position: 6 }],
    topScorers: [{ personId: 'legend-tom-erik-olsen', points: 34, goals: 21, assists: 13 }], honourIds: [], jerseyIds: [goldenJerseyId], arenaIds: [oldHallId], notableMomentIds: ['timeline-1990-ol-arena-approved'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1991-92', title: '1991/92', slug: '1991-92', displayName: '1991/92', startYear: 1991, endYear: 1992,
    summary: 'Storhamar svarte på nedturen med en tung satsing: 2. plass i første seriedel, 4. plass i den andre og semifinale.',
    body: [
      'Storhamar hentet Åge Ellingsen tilbake og signerte Petter Thoresen og Rune Gulliksen. Med Lennart Åhlberg som trener ble laget igjen omtalt som en reell gullkandidat.',
      'Hjemme så laget ofte ut som et mesterskapslag, mens borteresultatene var svakere. Storhamar ble nummer to før jul, nummer fire i andre del og nådde semifinalen. Der vant klubben sin første sluttspillkamp siden gjennombruddet i 1985.',
      'Sesongen gjenopplivet også Mjøsderbyet etter at Lillehammer kom opp. SILs sesongside fører Rune Gulliksen med 57 poeng og 33 mål, mens den overordnede sesongoversikten fører 53 poeng. Avviket beholdes som kildekonflikt til kampstatistikken er fullstendig avstemt.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-rune-gulliksen' }, { kind: 'player', id: 'player-petter-thoresen' }, { kind: 'player', id: 'player-age-ellingsen' }, { kind: 'timeline', id: 'timeline-1992-first-playoff-advance' }],
    competitions: ['Eliteserien del 1', 'Eliteserien del 2', 'NM-sluttspill'], coaches: ['Lennart Åhlberg'], captains: [], roster: [],
    standings: [{ competition: 'Eliteserien del 1', position: 2 }, { competition: 'Eliteserien del 2', position: 4 }], playoffSummary: 'Semifinale. Første avansement i sluttspillet etter 9–5 mot Viking i kvartfinalepulja 12. mars 1992.',
    topScorers: [{ personId: 'player-rune-gulliksen', goals: 33, note: 'Kildekonflikt i SIL-arkivet: sesongsiden oppgir 57 poeng, hovedoversikten 53.' }],
    honourIds: [], jerseyIds: [goldenJerseyId], arenaIds: [oldHallId], notableMomentIds: ['timeline-1992-first-playoff-advance'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1992-93', title: '1992/93', slug: '1992-93', displayName: '1992/93', startYear: 1992, endYear: 1993,
    summary: 'Storhamar flyttet inn i Hamar OL-Amfi og tok sin første Eliteserie-tittel. Første seriedel endte på 3. plass, den andre med 1. plass og sluttspillet med semifinale.',
    body: [
      'Dette var sesongen hvor rammene rundt Storhamar forandret seg for alltid. Laget startet sesongen i den gamle Storhamar Ishall, men 6. desember 1992 åpnet Hamar OL-Amfi med 8–4 over Stjernen foran 6021 tilskuere.',
      'I januar åpnet Storhamar andre seriedel med historiske 10–1 borte mot Vålerenga i Oslo Spektrum. 28. februar 1993 ble klubbens første Eliteserie-tittel sikret med 4–0 hjemme mot Vålerenga.',
      'Laget røk senere i semifinalen. Rune Gulliksen er ført som sesongens poengkonge med 46 poeng i SIL-arkivets samlede sesongoversikt. Ole Eskild Dahlstrøm, Martin Åhlberg og flere andre nye profiler ga samtidig laget et tydelig gullalderpreg.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [],
    related: [{ kind: 'arena', id: olAmfiId }, { kind: 'honour', id: 'honour-1993-first-eliteserie' }, { kind: 'player', id: 'player-rune-gulliksen' }, { kind: 'player', id: 'player-ole-eskild-dahlstrom' }, { kind: 'timeline', id: 'timeline-1992-ol-amfi-opens' }],
    competitions: ['Eliteserien del 1', 'Eliteserien del 2', 'NM-sluttspill'], coaches: ['Lennart Åhlberg'], captains: [], roster: [],
    standings: [{ competition: 'Eliteserien del 1', position: 3 }, { competition: 'Eliteserien del 2', position: 1, note: 'Eliteseriemester' }], playoffSummary: 'Semifinale.',
    topScorers: [{ personId: 'player-rune-gulliksen', points: 46, note: 'SIL-arkivets hovedoversikt.' }], honourIds: ['honour-1993-first-eliteserie'], jerseyIds: [goldenJerseyId], arenaIds: [oldHallId, olAmfiId], notableMomentIds: ['timeline-1992-ol-amfi-opens', 'timeline-1993-first-eliteserie', 'timeline-1993-vif-10-1'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1993-94', title: '1993/94', slug: '1993-94', displayName: '1993/94', startYear: 1993, endYear: 1994,
    summary: 'Første hele sesong i Hamar OL-Amfi ga 1. plass i første seriedel, 2. plass i andre del og klubbens første NM-finale.',
    body: [
      'SIL-arkivet beskriver 1993/94 som den beste sesongen i klubbhistorien fram til da. Storhamar vant høstserien, scoret i snitt rundt 5,5 mål per kamp og fylte den nye OL-Amfien.',
      '14. november 1993 ble det første seriemesterskapet i høstdelen sikret med 7–3 mot Furuset i Gjøvik Fjellhall, dit hele 3700 tilskuere kom. I den andre seriedelen ble Storhamar nummer to.',
      'Martin Åhlberg og Erik Kristiansen hadde et voldsomt offensivt samarbeid. Åhlberg leverte 47 mål og 70 poeng. Storhamar nådde så sin første NM-finale, men tapte finaleserien 1–3 mot Lillehammer.',
    ],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [],
    related: [{ kind: 'arena', id: olAmfiId }, { kind: 'honour', id: 'honour-1993-first-series' }, { kind: 'player', id: 'player-martin-ahlberg' }, { kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'timeline', id: 'timeline-1994-first-nm-final' }],
    competitions: ['Eliteserien del 1', 'Eliteserien del 2', 'NM-sluttspill'], coaches: ['Lennart Åhlberg'], captains: [], roster: [],
    standings: [{ competition: 'Eliteserien del 1', position: 1, note: 'Seriemester i høstserien' }, { competition: 'Eliteserien del 2', position: 2 }], playoffSummary: 'Første NM-finale i klubbhistorien. Tap 1–3 i kamper mot Lillehammer.',
    topScorers: [{ personId: 'player-martin-ahlberg', points: 70, goals: 47 }, { personId: 'player-erik-kristiansen', assists: 33 }], honourIds: ['honour-1993-first-series'], jerseyIds: [goldenJerseyId], arenaIds: [olAmfiId], notableMomentIds: ['timeline-1993-first-series', 'timeline-1994-first-nm-final'], lastVerifiedAt: verifiedAt,
  },
]

export const honours1990To1994: ArchiveHonour[] = [
  {
    id: 'honour-1993-first-eliteserie', title: 'Eliteseriemester 1992/93', slug: 'eliteseriemester-1992-93',
    summary: 'Storhamars første tittel på øverste nivå, sikret 28. februar 1993 med 4–0 hjemme mot Vålerenga.',
    body: ['Storhamar vant andre del av Eliteserien 1992/93 og tok dermed klubbens første toppserietittel. Triumfen kom bare måneder etter innflyttingen i Hamar OL-Amfi og ble et tydelig startpunkt for gullalderen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1992-93' }, { kind: 'arena', id: olAmfiId }], honourType: 'league-championship', seasonId: 'season-1992-93', year: 1993, competition: 'Eliteserien del 2', decidingGame: 'Storhamar – Vålerenga 4–0, 28.02.1993', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'honour-1993-first-series', title: 'Seriemester høsten 1993', slug: 'seriemester-host-1993',
    summary: 'Storhamar vant første del av 1993/94-serien og ble seriemester etter 7–3 mot Furuset i Gjøvik 14. november 1993.',
    body: ['Datidens Eliteserie var delt i to deler. Denne tittelen skal derfor beholdes med det historiske konkurransenavnet og ikke blandes sammen med Eliteserie-tittelen fra februar samme år.', 'Avgjørelsen falt mot Furuset i Gjøvik Fjellhall. Omkring 3700 tilskuere fulgte Storhamar over Mjøsbrua og så laget vinne 7–3.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1993-94' }], honourType: 'league-championship', seasonId: 'season-1993-94', year: 1993, competition: 'Eliteserien del 1', decidingGame: 'Furuset – Storhamar 3–7, 14.11.1993, Gjøvik Fjellhall', keyPersonIds: [], lastVerifiedAt: verifiedAt,
  },
]

export const legends1990To1994: ArchiveLegend[] = [
  {
    id: 'legend-tom-erik-olsen', title: 'Tom Erik Olsen', fullName: 'Tom Erik Olsen', slug: 'tom-erik-olsen',
    summary: 'En av Storhamars største og mest trofaste profiler: 680 kamper, 379 mål og nummer 9 hedret i taket.',
    body: ['Tom Erik Olsen kom overraskende fra Frisk til Storhamar i 1990 og ble værende i 16 sesonger. SIL-arkivet fører 680 kamper, 379 mål og 744 poeng totalt.', 'Han vant fem NM-gull og seks seriemesterskap. 4. september 2009 ble draktnummer 9 hedret med eget banner i Hamar OL-Amfi.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1990-91' }, { kind: 'arena', id: olAmfiId }],
    born: '1970-03-20', birthPlace: 'Oslo', position: 'Løper', shirtNumbers: [9], storhamarPeriods: [{ fromSeasonId: 'season-1990-91', toSeasonId: 'season-2005-06' }], seasonIds: ['season-1990-91', 'season-1991-92', 'season-1992-93', 'season-1993-94'], honourIds: ['honour-1993-first-eliteserie', 'honour-1993-first-series'], roles: ['spiller', 'hedret draktnummer'], honouredNumber: 9, honouredAt: '2009-09-04', honourReason: 'En av klubbens mest trofaste og produktive spillere gjennom 16 sesonger.', lastVerifiedAt: verifiedAt,
  },
]

export const players1990To1994: ArchivePerson[] = [
  {
    id: 'player-rune-gulliksen', title: 'Rune Gulliksen', fullName: 'Rune Gulliksen', slug: 'rune-gulliksen',
    summary: '«Hurtigtoget fra Fredrikstad» ble en sentral del av Storhamars overgang fra utfordrer til mesterlag.',
    body: ['Gulliksen kom sommeren 1991 etter sterke sesonger i Trondheim. Med stor fart og teknikk gikk han rett inn som en av Storhamars viktigste spillere.', 'Han spilte seks sesonger på Hamar, vant tre NM-gull og fire seriemesterskap og fortsatte senere i trener- og sportslige roller i klubben.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1991-92' }, { kind: 'honour', id: 'honour-1993-first-eliteserie' }],
    born: '1963-01-23', birthPlace: 'Fredrikstad', position: 'Løper', shirtNumbers: [15], storhamarPeriods: [{ fromSeasonId: 'season-1991-92', toSeasonId: 'season-1995-96' }], seasonIds: ['season-1991-92', 'season-1992-93', 'season-1993-94'], honourIds: ['honour-1993-first-eliteserie', 'honour-1993-first-series'], roles: ['spiller', 'senere trener'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-petter-thoresen', title: 'Petter Thoresen', fullName: 'Petter Thoresen', slug: 'petter-thoresen',
    summary: 'Vinnermentaliteten fra Vålerenga som ble hentet til Hamar i 1991 og ble en nøkkelperson både som spiller og senere trener.',
    body: ['Thoresen kom til Storhamar i 1991 i en overgang som SIL-arkivet beskriver som sensasjonell. Han representerte vinnervilje og erfaring i en klubb som var på vei fra utfordrer til dominerende makt.', 'Som spiller fikk han med seg ett NM-gull og fire seriemesterskap. Senere tok han over treneransvaret og ledet laget til flere nye mesterskap.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1991-92' }, { kind: 'honour', id: 'honour-1993-first-eliteserie' }],
    born: '1961-07-25', birthPlace: 'Oslo', position: 'Løper', shirtNumbers: [38], storhamarPeriods: [{ fromSeasonId: 'season-1991-92', toSeasonId: 'season-1994-95' }], seasonIds: ['season-1991-92', 'season-1992-93', 'season-1993-94'], honourIds: ['honour-1993-first-eliteserie', 'honour-1993-first-series'], roles: ['spiller', 'senere trener'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-ole-eskild-dahlstrom', title: 'Ole Eskild Dahlstrøm', fullName: 'Ole Eskild Dahlstrøm', slug: 'ole-eskild-dahlstrom',
    summary: 'Teknisk og karismatisk senter som ble en av de aller største profilene i Storhamars gullalder.',
    body: ['Dahlstrøm kom fra Furuset til Storhamar foran 1992/93 som en etablert stjerne allerede i ung alder. På Hamar utviklet han seg til en av norsk hockeys største profiler.', 'SIL-arkivet fører ham med fem NM-gull, seks seriegull og 96 offisielle landskamper i Storhamar-periodene. Han mottok senere Gullpucken etter 1995/96.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1992-93' }, { kind: 'legend', id: 'legend-tom-erik-olsen' }],
    born: '1970-03-04', birthPlace: 'Oslo', position: 'Løper', shirtNumbers: [10], storhamarPeriods: [{ fromSeasonId: 'season-1992-93', toSeasonId: 'season-1996-97' }, { fromSeasonId: 'season-1998-99', toSeasonId: 'season-2004-05' }], seasonIds: ['season-1992-93', 'season-1993-94'], honourIds: ['honour-1993-first-eliteserie', 'honour-1993-first-series'], roles: ['spiller', 'landslagsspiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-martin-ahlberg', title: 'Martin Åhlberg', fullName: 'Martin Åhlberg', slug: 'martin-ahlberg',
    summary: 'Svensk målmaskin som dannet et fryktet samarbeid med Erik Kristiansen i starten av gullalderen.',
    body: ['Åhlberg kom inn i laget foran 1992/93 og ble raskt en profil. SIL-arkivets elitestatistikk fører 137 mål og 210 poeng på 147 seriekamper for Storhamar.', 'I 1993/94 scoret han 47 mål og 70 poeng og ledet laget til første NM-finale. Den påfølgende sesongen skulle han levere enda mer og være med på klubbens første NM-gull.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1993-94' }, { kind: 'player', id: 'player-erik-kristiansen' }],
    position: 'Løper', storhamarPeriods: [{ fromSeasonId: 'season-1992-93' }], seasonIds: ['season-1992-93', 'season-1993-94'], honourIds: ['honour-1993-first-eliteserie', 'honour-1993-first-series'], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
]

export const arenas1990To1994: ArchiveArena[] = [
  {
    id: olAmfiId, title: 'Hamar OL-Amfi / CC Amfi', name: 'CC Amfi (Hamar OL-Amfi)', slug: 'hamar-ol-amfi-cc-amfi',
    summary: 'Olympiahallen som åpnet for Storhamar 6. desember 1992 og ga klubben rammene for å bli en ledende makt i norsk hockey.',
    body: ['Hallen ble bygget som arena for kunstløp og kortbane under Lillehammer-OL 1994. Storhamar flyttet inn allerede i desember 1992 uten at selve byggingen kostet klubben penger.', 'Første Storhamar-kamp var 8–4 mot Stjernen 6. desember 1992 foran 6021 tilskuere. Ørjan Løvdal scoret hallens første mål, mens Petter Thoresen scoret Storhamars første og endte med hattrick.', 'I februar 2016 fikk hallen navnet CC Amfi etter en navnerettighetsavtale. SIL-arkivets arenaoversikt oppdateres løpende, så historiske totaler skal ikke hardkodes som evige tall i appen.'],
    completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'season', id: 'season-1992-93' }, { kind: 'honour', id: 'honour-1993-first-eliteserie' }, { kind: 'timeline', id: 'timeline-1992-ol-amfi-opens' }],
    aliases: ['Hamar OL-Amfi', 'Nordlyshallen', 'CC Amfi'], city: 'Hamar', opened: '1992-12-06', homeFromSeasonId: 'season-1992-93', notableMomentIds: ['timeline-1992-ol-amfi-opens', 'timeline-1993-first-eliteserie', 'timeline-1994-first-nm-final'], tags: ['hjemmebane', 'OL 1994', 'gullalderen'], lastVerifiedAt: verifiedAt,
  },
]

export const records1990To1994: ArchiveRecord[] = [
  { id: 'record-1993-vif-10-1', title: '10–1 borte mot Vålerenga', slug: '1993-vif-10-1', summary: '7. januar 1993 slo Storhamar Vålerenga 10–1 i Oslo Spektrum. SIL-arkivet omtaler seieren som historisk.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1992-93' }], recordType: 'game', value: '10–1', date: '1993-01-07', seasonId: 'season-1992-93', lastVerifiedAt: verifiedAt },
  { id: 'record-1993-asker-19-2', title: '19–2 mot Asker Hockey', slug: '1993-asker-19-2', summary: '10. januar 1993 scoret Storhamar 19 mål hjemme mot Asker Hockey, inkludert tolv mål i andre periode.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1992-93' }, { kind: 'arena', id: olAmfiId }], recordType: 'game', value: '19–2', date: '1993-01-10', seasonId: 'season-1992-93', lastVerifiedAt: verifiedAt },
]

export const timeline1990To1994: ArchiveTimelineEvent[] = [
  { id: 'timeline-1990-ol-arena-approved', title: 'Olympisk ishall vedtatt', slug: '1990-ol-arena-vedtatt', summary: 'I oktober 1990 ble byggingen av en olympisk ishall med rundt 6000 plasser ved Storhamar vedtatt.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'arena', id: olAmfiId }], year: 1990, era: 'Veien til gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1992-first-playoff-advance', title: 'Første sluttspillavansement', slug: '1992-forste-sluttspillavansement', summary: '12. mars 1992 avanserte Storhamar i NM-sluttspillet for første gang etter 9–5 mot Viking i kvartfinalepulja.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1991-92' }], date: '1992-03-12', year: 1992, era: 'Veien til gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1992-ol-amfi-opens', title: 'Storhamar flytter inn i Hamar OL-Amfi', slug: '1992-ol-amfi-apner', summary: '6. desember 1992 vant Storhamar 8–4 mot Stjernen foran 6021 i den første kampen i Hamar OL-Amfi.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'arena', id: olAmfiId }, { kind: 'season', id: 'season-1992-93' }], date: '1992-12-06', year: 1992, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1993-vif-10-1', title: '10–1 på Vålerenga i Oslo Spektrum', slug: '1993-vif-10-1-timeline', summary: 'Storhamar åpnet andre seriedel med en historisk 10–1-seier borte mot Vålerenga. Erik Kristiansen scoret hattrick.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'record', id: 'record-1993-vif-10-1' }], date: '1993-01-07', year: 1993, era: 'Gullalderen', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1993-first-eliteserie', title: 'Første Eliteserie-tittel', slug: '1993-forste-eliteseriegull', summary: '28. februar 1993 sikret Storhamar klubbens første Eliteserie-tittel med 4–0 hjemme mot Vålerenga.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-1993-first-eliteserie' }, { kind: 'arena', id: olAmfiId }], date: '1993-02-28', year: 1993, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1993-first-series', title: 'Seriemester høsten 1993', slug: '1993-forste-seriemester', summary: '14. november 1993 vant Storhamar 7–3 mot Furuset i Gjøvik og sikret førsteplassen i høstserien.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'honour', id: 'honour-1993-first-series' }, { kind: 'season', id: 'season-1993-94' }], date: '1993-11-14', year: 1993, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1994-first-nm-final', title: 'Første NM-finale', slug: '1994-forste-nm-finale', summary: 'Storhamar nådde sin første NM-finale i 1994, men tapte finaleserien 1–3 mot Lillehammer.', completeness: 'verified', sources: ['silarkivet', 'storhamar-official'], media: [], related: [{ kind: 'season', id: 'season-1993-94' }], year: 1994, era: 'Gullalderen', importance: 'major', lastVerifiedAt: verifiedAt },
]

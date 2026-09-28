import type { ArchiveJersey, ArchivePerson, ArchiveRecord, ArchiveSeason, ArchiveTimelineEvent } from './types'

const verifiedAt = '2026-09-28'
const ishallId = 'arena-storhamar-ishall'

export const seasons1984To1990: ArchiveSeason[] = [
  {
    id: 'season-1984-85', title: '1984/85', slug: '1984-85', displayName: '1984/85', startYear: 1984, endYear: 1985,
    summary: 'Det store gjennombruddet: seriesølv, seier i mellomspillet og Storhamars første NM-sluttspill. Erik Kristiansen vant Gullpucken.',
    body: [
      'Under den karismatiske svenske treneren Lasse Beckmann tok Storhamar steget fra å kjempe for plassen til å bli et av landets beste lag. Serien endte med 2. plass, bare skilt fra Vålerenga på innbyrdes oppgjør, før Storhamar vant mellomspillet.',
      'Laget nådde semifinalen i klubbens første NM-sluttspill. Første sluttspillseier kom 5–4 mot Furuset. Øystein Tronrud avgjorde en av semifinalene i sudden death, men Storhamar nådde ikke finalen.',
      'Erik Kristiansen ble selve symbolet på gjennombruddet. Han førte laget med 67 seriepoeng og endte med 70 poeng inkludert sluttspill. Etter sesongen mottok han Gullpucken som årets norske spiller. Tilskuersnittet steg til 2097.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'player', id: 'player-lenny-eriksson' }, { kind: 'player', id: 'player-arne-bergseng' }, { kind: 'player', id: 'player-jorma-virtanen' }, { kind: 'jersey', id: 'jersey-1984-85' }, { kind: 'arena', id: ishallId }],
    competitions: ['1. divisjon', 'Mellomspill', 'NM-sluttspill'], coaches: ['Lasse Beckmann'], captains: [], roster: [],
    standings: [{ competition: '1. divisjon', position: 2 }, { competition: 'Mellomspill', position: 1 }], playoffSummary: 'Semifinale i klubbens første NM-sluttspill.',
    topScorers: [{ personId: 'player-erik-kristiansen', points: 67, goals: 38, assists: 29, note: 'Seriespill. SIL-arkivet fører 70 poeng inkludert sluttspill.' }],
    honourIds: [], jerseyIds: ['jersey-1984-85'], arenaIds: [ishallId], notableMomentIds: ['timeline-1985-breakthrough', 'timeline-1985-gullpucken-erik'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1985-86', title: '1985/86', slug: '1985-86', displayName: '1985/86', startYear: 1985, endYear: 1986,
    summary: 'Storhamar befestet posisjonen i toppen med 4. plass og ny semifinale. Erik Kristiansen leverte 76 seriepoeng.',
    body: [
      'Forventningene var helt annerledes etter gjennombruddet året før. Storhamar endte på 4. plass og kvalifiserte seg igjen til NM-sluttspillet, der det ble semifinale.',
      'Erik Kristiansen fortsatte å dominere offensivt med 76 poeng i serien. Arne og Lars Bergseng, Lenny Eriksson og resten av stammen gjorde Storhamar til et lag de etablerte toppklubbene måtte regne med.',
      'Den nye Tibås-drakten med brede striper ble introdusert og la grunnlaget for et designuttrykk som, med variasjoner, skulle prege Storhamar i mange år.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'player', id: 'player-arne-bergseng' }, { kind: 'player', id: 'player-lars-bergseng' }, { kind: 'player', id: 'player-lenny-eriksson' }, { kind: 'jersey', id: 'jersey-1985-87' }],
    competitions: ['1. divisjon', 'NM-sluttspill'], coaches: ['Lasse Beckmann'], captains: [], roster: [], standings: [{ competition: '1. divisjon', position: 4 }], playoffSummary: 'Semifinale.',
    topScorers: [{ personId: 'player-erik-kristiansen', points: 76, goals: 41, assists: 35 }], honourIds: [], jerseyIds: ['jersey-1985-87'], arenaIds: [ishallId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1986-87', title: '1986/87', slug: '1986-87', displayName: '1986/87', startYear: 1986, endYear: 1987,
    summary: '5. plass gjorde at Storhamar akkurat mistet sluttspillet. Erik Kristiansen leverte på nytt 76 seriepoeng.',
    body: [
      'Storhamar åpnet sesongen sterkt, blant annet med seier borte mot Vålerenga og en spektakulær kamp i Sparta der laget ledet 7–0 etter første periode og vant 9–6.',
      'Til slutt ble det 5. plass, én plass utenfor sluttspillet. Erik Kristiansen sto igjen med 46 mål og 76 poeng i serien.',
      'Lasse Beckmann forlot trenerjobben vinteren 1987. Den svenske backprofilen Lenny Eriksson tok etter hvert over som spillende trener og ble en sentral leder i neste fase.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'player', id: 'player-lenny-eriksson' }, { kind: 'player', id: 'player-harald-bastiansen' }, { kind: 'jersey', id: 'jersey-1985-87' }],
    competitions: ['1. divisjon'], coaches: ['Lasse Beckmann', 'Lenny Eriksson'], captains: [], roster: [], standings: [{ competition: '1. divisjon', position: 5 }],
    topScorers: [{ personId: 'player-erik-kristiansen', points: 76, goals: 46, assists: 30 }], honourIds: [], jerseyIds: ['jersey-1985-87'], arenaIds: [ishallId], notableMomentIds: ['timeline-1987-lenny-coach'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1987-88', title: '1987/88', slug: '1987-88', displayName: '1987/88', startYear: 1987, endYear: 1988,
    summary: 'Uten Erik Kristiansen og Åge Ellingsen overrasket Storhamar stort: 2. plass i serien og semifinale.',
    body: [
      'Erik Kristiansen og Åge Ellingsen hadde reist til svenske Björklöven, og forventningene til Storhamar var langt lavere. Laget svarte med en av klubbens sterkeste overraskelsessesonger.',
      'Storhamar ble nummer to med 48 poeng på 36 kamper og nådde semifinalen. Lars Bergseng tok et enormt offensivt ansvar og leverte 61 seriepoeng, mens Harald Bastiansen hadde sin beste Storhamar-sesong med 48 poeng.',
      'Lenny Eriksson ledet laget som spillende trener. Prestasjonen viste at Storhamar nå hadde en bredere toppkultur enn bare enkeltstjerner.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-lars-bergseng' }, { kind: 'player', id: 'player-harald-bastiansen' }, { kind: 'player', id: 'player-lenny-eriksson' }],
    competitions: ['1. divisjon', 'NM-sluttspill'], coaches: ['Lenny Eriksson'], captains: [], roster: [], standings: [{ competition: '1. divisjon', position: 2, gamesPlayed: 36, wins: 23, draws: 2, losses: 11, goalsFor: 177, goalsAgainst: 124, points: 48 }], playoffSummary: 'Semifinale.',
    topScorers: [{ personId: 'player-lars-bergseng', points: 61, goals: 41, assists: 20 }], honourIds: [], jerseyIds: [], arenaIds: [ishallId], notableMomentIds: ['timeline-1988-surprise-silver'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1988-89', title: '1988/89', slug: '1988-89', displayName: '1988/89', startYear: 1988, endYear: 1989,
    summary: 'Erik Kristiansen og Åge Ellingsen kom hjem. Storhamar tok ny 2. plass etter blant annet ni strake seire, men røk i semifinalen mot Sparta.',
    body: [
      'Med Kristiansen og Ellingsen tilbake fra Björklöven steg forventningene kraftig. Storhamar vant ni kamper på rad i november og tok serieledelsen etter en svært sterk første halvdel av sesongen.',
      'Laget samlet 31 poeng på de første 18 kampene, men bare 14 på de siste 18. Det holdt likevel til 2. plass. Erik Kristiansen endte med 64 poeng inkludert sluttspill, mens Peter Madach sto for 39 assist.',
      'Sluttspillet ble en nedtur med to strake semifinaletap mot Sparta, der hjemmekampen endte 3–10. Før sesongen hadde Edmonton Oilers undersøkt muligheten for å kjøpe ut Åge Ellingsen, men noen avtale ble det ikke.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'player', id: 'player-age-ellingsen' }, { kind: 'player', id: 'player-peter-madach' }, { kind: 'player', id: 'player-lenny-eriksson' }],
    competitions: ['1. divisjon', 'NM-sluttspill'], coaches: ['Lenny Eriksson'], captains: [], roster: [], standings: [{ competition: '1. divisjon', position: 2 }], playoffSummary: 'Semifinaletap mot Sparta på to kamper.',
    topScorers: [{ personId: 'player-erik-kristiansen', points: 64, goals: 33, note: 'Inkludert sluttspill.' }, { personId: 'player-peter-madach', assists: 39, note: 'Flest assist, inkludert sluttspill.' }], honourIds: [], jerseyIds: [], arenaIds: [ishallId], notableMomentIds: ['timeline-1988-erik-age-return', 'timeline-1989-oilers-age'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1989-90', title: '1989/90', slug: '1989-90', displayName: '1989/90', startYear: 1989, endYear: 1990,
    summary: 'Storhamar var med i gullkampen til to runder gjensto, men endte på 5. plass og mistet sluttspillet på innbyrdes oppgjør.',
    body: [
      '1989/90 var ekstremt jevn. Furuset vant serien med 53 poeng, mens Storhamar endte på 49 — samme poengsum som Stjernen på 4. plass. Innbyrdes oppgjør sendte Stjernen til sluttspill og Storhamar ut.',
      'Storhamar hadde vært med i kampen om seriegullet helt til to runder gjensto, men tok bare ett poeng på de to siste kampene. Erik Kristiansen leverte likevel en av sine største seriesesonger med 77 poeng på 36 kamper.',
      'Sesongen introduserte også Tackla-varianten av draktdesignet som skulle følge klubben gjennom hele den kommende gullalderen. Blant høydepunktene var en sterk 6–2-seier borte mot Vålerenga på Jordal.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'player', id: 'player-peter-madach' }, { kind: 'player', id: 'player-age-ellingsen' }, { kind: 'jersey', id: 'jersey-1989-98' }],
    competitions: ['1. divisjon'], coaches: ['Lenny Eriksson'], captains: [], roster: [], standings: [{ competition: '1. divisjon', position: 5, gamesPlayed: 36, wins: 23, draws: 3, losses: 10, goalsFor: 200, goalsAgainst: 131, points: 49, note: 'Samme poengsum som Stjernen; sluttspillplassen gikk på innbyrdes oppgjør.' }],
    topScorers: [{ personId: 'player-erik-kristiansen', points: 77, goals: 46, assists: 31 }], honourIds: [], jerseyIds: ['jersey-1989-98'], arenaIds: [ishallId], notableMomentIds: ['timeline-1990-playoff-miss'], lastVerifiedAt: verifiedAt,
  },
]

export const players1984To1990: ArchivePerson[] = [
  {
    id: 'player-arne-bergseng', title: 'Arne Bergseng', fullName: 'Arne Bergseng', slug: 'arne-bergseng',
    summary: 'Den «trivelige kjempen» fra Lillehammer ble en sentral brikke da Storhamar etablerte seg som topplag.',
    body: ['Arne Bergseng ble hentet fra Furuset for 70 000 kroner etter en lokal innsamlingsaksjon. Sammen med lillebror Lars dannet den 199 cm høye og rundt 110 kilo tunge løperen en fysisk og målfarlig duo.', 'Han spilte seks Storhamar-sesonger fra 1984 til 1990 og leverte 295 poeng på 177 registrerte kamper i SIL-arkivets samlede statistikk.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1984-85' }, { kind: 'player', id: 'player-lars-bergseng' }],
    born: '1961-03-22', birthPlace: 'Lillehammer', position: 'Løper', shirtNumbers: [25], storhamarPeriods: [{ fromSeasonId: 'season-1984-85', toSeasonId: 'season-1989-90' }], seasonIds: ['season-1984-85', 'season-1985-86', 'season-1986-87', 'season-1987-88', 'season-1988-89', 'season-1989-90'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-lenny-eriksson', title: 'Lenny Eriksson', fullName: 'Lenny Eriksson', slug: 'lenny-eriksson',
    summary: 'Svensk toppback og lederfigur som senere tok over Storhamar som spillende trener.',
    body: ['Lenny Eriksson kom med erfaring fra svensk topphockey og ble en av klubbens viktigste forsterkninger i etableringsfasen. Den sterke backen hadde et hardt og presist slagskudd og produserte ofte mellom 30 og 40 poeng per sesong.', 'Da Lasse Beckmann forlot klubben vinteren 1987 var Eriksson et naturlig valg som trener. Han fungerte som spillende trener i to sesonger før han gikk over i trenerrollen på heltid.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1984-85' }, { kind: 'timeline', id: 'timeline-1987-lenny-coach' }],
    born: '1954-04-26', nationality: 'Sverige', position: 'Back', shirtNumbers: [12], storhamarPeriods: [{ fromSeasonId: 'season-1984-85', toSeasonId: 'season-1988-89' }], seasonIds: ['season-1984-85', 'season-1985-86', 'season-1986-87', 'season-1987-88', 'season-1988-89'], honourIds: [], roles: ['spiller', 'spillende trener', 'trener'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-peter-madach', title: 'Peter Madach', fullName: 'Peter Madach', slug: 'peter-madach',
    summary: 'Elegant svensk løper/back som ble en av Storhamars store profiler fra andre halvdel av 80-tallet og inn i gullalderen.',
    body: ['Madach kom til Storhamar i 1986 med bakgrunn fra svensk topphockey, junior-VM-gull og NHL-draft. Han fant raskt kjemien med Erik Kristiansen og ble en av lagets mest kreative spillere.', 'I 1988/89 sto han for 39 assist. Senere skulle han være med på både NM- og seriegull og score det avgjørende målet da Storhamar tok sin første kongepokal.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'season', id: 'season-1988-89' }],
    born: '1963-02-26', birthPlace: 'Jönköping', nationality: 'Sverige', position: 'Løper / back', shirtNumbers: [14], storhamarPeriods: [{ fromSeasonId: 'season-1986-87', toSeasonId: 'season-1992-93' }, { fromSeasonId: 'season-1994-95', toSeasonId: 'season-1995-96' }], seasonIds: ['season-1986-87', 'season-1987-88', 'season-1988-89', 'season-1989-90'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-age-ellingsen', title: 'Åge Ellingsen', fullName: 'Åge Ellingsen', slug: 'age-ellingsen',
    summary: 'Stor, skuddsterk landslagsback som var blant Storhamars viktigste profiler i etableringen som topplag.',
    body: ['Ellingsen var kjent for et svært hardt og presist slagskudd. Han kom til Storhamar i 1983 og ble valgt på årets lag flere ganger i 80-årene.', 'Han spilte 1987/88 i Björklöven sammen med Erik Kristiansen og returnerte til Hamar året etter. Før 1988/89 undersøkte Edmonton Oilers muligheten for å kjøpe ham ut, uten at det endte i overgang.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1988-89' }, { kind: 'timeline', id: 'timeline-1989-oilers-age' }],
    born: '1962-11-05', birthPlace: 'Oslo', position: 'Back', shirtNumbers: [23], storhamarPeriods: [{ fromSeasonId: 'season-1983-84', toSeasonId: 'season-1986-87' }, { fromSeasonId: 'season-1988-89', toSeasonId: 'season-1989-90' }, { fromSeasonId: 'season-1991-92', toSeasonId: 'season-1993-94' }], seasonIds: ['season-1984-85', 'season-1985-86', 'season-1986-87', 'season-1988-89', 'season-1989-90'], honourIds: [], roles: ['spiller', 'landslagsspiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-jorma-virtanen', title: 'Jorma Virtanen', fullName: 'Jorma Virtanen', slug: 'jorma-virtanen',
    summary: 'Finskfødt keeperprofil som kom til Storhamar i gjennombruddssesongen og senere ble norsk landslagsmålvakt.',
    body: ['Virtanen kom fra Frisk foran 1984/85. På grunn av regler for utenlandske keepere måtte han få norsk pass før han kunne spille, og saksbehandlingen gjorde at debuten først kom langt ut i sesongen.', 'Han var kjent for sin hvite maske, sin aktive spillestil og omtalen av seg selv som «den tredje backen». Virtanen spilte tre sesonger for Storhamar fra 1984 til 1987.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1984-85' }],
    born: '1951-07-11', birthPlace: 'Helsinki', nationality: 'Finland / Norge', position: 'Keeper', shirtNumbers: [29], storhamarPeriods: [{ fromSeasonId: 'season-1984-85', toSeasonId: 'season-1986-87' }], seasonIds: ['season-1984-85', 'season-1985-86', 'season-1986-87'], honourIds: [], roles: ['spiller', 'landslagsspiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-harald-bastiansen', title: 'Harald Bastiansen', fullName: 'Harald Bastiansen', slug: 'harald-bastiansen',
    summary: 'Offensiv Forward-utviklet løper som ble svært viktig da Storhamar mistet to av sine største profiler til Sverige.',
    body: ['Bastiansen kom på utlån fra Furuset i 1986. Han fikk seks offisielle landskamper og ble en sentral offensiv spiller, særlig i 1987/88 da Erik Kristiansen og Åge Ellingsen var i Björklöven.', 'I den sesongen leverte han 48 seriepoeng på 34 kamper og ytterligere to mål i semifinalen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1987-88' }],
    born: '1962-03-07', birthPlace: 'Oslo', position: 'Løper', shirtNumbers: [22], storhamarPeriods: [{ fromSeasonId: 'season-1986-87', toSeasonId: 'season-1987-88' }], seasonIds: ['season-1986-87', 'season-1987-88'], honourIds: [], roles: ['spiller', 'landslagsspiller'], lastVerifiedAt: verifiedAt,
  },
]

export const jerseys1984To1990: ArchiveJersey[] = [
  {
    id: 'jersey-1984-85', title: '1984/85 · Tibås', slug: '1984-85-tibas',
    summary: 'Drakten fra gjennombruddssesongen: en enkel gul og blå Tibås-trøye inspirert av Tre Kronor.',
    body: ['SIL-arkivet beskriver drakten som en nær kopi av Tre Kronors trøye, uten klubbnavn, spillernavn eller tydelig klubbmerke. Gul og blå var likevel i ferd med å bli entydig Storhamar i norsk hockey.', 'Norsk Tipping kom etter hvert inn med en stor svart frontlogo. Mot Manglerud Star, som også spilte i gult, brukte Storhamar det blå settet fra sesongen før som reservedrakt.'],
    completeness: 'verified', sources: ['silarkivet'],
    media: [{ id: 'media-jersey-1984-85', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/84-85-2.png?resize=750%2C473', alt: 'Storhamars gule og blå Tibås-drakt fra 1984/85', caption: 'Tibås-drakten fra gjennombruddssesongen 1984/85.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/1984-85/', seasonIds: ['season-1984-85'], personIds: ['player-erik-kristiansen', 'player-jorma-virtanen', 'player-lenny-eriksson', 'player-arne-bergseng'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.' }],
    related: [{ kind: 'season', id: 'season-1984-85' }], fromSeasonId: 'season-1984-85', toSeasonId: 'season-1984-85', seasonIds: ['season-1984-85'], usage: ['home'], manufacturer: 'Tibås', colours: ['gul', 'blå'], playerIds: ['player-erik-kristiansen', 'player-jorma-virtanen', 'player-lenny-eriksson', 'player-arne-bergseng'], notableMomentIds: ['timeline-1985-breakthrough'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'jersey-1985-87', title: '1985–87 · Tibås', slug: '1985-87-tibas',
    summary: 'Bredstripet Tibås-design med røde kantinger som satte retningen for Storhamars uttrykk gjennom mange år.',
    body: ['Drakten brukte et svensk Tibås-standarddesign med brede striper og røde kantinger. Leksand og Tappara hadde varianter av samme grunnform.', 'I 1985/86 brukte laget tradisjonelle blå bukser. Fra 1986/87 byttet Storhamar til gule bukser, en tidsriktig hockeymote som SIL-arkivet beskriver som lite praktisk.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'player', id: 'player-peter-madach' }, { kind: 'player', id: 'player-harald-bastiansen' }, { kind: 'player', id: 'player-lars-bergseng' }],
    fromSeasonId: 'season-1985-86', toSeasonId: 'season-1986-87', seasonIds: ['season-1985-86', 'season-1986-87'], usage: ['home', 'away'], manufacturer: 'Tibås', colours: ['gul', 'blå', 'rød'], playerIds: ['player-erik-kristiansen', 'player-peter-madach', 'player-harald-bastiansen', 'player-lars-bergseng'], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'jersey-1989-98', title: '1989–98 · Gullalderdesignet', slug: '1989-98-gullalder',
    summary: 'Det ikoniske designet som fulgte Storhamar fra opptakten til gullalderen gjennom de første seriegullene og NM-gullene.',
    body: ['Designet var så å si uendret gjennom ni sesonger og ble selve bildet på Storhamar for en hel generasjon. Gul hjelm, gul trøye, blå bukser og gule strømper ble klubbens svært gjenkjennelige uttrykk.', '1989/90-varianten ble levert av Tackla. Senere tok Tibås over. Drakten skal etter hvert kobles videre til hele 90-tallets meritter, profiler og Hamar OL-Amfi.'],
    completeness: 'verified', sources: ['silarkivet'],
    media: [{ id: 'media-jersey-1989-90', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/89-90.png?resize=750%2C473', alt: 'Storhamars gulblå Tackla-drakt fra 1989/90', caption: '1989/90-varianten av designet som fulgte Storhamar gjennom gullalderen.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/1989-98/', seasonIds: ['season-1989-90'], personIds: ['player-erik-kristiansen', 'player-age-ellingsen', 'player-peter-madach'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.' }],
    related: [{ kind: 'season', id: 'season-1989-90' }], fromSeasonId: 'season-1989-90', seasonIds: ['season-1989-90'], usage: ['home'], manufacturer: 'Tackla / Tibås', colours: ['gul', 'blå'], playerIds: ['player-erik-kristiansen', 'player-age-ellingsen', 'player-peter-madach'], notableMomentIds: [], tags: ['gullalderen'], lastVerifiedAt: verifiedAt,
  },
]

export const records1984To1990: ArchiveRecord[] = [
  { id: 'record-1988-nine-straight-wins', title: 'Ni strake seire', slug: '1988-ni-strake-seire', summary: 'Storhamar vant ni seriekamper på rad fra 30. oktober til 1. desember 1988 og tok serieledelsen.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1988-89' }], recordType: 'streak', value: 9, unit: 'seire på rad', seasonId: 'season-1988-89', lastVerifiedAt: verifiedAt },
  { id: 'record-erik-500-points-1989', title: 'Erik Kristiansen passerer 500 poeng', slug: 'erik-500-poeng-1989', summary: 'Erik Kristiansen noterte sitt 500. karrierepoeng for Storhamar i 1989/90-sesongen.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'season', id: 'season-1989-90' }], recordType: 'player', value: 500, unit: 'karrierepoeng passert', seasonId: 'season-1989-90', personIds: ['player-erik-kristiansen'], lastVerifiedAt: verifiedAt },
]

export const timeline1984To1990: ArchiveTimelineEvent[] = [
  { id: 'timeline-1985-breakthrough', title: 'Gjennombrudd og første sluttspill', slug: '1985-gjennombrudd', summary: 'Storhamar tok seriesølv, vant mellomspillet og nådde semifinalen i klubbens første NM-sluttspill.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1984-85' }, { kind: 'jersey', id: 'jersey-1984-85' }], year: 1985, era: 'Hedmarksgeriljaen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1985-gullpucken-erik', title: 'Gullpucken til Erik Kristiansen', slug: '1985-gullpucken-erik', summary: 'Etter gjennombruddssesongen ble Erik Kristiansen kåret til årets norske spiller og mottok Gullpucken.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-erik-kristiansen' }, { kind: 'season', id: 'season-1984-85' }], year: 1985, era: 'Hedmarksgeriljaen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1987-lenny-coach', title: 'Lenny Eriksson tar treneransvar', slug: '1987-lenny-trener', summary: 'Da Lasse Beckmann forlot klubben vinteren 1987 tok Lenny Eriksson over og ble spillende trener.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-lenny-eriksson' }], year: 1987, era: 'Hedmarksgeriljaen', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1988-surprise-silver', title: 'Overraskende seriesølv uten to superstjerner', slug: '1988-seriesolv', summary: 'Med Erik Kristiansen og Åge Ellingsen i Björklöven tok Storhamar likevel 2. plass og nådde semifinalen.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1987-88' }], year: 1988, era: 'Hedmarksgeriljaen', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1988-erik-age-return', title: 'Kristiansen og Ellingsen vender hjem', slug: '1988-erik-age-hjem', summary: 'Erik Kristiansen og Åge Ellingsen kom tilbake fra Björklöven foran 1988/89 og løftet forventningene til Storhamar kraftig.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1988-89' }, { kind: 'player', id: 'player-age-ellingsen' }], year: 1988, era: 'Hedmarksgeriljaen', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1989-oilers-age', title: 'Edmonton Oilers spør etter Åge Ellingsen', slug: '1989-oilers-ellingsen', summary: 'Edmonton Oilers undersøkte muligheten for å kjøpe ut Åge Ellingsen. Overgangen ble ikke gjennomført.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-age-ellingsen' }, { kind: 'season', id: 'season-1988-89' }], year: 1989, era: 'Hedmarksgeriljaen', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-1990-playoff-miss', title: 'Fra gullkamp til 5. plass', slug: '1990-misset-sluttspill', summary: 'Storhamar var i gullkampen to runder før slutt, men ett poeng på de to siste kampene ga 5. plass og sluttspillmiss på innbyrdes oppgjør.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1989-90' }], year: 1990, era: 'Hedmarksgeriljaen', importance: 'major', lastVerifiedAt: verifiedAt },
]

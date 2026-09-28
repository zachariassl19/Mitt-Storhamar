import type {
  ArchiveJersey,
  ArchivePerson,
  ArchiveRecord,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

const verifiedAt = '2026-09-28'
const olAmfiId = 'arena-hamar-ol-amfi'
const bauer2012Id = 'jersey-2012-14-bauer'

export const seasons2010To2015: ArchiveSeason[] = [
  {
    id: 'season-2010-11', title: '2010/11', slug: '2010-11', displayName: '2010/11', startYear: 2010, endYear: 2011,
    summary: 'Storhamar tok et tydelig steg framover med 4. plass i Get-Ligaen, men sluttspillet endte overraskende i kvartfinalen mot Lillehammer.',
    body: [
      'Etter flere tunge sesonger satset Storhamar på nytt. Christian Larrivée kom tilbake til klubben, Trevor Koenig ble hentet inn i mål og svenske Peter Johansson fikk hovedansvaret.',
      'Laget kjempet i toppen gjennom store deler av grunnserien og endte til slutt på 4. plass. Christian Larrivée var sesongens poengkonge med 56 poeng inkludert sluttspill, mens Eirik Skadsdammen scoret flest mål med 20.',
      'Sluttspillet ble et sjokk. Storhamar åpnet kvartfinalen mot Lillehammer med 9–1, men tapte deretter fire kamper på rad og røk ut. SIL-arkivet omtaler dette som første gang Storhamar gikk ut allerede i kvartfinalen.',
      'Keeper Trevor Koenig ble en stor publikumsfavoritt og leverte hele 11 målgivende pasninger i løpet av sesongen. SIL-arkivet påpeker at dette var mer enn noen Storhamar-keeper tidligere hadde klart gjennom en hel karriere.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [{
      id: 'media-season-2010-11-team', type: 'photo', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/lag1011.jpg?resize=300%2C163',
      alt: 'Storhamars lag i sesongen 2010/11', caption: 'Storhamar 2010/11.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/sesonger/10-tallet/2010-11/',
      seasonIds: ['season-2010-11'], tags: ['2010-11', 'lagbilde'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.',
    }],
    related: [{ kind: 'player', id: 'player-christian-larrivee' }, { kind: 'record', id: 'record-2011-koenig-11-assists' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Get-Ligaen', 'NM-sluttspill'], coaches: ['Peter Johansson'], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 4 }],
    playoffSummary: 'Kvartfinale. Vant første kamp 9–1 mot Lillehammer, men tapte deretter fire strake og røk ut 1–4 i kamper.',
    topScorers: [{ personId: 'player-christian-larrivee', points: 56, note: 'SIL-arkivets sesongside, inkludert sluttspill.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2010-larrivee-return', 'timeline-2011-quarterfinal-shock'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2011-12', title: '2011/12', slug: '2011-12', displayName: '2011/12', startYear: 2011, endYear: 2012,
    summary: 'Storhamar endte på 6. plass og røk i kvartfinalen. Christian Larrivée var igjen lagets poengkonge med 57 poeng.',
    body: [
      'Michael Smithurst hadde overtatt som hovedtrener. Storhamar hadde gode perioder, men manglet stabiliteten som skulle til for å utfordre helt i toppen og endte på 6. plass.',
      'Christian Larrivée fortsatte å være den sentrale offensive profilen og er ført med 57 poeng i SIL-arkivets sesongoversikt. Flere unge lokale spillere fikk samtidig stadig større roller.',
      'Sluttspillet stoppet i kvartfinalen. Perioden ble et viktig mellomledd mellom det etablerte Storhamar-laget og den økonomisk pressede ungdomssatsingen som preget de neste sesongene.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-christian-larrivee' }, { kind: 'player', id: 'player-fredrik-lystad-jacobsen' }, { kind: 'player', id: 'player-magnus-eikrem-haugen' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Get-Ligaen', 'NM-sluttspill'], coaches: ['Michael Smithurst'], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 6 }], playoffSummary: 'Kvartfinale.',
    topScorers: [{ personId: 'player-christian-larrivee', points: 57, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2012-13', title: '2012/13', slug: '2012-13', displayName: '2012/13', startYear: 2012, endYear: 2013,
    summary: 'En vanskelig sesong endte med 7. plass og kvartfinale. Pål Johnsen var poengkonge med 53 poeng.',
    body: [
      'Lite stemte for Storhamar gjennom store deler av sesongen. Laget ble lenge liggende på 7. plass og avsluttet også grunnserien der.',
      'Pål Johnsen var lagets poengkonge med 53 poeng i SIL-arkivets sesongoversikt. Christian Larrivée, Joakim Jensen og flere unge spillere bar store deler av det offensive ansvaret rundt ham.',
      'Storhamar nådde kvartfinalen. Samtidig ble den økonomiske situasjonen stadig mer krevende og satte tydelige rammer for hvordan klubben kunne bygge laget.',
    ],
    completeness: 'partial', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-pal-johnsen' }, { kind: 'player', id: 'player-christian-larrivee' }, { kind: 'jersey', id: bauer2012Id }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Get-Ligaen', 'NM-sluttspill'], coaches: ['Michael Smithurst'], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 7, gamesPlayed: 45, wins: 16, overtimeWins: 4, overtimeLosses: 4, losses: 21, goalsFor: 139, goalsAgainst: 155, points: 60 }],
    playoffSummary: 'Kvartfinale.', topScorers: [{ personId: 'player-pal-johnsen', points: 53, note: 'SIL-arkivets sesongoversikt.' }],
    honourIds: [], jerseyIds: [bauer2012Id], arenaIds: [olAmfiId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2013-14', title: '2013/14', slug: '2013-14', displayName: '2013/14', startYear: 2013, endYear: 2014,
    summary: 'Storhamar endte offisielt på 6. plass etter et trekk på 15 poeng for dårlig økonomistyring, men løftet seg til semifinale i sluttspillet.',
    body: [
      'Sesongen ble preget av alvorlige økonomiske problemer. Storhamar ble trukket 15 poeng for dårlig økonomistyring og endte dermed offisielt på 6. plass med 62 poeng.',
      'På isen viste laget betydelig mer kvalitet enn tabellplasseringen alene tilsier. Pål Johnsen var poengkonge med 61 poeng når sluttspillet regnes med, og Storhamar tok seg helt til semifinalen.',
      'Michael Smithurst ble sykmeldt underveis. Senere takket trenerduoen Smithurst og Jonas Norgren for seg for å spare klubben for lønnsutgifter, og Rune Gulliksen tok over laget.',
      'Sluttspillet ble et sportslig lyspunkt i en av klubbens vanskeligste perioder. Storhamar avanserte fra kvartfinalen og presset Vålerenga i semifinalen.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [{ kind: 'player', id: 'player-pal-johnsen' }, { kind: 'jersey', id: bauer2012Id }, { kind: 'record', id: 'record-2014-points-deduction' }, { kind: 'arena', id: olAmfiId }],
    competitions: ['Get-Ligaen', 'NM-sluttspill'], coaches: ['Michael Smithurst', 'Rune Gulliksen'], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 6, gamesPlayed: 45, wins: 22, overtimeWins: 3, overtimeLosses: 5, losses: 15, goalsFor: 146, goalsAgainst: 123, points: 62, note: 'Storhamar ble trukket 15 poeng for dårlig økonomistyring.' }],
    playoffSummary: 'Semifinale.', topScorers: [{ personId: 'player-pal-johnsen', points: 61, note: 'SIL-arkivets sesongoversikt, inkludert sluttspill.' }],
    honourIds: [], jerseyIds: [bauer2012Id], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2014-economic-crisis', 'timeline-2014-semifinal'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-2014-15', title: '2014/15', slug: '2014-15', displayName: '2014/15', startYear: 2014, endYear: 2015,
    summary: 'Fra eksistenskamp til NM-finale: Storhamar ble nummer to i serien, fylte OL-Amfi og var én kamp fra kongepokalen.',
    body: [
      'Sommeren 2014 var klubbens eksistens truet. Gruppen Fattige Fettere gikk inn med penger og kompetanse, men kunne ikke garantere drift gjennom hele sesongen. Sportslig startet det også tungt med fem tap på de seks første kampene og 1–9 i Stavanger.',
      'Inn kom blant andre Patrik Bäärnhielm og Jacob Berglund, og sesongen snudde. Publikum strømmet tilbake. Romjulskampen mot Vålerenga samlet 7109 tilskuere, og SIL-arkivet beskriver publikumsframmøtet denne høsten som avgjørende for klubbens videre eksistens.',
      'Storhamar endte på 2. plass med 95 poeng og 200 scorede mål. Christian Larrivée leverte 94 poeng inkludert sluttspillet, mens Joakim Jensen scoret 35 mål.',
      'Før sluttspillet ble Dragons-navnet og drage-logoen lagt bort til fordel for det gamle SIL-merket. Lillehammer ble slått i kvartfinalen og Sparta i semifinalen. Finalen mot Stavanger Oilers gikk helt til kamp sju. Storhamar vant kamp seks 2–1 foran over 6000 mennesker i Pål Johnsens siste hjemmekamp, men tapte den avgjørende kampen i Stavanger.',
      'Da laget kom tilbake til Hamar etter finaletapet, møtte et par tusen mennesker opp på Stortorget for å ta dem imot. Sesongen ble et vendepunkt både sportslig, økonomisk og identitetsmessig.',
    ],
    completeness: 'verified', sources: ['silarkivet'], media: [],
    related: [
      { kind: 'player', id: 'player-christian-larrivee' }, { kind: 'player', id: 'player-jacob-berglund' }, { kind: 'player', id: 'player-luke-moffatt' },
      { kind: 'player', id: 'player-andrew-engelage' }, { kind: 'record', id: 'record-2014-vif-7109' }, { kind: 'arena', id: olAmfiId },
    ],
    competitions: ['Get-Ligaen', 'NM-sluttspill'], coaches: ['Alexander Smirnov'], captains: [], roster: [],
    standings: [{ competition: 'Get-Ligaen', position: 2, gamesPlayed: 45, wins: 29, overtimeWins: 2, overtimeLosses: 4, losses: 10, goalsFor: 200, goalsAgainst: 112, points: 95 }],
    playoffSummary: 'NM-finale. Storhamar tok finaleserien mot Stavanger Oilers til sju kamper, men tapte den avgjørende kampen i Stavanger.',
    topScorers: [{ personId: 'player-christian-larrivee', points: 94, assists: 59 }, { personId: 'player-joakim-jensen', goals: 35 }],
    honourIds: [], jerseyIds: [], arenaIds: [olAmfiId], notableMomentIds: ['timeline-2014-fattige-fettere', 'timeline-2015-dragons-name-dropped', 'timeline-2015-nm-final'], lastVerifiedAt: verifiedAt,
  },
]

export const jerseys2010To2015: ArchiveJersey[] = [
  {
    id: bauer2012Id, title: '2012–14 · Bauer', slug: '2012-14-bauer',
    summary: 'Et enklere Bauer-design inspirert av Los Angeles Kings, brukt gjennom to av de tyngste økonomiske sesongene i klubbens moderne historie.',
    body: [
      'Storhamar fortsatte med Bauer og gikk for et enklere uttrykk basert på Los Angeles Kings sine drakter.',
      'SIL-arkivet trekker fram Pål Johnsen, Joakim Jensen, Christian Larrivée og Lars Løkken Østli som profiler i drakta. Foran den andre sesongen ble uttrykket lysere da mellomblå hjelmer igjen ble tilgjengelige.',
    ],
    completeness: 'verified', sources: ['silarkivet'],
    media: [
      { id: 'media-jersey-2012-13-home', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2012-13-h.png?resize=750%2C473', alt: 'Storhamars hjemmedrakt 2012/13', caption: 'Hjemmedrakt 2012/13.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/2012-14/', seasonIds: ['season-2012-13'], tags: ['2012-13', 'hjemme', 'Bauer'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.' },
      { id: 'media-jersey-2012-13-away', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2012-13-b.png?resize=750%2C473', alt: 'Storhamars bortedrakt 2012/13', caption: 'Bortedrakt 2012/13.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/2012-14/', seasonIds: ['season-2012-13'], tags: ['2012-13', 'borte', 'Bauer'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.' },
      { id: 'media-jersey-2013-14-home', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2013-14-h.png?resize=750%2C473', alt: 'Storhamars hjemmedrakt 2013/14', caption: 'Hjemmedrakt 2013/14.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/2012-14/', seasonIds: ['season-2013-14'], tags: ['2013-14', 'hjemme', 'Bauer'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.' },
      { id: 'media-jersey-2013-14-away', type: 'jersey', src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2013-14-b.png?resize=750%2C473', alt: 'Storhamars bortedrakt 2013/14', caption: 'Bortedrakt 2013/14.', credit: 'SIL-arkivet', sourceId: 'silarkivet', sourceUrl: 'https://silarkivet.no/drakter/2012-14/', seasonIds: ['season-2013-14'], tags: ['2013-14', 'borte', 'Bauer'], rightsNote: 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.' },
    ],
    related: [{ kind: 'season', id: 'season-2012-13' }, { kind: 'season', id: 'season-2013-14' }, { kind: 'player', id: 'player-pal-johnsen' }, { kind: 'player', id: 'player-christian-larrivee' }],
    fromSeasonId: 'season-2012-13', toSeasonId: 'season-2013-14', seasonIds: ['season-2012-13', 'season-2013-14'], usage: ['home', 'away'], manufacturer: 'Bauer', colours: ['gul', 'blå'],
    playerIds: ['player-pal-johnsen', 'player-joakim-jensen', 'player-christian-larrivee'], notableMomentIds: ['timeline-2014-economic-crisis', 'timeline-2014-semifinal'], lastVerifiedAt: verifiedAt,
  },
]

export const players2010To2015: ArchivePerson[] = [
  {
    id: 'player-fredrik-lystad-jacobsen', title: 'Fredrik Lystad Jacobsen', fullName: 'Fredrik Lystad Jacobsen', slug: 'fredrik-lystad-jacobsen',
    summary: 'Den raske og arbeidsomme vingen fulgte Michael Smithurst fra Frisk til Storhamar og spilte fire sesonger i klubben.',
    body: ['Lystad Jacobsen kom til Hamar i 2010 og ble raskt en nyttig spiller både offensivt og defensivt. SIL-arkivet trekker særlig fram arbeidskapasiteten hans og at han ofte trivdes godt i kampene mot Rosenborg.', 'Etter fire Storhamar-sesonger gikk han videre til Sparta sommeren 2014.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2010-11' }, { kind: 'season', id: 'season-2013-14' }],
    born: '1990-02-15', birthPlace: 'Asker', position: 'Løper', shirtNumbers: [40], storhamarPeriods: [{ fromSeasonId: 'season-2010-11', toSeasonId: 'season-2013-14' }], seasonIds: ['season-2010-11', 'season-2011-12', 'season-2012-13', 'season-2013-14'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-magnus-eikrem-haugen', title: 'Magnus Eikrem Haugen', fullName: 'Magnus Eikrem Haugen', slug: 'magnus-eikrem-haugen',
    summary: 'Egenprodusert, storvokst back som slo seg inn på A-laget i klubbens økonomisk vanskelige periode og ble værende inn i oppturen.',
    body: ['Eikrem Haugen kom fra Storhamars egen junioravdeling og fikk A-lagskamper fra 2011/12. Han etablerte seg for alvor gjennom de krevende årene som fulgte.', 'SIL-arkivet beskriver ham som en stor og sterk back som spilte enkelt og sikkert. I 2014/15 spilte han 43 seriekamper og 14 sluttspillkamper på veien til NM-finalen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2013-14' }, { kind: 'season', id: 'season-2014-15' }],
    born: '1995-08-18', birthPlace: 'Hamar', position: 'Back', shirtNumbers: [16, 58, 42], storhamarPeriods: [{ fromSeasonId: 'season-2011-12', toSeasonId: 'season-2016-17' }], seasonIds: ['season-2011-12', 'season-2012-13', 'season-2013-14', 'season-2014-15'], honourIds: [], roles: ['spiller', 'egenutviklet'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-andrew-engelage', title: 'Andrew Engelage', fullName: 'Andrew Engelage', slug: 'andrew-engelage',
    summary: 'Storvokst canadisk keeper som vokste seg inn som en av ligaens beste og var sentral da Storhamar nådde NM-finalen i 2015.',
    body: ['Engelage brukte litt tid på å venne seg til den store europeiske isflata, men ble stadig bedre gjennom sesongen.', 'Han avsluttet 2014/15 med 92,7 i redningsprosent både i serie og sluttspill. SIL-arkivet mener han skal ha en stor del av æren for at Storhamar var én kamp unna kongepokalen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2014-15' }],
    born: '1988-10-28', birthPlace: 'Oshawa, Canada', nationality: 'Canada', position: 'Keeper', shirtNumbers: [72], storhamarPeriods: [{ fromSeasonId: 'season-2014-15', toSeasonId: 'season-2014-15' }], seasonIds: ['season-2014-15'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-jacob-berglund', title: 'Jacob Berglund', fullName: 'Jacob Berglund', slug: 'jacob-berglund',
    summary: 'Svensk powerforward med stor x-faktor som ble en umiddelbar publikumsfavoritt da han kom til Hamar i 2014.',
    body: ['Berglund ble hentet litt ut i 2014/15 etter tips fra Linus Johansson. Sammen med Johansson og Luke Moffatt dannet han en svært produktiv rekke som var sentral i ferden til NM-finalen.', 'I 2014/15 leverte Berglund 52 poeng i grunnserien og 19 i sluttspillet. Oppholdet skulle senere få flere kapitler, men denne første perioden etablerte ham som en stor Storhamar-profil.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2014-15' }, { kind: 'player', id: 'player-luke-moffatt' }],
    born: '1991-11-17', birthPlace: 'Malmö, Sverige', nationality: 'Sverige', position: 'Løper', shirtNumbers: [12], storhamarPeriods: [{ fromSeasonId: 'season-2014-15', toSeasonId: 'season-2015-16' }, { fromSeasonId: 'season-2017-18', note: 'Gjesteopptreden mot slutten av sesongen.' }], seasonIds: ['season-2014-15'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-luke-moffatt', title: 'Luke Moffatt', fullName: 'Luke Moffatt', slug: 'luke-moffatt',
    summary: 'Teknisk og kreativ amerikaner som ble en del av den populære Berglund–Johansson–Moffatt-rekka i 2014/15.',
    body: ['Moffatt kom til Storhamar litt ut i sesongen etter et kort opphold i Frölunda. SIL-arkivet trekker fram puckkontrollen, fintene og den offensive kreativiteten hans.', 'Han scoret 20 mål og leverte 44 poeng på 33 seriekamper, før han la til 14 poeng på 16 sluttspillkamper.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2014-15' }, { kind: 'player', id: 'player-jacob-berglund' }],
    born: '1992-06-11', birthPlace: 'Sun Valley, Arizona, USA', nationality: 'USA', position: 'Løper', shirtNumbers: [7], storhamarPeriods: [{ fromSeasonId: 'season-2014-15', toSeasonId: 'season-2014-15' }], seasonIds: ['season-2014-15'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
]

export const records2010To2015: ArchiveRecord[] = [
  {
    id: 'record-2011-koenig-11-assists', title: '11 målgivende fra keeper', slug: 'trevor-koenig-11-assists-2010-11',
    summary: 'Trevor Koenig leverte 11 målgivende pasninger fra keeperplassen i 2010/11.',
    body: ['SIL-arkivet bemerker at Koenigs 11 assists i én sesong var mer enn noen Storhamar-målvakt tidligere hadde klart gjennom en hel karriere.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2010-11' }], recordType: 'player', value: 11, unit: 'assists fra keeper', seasonId: 'season-2010-11', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'record-2014-points-deduction', title: '15 poeng trukket i 2013/14', slug: '15-poeng-trekk-2013-14',
    summary: 'Storhamar ble trukket 15 seriepoeng for dårlig økonomistyring i 2013/14.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2013-14' }], recordType: 'other', value: 15, unit: 'poeng trukket', seasonId: 'season-2013-14', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'record-2014-vif-7109', title: '7109 mot Vålerenga', slug: '7109-vif-2014',
    summary: 'Romjulskampen mot Vålerenga i 2014 trakk 7109 tilskuere til Hamar OL-Amfi.',
    body: ['SIL-arkivet beskriver publikumsframmøtet gjennom høsten 2014 som avgjørende for at klubben overlevde økonomisk. 7109 mot Vålerenga var sesongens høyeste publikumstall.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2014-15' }, { kind: 'arena', id: olAmfiId }], recordType: 'attendance', value: 7109, unit: 'tilskuere', seasonId: 'season-2014-15', lastVerifiedAt: verifiedAt,
  },
]

export const timeline2010To2015: ArchiveTimelineEvent[] = [
  { id: 'timeline-2010-larrivee-return', title: 'Christian Larrivée tilbake', slug: '2010-larrivee-tilbake', summary: 'Christian Larrivée kom tilbake til Storhamar og ble igjen lagets store offensive profil.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-christian-larrivee' }, { kind: 'season', id: 'season-2010-11' }], year: 2010, era: 'Gjenoppbygging', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2011-quarterfinal-shock', title: 'Kvartfinalesjokket mot Lillehammer', slug: '2011-kvartfinalesjokk', summary: 'Etter 9–1 i første kvartfinale tapte Storhamar fire strake mot Lillehammer og røk ut.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2010-11' }], year: 2011, era: 'Gjenoppbygging', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2014-economic-crisis', title: '15-poengstrekk og økonomisk krise', slug: '2014-okonomisk-krise', summary: 'Storhamar ble trukket 15 poeng for dårlig økonomistyring i en periode hvor klubben kjempet med alvorlige økonomiske problemer.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2013-14' }, { kind: 'record', id: 'record-2014-points-deduction' }], year: 2014, era: 'Krise og redning', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2014-semifinal', title: 'Sportslig opptur midt i krisen', slug: '2014-semifinale', summary: 'Til tross for økonomiske problemer og trenerendringer tok Storhamar seg til NM-semifinalen.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2013-14' }], year: 2014, era: 'Krise og redning', importance: 'notable', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2014-fattige-fettere', title: 'Fattige Fettere bidrar til å redde klubben', slug: '2014-fattige-fettere', summary: 'Gruppen Fattige Fettere gikk inn med penger og kompetanse sommeren 2014 da Storhamars videre drift var alvorlig truet.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2014-15' }], year: 2014, era: 'Krise og redning', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2015-dragons-name-dropped', title: 'Dragons-navnet legges bort', slug: '2015-dragons-navnet-legges-bort', summary: 'Før sluttspillet i 2015 ble Dragons-navnet og drage-logoen droppet til fordel for det gamle SIL-merket.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2014-15' }], year: 2015, era: 'Tilbake til Storhamar', importance: 'major', lastVerifiedAt: verifiedAt },
  { id: 'timeline-2015-nm-final', title: 'Fra eksistenskamp til kamp sju i NM-finalen', slug: '2015-nm-finale', summary: 'Storhamar gikk fra økonomisk eksistenskamp til en sjuende og avgjørende NM-finale mot Stavanger Oilers.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-2014-15' }, { kind: 'record', id: 'record-2014-vif-7109' }], year: 2015, era: 'Tilbake til Storhamar', importance: 'major', lastVerifiedAt: verifiedAt },
]

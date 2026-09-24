import type { ArchivePerson, ArchiveRecord, ArchiveSeason, ArchiveTimelineEvent } from './types'

const verifiedAt = '2026-09-24'

const jerseyId = 'jersey-1967-77'
const arenaId = 'arena-storhamarbana'

export const seasons1967To1977: ArchiveSeason[] = [
  {
    id: 'season-1967-68', title: '1967/68', slug: '1967-68', displayName: '1967/68', startYear: 1967, endYear: 1968,
    summary: 'Storhamar tok 3. plass i 2. divisjon. Jan Frode Stenberg ble ført som lagets fremste målscorer med ni mål.',
    body: ['Den nye gule Ramah-drakten markerte starten på en ny epoke. Sportslig endte Storhamar på 3. plass i 2. divisjon.', 'SIL-arkivet fører Jan Frode Stenberg som sesongens fremste målscorer med ni mål på ni kamper.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'player', id: 'player-jan-frode-stenberg' }, { kind: 'arena', id: arenaId }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 3 }], topScorers: [{ personId: 'player-jan-frode-stenberg', goals: 9 }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1968-69', title: '1968/69', slug: '1968-69', displayName: '1968/69', startYear: 1968, endYear: 1969,
    summary: 'Storhamar endte på 2. plass i 2. divisjon, klubbens beste plassering på nivået til da.',
    body: ['Storhamar fulgte opp tredjeplassen med en sterk andreplass i 2. divisjon.', 'Jan Sindre Larsen er oppført som poengkonge/målkonge i sesongoversikten med ti mål. Eldre målstatistikk er merket som mangelfull.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'player', id: 'player-jan-sindre-larsen' }, { kind: 'arena', id: arenaId }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 2 }], topScorers: [{ personId: 'player-jan-sindre-larsen', goals: 10, note: 'SIL-arkivet markerer eldre målstatistikk som mangelfull.' }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1969-70', title: '1969/70', slug: '1969-70', displayName: '1969/70', startYear: 1969, endYear: 1970,
    summary: 'Storhamar endte på 6. plass i 2. divisjon og berget plassen etter omspill.',
    body: ['Sesongen ble langt tøffere enn året før. Storhamar endte på 6. plass, men vant omspillet og beholdt plassen.', 'SIL-arkivets sesongoversikt fører Jan Sindre Larsen med 13 mål, mens spillerprofilen hans fører 14 mål i serien. Avviket beholdes som en åpen kildekonflikt til det er kontrollert mot kampfakta.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'player', id: 'player-jan-sindre-larsen' }, { kind: 'player', id: 'player-ole-roberth-holmen' }],
    competitions: ['2. divisjon', 'Omspill'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 6 }], playoffSummary: 'Vant omspill og beholdt plassen i 2. divisjon.', topScorers: [{ personId: 'player-jan-sindre-larsen', note: 'Kildekonflikt: sesongoversikten oppgir 13 mål, spillerprofilen 14 seriemål.' }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: ['timeline-1970-survival-playoff'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1970-71', title: '1970/71', slug: '1970-71', displayName: '1970/71', startYear: 1970, endYear: 1971,
    summary: '6. plass i 2. divisjon og 3. plass i nedrykkskvalifiseringen førte til nedrykk til 3. divisjon.',
    body: ['Stadig flere konkurrenter fikk ishaller og bedre treningsforhold, mens Storhamar fortsatt var avhengig av naturis. Resultatene falt, og laget rykket ned etter kvalifisering.', 'Jan Sindre Larsen er oppført med 13 mål totalt i sesongoversikten.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'player', id: 'player-jan-sindre-larsen' }, { kind: 'player', id: 'player-erik-svendby' }],
    competitions: ['2. divisjon', 'Nedrykkskvalifisering'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 6 }], playoffSummary: '3. plass i nedrykkskvalifiseringen og nedrykk til 3. divisjon.', topScorers: [{ personId: 'player-jan-sindre-larsen', goals: 13, note: 'Sesongoversikten summerer serie/kvalifisering; eldre målstatistikk er delvis mangelfull.' }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: ['timeline-1971-relegation'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1971-72', title: '1971/72', slug: '1971-72', displayName: '1971/72', startYear: 1971, endYear: 1972,
    summary: 'Storhamar slo direkte tilbake: 1. plass i 3. divisjon og 1. plass i opprykkskvalifiseringen.',
    body: ['Nedrykket ble kortvarig. Storhamar vant 3. divisjon og deretter opprykkskvalifiseringen, og var tilbake i 2. divisjon etter én sesong.', 'Ole Roberth Holmen er oppført som sesongens fremste målscorer med 17 mål totalt. Samme generasjon hadde året før vunnet uoffisielt NM for gutter og ble en viktig del av klubbens nye stamme.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'player', id: 'player-ole-roberth-holmen' }, { kind: 'player', id: 'player-erik-svendby' }],
    competitions: ['3. divisjon', 'Opprykkskvalifisering'], coaches: [], captains: [], roster: [], standings: [{ competition: '3. divisjon', position: 1 }], playoffSummary: '1. plass i opprykkskvalifiseringen og opprykk til 2. divisjon.', topScorers: [{ personId: 'player-ole-roberth-holmen', goals: 17, note: '16 mål i serien og ett i kvalifiseringen i spillerprofilen.' }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: ['timeline-1972-promotion'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1972-73', title: '1972/73', slug: '1972-73', displayName: '1972/73', startYear: 1972, endYear: 1973,
    summary: 'Tilbake i 2. divisjon endte Storhamar på 5. plass og vant nedrykkskvalifiseringen.',
    body: ['Første sesong tilbake i 2. divisjon ble en kamp for å stabilisere seg. Femteplass sendte laget til nedrykkskvalifisering, der Storhamar tok 1. plass og beholdt plassen.', 'Steinar Johansen er oppført med 18 mål i sesongoversikten.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'legend', id: 'legend-steinar-johansen' }, { kind: 'player', id: 'player-finn-paulsen' }],
    competitions: ['2. divisjon', 'Nedrykkskvalifisering'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 5 }], playoffSummary: '1. plass i nedrykkskvalifiseringen og fortsatt spill i 2. divisjon.', topScorers: [{ personId: 'legend-steinar-johansen', goals: 18, note: 'Eldre målstatistikk er delvis mangelfull.' }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1973-74', title: '1973/74', slug: '1973-74', displayName: '1973/74', startYear: 1973, endYear: 1974,
    summary: 'Storhamar tok 5. plass i 2. divisjon. Steinar Johansen toppet lagets måloversikt.',
    body: ['Storhamar fortsatte etableringen i 2. divisjon med en ny femteplass.', 'Sesongoversikten fører Steinar Johansen med 21 mål, mens spillerprofilen hans fører 21 mål og Jan Sindre Larsen 23. Dette er et nytt eksempel på at de eldre oversiktene må leses med kildekritikk; arkivet beholder merknaden i stedet for å skjule avviket.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'legend', id: 'legend-steinar-johansen' }, { kind: 'player', id: 'player-jan-sindre-larsen' }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 5 }], topScorers: [{ personId: 'legend-steinar-johansen', goals: 21, note: 'Sesongoversikten oppgir 21. Spillerprofilene har avvikende eldre scoringstall og må senere avstemmes mot kampfakta.' }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1974-75', title: '1974/75', slug: '1974-75', displayName: '1974/75', startYear: 1974, endYear: 1975,
    summary: 'Storhamar endte på 6. plass i 2. divisjon.',
    body: ['Storhamar befant seg fortsatt i den nedre delen av 2. divisjon, men en yngre stamme var i ferd med å spille seg inn.', 'Steinar Johansen er oppført som sesongens fremste målscorer med 16 mål i sesongoversikten.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'legend', id: 'legend-steinar-johansen' }, { kind: 'player', id: 'player-jan-roger-kristiansen' }, { kind: 'player', id: 'player-lorentz-holtet' }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 6 }], topScorers: [{ personId: 'legend-steinar-johansen', goals: 16, note: 'Eldre målstatistikk er markert som mangelfull.' }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: [], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1975-76', title: '1975/76', slug: '1975-76', displayName: '1975/76', startYear: 1975, endYear: 1976,
    summary: 'Storhamar klatret til 4. plass i 2. divisjon og begynte å nærme seg toppen igjen.',
    body: ['Etter flere år i midtsjiktet kom et tydelig sportslig løft. Fjerdeplassen var et steg mot opprykket som skulle komme året etter.', 'Steinar Johansen er oppført med 20 mål. Erik Svendby scoret 19 og Ole Roberth Holmen 13 i spillerprofilene.'],
    completeness: 'partial', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'legend', id: 'legend-steinar-johansen' }, { kind: 'player', id: 'player-erik-svendby' }, { kind: 'player', id: 'player-ole-roberth-holmen' }],
    competitions: ['2. divisjon'], coaches: [], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 4 }], topScorers: [{ personId: 'legend-steinar-johansen', goals: 20 }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: ['timeline-1976-first-proper-coach'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'season-1976-77', title: '1976/77', slug: '1976-77', displayName: '1976/77', startYear: 1976, endYear: 1977,
    summary: '2. plass i 2. divisjon og historisk opprykk til 1. divisjon. 5. mars 1977 ble opprykket sikret med 7–2 mot Spartacus på Storhamarbana.',
    body: ['En ung stamme hadde vokst seg sterk gjennom flere sesonger. Storhamar åpnet bedre enn vanlig, holdt seg i toppen og gikk inn i vinteren med reell mulighet til opprykk.', 'Erik Svendby ble den store målscoreren med 30 seriemål. I viktige toppkamper leverte han blant annet fire mål mot Viking og fem mot Djerv.', 'I siste serierunde slo Storhamar Spartacus 7–2 på Storhamarbana og sikret andreplassen og retten til spill i 1. divisjon. Opprykket tvang fram neste store steg: kunstfrossen hjemmebane før toppseriedebuten.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'player', id: 'player-erik-svendby' }, { kind: 'player', id: 'player-finn-paulsen' }, { kind: 'player', id: 'player-ole-roberth-holmen' }, { kind: 'arena', id: arenaId }],
    competitions: ['2. divisjon'], coaches: ['Per Ragnar Pettersen'], captains: [], roster: [], standings: [{ competition: '2. divisjon', position: 2, note: 'Opprykk til 1. divisjon' }], playoffSummary: 'Opprykk sikret med 7–2 mot Spartacus i siste serierunde.', topScorers: [{ personId: 'player-erik-svendby', goals: 30 }], honourIds: [], jerseyIds: [jerseyId], arenaIds: [arenaId], notableMomentIds: ['timeline-1977-promotion-top-division', 'timeline-1977-last-storhamarbana-game'], lastVerifiedAt: verifiedAt,
  },
]

export const players1967To1977: ArchivePerson[] = [
  {
    id: 'player-jan-frode-stenberg', title: 'Jan Frode Stenberg', fullName: 'Jan Frode Stenberg', slug: 'jan-frode-stenberg',
    summary: 'Egenutviklet løper som ble toppscorer i 1967/68 med ni mål på ni kamper.',
    body: ['Stenberg spilte på A-laget fra 1967 til 1972 og var også med i «Puck på TV» i 1968. Etter spillerkarrieren hadde han roller som oppmann og dommer.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }], birthPlace: 'Hamar', position: 'Løper', storhamarPeriods: [{ fromSeasonId: 'season-1967-68', toSeasonId: 'season-1971-72' }], seasonIds: ['season-1967-68', 'season-1968-69', 'season-1969-70', 'season-1970-71', 'season-1971-72'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-ole-roberth-holmen', title: 'Ole Roberth Holmen', fullName: 'Ole Roberth Holmen', slug: 'ole-roberth-holmen',
    summary: 'Konkurransesterk Storhamar-løper og en sentral del av generasjonen som spilte klubben mot toppdivisjonen.',
    body: ['Holmen var med i guttelaget som vant uoffisielt NM i 1971 og fikk juniorlandskamper. Han spilte i Storhamar 1969–73 og 1974–86 og var med hele veien fram mot opprykket i 1977.', 'SIL-arkivet fører 308 kamper og 156 mål totalt i hans Storhamar-karriere.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }], born: '1953-09-16', birthPlace: 'Hamar', position: 'Løper', shirtNumbers: [11, 10, 8], storhamarPeriods: [{ fromSeasonId: 'season-1969-70', toSeasonId: 'season-1972-73' }, { fromSeasonId: 'season-1974-75', toSeasonId: 'season-1985-86' }], seasonIds: ['season-1969-70', 'season-1970-71', 'season-1971-72', 'season-1972-73', 'season-1974-75', 'season-1975-76', 'season-1976-77'], honourIds: [], roles: ['spiller', 'senere trenerressurs'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-erik-svendby', title: 'Erik Svendby', fullName: 'Erik Svendby', slug: 'erik-svendby',
    summary: 'Back/løper og nøkkelspiller i opprykkslaget. Han scoret 30 mål i 1976/77.',
    body: ['Svendby var først og fremst defensivt anlagt, men viste stor målteft da han ble brukt som forward. I 1975/76 og 1976/77 scoret han til sammen 49 mål på 35 seriekamper.', 'Han ble senere Storhamars første målscorer på øverste nivå da han scoret mot Frisk i seriepremieren i 1977.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }, { kind: 'timeline', id: 'timeline-1977-promotion-top-division' }], born: '1954-04-20', birthPlace: 'Hamar', position: 'Løper / back', shirtNumbers: [9], storhamarPeriods: [{ fromSeasonId: 'season-1970-71', toSeasonId: 'season-1984-85' }], seasonIds: ['season-1970-71', 'season-1971-72', 'season-1972-73', 'season-1973-74', 'season-1974-75', 'season-1975-76', 'season-1976-77'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-jan-roger-kristiansen', title: 'Jan Roger Kristiansen', fullName: 'Jan Roger Kristiansen', slug: 'jan-roger-kristiansen',
    summary: 'Defensiv og treningsvillig back som var fast inventar gjennom store deler av 1970-tallet.',
    body: ['«Janne» Kristiansen var det første medlemmet av Kristiansen-klanen på Storhamars A-lag. Han spilte 1971–73 og 1974–80 og var med på opprykkslaget i 1976/77.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }], birthPlace: 'Hamar', position: 'Back', shirtNumbers: [17, 18], storhamarPeriods: [{ fromSeasonId: 'season-1971-72', toSeasonId: 'season-1972-73' }, { fromSeasonId: 'season-1974-75', toSeasonId: 'season-1979-80' }], seasonIds: ['season-1971-72', 'season-1972-73', 'season-1974-75', 'season-1975-76', 'season-1976-77'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-lorentz-holtet', title: 'Lorentz Holtet', fullName: 'Lorentz Holtet', slug: 'lorentz-holtet',
    summary: 'Hardtarbeidende back som ble med fra 2. divisjon og videre inn i toppserien.',
    body: ['Holtet kom inn på A-laget i 1973 og ble en del av stammen som rykket opp i 1977. SIL-arkivet beskriver ham som en sliter og en fysisk back.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }], born: '1958', birthPlace: 'Hamar', position: 'Back', shirtNumbers: [4], storhamarPeriods: [{ fromSeasonId: 'season-1973-74', toSeasonId: 'season-1981-82' }], seasonIds: ['season-1973-74', 'season-1974-75', 'season-1975-76', 'season-1976-77'], honourIds: [], roles: ['spiller'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-finn-paulsen', title: 'Finn Paulsen', fullName: 'Finn Paulsen', slug: 'finn-paulsen',
    summary: 'Målfarlig Storhamar-løper og viktig del av laget som tok steget opp i norsk topphockey.',
    body: ['Paulsen vokste opp på Storhamar og spilte seg inn i A-laget tidlig på 1970-tallet. I opprykksåret 1976/77 scoret han 15 mål på 16 seriekamper.', 'Senere scoret han også det første Storhamar-målet på den nye kunstisbanen.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'jersey', id: jerseyId }], born: '1955', birthPlace: 'Hamar', position: 'Løper', shirtNumbers: [12, 21], storhamarPeriods: [{ fromSeasonId: 'season-1972-73', toSeasonId: 'season-1979-80' }, { fromSeasonId: 'season-1982-83', toSeasonId: 'season-1983-84' }], seasonIds: ['season-1972-73', 'season-1973-74', 'season-1974-75', 'season-1975-76', 'season-1976-77'], honourIds: [], roles: ['spiller', 'senere trener og markedsressurs'], lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-per-ragnar-pettersen', title: 'Per Ragnar Pettersen', fullName: 'Per Ragnar Pettersen', slug: 'per-ragnar-pettersen',
    summary: 'Keeper som senere ble klubbens første ordentlige trener og ledet Storhamar opp i 1. divisjon.',
    body: ['Pettersen kom fra Kongsvinger i 1969 og spilte fem sesonger som målvakt i Storhamar. Etter spillerkarrieren gikk han inn i trenerrollen.', 'SIL-arkivet omtaler ham som klubbens første ordentlige trener. Han ledet laget i den historiske opprykkssesongen 1976/77.'],
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1976-77' }], birthPlace: 'Kongsvinger', position: 'Keeper', storhamarPeriods: [{ fromSeasonId: 'season-1969-70', toSeasonId: 'season-1975-76', note: 'Spilte 1969–71, 1972–73 og 1974–76.' }], seasonIds: ['season-1969-70', 'season-1970-71', 'season-1972-73', 'season-1974-75', 'season-1975-76', 'season-1976-77'], honourIds: [], roles: ['spiller', 'trener'], lastVerifiedAt: verifiedAt,
  },
]

export const records1967To1977: ArchiveRecord[] = [
  {
    id: 'record-1970s-decade-stats', title: '1970-tallet · tiårsoversikt', slug: '1970-tallet-tiarsoversikt',
    summary: 'SIL-arkivet fører 177 Storhamar-kamper på 1970-tallet: 76 seire, 16 uavgjorte og 84 tap, med målforskjell 886–870.',
    completeness: 'verified', sources: ['silarkivet'], media: [], related: [], recordType: 'other', value: '177 kamper', unit: 'tiårsoversikt', lastVerifiedAt: verifiedAt,
  },
]

export const timeline1967To1977: ArchiveTimelineEvent[] = [
  {
    id: 'timeline-1970-survival-playoff', title: 'Berget plassen etter omspill', slug: '1970-omspill', summary: 'Storhamar beholdt plassen i 2. divisjon etter omspill i 1970.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1969-70' }], year: 1970, era: 'Generasjonsskifte', importance: 'notable', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1971-relegation', title: 'Nedrykk til 3. divisjon', slug: '1971-nedrykk', summary: 'Etter flere år med stadig vanskeligere naturisforhold rykket Storhamar ned til 3. divisjon.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1970-71' }], year: 1971, era: 'Generasjonsskifte', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1972-promotion', title: 'Rett tilbake til 2. divisjon', slug: '1972-opprykk', summary: 'Storhamar vant 3. divisjon og opprykkskvalifiseringen og returnerte til 2. divisjon.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1971-72' }], year: 1972, era: 'Generasjonsskifte', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1976-first-proper-coach', title: 'Første ordentlige trener', slug: '1976-per-ragnar-pettersen', summary: 'Per Ragnar Pettersen tok treneransvaret og omtales av SIL-arkivet som klubbens første ordentlige trener.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'player', id: 'player-per-ragnar-pettersen' }], year: 1976, era: 'Veien mot toppen', importance: 'notable', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1977-promotion-top-division', title: 'Opprykk til 1. divisjon', slug: '1977-opprykk-1-divisjon', summary: 'Storhamar slo Spartacus 7–2 i siste serierunde og sikret andreplassen og opprykk til øverste nivå.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'season', id: 'season-1976-77' }, { kind: 'jersey', id: jerseyId }, { kind: 'arena', id: arenaId }], date: '1977-03-05', year: 1977, era: 'Veien mot toppen', importance: 'major', lastVerifiedAt: verifiedAt,
  },
  {
    id: 'timeline-1977-last-storhamarbana-game', title: 'Siste seriekamp på Storhamarbana', slug: '1977-siste-kamp-storhamarbana', summary: '7–2-seieren mot Spartacus ble også den siste registrerte kampen på den gamle naturisbanen før kunstisperioden.', completeness: 'verified', sources: ['silarkivet'], media: [], related: [{ kind: 'arena', id: arenaId }, { kind: 'season', id: 'season-1976-77' }], date: '1977-03-05', year: 1977, era: 'Veien mot toppen', importance: 'major', lastVerifiedAt: verifiedAt,
  },
]

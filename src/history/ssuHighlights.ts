import type { SSUPhoto } from './ssuHistory'

/**
 * Curated supporter moments. Unlike a raw match-results list, each highlight
 * documents an event involving SSU or the pre-SSU supporter culture directly.
 * Never turn a Storhamar victory into an alleged SSU-organised event.
 */
export type SSUHighlightCategory = 'roots' | 'culture' | 'community' | 'travel' | 'stands'
export interface SSUHighlight {
  id: string
  year: string
  date?: string
  category: SSUHighlightCategory
  title: string
  teaser: string
  paragraphs: string[]
  keyFact: string
  photoId?: SSUPhoto['id']
  sourceIds: string[]
  beforeSSU?: boolean
}

export const highlightCategories: {id:SSUHighlightCategory; title:string}[] = [
  {id:'roots', title:'Før SSU'},
  {id:'community', title:'Fellesskap'},
  {id:'travel', title:'Borteturer'},
  {id:'stands', title:'Tribuneøyeblikk'},
  {id:'culture', title:'Køllebladet og kultur'},
]

export const ssuHighlights: SSUHighlight[] = [
  {
    id:'1982-first-supporters',year:'1982',category:'roots',beforeSSU:true,
    title:'Før det fantes en supporterunion',keyFact:'1982 · Et ønske om en egen supportergjeng',
    teaser:'En liten ishall, tilreisende supportere og et lag som savnet mer liv på egen tribune.',
    paragraphs:[
      'Etter åpningen av Storhamar Ishall var det ikke gitt at Hamar skulle få den tribunekulturen byen er kjent for i dag. Trener Hans Westberg ønsket seg en egen supportergjeng som kunne skape stemning hjemme.',
      'På den tiden kom blant annet Sparta med mange tilhengere fra Sarpsborg. Historien viser at en aktiv supporterkultur ikke oppsto av seg selv. Den ble til fordi folk fortsatte å møte opp.',
    ],
    sourceIds:['early'],
  },
  {
    id:'1991-kollebladet',year:'1991/92',category:'culture',beforeSSU:true,
    title:'Køllebladet – fansen skriver selv',keyFact:'1991/92 · Første sesong',
    teaser:'Hockeysupporterne laget sin egen avis med historier, humor og meninger.',
    paragraphs:[
      'Før Facebook, Instagram og supportergrupper på nett var fanzinen en viktig møteplass. Køllebladet ble laget av hockeyfolk som hadde lyst til å skrive sin egen versjon av livet rundt Storhamar.',
      'Bladet kunne heie, erte, diskutere og dokumentere. Det ble ført videre gjennom SSU-årene og ble fortsatt omtalt som tilgjengelig via supporterunionen i 2013.',
    ],
    sourceIds:['fanzine'],
  },
  {
    id:'2001-founding',year:'2001',date:'2001-10-25',category:'community',
    title:'En ny union blir født',keyFact:'25. oktober 2001',
    teaser:'Storhamar Supporter Union blir stiftet og samler den organiserte supporterkulturen.',
    paragraphs:[
      'Hamar hadde allerede opplevd de store gullårene og et voksende hockeymiljø. Den nye supporterunionen ble en felles ramme for mennesker som ønsket å reise, synge og følge Storhamar i medgang og motgang.',
      'Stiftelsesdatoen 25. oktober 2001 markerer starten på SSUs egen historie. Menneskene og miljøet på tribunen hadde selvsagt vært der lenge før.',
    ],
    sourceIds:['registry'],
  },
  {
    id:'2014-jordal-semi',year:'2014',date:'2014-04-02',category:'travel',
    title:'Fire busser til den avgjørende semifinalen',keyFact:'4 supporterbusser til Jordal',
    teaser:'Storhamar var nede 0–3 i semifinaleserien, men hadde kjempet seg tilbake til kamp sju.',
    paragraphs:[
      '2. april 2014 sto den avgjørende semifinalen mot Vålerenga for tur. Borteinteressen fra Hamar var så stor at Vålerenga stanset nettsalget i deler av sin egen arena.',
      'Fire busser dro fra Hamar. Flere supportere kom fra Oslo. SSU-leder Stian Mikkelsen snakket om å prøve å synge ut hjemmepublikummet. På tribunen var kampen blitt mer enn bare en semifinalebillett.',
    ],
    sourceIds:['aftenposten-2014'],
  },
  {
    id:'2014-help',year:'2014',date:'2014-05-28',category:'community',
    title:'Da SSU hjalp klubben med penger',keyFact:'34 andeler · 10 200 kroner',
    teaser:'En vanskelig tid for Storhamar gjorde at supporterne gikk fra ord til handling.',
    paragraphs:[
      'Da Storhamar trengte økonomisk hjelp våren 2014 kunne folk kjøpe andeler i «Vi bygger laget – sammen med deg». Hver andel kostet 300 kroner.',
      'SSU kjøpte 34. Dermed kom 10 200 kroner fra supporterunionen inn til klubben. Det var ikke nok til å redde økonomien alene, men et synlig bevis på at supporterne ville være med å bære ansvaret.',
    ],
    sourceIds:['shares'],
  },
  {
    id:'2017-marathon',year:'2017',date:'2017-03-12',category:'stands',
    title:'Kampen som aldri ville ta slutt',keyFact:'217 minutter og 14 sekunder',
    teaser:'Sparta-kampen ble en verdensrekord. På tribunen måtte folk velge mellom natta og hverdagen.',
    paragraphs:[
      'Kvartfinalen mellom Storhamar og Sparta begynte som en vanlig ishockeykamp. Så kom overtidsperiode etter overtidsperiode. Til slutt var det spilt 217 minutter og 14 sekunder – en verdensrekord.',
      'Noen holdt ut helt til avgjørelsen, andre måtte dra for å rekke jobb og andre forpliktelser. SSU-leder Anne-Line Syversen fortalte til TV 2 at hun måtte reise før det var slutt. Det er en av de mer menneskelige historiene fra en helt uvanlig hockeynatt.',
    ],
    sourceIds:['marathon-2017'],
  },
  {
    id:'2018-stockholm',year:'2018',date:'2018-09-09',category:'travel',
    title:'Sammen i Stockholm',keyFact:'2018 · CHL-bortetur til Djurgården',
    teaser:'En europeisk hockeyhelg med felles møteplasser for tilreisende fra Hamar.',
    paragraphs:[
      'Da Storhamar skulle møte Djurgården i Champions Hockey League søndag 9. september, var mange supportere på vei til Stockholm. Klubben og SSU oppfordret de reisende til å møtes i området ved St. Eriksplan og Rörstrandsgatan på lørdagen.',
      'På kampdagen var det foreslått en ny samling rundt Hovet. Storhamar-supporterne fikk plass på borteseksjonen A27. Den gamle klubbmeldingen viser hvordan borteturer også til Europa handlet om å møtes før kampen og oppleve hockey sammen.',
    ],
    sourceIds:['stockholm'],
  },
  {
    id:'2019-kickoff',year:'2019',date:'2019-08-03',category:'community',
    title:'Supporterne som en del av klubbfamilien',keyFact:'2019 · SSU med egen stand',
    teaser:'På kickoff før den nye sesongen var SSU synlig sammen med klubbens yngre avdeling.',
    paragraphs:[
      'Storhamar inviterte til åpen sesongstart med blant annet hockeyutstyr, stands, aktiviteter og mulighet til å møte folk fra klubben.',
      'SSU hadde sin egen stand. Foreningen var ikke bare noe man så på bortetribunen. Den var også en del av møteplassen rundt Storhamar og starten på en ny sesong.',
    ],
    sourceIds:['kickoff-2019'],
  },
  {
    id:'2023-goalie-thanks',year:'2023',date:'2023-01-26',category:'stands',
    title:'Trym Gran takker bortetribunen',keyFact:'26. januar 2023 · Stjernehallen',
    teaser:'Et fotografi fanger et enkelt, sterkt øyeblikk mellom spiller og supportere.',
    paragraphs:[
      'Etter kampen i Stjernehallen gikk Storhamar-keeper Trym Gran fram til supporterne for å takke. På den ene siden av glasset sto spilleren. På den andre sto SSU-folket som hadde reist for laget.',
      'Gran brukte fortsatt noe rødt keeperutstyr etter overgangen fra Lillehammer, slik bildet viser. Det gjør fotografiet til et lite tidsdokument – fra en ny spillers første tid i Storhamar.',
    ],
    photoId:'trym',sourceIds:['commons-trym'],
  },
  {
    id:'2023-six-buses',year:'2023',date:'2023-02-25',category:'travel',
    title:'Seks fulle busser mot Vålerenga',keyFact:'6 busser på én bortetur',
    teaser:'Fire busser var ikke nok. Ventelista vokste og buss nummer fem ble fylt på minutter.',
    paragraphs:[
      'Storhamar lå tett bak Stavanger Oilers i gullkampen da en viktig seriekamp på Jordal nærmet seg. SSU satte opp fire busser, men interessen fortsatte å vokse.',
      'Til slutt ble det seks busser på E6. SSU-profil Stian Rosenberg fortalte at den femte bussen fylte seg på rundt ti minutter. Det var et øyeblikk som viste hvor sterkt rivaloppgjøret engasjerte Storhamar-familien.',
    ],
    sourceIds:['nitten-six-buses'],
  },
  {
    id:'2023-jordal-picture',year:'2023',date:'2023-03-25',category:'stands',
    title:'Bortefeltet på nye Jordal',keyFact:'25. mars 2023 · Jordal Amfi',
    teaser:'Gule og blå farger samlet i en egen svingscene mot Vålerenga.',
    paragraphs:[
      'De store rivaloppgjørene har sin egen temperatur. Et bilde fra 25. mars viser supporterne tett på hverandre med skjerf, flagg og bannere på Jordal.',
      'Sammen med andre bortebilder fra 2023 er dette en viktig del av den visuelle dokumentasjonen av hva SSU faktisk gjorde: de reiste og sto sammen.',
    ],
    photoId:'jordal',sourceIds:['commons-jordal'],
  },
  {
    id:'2023-stolte-bonder',year:'2023',date:'2023-09-27',category:'culture',
    title:'«Stolte bønder» blir vår egen identitet',keyFact:'2023 · Flagga, sangene og introfilmen',
    teaser:'Supporterne tok eierskap til et kallenavn og gjorde det til noe å være stolt av.',
    paragraphs:[
      'Ord som er ment som erting kan få ny mening. Storhamar-supporterne tok etter hvert «bønder» og gjorde det til sitt eget uttrykk for identitet og fellesskap. Klubben fortalte i september 2023 at dette var synlig både på flagg og i sanger.',
      'Den nye introfilmen brukte den samme stoltheten som tema. Spillerne ble filmet på Jønsberg med traktorer, fjøs og gårdsliv. Dette er en historie om hele Storhamars supporterkultur, ikke en påstand om at SSU alene laget uttrykket.',
    ],
    sourceIds:['stolte-bonder-2023'],
  },
  {
    id:'2024-final-tickets',year:'2024',date:'2024-04-14',category:'travel',
    title:'SSU organiserer bortefeltet i NM-finalen',keyFact:'Finale 2024 · Felt 215 og 216',
    teaser:'Finalene mot Vålerenga var utsolgte høydepunkter. SSU fikk en konkret rolle for bortesupporterne.',
    paragraphs:[
      'Da Storhamar og Vålerenga møttes i NM-finalen i 2024 var Jordal Amfi igjen sentrum for et stort supporteroppgjør.',
      'Vålerengas offisielle informasjon oppga at billetter til bortefeltene 215 og 216 ble solgt gjennom Storhamar Supporterunion. Organiseringen av plassene var en praktisk, men viktig del av å samle folk i gult og blått på bortebane.',
    ],
    sourceIds:['vif-final-2024'],
  },
  {
    id:'2024-membership',year:'2024',category:'community',
    title:'Medlemskapet blir mer tilgjengelig',keyFact:'2024-vedtak · Ordning fra 2025',
    teaser:'Årsmøtet vedtar nye kontingenter. En digital påmelding gjør SSU enklere å drive.',
    paragraphs:[
      'På årsmøtet i 2024 ble medlemskontingentene som gjaldt fra 2025 vedtatt. I SSUs egen informasjon for sesongen 2026/27 er barn under 16 år gratis medlemmer, ungdom 16–20 år har en egen pris og voksne over 20 år en annen.',
      'Supporterunionen beskriver også hvordan digital innmelding gir rask bekreftelse og gjør det lettere å informere medlemmene. Bussrabatter, medlemsarrangementer og fordeler på billetter er en del av tilbudet. Det er slike praktiske ordninger som hjelper supporterkulturen videre til nye generasjoner.',
    ],
    sourceIds:['member-signup-2026'],
  },
  {
    id:'2025-fanzine-booknight',year:'2025',date:'2025-10-08',category:'culture',
    title:'Køllebladet får plass på historiekvelden',keyFact:'8. oktober 2025 · Forza Hamar',
    teaser:'Det gamle fanzinet ble igjen knyttet til Storhamars historie og identitet.',
    paragraphs:[
      'Lars Nikolaisen og Ole Eskild Dahlstrøm sto på programmet for en historiekveld om Storhamar Hockey i Hamar. Etter den planlagte samtalen var det satt av egen oppmerksomhet til supporterunionens fanzine Køllebladet.',
      'At et gammelt supporterblad fikk en plass i programmet flere tiår etter starten viser at supporterne ikke bare lager stemning. De er også med på å bevare historien. Arrangementet er dokumentert gjennom programomtalen.',
    ],
    sourceIds:['history-night-2025'],
  },
  {
    id:'2026-october-trips',year:'2026',date:'2026-10-24',category:'travel',
    title:'To borteturer like før 25-årsdagen',keyFact:'20. og 24. oktober 2026',
    teaser:'SSU satte opp supporterbusser både til Ringerike og til Hockey Classic på Lillehammer.',
    paragraphs:[
      'I oktober 2026 viser SSUs egen påmeldingsoversikt at det var satt opp bussturer til Ringerike 20. oktober og Hockey Classic mellom Lillehammer og Storhamar 24. oktober.',
      'Hockey Classic-turen falt dagen før det var 25 år siden stiftelsen i 2001. Det gjør disse turene til et lite bilde på hva supporterunionen fortsatt driver med: å få folk fram til kampene sammen. Det finnes ikke grunnlag her for å omtale turen som et offisielt jubileumsarrangement.',
    ],
    sourceIds:['official-trips-2026','registry'],
  },
  {
    id:'2026-anniversary',year:'2026',date:'2026-10-25',category:'community',
    title:'25 år med Storhamar Supporter Union',keyFact:'25 år · 2001–2026',
    teaser:'Et kvart århundre fra stiftelsesdagen til en ny generasjon supportere.',
    paragraphs:[
      '25. oktober 2026 var det gått 25 år siden supporterunionen ble stiftet. Gjennom årene kom det nye spillere, nye arenaer, nye sanger og nye måter å være supporter på.',
      'Det som bandt generasjonene sammen var å møte opp for Storhamar. Historien fortsetter hver gang noen tar på seg drakta, går inn i hallen eller setter seg på supporterbussen.',
    ],
    sourceIds:['registry'],
  },
]

export function filteredSSUHighlights(category: SSUHighlightCategory | 'all'): SSUHighlight[] {
  return category==='all' ? ssuHighlights : ssuHighlights.filter((highlight)=>highlight.category===category)
}

export function ssuHighlight(id: string): SSUHighlight | undefined {
  return ssuHighlights.find((highlight)=>highlight.id===id)
}

import type { ArchiveTimelineEvent } from './types'

/**
 * Additional independent source-documented milestones, not invented filler.
 * SIL-arkivet is the source for sporting records; Brønnøysund for SSU founding.
 */
export const auditedMilestones: ArchiveTimelineEvent[] = [
  {
    id:'timeline-1961-first-official-game', title:'Den første offisielle seriekampen – 6. januar 1961',
    slug:'1961-forste-offisielle-seriekamp', year:1961, date:'1961-01-06', importance:'major',
    summary:'Storhamar startet sitt offisielle seriespill med 14–3 mot Elverum. Knut Moe scoret klubbens første offisielle seniormål.',
    body:['Kampen ble spilt på Storhamarbana i 2. divisjon avdeling C, som den gang var nivå tre i det norske seriesystemet. Dette markerte overgangen fra uoffisielle lokale serier til organisert norsk ishockey.'],
    completeness:'verified',sources:['sil-milepaeler'],media:[],related:[{kind:'season',id:'season-1960-61'},{kind:'arena',id:'arena-storhamarbana'}],tags:['første kamp','1961','historie'],
  },
  {
    id:'timeline-2001-ssu-founded', title:'Storhamar Supporterunion stiftet – 25. oktober 2001',
    slug:'2001-storhamar-supporterunion',year:2001,date:'2001-10-25',importance:'major',
    summary:'Storhamar Supporterunion (SSU) ble stiftet 25. oktober 2001 og har til formål å støtte Storhamar Hockey.',
    body:['Stiftelsesdato og organisasjonens registrerte formål er bekreftet i Brønnøysundregistrene. Supporterhistorien er en sentral del av klubbens identitet, men det som ennå ikke har sikre kilder om konkrete turer, tifo eller organisasjonsutvikling blir ikke framstilt som dokumentert.'],
    completeness:'verified',sources:['brreg-ssu'],media:[],related:[{kind:'arena',id:'arena-hamar-ol-amfi'}],tags:['supporter','SSU','tribune','2001'],
  },
  {
    id:'timeline-2004-amfi-crowd-record', title:'7405 på NM-finalen i OL-Amfi',
    slug:'2004-publikumsrekord-7405',year:2004,date:'2004-03-28',importance:'major',
    summary:'7405 tilskuere så finalekampen mot Vålerenga i Hamar OL-Amfi 28. mars 2004.',
    body:['SIL-arkivets oversikt over publikumsrekorder dokumenterer tilskuertallet. Den store tilstrømmingen viser hvordan ishockeyen hadde etablert seg som en av Hamars viktigste publikumsidretter.'],
    completeness:'verified',sources:['sil-milepaeler'],media:[],related:[{kind:'season',id:'season-2003-04'},{kind:'honour',id:'honour-2004-nm'},{kind:'arena',id:'arena-hamar-ol-amfi'}],tags:['publikum','rekord','Vålerenga','2004'],
  },
  {
    id:'timeline-2022-2250-games', title:'Storhamars seniorkamp nummer 2250',
    slug:'2022-seniorkamp-2250',year:2022,date:'2022-10-06',importance:'notable',
    summary:'6. oktober 2022 spilte Storhamar sin 2250. offisielle seniorkamp. Kampen endte 1–2 etter straffer mot Frisk Asker.',
    body:['Milepælen teller de offisielle seniorkampene i serie, sluttspill, kvalifisering og Europa. SIL-arkivet fører kampnummeret som en del av klubbens samlede kampstatistikk.'],
    completeness:'verified',sources:['sil-milepaeler'],media:[],related:[{kind:'season',id:'season-2022-23'}],tags:['kampnummer','rekord','2022'],
  },
  {
    id:'timeline-2023-goal-10000', title:'Martin Johnsen scoret klubbens seniormål nummer 10 000',
    slug:'2023-10000-seniormal',year:2023,date:'2023-10-26',importance:'major',
    summary:'Martin Johnsen scoret Storhamars offisielle seniormål nummer 10 000 borte mot Ringerike 26. oktober 2023.',
    body:['Tallet er dokumentert av SIL-arkivet og inkluderer offisielle kamper i seriespill, sluttspill, kvalifisering og Europacup. Hendelsen illustrerer klubbens lange kontinuitet fra de første seniorkampene på 1960-tallet.'],
    completeness:'verified',sources:['sil-milepaeler'],media:[],related:[{kind:'season',id:'season-2023-24'}],tags:['mål','milepæl','Martin Johnsen','2023'],
  },
]

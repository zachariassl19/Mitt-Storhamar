const logos: Record<string, string> = {
  Storhamar: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Storhamar_Hockey.png',
  'BIK Karlskoga': 'https://www.sil.no/wp-content/uploads/2025/06/bikk-logo.jpg',
  'Mora IK': 'https://www.sil.no/wp-content/uploads/2024/05/mik.jpg',
  'Sparta Sarpsborg': 'https://sportality.cdn.s8y.se/team-logos/spa1_spa.svg',
  'HC Davos': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_HC_Davos.svg',
  'Genève-Servette': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ReproGeneveServetteHC.svg',
  Klagenfurt: 'https://www.kac.at/wp-content/uploads/2021/08/KAC_Logo_weisse-Sterne-100x96.png?ver=20210824081408',
  Frölunda: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Frölunda_HC.png',
  Tappara: 'https://logotyp.us/file/tappara.svg',
  'Graz 99ers': 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_99ers.svg',
  'Frisk Asker': 'https://sportality.cdn.s8y.se/team-logos/fri1_fri.svg',
  Ringerike: 'https://www.ringerikepanthers.no/assets/gfx/logo/ringerike-panthers-243.png',
  'Stavanger Oilers': 'https://sportality.cdn.s8y.se/team-logos/sta1_sta.svg',
  Nidaros: 'https://sportality.cdn.s8y.se/team-logos/nid1_nid.svg',
  Vålerenga: 'https://sportality.cdn.s8y.se/team-logos/val1_val.svg',
  Narvik: 'https://6b6ede68d1.clvaw-cdnwnd.com/0159d7b8b40b53f731ae390feb798975/200001944-e87f9e87fb/logonyest-8.png?ph=6b6ede68d1',
  Stjernen: 'https://sportality.cdn.s8y.se/team-logos/stj1_stj.svg',
  Lillehammer: 'https://sportality.cdn.s8y.se/team-logos/lil1_lil.svg',
}

export function logoForTeam(team: string) {
  return logos[team]
}

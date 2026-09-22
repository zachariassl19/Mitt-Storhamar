const logos: Record<string, string> = {
  Storhamar: 'https://sportality.cdn.s8y.se/team-logos/sto2_sto.svg',
  'Frisk Asker': 'https://sportality.cdn.s8y.se/team-logos/fri1_fri.svg',
  Nidaros: 'https://sportality.cdn.s8y.se/team-logos/nid1_nid.svg',
  'Stavanger Oilers': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Stavanger_Oilers.png',
  Vålerenga: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Valerenga_IF_Logo.png',
  Stjernen: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Stjernen.jpg',
  Lillehammer: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Lillehammer_IK.gif',
  'Sparta Sarpsborg': 'https://upload.wikimedia.org/wikipedia/en/8/8f/Sparta_Warriors_logo.png',
  Ringerike: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Ringerikepanthers.png',
  Narvik: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Narvikhockeylogo.png',
  'BIK Karlskoga': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/BIK_Karlskoga_%28logo%29.svg',
  'Mora IK': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Mora_IK_logo.svg',
  'HC Davos': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Logo_HC_Davos.svg',
  'Genève-Servette': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/ReproGeneveServetteHC.svg',
  Klagenfurt: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/EC_KAC_Logo1.svg',
  Frölunda: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Fr%C3%B6lunda_HC.png',
  Tappara: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Logo_of_Tappara.svg',
  'Graz 99ers': 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Logo_99ers.svg',
}

export function logoForTeam(team: string) {
  return logos[team]
}

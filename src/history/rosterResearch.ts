export type RosterResearchStatus = 'verified-complete' | 'partial' | 'needs-source'

export interface SeasonRosterResearch {
  seasonId: string
  displayName: string
  status: RosterResearchStatus
  players: string[]
  coaches: string[]
  sourceUrl: string
  note?: string
}

const tenLeagueTitlesSource = 'https://www.sil.no/historietirsdag-10-seriegull/'

// Navnene beholdes slik de står i Storhamars egen historikk. Dette er research-laget
// før navnene kobles én-for-én mot ArchivePerson-ID-er. På den måten mister vi ikke
// spillere bare fordi en spillerprofil ennå ikke er opprettet.
export const championshipRosterResearch: SeasonRosterResearch[] = [
  {
    seasonId: 'season-1992-93', displayName: '1992/93', status: 'verified-complete',
    players: ['Svein Harald Arnesen', 'Remo Martinsen', 'Jan Tore Rønningen', 'Nikolai Davydkin', 'Jon-Hroar Nordstrøm', 'Carl Oscar Bøe Andersen', 'Tommy Larsen', 'Åge Ellingsen', 'Kent Inge Kristiansen', 'Sjur Rakstad-Larsen', 'Tom Erik Olsen', 'Ole Eskild Dahlstrøm', 'Peter Madach', 'Rune Gulliksen', 'Klas Forfang', 'Børre Østvang', 'Erik Kristiansen', 'Martin Åhlberg', 'Patrick Eide', 'Pål Martinsen', 'Petter Thoresen'],
    coaches: ['Lennart Åhlberg'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-1993-94', displayName: '1993/94', status: 'verified-complete',
    players: ['Svein Harald Arnesen', 'Anders Soløst', 'Petter Salsten', 'Nikolai Davydkin', 'Carl Oscar Bøe Andersen', 'Åge Ellingsen', 'Jon-Hroar Nordstrøm', 'Tommy Larsen', 'Martin Åhlberg', 'Erik Kristiansen', 'Ole Eskild Dahlstrøm', 'Tom Erik Olsen', 'Rune Gulliksen', 'Petter Thoresen', 'Patrick Eide', 'Pål Martinsen', 'Klas Forfang', 'Børre Østvang'],
    coaches: ['Lennart Åhlberg'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-1994-95', displayName: '1994/95', status: 'verified-complete',
    players: ['Jim Marthinsen', 'Svein Harald Arnesen', 'Petter Salsten', 'Peter Madach', 'Carl Oscar Bøe Andersen', 'Jan Karlsson', 'Jon-Hroar Nordstrøm', 'Kent Inge Kristiansen', 'Jan Tore Rønningen', 'Tommy Larsen', 'Martin Åhlberg', 'Ole Eskild Dahlstrøm', 'Tom Erik Olsen', 'Erik Kristiansen', 'Petter Thoresen', 'Rune Gulliksen', 'Pål Martinsen', 'Pål Johnsen', 'Patrick Eide', 'Klas Forfang'],
    coaches: ['Göran Sjöberg'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-1996-97', displayName: '1996/97', status: 'verified-complete',
    players: ['Jim Marthinsen', 'Svein Harald Arnesen', 'Petter Salsten', 'Alexander Smirnov', 'Carl Oscar Bøe Andersen', 'Jon-Hroar Nordstrøm', 'Lubos Sikela', 'Tommy Larsen', 'Magnus Østeraas', 'Daniel Østbye', 'Ole Eskild Dahlstrøm', 'Tom Erik Olsen', 'Jouri Leonov', 'Erik Kristiansen', 'Pål Johnsen', 'Martin Åhlberg', 'André Manskov Hansen', 'Morten Fjeld', 'Pål Martinsen', 'Tom Cato Myhre', 'Rune Gulliksen', 'Torkil Brustad', 'Snorre Hallem', 'Ronny Tajet'],
    coaches: ['Petter Thoresen'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-2000-01', displayName: '2000/01', status: 'verified-complete',
    players: ['Jonas Norgren', 'Geir Østberg', 'Alexander Smirnov', 'Carl Oscar Bøe Andersen', 'Michael Smithurst', 'Per Kristian Jonassen', 'Magnus Østeraas', 'Anders Kolbuholen', 'Ole Fredrik Kirkebye', 'Stian Hoelseth', 'Ole Eskild Dahlstrøm', 'Tom Erik Olsen', 'Henrik Pettersson', 'Patrick Thoresen', 'Mads Hansen', 'Johnny Bruun', 'Geir Svendsberget', 'Joakim Persson', 'Snorre Hallem', 'Dimitri Lavrentiev', 'Eirik Skadsdammen', 'Henning Paulsen'],
    coaches: ['Alexander Smirnov', 'Rune Gulliksen'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-2003-04', displayName: '2003/04', status: 'verified-complete',
    players: ['Jonas Norgren', 'Geir Østberg', 'Antti Rahkonen', 'Alexander Smirnov', 'Mattias Livf', 'Michael Smithurst', 'Mikael Tjälldén', 'Magnus Østeraas', 'Ola Johannessen', 'Cato Ørbæk', 'Tom Erik Olsen', 'Ole Eskild Dahlstrøm', 'Joakim Persson', 'Igor Alexandrov', 'Knut Henrik Spets', 'Snorre Hallem', 'Geir Svendsberget', 'Chris Marinucci', 'Jarkko Väänänen', 'Håkan Åhlund', 'Pål Johnsen', 'Eirik Skadsdammen', 'Christian Olasveengen', 'Christian Saxrud', 'Simen Saxrud', 'Lars Erik Hesbråten'],
    coaches: ['Petter Salsten'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-2005-06', displayName: '2005/06', status: 'verified-complete',
    players: ['Jonas Norgren', 'Geir Østberg', 'Ruben Smith', 'Antti Rahkonen', 'Alexander Smirnov', 'Jaakko Harikkala', 'Mattias Livf', 'Lars Løkken Østli', 'Cato Ørbæk', 'Mikael Tjälldén', 'Ola Johannessen', 'Mads Hansen', 'Patrick Yetman', 'Urban Omark', 'Pål Johnsen', 'Steffen Thoresen', 'Geir Svendsberget', 'Eirik Skadsdammen', 'Knut Henrik Spets', 'Tom Erik Olsen', 'Hans Stubrud', 'Christian Olasveengen', 'Kristian Forsberg', 'Simen Saxrud'],
    coaches: ['Petter Thoresen'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-2017-18', displayName: '2017/18', status: 'verified-complete',
    players: ['Oskar Östlund', 'Jonas Strand', 'Kodie Curran', 'Jimmy Andersson', 'Christian Bull', 'Lars Løkken Østli', 'Mikkel Søgaard', 'Simen Løvhaug Hansen', 'Håkon Engh', 'Emil Frøshaug', 'Christian Larrivée', 'Mikael Zettergren', 'Joakim Jensen', 'Robin Dahlstrøm', 'Victor Svensson', 'Josh Nicholls', 'Patrick Thoresen', 'Steffen Thoresen', 'Martin Rønnild', 'Hampus Gustafsson', 'Kjetil Martinsen', 'Phil Marinaccio', 'Eirik Skadsdammen', 'Lars Erik Hesbråten', 'Mikael Dokken', 'Simen André Edvardsen'],
    coaches: ['Fredrik Söderström'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-2023-24', displayName: '2023/24', status: 'verified-complete',
    players: ['Markus Stensrud', 'Trym Gran', 'Stefan Espeland', 'Sander Hurrød', 'Sverre Rønningen', 'Andreas Hjelm', 'Jakub Kindl', 'Adrian Saxrud-Danielsen', 'Villiam Strøm', 'Mathias Papuga', 'Patrick Thoresen', 'Peter Quenneville', 'Eirik Salsten', 'Jacob Berglund', 'Martin Johnsen', 'Andreas Martinsen', 'Andreas Dahl', 'Samuel Solem', 'Martin Rønnild', 'Kenneth Pappalardo', 'Marcus Bryhnisveen', 'Jacob Lundell Noer', 'Magnus Mjørud', 'Axel Sandnes', 'Ole Indergaard'],
    coaches: ['Petter Thoresen'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-2024-25', displayName: '2024/25', status: 'verified-complete',
    players: ['Trym Gran', 'Markus Stensrud', 'Stefan Espeland', 'Sander Hurrød', 'Andreas Hjelm', 'Sverre Rønningen', 'Adrian Saxrud-Danielsen', 'Joe Gatenby', 'Mathias Papuga', 'Cole Schneider', 'Andreas Martinsen', 'Jacob Berglund', 'Håvard Salsten', 'Austin Cangelosi', 'Martin Rønnild', 'Samuel Solem', 'Victor Svensson', 'Kenneth Pappalardo', 'Andreas Dahl', 'Mats Bakke Olsen', 'David Aas-Larsen', 'Marcus Bryhnisveen', 'Axel Sandnes', 'Linus Morken'],
    coaches: ['Petter Thoresen'], sourceUrl: tenLeagueTitlesSource,
  },
  {
    seasonId: 'season-2025-26', displayName: '2025/26', status: 'partial',
    players: ['Markus Stensrud', 'Henrik Fayen-Vestavik', 'Joe Gatenby', 'Sverre Rønningen', 'Andreas Hjelm', 'Amil Krupic', 'Stefan Espeland', 'Sander Hurrød', 'Christian Bull', 'Mathias Papuga', 'Zach O’Brien', 'Colin Campbell', 'Andreas Martinsen', 'Jacob Berglund', 'Austin Cangelosi', 'Martin Rønnild', 'David Aas-Larsen', 'Kenneth Pappalardo', 'Marcus Bryhnisveen', 'Mats Bakke Olsen', 'Axel Sandnes', 'Isac Skedung', 'Olle Liss', 'Oliver Nilsgård', 'Andreas Dahl'],
    coaches: ['Petter Thoresen'], sourceUrl: 'https://silarkivet.no/20-tallet/2025-26/sluttspill/',
    note: 'Navnene er kontrollert mot gjentatte kampoppstillinger i sluttspillet. Full sesongstall skal først settes til verified-complete når hele sesongens spillerregister er kontrollert, slik at korte innhopp og juniorspillere ikke faller ut.',
  },
]

export const rosterResearchSummary = {
  verifiedCompleteTitleRosters: championshipRosterResearch.filter((entry) => entry.status === 'verified-complete').length,
  totalTitleSeasonsTracked: championshipRosterResearch.length,
  note: 'Dette er researchgrunnlaget for spillerarkivet. Målet er komplette staller for alle sesonger, ikke bare gullsesongene.',
} as const

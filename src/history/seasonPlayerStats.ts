import type { ArchivePerson, SeasonPlayerStat } from './types'

const verifiedAt = '2026-10-06'

function skater(
  playerName: string,
  sourceUrl: string,
  gamesPlayed: number,
  goals: number,
  assists: number,
  points: number,
  position?: string,
  penaltyMinutes?: number,
  plusMinus?: number,
): SeasonPlayerStat {
  return {
    playerName,
    position,
    role: 'skater',
    competition: 'Norway',
    scope: 'regular-season',
    gamesPlayed,
    goals,
    assists,
    points,
    penaltyMinutes,
    plusMinus,
    sourceUrl,
    sourceLabel: 'Elite Prospects',
    verifiedAt,
  }
}

function goalie(
  playerName: string,
  sourceUrl: string,
  gamesPlayed: number,
  goalsAgainstAverage: number,
  savePercentage: number,
  wins?: number,
  losses?: number,
  shutouts?: number,
): SeasonPlayerStat {
  return {
    playerName,
    position: 'Keeper',
    role: 'goalie',
    competition: 'Norway',
    scope: 'regular-season',
    gamesPlayed,
    goalsAgainstAverage,
    savePercentage,
    wins,
    losses,
    shutouts,
    sourceUrl,
    sourceLabel: 'Elite Prospects',
    verifiedAt,
  }
}

const ep200001 = 'https://www.eliteprospects.com/team/181/storhamar/stats/2000-2001'
const ep200304 = 'https://www.eliteprospects.com/team/181/storhamar/stats/2003-2004'
const ep200506 = 'https://www.eliteprospects.com/team/181/storhamar/stats/2005-2006'
const ep201718 = 'https://www.eliteprospects.com/team/181/storhamar/stats/2017-2018'
const ep202324 = 'https://www.eliteprospects.com/team/181/storhamar/stats/2023-2024'
const ep202425 = 'https://www.eliteprospects.com/team/181/storhamar/stats/2024-2025'
const ep202526 = 'https://www.eliteprospects.com/team/181/storhamar/stats/2025-2026'

export const seasonPlayerStatsBySeasonId: Record<string, SeasonPlayerStat[]> = {
  'season-2000-01': [
    skater('Ole Eskild Dahlstrøm', ep200001, 39, 21, 39, 60, 'Forward', 34, 37),
    skater('Tom Erik Olsen', ep200001, 32, 31, 25, 56, 'Forward', 39, 43),
    skater('Henrik Pettersson', ep200001, 41, 26, 19, 45, 'Forward', 30, 41),
    skater('Patrick Thoresen', ep200001, 40, 18, 27, 45, 'Forward', 24, 44),
    skater('Carl Oscar Bøe Andersen', ep200001, 41, 9, 31, 40, 'Back', 42, 39),
    skater('Mads Hansen', ep200001, 42, 18, 19, 37, 'Forward', 83, 23),
    skater('Johnny Bruun', ep200001, 42, 16, 19, 35, 'Forward', 12, 35),
    skater('Geir Svendsberget', ep200001, 39, 19, 12, 31, 'Forward', 132, 31),
    skater('Alexander Smirnov', ep200001, 42, 9, 21, 30, 'Back', 46, 29),
    skater('Joakim Persson', ep200001, 21, 9, 14, 23, 'Forward', 2, 20),
    skater('Michael Smithurst', ep200001, 41, 3, 17, 20, 'Back', 12, 32),
    skater('Snorre Hallem', ep200001, 42, 7, 9, 16, 'Forward', 85, 20),
    skater('Dimitri Lavrentiev', ep200001, 25, 6, 7, 13, 'Forward', 28, 10),
    skater('Per Kristian Jonassen', ep200001, 40, 6, 7, 13, 'Back', 30, 36),
    skater('Magnus Østeraas', ep200001, 41, 4, 8, 12, 'Back', 102, 26),
    skater('Eirik Skadsdammen', ep200001, 40, 5, 4, 9, 'Forward', 8, 9),
    skater('Anders Kolbuholen', ep200001, 35, 2, 6, 8, 'Back', 10, 13),
    skater('Henning Paulsen', ep200001, 21, 1, 3, 4, 'Forward', 2, 4),
    skater('Christian Olasveengen', ep200001, 7, 1, 1, 2, 'Forward', 0, 2),
    skater('Ole Fredrik Kirkebye', ep200001, 33, 1, 1, 2, 'Back', 18, 18),
    skater('Jouri Leonov', ep200001, 8, 1, 0, 1, 'Forward', 6, -2),
    skater('Stian Hoelseth', ep200001, 29, 1, 0, 1, 'Back', 0),
    skater('Ola Sætrang', ep200001, 1, 0, 0, 0, 'Forward', 0),
    goalie('Jonas Norgren', ep200001, 39, 1.70, 0.922),
    goalie('Geir Østberg', ep200001, 9, 2.52, 0.856),
  ],

  'season-2003-04': [
    skater('Tom Erik Olsen', ep200304, 40, 28, 16, 44, 'Forward', 18, 32),
    skater('Antti Rahkonen', ep200304, 37, 10, 23, 33, 'Back', 16, 21),
    skater('Joakim Persson', ep200304, 38, 16, 11, 27, 'Forward', 4, 22),
    skater('Ole Eskild Dahlstrøm', ep200304, 35, 4, 18, 22, 'Forward', 16, 16),
    skater('Alexander Smirnov', ep200304, 40, 2, 18, 20, 'Back', 34, 29),
    skater('Geir Svendsberget', ep200304, 39, 14, 4, 18, 'Forward', 130, 10),
    skater('Igor Alexandrov', ep200304, 18, 11, 7, 18, 'Forward', 44, 10),
    skater('Snorre Hallem', ep200304, 42, 10, 8, 18, 'Forward', 43, 11),
    skater('Mattias Livf', ep200304, 42, 8, 10, 18, 'Back', 32, 19),
    skater('Knut Henrik Spets', ep200304, 41, 12, 5, 17, 'Forward', 14, 6),
    skater('Håkan Åhlund', ep200304, 24, 3, 12, 15, 'Forward', 20, 18),
    skater('Pål Johnsen', ep200304, 14, 3, 11, 14, 'Forward', 10, 1),
    skater('Christian Olasveengen', ep200304, 31, 6, 7, 13, 'Forward', 10, 1),
    skater('Jarkko Väänänen', ep200304, 17, 4, 8, 12, 'Forward', 27, 6),
    skater('Eirik Skadsdammen', ep200304, 42, 4, 6, 10, 'Forward', 20, 5),
    skater('Chris Marinucci', ep200304, 17, 4, 5, 9, 'Forward', 26, 5),
    skater('Mikael Tjälldén', ep200304, 31, 1, 8, 9, 'Back', 32, 6),
    skater('Michael Smithurst', ep200304, 39, 1, 7, 8, 'Back', 8, 8),
    skater('Magnus Østeraas', ep200304, 42, 0, 6, 6, 'Back', 26, 6),
    skater('Ola Johannessen', ep200304, 40, 2, 3, 5, 'Back', 10, 7),
    skater('Simen Saxrud', ep200304, 31, 3, 0, 3, 'Forward', 16, -1),
    skater('Cato Ørbæk', ep200304, 30, 1, 2, 3, 'Back', 16, -1),
    skater('Hans Stubrud', ep200304, 8, 2, 0, 2, 'Forward', 4),
    skater('Lars Erik Hesbråten', ep200304, 29, 1, 1, 2, 'Back'),
    skater('Christian Saxrud', ep200304, 38, 1, 1, 2, 'Forward', 16, -5),
    skater('Teddy Midttun', ep200304, 4, 0, 0, 0, 'Back', 2, 0),
    skater('Espen Kristiansen', ep200304, 5, 0, 0, 0, 'Back', 6, -1),
  ],

  'season-2005-06': [
    skater('Patrick Yetman', ep200506, 42, 42, 27, 69, 'Forward', 16, 53),
    skater('Mads Hansen', ep200506, 41, 21, 46, 67, 'Forward', 24, 53),
    skater('Urban Omark', ep200506, 42, 12, 25, 37, 'Forward', 30, 36),
    skater('Steffen Thoresen', ep200506, 42, 17, 19, 36, 'Forward', 65, 33),
    skater('Antti Rahkonen', ep200506, 41, 8, 25, 33, 'Back', 14, 46),
    skater('Pål Johnsen', ep200506, 40, 14, 19, 33, 'Forward', 37, 17),
    skater('Geir Svendsberget', ep200506, 40, 13, 17, 30, 'Forward', 134, 35),
    skater('Knut Henrik Spets', ep200506, 42, 14, 10, 24, 'Forward', 26, 19),
    skater('Eirik Skadsdammen', ep200506, 42, 12, 11, 23, 'Forward', 22, 21),
    skater('Jaakko Harikkala', ep200506, 39, 7, 14, 21, 'Back', 89, 40),
    skater('Mattias Livf', ep200506, 42, 5, 15, 20, 'Back', 36, 39),
    skater('Alexander Smirnov', ep200506, 41, 6, 13, 19, 'Back', 36, 8),
    skater('Tom Erik Olsen', ep200506, 36, 5, 12, 17, 'Forward', 12, 16),
    skater('Hans Stubrud', ep200506, 34, 5, 9, 14, 'Forward', 18, 13),
    skater('Christian Olasveengen', ep200506, 31, 9, 2, 11, 'Forward', 10, 5),
    skater('Lars Løkken Østli', ep200506, 33, 3, 7, 10, 'Back', 18, 17),
    skater('Kristian Forsberg', ep200506, 41, 6, 3, 9, 'Forward', 6, 17),
    skater('Cato Ørbæk', ep200506, 39, 2, 6, 8, 'Back', 34, 18),
    skater('Mikael Tjälldén', ep200506, 23, 0, 5, 5, 'Back', 53, 15),
    skater('Ola Johannessen', ep200506, 26, 0, 4, 4, 'Back', 26, 10),
    skater('Simen Saxrud', ep200506, 14, 1, 1, 2, 'Forward', 2, 5),
    skater('Espen Søby Botheim', ep200506, 5, 0, 1, 1, 'Forward', 0, 1),
    skater('Mika Risbakken', ep200506, 2, 0, 0, 0, 'Back', 0, 0),
    goalie('Ruben Smith', ep200506, 4, 0.50, 0.973),
    goalie('Jonas Norgren', ep200506, 37, 1.54, 0.934),
    goalie('Geir Østberg', ep200506, 7, 2.39, 0.831),
  ],

  'season-2017-18': [
    skater('Joakim Jensen', ep201718, 40, 21, 26, 47, 'Forward', 22, 39),
    skater('Christian Larrivée', ep201718, 44, 17, 29, 46, 'Forward', 20, 37),
    skater('Kodie Curran', ep201718, 38, 12, 32, 44, 'Back', 65, 51),
    skater('Mikael Zettergren', ep201718, 45, 16, 23, 39, 'Forward', 2, 33),
    skater('Robin Dahlstrøm', ep201718, 36, 18, 17, 35, 'Forward', 70, 36),
    skater('Victor Svensson', ep201718, 39, 8, 19, 27, 'Forward', 36, 25),
    skater('Patrick Thoresen', ep201718, 23, 7, 18, 25, 'Forward', 18, 14),
    skater('Jimmy Andersson', ep201718, 44, 3, 21, 24, 'Back', 24, 44),
    skater('Martin Rønnild', ep201718, 39, 17, 6, 23, 'Forward', 51, 15),
    skater('Steffen Thoresen', ep201718, 41, 13, 10, 23, 'Forward', 30, 18),
    skater('Josh Nicholls', ep201718, 22, 13, 7, 20, 'Forward', 12, 14),
    skater('Hampus Gustafsson', ep201718, 32, 6, 13, 19, 'Forward', 26, 4),
    skater('Christian Bull', ep201718, 44, 4, 10, 14, 'Back', 16, 29),
    skater('Lars Løkken Østli', ep201718, 21, 3, 9, 12, 'Back', 20, 4),
    skater('Phil Marinaccio', ep201718, 11, 3, 8, 11, 'Forward', 12, 15),
    skater('Kjetil Martinsen', ep201718, 41, 6, 4, 10, 'Forward', 16, 5),
    skater('Eirik Skadsdammen', ep201718, 45, 4, 5, 9, 'Forward', 10, 9),
    skater('Mikkel Søgaard', ep201718, 23, 3, 6, 9, 'Forward', 18, 9),
    skater('Simen Løvhaug Hansen', ep201718, 45, 3, 3, 6, 'Back', 0, 16),
    skater('Jacob Berglund', ep201718, 2, 3, 1, 4, 'Forward', 4, 2),
    skater('Mikael Dokken', ep201718, 18, 1, 2, 3, 'Forward', 8, 1),
    skater('Lars Erik Hesbråten', ep201718, 42, 1, 2, 3, 'Back', 2, 10),
    skater('Kenney Morrison', ep201718, 5, 0, 3, 3, 'Back', 2, 4),
    skater('Simen André Edvardsen', ep201718, 35, 0, 3, 3, 'Forward', 6, -2),
    skater('Jørgen Langdalen', ep201718, 32, 1, 0, 1, 'Forward', 0, 5),
    skater('Håkon Engh', ep201718, 18, 0, 1, 1, 'Back', 2, 3),
    skater('Jonathan Hafsmoe', ep201718, 1, 0, 0, 0, 'Forward', 0, -1),
    skater('Mathias Holst Jenssen', ep201718, 3, 0, 0, 0, 'Forward', 2, -1),
    skater('Markus Aas-Eng Mikkelsen', ep201718, 8, 0, 0, 0, 'Back', 0, 2),
    skater('Emil Frøshaug', ep201718, 20, 0, 0, 0, 'Back', 6, 11),
    goalie('Robert Hestmann', ep201718, 11, 1.73, 0.925, 8, 2, 0),
    goalie('Oskar Östlund', ep201718, 34, 1.88, 0.923, 25, 9, 0),
    goalie('Jonas Strand', ep201718, 2, 1.50, 0.917, 2, 0, 0),
  ],

  'season-2023-24': [
    skater('Peter Quenneville', ep202324, 43, 33, 39, 72, 'Forward'),
    skater('Patrick Thoresen', ep202324, 45, 22, 42, 64, 'Forward'),
    skater('Eirik Salsten', ep202324, 40, 20, 26, 46, 'Forward'),
    skater('Jacob Berglund', ep202324, 44, 23, 22, 45, 'Forward'),
    skater('Andreas Martinsen', ep202324, 45, 18, 23, 41, 'Forward'),
    skater('Martin Johnsen', ep202324, 35, 13, 27, 40, 'Forward'),
    skater('Stefan Espeland', ep202324, 44, 4, 32, 36, 'Back'),
    skater('Andreas Dahl', ep202324, 45, 11, 18, 29, 'Forward'),
    skater('Sander Hurrød', ep202324, 44, 4, 19, 23, 'Back'),
    skater('Andreas Hjelm', ep202324, 43, 2, 21, 23, 'Back'),
    skater('Samuel Solem', ep202324, 41, 8, 14, 22, 'Forward'),
    skater('Martin Rønnild', ep202324, 40, 11, 9, 20, 'Forward'),
    skater('Kenneth Pappalardo', ep202324, 44, 10, 7, 17, 'Forward'),
    skater('Sverre Rønningen', ep202324, 42, 3, 13, 16, 'Back'),
    skater('Jakub Kindl', ep202324, 26, 2, 12, 14, 'Back'),
    skater('Marcus Bryhnisveen', ep202324, 45, 6, 5, 11, 'Forward'),
    skater('Adrian Saxrud-Danielsen', ep202324, 43, 4, 7, 11, 'Back'),
    skater('Villiam Strøm', ep202324, 44, 2, 6, 8, 'Back'),
    skater('Maxim Trepanier', ep202324, 8, 4, 3, 7, 'Forward'),
    skater('Jacob Lundell Noer', ep202324, 12, 3, 2, 5, 'Forward'),
    skater('Mathias Papuga', ep202324, 20, 0, 4, 4, 'Back'),
    skater('Magnus Mjørud', ep202324, 22, 1, 2, 3, 'Forward'),
    skater('Axel Sandnes', ep202324, 42, 1, 1, 2, 'Forward'),
    skater('Ole Indergaard', ep202324, 20, 0, 1, 1, 'Forward'),
    skater('Joachim Johannesen Barmoen', ep202324, 1, 0, 0, 0, 'Forward'),
    skater('Linus Morken', ep202324, 1, 0, 0, 0, 'Forward'),
    skater('Even Herzeth Christiansen', ep202324, 3, 0, 0, 0, 'Forward'),
    skater('Karl Markus Lund Sælid', ep202324, 3, 0, 0, 0, 'Forward'),
    goalie('Alex D’Orio', ep202324, 6, 1.00, 0.951, 3, 1, 0),
    goalie('Markus Stensrud', ep202324, 23, 1.62, 0.920, 19, 1, 0),
    goalie('Trym Gran', ep202324, 15, 1.93, 0.918, 12, 1, 0),
    goalie('Alexander Hellnemo', ep202324, 7, 1.42, 0.914, 4, 0, 0),
    goalie('Ole Martin Johansen', ep202324, 1, 4.62, 0.833, 0, 0, 0),
  ],

  'season-2024-25': [
    skater('Cole Schneider', ep202425, 45, 33, 31, 64, 'Forward'),
    skater('Andreas Martinsen', ep202425, 44, 15, 31, 46, 'Forward'),
    skater('Jacob Berglund', ep202425, 28, 24, 18, 42, 'Forward'),
    skater('Stefan Espeland', ep202425, 45, 7, 30, 37, 'Back'),
    skater('Austin Cangelosi', ep202425, 42, 13, 23, 36, 'Forward'),
    skater('Håvard Salsten', ep202425, 32, 14, 21, 35, 'Forward'),
    skater('Martin Rønnild', ep202425, 42, 12, 15, 27, 'Forward'),
    skater('Sander Hurrød', ep202425, 37, 7, 20, 27, 'Back'),
    skater('Andreas Hjelm', ep202425, 45, 5, 22, 27, 'Back'),
    skater('Victor Svensson', ep202425, 30, 6, 20, 26, 'Forward'),
    skater('Samuel Solem', ep202425, 45, 5, 20, 25, 'Forward'),
    skater('Kenneth Pappalardo', ep202425, 41, 8, 15, 23, 'Forward'),
    skater('Andreas Dahl', ep202425, 35, 7, 12, 19, 'Forward'),
    skater('Sverre Rønningen', ep202425, 41, 5, 14, 19, 'Back'),
    skater('Adrian Saxrud-Danielsen', ep202425, 45, 9, 8, 17, 'Back'),
    skater('Mats Bakke Olsen', ep202425, 45, 6, 10, 16, 'Forward'),
    skater('David Aas-Larsen', ep202425, 38, 6, 5, 11, 'Forward'),
    skater('Marcus Bryhnisveen', ep202425, 43, 4, 6, 10, 'Forward'),
    skater('Mathias Papuga', ep202425, 35, 2, 8, 10, 'Back'),
    skater('Joe Gatenby', ep202425, 45, 1, 8, 9, 'Back'),
    skater('Axel Sandnes', ep202425, 40, 2, 4, 6, 'Forward'),
    skater('Linus Morken', ep202425, 22, 0, 3, 3, 'Forward'),
    skater('Sander Rønning', ep202425, 1, 0, 1, 1, 'Forward'),
    skater('Jacob Lundell Noer', ep202425, 0, 0, 0, 0, 'Forward'),
    skater('Sondre Berg', ep202425, 3, 0, 0, 0, 'Forward'),
    skater('Noah Alme Bjerke-Narud', ep202425, 4, 0, 0, 0, 'Forward'),
    skater('Mathias Fahle Karlsen', ep202425, 7, 0, 0, 0, 'Forward'),
    goalie('Trym Gran', ep202425, 18, 1.34, 0.938, 12, 3, 1),
    goalie('Henrik Fayen-Vestavik', ep202425, 0, 0, 0, 0, 0, 0),
  ],

  'season-2025-26': [
    skater('Jacob Berglund', ep202526, 38, 22, 26, 48, 'Forward'),
    skater('Austin Cangelosi', ep202526, 40, 22, 25, 47, 'Forward'),
    skater('Andreas Martinsen', ep202526, 45, 15, 29, 44, 'Forward'),
    skater('Amil Krupic', ep202526, 44, 4, 33, 37, 'Back'),
    skater('Kenneth Pappalardo', ep202526, 39, 12, 19, 31, 'Forward'),
    skater('Colin Campbell', ep202526, 34, 16, 13, 29, 'Forward'),
    skater('Martin Rønnild', ep202526, 45, 13, 13, 26, 'Forward'),
    skater('Andreas Dahl', ep202526, 20, 17, 8, 25, 'Forward'),
    skater('Zach O’Brien', ep202526, 24, 7, 18, 25, 'Forward'),
    skater('Olle Liss', ep202526, 44, 12, 12, 24, 'Forward'),
    skater('David Aas-Larsen', ep202526, 45, 6, 17, 23, 'Forward'),
    skater('Sander Hurrød', ep202526, 44, 3, 20, 23, 'Back'),
    skater('Marcus Bryhnisveen', ep202526, 45, 10, 12, 22, 'Forward'),
    skater('Stefan Espeland', ep202526, 22, 6, 15, 21, 'Back'),
    skater('Christian Bull', ep202526, 45, 7, 13, 20, 'Back'),
    skater('Andreas Hjelm', ep202526, 39, 3, 15, 18, 'Back'),
    skater('Joe Gatenby', ep202526, 44, 2, 15, 17, 'Back'),
    skater('Mats Bakke Olsen', ep202526, 45, 6, 10, 16, 'Forward'),
    skater('Isac Skedung', ep202526, 40, 7, 5, 12, 'Forward'),
    skater('Mathias Papuga', ep202526, 40, 1, 11, 12, 'Back'),
    skater('Oliver Nilsgård', ep202526, 25, 2, 6, 8, 'Forward'),
    skater('Axel Sandnes', ep202526, 40, 1, 7, 8, 'Forward'),
    skater('Sverre Rønningen', ep202526, 15, 1, 3, 4, 'Back'),
    skater('Mathias K. Strand', ep202526, 17, 0, 1, 1, 'Back'),
    skater('Marcus Fjeld', ep202526, 1, 0, 0, 0, 'Forward'),
    skater('Noah Alme Bjerke-Narud', ep202526, 1, 0, 0, 0, 'Forward'),
    skater('Sondre Berg', ep202526, 2, 0, 0, 0, 'Forward'),
    skater('Kristoffer Sandnes', ep202526, 7, 0, 0, 0, 'Forward'),
    goalie('Markus Stensrud', ep202526, 38, 2.05, 0.904, 27, 7, 4),
    goalie('Henrik Fayen-Vestavik', ep202526, 11, 2.40, 0.847, 5, 1, 0),
    goalie('Amund Søndmør Martinsen', ep202526, 0, 0, 0, 0, 0, 0),
  ],
}

export const seasonStatsCoverage = Object.entries(seasonPlayerStatsBySeasonId).map(([seasonId, stats]) => ({
  seasonId,
  rows: stats.length,
  skaters: stats.filter((entry) => entry.role === 'skater').length,
  goalies: stats.filter((entry) => entry.role === 'goalie').length,
  sourceUrls: [...new Set(stats.map((entry) => entry.sourceUrl))],
}))

export function statsForSeason(seasonId: string) {
  return seasonPlayerStatsBySeasonId[seasonId] ?? []
}


function slugifyName(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/æ/gi, 'ae')
    .replace(/ø/gi, 'o')
    .replace(/å/gi, 'a')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function statsByPlayerName() {
  const map = new Map<string, { seasonIds: Set<string>; positions: Set<string>; sources: Set<string> }>()
  for (const [seasonId, entries] of Object.entries(seasonPlayerStatsBySeasonId)) {
    for (const entry of entries) {
      const current = map.get(entry.playerName) ?? {
        seasonIds: new Set<string>(),
        positions: new Set<string>(),
        sources: new Set<string>(),
      }
      current.seasonIds.add(seasonId)
      if (entry.position) current.positions.add(entry.position)
      current.sources.add(entry.sourceUrl)
      map.set(entry.playerName, current)
    }
  }
  return map
}

export function buildSeasonStatSupplementPlayers(existingPlayers: ArchivePerson[]): ArchivePerson[] {
  const existingNames = new Set(existingPlayers.map((player) => player.fullName))
  return [...statsByPlayerName().entries()]
    .filter(([fullName]) => !existingNames.has(fullName))
    .map(([fullName, evidence]) => {
      const seasonIds = [...evidence.seasonIds].sort()
      const position = [...evidence.positions][0]
      return {
        id: `player-stat-${slugifyName(fullName)}`,
        title: fullName,
        fullName,
        slug: `${slugifyName(fullName)}-storhamar`,
        summary: `${fullName} er dokumentert i Elite Prospects-statistikken for ${seasonIds.length === 1 ? 'én Storhamar-sesong' : `${seasonIds.length} Storhamar-sesonger`}.`,
        body: [
          'Profilen er opprettet fra sesongstatistikk slik at korte innhopp og spillere uten egen biografiprofil ikke forsvinner fra sesongarkivet.',
          'Biografi, draktnummer, komplette Storhamar-perioder og bilde fylles først når de er kontrollert mot spillerprofil og klubbarkiv.',
        ],
        completeness: 'partial',
        sources: ['elite-prospects'],
        media: [],
        related: seasonIds.map((id) => ({ kind: 'season' as const, id })),
        position: position === 'Forward' ? 'Løper' : position,
        storhamarPeriods: [],
        seasonIds,
        honourIds: [],
        roles: ['spiller', 'sesongstatistikk'],
        tags: ['elite-prospects', 'sesongstatistikk', ...evidence.sources],
        lastVerifiedAt: verifiedAt,
      }
    })
}

export function applySeasonStatEvidence(players: ArchivePerson[]): ArchivePerson[] {
  const evidence = statsByPlayerName()
  return players.map((player) => {
    const match = evidence.get(player.fullName)
    if (!match) return player

    const seasonIds = [...new Set([...player.seasonIds, ...match.seasonIds])].sort()
    const statPosition = [...match.positions][0]
    const position = player.position || (statPosition === 'Forward' ? 'Løper' : statPosition)

    return {
      ...player,
      position,
      seasonIds,
      related: [
        ...player.related,
        ...[...match.seasonIds]
          .filter((seasonId) => !player.related.some((link) => link.kind === 'season' && link.id === seasonId))
          .map((id) => ({ kind: 'season' as const, id })),
      ],
      tags: [...new Set([...(player.tags ?? []), 'season-stats-reviewed'])],
    }
  })
}

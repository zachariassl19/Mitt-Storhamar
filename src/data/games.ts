import type { Competition, DecisionType, Game } from '../types'

type GameRow = [
  startsAt: string,
  competition: Competition,
  homeTeam: string,
  awayTeam: string,
  arena: string,
  city: string,
  homeScore?: number,
  awayScore?: number,
  decisionType?: DecisionType,
  special?: string,
]

function slug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const rows: GameRow[] = [
  // Treningskamper
  ['2026-08-12T19:00:00+02:00', 'Trening', 'BIK Karlskoga', 'Storhamar', 'Nobelhallen', 'Karlskoga', 1, 5],
  ['2026-08-18T18:00:00+02:00', 'Trening', 'Storhamar', 'Mora IK', 'CC Amfi', 'Hamar', 2, 0],
  ['2026-08-19T18:00:00+02:00', 'Trening', 'Storhamar', 'Mora IK', 'CC Amfi', 'Hamar', 8, 2],
  ['2026-08-26T18:00:00+02:00', 'Trening', 'Sparta Sarpsborg', 'Storhamar', 'Sparta Amfi', 'Sarpsborg', 3, 6],

  // Champions Hockey League
  ['2026-09-04T19:45:00+02:00', 'CHL', 'HC Davos', 'Storhamar', 'zondacrypto Arena', 'Davos', 3, 2, 'OT'],
  ['2026-09-06T14:00:00+02:00', 'CHL', 'Genève-Servette', 'Storhamar', 'Patinoire des Vernets', 'Genève', 3, 2],
  ['2026-09-10T19:00:00+02:00', 'CHL', 'Storhamar', 'Klagenfurt', 'CC Amfi', 'Hamar', 2, 1],
  ['2026-09-12T18:00:00+02:00', 'CHL', 'Storhamar', 'Frölunda', 'CC Amfi', 'Hamar', 3, 5],
  ['2026-10-07T17:30:00+02:00', 'CHL', 'Tappara', 'Storhamar', 'Nokia Areena', 'Tampere'],
  ['2026-10-14T19:00:00+02:00', 'CHL', 'Storhamar', 'Graz 99ers', 'CC Amfi', 'Hamar'],

  // EHL 2026/27 – oppdatert etter at Sparta gikk ut av ligaen
  ['2026-09-17T19:00:00+02:00', 'EHL', 'Storhamar', 'Frisk Asker', 'CC Amfi', 'Hamar', 2, 1, 'OT'],
  ['2026-09-24T18:30:00+02:00', 'EHL', 'Storhamar', 'Ringerike', 'CC Amfi', 'Hamar'],
  ['2026-09-26T16:00:00+02:00', 'EHL', 'Stavanger Oilers', 'Storhamar', 'DNB Arena', 'Stavanger'],
  ['2026-10-01T18:30:00+02:00', 'EHL', 'Nidaros', 'Storhamar', 'Leangen Arena', 'Trondheim'],
  ['2026-10-03T16:00:00+02:00', 'EHL', 'Storhamar', 'Vålerenga', 'CC Amfi', 'Hamar'],
  ['2026-10-10T16:00:00+02:00', 'EHL', 'Storhamar', 'Stavanger Oilers', 'CC Amfi', 'Hamar'],
  ['2026-10-15T18:30:00+02:00', 'EHL', 'Narvik', 'Storhamar', 'Nordkraft Arena', 'Narvik'],
  ['2026-10-17T16:00:00+02:00', 'EHL', 'Storhamar', 'Stjernen', 'CC Amfi', 'Hamar'],
  ['2026-10-20T18:30:00+02:00', 'EHL', 'Ringerike', 'Storhamar', 'Schjongshallen', 'Hønefoss'],
  ['2026-10-24T16:00:00+02:00', 'EHL', 'Lillehammer', 'Storhamar', 'Håkons Hall', 'Lillehammer', undefined, undefined, undefined, 'Håkons Hall'],
  ['2026-10-29T19:00:00+01:00', 'EHL', 'Storhamar', 'Nidaros', 'CC Amfi', 'Hamar'],
  ['2026-10-31T16:00:00+01:00', 'EHL', 'Stjernen', 'Storhamar', 'Stjernehallen', 'Fredrikstad'],
  ['2026-11-12T18:30:00+01:00', 'EHL', 'Storhamar', 'Narvik', 'CC Amfi', 'Hamar'],
  ['2026-11-14T16:00:00+01:00', 'EHL', 'Vålerenga', 'Storhamar', 'Jordal Amfi', 'Oslo'],
  ['2026-11-20T19:00:00+01:00', 'EHL', 'Frisk Asker', 'Storhamar', 'Varner Arena', 'Asker'],
  ['2026-11-22T17:00:00+01:00', 'EHL', 'Storhamar', 'Lillehammer', 'CC Amfi', 'Hamar'],
  ['2026-11-24T18:30:00+01:00', 'EHL', 'Stavanger Oilers', 'Storhamar', 'DNB Arena', 'Stavanger'],
  ['2026-11-28T16:00:00+01:00', 'EHL', 'Storhamar', 'Nidaros', 'CC Amfi', 'Hamar'],
  ['2026-12-03T18:30:00+01:00', 'EHL', 'Lillehammer', 'Storhamar', 'Eidsiva Arena', 'Lillehammer'],
  ['2026-12-05T16:00:00+01:00', 'EHL', 'Storhamar', 'Stjernen', 'CC Amfi', 'Hamar'],
  ['2026-12-19T16:00:00+01:00', 'EHL', 'Storhamar', 'Narvik', 'CC Amfi', 'Hamar'],
  ['2026-12-28T18:30:00+01:00', 'EHL', 'Frisk Asker', 'Storhamar', 'Varner Arena', 'Asker'],
  ['2026-12-30T18:30:00+01:00', 'EHL', 'Storhamar', 'Vålerenga', 'CC Amfi', 'Hamar'],
  ['2027-01-07T18:30:00+01:00', 'EHL', 'Nidaros', 'Storhamar', 'Leangen Arena', 'Trondheim'],
  ['2027-01-09T16:00:00+01:00', 'EHL', 'Ringerike', 'Storhamar', 'Schjongshallen', 'Hønefoss'],
  ['2027-01-14T18:30:00+01:00', 'EHL', 'Storhamar', 'Narvik', 'CC Amfi', 'Hamar'],
  ['2027-01-16T16:00:00+01:00', 'EHL', 'Vålerenga', 'Storhamar', 'Jordal Amfi', 'Oslo'],
  ['2027-01-21T18:30:00+01:00', 'EHL', 'Storhamar', 'Lillehammer', 'CC Amfi', 'Hamar'],
  ['2027-01-23T16:00:00+01:00', 'EHL', 'Stavanger Oilers', 'Storhamar', 'DNB Arena', 'Stavanger'],
  ['2027-01-28T18:30:00+01:00', 'EHL', 'Stjernen', 'Storhamar', 'Stjernehallen', 'Fredrikstad'],
  ['2027-01-30T16:00:00+01:00', 'EHL', 'Storhamar', 'Frisk Asker', 'CC Amfi', 'Hamar'],
  ['2027-02-04T18:30:00+01:00', 'EHL', 'Ringerike', 'Storhamar', 'Schjongshallen', 'Hønefoss'],
  ['2027-02-06T16:00:00+01:00', 'EHL', 'Storhamar', 'Stavanger Oilers', 'CC Amfi', 'Hamar'],
  ['2027-02-18T18:30:00+01:00', 'EHL', 'Storhamar', 'Lillehammer', 'CC Amfi', 'Hamar'],
  ['2027-02-20T16:00:00+01:00', 'EHL', 'Stjernen', 'Storhamar', 'Stjernehallen', 'Fredrikstad'],
  ['2027-02-25T18:30:00+01:00', 'EHL', 'Storhamar', 'Nidaros', 'CC Amfi', 'Hamar'],
  ['2027-02-27T18:00:00+01:00', 'EHL', 'Frisk Asker', 'Storhamar', 'Varner Arena', 'Asker'],
  ['2027-03-05T18:30:00+01:00', 'EHL', 'Storhamar', 'Ringerike', 'CC Amfi', 'Hamar'],
  ['2027-03-07T17:00:00+01:00', 'EHL', 'Narvik', 'Storhamar', 'Nordkraft Arena', 'Narvik'],
  ['2027-03-11T18:30:00+01:00', 'EHL', 'Vålerenga', 'Storhamar', 'Jordal Amfi', 'Oslo'],
]

export const games: Game[] = rows
  .map(([startsAt, competition, homeTeam, awayTeam, arena, city, homeScore, awayScore, decisionType, special]) => ({
    id: `game:${startsAt.slice(0, 10)}-${slug(homeTeam)}-${slug(awayTeam)}`,
    season: '2026/27',
    startsAt,
    competition,
    homeTeam,
    awayTeam,
    arena,
    city,
    homeScore,
    awayScore,
    decisionType,
    special,
  }))
  .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())

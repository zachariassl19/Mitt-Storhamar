import type { ArchivePerson } from './types'

const verifiedAt = '2026-09-28'
const sourceUrl = 'https://silarkivet.no/samletabeller/adelskalender-total/'

interface CareerRow {
  id: string
  fullName: string
  slug: string
  position: string
  seasons: number
  games: number
  goals: number
  assists: number
  points: number
}

const rows: CareerRow[] = [
  { id: 'player-career-pal-johnsen', fullName: 'Pål Johnsen', slug: 'pal-johnsen-karriere', position: 'Løper', seasons: 21, games: 963, goals: 286, assists: 585, points: 871 },
  { id: 'player-career-eirik-skadsdammen', fullName: 'Eirik Skadsdammen', slug: 'eirik-skadsdammen-karriere', position: 'Løper', seasons: 18, games: 907, goals: 262, assists: 291, points: 553 },
  { id: 'player-career-tom-erik-olsen', fullName: 'Tom Erik Olsen', slug: 'tom-erik-olsen-karriere', position: 'Løper', seasons: 16, games: 680, goals: 379, assists: 365, points: 744 },
  { id: 'player-career-erik-kristiansen', fullName: 'Erik Kristiansen', slug: 'erik-kristiansen-karriere', position: 'Løper', seasons: 20, games: 649, goals: 509, assists: 406, points: 915 },
  { id: 'player-career-lars-lokken-ostli', fullName: 'Lars Løkken Østli', slug: 'lars-lokken-ostli-karriere', position: 'Back', seasons: 15, games: 641, goals: 110, assists: 181, points: 291 },
  { id: 'player-career-lars-erik-hesbraten', fullName: 'Lars Erik Hesbråten', slug: 'lars-erik-hesbraten-karriere', position: 'Løper / back', seasons: 12, games: 628, goals: 110, assists: 124, points: 234 },
  { id: 'player-career-jonas-norgren', fullName: 'Jonas Norgren', slug: 'jonas-norgren-karriere', position: 'Keeper', seasons: 12, games: 627, goals: 0, assists: 6, points: 6 },
  { id: 'player-career-joakim-jensen', fullName: 'Joakim Jensen', slug: 'joakim-jensen-karriere', position: 'Løper', seasons: 12, games: 622, goals: 286, assists: 277, points: 563 },
  { id: 'player-career-martin-ronnild', fullName: 'Martin Rønnild', slug: 'martin-ronnild-karriere', position: 'Løper', seasons: 11, games: 542, goals: 133, assists: 116, points: 249 },
  { id: 'player-career-christian-larrivee', fullName: 'Christian Larrivée', slug: 'christian-larrivee-karriere', position: 'Løper', seasons: 12, games: 530, goals: 201, assists: 350, points: 551 },
  { id: 'player-career-ole-eskild-dahlstrom', fullName: 'Ole Eskild Dahlstrøm', slug: 'ole-eskild-dahlstrom-karriere', position: 'Løper', seasons: 12, games: 527, goals: 249, assists: 351, points: 600 },
  { id: 'player-career-geir-svendsberget', fullName: 'Geir Svendsberget', slug: 'geir-svendsberget-karriere', position: 'Løper', seasons: 10, games: 513, goals: 157, assists: 93, points: 250 },
  { id: 'player-career-jon-hroar-nordstrom', fullName: 'Jon-Hroar Nordstrøm', slug: 'jon-hroar-nordstrom-karriere', position: 'Back', seasons: 14, games: 505, goals: 73, assists: 104, points: 177 },
  { id: 'player-career-andreas-oksnes', fullName: 'Andreas Øksnes', slug: 'andreas-oksnes-karriere', position: 'Back', seasons: 11, games: 469, goals: 21, assists: 87, points: 108 },
  { id: 'player-career-mattias-livf', fullName: 'Mattias Livf', slug: 'mattias-livf-karriere', position: 'Back', seasons: 9, games: 456, goals: 66, assists: 163, points: 229 },
  { id: 'player-career-cato-orbak', fullName: 'Cato Ørbæk', slug: 'cato-orbak-karriere', position: 'Back', seasons: 11, games: 454, goals: 15, assists: 63, points: 78 },
  { id: 'player-career-magnus-osteraas', fullName: 'Magnus Østeraas', slug: 'magnus-osteraas-karriere', position: 'Back', seasons: 11, games: 450, goals: 21, assists: 50, points: 71 },
  { id: 'player-career-borre-ostvang', fullName: 'Børre Østvang', slug: 'borre-ostvang-karriere', position: 'Løper', seasons: 14, games: 448, goals: 58, assists: 75, points: 133 },
  { id: 'player-career-alexander-smirnov', fullName: 'Alexander Smirnov', slug: 'alexander-smirnov-karriere', position: 'Back', seasons: 9, games: 439, goals: 88, assists: 228, points: 316 },
  { id: 'player-career-martin-b-huse', fullName: 'Martin B. Huse', slug: 'martin-b-huse-karriere', position: 'Løper', seasons: 10, games: 437, goals: 56, assists: 85, points: 141 },
  { id: 'player-career-tommy-larsen', fullName: 'Tommy Larsen', slug: 'tommy-larsen-karriere', position: 'Back', seasons: 11, games: 428, goals: 20, assists: 56, points: 76 },
  { id: 'player-career-jimmy-andersson', fullName: 'Jimmy Andersson', slug: 'jimmy-andersson-karriere', position: 'Back', seasons: 11, games: 419, goals: 38, assists: 127, points: 165 },
  { id: 'player-career-eirik-salsten', fullName: 'Eirik Salsten', slug: 'eirik-salsten-karriere', position: 'Løper', seasons: 10, games: 407, goals: 89, assists: 148, points: 237 },
  { id: 'player-career-patrick-thoresen', fullName: 'Patrick Thoresen', slug: 'patrick-thoresen-karriere', position: 'Løper', seasons: 9, games: 401, goals: 164, assists: 320, points: 484 },
  { id: 'player-career-andreas-hjelm', fullName: 'Andreas Hjelm', slug: 'andreas-hjelm-karriere', position: 'Back', seasons: 7, games: 396, goals: 40, assists: 160, points: 200 },
  { id: 'player-career-mats-mostue', fullName: 'Mats L. Mostue', slug: 'mats-l-mostue-karriere', position: 'Back', seasons: 10, games: 390, goals: 21, assists: 66, points: 87 },
]

export const careerLeaderboardProfiles: ArchivePerson[] = rows.map((row) => ({
  id: row.id,
  title: row.fullName,
  fullName: row.fullName,
  slug: row.slug,
  summary: `${row.games} offisielle Storhamar-kamper og ${row.points} poeng over ${row.seasons} registrerte sesonger i SIL-arkivets adelskalender etter 2025/26.`,
  body: [
    `SIL-arkivets samlede adelskalender ajour etter 2025/26 fører ${row.fullName} med ${row.games} kamper, ${row.goals} mål, ${row.assists} målgivende og ${row.points} poeng.`,
    'Denne profilen er lagt inn som et kontrollpunkt fra karrierestatistikken. Biografi, sesongkoblinger, draktnumre, meritter og bilder fylles fra spillerens egen SIL-profil og sesongarkivet i den videre spillerkontrollen.',
  ],
  completeness: 'partial',
  sources: ['silarkivet'],
  media: [],
  related: [],
  position: row.position,
  storhamarPeriods: [{ note: `${row.seasons} registrerte Storhamar-sesonger i samlet adelskalender.` }],
  seasonIds: [],
  honourIds: [],
  roles: ['spiller', 'adelskalender'],
  tags: ['adelskalender', 'karrierekontroll', sourceUrl],
  lastVerifiedAt: verifiedAt,
}))

export const careerLeaderboardSource = sourceUrl

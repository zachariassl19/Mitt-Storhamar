import type { PuckHunterHistory, PuckHunterHistoryGame } from '../types'

const PUCKHUNTER_HISTORY_KEY = 'mitt-storhamar:puckhunter-history:v1'

type RawPuckHunterGame = {
  importId?: unknown
  date?: unknown
  hockeySeason?: unknown
  homeTeam?: unknown
  awayTeam?: unknown
  homeScore?: unknown
  awayScore?: unknown
  arena?: unknown
  attendanceActual?: unknown
}

type RawPuckHunterExport = {
  schemaVersion?: unknown
  games?: unknown
}

function optionalNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function isStorhamar(name: string) {
  return name.toLocaleLowerCase('nb-NO').includes('storhamar')
}

export function parsePuckHunterHistory(value: unknown): PuckHunterHistory {
  if (!value || typeof value !== 'object') throw new Error('Ugyldig PuckHunter-fil.')
  const raw = value as RawPuckHunterExport
  if (!Array.isArray(raw.games)) throw new Error('PuckHunter-fila mangler kamper.')

  const games: PuckHunterHistoryGame[] = []
  for (const candidate of raw.games as RawPuckHunterGame[]) {
    if (!candidate || typeof candidate !== 'object') continue
    if (typeof candidate.importId !== 'string' || typeof candidate.date !== 'string') continue
    if (typeof candidate.homeTeam !== 'string' || typeof candidate.awayTeam !== 'string') continue
    if (String(candidate.attendanceActual).toUpperCase() !== 'ATTENDED') continue
    if (!isStorhamar(candidate.homeTeam) && !isStorhamar(candidate.awayTeam)) continue

    games.push({
      importId: candidate.importId,
      date: candidate.date,
      hockeySeason: typeof candidate.hockeySeason === 'string' ? candidate.hockeySeason : null,
      homeTeam: candidate.homeTeam,
      awayTeam: candidate.awayTeam,
      homeScore: optionalNumber(candidate.homeScore),
      awayScore: optionalNumber(candidate.awayScore),
      arena: typeof candidate.arena === 'string' ? candidate.arena : null,
      attendanceActual: 'ATTENDED',
    })
  }

  if (games.length === 0) throw new Error('Fant ingen bekreftede Storhamar-kamper i PuckHunter-fila.')

  const unique = Array.from(new Map(games.map((game) => [game.importId, game])).values())
  return {
    schemaVersion: 1,
    importedAt: new Date().toISOString(),
    games: unique,
  }
}

export function loadPuckHunterHistory(): PuckHunterHistory | null {
  try {
    const raw = localStorage.getItem(PUCKHUNTER_HISTORY_KEY)
    return raw ? JSON.parse(raw) as PuckHunterHistory : null
  } catch {
    return null
  }
}

export function savePuckHunterHistory(history: PuckHunterHistory) {
  localStorage.setItem(PUCKHUNTER_HISTORY_KEY, JSON.stringify(history))
  return history
}

export function clearPuckHunterHistory() {
  localStorage.removeItem(PUCKHUNTER_HISTORY_KEY)
}

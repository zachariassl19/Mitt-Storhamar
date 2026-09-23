import type { Game } from '../types'

export interface CalendarEvent {
  uid: string | null
  title: string
  startsAt: string | null
  location: string | null
}

export interface CalendarSuggestion {
  id: string
  gameId: string
  title: string
  currentStartsAt: string
  proposedStartsAt: string | null
  currentArena: string
  proposedArena: string | null
  changes: ('time' | 'arena')[]
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function utcStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

export function createUpcomingCalendarIcs(games: Game[], now = new Date(), appUrl = '') {
  const upcoming = games.filter((game) => new Date(game.startsAt).getTime() >= now.getTime())
  const created = utcStamp(now)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mitt Storhamar//Kamper//NO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Storhamar Hockey',
  ]

  for (const game of upcoming) {
    const start = new Date(game.startsAt)
    const end = new Date(start.getTime() + 150 * 60_000)
    const location = [game.arena, game.city].filter(Boolean).join(', ')
    lines.push(
      'BEGIN:VEVENT',
      `UID:mitt-storhamar-${game.id}@mitt-storhamar`,
      `DTSTAMP:${created}`,
      `DTSTART:${utcStamp(start)}`,
      `DTEND:${utcStamp(end)}`,
      `SUMMARY:${escapeIcs(`${game.homeTeam} – ${game.awayTeam} · ${game.competition}`)}`,
      `LOCATION:${escapeIcs(location)}`,
      `DESCRIPTION:${escapeIcs(`Storhamar ${game.competition}${appUrl ? `\n${appUrl}` : ''}`)}`,
      'END:VEVENT',
    )
  }

  lines.push('END:VCALENDAR')
  return lines.join('\r\n') + '\r\n'
}

function unfoldIcs(text: string) {
  return text.replace(/\r?\n[ \t]/g, '')
}

function unescapeIcs(value: string) {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
}

function timezoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const asUtc = Date.UTC(
    Number(map.year), Number(map.month) - 1, Number(map.day),
    Number(map.hour), Number(map.minute), Number(map.second),
  )
  return asUtc - date.getTime()
}

function localIcsToIso(value: string, timeZone = 'Europe/Oslo') {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/)
  if (!match) return null
  const [, y, mo, d, h, mi, s] = match
  const guess = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s)))
  const offset = timezoneOffsetMs(guess, timeZone)
  return new Date(guess.getTime() - offset).toISOString()
}

function parseDateProperty(key: string, value: string) {
  if (/^\d{8}T\d{6}Z$/.test(value)) {
    const iso = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(9, 11)}:${value.slice(11, 13)}:${value.slice(13, 15)}Z`
    return new Date(iso).toISOString()
  }
  const tzid = key.match(/TZID=([^;:]+)/i)?.[1]
  if (/^\d{8}T\d{6}$/.test(value)) return localIcsToIso(value, tzid || 'Europe/Oslo')
  return null
}

export function parseCalendarIcs(text: string): CalendarEvent[] {
  const blocks = unfoldIcs(text).split('BEGIN:VEVENT').slice(1)
  const events: CalendarEvent[] = []

  for (const block of blocks) {
    const body = block.split('END:VEVENT')[0] ?? ''
    let uid: string | null = null
    let title = ''
    let startsAt: string | null = null
    let location: string | null = null

    for (const line of body.split(/\r?\n/)) {
      const colon = line.indexOf(':')
      if (colon < 0) continue
      const key = line.slice(0, colon)
      const value = line.slice(colon + 1)
      const base = key.split(';')[0].toUpperCase()
      if (base === 'UID') uid = unescapeIcs(value).trim() || null
      if (base === 'SUMMARY') title = unescapeIcs(value).trim()
      if (base === 'LOCATION') location = unescapeIcs(value).trim() || null
      if (base === 'DTSTART') startsAt = parseDateProperty(key, value)
    }

    if (title || startsAt || uid) events.push({ uid, title, startsAt, location })
  }

  return events
}

function normalized(value: string) {
  return value
    .toLocaleLowerCase('nb-NO')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9æøå]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function gameFromEvent(event: CalendarEvent, games: Game[]) {
  const uidMatch = event.uid?.match(/^mitt-storhamar-(.+)@mitt-storhamar$/)
  if (uidMatch) {
    const byId = games.find((game) => game.id === uidMatch[1])
    if (byId) return byId
  }

  const title = normalized(event.title)
  return games.find((game) => {
    const home = normalized(game.homeTeam)
    const away = normalized(game.awayTeam)
    return title.includes(home) && title.includes(away)
  }) ?? null
}

function arenaFromLocation(location: string | null) {
  if (!location) return null
  const first = location.split(',')[0]?.trim()
  return first || null
}

export function compareCalendarToGames(events: CalendarEvent[], games: Game[], now = new Date()): CalendarSuggestion[] {
  const future = games.filter((game) => new Date(game.startsAt).getTime() >= now.getTime())
  const suggestions: CalendarSuggestion[] = []

  for (const event of events) {
    const game = gameFromEvent(event, future)
    if (!game) continue

    const changes: ('time' | 'arena')[] = []
    if (event.startsAt && Math.abs(new Date(event.startsAt).getTime() - new Date(game.startsAt).getTime()) > 60_000) changes.push('time')

    const proposedArena = arenaFromLocation(event.location)
    if (proposedArena && normalized(proposedArena) !== normalized(game.arena)) changes.push('arena')
    if (changes.length === 0) continue

    suggestions.push({
      id: `${game.id}:${event.uid ?? event.startsAt ?? event.title}`,
      gameId: game.id,
      title: `${game.homeTeam} – ${game.awayTeam}`,
      currentStartsAt: game.startsAt,
      proposedStartsAt: event.startsAt,
      currentArena: game.arena,
      proposedArena,
      changes,
    })
  }

  return suggestions
}

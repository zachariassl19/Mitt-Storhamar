import type { Game, GameDayRecord, Trip } from '../types'
import type { NotificationSettings } from './notificationSettings'

export interface AppNotificationCandidate {
  id: string
  gameId: string
  title: string
  body: string
  availableFrom: number
  expiresAt: number
}

function osloParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Oslo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  return Object.fromEntries(parts.map((part) => [part.type, part.value])) as Record<string, string>
}

export function osloDateKey(date: Date) {
  const parts = osloParts(date)
  return `${parts.year}-${parts.month}-${parts.day}`
}

function tomorrowDateKey(now: Date) {
  const parts = osloParts(now)
  const utc = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + 1))
  return utc.toISOString().slice(0, 10)
}

function osloHour(now: Date) {
  return Number(osloParts(now).hour)
}

function gameLabel(game: Game) {
  return `${game.homeTeam} – ${game.awayTeam}`
}

function gameTime(game: Game) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(game.startsAt))
}

function clockTime(date: Date) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function departureTimeForTrip(game: Game, trip: Trip | undefined) {
  if (!trip) return null
  const outbound = trip.legs.filter((leg) => leg.direction === 'outbound')
  if (outbound.length === 0 || outbound.some((leg) => leg.durationMinutes == null)) return null
  const travelMinutes = outbound.reduce((sum, leg) => sum + (leg.durationMinutes ?? 0), 0)
  return new Date(new Date(game.startsAt).getTime() - (trip.desiredArrivalMinutesBefore + travelMinutes) * 60_000)
}

export function notificationCandidates({
  now,
  games,
  trips,
  records,
  settings,
  smartGameDayEnabled,
}: {
  now: Date
  games: Game[]
  trips: Trip[]
  records: Record<string, GameDayRecord>
  settings: NotificationSettings
  smartGameDayEnabled: boolean
}) {
  if (!settings.enabled) return []

  const nowMs = now.getTime()
  const today = osloDateKey(now)
  const tomorrow = tomorrowDateKey(now)
  const hour = osloHour(now)
  const result: AppNotificationCandidate[] = []

  for (const game of games) {
    const startsAt = new Date(game.startsAt).getTime()
    const gameDay = osloDateKey(new Date(game.startsAt))
    const label = gameLabel(game)

    if (settings.gameTomorrow && gameDay === tomorrow && hour >= 18) {
      result.push({
        id: `game-tomorrow:${game.id}`,
        gameId: game.id,
        title: 'Storhamar spiller i morgen',
        body: `${label} · ${gameTime(game)} · ${game.arena}`,
        availableFrom: nowMs,
        expiresAt: startsAt,
      })
    }

    if (gameDay === today && nowMs < startsAt && hour >= 8) {
      if (settings.gameDay) {
        result.push({
          id: `game-day:${game.id}`,
          gameId: game.id,
          title: 'Kampdag 💛💙',
          body: `${label} · ${gameTime(game)} · ${game.arena}`,
          availableFrom: nowMs,
          expiresAt: startsAt,
        })
      }
      if (settings.smartGameDay && smartGameDayEnabled) {
        result.push({
          id: `smart-gameday:${game.id}`,
          gameId: game.id,
          title: 'Smart Kampdag er klar',
          body: `GPS bruker ${game.arena} automatisk når appen er aktiv.`,
          availableFrom: nowMs,
          expiresAt: startsAt,
        })
      }
    }

    if (settings.departure) {
      const trip = trips.find((item) => item.gameId === game.id)
      const departure = departureTimeForTrip(game, trip)
      if (departure) {
        const departureMs = departure.getTime()
        if (nowMs >= departureMs && nowMs < startsAt) {
          result.push({
            id: `departure:${game.id}`,
            gameId: game.id,
            title: 'På tide å dra',
            body: `DRA ${clockTime(departure)} · ${label} på ${game.arena}.`,
            availableFrom: departureMs,
            expiresAt: startsAt,
          })
        }
      }
    }

    if (settings.finishGameDay && !records[game.id]?.completed) {
      const reminderAt = startsAt + 3.5 * 60 * 60 * 1000
      const expiresAt = startsAt + 14 * 60 * 60 * 1000
      if (nowMs >= reminderAt && nowMs <= expiresAt) {
        result.push({
          id: `finish-game:${game.id}`,
          gameId: game.id,
          title: 'Fullfør kampdagen',
          body: `Registrer oppmøte, reise, reisefølge og kjøp for ${label}.`,
          availableFrom: reminderAt,
          expiresAt,
        })
      }
    }
  }

  return result.filter((item) => nowMs >= item.availableFrom && nowMs <= item.expiresAt)
}

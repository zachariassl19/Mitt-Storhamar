import { useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import { games } from '../data/games'
import { departureTimeForTrip, preDepartureReminderTime } from '../lib/notificationLogic'
import { loadNotificationSettings, subscribeNotificationSettings } from '../lib/notificationSettings'
import { loadAttendancePlans, subscribeAttendancePlans } from '../lib/storage'
import { loadTrips, subscribeTrips } from '../lib/trips'

function notificationId(gameId: string, kind: 'checklist' | 'departure') {
  let hash = 2166136261
  for (let i = 0; i < gameId.length; i += 1) {
    hash ^= gameId.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  const base = Math.abs(hash >>> 0) % 900_000_000
  return base * 2 + (kind === 'departure' ? 1 : 0)
}

function openChecklist(gameId: string) {
  const query = `?game=${encodeURIComponent(gameId)}&focus=departure-checklist`
  window.location.href = query
}

export function NativeDepartureNotificationManager() {
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return
    const bump = () => setRevision((value) => value + 1)
    const unsubTrips = subscribeTrips(bump)
    const unsubPlans = subscribeAttendancePlans(bump)
    const unsubNotifications = subscribeNotificationSettings(bump)
    return () => {
      unsubTrips()
      unsubPlans()
      unsubNotifications()
    }
  }, [])

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return
    let disposed = false

    async function sync() {
      const settings = loadNotificationSettings()
      const trips = loadTrips()
      const plans = loadAttendancePlans()
      const ids = games.flatMap((game) => [
        { id: notificationId(game.id, 'checklist') },
        { id: notificationId(game.id, 'departure') },
      ])

      try {
        await LocalNotifications.cancel({ notifications: ids })
      } catch {
        // Ingen gamle varsler å rydde er helt greit.
      }

      if (!settings.enabled || !settings.departure || disposed) return

      const permission = await LocalNotifications.checkPermissions()
      if (permission.display !== 'granted') {
        const requested = await LocalNotifications.requestPermissions()
        if (requested.display !== 'granted' || disposed) return
      }

      const now = Date.now()
      const scheduled = []

      for (const game of games) {
        const plan = plans[game.id] ?? 'unset'
        if (plan === 'no') continue
        const trip = trips.find((item) => item.gameId === game.id)
        const departure = departureTimeForTrip(game, trip)
        const reminder = preDepartureReminderTime(game, trip, 10)
        if (!departure || !reminder) continue

        if (reminder.getTime() > now) {
          scheduled.push({
            id: notificationId(game.id, 'checklist'),
            title: 'Har du husket alt? 💛💙',
            body: `10 min til du bør dra til ${game.arena}. Åpne sjekklisten før avreise.`,
            schedule: { at: reminder, allowWhileIdle: true },
            extra: { gameId: game.id, focus: 'departure-checklist', kind: 'pre-departure' },
            isExactNotification: true,
          })
        }

        if (departure.getTime() > now) {
          scheduled.push({
            id: notificationId(game.id, 'departure'),
            title: 'På tide å dra 💛💙',
            body: `${game.homeTeam} – ${game.awayTeam} · ${game.arena}`,
            schedule: { at: departure, allowWhileIdle: true },
            extra: { gameId: game.id, focus: 'departure-checklist', kind: 'departure' },
            isExactNotification: true,
          })
        }
      }

      if (scheduled.length > 0 && !disposed) {
        await LocalNotifications.schedule({ notifications: scheduled })
      }
    }

    void sync().catch(() => undefined)
    return () => { disposed = true }
  }, [revision])

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return
    let removed = false
    let handle: { remove: () => Promise<void> } | undefined

    void LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
      const gameId = action.notification.extra?.gameId
      const focus = action.notification.extra?.focus
      if (typeof gameId === 'string' && focus === 'departure-checklist') openChecklist(gameId)
    }).then((listener) => {
      if (removed) void listener.remove()
      else handle = listener
    })

    return () => {
      removed = true
      if (handle) void handle.remove()
    }
  }, [])

  return null
}

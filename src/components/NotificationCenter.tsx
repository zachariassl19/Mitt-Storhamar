import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bell, BellRing } from 'lucide-react'
import { games } from '../data/games'
import { notificationCandidates } from '../lib/notificationLogic'
import {
  defaultNotificationSettings,
  loadNotificationSettings,
  saveNotificationSettings,
  subscribeNotificationSettings,
  type NotificationSettings,
} from '../lib/notificationSettings'
import { loadSmartGameDaySettings } from '../lib/smartGameDaySettings'
import { loadGameDayRecords } from '../lib/storage'
import { loadTrips } from '../lib/trips'

const SENT_KEY = 'mitt-storhamar:notifications-sent:v1'

type PermissionState = NotificationPermission | 'unsupported'

function readSent(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(SENT_KEY) || '{}') as Record<string, number>
  } catch {
    return {}
  }
}

function markSent(id: string) {
  const cutoff = Date.now() - 45 * 24 * 60 * 60 * 1000
  const current = readSent()
  const next = Object.fromEntries(Object.entries(current).filter(([, timestamp]) => timestamp >= cutoff))
  next[id] = Date.now()
  localStorage.setItem(SENT_KEY, JSON.stringify(next))
}

async function showSystemNotification(title: string, body: string, tag: string) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return false
  const icon = `${import.meta.env.BASE_URL}icon.svg`

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, {
        body,
        tag,
        icon,
        badge: icon,
        data: { url: import.meta.env.BASE_URL },
      })
      return true
    } catch {
      // Fallback til vanlig Notification under.
    }
  }

  try {
    new Notification(title, { body, tag, icon })
    return true
  } catch {
    return false
  }
}

export function NotificationManager() {
  const [settings, setSettings] = useState<NotificationSettings>(() => loadNotificationSettings())

  useEffect(() => subscribeNotificationSettings(setSettings), [])

  useEffect(() => {
    let disposed = false

    async function check() {
      if (disposed || document.hidden || !settings.enabled) return
      if (!('Notification' in window) || Notification.permission !== 'granted') return

      const sent = readSent()
      const due = notificationCandidates({
        now: new Date(),
        games,
        trips: loadTrips(),
        records: loadGameDayRecords(),
        settings,
        smartGameDayEnabled: loadSmartGameDaySettings().enabled,
      })

      for (const notification of due) {
        if (disposed || sent[notification.id]) continue
        const shown = await showSystemNotification(notification.title, notification.body, notification.id)
        if (shown) {
          markSent(notification.id)
          sent[notification.id] = Date.now()
        }
      }
    }

    const onVisible = () => { if (!document.hidden) void check() }
    const onFocus = () => void check()
    const timer = window.setInterval(() => void check(), 30_000)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onFocus)
    void check()

    return () => {
      disposed = true
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onFocus)
    }
  }, [settings])

  return null
}

function useSettingsPortalTarget() {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let owned: HTMLDivElement | null = null

    function refresh() {
      const settingsList = document.querySelector<HTMLElement>('.settings-list')
      if (!settingsList) {
        setTarget(null)
        return
      }
      const parent = settingsList.parentElement
      if (!parent) return

      let container = parent.querySelector<HTMLDivElement>('#notification-settings-portal')
      if (!container) {
        container = document.createElement('div')
        container.id = 'notification-settings-portal'
        const smartPortal = parent.querySelector('#smart-gameday-settings-portal')
        if (smartPortal?.nextSibling) parent.insertBefore(container, smartPortal.nextSibling)
        else parent.insertBefore(container, settingsList)
        owned = container
      }
      setTarget(container)
    }

    const observer = new MutationObserver(refresh)
    observer.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true })
    refresh()

    return () => {
      observer.disconnect()
      if (owned?.isConnected) owned.remove()
    }
  }, [])

  return target
}

function permissionState(): PermissionState {
  if (!('Notification' in window)) return 'unsupported'
  return Notification.permission
}

function permissionLabel(permission: PermissionState) {
  if (permission === 'granted') return 'Tillatt'
  if (permission === 'denied') return 'Blokkert'
  if (permission === 'unsupported') return 'Ikke tilgjengelig'
  return 'Ikke spurt ennå'
}

export function NotificationSettingsPortal() {
  const target = useSettingsPortalTarget()
  const [settings, setSettings] = useState<NotificationSettings>(() => loadNotificationSettings())
  const [permission, setPermission] = useState<PermissionState>(() => permissionState())
  const [message, setMessage] = useState('')

  useEffect(() => subscribeNotificationSettings(setSettings), [])

  function persist(next: NotificationSettings) {
    setSettings(next)
    saveNotificationSettings(next)
  }

  async function toggleEnabled() {
    setMessage('')
    if (settings.enabled) {
      persist({ ...settings, enabled: false })
      return
    }
    if (!('Notification' in window)) {
      setPermission('unsupported')
      setMessage('Denne nettleseren støtter ikke systemvarsler.')
      return
    }
    let nextPermission = Notification.permission
    if (nextPermission === 'default') nextPermission = await Notification.requestPermission()
    setPermission(nextPermission)
    if (nextPermission === 'granted') {
      persist({ ...settings, enabled: true })
      setMessage('Varsler er aktivert.')
    } else if (nextPermission === 'denied') {
      setMessage('Varsler er blokkert. Tillat varsler for Mitt Storhamar i nettleser-/appinnstillingene.')
    }
  }

  function toggle(key: keyof Omit<NotificationSettings, 'enabled'>) {
    persist({ ...settings, [key]: !settings[key] })
  }

  async function testNotification() {
    setMessage('')
    if (!('Notification' in window)) {
      setPermission('unsupported')
      setMessage('Systemvarsler støttes ikke her.')
      return
    }
    let nextPermission = Notification.permission
    if (nextPermission === 'default') nextPermission = await Notification.requestPermission()
    setPermission(nextPermission)
    if (nextPermission !== 'granted') {
      setMessage('Tillat varsler først.')
      return
    }
    const shown = await showSystemNotification('Mitt Storhamar', 'Varsler fungerer 💛💙', `test:${Date.now()}`)
    setMessage(shown ? 'Testvarsel sendt.' : 'Kunne ikke vise testvarselet.')
  }

  if (!target) return null

  const rows: { key: keyof Omit<NotificationSettings, 'enabled'>; title: string; text: string }[] = [
    { key: 'gameTomorrow', title: 'Kamp i morgen', text: 'Påminnelse fra kl. 18 kvelden før.' },
    { key: 'gameDay', title: 'Kampdag', text: 'Kamp, tidspunkt og arena på kampdagen.' },
    { key: 'departure', title: 'DRA-varsel', text: 'Bruker reisetid og ønsket ankomst fra den lagrede reisen.' },
    { key: 'smartGameDay', title: 'Smart Kampdag', text: 'Bekrefter at Smart Kampdag er klar når funksjonen er slått på.' },
    { key: 'finishGameDay', title: 'Fullfør kampdagen', text: 'Minner deg etter kampen hvis den ikke er ferdigregistrert.' },
  ]

  return createPortal(
    <article className="card notification-settings-card">
      <div className="notification-settings-head">
        <div><span className="eyebrow">VARSLER</span><h2>Kampdag og reise</h2></div>
        <button
          type="button"
          className={`smart-toggle ${settings.enabled ? 'on' : ''}`}
          aria-pressed={settings.enabled}
          onClick={() => void toggleEnabled()}
        >
          <span />{settings.enabled ? 'På' : 'Av'}
        </button>
      </div>

      <div className="notification-permission">
        <BellRing size={18} />
        <div><span>SYSTEMTILLATELSE</span><strong className={permission === 'granted' ? 'good' : permission === 'denied' ? 'bad' : ''}>{permissionLabel(permission)}</strong></div>
      </div>

      <div className="notification-setting-list">
        {rows.map((row) => (
          <label className="notification-setting-row" key={row.key}>
            <div><strong>{row.title}</strong><span>{row.text}</span></div>
            <input type="checkbox" checked={settings[row.key]} disabled={!settings.enabled} onChange={() => toggle(row.key)} />
          </label>
        ))}
      </div>

      <button type="button" className="secondary-action notification-test-button" onClick={() => void testNotification()}>
        <Bell size={16} /> Send testvarsel
      </button>
      {message && <p className={permission === 'denied' ? 'save-warning' : 'save-success'}>{message}</p>}
      <p className="travel-footnote">DRA-varsel finnes bare når reisen har reisetid fram til arena. I dagens PWA sjekkes planlagte varsler når appen er aktiv eller åpnes igjen; ekte push mens appen er helt lukket krever en senere push-/Android-løsning.</p>
    </article>,
    target,
  )
}

export { defaultNotificationSettings }

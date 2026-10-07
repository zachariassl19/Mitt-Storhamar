import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bell, BellRing, ChevronDown, MapPin } from 'lucide-react'
import { LocalNotifications } from '@capacitor/local-notifications'
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
import { loadTrips, TRIPS_CHANGED_EVENT } from '../lib/trips'
import {
  isNativeAndroid,
  startPositionNotificationTest,
  getPositionNotificationTestStatus,
  type NativePositionTestStatus,
} from '../lib/nativeSmartGameDay'

const SENT_KEY = 'mitt-storhamar:notifications-sent:v1'

type PermissionState = NotificationPermission | 'unsupported' | 'checking'

async function systemNotificationPermission(request = false): Promise<PermissionState> {
  if (isNativeAndroid()) {
    let result = await LocalNotifications.checkPermissions()
    if (request && result.display !== 'granted') result = await LocalNotifications.requestPermissions()
    return result.display === 'granted' ? 'granted' : result.display === 'denied' ? 'denied' : 'default'
  }
  if (!('Notification' in window)) return 'unsupported'
  if (request && Notification.permission === 'default') return Notification.requestPermission()
  return Notification.permission
}

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
  if (isNativeAndroid()) {
    try {
      if (await systemNotificationPermission() !== 'granted') return false
      let id = 17
      for (const char of tag) id = (id * 31 + char.charCodeAt(0)) | 0
      await LocalNotifications.schedule({ notifications: [{ id: (id & 0x3fffffff) + 10000, title, body, extra: { tag } }] })
      return true
    } catch {
      return false
    }
  }
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
      if (disposed || !settings.enabled) return
      if (await systemNotificationPermission() !== 'granted') return

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
    const onPageShow = () => void check()
    const onOnline = () => void check()
    const onTripChanged = () => void check()
    const timer = window.setInterval(() => void check(), 30_000)

    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onFocus)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('online', onOnline)
    window.addEventListener(TRIPS_CHANGED_EVENT, onTripChanged)
    void check()

    return () => {
      disposed = true
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('online', onOnline)
      window.removeEventListener(TRIPS_CHANGED_EVENT, onTripChanged)
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

      let container = settingsList.querySelector<HTMLDivElement>('#notification-settings-portal')
      if (!container) {
        container = document.createElement('div')
        container.id = 'notification-settings-portal'
        const smartPortal = settingsList.querySelector('#smart-gameday-settings-portal')
        if (smartPortal) smartPortal.insertAdjacentElement('afterend', container)
        else settingsList.insertBefore(container, settingsList.firstChild)
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
  if (isNativeAndroid()) return 'checking'
  if (!('Notification' in window)) return 'unsupported'
  return Notification.permission
}

function permissionLabel(permission: PermissionState) {
  if (permission === 'checking') return 'Sjekker…'
  if (permission === 'granted') return 'Tillatt'
  if (permission === 'denied') return 'Blokkert'
  if (permission === 'unsupported') return 'Ikke tilgjengelig'
  return 'Ikke spurt ennå'
}

export function NotificationSettingsPortal() {
  const target = useSettingsPortalTarget()
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<NotificationSettings>(() => loadNotificationSettings())
  const [permission, setPermission] = useState<PermissionState>(() => permissionState())
  const [message, setMessage] = useState('')
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false)
  const [positionTest, setPositionTest] = useState<NativePositionTestStatus | null>(null)
  const [startingPositionTest, setStartingPositionTest] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const native = isNativeAndroid()
  const positionTestBusy = startingPositionTest || positionTest?.running === true

  useEffect(() => subscribeNotificationSettings(setSettings), [])

  useEffect(() => {
    if (!native) return
    let mounted = true
    async function refresh() {
      if (document.hidden) return
      try {
        const [nextPermission, status] = await Promise.all([
          systemNotificationPermission(), getPositionNotificationTestStatus(),
        ])
        if (!mounted) return
        setPermission(nextPermission)
        setPositionTest(status)
        setSecondsRemaining(status.running && status.dueAt ? Math.max(0, Math.ceil((status.dueAt - Date.now()) / 1000)) : 0)
      } catch {
        if (mounted) setMessage('Kunne ikke lese teststatus. Åpne appen og prøv igjen.')
      }
    }
    const onVisible = () => { if (!document.hidden) void refresh() }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onVisible)
    void refresh()
    const timer = open && positionTestBusy ? window.setInterval(() => void refresh(), 1000) : undefined
    return () => {
      mounted = false
      if (timer !== undefined) window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onVisible)
    }
  }, [native, open, positionTestBusy])

  useEffect(() => {
    let mounted = true
    if (native || !('serviceWorker' in navigator)) {
      setServiceWorkerReady(false)
      return () => { mounted = false }
    }

    navigator.serviceWorker.ready
      .then(() => { if (mounted) setServiceWorkerReady(true) })
      .catch(() => { if (mounted) setServiceWorkerReady(false) })

    return () => { mounted = false }
  }, [native])

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
    const nextPermission = await systemNotificationPermission(true)
    setPermission(nextPermission)
    if (nextPermission === 'granted') {
      persist({ ...settings, enabled: true })
      setMessage('Varsler er aktivert.')
    } else if (nextPermission === 'denied') {
      setMessage('Varsler er blokkert. Tillat varsler for Mitt Storhamar i nettleser-/appinnstillingene.')
    } else if (nextPermission === 'unsupported') {
      setMessage('Denne nettleseren støtter ikke systemvarsler.')
    }
  }

  function toggle(key: keyof Omit<NotificationSettings, 'enabled'>) {
    persist({ ...settings, [key]: !settings[key] })
  }

  async function testNotification() {
    setMessage('')
    const nextPermission = await systemNotificationPermission(true)
    setPermission(nextPermission)
    if (nextPermission !== 'granted') {
      setMessage('Tillat varsler først.')
      return
    }
    const shown = await showSystemNotification('Mitt Storhamar', 'Varsler fungerer 💛💙', `test:${Date.now()}`)
    setMessage(shown ? 'Testvarsel sendt.' : 'Kunne ikke vise testvarselet.')
  }

  async function testPositionAndNotification() {
    if (positionTestBusy) return
    setStartingPositionTest(true)
    setMessage('')
    try {
      const status = await startPositionNotificationTest()
      setPositionTest(status)
      setSecondsRemaining(status.dueAt ? Math.max(0, Math.ceil((status.dueAt - Date.now()) / 1000)) : 5)
      setPermission(await systemNotificationPermission())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Kunne ikke starte testen. Kontroller tillatelsene og prøv igjen.')
    } finally {
      setStartingPositionTest(false)
    }
  }

  if (!target) return null

  const rows: { key: keyof Omit<NotificationSettings, 'enabled'>; title: string; text: string }[] = [
    { key: 'gameTomorrow', title: 'Kamp i morgen', text: 'Kvelden før.' },
    { key: 'gameDay', title: 'Kampdag', text: 'På kampdagen.' },
    { key: 'departure', title: 'DRA-varsel', text: 'Fra lagret reise.' },
    { key: 'smartGameDay', title: 'Smart Kampdag', text: 'Når GPS-funksjonen er klar.' },
    { key: 'finishGameDay', title: 'Fullfør kampdagen', text: 'Etter kampen.' },
  ]

  return createPortal(
    <div className={`settings-expandable notification-settings-entry ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="settings-entry-button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <BellRing size={22} />
        <div><strong>Varsler</strong><span>Kamp, DRA og påminnelser</span></div>
        <div className="settings-entry-tail">
          <span className={`settings-entry-state ${settings.enabled ? 'on' : ''}`}>{settings.enabled ? 'På' : 'Av'}</span>
          <ChevronDown className={open ? 'rotated' : ''} size={19} />
        </div>
      </button>

      {open && (
        <div className="settings-entry-panel notification-settings-panel">
          <div className="settings-panel-toggle-row">
            <div><strong>Varsler</strong><span>Velg hvilke kampvarsler du vil ha.</span></div>
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

          {!native && <div className="notification-runtime-grid">
            <div>
              <span>SERVICE WORKER</span>
              <strong className={serviceWorkerReady ? 'good' : ''}>{serviceWorkerReady ? 'Klar' : 'Ikke klar'}</strong>
            </div>
            <div>
              <span>BAKGRUNNSMODUS</span>
              <strong>Lokal PWA</strong>
            </div>
          </div>}

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
          {native && (
            <div className="position-notification-test">
              <button type="button" className="secondary-action notification-test-button" disabled={positionTestBusy} onClick={() => void testPositionAndNotification()}>
                <MapPin size={18} />
                {startingPositionTest ? 'Starter testen…' : positionTestBusy ? secondsRemaining > 0 ? `Testen starter om ${secondsRemaining} sek` : 'Henter posisjon…' : 'Test posisjon og varsel · 5 sek'}
              </button>
              <p className="settings-panel-note">Lås skjermen etter start. Testvarselet vises etter 5 sekunder og oppdateres når telefonen finner en fersk posisjon. Testen virker også på dager uten kamp.</p>
              <div role="status" aria-live="polite">
                {positionTestBusy && <p className="save-success">Lås skjermen nå. Testen fortsetter på telefonen.</p>}
                {!positionTestBusy && positionTest?.state === 'sent' && <p className="position-test-result save-success">{positionTest.body}</p>}
                {!positionTestBusy && positionTest?.state === 'error' && <p className="save-warning">{positionTest.error}</p>}
              </div>
            </div>
          )}
          {message && <p className={permission === 'denied' ? 'save-warning' : 'save-success'}>{message}</p>}
          {!native && <p className="settings-panel-note">DRA krever lagret reisetid. Lokal varselsjekk fortsetter så lenge nettleseren lar PWA-prosessen kjøre. Hvis Android stopper appen helt, kreves ekte Web Push fra backend for garantert bakgrunnslevering.</p>}
        </div>
      )}
    </div>,
    target,
  )
}

export { defaultNotificationSettings }


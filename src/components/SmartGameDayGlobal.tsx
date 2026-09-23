import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { arenaForGame } from '../data/arenas'
import { games } from '../data/games'
import { isGameDay } from '../lib/gameTime'
import {
  loadSmartGameDaySettings,
  saveSmartGameDaySettings,
  subscribeSmartGameDaySettings,
  type SmartGameDaySettings,
} from '../lib/smartGameDaySettings'
import { classifyArenaProximity, distanceMeters, eventFromPosition } from '../lib/smartGameDay'
import { saveSmartGameDayEvent } from '../lib/storage'
import type { ArenaProximity } from '../types'

type PermissionState = 'checking' | 'granted' | 'prompt' | 'denied' | 'unsupported'

function permissionText(value: PermissionState) {
  if (value === 'granted') return 'Tillatt'
  if (value === 'denied') return 'Blokkert'
  if (value === 'unsupported') return 'Ikke tilgjengelig'
  if (value === 'checking') return 'Sjekker…'
  return 'Ikke spurt ennå'
}

function errorText(error: GeolocationPositionError) {
  if (error.code === error.PERMISSION_DENIED) return 'Posisjon er blokkert. Tillat posisjon for Mitt Storhamar i nettleserinnstillingene.'
  if (error.code === error.POSITION_UNAVAILABLE) return 'Telefonen finner ikke posisjonen akkurat nå. Sjekk at GPS er slått på.'
  if (error.code === error.TIMEOUT) return 'GPS brukte for lang tid. Prøv igjen, gjerne utendørs.'
  return 'Kunne ikke hente posisjon akkurat nå.'
}

export function SmartGameDayManager() {
  const [settings, setSettings] = useState<SmartGameDaySettings>(() => loadSmartGameDaySettings())
  const watchId = useRef<number | null>(null)
  const proximity = useRef<ArenaProximity>('outside')

  useEffect(() => subscribeSmartGameDaySettings(setSettings), [])

  useEffect(() => {
    document.documentElement.dataset.smartGameDay = settings.enabled ? 'enabled' : 'disabled'
  }, [settings.enabled])

  useEffect(() => {
    let disposed = false
    let activeGameId: string | null = null

    function stopWatch() {
      if (watchId.current != null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchId.current)
      }
      watchId.current = null
      activeGameId = null
      proximity.current = 'outside'
    }

    function startWatch() {
      if (disposed || document.hidden || !settings.enabled || !settings.autoStartOnGameDay) return
      if (!window.isSecureContext || !('geolocation' in navigator)) return

      const game = games.find((candidate) => isGameDay(candidate))
      if (!game) {
        stopWatch()
        return
      }
      const arena = arenaForGame(game)
      if (!arena || arena.latitude == null || arena.longitude == null) return
      if (watchId.current != null && activeGameId === game.id) return

      stopWatch()
      activeGameId = game.id
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          if (disposed) return
          const meters = distanceMeters(
            position.coords.latitude,
            position.coords.longitude,
            arena.latitude!,
            arena.longitude!,
          )
          const nextProximity = classifyArenaProximity(arena, meters)
          const smartEvent = eventFromPosition(game, position, proximity.current)
          proximity.current = nextProximity
          if (smartEvent) {
            saveSmartGameDayEvent(smartEvent)
            window.dispatchEvent(new CustomEvent('mitt-storhamar:smart-gameday-event', { detail: smartEvent }))
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) stopWatch()
        },
        { enableHighAccuracy: true, maximumAge: 15_000, timeout: 25_000 },
      )
    }

    const onVisibility = () => {
      if (document.hidden) stopWatch()
      else startWatch()
    }

    startWatch()
    document.addEventListener('visibilitychange', onVisibility)
    const timer = window.setInterval(() => {
      if (!document.hidden) startWatch()
    }, 60_000)

    return () => {
      disposed = true
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisibility)
      stopWatch()
    }
  }, [settings.enabled, settings.autoStartOnGameDay])

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

      let container = parent.querySelector<HTMLDivElement>('#smart-gameday-settings-portal')
      if (!container) {
        container = document.createElement('div')
        container.id = 'smart-gameday-settings-portal'
        parent.insertBefore(container, settingsList)
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

export function SmartGameDaySettingsPortal() {
  const target = useSettingsPortalTarget()
  const [settings, setSettings] = useState<SmartGameDaySettings>(() => loadSmartGameDaySettings())
  const [permission, setPermission] = useState<PermissionState>('checking')
  const [testMessage, setTestMessage] = useState('')
  const [testing, setTesting] = useState(false)

  useEffect(() => subscribeSmartGameDaySettings(setSettings), [])

  useEffect(() => {
    let mounted = true
    async function readPermission() {
      if (!window.isSecureContext || !('geolocation' in navigator)) {
        if (mounted) setPermission('unsupported')
        return
      }
      if (!navigator.permissions?.query) {
        if (mounted) setPermission('prompt')
        return
      }
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' })
        if (mounted) setPermission(result.state)
      } catch {
        if (mounted) setPermission('prompt')
      }
    }
    void readPermission()
    return () => { mounted = false }
  }, [target])

  const arenaCoverage = useMemo(() => {
    const names = [...new Set(games.map((game) => game.arena))]
    const ready = names.filter((name) => {
      const game = games.find((candidate) => candidate.arena === name)!
      const arena = arenaForGame(game)
      return arena?.latitude != null && arena.longitude != null
    })
    return { ready: ready.length, total: names.length }
  }, [])

  function update(next: Partial<SmartGameDaySettings>) {
    const merged = { ...settings, ...next }
    setSettings(merged)
    saveSmartGameDaySettings(merged)
  }

  function testPosition() {
    if (testing) return
    if (!window.isSecureContext || !('geolocation' in navigator)) {
      setPermission('unsupported')
      setTestMessage('Posisjon er ikke tilgjengelig i denne nettleseren.')
      return
    }
    setTesting(true)
    setTestMessage('Henter posisjon…')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTesting(false)
        setPermission('granted')
        setTestMessage(`GPS fungerer · nøyaktighet ca. ±${Math.round(position.coords.accuracy)} m`)
      },
      (error) => {
        setTesting(false)
        if (error.code === error.PERMISSION_DENIED) setPermission('denied')
        setTestMessage(errorText(error))
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 25_000 },
    )
  }

  if (!target) return null

  return createPortal(
    <article className="card smart-settings-card">
      <div className="smart-settings-head">
        <div><span className="eyebrow">SMART KAMPDAG</span><h2>Posisjon og GPS</h2></div>
        <button
          type="button"
          className={`smart-toggle ${settings.enabled ? 'on' : ''}`}
          aria-pressed={settings.enabled}
          onClick={() => update({ enabled: !settings.enabled })}
        >
          <span />{settings.enabled ? 'På' : 'Av'}
        </button>
      </div>

      <p>Slår du dette på én gang, gjelder det alle Storhamar-kamper. På kampdager brukes arenaens innebygde GPS-punkt automatisk.</p>

      <div className="smart-settings-grid">
        <div><span>POSISJON</span><strong className={permission === 'denied' ? 'bad' : permission === 'granted' ? 'good' : ''}>{permissionText(permission)}</strong></div>
        <div><span>ARENAER KLARE</span><strong>{arenaCoverage.ready}/{arenaCoverage.total}</strong></div>
      </div>

      <label className="smart-setting-row">
        <div><strong>Start automatisk på kampdager</strong><span>Prøver å starte GPS igjen når appen åpnes eller blir aktiv.</span></div>
        <input
          type="checkbox"
          checked={settings.autoStartOnGameDay}
          onChange={(event) => update({ autoStartOnGameDay: event.target.checked })}
          disabled={!settings.enabled}
        />
      </label>

      <button type="button" className="secondary-action smart-test-button" onClick={testPosition} disabled={testing}>
        {testing ? 'Henter posisjon…' : 'Test posisjon'}
      </button>
      {testMessage && <p className={permission === 'denied' ? 'save-warning' : 'save-success'}>{testMessage}</p>}
      <p className="travel-footnote">Mitt Storhamar lagrer ikke et kontinuerlig GPS-spor. Det lagres bare kampdagssignaler som nær arena, ankom arena og forlot arena.</p>
    </article>,
    target,
  )
}

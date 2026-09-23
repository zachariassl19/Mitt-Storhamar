import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CalendarDays, ChevronDown, Link2, RefreshCw, Upload } from 'lucide-react'
import { games } from '../data/games'
import { compareCalendarToGames, parseCalendarIcs, type CalendarSuggestion } from '../lib/calendarSync'

const REVIEW_KEY = 'mitt-storhamar:calendar-reviewed:v1'
const SOURCE_KEY = 'mitt-storhamar:calendar-source:v1'
const SUGGESTIONS_KEY = 'mitt-storhamar:calendar-suggestions:v1'
const LAST_CHECK_KEY = 'mitt-storhamar:calendar-last-check:v1'

type ReviewState = Record<string, 'approved' | 'ignored'>

interface CalendarSource {
  name: string
  url: string
  enabled: boolean
  autoCheck: boolean
  updatedAt: string
}

function loadReviews(): ReviewState {
  try {
    return JSON.parse(localStorage.getItem(REVIEW_KEY) || '{}') as ReviewState
  } catch {
    return {}
  }
}

function saveReviews(value: ReviewState) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(value))
}

function loadSource(): CalendarSource | null {
  try {
    const raw = localStorage.getItem(SOURCE_KEY)
    return raw ? JSON.parse(raw) as CalendarSource : null
  } catch {
    return null
  }
}

function saveSource(value: CalendarSource) {
  localStorage.setItem(SOURCE_KEY, JSON.stringify(value))
}

function loadSuggestions(): CalendarSuggestion[] {
  try {
    const raw = localStorage.getItem(SUGGESTIONS_KEY)
    return raw ? JSON.parse(raw) as CalendarSuggestion[] : []
  } catch {
    return []
  }
}

function saveSuggestions(value: CalendarSuggestion[]) {
  localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(value))
}

function loadLastCheck() {
  return localStorage.getItem(LAST_CHECK_KEY)
}

function saveLastCheck(value: string) {
  localStorage.setItem(LAST_CHECK_KEY, value)
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

      let container = settingsList.querySelector<HTMLDivElement>('#calendar-settings-portal')
      if (!container) {
        container = document.createElement('div')
        container.id = 'calendar-settings-portal'
        const notificationPortal = settingsList.querySelector('#notification-settings-portal')
        if (notificationPortal) notificationPortal.insertAdjacentElement('afterend', container)
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

function formatDateTime(value: string | null) {
  if (!value) return 'Ukjent'
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function formatLastCheck(value: string | null) {
  if (!value) return 'Ikke sjekket ennå'
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function SuggestionCard({ suggestion, state, onReview }: {
  suggestion: CalendarSuggestion
  state?: 'approved' | 'ignored'
  onReview: (value: 'approved' | 'ignored') => void
}) {
  return (
    <div className={`calendar-suggestion ${state ? `reviewed ${state}` : ''}`}>
      <div className="calendar-suggestion-head"><strong>{suggestion.title}</strong>{state && <span>{state === 'approved' ? 'Godkjent' : 'Ignorert'}</span>}</div>
      {suggestion.changes.includes('time') && <div className="calendar-change"><span>Tid</span><small>{formatDateTime(suggestion.currentStartsAt)} → {formatDateTime(suggestion.proposedStartsAt)}</small></div>}
      {suggestion.changes.includes('arena') && <div className="calendar-change"><span>Arena</span><small>{suggestion.currentArena} → {suggestion.proposedArena ?? 'Ukjent'}</small></div>}
      {!state && <div className="calendar-review-actions"><button type="button" onClick={() => onReview('approved')}>Godkjenn forslag</button><button type="button" onClick={() => onReview('ignored')}>Ignorer</button></div>}
    </div>
  )
}

export function CalendarSettingsPortal() {
  const target = useSettingsPortalTarget()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [checking, setChecking] = useState(false)
  const [source, setSource] = useState<CalendarSource | null>(() => loadSource())
  const [sourceUrl, setSourceUrl] = useState(() => loadSource()?.url ?? '')
  const [suggestions, setSuggestions] = useState<CalendarSuggestion[]>(() => loadSuggestions())
  const [reviews, setReviews] = useState<ReviewState>(() => loadReviews())
  const [lastCheck, setLastCheck] = useState<string | null>(() => loadLastCheck())
  const autoChecked = useRef(false)

  const upcomingCount = useMemo(() => games.filter((game) => new Date(game.startsAt).getTime() >= Date.now()).length, [])
  const pendingCount = suggestions.filter((suggestion) => !reviews[suggestion.id]).length

  function refreshSourceFromStorage() {
    const stored = loadSource()
    setSource(stored)
    if (stored?.url) setSourceUrl(stored.url)
    return stored
  }

  async function checkSource(sourceOverride?: CalendarSource | null) {
    const activeSource = sourceOverride ?? refreshSourceFromStorage()
    if (!activeSource?.enabled || !activeSource.url.trim()) {
      setMessage('Koble til Min Hockey-kalenderen først.')
      return
    }

    setChecking(true)
    setMessage('Sjekker Min Hockey-kalenderen…')
    try {
      const response = await fetch(activeSource.url, { cache: 'no-store' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const text = await response.text()
      const events = parseCalendarIcs(text)
      const next = compareCalendarToGames(events, games, new Date())
      const checkedAt = new Date().toISOString()
      setSuggestions(next)
      saveSuggestions(next)
      setLastCheck(checkedAt)
      saveLastCheck(checkedAt)
      setMessage(next.length === 0
        ? `Kalenderen er sjekket · ${events.length} hendelser lest · ingen avvik.`
        : `${next.length} mulig ${next.length === 1 ? 'oppdatering' : 'oppdateringer'} funnet.`)
    } catch {
      setMessage('Kunne ikke lese kalenderen direkte. Du kan fortsatt bruke «Sjekk kalenderfil» som reserve.')
    } finally {
      setChecking(false)
    }
  }

  async function importCalendar(file: File | undefined) {
    if (!file) return
    try {
      const text = await file.text()
      const events = parseCalendarIcs(text)
      const next = compareCalendarToGames(events, games, new Date())
      const checkedAt = new Date().toISOString()
      setSuggestions(next)
      saveSuggestions(next)
      setLastCheck(checkedAt)
      saveLastCheck(checkedAt)
      setMessage(next.length === 0 ? 'Ingen avvik mot kommende kamper.' : `${next.length} mulig ${next.length === 1 ? 'oppdatering' : 'oppdateringer'} funnet.`)
    } catch {
      setSuggestions([])
      setMessage('Kunne ikke lese kalenderfila.')
    }
  }

  function connectSource() {
    const url = sourceUrl.trim()
    if (!url.startsWith('https://calendar.google.com/calendar/ical/') || !url.includes('/public/')) {
      setMessage('Lim inn den offentlige .ics-lenken fra Google Kalender.')
      return
    }
    const next: CalendarSource = {
      name: 'Storhamar Hockey · Min Hockey',
      url,
      enabled: true,
      autoCheck: true,
      updatedAt: new Date().toISOString(),
    }
    saveSource(next)
    setSource(next)
    setMessage('Min Hockey-kalenderen er koblet til.')
    void checkSource(next)
  }

  function updateAutoCheck(enabled: boolean) {
    if (!source) return
    const next = { ...source, autoCheck: enabled, updatedAt: new Date().toISOString() }
    saveSource(next)
    setSource(next)
  }

  function disconnectSource() {
    localStorage.removeItem(SOURCE_KEY)
    setSource(null)
    setSourceUrl('')
    setMessage('Kalenderkoblingen er fjernet. Kampene i appen er ikke endret.')
  }

  function review(id: string, value: 'approved' | 'ignored') {
    const next = { ...reviews, [id]: value }
    setReviews(next)
    saveReviews(next)
  }

  useEffect(() => {
    if (!open) {
      autoChecked.current = false
      return
    }
    const stored = refreshSourceFromStorage()
    if (!stored?.autoCheck || !stored.enabled || autoChecked.current) return
    autoChecked.current = true
    void checkSource(stored)
  }, [open])

  if (!target) return null

  return createPortal(
    <div className={`settings-expandable calendar-settings-entry ${open ? 'open' : ''}`}>
      <button type="button" className="settings-entry-button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <CalendarDays size={22} />
        <div><strong>Kalender</strong><span>{source ? 'Min Hockey · Storhamar Hockey' : 'Koble eksisterende kalender'}</span></div>
        <div className="settings-entry-tail">
          <span className={`settings-entry-state ${pendingCount > 0 ? 'attention' : source ? 'on' : ''}`}>{pendingCount > 0 ? `${pendingCount} nye` : source ? 'Koblet' : `${upcomingCount} kamper`}</span>
          <ChevronDown className={open ? 'rotated' : ''} size={19} />
        </div>
      </button>

      {open && (
        <div className="settings-entry-panel calendar-settings-panel">
          {source ? (
            <>
              <div className="calendar-source-card">
                <div className="calendar-source-icon"><Link2 size={18} /></div>
                <div><strong>{source.name}</strong><span>Sjekker kampdato, klokkeslett og arena</span><small>Sist sjekket: {formatLastCheck(lastCheck)}</small></div>
                <span className="calendar-connected">Koblet</span>
              </div>

              <button type="button" className="secondary-action calendar-action" onClick={() => void checkSource(source)} disabled={checking}>
                <RefreshCw size={16} className={checking ? 'calendar-spin' : ''} /> {checking ? 'Sjekker…' : 'Sjekk nå'}
              </button>

              <label className="smart-setting-row calendar-auto-row">
                <div><strong>Sjekk automatisk</strong><span>Når du åpner Kalender-innstillingen.</span></div>
                <input type="checkbox" checked={source.autoCheck} onChange={(event) => updateAutoCheck(event.target.checked)} />
              </label>
            </>
          ) : (
            <div className="calendar-connect-box">
              <div><strong>Koble Min Hockey</strong><span>Bruk den offentlige .ics-lenken fra Google Kalender.</span></div>
              <input
                type="url"
                value={sourceUrl}
                onChange={(event) => setSourceUrl(event.target.value)}
                placeholder="https://calendar.google.com/calendar/ical/.../public/basic.ics"
                autoComplete="off"
              />
              <button type="button" className="secondary-action calendar-action" onClick={connectSource}><Link2 size={16} /> Koble kalender</button>
            </div>
          )}

          <details className="calendar-manual-fallback">
            <summary>Manuell reserve</summary>
            <label className="secondary-action calendar-action calendar-file-button"><Upload size={16} /> Sjekk kalenderfil<input type="file" accept="text/calendar,.ics" onChange={(event) => void importCalendar(event.target.files?.[0])} /></label>
          </details>

          {message && <p className="calendar-message">{message}</p>}

          {suggestions.length > 0 && <div className="calendar-suggestion-list">{suggestions.map((suggestion) => <SuggestionCard key={suggestion.id} suggestion={suggestion} state={reviews[suggestion.id]} onReview={(value) => review(suggestion.id, value)} />)}</div>}

          {source && <button type="button" className="danger-text calendar-disconnect" onClick={disconnectSource}>Koble fra kalender</button>}
          <p className="settings-panel-note">Kalenderen brukes bare som kontrollkilde. Ingen kamp, reise, oppmøte eller kostnad endres automatisk.</p>
        </div>
      )}
    </div>,
    target,
  )
}

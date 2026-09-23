import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CalendarDays, ChevronDown, Download, Upload } from 'lucide-react'
import { games } from '../data/games'
import { compareCalendarToGames, createUpcomingCalendarIcs, parseCalendarIcs, type CalendarSuggestion } from '../lib/calendarSync'

const REVIEW_KEY = 'mitt-storhamar:calendar-reviewed:v1'

type ReviewState = Record<string, 'approved' | 'ignored'>

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

function downloadIcs() {
  const ics = createUpcomingCalendarIcs(games, new Date(), window.location.href)
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'mitt-storhamar-kamper.ics'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 500)
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
  const [suggestions, setSuggestions] = useState<CalendarSuggestion[]>([])
  const [reviews, setReviews] = useState<ReviewState>(() => loadReviews())

  const upcomingCount = useMemo(() => games.filter((game) => new Date(game.startsAt).getTime() >= Date.now()).length, [])
  const pendingCount = suggestions.filter((suggestion) => !reviews[suggestion.id]).length

  async function importCalendar(file: File | undefined) {
    if (!file) return
    try {
      const text = await file.text()
      const events = parseCalendarIcs(text)
      const next = compareCalendarToGames(events, games, new Date())
      setSuggestions(next)
      setMessage(next.length === 0 ? 'Ingen avvik mot kommende kamper.' : `${next.length} mulig ${next.length === 1 ? 'oppdatering' : 'oppdateringer'} funnet.`)
    } catch {
      setSuggestions([])
      setMessage('Kunne ikke lese kalenderfila.')
    }
  }

  function review(id: string, value: 'approved' | 'ignored') {
    const next = { ...reviews, [id]: value }
    setReviews(next)
    saveReviews(next)
  }

  if (!target) return null

  return createPortal(
    <div className={`settings-expandable calendar-settings-entry ${open ? 'open' : ''}`}>
      <button type="button" className="settings-entry-button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <CalendarDays size={22} />
        <div><strong>Kalender</strong><span>Kamper og oppdateringssjekk</span></div>
        <div className="settings-entry-tail">
          <span className={`settings-entry-state ${pendingCount > 0 ? 'attention' : ''}`}>{pendingCount > 0 ? `${pendingCount} nye` : `${upcomingCount} kommende`}</span>
          <ChevronDown className={open ? 'rotated' : ''} size={19} />
        </div>
      </button>

      {open && (
        <div className="settings-entry-panel calendar-settings-panel">
          <button type="button" className="secondary-action calendar-action" onClick={downloadIcs}><Download size={16} /> Legg kommende i kalender</button>
          <label className="secondary-action calendar-action calendar-file-button"><Upload size={16} /> Sjekk kalenderfil<input type="file" accept="text/calendar,.ics" onChange={(event) => void importCalendar(event.target.files?.[0])} /></label>
          {message && <p className="calendar-message">{message}</p>}

          {suggestions.length > 0 && <div className="calendar-suggestion-list">{suggestions.map((suggestion) => <SuggestionCard key={suggestion.id} suggestion={suggestion} state={reviews[suggestion.id]} onReview={(value) => review(suggestion.id, value)} />)}</div>}

          <p className="settings-panel-note">Kalenderfila kan legges inn i Google Kalender. Importerte avvik vises som forslag. Godkjenning lagres separat og overskriver aldri kamp, oppmøte, reise eller kostnader automatisk.</p>
        </div>
      )}
    </div>,
    target,
  )
}

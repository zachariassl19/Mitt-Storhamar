import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, Clock3, ListChecks, MapPin, Navigation, Route } from 'lucide-react'
import { games } from '../data/games'
import { getGameTemporalState, isGameDay } from '../lib/gameTime'
import {
  departureChecklistProgress,
  loadDepartureChecklist,
  subscribeDepartureChecklist,
  type DepartureChecklistData,
} from '../lib/departureChecklist'
import { preDepartureReminderTime } from '../lib/notificationLogic'
import {
  loadSmartGameDaySettings,
  subscribeSmartGameDaySettings,
  type SmartGameDaySettings,
} from '../lib/smartGameDaySettings'
import { loadAttendancePlans, loadGameDayRecords, subscribeAttendancePlans } from '../lib/storage'
import {
  automaticDepartureTimeForTrip,
  createTripForGame,
  departureTimeForTrip,
  loadTrips,
  manualDepartureAtForGameClock,
  saveTrip,
  subscribeTrips,
  tripForGame,
} from '../lib/trips'
import type { Game, Trip } from '../types'

function useMatchdayPortalTarget() {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let owned: HTMLDivElement | null = null

    function refresh() {
      const oldBanner = document.querySelector<HTMLElement>('.matchday-banner')
      if (!oldBanner?.parentElement) {
        setTarget(null)
        return
      }

      const parent = oldBanner.parentElement
      let container = parent.querySelector<HTMLDivElement>('#dynamic-matchday-home-portal')
      if (!container) {
        container = document.createElement('div')
        container.id = 'dynamic-matchday-home-portal'
        parent.insertBefore(container, oldBanner)
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

function osloClockMinutes(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Oslo',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return Number(map.hour) * 60 + Number(map.minute)
}

function clockValue(totalMinutes: number) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440
  const hours = Math.floor(normalized / 60)
  const minutes = normalized % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function formatClock(date: Date) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function phaseCopy(game: Game, recordCompleted: boolean, now: Date) {
  const state = getGameTemporalState(game, now)
  if (state === 'GAME_DAY_BEFORE_START') return { kicker: 'KAMPDAG', title: 'I DAG GJELDER DET', state }
  if (state === 'IN_PROGRESS') return { kicker: 'LIVE KAMPDAG', title: 'KAMPEN PÅGÅR', state }
  if (recordCompleted) return { kicker: 'KAMPDAG FERDIG', title: 'KAMPDAGEN ER LAGRET', state }
  return { kicker: 'ETTER KAMPEN', title: 'FULLFØR KAMPDAGEN', state }
}

function openCurrentGame() {
  document.querySelector<HTMLButtonElement>('.hero-card .open-game')?.click()
}

function openDepartureChecklist() {
  openCurrentGame()
  window.setTimeout(() => {
    document.getElementById('pre-departure-checklist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 120)
}

export function DynamicMatchdayHome() {
  const target = useMatchdayPortalTarget()
  const [now, setNow] = useState(() => new Date())
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips())
  const [plans, setPlans] = useState(() => loadAttendancePlans())
  const [smartSettings, setSmartSettings] = useState<SmartGameDaySettings>(() => loadSmartGameDaySettings())
  const [checklist, setChecklist] = useState<DepartureChecklistData>({ checked: {} })
  const [message, setMessage] = useState('')

  useEffect(() => subscribeTrips(setTrips), [])
  useEffect(() => subscribeAttendancePlans(setPlans), [])
  useEffect(() => subscribeSmartGameDaySettings(setSmartSettings), [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const game = useMemo(() => games.find((candidate) => isGameDay(candidate, now)), [now])
  const trip = game ? tripForGame(trips, game.id) : undefined
  const record = game ? loadGameDayRecords()[game.id] : undefined
  const plan = game ? plans[game.id] ?? 'unset' : 'unset'
  const phase = game ? phaseCopy(game, Boolean(record?.completed), now) : null
  const desiredMinutesBefore = trip?.desiredArrivalMinutesBefore ?? 30
  const startDate = game ? new Date(game.startsAt) : null
  const automaticDepartureDate = game ? automaticDepartureTimeForTrip(game, trip) : null
  const departureDate = game ? departureTimeForTrip(game, trip) : null
  const departureIsManual = Boolean(trip?.manualDepartureAt)
  const arrivalValue = startDate ? clockValue(osloClockMinutes(startDate) - desiredMinutesBefore) : ''
  const departureValue = departureDate ? clockValue(osloClockMinutes(departureDate)) : ''
  const reminderDate = game ? preDepartureReminderTime(game, trip, 10) : null
  const checklistProgress = game ? departureChecklistProgress(checklist, game) : { checked: 0, total: 0, percent: 0, complete: false }

  useEffect(() => {
    if (!game) {
      setChecklist({ checked: {} })
      return
    }
    setChecklist(loadDepartureChecklist(game.id))
    return subscribeDepartureChecklist(game.id, setChecklist)
  }, [game?.id])

  useEffect(() => {
    if (target && game) document.documentElement.dataset.dynamicMatchday = 'true'
    else delete document.documentElement.dataset.dynamicMatchday
    return () => { delete document.documentElement.dataset.dynamicMatchday }
  }, [target, game])

  function setArrival(value: string) {
    setMessage('')
    if (!game || !value) return
    const [hours, minutes] = value.split(':').map(Number)
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return

    const wanted = hours * 60 + minutes
    const gameStart = osloClockMinutes(new Date(game.startsAt))
    const minutesBefore = gameStart - wanted

    if (minutesBefore < 0) {
      setMessage('Velg et tidspunkt før kampstart.')
      return
    }

    const current = tripForGame(loadTrips(), game.id) ?? createTripForGame(game)
    saveTrip({
      ...current,
      desiredArrivalMinutesBefore: minutesBefore,
      updatedAt: new Date().toISOString(),
    })
    setMessage(`Ønsket ankomst lagret: kl. ${value}.`)
  }

  function setDeparture(value: string) {
    setMessage('')
    if (!game || !value) return

    const manualDepartureAt = manualDepartureAtForGameClock(game, value)
    if (!manualDepartureAt) {
      setMessage('Velg en DRA-tid før kampstart.')
      return
    }

    const current = tripForGame(loadTrips(), game.id) ?? createTripForGame(game)
    saveTrip({
      ...current,
      manualDepartureAt,
      updatedAt: new Date().toISOString(),
    })
    setMessage(`DRA lagret: kl. ${value}. Påminnelsen kommer 10 min før.`)
  }

  function useAutomaticDeparture() {
    if (!game) return
    const current = tripForGame(loadTrips(), game.id) ?? createTripForGame(game)
    saveTrip({
      ...current,
      manualDepartureAt: null,
      updatedAt: new Date().toISOString(),
    })
    setMessage(automaticDepartureDate
      ? `DRA bruker forslag fra reisen: kl. ${formatClock(automaticDepartureDate)}.`
      : 'Manuell DRA er fjernet. Beregn reisetid for å få et nytt forslag.')
  }

  if (!target || !game || !phase) return null

  const beforeStart = phase.state === 'GAME_DAY_BEFORE_START'
  const afterGame = phase.state === 'POST_GAME_PENDING' || phase.state === 'FINISHED'
  const attendedDespitePlan = record?.attendanceActual === 'attended'

  // A supporter who explicitly answered "Nei" should not be asked to
  // complete a matchday afterwards. If actual attendance later says they
  // were there, the completed/after-match flow is still available.
  if (afterGame && plan === 'no' && !attendedDespitePlan) return null

  return createPortal(
    <section className={`dynamic-matchday-card ${phase.state.toLowerCase()}`}>
      <div className="dynamic-matchday-topline">
        <div>
          <span>{phase.kicker}</span>
          <strong>{beforeStart ? (checklistProgress.complete ? 'KLAR TIL Å DRA' : 'KAMPDAGEN ER KLAR') : phase.title}</strong>
        </div>
        <span className="dynamic-matchday-competition">{game.competition}</span>
      </div>

      <div className="dynamic-matchday-game">
        <strong>{game.homeTeam} – {game.awayTeam}</strong>
        <span><Clock3 size={14} /> {formatClock(new Date(game.startsAt))}</span>
        <span><MapPin size={14} /> {game.arena}</span>
      </div>

      {beforeStart && (
        <>
          <div className="dynamic-matchday-times">
            <label>
              <span>JEG VIL VÆRE DER KL.</span>
              <input type="time" value={arrivalValue} onChange={(event) => setArrival(event.target.value)} />
            </label>
            <div className="dynamic-departure-time">
              <span>DRA · DU VELGER</span>
              <input
                type="time"
                aria-label="Velg når du ønsker å dra"
                value={departureValue}
                onChange={(event) => setDeparture(event.target.value)}
              />
              <small>
                {departureIsManual
                  ? 'Valgt av deg'
                  : automaticDepartureDate
                    ? 'Forslag fra reisetiden'
                    : 'Velg selv eller beregn reisetid'}
              </small>
              {departureIsManual && automaticDepartureDate && (
                <button type="button" className="dynamic-use-suggested" onClick={useAutomaticDeparture}>
                  Bruk forslag {formatClock(automaticDepartureDate)}
                </button>
              )}
            </div>
          </div>

          <div className="dynamic-readiness-card">
            <div className="dynamic-readiness-top">
              <div>
                <span>FØR DU REISER</span>
                <strong>{checklistProgress.checked}/{checklistProgress.total} husket</strong>
                <small>
                  {reminderDate && departureDate
                    ? `Påminnelse ${formatClock(reminderDate)} · 10 min før DRA`
                    : 'Lagre reisen for å få 10-minutters påminnelse'}
                </small>
              </div>
              <div className={`dynamic-ready-score ${checklistProgress.complete ? 'complete' : ''}`}>
                {checklistProgress.percent}%
              </div>
            </div>
            <div className="progress-track dynamic-readiness-progress">
              <div style={{ width: `${checklistProgress.percent}%` }} />
            </div>
            <button type="button" className="dynamic-checklist-action" onClick={openDepartureChecklist}>
              <ListChecks size={17} />
              {checklistProgress.complete ? 'Se sjekklisten' : 'Åpne og kryss av'}
            </button>
          </div>

          <div className="dynamic-matchday-status">
            <span className={trip ? 'ready' : ''}><Route size={14} /> {trip ? 'Reise lagret' : 'Reise mangler'}</span>
            <span className={smartSettings.enabled ? 'ready' : ''}><Navigation size={14} /> Smart Kampdag {smartSettings.enabled ? 'på' : 'av'}</span>
          </div>
          {message && <p className={message.startsWith('Velg') ? 'dynamic-error' : 'dynamic-success'}>{message}</p>}
        </>
      )}

      {phase.state === 'IN_PROGRESS' && (
        <p className="dynamic-matchday-message">Kampen er i gang. Smart Kampdag kan fortsatt registrere arena-signaler mens appen er aktiv.</p>
      )}

      {afterGame && (
        <p className="dynamic-matchday-message">
          {record?.completed ? 'Oppmøte og kampdag er allerede registrert.' : 'Registrer oppmøte, billett, reise, reisefølge og kjøp når du er klar.'}
        </p>
      )}

      <button className="dynamic-matchday-action" type="button" onClick={openCurrentGame}>
        {afterGame && !record?.completed ? <CheckCircle2 size={18} /> : <Route size={18} />}
        {afterGame && !record?.completed ? 'Fullfør kampdagen' : beforeStart ? 'Åpne kamp og reise' : 'Åpne kampen'}
      </button>
    </section>,
    target,
  )
}

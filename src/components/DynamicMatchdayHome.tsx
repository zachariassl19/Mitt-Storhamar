import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, Clock3, MapPin, Navigation, Route } from 'lucide-react'
import { games } from '../data/games'
import { getGameTemporalState, isGameDay } from '../lib/gameTime'
import {
  loadSmartGameDaySettings,
  subscribeSmartGameDaySettings,
  type SmartGameDaySettings,
} from '../lib/smartGameDaySettings'
import { loadGameDayRecords } from '../lib/storage'
import {
  createTripForGame,
  loadTrips,
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

function outboundMinutes(trip?: Trip) {
  if (!trip) return null
  const outbound = trip.legs.filter((leg) => leg.direction === 'outbound')
  if (outbound.length === 0 || outbound.some((leg) => leg.durationMinutes == null)) return null
  return outbound.reduce((sum, leg) => sum + (leg.durationMinutes ?? 0), 0)
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

export function DynamicMatchdayHome() {
  const target = useMatchdayPortalTarget()
  const [now, setNow] = useState(() => new Date())
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips())
  const [smartSettings, setSmartSettings] = useState<SmartGameDaySettings>(() => loadSmartGameDaySettings())
  const [message, setMessage] = useState('')

  useEffect(() => subscribeTrips(setTrips), [])
  useEffect(() => subscribeSmartGameDaySettings(setSmartSettings), [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const game = useMemo(() => games.find((candidate) => isGameDay(candidate, now)), [now])
  const trip = game ? tripForGame(trips, game.id) : undefined
  const record = game ? loadGameDayRecords()[game.id] : undefined
  const phase = game ? phaseCopy(game, Boolean(record?.completed), now) : null
  const travelMinutes = outboundMinutes(trip)
  const desiredMinutesBefore = trip?.desiredArrivalMinutesBefore ?? 30
  const startDate = game ? new Date(game.startsAt) : null
  const arrivalDate = startDate ? new Date(startDate.getTime() - desiredMinutesBefore * 60_000) : null
  const departureDate = arrivalDate != null && travelMinutes != null
    ? new Date(arrivalDate.getTime() - travelMinutes * 60_000)
    : null
  const arrivalValue = startDate ? clockValue(osloClockMinutes(startDate) - desiredMinutesBefore) : ''

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

  if (!target || !game || !phase) return null

  const beforeStart = phase.state === 'GAME_DAY_BEFORE_START'
  const afterGame = phase.state === 'POST_GAME_PENDING' || phase.state === 'FINISHED'

  return createPortal(
    <section className={`dynamic-matchday-card ${phase.state.toLowerCase()}`}>
      <div className="dynamic-matchday-topline">
        <div><span>{phase.kicker}</span><strong>{phase.title}</strong></div>
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
            <div><span>DRA</span><strong>{departureDate ? formatClock(departureDate) : '—'}</strong><small>{departureDate ? 'fra lagret reise' : 'beregn reisetid først'}</small></div>
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

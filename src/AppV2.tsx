import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  Database,
  History,
  Home,
  LocateFixed,
  MapPin,
  Medal,
  MoreHorizontal,
  Navigation,
  Plus,
  Route,
  Save,
  Settings,
  Shield,
  Ticket,
  Trash2,
  Trophy,
  Upload,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react'
import appPackage from '../package.json'
import { arenaForGame } from './data/arenas'
import { games } from './data/games'
import { logoForTeam } from './data/teamLogos'
import { confirmedLocalCareerStats } from './lib/careerStats'
import { canConfirmAttendance, getGameTemporalState, isGameDay } from './lib/gameTime'
import {
  classifyArenaProximity,
  distanceMeters,
  eventFromPosition,
  shouldSuggestAttendance,
} from './lib/smartGameDay'
import {
  clearHubExport,
  loadAttendancePlans,
  loadGameDayRecords,
  loadHubExport,
  loadSmartGameDayEvents,
  saveAttendancePlan,
  saveGameDayRecord,
  saveHubExport,
  saveSmartGameDayEvent,
} from './lib/storage'
import { createLeg, createTripForGame, deleteTrip, loadTrips, saveTrip, tripForGame } from './lib/trips'
import type {
  ArenaProximity,
  AttendanceActual,
  AttendancePlan,
  EntryType,
  Game,
  GameDayRecord,
  HubExport,
  NavKey,
  SmartGameDayEvent,
  TransportMode,
  Trip,
  TripLeg,
} from './types'

const APP_VERSION = appPackage.version

const navItems: { key: NavKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Hjem', icon: Home },
  { key: 'games', label: 'Kamper', icon: CalendarDays },
  { key: 'career', label: 'Karriere', icon: Medal },
  { key: 'history', label: 'Historie', icon: History },
  { key: 'more', label: 'Mer', icon: MoreHorizontal },
]

const transportOptions: { value: TransportMode; label: string }[] = [
  { value: 'car', label: 'Bil' },
  { value: 'train', label: 'Tog' },
  { value: 'supporter_bus', label: 'Supporterbuss' },
  { value: 'bus', label: 'Rutebuss' },
  { value: 'plane', label: 'Fly' },
  { value: 'taxi', label: 'Taxi' },
  { value: 'walk', label: 'Gange' },
  { value: 'bike', label: 'Sykkel' },
  { value: 'other', label: 'Annet' },
]

const entryOptions: { value: EntryType; label: string }[] = [
  { value: 'purchased', label: 'Kjøpt billett' },
  { value: 'season_ticket', label: 'Sesongkort' },
  { value: 'work_accreditation', label: 'Jobb / akkreditering' },
  { value: 'free_invitation', label: 'Gratis / invitasjon' },
  { value: 'companion', label: 'Ledsager' },
  { value: 'other', label: 'Annet' },
  { value: 'unknown', label: 'Husker ikke' },
]

function osloDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Oslo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${map.year}-${map.month}-${map.day}`
}

function gameDateKey(game: Game) {
  return osloDateKey(new Date(game.startsAt))
}

function dateText(game: Game) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(game.startsAt))
}

function fullDateText(game: Game) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(game.startsAt))
}

function timeText(game: Game) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(game.startsAt))
}

function isHome(game: Game) {
  return game.homeTeam === 'Storhamar'
}

function isFinished(game: Game) {
  return typeof game.homeScore === 'number' && typeof game.awayScore === 'number'
}

function badgeLetters(team: string) {
  return team
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function planLabel(plan: AttendancePlan) {
  if (plan === 'yes') return 'JA'
  if (plan === 'maybe') return 'KANSKJE'
  if (plan === 'no') return 'NEI'
  return 'IKKE SVART'
}

function actualLabel(actual: AttendanceActual) {
  if (actual === 'attended') return 'DU VAR DER'
  if (actual === 'not_attended') return 'IKKE DELTATT'
  return 'UKJENT'
}

function decisionLabel(game: Game) {
  if (game.decisionType === 'OT') return ' OT'
  if (game.decisionType === 'SO') return ' SO'
  return ''
}

function transportLabel(value: TransportMode) {
  return transportOptions.find((option) => option.value === value)?.label ?? 'Annet'
}

function entryLabel(value: EntryType) {
  return entryOptions.find((option) => option.value === value)?.label ?? 'Husker ikke'
}

function numberOrNull(value: string) {
  if (value.trim() === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(value) + ' kr'
}

function cloneTrip(trip: Trip): Trip {
  return { ...trip, legs: trip.legs.map((leg) => ({ ...leg })) }
}

function blankGameDayRecord(gameId: string): GameDayRecord {
  return {
    gameId,
    attendanceActual: 'unknown',
    entryType: 'unknown',
    ticketCost: null,
    completed: false,
    updatedAt: new Date().toISOString(),
  }
}

function TeamLogo({ team, hero = false }: { team: string; hero?: boolean }) {
  const [failed, setFailed] = useState(false)
  const src = logoForTeam(team)
  return (
    <span className={hero ? 'real-team-logo hero-logo' : 'real-team-logo mini-logo'}>
      {src && !failed ? (
        <img src={src} alt={`${team} logo`} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <b>{badgeLetters(team)}</b>
      )}
    </span>
  )
}

export default function AppV2() {
  const [active, setActive] = useState<NavKey>('home')
  const [plans, setPlans] = useState<Record<string, AttendancePlan>>(() => loadAttendancePlans())
  const [hubData, setHubData] = useState<HubExport | null>(() => loadHubExport())
  const [records, setRecords] = useState<Record<string, GameDayRecord>>(() => loadGameDayRecords())
  const [smartEvents, setSmartEvents] = useState<SmartGameDayEvent[]>(() => loadSmartGameDayEvents())
  const [importMessage, setImportMessage] = useState('')
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips())

  const now = new Date()
  const today = osloDateKey(now)
  const todayGame = games.find((game) => gameDateKey(game) === today)
  const nextFutureGame = games.find((game) => new Date(game.startsAt).getTime() > now.getTime())
  const nextGame = todayGame ?? nextFutureGame ?? games[games.length - 1]
  const matchday = Boolean(todayGame)
  const selectedGame = selectedGameId ? games.find((game) => game.id === selectedGameId) ?? null : null

  const importedPlanMap = useMemo(() => {
    const result: Record<string, AttendancePlan> = {}
    for (const entry of hubData?.attendance ?? []) {
      if (entry.attendancePlan) result[entry.gameId] = entry.attendancePlan
    }
    return result
  }, [hubData])

  function currentPlan(gameId: string): AttendancePlan {
    return plans[gameId] ?? importedPlanMap[gameId] ?? 'unset'
  }

  function updatePlan(gameId: string, plan: AttendancePlan) {
    saveAttendancePlan(gameId, plan)
    setPlans((current) => ({ ...current, [gameId]: plan }))
  }

  function navigate(key: NavKey) {
    setSelectedGameId(null)
    setActive(key)
  }

  function openGame(game: Game) {
    setSelectedGameId(game.id)
  }

  function persistTrip(trip: Trip) {
    setTrips(saveTrip(trip))
  }

  function removeTrip(tripId: string) {
    setTrips(deleteTrip(tripId))
  }

  function persistRecord(record: GameDayRecord) {
    setRecords(saveGameDayRecord(record))
  }

  function persistSmartEvent(event: SmartGameDayEvent) {
    setSmartEvents(saveSmartGameDayEvent(event))
  }

  async function importHubFile(file: File | undefined) {
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text()) as HubExport
      if (!parsed || typeof parsed.schemaVersion !== 'number') throw new Error('Ugyldig eksport')
      saveHubExport(parsed)
      setHubData(parsed)
      setImportMessage(`Importert schema v${parsed.schemaVersion}. Dataene lagres kun lokalt i denne nettleseren.`)
    } catch {
      setImportMessage('Kunne ikke lese fila. Velg JSON-eksporten fra Storhamar HUB.')
    }
  }

  function removeImport() {
    clearHubExport()
    setHubData(null)
    setImportMessage('Importerte HUB-data er fjernet fra denne nettleseren.')
  }

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">MS</div>
            <div><span className="eyebrow">PERSONLIG SUPPORTERAPP</span><strong>MITT STORHAMAR</strong></div>
          </div>
          <button className="icon-button" aria-label="Innstillinger" onClick={() => navigate('more')}><Settings size={20} /></button>
        </header>

        <main className="content">
          {selectedGame ? (
            <GameDetail
              key={selectedGame.id}
              game={selectedGame}
              plan={currentPlan(selectedGame.id)}
              updatePlan={(plan) => updatePlan(selectedGame.id, plan)}
              trip={tripForGame(trips, selectedGame.id)}
              record={records[selectedGame.id]}
              smartEvents={smartEvents.filter((event) => event.gameId === selectedGame.id)}
              onBack={() => setSelectedGameId(null)}
              onSaveTrip={persistTrip}
              onDeleteTrip={removeTrip}
              onSaveRecord={persistRecord}
              onSmartEvent={persistSmartEvent}
            />
          ) : (
            <>
              {active === 'home' && (
                <HomePage
                  nextGame={nextGame}
                  matchday={matchday}
                  currentPlan={currentPlan}
                  updatePlan={updatePlan}
                  openGames={() => navigate('games')}
                  openGame={openGame}
                />
              )}
              {active === 'games' && <GamesPage currentPlan={currentPlan} updatePlan={updatePlan} openGame={openGame} records={records} />}
              {active === 'career' && <CareerPage hubData={hubData} trips={trips} records={records} />}
              {active === 'history' && <HistoryPage />}
              {active === 'more' && (
                <MorePage
                  hubData={hubData}
                  importMessage={importMessage}
                  importHubFile={importHubFile}
                  removeImport={removeImport}
                  version={APP_VERSION}
                />
              )}
            </>
          )}
        </main>

        <nav className="bottom-nav" aria-label="Hovedmeny">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button key={key} className={!selectedGame && active === key ? 'active' : ''} onClick={() => navigate(key)}>
              <Icon size={20} strokeWidth={!selectedGame && active === key ? 2.5 : 2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function HomePage({ nextGame, matchday, currentPlan, updatePlan, openGames, openGame }: {
  nextGame: Game
  matchday: boolean
  currentPlan: (id: string) => AttendancePlan
  updatePlan: (id: string, plan: AttendancePlan) => void
  openGames: () => void
  openGame: (game: Game) => void
}) {
  const plan = currentPlan(nextGame.id)
  const ready = plan === 'yes' ? 50 : plan === 'maybe' ? 25 : 0
  const upcoming = games.filter((game) => new Date(game.startsAt).getTime() > Date.now()).slice(0, 4)
  const ehlCount = games.filter((game) => game.competition === 'EHL').length
  const chlCount = games.filter((game) => game.competition === 'CHL').length

  return (
    <>
      {matchday && (
        <section className="matchday-banner">
          <span>KAMPDAG</span><strong>I DAG GJELDER DET</strong>
          <p>{nextGame.homeTeam} – {nextGame.awayTeam} · {timeText(nextGame)} · {nextGame.arena}</p>
        </section>
      )}

      <section className={`hero-card ${nextGame.competition === 'CHL' ? 'chl' : ''} ${matchday ? 'is-matchday' : ''}`}>
        <div className="section-kicker"><span>{matchday ? 'KAMPDAG' : 'NESTE KAMP'}</span><span className="competition-pill">{nextGame.competition}</span></div>
        <div className="hero-teams">
          <TeamMark name={nextGame.homeTeam} primary={nextGame.homeTeam === 'Storhamar'} />
          <div className="hero-center"><span>{dateText(nextGame)}</span><strong>{isFinished(nextGame) ? `${nextGame.homeScore}–${nextGame.awayScore}` : timeText(nextGame)}</strong><small>{isHome(nextGame) ? 'HJEMME' : 'BORTE'}</small></div>
          <TeamMark name={nextGame.awayTeam} primary={nextGame.awayTeam === 'Storhamar'} />
        </div>
        <div className="arena-line"><MapPin size={15} /> {nextGame.arena}</div>
        <button className="open-game" onClick={() => openGame(nextGame)}>Åpne kampen <ChevronRight size={18} /></button>
      </section>

      {!isFinished(nextGame) && (
        <section className="card attendance-card">
          <div className="card-heading"><div><span className="eyebrow">PLAN</span><h2>Skal du dit?</h2></div><span className="plan-status">{planLabel(plan)}</span></div>
          <AttendanceButtons value={plan} onChange={(value) => updatePlan(nextGame.id, value)} />
        </section>
      )}

      <section className="card matchday-hub">
        <div className="card-heading"><div><span className="eyebrow">KAMPDAG</span><h2>{ready}% klar</h2></div><div className="progress-ring"><span>{ready}</span></div></div>
        <div className="progress-track"><div style={{ width: `${ready}%` }} /></div>
        <p>{plan === 'yes' ? 'Du planlegger å dra. Kampen teller først etter at faktisk oppmøte er bekreftet.' : 'Svar på om du planlegger å dra.'}</p>
        <div className="quick-actions">
          <button onClick={() => openGame(nextGame)}><Route size={18} /><span>Reise</span></button>
          <button onClick={() => openGame(nextGame)}><WalletCards size={18} /><span>Utgifter</span></button>
          <button onClick={() => openGame(nextGame)}><Clock3 size={18} /><span>DRA</span></button>
        </div>
      </section>

      <section className="section-block">
        <div className="section-title-row"><div><span className="eyebrow">KALENDER</span><h2>Kommende kamper</h2></div><button className="text-button" onClick={openGames}>Alle kamper</button></div>
        <div className="game-list">{upcoming.map((game) => <GameRow key={game.id} game={game} plan={currentPlan(game.id)} onOpen={() => openGame(game)} />)}</div>
      </section>

      <section className="card season-card">
        <div className="section-kicker"><span>2026/27 · CURRENT</span></div>
        <h2>Storhamars sesong</h2>
        <div className="stat-grid"><div><strong>{ehlCount}</strong><span>EHL-kamper</span></div><div><strong>{chlCount}</strong><span>CHL-kamper</span></div><div><strong>{games.length}</strong><span>Kamper totalt</span></div></div>
        <p>Hele 2026/27-kalenderen, inkludert treningskamper og allerede spilte kamper.</p>
      </section>

      <section className="merit-grid"><article className="card merit-card"><Trophy /><span>NM-GULL</span><strong>10</strong></article><article className="card merit-card"><Shield /><span>SERIEGULL</span><strong>11</strong></article></section>
      <section className="history-hero"><span>1957</span><h2>Storhamar-historien</h2><p>Fra uteisen til dagens Storhamar.</p><button>Utforsk tidslinjen <ChevronRight size={18} /></button></section>
    </>
  )
}

function AttendanceButtons({ value, onChange }: { value: AttendancePlan; onChange: (value: AttendancePlan) => void }) {
  const choices: { value: AttendancePlan; label: string; icon: typeof Check }[] = [
    { value: 'yes', label: 'Ja', icon: Check },
    { value: 'maybe', label: 'Kanskje', icon: UserRound },
    { value: 'no', label: 'Nei', icon: X },
  ]
  return <div className="attendance-buttons">{choices.map(({ value: option, label, icon: Icon }) => <button key={option} className={value === option ? `selected ${option}` : ''} onClick={() => onChange(option)}><Icon size={18} /> {label}</button>)}</div>
}

function GamesPage({ currentPlan, updatePlan, openGame, records }: {
  currentPlan: (id: string) => AttendancePlan
  updatePlan: (id: string, plan: AttendancePlan) => void
  openGame: (game: Game) => void
  records: Record<string, GameDayRecord>
}) {
  const now = Date.now()
  const past = games.filter((game) => new Date(game.startsAt).getTime() < now)
  const future = games.filter((game) => new Date(game.startsAt).getTime() >= now)
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">2026/27 · {games.length} KAMPER</span><h1>Kamper</h1><p>Trykk på en kamp for kampdetalj, attendance og reise.</p></div>
      {future.length > 0 && <><div className="games-subheading"><span>KOMMENDE</span><strong>{future.length}</strong></div><div className="game-card-list">{future.map((game) => <article className={`card full-game-card ${game.competition === 'CHL' ? 'chl-border' : ''}`} key={game.id}><GameRow game={game} plan={currentPlan(game.id)} onOpen={() => openGame(game)} /><AttendanceButtons value={currentPlan(game.id)} onChange={(value) => updatePlan(game.id, value)} /></article>)}</div></>}
      {past.length > 0 && <><div className="games-subheading past-heading"><span>TIDLIGERE KAMPER</span><strong>{past.length}</strong></div><div className="game-card-list">{[...past].reverse().map((game) => <article className={`card full-game-card past-game ${game.competition === 'CHL' ? 'chl-border' : ''}`} key={game.id}><GameRow game={game} plan={currentPlan(game.id)} onOpen={() => openGame(game)} actual={records[game.id]?.completed ? records[game.id].attendanceActual : undefined} /></article>)}</div></>}
    </section>
  )
}

function GameDetail({ game, plan, updatePlan, trip, record, smartEvents, onBack, onSaveTrip, onDeleteTrip, onSaveRecord, onSmartEvent }: {
  game: Game
  plan: AttendancePlan
  updatePlan: (plan: AttendancePlan) => void
  trip?: Trip
  record?: GameDayRecord
  smartEvents: SmartGameDayEvent[]
  onBack: () => void
  onSaveTrip: (trip: Trip) => void
  onDeleteTrip: (tripId: string) => void
  onSaveRecord: (record: GameDayRecord) => void
  onSmartEvent: (event: SmartGameDayEvent) => void
}) {
  const [draft, setDraft] = useState<Trip>(() => cloneTrip(trip ?? createTripForGame(game)))
  const [savedMessage, setSavedMessage] = useState('')
  const temporalState = getGameTemporalState(game)
  const future = temporalState === 'FUTURE' || temporalState === 'GAME_DAY_BEFORE_START'
  const hasSavedTrip = Boolean(trip)

  const sortedLegs = [...draft.legs].sort((a, b) => a.order - b.order)
  const totalKm = sortedLegs.reduce((sum, leg) => sum + (leg.km ?? 0), 0)
  const totalCost = sortedLegs.reduce((sum, leg) => sum + (leg.estimatedCost ?? 0), 0)
  const totalMinutes = sortedLegs.reduce((sum, leg) => sum + (leg.durationMinutes ?? 0), 0)
  const outbound = sortedLegs.filter((leg) => leg.direction === 'outbound')
  const outboundReady = outbound.length > 0 && outbound.every((leg) => typeof leg.durationMinutes === 'number' && leg.durationMinutes >= 0)
  const outboundMinutes = outbound.reduce((sum, leg) => sum + (leg.durationMinutes ?? 0), 0)
  const draDate = outboundReady ? new Date(new Date(game.startsAt).getTime() - (draft.desiredArrivalMinutesBefore + outboundMinutes) * 60_000) : null
  const invalidLeg = sortedLegs.some((leg) => !leg.fromName.trim() || !leg.toName.trim())

  function normalizeLegs(legs: TripLeg[]) { return legs.map((leg, index) => ({ ...leg, order: index })) }
  function updateLeg(id: string, patch: Partial<TripLeg>) { setSavedMessage(''); setDraft((current) => ({ ...current, legs: current.legs.map((leg) => leg.id === id ? { ...leg, ...patch } : leg) })) }
  function addLeg(direction: TripLeg['direction']) { setSavedMessage(''); setDraft((current) => ({ ...current, legs: normalizeLegs([...current.legs, createLeg(current.legs.length, direction)]) })) }
  function removeLeg(id: string) { setSavedMessage(''); setDraft((current) => ({ ...current, legs: normalizeLegs(current.legs.filter((leg) => leg.id !== id)) })) }
  function duplicateLeg(id: string) {
    setSavedMessage('')
    setDraft((current) => {
      const index = current.legs.findIndex((leg) => leg.id === id)
      if (index < 0) return current
      const duplicate = { ...current.legs[index], id: `leg:${Date.now()}:${Math.random().toString(36).slice(2, 8)}` }
      const next = [...current.legs]; next.splice(index + 1, 0, duplicate)
      return { ...current, legs: normalizeLegs(next) }
    })
  }
  function moveLeg(id: string, direction: -1 | 1) {
    setSavedMessage('')
    setDraft((current) => {
      const next = [...current.legs].sort((a, b) => a.order - b.order)
      const index = next.findIndex((leg) => leg.id === id); const target = index + direction
      if (index < 0 || target < 0 || target >= next.length) return current
      ;[next[index], next[target]] = [next[target], next[index]]
      return { ...current, legs: normalizeLegs(next) }
    })
  }
  function save() {
    if (invalidLeg || draft.legs.length === 0) return
    const next: Trip = { ...draft, legs: normalizeLegs(sortedLegs), updatedAt: new Date().toISOString() }
    onSaveTrip(next); setDraft(cloneTrip(next)); setSavedMessage('Reisen er lagret og beholdes etter refresh.')
  }
  function removeSavedTrip() {
    if (!trip) return
    onDeleteTrip(trip.id); setDraft(createTripForGame(game)); setSavedMessage('Den lagrede reisen er slettet.')
  }

  return (
    <section className="game-detail-page">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Tilbake til kamper</button>
      <article className={`game-detail-hero ${game.competition === 'CHL' ? 'chl' : ''}`}>
        <div className="section-kicker"><span>{game.competition} · {game.season}</span><span>{isHome(game) ? 'HJEMME' : 'BORTE'}</span></div>
        <div className="detail-matchup"><TeamMark name={game.homeTeam} primary={game.homeTeam === 'Storhamar'} /><div className="detail-score">{isFinished(game) ? <><strong>{game.homeScore}–{game.awayScore}</strong><span>FERDIG{decisionLabel(game)}</span></> : <><strong>{timeText(game)}</strong><span>{dateText(game)}</span></>}</div><TeamMark name={game.awayTeam} primary={game.awayTeam === 'Storhamar'} /></div>
        <div className="detail-meta"><span><CalendarDays size={14} /> {fullDateText(game)}</span><span><MapPin size={14} /> {game.arena}{game.city ? ` · ${game.city}` : ''}</span></div>
        {record?.completed && <div className={`actual-badge ${record.attendanceActual}`}>{actualLabel(record.attendanceActual)}</div>}
      </article>

      {future ? (
        <article className="card detail-card"><div className="card-heading"><div><span className="eyebrow">PLAN · TELLER IKKE SOM OPPMØTE</span><h2>Skal du dit?</h2></div><span className="plan-status">{planLabel(plan)}</span></div><AttendanceButtons value={plan} onChange={updatePlan} /></article>
      ) : temporalState === 'IN_PROGRESS' ? (
        <article className="notice-card detail-notice"><Clock3 size={20} /><div><strong>Kampen pågår</strong><p>Oppmøte kan først bekreftes etter kampen. GPS kan brukes som signal i mellomtiden.</p></div></article>
      ) : null}

      <SmartGameDayPanel game={game} events={smartEvents} record={record} onEvent={onSmartEvent} />

      <article className="card detail-card travel-card">
        <div className="card-heading"><div><span className="eyebrow">REISE</span><h2>{hasSavedTrip ? 'Lagret reise' : 'Planlegg reisen'}</h2></div>{hasSavedTrip && <span className="saved-badge">{trip?.status === 'completed' ? 'GJENNOMFØRT' : 'LAGRET'}</span>}</div>
        <div className="travel-summary-grid"><div><span>KM</span><strong>{totalKm > 0 ? Math.round(totalKm) : '—'}</strong></div><div><span>TID</span><strong>{totalMinutes > 0 ? `${totalMinutes}m` : '—'}</strong></div><div><span>KOSTNAD</span><strong>{totalCost > 0 ? formatMoney(totalCost) : '—'}</strong></div><div><span>DRA</span><strong>{draDate ? new Intl.DateTimeFormat('nb-NO', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo' }).format(draDate) : '—'}</strong></div></div>
        <label className="arrival-setting"><span>Ønsket tid ved arena</span><select value={draft.desiredArrivalMinutesBefore} onChange={(event) => setDraft((current) => ({ ...current, desiredArrivalMinutesBefore: Number(event.target.value) }))}><option value={15}>15 min før</option><option value={30}>30 min før</option><option value={45}>45 min før</option><option value={60}>60 min før</option><option value={90}>90 min før</option></select></label>
        <div className="trip-legs">{sortedLegs.map((leg, index) => <TripLegEditor key={leg.id} leg={leg} index={index} count={sortedLegs.length} onUpdate={(patch) => updateLeg(leg.id, patch)} onDelete={() => removeLeg(leg.id)} onDuplicate={() => duplicateLeg(leg.id)} onMoveUp={() => moveLeg(leg.id, -1)} onMoveDown={() => moveLeg(leg.id, 1)} />)}</div>
        <div className="add-leg-row"><button onClick={() => addLeg('outbound')}><Plus size={16} /> Etappe til arena</button><button onClick={() => addLeg('return')}><Plus size={16} /> Etappe hjem</button></div>
        {draft.legs.length === 0 && <p className="save-warning">Legg til minst én etappe før reisen kan lagres.</p>}
        {invalidLeg && <p className="save-warning">Fyll inn både fra og til på alle etapper før du lagrer.</p>}
        {savedMessage && <p className="save-success">{savedMessage}</p>}
        <div className="travel-actions"><button className="primary-action" onClick={save} disabled={invalidLeg || draft.legs.length === 0}><Save size={17} /> Lagre reisen</button>{trip && <button className="danger-action" onClick={removeSavedTrip}><Trash2 size={16} /> Slett reisen</button>}</div>
        {!outboundReady && <p className="travel-footnote">DRA beregnes når alle etappene til arena har reisetid. Automatisk Google Routes kommer i neste steg.</p>}
        {trip?.status !== 'completed' && <p className="travel-footnote">Planlagte km teller ikke i Min Storhamar før kampdagen er bekreftet som gjennomført.</p>}
      </article>

      {canConfirmAttendance(game) && (
        <GameDayCompletion
          game={game}
          record={record}
          trip={trip}
          smartEvents={smartEvents}
          onSaveRecord={onSaveRecord}
          onSaveTrip={onSaveTrip}
        />
      )}
    </section>
  )
}

function SmartGameDayPanel({ game, events, record, onEvent }: {
  game: Game
  events: SmartGameDayEvent[]
  record?: GameDayRecord
  onEvent: (event: SmartGameDayEvent) => void
}) {
  const arena = arenaForGame(game)
  const [tracking, setTracking] = useState(false)
  const [proximity, setProximity] = useState<ArenaProximity>('outside')
  const [distance, setDistance] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [error, setError] = useState('')
  const watchId = useRef<number | null>(null)
  const proximityRef = useRef<ArenaProximity>('outside')
  const matchday = isGameDay(game)
  const canTrack = matchday && arena?.latitude != null && arena.longitude != null
  const suggestAttendance = !record?.completed && shouldSuggestAttendance(game, events)

  useEffect(() => () => {
    if (watchId.current != null && 'geolocation' in navigator) navigator.geolocation.clearWatch(watchId.current)
  }, [])

  function processPosition(position: GeolocationPosition) {
    if (!arena || arena.latitude == null || arena.longitude == null) return
    const meters = distanceMeters(position.coords.latitude, position.coords.longitude, arena.latitude, arena.longitude)
    const nextProximity = classifyArenaProximity(arena, meters)
    const smartEvent = eventFromPosition(game, position, proximityRef.current)
    proximityRef.current = nextProximity
    setProximity(nextProximity)
    setDistance(Math.round(meters))
    setAccuracy(Math.round(position.coords.accuracy))
    setError('')
    if (smartEvent && matchday) onEvent(smartEvent)
  }

  function startTracking() {
    if (!canTrack) return
    if (!('geolocation' in navigator)) { setError('Posisjon støttes ikke på denne enheten.'); return }
    if (watchId.current != null) return
    const id = navigator.geolocation.watchPosition(processPosition, (geoError) => {
      setError(geoError.code === 1 ? 'Posisjonstillatelse ble ikke gitt.' : 'Kunne ikke hente posisjon akkurat nå.')
      setTracking(false)
    }, { enableHighAccuracy: true, maximumAge: 30_000, timeout: 20_000 })
    watchId.current = id
    setTracking(true)
  }

  function stopTracking() {
    if (watchId.current != null && 'geolocation' in navigator) navigator.geolocation.clearWatch(watchId.current)
    watchId.current = null
    setTracking(false)
  }

  function checkOnce() {
    if (!canTrack || !('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(processPosition, () => setError('Kunne ikke hente posisjon akkurat nå.'), { enableHighAccuracy: true, maximumAge: 30_000, timeout: 15_000 })
  }

  const lastEvent = [...events].sort((a, b) => b.observedAt.localeCompare(a.observedAt))[0]

  return (
    <article className="card detail-card smart-game-day-card">
      <div className="card-heading"><div><span className="eyebrow">SMART KAMPDAG · GPS</span><h2>Posisjon ved arena</h2></div><span className={`gps-dot ${tracking ? 'live' : ''}`} /></div>
      {!arena ? <p className="travel-footnote">Arenaen mangler GPS-punkt i arena-registeret ennå.</p> : !matchday ? <p className="travel-footnote">Smart Kampdag aktiveres på selve kampdatoen. GPS brukes ikke til å registrere oppmøte på forhånd.</p> : (
        <>
          <div className="gps-status-grid"><div><span>STATUS</span><strong>{proximity === 'arrived' ? 'VED ARENA' : proximity === 'near' ? 'NÆR ARENA' : 'UTENFOR'}</strong></div><div><span>AVSTAND</span><strong>{distance == null ? '—' : distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(1)} km`}</strong></div></div>
          <div className="gps-actions">{tracking ? <button className="danger-action" onClick={stopTracking}><Navigation size={16} /> Stopp GPS</button> : <button className="primary-action" onClick={startTracking}><Navigation size={16} /> Start Smart Kampdag</button>}<button className="secondary-action" onClick={checkOnce}><LocateFixed size={16} /> Sjekk nå</button></div>
          {accuracy != null && <p className="travel-footnote">GPS-nøyaktighet ca. ±{accuracy} m. Det lagres ikke noe kontinuerlig rått GPS-spor.</p>}
        </>
      )}
      {lastEvent && <div className="gps-last-event"><CheckCircle2 size={15} /><span>Siste signal: {lastEvent.type === 'arrived_at_arena' ? 'ankom arena' : lastEvent.type === 'near_arena' ? 'nær arena' : 'forlot arena'} · {new Intl.DateTimeFormat('nb-NO', { hour: '2-digit', minute: '2-digit' }).format(new Date(lastEvent.observedAt))}</span></div>}
      {suggestAttendance && <div className="gps-suggestion"><strong>GPS tyder på at du var på kampen.</strong><span>Dette teller fortsatt ikke før du bekrefter under «Fullfør kampdagen».</span></div>}
      {error && <p className="save-warning">{error}</p>}
    </article>
  )
}

function GameDayCompletion({ game, record, trip, smartEvents, onSaveRecord, onSaveTrip }: {
  game: Game
  record?: GameDayRecord
  trip?: Trip
  smartEvents: SmartGameDayEvent[]
  onSaveRecord: (record: GameDayRecord) => void
  onSaveTrip: (trip: Trip) => void
}) {
  const [draft, setDraft] = useState<GameDayRecord>(() => record ? { ...record } : blankGameDayRecord(game.id))
  const [message, setMessage] = useState('')
  const gpsSuggested = shouldSuggestAttendance(game, smartEvents)

  function setActual(actual: AttendanceActual) {
    setMessage('')
    setDraft((current) => ({
      ...current,
      attendanceActual: actual,
      entryType: actual === 'attended' ? current.entryType : 'unknown',
      ticketCost: actual === 'attended' ? current.ticketCost : null,
    }))
  }

  function complete() {
    const now = new Date().toISOString()
    const next: GameDayRecord = { ...draft, completed: true, completedAt: now, updatedAt: now }
    onSaveRecord(next)
    setDraft(next)
    if (next.attendanceActual === 'attended' && trip) onSaveTrip({ ...trip, status: 'completed', updatedAt: now })
    setMessage(next.attendanceActual === 'attended' ? 'Kampdagen er fullført. Kampen teller nå i Min Storhamar.' : 'Kampdagen er lagret. Kampen teller ikke som sett.')
  }

  return (
    <article className="card detail-card post-game-card">
      <div className="card-heading"><div><span className="eyebrow">ETTER KAMPEN</span><h2>Fullfør kampdagen</h2></div>{draft.completed && <span className="saved-badge">FULLFØRT</span>}</div>
      {gpsSuggested && !draft.completed && <div className="gps-suggestion"><strong>GPS-forslag: du var der</strong><span>Bekreft selv under. GPS alene teller aldri kampen.</span></div>}
      <div className="actual-attendance-buttons"><button className={draft.attendanceActual === 'attended' ? 'selected attended' : ''} onClick={() => setActual('attended')}><Check size={17} /> Jeg var der</button><button className={draft.attendanceActual === 'not_attended' ? 'selected not-attended' : ''} onClick={() => setActual('not_attended')}><X size={17} /> Jeg var ikke der</button><button className={draft.attendanceActual === 'unknown' ? 'selected unknown' : ''} onClick={() => setActual('unknown')}>Husker ikke</button></div>
      {draft.attendanceActual === 'attended' && <div className="post-game-fields"><label><span>Inngangstype</span><select value={draft.entryType} onChange={(event) => setDraft((current) => ({ ...current, entryType: event.target.value as EntryType, ticketCost: event.target.value === 'work_accreditation' && current.ticketCost == null ? 0 : current.ticketCost }))}>{entryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><label><span>Billettkostnad</span><input type="number" min="0" inputMode="decimal" placeholder="Ukjent" value={draft.ticketCost ?? ''} onChange={(event) => setDraft((current) => ({ ...current, ticketCost: numberOrNull(event.target.value) }))} /></label></div>}
      {draft.completed && <div className={`completed-summary ${draft.attendanceActual}`}><strong>{actualLabel(draft.attendanceActual)}</strong>{draft.attendanceActual === 'attended' && <span>{entryLabel(draft.entryType)} · {draft.ticketCost == null ? 'ukjent pris' : formatMoney(draft.ticketCost)}</span>}</div>}
      {message && <p className="save-success">{message}</p>}
      <button className="primary-action full-width" onClick={complete}><CheckCircle2 size={17} /> {draft.completed ? 'Lagre endringer' : 'Fullfør kampdagen'}</button>
      <p className="travel-footnote">Kun en fullført kampdag med «Jeg var der» teller som kamp sett. En tidligere planlagt «Ja» påvirker ikke statistikken.</p>
    </article>
  )
}

function TripLegEditor({ leg, index, count, onUpdate, onDelete, onDuplicate, onMoveUp, onMoveDown }: {
  leg: TripLeg
  index: number
  count: number
  onUpdate: (patch: Partial<TripLeg>) => void
  onDelete: () => void
  onDuplicate: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  return (
    <div className="trip-leg-card">
      <div className="trip-leg-header"><div><span className={`direction-dot ${leg.direction}`} /><strong>Etappe {index + 1}</strong><small>{leg.direction === 'outbound' ? 'TIL ARENA' : 'HJEMREISE'}</small></div><div className="leg-icon-actions"><button onClick={onMoveUp} disabled={index === 0} aria-label="Flytt opp"><ArrowUp size={15} /></button><button onClick={onMoveDown} disabled={index === count - 1} aria-label="Flytt ned"><ArrowDown size={15} /></button><button onClick={onDuplicate} aria-label="Dupliser"><Copy size={15} /></button><button onClick={onDelete} aria-label="Slett"><Trash2 size={15} /></button></div></div>
      <div className="trip-form-grid"><label><span>Retning</span><select value={leg.direction} onChange={(event) => onUpdate({ direction: event.target.value as TripLeg['direction'] })}><option value="outbound">Til arena</option><option value="return">Hjemreise</option></select></label><label><span>Transport</span><select value={leg.transport} onChange={(event) => onUpdate({ transport: event.target.value as TransportMode })}>{transportOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><label className="wide"><span>Fra</span><input value={leg.fromName} placeholder="Hjem" onChange={(event) => onUpdate({ fromName: event.target.value })} /></label><label className="wide"><span>Til</span><input value={leg.toName} placeholder="Arena / stasjon" onChange={(event) => onUpdate({ toName: event.target.value })} /></label><label><span>Km</span><input type="number" min="0" step="0.1" inputMode="decimal" value={leg.km ?? ''} placeholder="—" onChange={(event) => onUpdate({ km: numberOrNull(event.target.value) })} /></label><label><span>Minutter</span><input type="number" min="0" step="1" inputMode="numeric" value={leg.durationMinutes ?? ''} placeholder="—" onChange={(event) => onUpdate({ durationMinutes: numberOrNull(event.target.value) })} /></label><label className="wide"><span>Estimert kostnad</span><input type="number" min="0" step="1" inputMode="decimal" value={leg.estimatedCost ?? ''} placeholder="0 kr / ukjent" onChange={(event) => onUpdate({ estimatedCost: numberOrNull(event.target.value) })} /></label></div>
      <div className="leg-summary"><Route size={14} /><span>{transportLabel(leg.transport)} · {leg.fromName || 'Fra?'} → {leg.toName || 'Til?'}</span></div>
    </div>
  )
}

function CareerPage({ hubData, trips, records }: { hubData: HubExport | null; trips: Trip[]; records: Record<string, GameDayRecord> }) {
  const local = confirmedLocalCareerStats(records, trips)
  const importedAttendedIds = new Set((hubData?.attendance ?? []).filter((entry) => entry.attendanceActual === 'attended').map((entry) => entry.gameId))
  const localAttendedIds = new Set(Object.values(records).filter((entry) => entry.completed && entry.attendanceActual === 'attended').map((entry) => entry.gameId))
  const attendedIds = new Set([...importedAttendedIds, ...localAttendedIds])
  const importedKm = Math.round((hubData?.tripLegs ?? []).reduce((sum, leg) => sum + (typeof leg.km === 'number' ? leg.km : 0), 0))
  const achievements = hubData?.achievementUnlocks?.length ?? 0
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">DIN SUPPORTERREISE</span><h1>Karriere</h1><p>Bare faktisk bekreftede kampdager teller i den nye statistikken.</p></div>
      {!hubData && <div className="notice-card"><Database size={20} /><div><strong>Ingen historikk importert ennå</strong><p>Importer HUB-data under Mer for å få med gammel historikk.</p></div></div>}
      <div className="career-grid"><article className="stat-card"><strong>{attendedIds.size}</strong><span>Kamper sett</span></article><article className="stat-card"><strong>{importedKm + Math.round(local.km)}</strong><span>Bekreftede km</span></article><article className="stat-card"><strong>{local.completedTrips}</strong><span>Nye gjennomførte reiser</span></article><article className="stat-card"><strong>{achievements}</strong><span>Achievements</span></article></div>
      <article className="card achievement-card"><Medal size={28} /><div><span>VIKTIG REGEL</span><h3>Plan er ikke historikk</h3><p>«Ja» på en framtidig kamp og planlagte reiser gir ingen karrierestatistikk før kampdagen er fullført.</p></div></article>
    </section>
  )
}

function HistoryPage() {
  const categories = [['Tidslinjen', 'Fra 1957 til i dag'], ['Meritter', 'NM-gull og seriegull'], ['Spillere', 'Profiler gjennom tidene'], ['Arenaer', 'Fra uteisen til CC Amfi'], ['Europa', 'CHL og europacup'], ['Rekorder', 'Klubbrekorder og milepæler']]
  return <section className="page-section"><div className="page-heading"><span className="eyebrow">ARKIVET</span><h1>Historie</h1><p>Storhamars historie samlet i ett supporterarkiv.</p></div><div className="history-grid">{categories.map(([title, text]) => <button className="history-card" key={title}><div><strong>{title}</strong><span>{text}</span></div><ChevronRight /></button>)}</div></section>
}

function MorePage({ hubData, importMessage, importHubFile, removeImport, version }: { hubData: HubExport | null; importMessage: string; importHubFile: (file: File | undefined) => void; removeImport: () => void; version: string }) {
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">APPEN · v{version}</span><h1>Mer</h1><p>Import, innstillinger og data.</p></div>
      <article className="card version-card"><div><span className="eyebrow">VERSJON</span><strong>Mitt Storhamar v{version}</strong></div><p>Versjonsnummer følger SemVer. Små feilrettinger øker siste tall, nye funksjoner øker midterste tall.</p></article>
      <article className="card import-card"><div className="import-icon"><Upload /></div><h2>Importer Storhamar HUB</h2><p>Velg <code>storhamar-hub-data.json</code>. Fila lastes ikke opp til GitHub; dataene lagres lokalt på enheten din.</p><label className="file-button">Velg JSON-fil<input type="file" accept="application/json,.json" onChange={(event) => importHubFile(event.target.files?.[0])} /></label>{hubData && <div className="import-summary"><span>Schema v{hubData.schemaVersion}</span><span>{hubData.attendance?.length ?? 0} attendance</span><span>{hubData.trips?.length ?? 0} reiser</span></div>}{importMessage && <p className="import-message">{importMessage}</p>}{hubData && <button className="danger-text" onClick={removeImport}>Fjern importerte data</button>}</article>
      <article className="card settings-list"><button><Settings /><div><strong>Innstillinger</strong><span>Varsler, hjemsted og standardvalg</span></div><ChevronRight /></button><button><Route /><div><strong>Reiser</strong><span>Lagrede steder, biler og ruter</span></div><ChevronRight /></button><button><Database /><div><strong>Data</strong><span>Backup og eksport</span></div><ChevronRight /></button></article>
    </section>
  )
}

function GameRow({ game, plan, onOpen, actual }: { game: Game; plan: AttendancePlan; onOpen: () => void; actual?: AttendanceActual }) {
  const result = isFinished(game)
  return (
    <button className="game-row game-row-with-logos" onClick={onOpen} type="button">
      <div className="date-block"><strong>{new Intl.DateTimeFormat('nb-NO', { day: 'numeric', timeZone: 'Europe/Oslo' }).format(new Date(game.startsAt))}</strong><span>{new Intl.DateTimeFormat('nb-NO', { month: 'short', timeZone: 'Europe/Oslo' }).format(new Date(game.startsAt))}</span></div>
      <div className="logo-pair" aria-hidden="true"><TeamLogo team={game.homeTeam} /><TeamLogo team={game.awayTeam} /></div>
      <div className="game-row-main"><div className="game-meta"><span>{game.competition}</span><span>{isHome(game) ? 'HJEMME' : 'BORTE'}</span>{game.special && <span className="special-tag">{game.special}</span>}{!result && plan !== 'unset' && <span className={`tiny-plan ${plan}`}>{planLabel(plan)}</span>}{actual === 'attended' && <span className="tiny-actual">VAR DER</span>}</div><strong>{game.homeTeam} – {game.awayTeam}</strong><small>{game.arena} · {result ? 'Ferdig' : timeText(game)}</small></div>
      {result ? <div className="game-result"><strong>{game.homeScore}–{game.awayScore}</strong>{game.decisionType && game.decisionType !== 'REG' && <span>{decisionLabel(game).trim()}</span>}</div> : <ChevronRight size={18} />}
    </button>
  )
}

function TeamMark({ name, primary = false }: { name: string; primary?: boolean }) {
  return <div className={`team-mark ${primary ? 'primary' : ''}`}><TeamLogo team={name} hero /><small>{name.toUpperCase()}</small></div>
}

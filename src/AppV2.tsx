import { forwardRef, lazy, Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cloud,
  Database,
  History,
  Home,
  LocateFixed,
  MapPin,
  Medal,
  MoreHorizontal,
  Navigation,
  Route,
  Save,
  Settings,
  Shield,
  Trophy,
  Upload,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react'
import appPackage from '../package.json'
import PreDepartureChecklist from './PreDepartureChecklist'
import { GamePurchases } from './components/GamePurchases'
import { MinStorhamarPage } from './components/MinStorhamarPage'
import { LocalBackupManager } from './components/LocalBackupManager'
import { TravelPlanner, type TravelPlannerHandle } from './components/TravelPlanner'
import { arenaForGame } from './data/arenas'
import { games } from './data/games'
import { logoForTeam } from './data/teamLogos'
import { confirmedLocalCareerStats } from './lib/careerStats'
import { canConfirmAttendance, getGameTemporalState, isGameDay } from './lib/gameTime'
import { confirmedHistoricalAttendance } from './lib/historicalAttendance'
import { departureTimeForTrip } from './lib/notificationLogic'
import { gameFeatureClassNames, gameFeatures, gameStatusClass, travelRegistrationStatus } from './lib/gamePresentation'
import { deletePurchase, loadPurchases, purchasesForGame, savePurchase, summarizePurchases } from './lib/purchases'
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
import { deleteTrip, loadTrips, saveTrip, tripForGame } from './lib/trips'
import type {
  ArenaProximity,
  AttendanceActual,
  AttendancePlan,
  EntryType,
  Game,
  GameDayRecord,
  GamePurchase,
  HubExport,
  NavKey,
  SmartGameDayEvent,
  Trip,
} from './types'

const APP_VERSION = appPackage.version

// The archival dataset is large and never needed just to check tonight's game.
const HistoryArchivePage = lazy(async () => ({
  default: (await import('./components/HistoryArchivePage')).HistoryArchivePage,
}))

const navItems: { key: NavKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Hjem', icon: Home },
  { key: 'games', label: 'Kamper', icon: CalendarDays },
  { key: 'career', label: 'Min Storhamar', icon: Medal },
  { key: 'history', label: 'Historie', icon: History },
  { key: 'more', label: 'Mer', icon: MoreHorizontal },
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

  // Native travel and foreground Smart Kampdag run outside the game-details
  // component. Keep event hints live without ever auto-confirming attendance.
  useEffect(() => {
    const sync = () => setSmartEvents(loadSmartGameDayEvents())
    window.addEventListener('mitt-storhamar:smart-gameday-event', sync)
    return () => window.removeEventListener('mitt-storhamar:smart-gameday-event', sync)
  }, [])
  const [importMessage, setImportMessage] = useState('')
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips())
  const [purchases, setPurchases] = useState<GamePurchase[]>(() => loadPurchases())
  const [detailFocus, setDetailFocus] = useState<'top' | 'travel' | 'checklist'>('top')
  const [now, setNow] = useState(() => new Date())
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const refresh = () => setNow(new Date())
    const timer = window.setInterval(refresh, 60_000)
    window.addEventListener('focus', refresh)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  // Scroll only the app content. Direct shortcuts land on the actual section.
  useEffect(() => {
    const container = contentRef.current
    if (!container) return
    container.scrollTop = 0
    if (!selectedGameId || detailFocus === 'top') return
    const frame = window.requestAnimationFrame(() => {
      const selector = detailFocus === 'travel' ? '.travel-planner-card' : '.pre-departure-card'
      const target = container.querySelector<HTMLElement>(selector)
      if (target) {
        container.scrollTop += target.getBoundingClientRect().top - container.getBoundingClientRect().top - 12
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [active, selectedGameId, detailFocus])

  const today = osloDateKey(now)
  const todayGame = games.find((game) => gameDateKey(game) === today)
  const nextFutureGame = games.find((game) => new Date(game.startsAt).getTime() > now.getTime())
  const nextGame = todayGame ?? nextFutureGame ?? null
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

  function openGame(game: Game, focus: 'top' | 'travel' | 'checklist' = 'top') {
    setDetailFocus(focus)
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

  function persistPurchase(purchase: GamePurchase) {
    setPurchases(savePurchase(purchase))
  }

  function removePurchase(purchaseId: string) {
    setPurchases(deletePurchase(purchaseId))
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

        <main className="content" id="app-scroll-content" ref={contentRef}>
          {selectedGame ? (
            <GameDetail
              key={selectedGame.id}
              game={selectedGame}
              plan={currentPlan(selectedGame.id)}
              updatePlan={(plan) => updatePlan(selectedGame.id, plan)}
              trip={tripForGame(trips, selectedGame.id)}
              record={records[selectedGame.id]}
              purchases={purchasesForGame(purchases, selectedGame.id)}
              smartEvents={smartEvents.filter((event) => event.gameId === selectedGame.id)}
              onBack={() => setSelectedGameId(null)}
              backLabel={active === 'home' ? 'Tilbake til oversikten' : 'Tilbake til kamper'}
              onSaveTrip={persistTrip}
              onDeleteTrip={removeTrip}
              onSaveRecord={persistRecord}
              onSavePurchase={persistPurchase}
              onDeletePurchase={removePurchase}
              onSmartEvent={persistSmartEvent}
            />
          ) : (
            <>
              {active === 'home' && (
                <HomePage
                  nextGame={nextGame}
                  trip={nextGame ? tripForGame(trips, nextGame.id) : undefined}
                  matchday={matchday}
                  currentPlan={currentPlan}
                  updatePlan={updatePlan}
                  openGames={() => navigate('games')}
                  openHistory={() => navigate('history')}
                  openGame={openGame}
                />
              )}
              {active === 'games' && <GamesPage currentPlan={currentPlan} updatePlan={updatePlan} openGame={openGame} records={records} onSaveRecord={persistRecord} trips={trips} onSaveTrip={persistTrip} />}
              {active === 'career' && <MinStorhamarPage hubData={hubData} trips={trips} records={records} purchases={purchases} />}
              {active === 'history' && <Suspense fallback={<section className="page-section"><div className="card history-loading">Åpner Storhamar-arkivet…</div></section>}><HistoryArchivePage /></Suspense>}
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

function HomePage({ nextGame, trip, matchday, currentPlan, updatePlan, openGames, openHistory, openGame }: {
  nextGame: Game | null
  trip?: Trip
  matchday: boolean
  currentPlan: (id: string) => AttendancePlan
  updatePlan: (id: string, plan: AttendancePlan) => void
  openGames: () => void
  openHistory: () => void
  openGame: (game: Game, focus?: 'top' | 'travel' | 'checklist') => void
}) {
  const plan = nextGame ? currentPlan(nextGame.id) : 'unset'
  const upcoming = games.filter((game) => new Date(game.startsAt).getTime() > Date.now()).slice(0, 4)
  const ehlCount = games.filter((game) => game.competition === 'EHL').length
  const chlCount = games.filter((game) => game.competition === 'CHL').length
  const features = nextGame ? gameFeatures(nextGame) : []
  const departure = nextGame ? departureTimeForTrip(nextGame, trip) : null
  const departureLabel = departure ? new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo', weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit',
  }).format(departure) : null
  const planTitle = plan === 'yes' ? 'Du skal på kampen'
    : plan === 'maybe' ? 'Du vurderer å dra'
    : plan === 'no' ? 'Du skal ikke på kampen'
    : 'Har du planer om å dra?'

  return (
    <>
      {matchday && nextGame && (
        <section className="matchday-banner">
          <span>KAMPDAG</span><strong>I DAG GJELDER DET</strong>
          <p>{nextGame.homeTeam} – {nextGame.awayTeam} · {timeText(nextGame)} · {nextGame.arena}</p>
        </section>
      )}

      {nextGame ? (
        <>
          <section className={['hero-card', nextGame.competition === 'CHL' ? 'chl' : '', gameFeatureClassNames(nextGame), matchday ? 'is-matchday' : ''].filter(Boolean).join(' ')}>
            <div className="section-kicker"><span>{matchday ? 'KAMPDAG' : 'NESTE KAMP'}</span><span className="competition-pill">{nextGame.competition}</span></div>
            {features.length > 0 && <div className="hero-feature-row">{features.map((feature) => <span className={'game-feature-tag ' + feature.key} key={feature.key}>{feature.label}</span>)}</div>}
            <div className="hero-teams">
              <TeamMark name={nextGame.homeTeam} primary={nextGame.homeTeam === 'Storhamar'} />
              <div className="hero-center"><span>{dateText(nextGame)}</span><strong>{isFinished(nextGame) ? String(nextGame.homeScore) + '–' + String(nextGame.awayScore) : timeText(nextGame)}</strong><small>{isHome(nextGame) ? 'HJEMME' : 'BORTE'}</small></div>
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
            <div className="card-heading"><div><span className="eyebrow">DIN KAMPPLAN</span><h2>{planTitle}</h2></div></div>
            <div className="home-plan-status">
              <div><CheckCircle2 size={16} /><span>Skal du dit?</span><strong>{planLabel(plan)}</strong></div>
              <div><Route size={16} /><span>Reise</span><strong>{trip ? 'Lagret' : 'Ikke planlagt'}</strong></div>
              <div><Clock3 size={16} /><span>Avreise</span><strong>{departureLabel ?? 'Ikke valgt'}</strong></div>
            </div>
            <p>{plan === 'no'
              ? 'Du får ikke avreisevarsel for denne kampen. Du kan endre svaret ditt når som helst.'
              : 'Reiseplanen er din. Du kan velge avreisetid selv eller bruke beregningen.'}</p>
            {plan !== 'no' && <div className="quick-actions home-quick-actions">
              <button onClick={() => openGame(nextGame, 'travel')}><Route size={19}/><span>{trip ? 'Endre reisen' : 'Planlegg reisen'}</span></button>
              {(plan === 'yes' || plan === 'maybe') && <button onClick={() => openGame(nextGame, 'checklist')}><CheckCircle2 size={19}/><span>Sjekkliste</span></button>}
            </div>}
          </section>
        </>
      ) : (
        <section className="card season-ended-card">
          <span className="eyebrow">KAMPKALENDER</span>
          <h1>Ingen flere kamper registrert</h1>
          <p>Det kan fortsatt komme sluttspill eller endringer i terminlisten. Sjekk kampoversikten før du planlegger neste tur.</p>
          <button className="open-game" onClick={openGames}>Se alle registrerte kamper <ChevronRight size={18}/></button>
        </section>
      )}

      <section className="section-block">
        <div className="section-title-row"><div><span className="eyebrow">KALENDER</span><h2>Kommende kamper</h2></div><button className="text-button" onClick={openGames}>Alle kamper</button></div>
        {upcoming.length ? <div className="game-list">{upcoming.map((game) => <GameRow key={game.id} game={game} plan={currentPlan(game.id)} onOpen={() => openGame(game)} />)}</div> : <p className="home-calendar-empty">Ingen kommende kamper i appens terminliste akkurat nå.</p>}
      </section>

      <section className="card season-card">
        <div className="section-kicker"><span>2026/27 · SESONGOVERSIKT</span></div>
        <h2>Storhamars sesong</h2>
        <div className="stat-grid"><div><strong>{ehlCount}</strong><span>EHL-kamper</span></div><div><strong>{chlCount}</strong><span>CHL-kamper</span></div><div><strong>{games.length}</strong><span>Registrerte kamper</span></div></div>
        <p>Registrerte kamper fra 2026/27. Terminlisten kan få endringer og flere sluttspillkamper.</p>
      </section>

      <section className="merit-grid"><article className="card merit-card"><Trophy /><span>NM-GULL</span><strong>10</strong></article><article className="card merit-card"><Shield /><span>SERIEGULL</span><strong>11</strong></article></section>
      <section className="history-hero"><span>1957</span><h2>Storhamar-historien</h2><p>Fra uteisen til dagens Storhamar.</p><button onClick={openHistory}>Utforsk historien <ChevronRight size={18}/></button></section>
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

function HistoricalAttendanceButtons({ record, onYes, onNo }: {
  record?: GameDayRecord
  onYes: () => void
  onNo: () => void
}) {
  const attended = record?.completed && record.attendanceActual === 'attended'
  const notAttended = record?.completed && record.attendanceActual === 'not_attended'
  return (
    <div className="past-attendance-buttons">
      <button className={attended ? 'selected yes' : ''} onClick={onYes}><Check size={18} /> Ja</button>
      <button className={notAttended ? 'selected no' : ''} onClick={onNo}><X size={18} /> Nei</button>
    </div>
  )
}

function GamesPage({ currentPlan, updatePlan, openGame, records, onSaveRecord, trips, onSaveTrip }: {
  currentPlan: (id: string) => AttendancePlan
  updatePlan: (id: string, plan: AttendancePlan) => void
  openGame: (game: Game) => void
  records: Record<string, GameDayRecord>
  onSaveRecord: (record: GameDayRecord) => void
  trips: Trip[]
  onSaveTrip: (trip: Trip) => void
}) {
  const [filter, setFilter] = useState<'all' | 'past' | 'future'>('all')
  const now = Date.now()
  const past = games.filter((game) => new Date(game.startsAt).getTime() < now)
  const future = games.filter((game) => new Date(game.startsAt).getTime() >= now)

  function markHistoricalAttendance(game: Game, actual: 'attended' | 'not_attended') {
    onSaveRecord(confirmedHistoricalAttendance(game.id, actual, records[game.id]))
    const existingTrip = tripForGame(trips, game.id)
    if (existingTrip && existingTrip.status !== (actual === 'attended' ? 'completed' : 'planned')) {
      onSaveTrip({ ...existingTrip, status: actual === 'attended' ? 'completed' : 'planned', updatedAt: new Date().toISOString() })
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">2026/27 · {games.length} KAMPER</span><h1>Kamper</h1><p>Sorter mellom gamle og kommende kamper. På gamle kamper kan du raskt registrere om du var der.</p></div>

      <div className="game-filter-bar" role="group" aria-label="Filtrer kamper">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Alle <strong>{games.length}</strong></button>
        <button className={filter === 'past' ? 'active' : ''} onClick={() => setFilter('past')}>Gamle <strong>{past.length}</strong></button>
        <button className={filter === 'future' ? 'active' : ''} onClick={() => setFilter('future')}>Kommende <strong>{future.length}</strong></button>
      </div>

      {filter !== 'past' && future.length > 0 && <><div className="games-subheading"><span>KOMMENDE</span><strong>{future.length}</strong></div><div className="game-card-list">{future.map((game) => {
        const plan = currentPlan(game.id)
        return <article className={`card full-game-card ${gameFeatureClassNames(game)} ${gameStatusClass(game, plan, records[game.id], now)}`} key={game.id}><GameRow game={game} plan={plan} onOpen={() => openGame(game)} /><AttendanceButtons value={plan} onChange={(value) => updatePlan(game.id, value)} /></article>
      })}</div></>}

      {filter !== 'future' && past.length > 0 && <><div className="games-subheading past-heading"><span>TIDLIGERE KAMPER</span><strong>{past.length}</strong></div><div className="game-card-list">{[...past].reverse().map((game) => {
        const record = records[game.id]
        const plan = currentPlan(game.id)
        const travelStatus = travelRegistrationStatus(game.id, record, trips)
        return (
          <article className={`card full-game-card past-game ${gameFeatureClassNames(game)} ${gameStatusClass(game, plan, record, now)}`} key={game.id}>
            <GameRow game={game} plan={plan} onOpen={() => openGame(game)} actual={record?.completed ? record.attendanceActual : undefined} />
            {travelStatus && (
              <button
                type="button"
                className={`past-trip-status ${travelStatus}`}
                onClick={() => openGame(game)}
                aria-label={travelStatus === 'saved' ? 'Reise lagret. Åpne kampen for å se eller endre reisen.' : 'Reise ikke lagret. Åpne kampen for å legge inn reisen.'}
              >
                {travelStatus === 'saved' ? <CheckCircle2 size={15} /> : <Route size={15} />}
                <span>{travelStatus === 'saved' ? 'Reise lagret' : 'Reise ikke lagret'}</span>
                <ChevronRight size={15} />
              </button>
            )}
            <HistoricalAttendanceButtons record={record} onYes={() => markHistoricalAttendance(game, 'attended')} onNo={() => markHistoricalAttendance(game, 'not_attended')} />
          </article>
        )
      })}</div></>}
    </section>
  )
}

function GameDetail({ game, plan, updatePlan, trip, record, purchases, smartEvents, onBack, backLabel, onSaveTrip, onDeleteTrip, onSaveRecord, onSavePurchase, onDeletePurchase, onSmartEvent }: {
  game: Game
  plan: AttendancePlan
  updatePlan: (plan: AttendancePlan) => void
  trip?: Trip
  record?: GameDayRecord
  purchases: GamePurchase[]
  smartEvents: SmartGameDayEvent[]
  onBack: () => void
  backLabel: string
  onSaveTrip: (trip: Trip) => void
  onDeleteTrip: (tripId: string) => void
  onSaveRecord: (record: GameDayRecord) => void
  onSavePurchase: (purchase: GamePurchase) => void
  onDeletePurchase: (purchaseId: string) => void
  onSmartEvent: (event: SmartGameDayEvent) => void
}) {
  const temporalState = getGameTemporalState(game)
  const future = temporalState === 'FUTURE' || temporalState === 'GAME_DAY_BEFORE_START'
  const features = gameFeatures(game)
  const travelPlannerRef = useRef<TravelPlannerHandle>(null)
  const completionRef = useRef<GameDayCompletionHandle>(null)
  const [saveFeedback, setSaveFeedback] = useState<{ success: boolean; message: string } | null>(null)

  function saveAllFromBottom() {
    // Validate before either write so an invalid route never leaves half a saved matchday.
    const check = travelPlannerRef.current?.validate()
    if (!check || !check.success) {
      setSaveFeedback({ success: false, message: check?.message ?? 'Reiseskjemaet er ikke klart.' })
      return
    }
    const attendance = completionRef.current?.save()
    const result = travelPlannerRef.current?.save(attendance ? attendance.attendanceActual === 'attended' : undefined)
    if (!result) return
    setSaveFeedback(result.success
      ? { success: true, message: attendance ? 'Hele kampdagen er lagret. Oppmøte, billett og reise er oppdatert.' : result.message }
      : { success: false, message: result.message })
  }

  return (
    <section className="game-detail-page">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> {backLabel}</button>
      <article className={`game-detail-hero ${game.competition === 'CHL' ? 'chl' : ''} ${gameFeatureClassNames(game)}`}>
        <div className="section-kicker"><span>{game.competition} · {game.season}</span><span>{isHome(game) ? 'HJEMME' : 'BORTE'}</span></div>
        {features.length > 0 && <div className="hero-feature-row">{features.map((feature) => <span className={`game-feature-tag ${feature.key}`} key={feature.key}>{feature.label}</span>)}</div>}
        <div className="detail-matchup"><TeamMark name={game.homeTeam} primary={game.homeTeam === 'Storhamar'} /><div className="detail-score">{isFinished(game) ? <><strong>{game.homeScore}–{game.awayScore}</strong><span>FERDIG{decisionLabel(game)}</span></> : <><strong>{timeText(game)}</strong><span>{dateText(game)}</span></>}</div><TeamMark name={game.awayTeam} primary={game.awayTeam === 'Storhamar'} /></div>
        <div className="detail-meta"><span><CalendarDays size={14} /> {fullDateText(game)}</span><span><MapPin size={14} /> {game.arena}{game.city ? ` · ${game.city}` : ''}</span></div>
        {record?.completed && <div className={`actual-badge ${record.attendanceActual}`}>{actualLabel(record.attendanceActual)}</div>}
      </article>

      {future ? (
        <article className="card detail-card"><div className="card-heading"><div><span className="eyebrow">PLAN · TELLER IKKE SOM OPPMØTE</span><h2>Skal du dit?</h2></div><span className="plan-status">{planLabel(plan)}</span></div><AttendanceButtons value={plan} onChange={updatePlan} /></article>
      ) : temporalState === 'IN_PROGRESS' ? (
        <article className="notice-card detail-notice"><Clock3 size={20} /><div><strong>Kampen pågår</strong><p>Oppmøte kan først bekreftes etter kampen. GPS kan brukes som signal i mellomtiden.</p></div></article>
      ) : null}

      <PreDepartureChecklist game={game} plan={plan} />

      <SmartGameDayPanel game={game} events={smartEvents} record={record} onEvent={onSmartEvent} />

      <TravelPlanner ref={travelPlannerRef} game={game} trip={trip} onSaveTrip={onSaveTrip} onDeleteTrip={onDeleteTrip} />

      {canConfirmAttendance(game) && (
        <>
          <GameDayCompletion
            ref={completionRef}
            game={game}
            record={record}
            smartEvents={smartEvents}
            onSaveRecord={onSaveRecord}
          />
          <GamePurchases game={game} purchases={purchases} onSave={onSavePurchase} onDelete={onDeletePurchase} />
        </>
      )}

      <article className="card detail-card game-final-save-card">
        <div className="card-heading"><div><span className="eyebrow">AVSLUTT</span><h2>{canConfirmAttendance(game) ? 'Lagre kampdagen' : 'Lagre reisen'}</h2></div></div>
        <p className="travel-footnote">{canConfirmAttendance(game) ? 'Oppmøte, billett, reise og reisefølge lagres samlet her.' : 'Reise og reisefølge lagres her.'} Kjøp lagres når du legger dem til.</p>
        {saveFeedback && <p role="status" className={saveFeedback.success ? 'save-success' : 'save-warning'}>{saveFeedback.message}</p>}
        <button className="primary-action full-width unified-travel-save" onClick={saveAllFromBottom}>
          <Save size={18} /> {canConfirmAttendance(game) ? 'Lagre hele kampdagen' : 'Lagre hele reisen'}
        </button>
        {saveFeedback?.success && (
          <button className="secondary-action full-width game-final-back" onClick={onBack}>
            <ArrowLeft size={17} /> {backLabel}
          </button>
        )}
      </article>
    </section>
  )
}

type LocationPermissionState = 'checking' | 'granted' | 'prompt' | 'denied' | 'unsupported'

function locationErrorMessage(error: GeolocationPositionError) {
  if (error.code === error.PERMISSION_DENIED) return 'Posisjon er blokkert. Tillat posisjon for Mitt Storhamar i nettleseren og prøv igjen.'
  if (error.code === error.POSITION_UNAVAILABLE) return 'Telefonen finner ikke posisjonen akkurat nå. Sjekk at posisjon/GPS er slått på.'
  if (error.code === error.TIMEOUT) return 'GPS brukte for lang tid. Gå gjerne nær et vindu eller utendørs og prøv igjen.'
  return 'Kunne ikke hente posisjon akkurat nå.'
}

function SmartGameDayPanel({ game, events, record, onEvent }: {
  game: Game
  events: SmartGameDayEvent[]
  record?: GameDayRecord
  onEvent: (event: SmartGameDayEvent) => void
}) {
  const arena = arenaForGame(game)
  const [tracking, setTracking] = useState(false)
  const [checking, setChecking] = useState(false)
  const [proximity, setProximity] = useState<ArenaProximity>('outside')
  const [distance, setDistance] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [permission, setPermission] = useState<LocationPermissionState>('checking')
  const [lastCheckedAt, setLastCheckedAt] = useState<Date | null>(null)
  const watchId = useRef<number | null>(null)
  const proximityRef = useRef<ArenaProximity>('outside')
  const matchday = isGameDay(game)
  const hasArenaPosition = Boolean(arena && arena.latitude != null && arena.longitude != null)
  const geolocationSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator
  const secureContext = typeof window === 'undefined' || window.isSecureContext
  const canCheckPosition = hasArenaPosition && geolocationSupported && secureContext
  const canTrack = matchday && canCheckPosition
  const suggestAttendance = !record?.completed && shouldSuggestAttendance(game, events)

  useEffect(() => {
    let active = true
    let permissionStatus: PermissionStatus | null = null

    async function checkPermission() {
      if (!geolocationSupported || !secureContext) {
        if (active) setPermission('unsupported')
        return
      }
      if (!navigator.permissions?.query) {
        if (active) setPermission('prompt')
        return
      }
      try {
        permissionStatus = await navigator.permissions.query({ name: 'geolocation' })
        if (!active) return
        setPermission(permissionStatus.state)
        permissionStatus.onchange = () => {
          if (active && permissionStatus) setPermission(permissionStatus.state)
        }
      } catch {
        if (active) setPermission('prompt')
      }
    }

    void checkPermission()
    return () => {
      active = false
      if (permissionStatus) permissionStatus.onchange = null
      if (watchId.current != null && geolocationSupported) navigator.geolocation.clearWatch(watchId.current)
    }
  }, [geolocationSupported, secureContext])

  function processPosition(position: GeolocationPosition) {
    if (!arena || arena.latitude == null || arena.longitude == null) return
    const meters = distanceMeters(position.coords.latitude, position.coords.longitude, arena.latitude, arena.longitude)
    const nextProximity = classifyArenaProximity(arena, meters)
    const smartEvent = eventFromPosition(game, position, proximityRef.current)
    proximityRef.current = nextProximity
    setProximity(nextProximity)
    setDistance(Math.round(meters))
    setAccuracy(Math.round(position.coords.accuracy))
    setLastCheckedAt(new Date(position.timestamp))
    setError('')
    setMessage(matchday ? 'Posisjon oppdatert.' : 'Posisjon fungerer. Dette er bare en test utenfor kampdag.')
    setPermission('granted')
    if (smartEvent && matchday) onEvent(smartEvent)
  }

  function onPositionError(geoError: GeolocationPositionError) {
    setError(locationErrorMessage(geoError))
    setMessage('')
    setChecking(false)
    setTracking(false)
    if (geoError.code === geoError.PERMISSION_DENIED) setPermission('denied')
  }

  function startTracking() {
    if (!canTrack) return
    if (watchId.current != null) return
    setError('')
    setMessage('Henter posisjon…')
    const id = navigator.geolocation.watchPosition(processPosition, onPositionError, {
      enableHighAccuracy: true,
      maximumAge: 10_000,
      timeout: 25_000,
    })
    watchId.current = id
    setTracking(true)
  }

  function stopTracking() {
    if (watchId.current != null && geolocationSupported) navigator.geolocation.clearWatch(watchId.current)
    watchId.current = null
    setTracking(false)
    setMessage('Smart Kampdag GPS er stoppet.')
  }

  function checkOnce() {
    if (!canCheckPosition || checking) return
    setChecking(true)
    setError('')
    setMessage('Henter posisjon…')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        processPosition(position)
        setChecking(false)
      },
      onPositionError,
      { enableHighAccuracy: true, maximumAge: 0, timeout: 25_000 },
    )
  }

  const lastEvent = [...events].sort((a, b) => b.observedAt.localeCompare(a.observedAt))[0]
  const permissionLabel = permission === 'granted'
    ? 'TILLATT'
    : permission === 'denied'
      ? 'BLOKKERT'
      : permission === 'unsupported'
        ? 'IKKE TILGJENGELIG'
        : permission === 'checking'
          ? 'SJEKKER…'
          : 'KLAR TIL Å SPØRRE'

  return (
    <article className="card detail-card smart-game-day-card">
      <div className="card-heading"><div><span className="eyebrow">SMART KAMPDAG · GPS</span><h2>Posisjon ved arena</h2></div><span className={`gps-dot ${tracking ? 'live' : ''}`} /></div>

      {!hasArenaPosition ? (
        <p className="save-warning">Denne arenaen mangler GPS-punkt. Si ifra hvilken kamp det gjelder, så kan arenaen rettes.</p>
      ) : !geolocationSupported ? (
        <p className="save-warning">Nettleseren på denne enheten støtter ikke posisjon.</p>
      ) : !secureContext ? (
        <p className="save-warning">Posisjon krever sikker HTTPS-tilkobling. Åpne den publiserte Mitt Storhamar-siden på nytt.</p>
      ) : (
        <>
          <div className="gps-status-grid">
            <div><span>STATUS</span><strong>{distance == null ? 'IKKE SJEKKET' : proximity === 'arrived' ? 'VED ARENA' : proximity === 'near' ? 'NÆR ARENA' : 'UTENFOR'}</strong></div>
            <div><span>AVSTAND</span><strong>{distance == null ? '—' : distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(1)} km`}</strong></div>
          </div>

          <div className="gps-permission-row">
            <span>POSISJONSTILLATELSE</span>
            <strong className={permission === 'denied' ? 'blocked' : permission === 'granted' ? 'granted' : ''}>{permissionLabel}</strong>
          </div>

          <div className="gps-actions">
            {matchday && (tracking
              ? <button className="danger-action" onClick={stopTracking}><Navigation size={16} /> Stopp GPS</button>
              : <button className="primary-action" onClick={startTracking} disabled={!canTrack || permission === 'denied'}><Navigation size={16} /> Start Smart Kampdag</button>)}
            <button className={matchday ? 'secondary-action' : 'primary-action'} onClick={checkOnce} disabled={!canCheckPosition || checking}>
              <LocateFixed size={16} /> {checking ? 'Henter…' : matchday ? 'Sjekk nå' : 'Test posisjon'}
            </button>
          </div>

          {!matchday && <p className="travel-footnote">Du kan teste GPS når som helst. Utenfor kampdag lagres ingen ankomst-/oppmøtehendelser.</p>}
          {accuracy != null && <p className="travel-footnote">GPS-nøyaktighet ca. ±{accuracy} m.{lastCheckedAt ? ` Sist sjekket ${new Intl.DateTimeFormat('nb-NO', { hour: '2-digit', minute: '2-digit' }).format(lastCheckedAt)}.` : ''} Det lagres ikke noe kontinuerlig rått GPS-spor.</p>}
        </>
      )}

      {lastEvent && <div className="gps-last-event"><CheckCircle2 size={15} /><span>Siste kampdagsignal: {lastEvent.type === 'arrived_at_arena' ? 'ankom arena' : lastEvent.type === 'near_arena' ? 'nær arena' : 'forlot arena'} · {new Intl.DateTimeFormat('nb-NO', { hour: '2-digit', minute: '2-digit' }).format(new Date(lastEvent.observedAt))}</span></div>}
      {suggestAttendance && <div className="gps-suggestion"><strong>GPS tyder på at du var på kampen.</strong><span>Dette teller fortsatt ikke før du bekrefter under «Fullfør kampdagen».</span></div>}
      {message && <p className="save-success">{message}</p>}
      {error && <p className="save-warning">{error}</p>}
    </article>
  )
}

type GameDayCompletionHandle = { save: () => GameDayRecord }

const GameDayCompletion = forwardRef<GameDayCompletionHandle, {
  game: Game
  record?: GameDayRecord
  smartEvents: SmartGameDayEvent[]
  onSaveRecord: (record: GameDayRecord) => void
}>(function GameDayCompletion({ game, record, smartEvents, onSaveRecord }, ref) {
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
    setMessage(next.attendanceActual === 'attended' ? 'Oppmøte bekreftet. Kampen teller nå i Min Storhamar.' : 'Oppmøte lagret. Kampen teller ikke som sett.')
    return next
  }

  useImperativeHandle(ref, () => ({ save: complete }))

  return (
    <article className="card detail-card post-game-card">
      <div className="card-heading"><div><span className="eyebrow">ETTER KAMPEN</span><h2>Fullfør kampdagen</h2></div>{draft.completed && <span className="saved-badge">FULLFØRT</span>}</div>
      {gpsSuggested && !draft.completed && <div className="gps-suggestion"><strong>GPS-forslag: du var der</strong><span>Bekreft selv under. GPS alene teller aldri kampen.</span></div>}
      <div className="actual-attendance-buttons"><button className={draft.attendanceActual === 'attended' ? 'selected attended' : ''} onClick={() => setActual('attended')}><Check size={17} /> Jeg var der</button><button className={draft.attendanceActual === 'not_attended' ? 'selected not-attended' : ''} onClick={() => setActual('not_attended')}><X size={17} /> Jeg var ikke der</button><button className={draft.attendanceActual === 'unknown' ? 'selected unknown' : ''} onClick={() => setActual('unknown')}>Husker ikke</button></div>
      {draft.attendanceActual === 'attended' && <div className="post-game-fields"><label><span>Inngangstype</span><select value={draft.entryType} onChange={(event) => setDraft((current) => ({ ...current, entryType: event.target.value as EntryType, ticketCost: event.target.value === 'work_accreditation' && current.ticketCost == null ? 0 : current.ticketCost }))}>{entryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><label><span>Billettkostnad</span><input type="number" min="0" inputMode="decimal" placeholder="Ukjent" value={draft.ticketCost ?? ''} onChange={(event) => setDraft((current) => ({ ...current, ticketCost: numberOrNull(event.target.value) }))} /></label></div>}
      {draft.completed && <div className={`completed-summary ${draft.attendanceActual}`}><strong>{actualLabel(draft.attendanceActual)}</strong>{draft.attendanceActual === 'attended' && <span>{entryLabel(draft.entryType)} · {draft.ticketCost == null ? 'ukjent pris' : formatMoney(draft.ticketCost)}</span>}</div>}
      {message && <p className="save-success">{message}</p>}
      <p className="travel-footnote">Oppmøte og billett lagres med «Lagre hele kampdagen» nederst på siden. Du kan også registrere «Ja» eller «Nei» direkte i kamplisten.</p>
    </article>
  )
})

function CareerPage({ hubData, trips, records, purchases }: { hubData: HubExport | null; trips: Trip[]; records: Record<string, GameDayRecord>; purchases: GamePurchase[] }) {
  const local = confirmedLocalCareerStats(records, trips)
  const importedAttendedIds = new Set((hubData?.attendance ?? []).filter((entry) => entry.attendanceActual === 'attended').map((entry) => entry.gameId))
  const localAttendedIds = new Set(Object.values(records).filter((entry) => entry.completed && entry.attendanceActual === 'attended').map((entry) => entry.gameId))
  const attendedIds = new Set([...importedAttendedIds, ...localAttendedIds])
  const importedKm = Math.round((hubData?.tripLegs ?? []).reduce((sum, leg) => sum + (typeof leg.km === 'number' ? leg.km : 0), 0))
  const achievements = hubData?.achievementUnlocks?.length ?? 0
  const confirmedPurchases = purchases.filter((purchase) => attendedIds.has(purchase.gameId))
  const purchaseSummary = summarizePurchases(confirmedPurchases)
  const ticketTotal = Object.values(records).reduce((sum, entry) => sum + (entry.completed && entry.attendanceActual === 'attended' ? entry.ticketCost ?? 0 : 0), 0)
  const totalSpent = local.travelCost + ticketTotal + purchaseSummary.totalSpent
  const kioskTotal = confirmedPurchases.filter((purchase) => purchase.kind === 'kiosk').reduce((sum, purchase) => sum + purchase.totalPrice, 0)
  const lotteryTotal = confirmedPurchases.filter((purchase) => purchase.kind === 'lottery').reduce((sum, purchase) => sum + purchase.totalPrice, 0)

  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">DIN SUPPORTERREISE</span><h1>Karriere</h1><p>Bare faktisk bekreftede kampdager teller i den nye statistikken.</p></div>
      {!hubData && <div className="notice-card"><Database size={20} /><div><strong>Ingen historikk importert ennå</strong><p>Ny statistikk bygges fra kampene du bekrefter i Mitt Storhamar.</p></div></div>}
      <div className="career-grid"><article className="stat-card"><strong>{attendedIds.size}</strong><span>Kamper sett</span></article><article className="stat-card"><strong>{importedKm + Math.round(local.km)}</strong><span>Bekreftede km</span></article><article className="stat-card"><strong>{local.completedTrips}</strong><span>Nye gjennomførte reiser</span></article><article className="stat-card"><strong>{achievements}</strong><span>Achievements</span></article></div>
      <article className="card purchase-economy-card">
        <div className="card-heading"><div><span className="eyebrow">ØKONOMI & KJØP</span><h2>{formatMoney(totalSpent)} totalt</h2></div><WalletCards size={22} /></div>
        <div className="purchase-economy-grid"><div><strong>{formatMoney(purchaseSummary.totalSpent)}</strong><span>Registrerte kjøp</span></div><div><strong>{formatMoney(kioskTotal)}</strong><span>Kiosk</span></div><div><strong>{formatMoney(lotteryTotal)}</strong><span>Lotteri</span></div><div><strong>{purchaseSummary.mostBoughtItem ?? '—'}</strong><span>{purchaseSummary.mostBoughtItem ? `${purchaseSummary.mostBoughtQuantity} stk · mest kjøpt` : 'Mest kjøpt'}</span></div></div>
        <p className="travel-footnote">Totalen består av bekreftet reise, billett og kjøp på kampdager der du har bekreftet «Jeg var der».</p>
      </article>
      <article className="card achievement-card"><Medal size={28} /><div><span>VIKTIG REGEL</span><h3>Plan er ikke historikk</h3><p>«Ja» på en framtidig kamp og planlagte reiser gir ingen karrierestatistikk før kampdagen er fullført.</p></div></article>
    </section>
  )
}

function MorePage({ hubData, importMessage, importHubFile, removeImport, version }: { hubData: HubExport | null; importMessage: string; importHubFile: (file: File | undefined) => void; removeImport: () => void; version: string }) {
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">APPEN · v{version}</span><h1>Mer</h1><p>Varsler, smart reisemodus og private data.</p></div>
      <article className="card version-card"><div><span className="eyebrow">VERSJON</span><strong>Mitt Storhamar v{version}</strong></div><p>Denne versjonen viser hvilke forbedringer som er installert.</p></article>
      <article className="card import-card"><div className="import-icon"><Upload /></div><h2>Importer Storhamar HUB</h2><p>Velg <code>storhamar-hub-data.json</code>. Fila lastes ikke opp til GitHub; dataene lagres lokalt på enheten din.</p><label className="file-button">Velg JSON-fil<input type="file" accept="application/json,.json" onChange={(event) => importHubFile(event.target.files?.[0])} /></label>{hubData && <div className="import-summary"><span>Format v{hubData.schemaVersion}</span><span>{hubData.attendance?.length ?? 0} oppmøter</span><span>{hubData.trips?.length ?? 0} reiser</span></div>}{importMessage && <p className="import-message">{importMessage}</p>}{hubData && <button className="danger-text" onClick={removeImport}>Fjern importerte data</button>}</article>
      <LocalBackupManager />
      <article className="card settings-list"><button type="button" onClick={() => window.dispatchEvent(new Event('mitt-storhamar:open-private-sync'))}><Cloud /><div><strong>Privat synk</strong><span>Frivillig sikkerhetskopi mellom mobil og PC</span></div><ChevronRight /></button></article>
    </section>
  )
}

function GameRow({ game, plan, onOpen, actual }: { game: Game; plan: AttendancePlan; onOpen: () => void; actual?: AttendanceActual }) {
  const result = isFinished(game)
  const features = gameFeatures(game)
  const hasClassic = features.some((feature) => feature.key === 'classic')
  return (
    <button className="game-row game-row-with-logos" onClick={onOpen} type="button">
      <div className="date-block"><strong>{new Intl.DateTimeFormat('nb-NO', { day: 'numeric', timeZone: 'Europe/Oslo' }).format(new Date(game.startsAt))}</strong><span>{new Intl.DateTimeFormat('nb-NO', { month: 'short', timeZone: 'Europe/Oslo' }).format(new Date(game.startsAt))}</span></div>
      <div className="logo-pair" aria-hidden="true"><TeamLogo team={game.homeTeam} /><TeamLogo team={game.awayTeam} /></div>
      <div className="game-row-main"><div className="game-meta"><span>{game.competition}</span><span>{isHome(game) ? 'HJEMME' : 'BORTE'}</span>{game.special && !hasClassic && <span className="special-tag">{game.special}</span>}{features.map((feature) => <span className={`game-feature-tag ${feature.key}`} key={feature.key}>{feature.label}</span>)}{!result && !actual && plan !== 'unset' && <span className={`tiny-plan ${plan}`}>{planLabel(plan)}</span>}{actual === 'attended' && <span className="tiny-actual">VAR DER</span>}{actual === 'not_attended' && <span className="tiny-actual not-attended">IKKE DER</span>}</div><strong>{game.homeTeam} – {game.awayTeam}</strong><small>{game.arena} · {result ? 'Ferdig' : timeText(game)}</small></div>
      {result ? <div className="game-result"><strong>{game.homeScore}–{game.awayScore}</strong>{game.decisionType && game.decisionType !== 'REG' && <span>{decisionLabel(game).trim()}</span>}</div> : <ChevronRight size={18} />}
    </button>
  )
}

function TeamMark({ name, primary = false }: { name: string; primary?: boolean }) {
  return <div className={`team-mark ${primary ? 'primary' : ''}`}><TeamLogo team={name} hero /><small>{name.toUpperCase()}</small></div>
}

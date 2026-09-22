import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Database,
  History,
  Home,
  MapPin,
  Medal,
  MoreHorizontal,
  Route,
  Settings,
  Shield,
  Trophy,
  Upload,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react'
import { games } from './data/games'
import { clearHubExport, loadAttendancePlans, loadHubExport, saveAttendancePlan, saveHubExport } from './lib/storage'
import type { AttendancePlan, Game, HubExport, NavKey } from './types'

const navItems: { key: NavKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Hjem', icon: Home },
  { key: 'games', label: 'Kamper', icon: CalendarDays },
  { key: 'career', label: 'Karriere', icon: Medal },
  { key: 'history', label: 'Historie', icon: History },
  { key: 'more', label: 'Mer', icon: MoreHorizontal },
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

function timeText(game: Game) {
  return new Intl.DateTimeFormat('nb-NO', {
    timeZone: 'Europe/Oslo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(game.startsAt))
}

function opponent(game: Game) {
  return game.homeTeam === 'Storhamar' ? game.awayTeam : game.homeTeam
}

function isHome(game: Game) {
  return game.homeTeam === 'Storhamar'
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

export default function App() {
  const [active, setActive] = useState<NavKey>('home')
  const [plans, setPlans] = useState<Record<string, AttendancePlan>>(() => loadAttendancePlans())
  const [hubData, setHubData] = useState<HubExport | null>(() => loadHubExport())
  const [importMessage, setImportMessage] = useState('')

  const now = new Date()
  const today = osloDateKey(now)
  const nextGame = games.find((game) => new Date(game.startsAt).getTime() >= now.getTime()) ?? games[0]
  const matchday = gameDateKey(nextGame) === today

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
            <div>
              <span className="eyebrow">PERSONLIG SUPPORTERAPP</span>
              <strong>MITT STORHAMAR</strong>
            </div>
          </div>
          <button className="icon-button" aria-label="Innstillinger" onClick={() => setActive('more')}>
            <Settings size={20} />
          </button>
        </header>

        <main className="content">
          {active === 'home' && (
            <HomePage
              nextGame={nextGame}
              matchday={matchday}
              currentPlan={currentPlan}
              updatePlan={updatePlan}
            />
          )}
          {active === 'games' && <GamesPage currentPlan={currentPlan} updatePlan={updatePlan} />}
          {active === 'career' && <CareerPage hubData={hubData} />}
          {active === 'history' && <HistoryPage />}
          {active === 'more' && (
            <MorePage
              hubData={hubData}
              importMessage={importMessage}
              importHubFile={importHubFile}
              removeImport={removeImport}
            />
          )}
        </main>

        <nav className="bottom-nav" aria-label="Hovedmeny">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button key={key} className={active === key ? 'active' : ''} onClick={() => setActive(key)}>
              <Icon size={20} strokeWidth={active === key ? 2.5 : 2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function HomePage({
  nextGame,
  matchday,
  currentPlan,
  updatePlan,
}: {
  nextGame: Game
  matchday: boolean
  currentPlan: (id: string) => AttendancePlan
  updatePlan: (id: string, plan: AttendancePlan) => void
}) {
  const plan = currentPlan(nextGame.id)
  const ready = plan === 'yes' ? 50 : plan === 'maybe' ? 25 : 0

  return (
    <>
      {matchday && (
        <section className="matchday-banner">
          <span>KAMPDAG</span>
          <strong>I DAG GJELDER DET</strong>
          <p>{opponent(nextGame)} · {timeText(nextGame)} · {nextGame.arena}</p>
        </section>
      )}

      <section className={`hero-card ${nextGame.competition === 'CHL' ? 'chl' : ''} ${matchday ? 'is-matchday' : ''}`}>
        <div className="section-kicker">
          <span>NESTE KAMP</span>
          <span className="competition-pill">{nextGame.competition}</span>
        </div>

        <div className="hero-teams">
          <TeamMark name="Storhamar" primary />
          <div className="hero-center">
            <span>{dateText(nextGame)}</span>
            <strong>{timeText(nextGame)}</strong>
            <small>{isHome(nextGame) ? 'HJEMME' : 'BORTE'}</small>
          </div>
          <TeamMark name={opponent(nextGame)} />
        </div>

        <div className="arena-line"><MapPin size={15} /> {nextGame.arena}</div>
        <button className="open-game">Åpne kampen <ChevronRight size={18} /></button>
      </section>

      <section className="card attendance-card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">PLAN</span>
            <h2>Skal du dit?</h2>
          </div>
          <span className="plan-status">{planLabel(plan)}</span>
        </div>
        <AttendanceButtons value={plan} onChange={(value) => updatePlan(nextGame.id, value)} />
      </section>

      <section className="card matchday-hub">
        <div className="card-heading">
          <div>
            <span className="eyebrow">KAMPDAG</span>
            <h2>{ready}% klar</h2>
          </div>
          <div className="progress-ring"><span>{ready}</span></div>
        </div>
        <div className="progress-track"><div style={{ width: `${ready}%` }} /></div>
        <p>{plan === 'yes' ? 'Neste steg: planlegg reisen til kampen.' : 'Svar først på om du skal dit.'}</p>
        <div className="quick-actions">
          <button><Route size={18} /><span>Reise</span></button>
          <button><WalletCards size={18} /><span>Utgifter</span></button>
          <button><Clock3 size={18} /><span>DRA</span></button>
        </div>
      </section>

      <section className="section-block">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">KALENDER</span>
            <h2>Kommende kamper</h2>
          </div>
          <button className="text-button">Alle kamper</button>
        </div>
        <div className="game-list">
          {games.slice(1, 5).map((game) => <GameRow key={game.id} game={game} plan={currentPlan(game.id)} />)}
        </div>
      </section>

      <section className="card season-card">
        <div className="section-kicker"><span>2026/27 · CURRENT</span></div>
        <h2>Storhamars sesong</h2>
        <div className="stat-grid">
          <div><strong>39</strong><span>EHL-kamper</span></div>
          <div><strong>2</strong><span>CHL-kamper</span></div>
          <div><strong>–</strong><span>Tabellstatus</span></div>
        </div>
        <p>Offisielle sesongdata. Din personlige supporterkarriere ligger under Karriere.</p>
      </section>

      <section className="merit-grid">
        <article className="card merit-card"><Trophy /><span>NM-GULL</span><strong>10</strong></article>
        <article className="card merit-card"><Shield /><span>SERIEGULL</span><strong>11</strong></article>
      </section>

      <section className="history-hero">
        <span>1957</span>
        <h2>Storhamar-historien</h2>
        <p>Fra uteisen til dagens Storhamar.</p>
        <button>Utforsk tidslinjen <ChevronRight size={18} /></button>
      </section>
    </>
  )
}

function AttendanceButtons({ value, onChange }: { value: AttendancePlan; onChange: (value: AttendancePlan) => void }) {
  const choices: { value: AttendancePlan; label: string; icon: typeof Check }[] = [
    { value: 'yes', label: 'Ja', icon: Check },
    { value: 'maybe', label: 'Kanskje', icon: UserRound },
    { value: 'no', label: 'Nei', icon: X },
  ]
  return (
    <div className="attendance-buttons">
      {choices.map(({ value: option, label, icon: Icon }) => (
        <button key={option} className={value === option ? `selected ${option}` : ''} onClick={() => onChange(option)}>
          <Icon size={18} /> {label}
        </button>
      ))}
    </div>
  )
}

function GamesPage({ currentPlan, updatePlan }: { currentPlan: (id: string) => AttendancePlan; updatePlan: (id: string, plan: AttendancePlan) => void }) {
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">2026/27</span><h1>Kamper</h1><p>Planlegg hvilke Storhamar-kamper du skal på.</p></div>
      <div className="game-card-list">
        {games.map((game) => (
          <article className={`card full-game-card ${game.competition === 'CHL' ? 'chl-border' : ''}`} key={game.id}>
            <GameRow game={game} plan={currentPlan(game.id)} />
            <AttendanceButtons value={currentPlan(game.id)} onChange={(value) => updatePlan(game.id, value)} />
          </article>
        ))}
      </div>
    </section>
  )
}

function CareerPage({ hubData }: { hubData: HubExport | null }) {
  const attended = hubData?.attendance?.filter((entry) => entry.attendanceActual === 'attended').length ?? 0
  const km = Math.round((hubData?.tripLegs ?? []).reduce((sum, leg) => sum + (typeof leg.km === 'number' ? leg.km : 0), 0))
  const trips = hubData?.trips?.length ?? 0
  const achievements = hubData?.achievementUnlocks?.length ?? 0
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">DIN SUPPORTERREISE</span><h1>Karriere</h1><p>Bygges automatisk når du registrerer kamper og reiser.</p></div>
      {!hubData && <div className="notice-card"><Database size={20} /><div><strong>Ingen historikk importert ennå</strong><p>Importer HUB-data under Mer for å få med gammel historikk.</p></div></div>}
      <div className="career-grid">
        <article className="stat-card"><strong>{attended}</strong><span>Kamper sett</span></article>
        <article className="stat-card"><strong>{km}</strong><span>Registrerte km</span></article>
        <article className="stat-card"><strong>{trips}</strong><span>Reiser</span></article>
        <article className="stat-card"><strong>{achievements}</strong><span>Achievements</span></article>
      </div>
      <article className="card achievement-card"><Medal size={28} /><div><span>NESTE MÅL</span><h3>Fortsett supporterreisen</h3><p>Achievements og sesongrekorder bygges videre fra canonical kamp- og reisedata.</p></div></article>
    </section>
  )
}

function HistoryPage() {
  const categories = [
    ['Tidslinjen', 'Fra 1957 til i dag'],
    ['Meritter', 'NM-gull og seriegull'],
    ['Spillere', 'Profiler gjennom tidene'],
    ['Arenaer', 'Fra uteisen til CC Amfi'],
    ['Europa', 'CHL og europacup'],
    ['Rekorder', 'Klubbrekorder og milepæler'],
  ]
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">ARKIVET</span><h1>Historie</h1><p>Storhamars historie samlet i ett supporterarkiv.</p></div>
      <div className="history-grid">
        {categories.map(([title, text]) => <button className="history-card" key={title}><div><strong>{title}</strong><span>{text}</span></div><ChevronRight /></button>)}
      </div>
    </section>
  )
}

function MorePage({
  hubData,
  importMessage,
  importHubFile,
  removeImport,
}: {
  hubData: HubExport | null
  importMessage: string
  importHubFile: (file: File | undefined) => void
  removeImport: () => void
}) {
  return (
    <section className="page-section">
      <div className="page-heading"><span className="eyebrow">APPEN</span><h1>Mer</h1><p>Import, innstillinger og data.</p></div>
      <article className="card import-card">
        <div className="import-icon"><Upload /></div>
        <h2>Importer Storhamar HUB</h2>
        <p>Velg <code>storhamar-hub-data.json</code>. Fila lastes ikke opp til GitHub; dataene lagres lokalt på enheten din.</p>
        <label className="file-button">Velg JSON-fil<input type="file" accept="application/json,.json" onChange={(event) => importHubFile(event.target.files?.[0])} /></label>
        {hubData && (
          <div className="import-summary">
            <span>Schema v{hubData.schemaVersion}</span>
            <span>{hubData.attendance?.length ?? 0} attendance</span>
            <span>{hubData.trips?.length ?? 0} reiser</span>
          </div>
        )}
        {importMessage && <p className="import-message">{importMessage}</p>}
        {hubData && <button className="danger-text" onClick={removeImport}>Fjern importerte data</button>}
      </article>
      <article className="card settings-list">
        <button><Settings /><div><strong>Innstillinger</strong><span>Varsler, hjemsted og standardvalg</span></div><ChevronRight /></button>
        <button><Route /><div><strong>Reiser</strong><span>Lagrede steder, biler og ruter</span></div><ChevronRight /></button>
        <button><Database /><div><strong>Data</strong><span>Backup og eksport</span></div><ChevronRight /></button>
      </article>
    </section>
  )
}

function GameRow({ game, plan }: { game: Game; plan: AttendancePlan }) {
  return (
    <div className="game-row">
      <div className="date-block"><strong>{new Date(game.startsAt).getDate()}</strong><span>{new Intl.DateTimeFormat('nb-NO', { month: 'short', timeZone: 'Europe/Oslo' }).format(new Date(game.startsAt))}</span></div>
      <div className={`mini-team-mark ${game.competition === 'CHL' ? 'chl-mark' : ''}`}>{badgeLetters(opponent(game))}</div>
      <div className="game-row-main">
        <div className="game-meta"><span>{game.competition}</span><span>{isHome(game) ? 'HJEMME' : 'BORTE'}</span>{plan !== 'unset' && <span className={`tiny-plan ${plan}`}>{planLabel(plan)}</span>}</div>
        <strong>{game.homeTeam} – {game.awayTeam}</strong>
        <small>{game.arena} · {timeText(game)}</small>
      </div>
      <ChevronRight size={18} />
    </div>
  )
}

function TeamMark({ name, primary = false }: { name: string; primary?: boolean }) {
  return <div className={`team-mark ${primary ? 'primary' : ''}`}><span>{badgeLetters(name)}</span><small>{name.toUpperCase()}</small></div>
}

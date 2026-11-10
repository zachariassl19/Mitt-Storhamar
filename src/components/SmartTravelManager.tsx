import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, MapPin, Navigation2, ShieldCheck, Square } from 'lucide-react'
import { arenaForGame } from '../data/arenas'
import { games } from '../data/games'
import { isGameDay } from '../lib/gameTime'
import { saveSmartGameDayEvent } from '../lib/storage'
import { departureTimeForTrip } from '../lib/notificationLogic'
import { loadTrips, subscribeTrips } from '../lib/trips'
import type { Trip } from '../types'
import { classifyArenaProximity, distanceMeters, eventFromPosition } from '../lib/smartGameDay'
import { requestNativeNotificationPermission } from '../lib/nativeNotifications'
import { startTravelLocation, supportsNativeBackgroundTracking } from '../lib/nativeTravelLocation'
import type { TravelFix } from '../lib/nativeTravelLocation'
import {
  canStartSmartTrip, isSmartTripActive, makeSmartTripSession,
  readSmartTripSession, saveSmartTripSession, smartTripCandidates,
} from '../lib/smartTripSession'
import type { SmartTripSession } from '../lib/smartTripSession'
import type { ArenaProximity, Game } from '../types'

type TrackerStatus = 'inactive' | 'starting' | 'running' | 'problem'

function findPortalTarget() {
  return document.querySelector<HTMLElement>('.settings-list')
}

function useTravelPortal() {
  const [target, setTarget] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    let owned: HTMLDivElement | null = null
    function attach() {
      const list = findPortalTarget()
      if (!list) { setTarget(null); return }
      let node = list.querySelector<HTMLDivElement>('#native-trip-settings-portal')
      if (!node) {
        node = document.createElement('div')
        node.id = 'native-trip-settings-portal'
        list.insertBefore(node, list.firstChild)
        owned = node
      }
      setTarget(node)
    }
    const observer = new MutationObserver(attach)
    observer.observe(document.getElementById('root') ?? document.body, {childList:true,subtree:true})
    attach()
    return () => {
      observer.disconnect()
      if (owned?.isConnected) owned.remove()
    }
  }, [])
  return target
}

function gameText(game: Game) {
  return `${game.homeTeam} – ${game.awayTeam} · ${new Intl.DateTimeFormat('nb-NO',{
    day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Oslo',
  }).format(new Date(game.startsAt))}`
}

export function SmartTravelManager() {
  const native = supportsNativeBackgroundTracking()
  const portal = useTravelPortal()
  const [open,setOpen] = useState(false)
  const [session,setSession] = useState<SmartTripSession | null>(()=>readSmartTripSession())
  const [selectedGameId,setSelectedGameId] = useState(()=>smartTripCandidates(games)[0]?.id ?? '')
  const [savedTrips,setSavedTrips] = useState<Trip[]>(()=>loadTrips())
  const [status,setStatus] = useState<TrackerStatus>('inactive')
  const [message,setMessage] = useState('')
  const [distance,setDistance] = useState<number | null>(null)
  const [accuracy,setAccuracy] = useState<number | null>(null)
  const [lastFixTime,setLastFixTime] = useState<number | null>(null)
  const watchStopRef = useRef<(() => Promise<void>) | null>(null)
  useEffect(()=>subscribeTrips(setSavedTrips),[])
  const watchStartingRef = useRef(false)
  const previousProximity = useRef<ArenaProximity>('outside')
  const currentSessionRef = useRef(session)
  currentSessionRef.current = session

  async function stopWatcher() {
    const stop = watchStopRef.current
    watchStopRef.current = null
    if (stop) {
      try { await stop() } catch { /* Native watcher may already be stopped. */ }
    }
    setStatus('inactive')
  }

  async function startWatcher(active: SmartTripSession) {
    if (watchStopRef.current || watchStartingRef.current || !isSmartTripActive(active)) return
    const game = games.find((entry)=>entry.id===active.gameId)
    const arena = game ? arenaForGame(game) : undefined
    if (!game || !arena || arena.latitude == null || arena.longitude == null) {
      setStatus('problem')
      setMessage('Denne kampen mangler et koordinatfestet arenaområde.')
      return
    }

    setStatus('starting')
    watchStartingRef.current=true
    try {
      const stop = await startTravelLocation((fix: TravelFix) => {
        if (!isSmartTripActive(currentSessionRef.current)) {
          void stopWatcher()
          saveSmartTripSession(null)
          setSession(null)
          return
        }
        const meters=distanceMeters(fix.latitude,fix.longitude,arena.latitude!,arena.longitude!)
        setDistance(Math.round(meters))
        setAccuracy(Math.round(fix.accuracy))
        setLastFixTime(fix.timestamp)

        // A GPS fix is only a hint. Accuracy filtering prevents a poor fix
        // from silently registering an erroneous arrival.
        if (isGameDay(game) && fix.accuracy <= 150) {
          const proximity = classifyArenaProximity(arena,meters)
          const position = {
            timestamp: fix.timestamp,
            coords:{latitude:fix.latitude,longitude:fix.longitude,accuracy:fix.accuracy},
          } as GeolocationPosition
          const event = eventFromPosition(game,position,previousProximity.current)
          previousProximity.current = proximity
          if (event) {
            saveSmartGameDayEvent(event)
            window.dispatchEvent(new CustomEvent('mitt-storhamar:smart-gameday-event',{detail:event}))
          }
        }
      }, (error) => {
        setMessage(error)
        setStatus('problem')
      }, 150)
      if (currentSessionRef.current?.gameId!==active.gameId || !isSmartTripActive(currentSessionRef.current)) {
        await stop()
        setStatus('inactive')
        return
      }
      watchStopRef.current=stop
      setStatus('running')
      setMessage(native ? 'GPS oppdateres under reisen. Android viser et varsel mens sporing pågår.' : 'GPS oppdateres mens nettsiden er åpen.')
    } catch (error) {
      setStatus('problem')
      setMessage(error instanceof Error ? error.message : 'Kunne ikke starte reisemodus.')
    } finally {
      watchStartingRef.current=false
    }
  }

  async function begin() {
    if (session || watchStartingRef.current) return
    const game = games.find((item)=>item.id===selectedGameId)
    if (!game) {setMessage('Velg en kamp først.'); return}
    const candidate = makeSmartTripSession(game)
    if (!candidate) {
      setMessage('GPS kan startes manuelt fra 72 timer før kamp og avsluttes senest fem timer etter kampstart.')
      return
    }
    setMessage('')
    if (native) {
      // Android 13+: a visible foreground notification requires permission.
      // Prompt directly after an explicit tap, not on background app startup.
      const allowed = await requestNativeNotificationPermission()
      if (!allowed) {
        setMessage('Tillat varsler i Android før reisemodus kan starte med synlig GPS-status.')
        return
      }
    }
    currentSessionRef.current = candidate
    saveSmartTripSession(candidate)
    setSession(candidate)
    await startWatcher(candidate)
  }

  async function end() {
    currentSessionRef.current=null
    saveSmartTripSession(null)
    setSession(null)
    setDistance(null)
    setAccuracy(null)
    setLastFixTime(null)
    previousProximity.current='outside'
    await stopWatcher()
    setMessage('Reisemodus er stoppet. Posisjon spores ikke.')
  }

  useEffect(()=>{
    if (!session) return
    const activeSession = session
    // A previously started, still-valid trip may resume when the app is opened.
    if (!document.hidden) void startWatcher(activeSession)
    function onVisible() {
      if (!document.hidden && !watchStopRef.current) void startWatcher(activeSession)
    }
    document.addEventListener('visibilitychange',onVisible)
    const tick = window.setInterval(()=>{
      if (!isSmartTripActive(activeSession)) void end()
    }, 60_000)
    return ()=>{
      document.removeEventListener('visibilitychange',onVisible)
      window.clearInterval(tick)
    }
  // Session identity; watchdog stays active even when More is not selected.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[session?.gameId,session?.expiresAt])

  useEffect(()=>{
    return ()=>{
      const stop=watchStopRef.current
      watchStopRef.current=null
      if(stop) void stop()
    }
  },[])

  const options=smartTripCandidates(games)
  const activeGame=session?games.find((game)=>game.id===session.gameId):null
  const selected=games.find((game)=>game.id===selectedGameId)
  const canStart=Boolean(selected && canStartSmartTrip(selected))
  const chosenTrip = savedTrips.find((trip)=>trip.gameId===selectedGameId)
  const selectedDeparture = selected ? departureTimeForTrip(selected, chosenTrip) : null
  if (!portal) return null

  return createPortal(<div className={`settings-expandable smart-settings-entry ${open?'open':''}`}>
    <button type="button" className="settings-entry-button" aria-expanded={open} onClick={()=>setOpen((v)=>!v)}>
      <Navigation2 size={22}/>
      <div><strong>Smart reisemodus</strong><span>{native?'Android GPS under kampreisen':'GPS når appen er åpen'}</span></div>
      <div className="settings-entry-tail">
        <span className={`settings-entry-state ${session?'on':''}`}>{session?'Aktiv':'Av'}</span>
        <ChevronDown className={open?'rotated':''} size={19}/>
      </div>
    </button>

    {open && <div className="settings-entry-panel smart-settings-panel smart-trip-panel">
      <p className="settings-panel-note">Velg kamp og start reisen én gang. På Android fortsetter GPS mens skjermen er låst med et synlig varsel. Sporing stopper ved avslutning av økten eller manuelt. Ingen koordinathistorikk lagres.</p>
      {session && activeGame ? <>
        <div className="smart-trip-current">
          <strong>{gameText(activeGame)}</strong>
          <span>{status==='running'?'Posisjon oppdateres':status==='starting'?'Starter GPS…':'Venter på GPS'}</span>
          <div className="smart-trip-facts">
            <span><MapPin size={15}/> {distance==null?'Avstand ukjent':distance<1000?`${distance} m til arena`:`${(distance/1000).toFixed(1)} km til arena`}</span>
            {accuracy!=null && <span>GPS ±{accuracy} m</span>}
          </div>
          {lastFixTime && <small>Sist oppdatert: {new Intl.DateTimeFormat('nb-NO',{hour:'2-digit',minute:'2-digit'}).format(new Date(lastFixTime))}</small>}
        </div>
        <button type="button" className="danger-action smart-trip-stop" onClick={()=>void end()}><Square size={15}/> Stopp reisemodus</button>
      </> : <>
        <label className="smart-trip-game-label" htmlFor="smart-trip-game">Hvilken kamp skal du reise til?</label>
        <select id="smart-trip-game" value={selectedGameId} onChange={(event)=>setSelectedGameId(event.target.value)}>
          {options.map((game)=><option value={game.id} key={game.id}>{gameText(game)}</option>)}
        </select>
        {selectedDeparture && <p className="settings-panel-note">Din avreise: <strong>{new Intl.DateTimeFormat('nb-NO',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Oslo'}).format(selectedDeparture)}</strong>{chosenTrip?.plannedDepartureAt?' · valgt av deg':' · beregnet ut fra reiseruten'}. Du kan endre tiden under kampen → Reise.</p>}
        {selected && !selectedDeparture && <p className="settings-panel-note">Velg tidspunkt under kampen → Reise. Du kan angi avreise selv uten ferdig ruteberegning.</p>}
        {selected && !canStart && <p className="settings-panel-note">GPS kan startes manuelt fra 72 timer før kamp. Tidligere kan du fortsatt planlegge avreisetid og få DRA-varsel.</p>}
        <button type="button" className="primary-action smart-trip-start" disabled={!canStart || status==='starting'} onClick={()=>void begin()}>
          <Navigation2 size={16}/> {status==='starting'?'Starter…':'Start smart reisemodus'}
        </button>
      </>}
      {message && <p role="status" className={status==='problem'?'save-warning':'settings-panel-note'}>{message}</p>}
      <p className="settings-panel-note"><ShieldCheck size={14}/> GPS brukes bare til avstand og mulige kampdagssignaler. Oppmøte bekreftes fortsatt av deg. {native?'Android-batterisparing kan forsinke enkelte oppdateringer.':'Nettleseren kan ikke fortsette GPS med lukket fane.'}</p>
    </div>}
  </div>, portal)
}

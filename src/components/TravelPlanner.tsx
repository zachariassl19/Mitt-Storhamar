import { useMemo, useState } from 'react'
import { Car, ChevronDown, MapPin, Navigation, Plus, Save, Trash2 } from 'lucide-react'
import { calculateGoogleRoute, canAutoRoute, hasGoogleRoutesKey } from '../lib/googleRoutes'
import { loadSavedLocations, saveSavedLocations, type SavedLocations } from '../lib/savedLocations'
import { loadGameDayRecords } from '../lib/storage'
import {
  averageConsumptionPer100,
  averageEnergyPrice,
  calculateCarCost,
  loadCarSettings,
  saveCarSettings,
  settingsForEnergy,
  type CarEnergy,
  type CarSettings,
} from '../lib/travelSettings'
import { createLeg, createTripForGame } from '../lib/trips'
import type { Game, TransportMode, Trip, TripLeg } from '../types'

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

const energyOptions: { value: CarEnergy; label: string }[] = [
  { value: 'electric', label: 'Strøm' },
  { value: 'gasoline', label: 'Bensin' },
  { value: 'diesel', label: 'Diesel' },
]

type RoutingState = 'idle' | 'calculating' | 'ready' | 'error'

function cloneTrip(trip: Trip): Trip {
  return { ...trip, legs: trip.legs.map((leg) => ({ ...leg })) }
}

function numberOrNull(value: string) {
  if (value.trim() === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(value) + ' kr'
}

function formatUnitPrice(value: number) {
  return new Intl.NumberFormat('nb-NO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(value)
}

function normalizeLegs(legs: TripLeg[]) {
  return [...legs]
    .sort((a, b) => a.order - b.order)
    .map((leg, index) => ({ ...leg, order: index }))
}

function routeNodes(legs: TripLeg[]) {
  const sorted = normalizeLegs(legs)
  if (sorted.length === 0) return []
  return [sorted[0].fromName, ...sorted.map((leg) => leg.toName)]
}

function samePlace(a: string, b: string) {
  return a.trim().toLocaleLowerCase('nb-NO') === b.trim().toLocaleLowerCase('nb-NO')
}

function transportLabel(mode: TransportMode) {
  return transportOptions.find((option) => option.value === mode)?.label ?? 'Annet'
}

function legCost(leg: TripLeg, carSettings: CarSettings) {
  if (leg.transport === 'car') return calculateCarCost(leg.km, carSettings)
  if (leg.transport === 'walk' || leg.transport === 'bike') return 0
  return leg.estimatedCost ?? null
}

function withCalculatedCost(leg: TripLeg, carSettings: CarSettings): TripLeg {
  if (leg.transport === 'car') {
    return { ...leg, estimatedCost: calculateCarCost(leg.km, carSettings) }
  }
  if (leg.transport === 'walk' || leg.transport === 'bike') {
    return { ...leg, estimatedCost: 0 }
  }
  return leg
}

export function TravelPlanner({ game, trip, completedAttendance = false, onSaveTrip, onDeleteTrip }: {
  game: Game
  trip?: Trip
  completedAttendance?: boolean
  onSaveTrip: (trip: Trip) => void
  onDeleteTrip: (tripId: string) => void
}) {
  const [draft, setDraft] = useState<Trip>(() => cloneTrip(trip ?? createTripForGame(game)))
  const [carSettings, setCarSettings] = useState<CarSettings>(() => loadCarSettings())
  const [savedLocations, setSavedLocations] = useState<SavedLocations>(() => loadSavedLocations())
  const [message, setMessage] = useState('')
  const [routingState, setRoutingState] = useState<RoutingState>('idle')
  const [routingMessage, setRoutingMessage] = useState('')

  const storedRecord = loadGameDayRecords()[game.id]
  const confirmedAttendance = completedAttendance || Boolean(storedRecord?.completed && storedRecord.attendanceActual === 'attended')
  const legs = useMemo(() => normalizeLegs(draft.legs), [draft.legs])
  const nodes = useMemo(() => routeNodes(legs), [legs])
  const arenaIndex = nodes.findIndex((node) => samePlace(node, game.arena))
  const hasCar = legs.some((leg) => leg.transport === 'car')
  const usesHome = nodes.some((node) => samePlace(node, 'Hjem'))
  const hasWalkingOrBike = legs.some((leg) => leg.transport === 'walk' || leg.transport === 'bike')
  const automaticLegCount = legs.filter((leg) => canAutoRoute(leg.transport)).length
  const invalidRoute = legs.length === 0 || legs.some((leg) => !leg.fromName.trim() || !leg.toName.trim())
  const priceReference = averageEnergyPrice(carSettings.energy)
  const consumptionReference = averageConsumptionPer100(carSettings.energy)

  const totalKm = legs.reduce((sum, leg) => sum + (leg.km ?? 0), 0)
  const totalMinutes = legs.reduce((sum, leg) => sum + (leg.durationMinutes ?? 0), 0)
  const totalCost = legs.reduce((sum, leg) => sum + (legCost(leg, carSettings) ?? 0), 0)

  const outbound = legs.filter((leg) => leg.direction === 'outbound')
  const outboundReady = outbound.length > 0 && outbound.every((leg) => leg.durationMinutes != null)
  const outboundMinutes = outbound.reduce((sum, leg) => sum + (leg.durationMinutes ?? 0), 0)
  const draDate = outboundReady
    ? new Date(new Date(game.startsAt).getTime() - (draft.desiredArrivalMinutesBefore + outboundMinutes) * 60_000)
    : null

  function resetRoutingState() {
    setRoutingState('idle')
    setRoutingMessage('')
  }

  function setCar(next: CarSettings) {
    setCarSettings(next)
    saveCarSettings(next)
    setMessage('')
  }

  function setHomeAddress(homeAddress: string) {
    const next = { ...savedLocations, homeAddress }
    setSavedLocations(next)
    saveSavedLocations(next)
    resetRoutingState()
  }

  function updateLeg(id: string, patch: Partial<TripLeg>) {
    setMessage('')
    resetRoutingState()
    setDraft((current) => ({
      ...current,
      legs: current.legs.map((leg) => {
        if (leg.id !== id) return leg
        const next = { ...leg, ...patch }
        if (patch.transport === 'walk' || patch.transport === 'bike') next.estimatedCost = 0
        return next
      }),
    }))
  }

  function updateNode(index: number, value: string) {
    setMessage('')
    resetRoutingState()
    setDraft((current) => {
      const sorted = normalizeLegs(current.legs)
      const next = sorted.map((leg) => ({ ...leg }))
      if (index > 0 && next[index - 1]) {
        next[index - 1].toName = value
        next[index - 1].km = null
        next[index - 1].durationMinutes = null
      }
      if (index < next.length && next[index]) {
        next[index].fromName = value
        next[index].km = null
        next[index].durationMinutes = null
      }
      return { ...current, legs: normalizeDirections(next) }
    })
  }

  function normalizeDirections(next: TripLeg[]): TripLeg[] {
    const sorted = normalizeLegs(next)
    const arrivalLeg = sorted.findIndex((leg) => samePlace(leg.toName, game.arena))
    return sorted.map((leg, index) => {
      const direction: TripLeg['direction'] = arrivalLeg >= 0 && index <= arrivalLeg ? 'outbound' : 'return'
      return { ...leg, direction, order: index }
    })
  }

  function insertStop(nodeIndex: number) {
    setMessage('')
    resetRoutingState()
    setDraft((current) => {
      const sorted = normalizeLegs(current.legs)
      const legIndex = nodeIndex - 1
      const source = sorted[legIndex]
      if (!source) return current
      const stopName = 'Nytt stopp'
      const first: TripLeg = {
        ...source,
        toName: stopName,
        km: null,
        durationMinutes: null,
        estimatedCost: source.transport === 'walk' || source.transport === 'bike' ? 0 : null,
      }
      const second = createLeg(
        source.order + 1,
        source.direction,
        stopName,
        source.toName,
        source.transport,
      )
      const next = [...sorted]
      next.splice(legIndex, 1, first, second)
      return { ...current, legs: normalizeDirections(next) }
    })
  }

  function removeStop(nodeIndex: number) {
    setMessage('')
    resetRoutingState()
    setDraft((current) => {
      const sorted = normalizeLegs(current.legs)
      if (nodeIndex <= 0 || nodeIndex >= sorted.length) return current
      const previous = sorted[nodeIndex - 1]
      const nextLeg = sorted[nodeIndex]
      if (!previous || !nextLeg) return current
      const merged: TripLeg = {
        ...previous,
        toName: nextLeg.toName,
        km: null,
        durationMinutes: null,
        estimatedCost: previous.transport === 'walk' || previous.transport === 'bike' ? 0 : null,
      }
      const next = [...sorted]
      next.splice(nodeIndex - 1, 2, merged)
      return { ...current, legs: normalizeDirections(next) }
    })
  }

  function routeLocation(name: string) {
    if (samePlace(name, 'Hjem')) {
      const home = savedLocations.homeAddress.trim()
      if (!home) throw new Error('Legg inn den private Hjem-adressen først.')
      return home
    }

    if (samePlace(name, game.arena)) {
      return [game.arena, game.city].filter(Boolean).join(', ')
    }

    return name.trim()
  }

  async function calculateRoute() {
    if (invalidRoute || routingState === 'calculating') return
    if (usesHome && !savedLocations.homeAddress.trim()) {
      setRoutingState('error')
      setRoutingMessage('Legg inn den private Hjem-adressen først. Den lagres lokalt og kan synkes privat når du er innlogget.')
      return
    }
    if (!hasGoogleRoutesKey()) {
      setRoutingState('error')
      setRoutingMessage('Google Maps-nøkkelen mangler i den publiserte builden.')
      return
    }
    if (automaticLegCount === 0) {
      setRoutingState('error')
      setRoutingMessage('Ingen av delene i denne reisen kan beregnes med Google Routes ennå.')
      return
    }

    setRoutingState('calculating')
    setRoutingMessage('Beregner km og kjøretid…')

    try {
      const updates = new Map<string, { km: number; durationMinutes: number }>()

      for (const leg of legs) {
        if (!canAutoRoute(leg.transport)) continue
        const result = await calculateGoogleRoute(
          routeLocation(leg.fromName),
          routeLocation(leg.toName),
          leg.transport,
        )
        updates.set(leg.id, result)
      }

      const now = new Date().toISOString()
      const calculatedLegs = normalizeDirections(legs.map((leg) => {
        const update = updates.get(leg.id)
        return withCalculatedCost(update ? { ...leg, ...update } : leg, carSettings)
      }))
      const next: Trip = {
        ...draft,
        status: confirmedAttendance ? 'completed' : draft.status,
        legs: calculatedLegs,
        updatedAt: now,
      }

      setDraft(cloneTrip(next))
      onSaveTrip(next)
      setRoutingState('ready')
      setRoutingMessage(`Google Routes beregnet ${updates.size} ${updates.size === 1 ? 'del' : 'deler'} av reisen. Km og tid er lagret automatisk.`)
    } catch (error) {
      setRoutingState('error')
      setRoutingMessage(error instanceof Error ? error.message : 'Ruteberegningen feilet.')
    }
  }

  function save() {
    if (invalidRoute) return
    const now = new Date().toISOString()
    const next: Trip = {
      ...draft,
      status: confirmedAttendance ? 'completed' : draft.status,
      legs: normalizeDirections(legs.map((leg) => withCalculatedCost(leg, carSettings))),
      updatedAt: now,
    }
    onSaveTrip(next)
    setDraft(cloneTrip(next))
    setMessage('Reisen er lagret. Stoppene, km, tid og reisemåter beholdes etter refresh.')
  }

  function removeSavedTrip() {
    if (!trip) return
    onDeleteTrip(trip.id)
    setDraft(createTripForGame(game))
    resetRoutingState()
    setMessage('Den lagrede reisen er slettet.')
  }

  const arrivalInsertIndex = arenaIndex > 0 ? arenaIndex : 1
  const returnInsertIndex = arenaIndex >= 0 && arenaIndex < nodes.length - 1 ? arenaIndex + 1 : Math.max(1, nodes.length - 1)

  return (
    <article className="card detail-card travel-card travel-planner-card">
      <div className="card-heading">
        <div><span className="eyebrow">REISE</span><h2>{trip ? 'Lagret reise' : 'Planlegg reisen'}</h2></div>
        {trip && <span className="saved-badge">{trip.status === 'completed' ? 'GJENNOMFØRT' : 'LAGRET'}</span>}
      </div>

      <p className="travel-planner-intro">Legg inn stoppene i riktig rekkefølge. Appen bygger delene automatisk mellom dem.</p>

      <div className="travel-summary-grid">
        <div><span>KM</span><strong>{totalKm > 0 ? Math.round(totalKm) : '—'}</strong></div>
        <div><span>TID</span><strong>{totalMinutes > 0 ? `${totalMinutes}m` : '—'}</strong></div>
        <div><span>KOSTNAD</span><strong>{totalCost > 0 ? formatMoney(totalCost) : totalCost === 0 && legs.length ? '0 kr' : '—'}</strong></div>
        <div><span>DRA</span><strong>{draDate ? new Intl.DateTimeFormat('nb-NO', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo' }).format(draDate) : '—'}</strong></div>
      </div>

      <label className="arrival-setting">
        <span>Ønsket tid ved arena</span>
        <select value={draft.desiredArrivalMinutesBefore} onChange={(event) => setDraft((current) => ({ ...current, desiredArrivalMinutesBefore: Number(event.target.value) }))}>
          <option value={15}>15 min før</option>
          <option value={30}>30 min før</option>
          <option value={45}>45 min før</option>
          <option value={60}>60 min før</option>
          <option value={90}>90 min før</option>
        </select>
      </label>

      {usesHome && (
        <div className="home-location-card">
          <div>
            <strong>Privat Hjem-adresse</strong>
            <span>Brukes bare til ruteberegning på denne enheten. Når privat synk er aktiv kan den følge deg mellom enheter.</span>
          </div>
          <input
            value={savedLocations.homeAddress}
            placeholder="Skriv hjemmeadressen én gang"
            autoComplete="street-address"
            onChange={(event) => setHomeAddress(event.target.value)}
          />
        </div>
      )}

      <div className="route-builder">
        {nodes.map((node, index) => {
          const isArena = index === arenaIndex
          const isEndpoint = index === 0 || index === nodes.length - 1
          return (
            <div className="route-node-wrap" key={`node-${index}`}>
              <div className={`route-node ${isArena ? 'arena' : ''}`}>
                <span className="route-node-icon"><MapPin size={15} /></span>
                <div className="route-node-main">
                  <span>{isArena ? 'ARENA' : index === 0 ? 'START' : index === nodes.length - 1 ? 'SLUTT' : 'STOPP'}</span>
                  {isArena ? <strong>{game.arena}</strong> : <input value={node} onChange={(event) => updateNode(index, event.target.value)} aria-label={`Stopp ${index + 1}`} />}
                </div>
                {!isEndpoint && !isArena && <button className="route-remove-stop" onClick={() => removeStop(index)} aria-label="Fjern stopp"><Trash2 size={14} /></button>}
              </div>

              {index < legs.length && <SegmentEditor leg={legs[index]} carSettings={carSettings} onUpdate={(patch) => updateLeg(legs[index].id, patch)} />}
            </div>
          )
        })}
      </div>

      <div className="stop-actions">
        <button onClick={() => insertStop(arrivalInsertIndex)}><Plus size={15} /> Stopp før arena</button>
        <button onClick={() => insertStop(returnInsertIndex)}><Plus size={15} /> Stopp på hjemveien</button>
      </div>

      <div className={`route-provider-note ${routingState}`}>
        <div className="route-provider-heading">
          <div><strong>Google Routes</strong><span>Automatisk km og reisetid for bil, supporterbuss, taxi, gange og sykkel.</span></div>
          <button onClick={() => void calculateRoute()} disabled={invalidRoute || routingState === 'calculating'}>
            <Navigation size={15} /> {routingState === 'calculating' ? 'Beregner…' : 'Beregn ruten'}
          </button>
        </div>
        {routingMessage && <p>{routingMessage}</p>}
        {legs.some((leg) => !canAutoRoute(leg.transport)) && <p>Tog, rutebuss, fly og «annet» beholder manuell km/tid til Entur og egne løsninger kobles på.</p>}
        {hasWalkingOrBike && <p>Google oppgir at gang- og sykkelruter er beta og kan mangle tydelige gang- eller sykkelveier.</p>}
      </div>

      {hasCar && (
        <div className="car-settings-card">
          <div className="car-settings-heading"><Car size={18} /><div><strong>Bilinnstilling</strong><span>Brukes på alle bil-delene</span></div></div>
          <div className="energy-choice">
            {energyOptions.map((option) => (
              <button
                key={option.value}
                className={carSettings.energy === option.value ? 'selected' : ''}
                onClick={() => setCar(settingsForEnergy(carSettings, option.value))}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="car-setting-fields">
            <label><span>{carSettings.energy === 'electric' ? 'Forbruk kWh/100 km' : 'Forbruk l/100 km'}</span><input type="number" min="0" step="0.1" inputMode="decimal" value={carSettings.consumptionPer100 ?? ''} placeholder="Ukjent" onChange={(event) => setCar({ ...carSettings, consumptionPer100: numberOrNull(event.target.value) })} /></label>
            <label><span>{carSettings.energy === 'electric' ? 'Pris kr/kWh' : 'Pris kr/l'}</span><input type="number" min="0" step="0.01" inputMode="decimal" value={carSettings.energyUnitPrice ?? ''} placeholder="Ukjent" onChange={(event) => setCar({ ...carSettings, energyUnitPrice: numberOrNull(event.target.value) })} /></label>
          </div>
          <p>
            Standardforbruk: <strong>{formatUnitPrice(consumptionReference.value)} {consumptionReference.unit}</strong> · {consumptionReference.source}. Du kan overstyre med bilens faktiske forbruk.
          </p>
          <p>
            Energipris: <strong>{formatUnitPrice(priceReference.price)} {priceReference.unit}</strong> · {priceReference.source}, {priceReference.period}. Du kan overstyre hvis faktisk pumpe-/ladepris er kjent.
          </p>
          <p>Bilpris = km ÷ 100 × forbruk × energipris.</p>
        </div>
      )}

      {invalidRoute && <p className="save-warning">Alle stopp må ha et navn før reisen kan lagres.</p>}
      {message && <p className="save-success">{message}</p>}

      <div className="travel-actions">
        <button className="primary-action" onClick={save} disabled={invalidRoute}><Save size={17} /> Lagre reisen</button>
        {trip && <button className="danger-action" onClick={removeSavedTrip}><Trash2 size={16} /> Slett reisen</button>}
      </div>
      {!outboundReady && <p className="travel-footnote">DRA vises når alle delene fram til arena har reisetid.</p>}
      {trip?.status !== 'completed' && !confirmedAttendance && <p className="travel-footnote">Planlagte km teller ikke i Min Storhamar før kampdagen er bekreftet som gjennomført.</p>}
    </article>
  )
}

function SegmentEditor({ leg, carSettings, onUpdate }: {
  leg: TripLeg
  carSettings: CarSettings
  onUpdate: (patch: Partial<TripLeg>) => void
}) {
  const [open, setOpen] = useState(false)
  const cost = legCost(leg, carSettings)
  const manualCost = leg.transport !== 'car' && leg.transport !== 'walk' && leg.transport !== 'bike'
  const automatic = canAutoRoute(leg.transport)

  return (
    <div className="route-segment">
      <div className="route-segment-line" />
      <button className="route-segment-summary" onClick={() => setOpen((value) => !value)}>
        <div><span>{transportLabel(leg.transport)}</span><strong>{leg.fromName || 'Fra?'} → {leg.toName || 'Til?'}</strong></div>
        <div className="route-segment-meta"><span>{leg.km == null ? '— km' : `${leg.km} km`}</span><span>{leg.durationMinutes == null ? '— min' : `${leg.durationMinutes} min`}</span><span>{cost == null ? '— kr' : formatMoney(cost)}</span><ChevronDown size={15} className={open ? 'rotated' : ''} /></div>
      </button>

      {open && (
        <div className="route-segment-editor">
          <label className="wide"><span>Reisemåte</span><select value={leg.transport} onChange={(event) => {
            const transport = event.target.value as TransportMode
            onUpdate({
              transport,
              km: null,
              durationMinutes: null,
              estimatedCost: transport === 'walk' || transport === 'bike' ? 0 : null,
            })
          }}>{transportOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label><span>Km {automatic ? '(Google)' : ''}</span><input type="number" min="0" step="0.1" inputMode="decimal" value={leg.km ?? ''} placeholder="—" onChange={(event) => onUpdate({ km: numberOrNull(event.target.value) })} /></label>
          <label><span>Minutter {automatic ? '(Google)' : ''}</span><input type="number" min="0" step="1" inputMode="numeric" value={leg.durationMinutes ?? ''} placeholder="—" onChange={(event) => onUpdate({ durationMinutes: numberOrNull(event.target.value) })} /></label>
          {manualCost && <label className="wide"><span>{leg.transport === 'supporter_bus' ? 'Pris supporterbuss' : 'Pris'} (kr)</span><input type="number" min="0" step="1" inputMode="decimal" value={leg.estimatedCost ?? ''} placeholder="Ukjent" onChange={(event) => onUpdate({ estimatedCost: numberOrNull(event.target.value) })} /></label>}
          {automatic && <p className="segment-help">Km og tid kan fylles automatisk med «Beregn ruten». Feltene kan fortsatt overstyres manuelt.</p>}
          {leg.transport === 'car' && <p className="segment-help">Bilens kostnad regnes fra km, forbruk og norsk gjennomsnittspris som standard.</p>}
          {(leg.transport === 'walk' || leg.transport === 'bike') && <p className="segment-help">Denne delen har 0 kr i transportkostnad.</p>}
        </div>
      )}
    </div>
  )
}

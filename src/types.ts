export type Competition = 'EHL' | 'CHL' | 'Trening'
export type AttendancePlan = 'yes' | 'maybe' | 'no' | 'unset'
export type AttendanceActual = 'attended' | 'not_attended' | 'unknown'
export type DecisionType = 'REG' | 'OT' | 'SO'
export type TransportMode = 'car' | 'train' | 'supporter_bus' | 'bus' | 'plane' | 'taxi' | 'walk' | 'bike' | 'other'
export type TripDirection = 'outbound' | 'return'
export type EntryType = 'purchased' | 'season_ticket' | 'work_accreditation' | 'free_invitation' | 'companion' | 'other' | 'unknown'
export type ArenaProximity = 'outside' | 'near' | 'arrived'
export type SmartGameDayEventType = 'near_arena' | 'arrived_at_arena' | 'left_arena'
export type PurchaseKind = 'kiosk' | 'lottery' | 'supporter' | 'parking' | 'accommodation' | 'other'

export interface Game {
  id: string
  season: string
  startsAt: string
  competition: Competition
  homeTeam: string
  awayTeam: string
  arena: string
  city?: string
  homeScore?: number
  awayScore?: number
  decisionType?: DecisionType
  special?: string
}

export interface Arena {
  id: string
  name: string
  aliases: string[]
  city?: string
  latitude?: number
  longitude?: number
  nearRadiusMeters?: number
  arrivalRadiusMeters?: number
}

export interface SmartGameDayEvent {
  gameId: string
  arenaId: string
  type: SmartGameDayEventType
  observedAt: string
  distanceMeters: number
  accuracyMeters: number
}

export interface TripLeg {
  id: string
  order: number
  direction: TripDirection
  fromName: string
  toName: string
  transport: TransportMode
  km?: number | null
  durationMinutes?: number | null
  estimatedCost?: number | null
  actualCost?: number | null
}

export interface Trip {
  id: string
  gameId: string
  status: 'planned' | 'completed'
  desiredArrivalMinutesBefore: number
  legs: TripLeg[]
  createdAt: string
  updatedAt: string
}

export interface GameDayRecord {
  gameId: string
  attendanceActual: AttendanceActual
  entryType: EntryType
  ticketCost: number | null
  completed: boolean
  completedAt?: string
  updatedAt: string
}

export interface GamePurchase {
  id: string
  gameId: string
  kind: PurchaseKind
  category: string
  subcategory?: string | null
  item: string
  size?: string | null
  quantity: number
  totalPrice: number
  currency: 'NOK'
  createdAt: string
  updatedAt: string
}

export interface HubAttendance {
  gameId: string
  attendancePlan: AttendancePlan
  attendanceActual: AttendanceActual
  favorite?: boolean
}

export interface HubTrip {
  id: string
  status?: string
}

export interface HubTripGame {
  tripId: string
  gameId: string
}

export interface HubTripLeg {
  id: string
  tripId: string
  order: number
  fromName: string
  toName: string
  transport: string
  km?: number | null
  estimatedCost?: number | null
  actualCost?: number | null
}

export interface HubExport {
  schemaVersion: number
  exportedAt?: string
  primaryTeamId?: string
  attendance?: HubAttendance[]
  trips?: HubTrip[]
  tripGames?: HubTripGame[]
  tripLegs?: HubTripLeg[]
  tickets?: unknown[]
  expenses?: unknown[]
  companions?: unknown[]
  vehicles?: unknown[]
  settings?: unknown[]
  achievementUnlocks?: unknown[]
  [key: string]: unknown
}

export type NavKey = 'home' | 'games' | 'career' | 'history' | 'more'

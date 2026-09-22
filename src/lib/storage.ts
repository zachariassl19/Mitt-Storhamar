import type { AttendancePlan, GameDayRecord, HubExport, SmartGameDayEvent } from '../types'

const ATTENDANCE_KEY = 'mitt-storhamar:attendance-plan:v1'
const HUB_EXPORT_KEY = 'mitt-storhamar:hub-export:v1'
const GAME_DAY_RECORDS_KEY = 'mitt-storhamar:game-day-records:v1'
const SMART_GAME_DAY_EVENTS_KEY = 'mitt-storhamar:smart-game-day-events:v1'

export function loadAttendancePlans(): Record<string, AttendancePlan> {
  try {
    return JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveAttendancePlan(gameId: string, plan: AttendancePlan) {
  const current = loadAttendancePlans()
  current[gameId] = plan
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(current))
}

export function loadGameDayRecords(): Record<string, GameDayRecord> {
  try {
    return JSON.parse(localStorage.getItem(GAME_DAY_RECORDS_KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveGameDayRecord(record: GameDayRecord): Record<string, GameDayRecord> {
  const current = loadGameDayRecords()
  const next = { ...current, [record.gameId]: record }
  localStorage.setItem(GAME_DAY_RECORDS_KEY, JSON.stringify(next))
  return next
}

export function loadSmartGameDayEvents(): SmartGameDayEvent[] {
  try {
    return JSON.parse(localStorage.getItem(SMART_GAME_DAY_EVENTS_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveSmartGameDayEvent(event: SmartGameDayEvent): SmartGameDayEvent[] {
  const current = loadSmartGameDayEvents()
  const duplicate = current.some(
    (item) => item.gameId === event.gameId && item.type === event.type && item.observedAt === event.observedAt,
  )
  const next = duplicate ? current : [...current, event]
  localStorage.setItem(SMART_GAME_DAY_EVENTS_KEY, JSON.stringify(next))
  return next
}

export function loadHubExport(): HubExport | null {
  try {
    const raw = localStorage.getItem(HUB_EXPORT_KEY)
    return raw ? (JSON.parse(raw) as HubExport) : null
  } catch {
    return null
  }
}

export function saveHubExport(data: HubExport) {
  localStorage.setItem(HUB_EXPORT_KEY, JSON.stringify(data))
}

export function clearHubExport() {
  localStorage.removeItem(HUB_EXPORT_KEY)
}

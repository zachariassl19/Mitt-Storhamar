import type { AttendancePlan, HubExport } from '../types'

const ATTENDANCE_KEY = 'mitt-storhamar:attendance-plan:v1'
const HUB_EXPORT_KEY = 'mitt-storhamar:hub-export:v1'

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

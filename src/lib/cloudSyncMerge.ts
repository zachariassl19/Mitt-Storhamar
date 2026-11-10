import { DELETIONS_KEY } from './deletedEntities'

type StorageState = Record<string, string>
const ATTENDANCE_KEY = 'mitt-storhamar:attendance-plan:v1'
const ATTENDANCE_UPDATED_KEY = 'mitt-storhamar:attendance-updated:v1'
const TRIPS_KEY = 'mitt-storhamar:trips:v1'
const PURCHASES_KEY = 'mitt-storhamar:purchases:v1'

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function updatedAt(value: unknown) {
  if (!isObject(value)) return 0
  const candidate = value.updatedAt ?? value.observedAt ?? value.createdAt
  if (typeof candidate !== 'string') return 0
  const parsed = Date.parse(candidate)
  return Number.isFinite(parsed) ? parsed : 0
}

function entityKey(value: unknown, index: number) {
  if (!isObject(value)) return `value:${JSON.stringify(value)}:${index}`
  if (typeof value.id === 'string') return `id:${value.id}`
  if (typeof value.gameId === 'string' && typeof value.type === 'string' && typeof value.observedAt === 'string') {
    return `event:${value.gameId}:${value.type}:${value.observedAt}`
  }
  if (typeof value.gameId === 'string') return `game:${value.gameId}`
  return `value:${JSON.stringify(value)}:${index}`
}

function chooseEntity(localValue: unknown, remoteValue: unknown) {
  const localTime = updatedAt(localValue)
  const remoteTime = updatedAt(remoteValue)

  if (localTime > 0 && remoteTime > 0 && localTime !== remoteTime) {
    return localTime > remoteTime ? localValue : remoteValue
  }

  // The cloud copy wins ties/unknown timestamps. That makes a fresh install
  // restore the account's state instead of replacing it with local defaults.
  return remoteValue
}

function mergeArrays(remote: unknown[], local: unknown[]) {
  const merged = new Map<string, unknown>()

  local.forEach((value, index) => merged.set(entityKey(value, index), value))
  remote.forEach((value, index) => {
    const key = entityKey(value, index)
    const existing = merged.get(key)
    merged.set(key, existing === undefined ? value : chooseEntity(existing, value))
  })

  return [...merged.values()]
}

function mergeObjects(remote: Record<string, unknown>, local: Record<string, unknown>) {
  const merged: Record<string, unknown> = { ...local }

  for (const [key, remoteValue] of Object.entries(remote)) {
    const localValue = merged[key]
    if (localValue === undefined) {
      merged[key] = remoteValue
      continue
    }

    if (isObject(localValue) && isObject(remoteValue)) {
      merged[key] = chooseEntity(localValue, remoteValue)
      continue
    }

    // Attendance maps and ordinary settings have no per-item timestamp.
    // Keep local-only keys but let the account copy win on conflicts.
    merged[key] = remoteValue
  }

  return merged
}

function mergeRaw(remoteRaw: string, localRaw: string) {
  if (remoteRaw === localRaw) return remoteRaw

  try {
    const remote = JSON.parse(remoteRaw) as unknown
    const local = JSON.parse(localRaw) as unknown

    if (Array.isArray(remote) && Array.isArray(local)) {
      return JSON.stringify(mergeArrays(remote, local))
    }

    if (isObject(remote) && isObject(local)) {
      return JSON.stringify(mergeObjects(remote, local))
    }
  } catch {
    // Some legacy storage values are plain strings. Cloud wins conflicts.
  }

  return remoteRaw
}

function parseObject(raw: string | undefined): Record<string, unknown> {
  try {
    const parsed = raw ? JSON.parse(raw) : null
    return isObject(parsed) ? parsed : {}
  } catch { return {} }
}

function mergedDeletionMarkers(remote: StorageState, local: StorageState): Record<string, string> {
  const a = parseObject(remote[DELETIONS_KEY])
  const b = parseObject(local[DELETIONS_KEY])
  const result: Record<string, string> = {}
  for (const [key] of Object.entries({...a, ...b})) {
    const cloud = typeof a[key] === 'string' ? a[key] as string : ''
    const device = typeof b[key] === 'string' ? b[key] as string : ''
    const cloudTime = Date.parse(cloud)
    const deviceTime = Date.parse(device)
    const chosen = Number.isFinite(cloudTime) && (!Number.isFinite(deviceTime) || cloudTime > deviceTime) ? cloud : device
    if (Number.isFinite(Date.parse(chosen))) result[key] = chosen
  }
  return result
}

function removeDeletedEntities(raw: string | undefined, kind: 'trip' | 'purchase', markers: Record<string, string>) {
  if (!raw) return raw
  try {
    const rows = JSON.parse(raw) as unknown
    if (!Array.isArray(rows)) return raw
    return JSON.stringify(rows.filter((row) => {
      if (!isObject(row) || typeof row.id !== 'string') return true
      const deleted = Date.parse(markers[`${kind}:${row.id}`] ?? '')
      if (!Number.isFinite(deleted)) return true
      const updated = typeof row.updatedAt === 'string' ? Date.parse(row.updatedAt) : Number.NaN
      return Number.isFinite(updated) && updated > deleted
    }))
  } catch { return raw }
}

export function mergeCloudStorage(remote: StorageState, local: StorageState): StorageState {
  const merged: StorageState = { ...local }

  for (const [key, remoteRaw] of Object.entries(remote)) {
    const localRaw = local[key]
    merged[key] = localRaw === undefined ? remoteRaw : mergeRaw(remoteRaw, localRaw)
  }

  // Per-game timestamps avoid overwriting a new Ja/Nei choice with an old cloud value.
  if (ATTENDANCE_KEY in local || ATTENDANCE_KEY in remote) {
    const remotePlans = parseObject(remote[ATTENDANCE_KEY])
    const localPlans = parseObject(local[ATTENDANCE_KEY])
    const remoteTimes = parseObject(remote[ATTENDANCE_UPDATED_KEY])
    const localTimes = parseObject(local[ATTENDANCE_UPDATED_KEY])
    const plans: Record<string, unknown> = {}
    const times: Record<string, string> = {}
    for (const gameId of new Set([...Object.keys(remotePlans), ...Object.keys(localPlans)])) {
      const r = Date.parse(typeof remoteTimes[gameId] === 'string' ? remoteTimes[gameId] as string : '')
      const l = Date.parse(typeof localTimes[gameId] === 'string' ? localTimes[gameId] as string : '')
      const newerLocal = Number.isFinite(l) && (!Number.isFinite(r) || l > r)
      const localOnly = !(gameId in remotePlans)
      plans[gameId] = (newerLocal || localOnly) ? localPlans[gameId] : remotePlans[gameId]
      const timestamp = newerLocal ? localTimes[gameId] : remoteTimes[gameId]
      if (typeof timestamp === 'string') times[gameId] = timestamp
    }
    merged[ATTENDANCE_KEY] = JSON.stringify(plans)
    if (Object.keys(times).length) merged[ATTENDANCE_UPDATED_KEY] = JSON.stringify(times)
  }
  const markers = mergedDeletionMarkers(remote, local)
  if (Object.keys(markers).length > 0) {
    merged[DELETIONS_KEY] = JSON.stringify(markers)
    const trips = removeDeletedEntities(merged[TRIPS_KEY], 'trip', markers)
    const purchases = removeDeletedEntities(merged[PURCHASES_KEY], 'purchase', markers)
    if (trips !== undefined) merged[TRIPS_KEY] = trips
    if (purchases !== undefined) merged[PURCHASES_KEY] = purchases
  }
  return merged
}

type StorageState = Record<string, string>

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

export function mergeCloudStorage(remote: StorageState, local: StorageState): StorageState {
  const merged: StorageState = { ...local }

  for (const [key, remoteRaw] of Object.entries(remote)) {
    const localRaw = local[key]
    merged[key] = localRaw === undefined ? remoteRaw : mergeRaw(remoteRaw, localRaw)
  }

  return merged
}

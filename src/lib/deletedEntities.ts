/** Durable deletion markers prevent old cloud snapshots from resurrecting deleted data. */
export const DELETIONS_KEY = 'mitt-storhamar:deleted-entities:v1'
export type DeletedEntity = 'trip' | 'purchase'

export function readDeletions(): Record<string, string> {
  try {
    const value = JSON.parse(localStorage.getItem(DELETIONS_KEY) || '{}')
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  } catch { return {} }
}

export function markDeleted(kind: DeletedEntity, id: string) {
  const current = readDeletions()
  const key = `${kind}:${id}`
  current[key] = new Date().toISOString()
  localStorage.setItem(DELETIONS_KEY, JSON.stringify(current))
}

export function wasDeleted(kind: DeletedEntity, id: string, updatedAt?: string): boolean {
  const deletedAt = Date.parse(readDeletions()[`${kind}:${id}`] ?? '')
  if (!Number.isFinite(deletedAt)) return false
  const updated = updatedAt ? Date.parse(updatedAt) : Number.NaN
  return !Number.isFinite(updated) || deletedAt >= updated
}

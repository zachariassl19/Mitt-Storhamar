export type DeletionKind = 'trips' | 'purchases'

export interface DeletionMarker {
  deleted: boolean
  updatedAt: string
}

export const DELETION_MARKER_KEYS: Record<DeletionKind, string> = {
  trips: 'mitt-storhamar:deleted-trips:v1',
  purchases: 'mitt-storhamar:deleted-purchases:v1',
}

export function loadDeletionMarkers(kind: DeletionKind): Record<string, DeletionMarker> {
  try {
    const raw = localStorage.getItem(DELETION_MARKER_KEYS[kind])
    const data: unknown = raw ? JSON.parse(raw) : {}
    return data && typeof data === 'object' && !Array.isArray(data)
      ? data as Record<string, DeletionMarker> : {}
  } catch {
    return {}
  }
}

/**
 * Keep a timestamped marker for both saves and deletions. Without it, the
 * cloud merge could resurrect an object removed while another device was offline.
 */
export function recordDeletionState(kind: DeletionKind, id: string, deleted: boolean) {
  const next = {
    ...loadDeletionMarkers(kind),
    [id]: { deleted, updatedAt: new Date().toISOString() },
  }
  localStorage.setItem(DELETION_MARKER_KEYS[kind], JSON.stringify(next))
}

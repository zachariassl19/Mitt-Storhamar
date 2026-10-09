export interface DepartureChecklistData {
  checked: Record<string, boolean>
  updatedAt?: string
}

export const DEPARTURE_CHECKLIST_ITEMS = [
  { key: 'ticket', label: 'Billett eller adgang er i orden' },
  { key: 'phone', label: 'Mobilen er ladet' },
  { key: 'charger', label: 'Lader eller powerbank er pakket' },
  { key: 'scarf', label: 'Storhamar-skjerf eller drakt er med' },
  { key: 'route', label: 'Transport og rute er sjekket' },
  { key: 'departure', label: 'Avreisetid og trafikk er kontrollert' },
  { key: 'wallet', label: 'Betalingskort og legitimasjon er med' },
  { key: 'companions', label: 'Reisefølge er avklart' },
] as const

const PREFIX = 'mitt-storhamar:departure:'
export const DEPARTURE_CHECKLIST_EVENT = 'mitt-storhamar:departure-checklist-changed'

export function loadDepartureChecklist(gameId: string): DepartureChecklistData {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFIX + gameId) || '{}') as Partial<DepartureChecklistData>
    return { checked: saved.checked ?? {}, updatedAt: saved.updatedAt }
  } catch {
    return { checked: {} }
  }
}

export function saveDepartureChecklist(gameId: string, data: DepartureChecklistData) {
  const next: DepartureChecklistData = {
    ...data,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(PREFIX + gameId, JSON.stringify(next))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DEPARTURE_CHECKLIST_EVENT, { detail: { gameId, data: next } }))
  }
  return next
}

export function departureChecklistProgress(data: DepartureChecklistData) {
  const total = DEPARTURE_CHECKLIST_ITEMS.length
  const checked = DEPARTURE_CHECKLIST_ITEMS.filter((item) => data.checked[item.key]).length
  return {
    checked,
    total,
    percent: Math.round((checked / total) * 100),
    complete: total > 0 && checked === total,
  }
}

export function subscribeDepartureChecklist(
  gameId: string,
  listener: (data: DepartureChecklistData) => void,
) {
  if (typeof window === 'undefined') return () => undefined

  const handler = (event: Event) => {
    const custom = event as CustomEvent<{ gameId: string; data: DepartureChecklistData }>
    if (custom.detail?.gameId === gameId) listener(custom.detail.data)
  }
  const storageHandler = (event: StorageEvent) => {
    if (event.key === PREFIX + gameId) listener(loadDepartureChecklist(gameId))
  }

  window.addEventListener(DEPARTURE_CHECKLIST_EVENT, handler)
  window.addEventListener('storage', storageHandler)
  return () => {
    window.removeEventListener(DEPARTURE_CHECKLIST_EVENT, handler)
    window.removeEventListener('storage', storageHandler)
  }
}

export interface SmartGameDaySettings {
  enabled: boolean
  autoStartOnGameDay: boolean
}

const SETTINGS_KEY = 'mitt-storhamar:smart-gameday-settings:v1'
const LEGACY_AUTO_RESUME_KEY = 'mitt-storhamar:smart-gameday-auto-resume:v1'
export const SMART_GAME_DAY_SETTINGS_EVENT = 'mitt-storhamar:smart-gameday-settings-changed'

const defaults: SmartGameDaySettings = {
  enabled: false,
  autoStartOnGameDay: true,
}

export function loadSmartGameDaySettings(): SmartGameDaySettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SmartGameDaySettings>
      return {
        enabled: parsed.enabled === true,
        autoStartOnGameDay: parsed.autoStartOnGameDay !== false,
      }
    }

    // Flytt automatisk over tidligere «auto-gjenoppta»-valg.
    if (localStorage.getItem(LEGACY_AUTO_RESUME_KEY) === '1') {
      return { enabled: true, autoStartOnGameDay: true }
    }
  } catch {
    // Bruk trygge standardverdier hvis nettleserlagring er utilgjengelig.
  }
  return defaults
}

export function saveSmartGameDaySettings(settings: SmartGameDaySettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    if (settings.enabled) localStorage.setItem(LEGACY_AUTO_RESUME_KEY, '1')
    else localStorage.removeItem(LEGACY_AUTO_RESUME_KEY)
  } catch {
    // Innstillingen kan fortsatt brukes for denne økten via React-state.
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SMART_GAME_DAY_SETTINGS_EVENT, { detail: settings }))
  }
}

export function subscribeSmartGameDaySettings(listener: (settings: SmartGameDaySettings) => void) {
  if (typeof window === 'undefined') return () => undefined

  const onCustomEvent = (event: Event) => {
    const custom = event as CustomEvent<SmartGameDaySettings>
    listener(custom.detail ?? loadSmartGameDaySettings())
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === SETTINGS_KEY || event.key === LEGACY_AUTO_RESUME_KEY) {
      listener(loadSmartGameDaySettings())
    }
  }

  window.addEventListener(SMART_GAME_DAY_SETTINGS_EVENT, onCustomEvent)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(SMART_GAME_DAY_SETTINGS_EVENT, onCustomEvent)
    window.removeEventListener('storage', onStorage)
  }
}

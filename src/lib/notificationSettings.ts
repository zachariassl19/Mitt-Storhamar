export interface NotificationSettings {
  enabled: boolean
  gameTomorrow: boolean
  gameDay: boolean
  departure: boolean
  smartGameDay: boolean
  finishGameDay: boolean
}

const STORAGE_KEY = 'mitt-storhamar:notification-settings:v1'
const EVENT_NAME = 'mitt-storhamar:notification-settings'

export const defaultNotificationSettings: NotificationSettings = {
  enabled: false,
  gameTomorrow: true,
  gameDay: true,
  departure: true,
  smartGameDay: true,
  finishGameDay: true,
}

export function loadNotificationSettings(): NotificationSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultNotificationSettings
    return { ...defaultNotificationSettings, ...(JSON.parse(raw) as Partial<NotificationSettings>) }
  } catch {
    return defaultNotificationSettings
  }
}

export function saveNotificationSettings(settings: NotificationSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: settings }))
}

export function subscribeNotificationSettings(callback: (settings: NotificationSettings) => void) {
  const handler = (event: Event) => {
    callback((event as CustomEvent<NotificationSettings>).detail)
  }
  window.addEventListener(EVENT_NAME, handler)
  return () => window.removeEventListener(EVENT_NAME, handler)
}

const STORAGE_KEY = 'mitt-storhamar:smart-gameday-auto-resume:v1'

function isEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function setEnabled(enabled: boolean) {
  try {
    if (enabled) localStorage.setItem(STORAGE_KEY, '1')
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Lagring kan være blokkert i enkelte nettlesermoduser. GPS fungerer fortsatt manuelt.
  }
}

function smartGameDayButton(label: string) {
  return [...document.querySelectorAll<HTMLButtonElement>('.smart-game-day-card button')]
    .find((button) => button.textContent?.includes(label))
}

async function geolocationPermissionDenied() {
  if (!navigator.permissions?.query) return false
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' })
    return permission.state === 'denied'
  } catch {
    return false
  }
}

/**
 * PWA-er kan ikke holde vanlig web-geolocation pålitelig aktiv når Android
 * dreper eller suspenderer appen. Denne hjelperen husker derfor at brukeren
 * startet Smart Kampdag og starter watchPosition igjen når appen åpnes eller
 * blir synlig på nytt. Brukeren kan alltid avslutte med «Stopp GPS».
 */
export function installSmartGameDayAutoResume() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => undefined

  let visibilityGeneration = 0
  let attemptedGeneration = -1
  let disposed = false

  async function tryResume() {
    if (disposed || document.hidden || !isEnabled()) return
    if (attemptedGeneration === visibilityGeneration) return

    const startButton = smartGameDayButton('Start Smart Kampdag')
    if (!startButton || startButton.disabled) return
    if (await geolocationPermissionDenied()) return
    if (disposed || document.hidden || !isEnabled()) return

    attemptedGeneration = visibilityGeneration
    startButton.click()
  }

  function onClick(event: Event) {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('button')
    if (!button?.closest('.smart-game-day-card')) return

    const label = button.textContent ?? ''
    if (label.includes('Start Smart Kampdag')) {
      setEnabled(true)
    } else if (label.includes('Stopp GPS')) {
      setEnabled(false)
    }
  }

  function onVisibilityChange() {
    if (!document.hidden) {
      visibilityGeneration += 1
      void tryResume()
    }
  }

  const observer = new MutationObserver(() => {
    void tryResume()
  })

  document.addEventListener('click', onClick)
  document.addEventListener('visibilitychange', onVisibilityChange)
  observer.observe(document.documentElement, { childList: true, subtree: true })
  queueMicrotask(() => void tryResume())

  return () => {
    disposed = true
    observer.disconnect()
    document.removeEventListener('click', onClick)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }
}

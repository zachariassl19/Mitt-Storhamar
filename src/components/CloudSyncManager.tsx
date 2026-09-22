import { useEffect, useRef, useState } from 'react'
import { Cloud, CloudOff, LogIn, LogOut, RefreshCw, ShieldCheck, X } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const APP_STORAGE_PREFIX = 'mitt-storhamar:'
const CLOUD_SCHEMA_VERSION = 1

type SyncStatus = 'local' | 'syncing' | 'synced' | 'error'

type CloudSnapshot = {
  schemaVersion: number
  savedAt: string
  storage: Record<string, string>
}

type RemoteState = {
  state: CloudSnapshot | null
  updated_at: string
}

function readAppStorage() {
  const storage: Record<string, string> = {}
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (!key?.startsWith(APP_STORAGE_PREFIX)) continue
    const value = localStorage.getItem(key)
    if (value != null) storage[key] = value
  }
  return storage
}

function storageFingerprint(storage: Record<string, string>) {
  return JSON.stringify(
    Object.keys(storage)
      .sort()
      .map((key) => [key, storage[key]]),
  )
}

function replaceAppStorage(storage: Record<string, string>) {
  const existing: string[] = []
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (key?.startsWith(APP_STORAGE_PREFIX)) existing.push(key)
  }

  for (const key of existing) {
    if (!(key in storage)) localStorage.removeItem(key)
  }
  for (const [key, value] of Object.entries(storage)) {
    localStorage.setItem(key, value)
  }
}

function mergeFirstSync(remote: Record<string, string>, local: Record<string, string>) {
  // Existing local data wins on the first login on a device so a first sync can
  // never silently throw away a locally registered match, trip or import.
  return { ...remote, ...local }
}

function snapshotFromLocal(): CloudSnapshot {
  return {
    schemaVersion: CLOUD_SCHEMA_VERSION,
    savedAt: new Date().toISOString(),
    storage: readAppStorage(),
  }
}

async function fetchRemoteState(userId: string): Promise<RemoteState | null> {
  const { data, error } = await supabase
    .from('user_state')
    .select('state, updated_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return data as RemoteState
}

async function writeRemoteState(userId: string, snapshot: CloudSnapshot) {
  const { data, error } = await supabase
    .from('user_state')
    .upsert({ user_id: userId, state: snapshot }, { onConflict: 'user_id' })
    .select('updated_at')
    .single()

  if (error) throw error
  return data.updated_at as string
}

export function CloudSyncManager() {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<SyncStatus>('local')
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const initializedUserRef = useRef<string | null>(null)
  const lastFingerprintRef = useRef(storageFingerprint(readAppStorage()))
  const lastRemoteUpdatedAtRef = useRef<string | null>(null)
  const pushingRef = useRef(false)

  async function pushCurrent(localUser = user) {
    if (!localUser || pushingRef.current) return
    pushingRef.current = true
    setStatus('syncing')
    try {
      const snapshot = snapshotFromLocal()
      const updatedAt = await writeRemoteState(localUser.id, snapshot)
      lastFingerprintRef.current = storageFingerprint(snapshot.storage)
      lastRemoteUpdatedAtRef.current = updatedAt
      setStatus('synced')
      setMessage('Synket privat til Mitt Storhamar.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Kunne ikke synkronisere.')
    } finally {
      pushingRef.current = false
    }
  }

  async function bootstrap(localUser: User) {
    if (initializedUserRef.current === localUser.id) return
    initializedUserRef.current = localUser.id
    setStatus('syncing')

    try {
      const local = readAppStorage()
      const remote = await fetchRemoteState(localUser.id)

      if (!remote?.state?.storage) {
        const updatedAt = await writeRemoteState(localUser.id, snapshotFromLocal())
        lastRemoteUpdatedAtRef.current = updatedAt
        lastFingerprintRef.current = storageFingerprint(readAppStorage())
        setStatus('synced')
        setMessage('Privat synk er aktiv. Lokale data er sikkerhetskopiert.')
        return
      }

      const remoteStorage = remote.state.storage
      const remoteFingerprint = storageFingerprint(remoteStorage)
      const localFingerprint = storageFingerprint(local)
      lastRemoteUpdatedAtRef.current = remote.updated_at

      if (remoteFingerprint === localFingerprint) {
        lastFingerprintRef.current = localFingerprint
        setStatus('synced')
        setMessage('Privat synk er aktiv.')
        return
      }

      const merged = Object.keys(local).length === 0
        ? remoteStorage
        : mergeFirstSync(remoteStorage, local)
      const mergedFingerprint = storageFingerprint(merged)

      replaceAppStorage(merged)
      const updatedAt = await writeRemoteState(localUser.id, {
        schemaVersion: CLOUD_SCHEMA_VERSION,
        savedAt: new Date().toISOString(),
        storage: merged,
      })
      lastFingerprintRef.current = mergedFingerprint
      lastRemoteUpdatedAtRef.current = updatedAt
      setStatus('synced')
      setMessage('Lokale og private skydata er slått sammen.')

      if (mergedFingerprint !== localFingerprint) window.location.reload()
    } catch (error) {
      initializedUserRef.current = null
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Kunne ikke starte privat synk.')
    }
  }

  async function pullIfNewer() {
    if (!user || pushingRef.current) return
    try {
      const remote = await fetchRemoteState(user.id)
      if (!remote?.state?.storage) return
      if (remote.updated_at === lastRemoteUpdatedAtRef.current) return

      const localStorageState = readAppStorage()
      const localFingerprint = storageFingerprint(localStorageState)
      if (localFingerprint !== lastFingerprintRef.current) {
        await pushCurrent(user)
        return
      }

      const remoteFingerprint = storageFingerprint(remote.state.storage)
      lastRemoteUpdatedAtRef.current = remote.updated_at
      if (remoteFingerprint === localFingerprint) return

      replaceAppStorage(remote.state.storage)
      lastFingerprintRef.current = remoteFingerprint
      setStatus('synced')
      setMessage('Nyere data fra en annen enhet er hentet.')
      window.location.reload()
    } catch {
      // A temporary network error must never stop the local app from working.
    }
  }

  useEffect(() => {
    let mounted = true

    void supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      const currentUser = data.session?.user ?? null
      setUser(currentUser)
      if (currentUser) void bootstrap(currentUser)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      const nextUser = session?.user ?? null
      setUser(nextUser)
      if (nextUser) void bootstrap(nextUser)
      else {
        initializedUserRef.current = null
        setStatus('local')
      }
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!user) return

    const localTimer = window.setInterval(() => {
      const fingerprint = storageFingerprint(readAppStorage())
      if (fingerprint !== lastFingerprintRef.current && !pushingRef.current) {
        void pushCurrent(user)
      }
    }, 1800)

    const remoteTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void pullIfNewer()
    }, 30_000)

    const onVisible = () => {
      if (document.visibilityState === 'visible') void pullIfNewer()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.clearInterval(localTimer)
      window.clearInterval(remoteTimer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [user])

  async function signIn() {
    if (!email.trim() || !password) {
      setMessage('Skriv inn e-post og passord.')
      return
    }
    setStatus('syncing')
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) {
      setStatus('error')
      setMessage(error.message)
      return
    }
    setPassword('')
    setMessage('Logget inn. Starter privat synk…')
  }

  async function signUp() {
    if (!email.trim() || password.length < 6) {
      setMessage('Bruk en gyldig e-post og minst 6 tegn i passordet.')
      return
    }
    setStatus('syncing')
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })
    if (error) {
      setStatus('error')
      setMessage(error.message)
      return
    }
    setPassword('')
    if (data.session) {
      setMessage('Konto opprettet. Privat synk starter nå.')
    } else {
      setStatus('local')
      setMessage('Konto opprettet. Bekreft e-posten, og logg deretter inn her.')
    }
  }

  async function signOut() {
    await pushCurrent(user)
    await supabase.auth.signOut()
    setOpen(false)
    setMessage('Logget ut. Appen fungerer fortsatt lokalt på denne enheten.')
  }

  const label = user
    ? status === 'syncing' ? 'Synker…' : status === 'error' ? 'Synkfeil' : 'Privat synk'
    : 'Privat synk'

  return (
    <>
      <button
        className={`cloud-sync-trigger ${user ? 'connected' : ''} ${status}`}
        onClick={() => setOpen(true)}
        aria-label="Åpne privat synk"
      >
        {user ? <Cloud size={16} /> : <CloudOff size={16} />}
        <span>{label}</span>
      </button>

      {open && (
        <div className="cloud-sync-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="cloud-sync-modal" role="dialog" aria-modal="true" aria-label="Privat synk" onMouseDown={(event) => event.stopPropagation()}>
            <button className="cloud-sync-close" onClick={() => setOpen(false)} aria-label="Lukk"><X size={18} /></button>
            <div className="cloud-sync-title">
              <ShieldCheck size={24} />
              <div><span>PRIVAT</span><h2>Synk mellom enheter</h2></div>
            </div>

            {user ? (
              <>
                <p>Innlogget data lagres privat i Supabase og er beskyttet med Row Level Security. GitHub-repoet inneholder ikke Hjem-adressen din.</p>
                <div className="cloud-sync-account"><span>Konto</span><strong>{user.email ?? 'Innlogget bruker'}</strong></div>
                <button className="cloud-sync-primary" onClick={() => void pushCurrent()} disabled={status === 'syncing'}>
                  <RefreshCw size={16} className={status === 'syncing' ? 'spinning' : ''} /> Synk nå
                </button>
                <button className="cloud-sync-secondary" onClick={() => void signOut()}><LogOut size={16} /> Logg ut</button>
              </>
            ) : (
              <>
                <p>Opprett én privat konto. Da følger Hjem, reiser, oppmøte, kostnader og importerte data deg mellom mobil og PC.</p>
                <label><span>E-post</span><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
                <label><span>Passord</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
                <button className="cloud-sync-primary" onClick={() => void signIn()} disabled={status === 'syncing'}><LogIn size={16} /> Logg inn</button>
                <button className="cloud-sync-secondary" onClick={() => void signUp()} disabled={status === 'syncing'}>Opprett konto</button>
              </>
            )}

            {message && <p className={`cloud-sync-message ${status}`}>{message}</p>}
          </section>
        </div>
      )}
    </>
  )
}

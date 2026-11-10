import { useState } from 'react'
import { Database, Download, Upload } from 'lucide-react'
import { createLocalBackup, parseLocalBackup, PRIVATE_STORAGE_PREFIX } from '../lib/localBackup'

function appStorage(): Record<string, string> {
  const data: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith(PRIVATE_STORAGE_PREFIX)) continue
    const value = localStorage.getItem(key)
    if (value !== null) data[key] = value
  }
  return data
}

export function LocalBackupManager() {
  const [message, setMessage] = useState('')
  async function importFile(file: File | undefined) {
    if (!file) return
    try {
      const data = parseLocalBackup(JSON.parse(await file.text()) as unknown)
      const keys = Object.keys(data.storage)
      const date = new Intl.DateTimeFormat('nb-NO', {day:'numeric',month:'short',year:'numeric'}).format(new Date(data.exportedAt))
      if (!window.confirm('Importere sikkerhetskopi fra ' + date + ' med ' + keys.length + ' datadeler? Dette kan overskrive lokale opplysninger. Lagre en sikkerhetskopi av dagens data først.')) {
        setMessage('Import avbrutt. Ingenting ble endret.')
        return
      }

      // Best-effort rollback if the browser refuses a storage write.
      const before = appStorage()
      try {
        for (const [key, value] of Object.entries(data.storage)) localStorage.setItem(key, value)
      } catch {
        for (const key of keys) if (!(key in before)) localStorage.removeItem(key)
        for (const [key, value] of Object.entries(before)) localStorage.setItem(key, value)
        throw new Error('Lagringen mislyktes. Tidligere lokale data ble forsøkt gjenopprettet.')
      }
      window.location.reload()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Kunne ikke lese sikkerhetskopien.')
    }
  }

  function exportFile() {
    try {
      const backup = createLocalBackup(appStorage())
      const blob = new Blob([JSON.stringify(backup, null, 2)], {type:'application/json'})
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'mitt-storhamar-sikkerhetskopi-' + new Date().toISOString().slice(0,10) + '.json'
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setMessage('Sikkerhetskopien er klar i nedlastingene dine.')
    } catch {
      setMessage('Kunne ikke lage sikkerhetskopi på denne enheten.')
    }
  }

  return <article className="card local-backup-card">
    <div className="card-heading"><div><span className="eyebrow">DINE DATA</span><h2>Sikkerhetskopi</h2></div><Database size={22}/></div>
    <p>Ta vare på kamper, reiser, økonomi og personlige valg. Filen kan inneholde hjemmeadresse og navn på reisefølge. Oppbevar den privat.</p>
    <div className="local-backup-actions">
      <button type="button" onClick={exportFile}><Download size={17}/> Last ned kopi</button>
      <label><Upload size={17}/> Gjenopprett fra fil<input type="file" accept="application/json,.json" onChange={event=>{void importFile(event.target.files?.[0]);event.target.value=''}}/></label>
    </div>
    <small>Import overskriver tilsvarende lokale data etter bekreftelse. Privat synk kan senere synkronisere disse endringene mellom enheter.</small>
    {message && <p role="status" className="local-backup-message">{message}</p>}
  </article>
}

export const BACKUP_FORMAT = 'mitt-storhamar-local-backup-v1'
export const PRIVATE_STORAGE_PREFIX = 'mitt-storhamar:'

export interface LocalBackupFile {
  format: typeof BACKUP_FORMAT
  exportedAt: string
  storage: Record<string, string>
}

/** Only app-owned keys, never Supabase auth sessions or native GPS sessions. */
export function createLocalBackup(entries: Record<string, string>, now = new Date()): LocalBackupFile {
  const storage = Object.fromEntries(
    Object.entries(entries).filter(([key, value]) => key.startsWith(PRIVATE_STORAGE_PREFIX) && typeof value === 'string'),
  )
  return { format: BACKUP_FORMAT, exportedAt: now.toISOString(), storage }
}

/** Validate everything before changing persistent local data. */
export function parseLocalBackup(input: unknown): LocalBackupFile {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Ugyldig sikkerhetskopi.')
  const data = input as Record<string, unknown>
  if (data.format !== BACKUP_FORMAT || !data.storage || typeof data.storage !== 'object' || Array.isArray(data.storage)) {
    throw new Error('Dette er ikke en sikkerhetskopi fra Mitt Storhamar.')
  }
  const storage = data.storage as Record<string, unknown>
  const keys = Object.keys(storage)
  if (!keys.length || keys.some(key => !key.startsWith(PRIVATE_STORAGE_PREFIX) || typeof storage[key] !== 'string')) {
    throw new Error('Sikkerhetskopien inneholder ugyldige appdata.')
  }
  if (typeof data.exportedAt !== 'string' || !Number.isFinite(Date.parse(data.exportedAt))) {
    throw new Error('Sikkerhetskopien mangler eksportdato.')
  }
  return { format: BACKUP_FORMAT, exportedAt: data.exportedAt, storage: storage as Record<string, string> }
}

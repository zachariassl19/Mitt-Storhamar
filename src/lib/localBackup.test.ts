import { describe, expect, it } from 'vitest'
import { createLocalBackup, parseLocalBackup, BACKUP_FORMAT } from './localBackup'

describe('user-owned offline backup', () => {
  it('keeps only Mitt Storhamar keys and excludes Supabase auth state', () => {
    const backup = createLocalBackup({
      'mitt-storhamar:trips:v1': '[{"id":"trip:1"}]',
      'supabase.auth.token': 'never-export-this',
      'private-native-trip-session:v1': 'no-gps-session',
    }, new Date('2026-11-10T10:00:00Z'))
    expect(backup.format).toBe(BACKUP_FORMAT)
    expect(backup.storage).toEqual({ 'mitt-storhamar:trips:v1': '[{"id":"trip:1"}]' })
    expect(parseLocalBackup(backup).storage['mitt-storhamar:trips:v1']).toContain('trip:1')
  })
  it('rejects wrong formats and unexpected keys before restore', () => {
    expect(() => parseLocalBackup({ format:'wrong', storage:{a:'b'} })).toThrow()
    expect(() => parseLocalBackup({format:BACKUP_FORMAT, exportedAt:'2026-11-10', storage: {'supabase.auth.token':'secret'}})).toThrow()
    expect(() => parseLocalBackup({format:BACKUP_FORMAT, exportedAt:'2026-11-10', storage: {'mitt-storhamar:trips:v1': 23}})).toThrow()
  })
})

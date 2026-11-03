import sourceSnapshot from './numbersFull.json'
import { historyArchive } from './catalog'

/**
 * Complete number-history table copied from SIL-arkivet, 2026-11-03.
 * All source rows are preserved even when the player has no detail profile.
 * Missing year or broken HTML in source is kept as an explicit warning.
 */
export const officialNumberSource = sourceSnapshot.source
export const officialNumberSnapshotDate = sourceSnapshot.asOf
export const officialNumberSourceIssues = sourceSnapshot.sourceIssues
export const documentedNumberRows = sourceSnapshot.entries

export interface NumberHolder {
  name: string
  period: string
  profileId?: string
  profileKind?: 'player' | 'legend'
  sourceWarning?: string
}
export interface NumberHistoryRow { number: string; holders: NumberHolder[] }

function normalized(name: string) {
  return name.trim().toLocaleLowerCase('nb-NO').normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'').replace(/ø/g,'o').replace(/æ/g,'ae').replace(/å/g,'a')
}

export const numberIndex: NumberHistoryRow[] = Array.from({ length: 98 }, (_, index) => {
  const number = String(index+1).padStart(2,'0')
  const holders = documentedNumberRows
    .filter((entry)=>entry.number===number)
    .map((entry):NumberHolder=>{
      const name=normalized(entry.name)
      const player=historyArchive.players.find((p)=>normalized(p.fullName)===name)
      const legend=player ? undefined : historyArchive.legends.find((p)=>normalized(p.fullName)===name)
      return {
        name: entry.name,
        period: entry.period,
        sourceWarning:'sourceWarning' in entry ? String(entry.sourceWarning ?? '') : undefined,
        profileId:player?.id ?? legend?.id,
        profileKind:player?'player':legend?'legend':undefined,
      }
    })
  return {number,holders}
})

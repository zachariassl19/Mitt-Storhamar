import { historyArchive } from './catalog'
import type { ArchivePerson } from './types'

/**
 * Number explorer links documented archive profiles. This is deliberately NOT
 * labelled the full 01–98 number index: SIL-arkivet lists additional alumni
 * that have not yet been imported as full profiles.
 */
export const officialNumberSource = 'https://silarkivet.no/tidslinje/nummerhistorikk/'
export interface NumberHolder { name: string; profileId?: string; profileKind?: 'player' | 'legend'; documentation: 'profile' | 'sil-index' }
export interface NumberHistoryRow { number: string; holders: NumberHolder[] }

const documentedNumberExamples: Array<{ name: string; number: number }> = [
  { name:'Eirik Skadsdammen', number:8 },
  { name:'Tom Erik Olsen', number:9 },
  { name:'Ole Eskild Dahlstrøm', number:10 },
  { name:'Steinar Johansen', number:11 },
  { name:'Pål Johnsen', number:18 },
  { name:'Erik Kristiansen', number:20 },
  { name:'Jonas Norgren', number:15 },
  { name:'Christian Larrivée', number:23 },
  { name:'Patrick Thoresen', number:41 },
]

function normalized(name: string) {
  return name.toLocaleLowerCase('nb-NO').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
export const numberIndex: NumberHistoryRow[] = Array.from({ length: 98 }, (_, index) => {
  const number = index + 1
  const holders: NumberHolder[] = []
  function add(name: string, profileId?: string, profileKind?: 'player' | 'legend', documentation: 'profile' | 'sil-index' = 'profile') {
    if (!holders.some((holder) => normalized(holder.name) === normalized(name))) holders.push({ name, profileId, profileKind, documentation })
  }
  for (const [kind, people] of [['player',historyArchive.players],['legend',historyArchive.legends]] as const) {
    for (const person of people as readonly ArchivePerson[]) {
      const wears = person.shirtNumbers?.some((entry) => {
        const value = String(entry).trim()
        return /^\d{1,2}$/.test(value) && Number(value) === number
      })
      if (wears) add(person.fullName, person.id, kind, 'profile')
    }
  }
  for (const example of documentedNumberExamples.filter((entry) => entry.number === number)) {
    const person = historyArchive.players.find((p) => normalized(p.fullName) === normalized(example.name))
      ?? historyArchive.legends.find((p) => normalized(p.fullName) === normalized(example.name))
    const kind = person ? (historyArchive.players.some((p) => p.id === person.id) ? 'player' : 'legend') : undefined
    add(example.name, person?.id, kind, 'sil-index')
  }
  holders.sort((a,b)=>a.name.localeCompare(b.name,'nb-NO'))
  return { number: String(number).padStart(2,'0'), holders }
})

import { useState } from 'react'
import type { Game, AttendancePlan } from './types'

type ChecklistData = { checked: Record<string, boolean> }
const items = [
  ['ticket', 'Billett eller adgang er i orden'],
  ['phone', 'Mobilen er ladet'],
  ['charger', 'Lader eller powerbank er pakket'],
  ['scarf', 'Storhamar-skjerf eller drakt er med'],
  ['route', 'Transport og rute er sjekket'],
  ['departure', 'Avreisetid og trafikk er kontrollert'],
  ['wallet', 'Betalingskort og legitimasjon er med'],
  ['companions', 'Reisefølge er avklart'],
]
const blank = (): ChecklistData => ({ checked: {} })
function read(id: string): ChecklistData {
  try {
    const saved = JSON.parse(localStorage.getItem('mitt-storhamar:departure:' + id) || '{}')
    return { ...blank(), ...saved, checked: saved.checked ?? {} }
  } catch { return blank() }
}

export default function PreDepartureChecklist({ game, plan }: { game: Game; plan: AttendancePlan }) {
  const [data, setData] = useState<ChecklistData>(() => read(game.id))
  const checkedCount = items.filter(([key]) => data.checked[key]).length
  function save(next: ChecklistData) {
    setData(next)
    localStorage.setItem('mitt-storhamar:departure:' + game.id, JSON.stringify(next))
  }
  if (plan !== 'yes' && plan !== 'maybe') return null
  return <section className="card" style={{ display: 'grid', gap: 16 }}>
    <div>
      <span className="eyebrow">FØR DU REISER</span>
      <h2>Har du husket dette?</h2>
      <p>{checkedCount} av {items.length} klart – kryss av før du drar til {game.arena}.</p>
      <div className="progress-track"><div style={{ width: `${Math.round(checkedCount / items.length * 100)}%` }} /></div>
    </div>
    <div style={{ display: 'grid', gap: 10 }}>
      {items.map(([key, label]) => <label key={key} style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
        <input type="checkbox" checked={!!data.checked[key]} onChange={e => save({ ...data, checked: { ...data.checked, [key]: e.target.checked } })} style={{ width: 19, height: 19, accentColor: '#f1cb21' }} />
        <span style={{ textDecoration: data.checked[key] ? 'line-through' : 'none', opacity: data.checked[key] ? .6 : 1 }}>{label}</span>
      </label>)}
    </div>
    <small>Sjekklisten lagres på enheten og kan omfattes av appens skylagring ved aktiv synk. Utgifter registreres i den eksisterende økonomidelen.</small>
  </section>
}

import { useEffect, useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import {
  departureChecklistItems,
  departureChecklistKindLabel,
  departureChecklistProgress,
  loadDepartureChecklist,
  saveDepartureChecklist,
  subscribeDepartureChecklist,
  type DepartureChecklistData,
} from './lib/departureChecklist'
import type { Game, AttendancePlan } from './types'

export default function PreDepartureChecklist({ game, plan }: { game: Game; plan: AttendancePlan }) {
  const [data, setData] = useState<DepartureChecklistData>(() => loadDepartureChecklist(game.id))

  useEffect(() => {
    setData(loadDepartureChecklist(game.id))
    return subscribeDepartureChecklist(game.id, setData)
  }, [game.id])

  if (plan !== 'yes' && plan !== 'maybe') return null

  const items = departureChecklistItems(game)
  const progress = departureChecklistProgress(data, game)
  const kindLabel = departureChecklistKindLabel(game)

  function toggle(key: string, checked: boolean) {
    const next = saveDepartureChecklist(game.id, {
      ...data,
      checked: { ...data.checked, [key]: checked },
    })
    setData(next)
  }

  return (
    <section id="pre-departure-checklist" className={`card pre-departure-checklist ${progress.complete ? 'complete' : ''}`}>
      <div className="departure-checklist-heading">
        <div>
          <span className="eyebrow">FØR DU REISER · {kindLabel}</span>
          <h2>{progress.complete ? 'Alt er klart 💛💙' : 'Har du husket alt?'}</h2>
          <p>{progress.checked} av {progress.total} klart · kryss av før du drar til {game.arena}.</p>
        </div>
        <div className="departure-checklist-score">
          <strong>{progress.checked}/{progress.total}</strong>
          <span>KLAR</span>
        </div>
      </div>

      <div className="progress-track departure-checklist-progress">
        <div style={{ width: `${progress.percent}%` }} />
      </div>

      <div className="departure-checklist-items">
        {items.map((item) => {
          const checked = Boolean(data.checked[item.key])
          return (
            <label key={item.key} className={checked ? 'checked' : ''}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => toggle(item.key, event.target.checked)}
              />
              <span className="departure-check-icon" aria-hidden="true">
                {checked ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </span>
              <span>{item.label}</span>
            </label>
          )
        })}
      </div>

      {!progress.complete && (
        <p className="departure-checklist-note">
          Når alle punktene er krysset av viser forsiden at du er klar til å dra.
        </p>
      )}
    </section>
  )
}

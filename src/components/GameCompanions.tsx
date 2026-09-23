import { useEffect, useState } from 'react'
import { Check, Plus, UserRound, Users, X } from 'lucide-react'
import {
  addCompanion,
  companionSelectionForGame,
  loadCompanions,
  saveGameCompanionSelection,
  type GameCompanionSelection,
} from '../lib/companions'
import type { Game } from '../types'
import '../companions.css'

export function GameCompanions({
  game,
  value,
  onChange,
  embedded = false,
  autosave = true,
}: {
  game: Game
  value?: GameCompanionSelection
  onChange?: (selection: GameCompanionSelection) => void
  embedded?: boolean
  autosave?: boolean
}) {
  const [people, setPeople] = useState(() => loadCompanions())
  const [selection, setSelection] = useState<GameCompanionSelection>(() => value ?? companionSelectionForGame(game.id))
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (value) setSelection(value)
  }, [value])

  function persist(next: GameCompanionSelection) {
    if (autosave) saveGameCompanionSelection(next)
    setSelection(next)
    onChange?.(next)
    setMessage(autosave ? 'Reisefølge lagret.' : '')
  }

  function togglePerson(id: string) {
    const selected = selection.status === 'known' ? selection.companionIds : []
    const alreadySelected = selected.includes(id)
    const nextIds = alreadySelected ? selected.filter((value) => value !== id) : [...selected, id]
    persist({
      gameId: game.id,
      status: nextIds.length > 0 ? 'known' : 'unknown',
      companionIds: nextIds,
      updatedAt: new Date().toISOString(),
    })
  }

  function markAlone() {
    persist({ gameId: game.id, status: 'known', companionIds: [], updatedAt: new Date().toISOString() })
  }

  function markUnknown() {
    persist({ gameId: game.id, status: 'unknown', companionIds: [], updatedAt: new Date().toISOString() })
  }

  function addPerson() {
    const clean = newName.trim()
    if (!clean) return
    const updated = addCompanion(clean)
    setPeople(updated)
    const person = updated.find((candidate) => candidate.name.localeCompare(clean, 'nb-NO', { sensitivity: 'base' }) === 0)
    if (person) {
      const currentIds = selection.status === 'known' ? selection.companionIds : []
      persist({
        gameId: game.id,
        status: 'known',
        companionIds: [...new Set([...currentIds, person.id])],
        updatedAt: new Date().toISOString(),
      })
    }
    setNewName('')
    setAdding(false)
  }

  const alone = selection.status === 'known' && selection.companionIds.length === 0
  const unknown = selection.status === 'unknown'
  const selectedNames = people.filter((person) => selection.companionIds.includes(person.id)).map((person) => person.name)
  const Root = embedded ? 'section' : 'article'

  return (
    <Root className={embedded ? 'companions-card companions-card-embedded' : 'card detail-card companions-card'}>
      <div className="card-heading">
        <div><span className="eyebrow">REISEFØLGE</span><h2>Hvem dro du med?</h2></div>
        <Users size={21} />
      </div>
      <p className="travel-footnote">Velg én eller flere. Du kan også velge «Alene» eller «Husker ikke».</p>

      <div className="companion-choice-grid">
        {people.map((person) => {
          const selected = selection.status === 'known' && selection.companionIds.includes(person.id)
          return (
            <button key={person.id} className={selected ? 'selected' : ''} onClick={() => togglePerson(person.id)}>
              {selected ? <Check size={16} /> : <UserRound size={16} />}
              {person.name}
            </button>
          )
        })}
      </div>

      <div className="companion-state-row">
        <button className={alone ? 'selected alone' : ''} onClick={markAlone}><Check size={16} /> Alene</button>
        <button className={unknown ? 'selected unknown' : ''} onClick={markUnknown}><X size={16} /> Husker ikke</button>
      </div>

      {!adding ? (
        <button className="companion-add-button" onClick={() => setAdding(true)}><Plus size={16} /> Legg til person</button>
      ) : (
        <div className="companion-add-row">
          <input autoFocus value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Navn" onKeyDown={(event) => { if (event.key === 'Enter') addPerson() }} />
          <button onClick={addPerson} disabled={!newName.trim()}><Check size={16} /> Legg til</button>
          <button className="cancel" onClick={() => { setAdding(false); setNewName('') }} aria-label="Avbryt"><X size={16} /></button>
        </div>
      )}

      <div className="companion-current">
        <span>VALGT</span>
        <strong>{unknown ? 'Husker ikke' : alone ? 'Alene' : selectedNames.length > 0 ? selectedNames.join(' + ') : 'Ikke valgt'}</strong>
      </div>
      {message && <p className="save-success">{message}</p>}
    </Root>
  )
}

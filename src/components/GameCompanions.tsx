import { useEffect, useState } from 'react'
import { Check, Pencil, Plus, Trash2, UserRound, Users, X, RotateCcw } from 'lucide-react'
import { loadGameDayRecords } from '../lib/storage'
import { canConfirmAttendance } from '../lib/gameTime'
import {
  addCompanion,
  companionSelectionForGame,
  hideCompanion,
  loadAllCompanions,
  renameCompanion,
  restoreCompanion,
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
  const [allPeople, setAllPeople] = useState(() => loadAllCompanions())
  const [selection, setSelection] = useState<GameCompanionSelection>(() => value ?? companionSelectionForGame(game.id))
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [managing, setManaging] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState(false)

  const people = allPeople.filter(person => !person.hidden)
  const hiddenPeople = allPeople.filter(person => person.hidden)

  useEffect(() => {
    if (value) setSelection(value)
  }, [value])

  function feedback(text: string, error = false) {
    setMessage(text)
    setMessageError(error)
  }

  function persist(next: GameCompanionSelection) {
    if (autosave) saveGameCompanionSelection(next)
    setSelection(next)
    onChange?.(next)
    feedback(autosave ? 'Reisefølge lagret.' : '')
  }

  function togglePerson(id: string) {
    const selected = selection.status === 'known' ? selection.companionIds : []
    const alreadySelected = selected.includes(id)
    const nextIds = alreadySelected ? selected.filter(value => value !== id) : [...selected, id]
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

  function refreshPeople() {
    setAllPeople(loadAllCompanions())
  }

  function addPerson() {
    const clean = newName.trim()
    if (!clean) return
    if (clean.length > 80) { feedback('Navnet kan ikke være lengre enn 80 tegn.', true); return }
    const updated = addCompanion(clean)
    refreshPeople()
    const person = updated.find(candidate => candidate.name.localeCompare(clean, 'nb-NO', { sensitivity: 'base' }) === 0)
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

  function startEdit(id: string, name: string) {
    setEditingId(id)
    setEditingName(name)
    feedback('')
  }

  function saveEditedName() {
    if (!editingId) return
    const result = renameCompanion(editingId, editingName)
    feedback(result.message, !result.success)
    if (!result.success) return
    refreshPeople()
    setEditingId(null)
    setEditingName('')
  }

  function removePerson(id: string, name: string) {
    const confirmed = window.confirm(
      `Fjerne «${name}» fra listen over reisefølge? Tidligere registrerte kamper beholdes. Du kan hente personen tilbake under «Administrer navn».`,
    )
    if (!confirmed) return
    const result = hideCompanion(id)
    if (!result.success) { feedback(result.message, true); return }
    refreshPeople()
    setEditingId(null)
    // An unconfirmed plan should not keep a name that was just removed from the picker.
    const recorded = loadGameDayRecords()[game.id]
    if (!recorded?.completed && selection.companionIds.includes(id)) {
      const remaining = selection.companionIds.filter(personId => personId !== id)
      persist({
        gameId: game.id,
        status: remaining.length ? 'known' : 'unset',
        companionIds: remaining,
        updatedAt: new Date().toISOString(),
      })
    }
    feedback(result.message)
  }

  function bringBack(id: string) {
    const result = restoreCompanion(id)
    feedback(result.message, !result.success)
    if (result.success) refreshPeople()
  }

  const alone = selection.status === 'known' && selection.companionIds.length === 0
  const unknown = selection.status === 'unknown'
  // Include archived names here because they may still be part of an older completed match.
  const selectedNames = allPeople.filter(person => selection.companionIds.includes(person.id)).map(person => person.name)
  const Root = embedded ? 'section' : 'article'

  return (
    <Root className={embedded ? 'companions-card companions-card-embedded' : 'card detail-card companions-card'}>
      <div className="card-heading">
        <div><span className="eyebrow">REISEFØLGE</span><h2>{canConfirmAttendance(game) ? 'Hvem dro du med?' : 'Hvem skal du dra med?'}</h2></div>
        <Users size={21} />
      </div>
      <p className="travel-footnote">Velg én eller flere. Du kan også velge «Alene» eller «Husker ikke».</p>

      <div className="companion-choice-grid">
        {people.map(person => {
          const selected = selection.status === 'known' && selection.companionIds.includes(person.id)
          return (
            <button type="button" key={person.id} className={selected ? 'selected' : ''} onClick={() => togglePerson(person.id)}>
              {selected ? <Check size={16} /> : <UserRound size={16} />}
              {person.name}
            </button>
          )
        })}
      </div>

      <div className="companion-state-row">
        <button type="button" className={alone ? 'selected alone' : ''} onClick={markAlone}><Check size={16} /> Alene</button>
        <button type="button" className={unknown ? 'selected unknown' : ''} onClick={markUnknown}><X size={16} /> Husker ikke</button>
      </div>

      <div className="companion-management-actions">
        <button type="button" className="companion-manage-toggle" aria-expanded={managing} onClick={() => { setManaging(open => !open); setEditingId(null) }}>
          <Pencil size={16} /> {managing ? 'Lukk navneoversikten' : 'Rediger eller fjern navn'}
        </button>
      </div>

      {managing && (
        <div className="companion-manage-panel">
          <p className="travel-footnote">Endre feil navn eller fjern personer fra valgene. Tidligere kampregistreringer beholdes.</p>
          {[...people, ...hiddenPeople].map(person => (
            <div className="companion-manage-person" key={person.id}>
              {editingId === person.id ? (
                <div className="companion-edit-row">
                  <input
                    aria-label={`Nytt navn for ${person.name}`}
                    autoFocus
                    maxLength={80}
                    value={editingName}
                    onChange={event => setEditingName(event.target.value)}
                    onKeyDown={event => { if (event.key === 'Enter') saveEditedName(); if (event.key === 'Escape') setEditingId(null) }}
                  />
                  <button type="button" onClick={saveEditedName} disabled={!editingName.trim()}><Check size={15}/> Lagre</button>
                  <button type="button" className="cancel" onClick={() => setEditingId(null)} aria-label="Avbryt redigering"><X size={15}/></button>
                </div>
              ) : (
                <>
                  <span className="companion-manage-name">{person.name}{person.hidden && <small>Fjernet fra valg</small>}</span>
                  <div className="companion-manage-buttons">
                    <button type="button" onClick={() => startEdit(person.id, person.name)} aria-label={`Rediger ${person.name}`}><Pencil size={15}/> Rediger</button>
                    {person.hidden
                      ? <button type="button" onClick={() => bringBack(person.id)} aria-label={`Gjenopprett ${person.name}`}><RotateCcw size={15}/> Vis igjen</button>
                      : <button type="button" className="companion-remove" onClick={() => removePerson(person.id, person.name)} aria-label={`Fjern ${person.name}`}><Trash2 size={15}/> Fjern</button>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {!adding ? (
        <button type="button" className="companion-add-button" onClick={() => setAdding(true)}><Plus size={16} /> Legg til person</button>
      ) : (
        <div className="companion-add-row">
          <input autoFocus maxLength={80} value={newName} onChange={event => setNewName(event.target.value)} placeholder="Navn" onKeyDown={event => { if (event.key === 'Enter') addPerson() }} />
          <button type="button" onClick={addPerson} disabled={!newName.trim()}><Check size={16} /> Legg til</button>
          <button type="button" className="cancel" onClick={() => { setAdding(false); setNewName('') }} aria-label="Avbryt"><X size={16} /></button>
        </div>
      )}

      <div className="companion-current">
        <span>VALGT</span>
        <strong>{unknown ? 'Husker ikke' : alone ? 'Alene' : selectedNames.length > 0 ? selectedNames.join(' + ') : 'Ikke valgt'}</strong>
      </div>
      {message && <p role="status" className={messageError ? 'save-warning' : 'save-success'}>{message}</p>}
    </Root>
  )
}

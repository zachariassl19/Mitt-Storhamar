import { describe, expect, it } from 'vitest'
import type { Game } from '../types'
import { applyGameOverrides } from './gameOverrides'

function makeGame(id:string, startsAt:string):Game {
  return { id, season:'2026/27', startsAt, competition:'EHL',
    homeTeam:'Storhamar', awayTeam:id, arena:'CC Amfi' }
}

describe('reviewed calendar corrections',()=>{
  it('preserves game IDs when approved time or arena changes',()=>{
    const original = makeGame('game:stable','2026-11-14T16:00:00+01:00')
    const rows = [original]
    applyGameOverrides(rows, { [original.id]:{
      startsAt:'2026-11-14T20:30:00+01:00', arena:'Jordal Amfi',
      updatedAt:'2026-11-10T11:00:00Z' }})
    expect(rows[0]).toBe(original)
    expect(rows[0].id).toBe('game:stable')
    expect(rows[0].startsAt).toContain('20:30')
    expect(rows[0].arena).toBe('Jordal Amfi')
  })

  it('resorts the calendar after a moved match without regenerating IDs',()=>{
    const rows = [makeGame('first','2026-11-14T12:00:00+01:00'),
      makeGame('second','2026-11-15T12:00:00+01:00')]
    applyGameOverrides(rows, {first:{startsAt:'2026-11-16T12:00:00+01:00',updatedAt:'2026-11-10T11:00:00Z'}})
    expect(rows.map(game=>game.id)).toEqual(['second','first'])
  })

  it('ignores an invalid override instead of corrupting the schedule',()=>{
    const row=makeGame('test','2026-11-14T12:00:00+01:00')
    applyGameOverrides([row],{test:{startsAt:'invalid',arena:'',updatedAt:'2026-11-10T11:00:00Z'}})
    expect(row.startsAt).toContain('12:00')
    expect(row.arena).toBe('CC Amfi')
  })
})

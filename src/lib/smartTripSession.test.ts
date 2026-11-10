import {describe,expect,it} from 'vitest'
import {canStartSmartTrip,isSmartTripActive,makeSmartTripSession,nativeDistanceFilter,smartTripCandidates} from './smartTripSession'
import type { Game } from '../types'

const game: Game = { id:'g1',season:'2026/27',startsAt:'2026-11-14T16:00:00+01:00',competition:'EHL',homeTeam:'Vålerenga',awayTeam:'Storhamar',arena:'Jordal Amfi' }
const kickOff=Date.parse(game.startsAt)
describe('private, bounded smart travel mode',()=>{
 it('can start from 72 hours before the game and expires five hours afterwards',()=>{
  expect(canStartSmartTrip(game,kickOff-73*60*60_000)).toBe(false)
  expect(canStartSmartTrip(game,kickOff-48*60*60_000)).toBe(true)
  expect(canStartSmartTrip(game,kickOff-3*60*60_000)).toBe(true)
  const session=makeSmartTripSession(game,kickOff-3*60*60_000)!
  expect(session.gameId).toBe('g1')
  expect(isSmartTripActive(session,kickOff+4*60*60_000)).toBe(true)
  expect(isSmartTripActive(session,kickOff+5*60*60_000)).toBe(false)
  expect(canStartSmartTrip(game,kickOff+5*60*60_000)).toBe(false)
 })
 it('does not start for a game weeks away or a completed past game',()=>{
  expect(makeSmartTripSession(game,kickOff-4*24*60*60_000)).toBeNull()
  expect(makeSmartTripSession(game,kickOff+9*60*60_000)).toBeNull()
 })
 it('selects near-future matches in chronological order',()=>{
  const second={...game,id:'g2',startsAt:'2026-11-20T19:00:00+01:00'}
  const sorted=smartTripCandidates([second,game],kickOff-8*60*60_000)
  expect(sorted.map(x=>x.id)).toEqual(['g1','g2'])
 })
 it('uses wider distance filters away from arena for battery life',()=>{
  expect(nativeDistanceFilter(null)).toBe(200)
  expect(nativeDistanceFilter(30_000)).toBe(200)
  expect(nativeDistanceFilter(18_000)).toBe(100)
  expect(nativeDistanceFilter(300)).toBe(50)
 })
})

import {describe,expect,it} from 'vitest'
import {nativeReminderId,nativeReminderPlan} from './nativeNotifications'
import type {Game,Trip} from '../types'

const game:Game={id:'ehl-2026-11-14',season:'2026/27',startsAt:'2026-11-14T16:00:00+01:00',competition:'EHL',homeTeam:'Vålerenga',awayTeam:'Storhamar',arena:'Jordal Amfi'}
const start=Date.parse(game.startsAt)
const trip:Trip={
 id:'trip-1',gameId:game.id,status:'planned',desiredArrivalMinutesBefore:60,createdAt:'2026-11-01T12:00:00Z',updatedAt:'2026-11-01T12:00:00Z',
 legs:[{id:'leg-1',order:0,direction:'outbound',fromName:'Hjem',toName:'Jordal',transport:'train',durationMinutes:150}],
}
describe('Android reminder plan',()=>{
 it('schedules a deterministic four-part game reminder with a real trip duration',()=>{
  const plan=nativeReminderPlan({games:[game],trips:[trip],now:start-2*24*60*60_000,
    enabled:true,gameTomorrow:true,gameDay:true,departure:true,finishGameDay:true})
  expect(plan).toHaveLength(4)
  expect(plan.find(x=>x.kind==='departure')?.at.getTime()).toBe(start-(60+150)*60_000)
  expect(plan.find(x=>x.kind==='tomorrow')?.at.getTime()).toBe(start-24*60*60_000)
  expect(new Set(plan.map(x=>x.id)).size).toBe(4)
 })
 it('does not invent a departure reminder without durations',()=>{
  const plan=nativeReminderPlan({games:[game],trips:[],now:start-2*24*60*60_000,
    enabled:true,gameTomorrow:false,gameDay:false,departure:true,finishGameDay:false})
  expect(plan).toHaveLength(0)
 })
 it('requires explicit user permission in settings and does not schedule past reminders',()=>{
  const base={games:[game],trips:[trip],now:start-2*24*60*60_000,gameTomorrow:true,gameDay:true,departure:true,finishGameDay:true}
  expect(nativeReminderPlan({...base,enabled:false})).toHaveLength(0)
  expect(nativeReminderPlan({...base,enabled:true,now:start+1000})).toHaveLength(0)
 })
 it('uses stable Android-safe notification IDs',()=>{
  expect(nativeReminderId(game.id,'gameDay')).toBe(nativeReminderId(game.id,'gameDay'))
  expect(nativeReminderId(game.id,'gameDay')).not.toBe(nativeReminderId(game.id,'tomorrow'))
  expect(nativeReminderId(game.id,'finish')).toBeLessThan(2147483647)
 })
})

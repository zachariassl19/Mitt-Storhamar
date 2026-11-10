import { describe, expect, it } from 'vitest'
import type { Game, Trip } from '../types'
import { travelHistoryRows } from './travelHistory'
const a:Game={id:'a',season:'2026/27',startsAt:'2026-11-14T20:30:00+01:00',
  competition:'EHL',homeTeam:'Vålerenga',awayTeam:'Storhamar',arena:'Jordal Amfi'}
const b:Game={...a,id:'b',startsAt:'2026-10-31T16:00:00+01:00'}
const make=(id:string,gameId:string,status:Trip['status']):Trip=>({
  id,gameId,status,desiredArrivalMinutesBefore:60,createdAt:'2026-11-01T12:00:00Z',
  updatedAt:'2026-11-05T12:00:00Z',legs:[],
})
describe('travel history summaries',()=>{
 it('puts upcoming travel before completed older travel',()=>{
   const rows=travelHistoryRows([make('old','b','completed'),make('upcoming','a','planned')],[a,b],Date.parse('2026-11-10T12:00:00Z'))
   expect(rows.map(row=>row.trip.id)).toEqual(['upcoming','old'])
 })
 it('never treats unknown cost and kilometres as zero',()=>{
   const [row]=travelHistoryRows([make('planned','a','planned')],[a])
   expect(row.km).toBeNull()
   expect(row.cost).toBeNull()
 })
 it('distinguishes actual from estimated transport cost',()=>{
   const planned=make('cost','a','completed')
   planned.legs=[{id:'1',order:0,direction:'outbound',fromName:'Home',toName:'Arena',transport:'car',
     km:200,estimatedCost:300,actualCost:null},
     {id:'2',order:1,direction:'return',fromName:'Arena',toName:'Home',transport:'train',
     km:null,estimatedCost:120,actualCost:100}]
   const [row]=travelHistoryRows([planned],[a])
   expect(row.km).toBe(200)
   expect(row.cost).toBe(400)
   expect(row.hasEstimatedCost).toBe(true)
 })
 it('preserves older trips without a matching current-season game',()=>{
   const [row]=travelHistoryRows([make('historic','old-season','completed')],[a])
   expect(row.game).toBeNull()
   expect(row.trip.id).toBe('historic')
 })
})

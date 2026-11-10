import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import { games } from '../data/games'
import { departureTimeForTrip } from './notificationLogic'
import { loadNotificationSettings } from './notificationSettings'
import { loadTrips } from './trips'
import { loadAttendancePlans } from './storage'
import type { AttendancePlan } from '../types'
import type { Game, Trip } from '../types'

export const isNativeAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform()==='android'

export async function nativeNotificationPermission(): Promise<'granted'|'denied'|'prompt'|'unsupported'> {
  if (!isNativeAndroid()) return 'unsupported'
  try {
    const permissions=await LocalNotifications.checkPermissions()
    if(permissions.display==='granted')return 'granted'
    if(permissions.display==='denied')return 'denied'
    return 'prompt'
  } catch {
    return 'unsupported'
  }
}

export async function requestNativeNotificationPermission(): Promise<boolean> {
  if (!isNativeAndroid()) return false
  try {
    const granted = await LocalNotifications.requestPermissions()
    return granted.display==='granted'
  } catch {
    return false
  }
}

export async function sendNativeTestNotification() {
  if (!isNativeAndroid()) return false
  if (!await requestNativeNotificationPermission()) return false
  await LocalNotifications.schedule({notifications:[{
    id: 1999999999,
    title: 'Mitt Storhamar',
    body: 'Android-varsler fungerer 💛💙',
    schedule: { at: new Date(Date.now()+2500) },
    extra: { kind:'test' },
  }]})
  return true
}

type ReminderKind = 'tomorrow'|'gameDay'|'departure'|'finish'
export interface NativeReminder {
  id: number
  gameId: string
  kind: ReminderKind
  title: string
  body: string
  at: Date
}

/** Stable positive 32-bit integer; the 1.3 billion prefix marks our own IDs. */
export function nativeReminderId(gameId: string, kind: ReminderKind) {
  const input = `${gameId}:${kind}`
  let hash=2166136261
  for(let i=0;i<input.length;i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash,16777619)
  }
  return 1300000000 + (hash>>>0) % 500000000
}

export function nativeReminderPlan({
  games:allGames,trips,plans={},now=Date.now(),enabled,gameTomorrow,gameDay,departure,finishGameDay,
}:{
  games:Game[]
  trips:Trip[]
  plans?:Record<string,AttendancePlan>
  now?:number
  enabled:boolean
  gameTomorrow:boolean
  gameDay:boolean
  departure:boolean
  finishGameDay:boolean
}): NativeReminder[] {
  if (!enabled) return []
  const planned:NativeReminder[]=[]
  for(const game of allGames) {
    const start=Date.parse(game.startsAt)
    if (!Number.isFinite(start) || start<=now || start>now+30*24*60*60_000)continue
    const label=`${game.homeTeam} – ${game.awayTeam}`
    const time=new Intl.DateTimeFormat('nb-NO',{timeZone:'Europe/Oslo',hour:'2-digit',minute:'2-digit'}).format(new Date(start))
    function add(kind:ReminderKind,atMs:number,title:string,body:string) {
      if(atMs<=now) return
      planned.push({kind,gameId:game.id,id:nativeReminderId(game.id,kind),at:new Date(atMs),title,body})
    }
    if(gameTomorrow) add('tomorrow',start-24*60*60_000,'Storhamar spiller i morgen',`${label} · ${time} · ${game.arena}`)
    if(gameDay) add('gameDay',start-4*60*60_000,'Kampdag 💛💙',`${label} · ${time} · ${game.arena}`)
    if(departure && plans[game.id]!=='no') {
      const trip=trips.find((item)=>item.gameId===game.id)
      const depart=departureTimeForTrip(game,trip)
      if(depart) add('departure',depart.getTime(),'På tide å dra',`Avreise til ${label} på ${game.arena}. Se reisemodus i appen.`)
    }
    if(finishGameDay && plans[game.id]!=='no') add('finish',start+3.5*60*60_000,'Fullfør kampdagen',`Registrer oppmøte og reisen for ${label}.`)
  }
  // Future due dates only. Limit keeps Android notification scheduler manageable.
  return planned.sort((a,b)=>a.at.getTime()-b.at.getTime()).slice(0,64)
}

function isOurNotification(id:number) {
  return id>=1300000000 && id<1800000000
}

/** Runs only in native app. No service-side secrets or FCM tokens. */
export async function syncNativeNotifications() {
  if (!isNativeAndroid()) return
  const current=await LocalNotifications.getPending()
  const owned=current.notifications.filter((item)=>isOurNotification(item.id))
  if(owned.length) await LocalNotifications.cancel({notifications:owned.map((entry)=>({id:entry.id}))})
  const settings=loadNotificationSettings()
  if(!settings.enabled || await nativeNotificationPermission()!=='granted')return
  const plan=nativeReminderPlan({...settings,games,trips:loadTrips(),plans:loadAttendancePlans()})
  if(!plan.length)return
  await LocalNotifications.schedule({notifications:plan.map((item)=>({
    id:item.id,title:item.title,body:item.body,
    schedule:{at:item.at},extra:{gameId:item.gameId,kind:item.kind},
  }))})
}

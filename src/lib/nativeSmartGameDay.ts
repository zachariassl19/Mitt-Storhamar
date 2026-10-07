import { Capacitor, registerPlugin } from '@capacitor/core'
import type { SmartGameDayEvent, ArenaProximity, Game } from '../types'
import { arenaForGame } from '../data/arenas'

interface NativeLocationStatus {
  running: boolean
  gameId?: string
  proximity?: ArenaProximity
  distanceMeters?: number
  accuracyMeters?: number
  observedAt?: string
  reliable?: boolean
}

interface NativeSmartGameDayPlugin {
  startPositionNotificationTest(): Promise<NativePositionTestStatus>
  getPositionNotificationTestStatus(): Promise<NativePositionTestStatus>
  start(options: {
    gameId: string
    arenaId: string
    arenaName: string
    arenaLat: number
    arenaLon: number
    nearRadiusMeters: number
    arrivalRadiusMeters: number
  }): Promise<NativeLocationStatus>
  stop(): Promise<{ running: boolean }>
  getStatus(): Promise<NativeLocationStatus>
  drainEvents(): Promise<{ events: SmartGameDayEvent[] }>
}

export interface NativePositionTestStatus {
  state: 'idle' | 'scheduled' | 'waiting' | 'sent' | 'error'
  running: boolean
  scheduledAt?: number
  dueAt?: number
  body?: string
  measuredAt?: number
  latitude?: number
  longitude?: number
  accuracyMeters?: number
  measuredWithScreenLocked?: boolean
  screenLockedAtNotification?: boolean
  error?: string
}

export async function startPositionNotificationTest() {
  return NativeSmartGameDay.startPositionNotificationTest()
}

export async function getPositionNotificationTestStatus() {
  return NativeSmartGameDay.getPositionNotificationTestStatus()
}

const NativeSmartGameDay = registerPlugin<NativeSmartGameDayPlugin>('NativeSmartGameDay')

export function isNativeAndroid() {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android'
}

export async function startNativeSmartGameDay(game: Game) {
  const arena = arenaForGame(game)
  if (!arena || arena.latitude == null || arena.longitude == null) {
    throw new Error('Arenaen mangler GPS-punkt.')
  }

  return NativeSmartGameDay.start({
    gameId: game.id,
    arenaId: arena.id,
    arenaName: arena.name,
    arenaLat: arena.latitude,
    arenaLon: arena.longitude,
    nearRadiusMeters: arena.nearRadiusMeters ?? 1000,
    arrivalRadiusMeters: arena.arrivalRadiusMeters ?? 250,
  })
}

export async function stopNativeSmartGameDay() {
  return NativeSmartGameDay.stop()
}

export async function getNativeSmartGameDayStatus() {
  return NativeSmartGameDay.getStatus()
}

export async function drainNativeSmartGameDayEvents() {
  const result = await NativeSmartGameDay.drainEvents()
  return result.events ?? []
}


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

import { describe, expect, it } from 'vitest'
import {
  classifyArenaProximityWithAccuracy,
  isReliableArenaPosition,
} from './smartGameDay'
import type { Arena } from '../types'

const arena: Arena = {
  id: 'arena:test',
  name: 'Test Arena',
  aliases: [],
  latitude: 60,
  longitude: 11,
  arrivalRadiusMeters: 250,
  nearRadiusMeters: 1000,
}

function position(accuracy: number): GeolocationPosition {
  return {
    coords: {
      latitude: 60,
      longitude: 11,
      accuracy,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
      toJSON: () => ({}),
    },
    timestamp: Date.now(),
    toJSON: () => ({}),
  } as GeolocationPosition
}

describe('Smart Kampdag GPS confidence', () => {
  it('requires the whole accuracy circle to be inside arrival radius', () => {
    expect(classifyArenaProximityWithAccuracy(arena, 120, 50, 'outside')).toBe('arrived')
    expect(classifyArenaProximityWithAccuracy(arena, 220, 50, 'outside')).toBe('near')
  })

  it('keeps the previous state while an outside fix is still uncertain', () => {
    expect(classifyArenaProximityWithAccuracy(arena, 1100, 200, 'near')).toBe('near')
    expect(classifyArenaProximityWithAccuracy(arena, 1400, 100, 'near')).toBe('outside')
  })

  it('rejects very weak fixes for automatic arena events', () => {
    expect(isReliableArenaPosition(arena, position(80))).toBe(true)
    expect(isReliableArenaPosition(arena, position(450))).toBe(false)
  })
})

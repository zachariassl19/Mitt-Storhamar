import type { AttendancePlan, Game, GameDayRecord } from '../types'

export type GameFeatureKey = 'chl' | 'classic' | 'rivalry' | 'superfriday'

export interface GameFeature {
  key: GameFeatureKey
  label: string
}

function hasTeam(game: Game, team: string) {
  return game.homeTeam === team || game.awayTeam === team
}

export function isFridayGame(game: Game) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'Europe/Oslo',
  }).format(new Date(game.startsAt)) === 'Fri'
}

export function gameFeatures(game: Game): GameFeature[] {
  const features: GameFeature[] = []

  if (game.competition === 'CHL') {
    features.push({ key: 'chl', label: 'CHL · EUROPA' })
  }

  if (game.arena === 'Håkons Hall' || game.special?.toLowerCase().includes('håkons')) {
    features.push({ key: 'classic', label: 'HOCKEY CLASSIC' })
  }

  if (hasTeam(game, 'Vålerenga')) {
    features.push({ key: 'rivalry', label: 'RIVALOPPGJØR' })
  }

  // Presentasjonsregel i Mitt Storhamar: EHL-kamper på fredag får Superfredag-preg.
  if (game.competition === 'EHL' && isFridayGame(game)) {
    features.push({ key: 'superfriday', label: 'SUPERFREDAG' })
  }

  return features
}

export function gameFeatureClassNames(game: Game) {
  return gameFeatures(game).map((feature) => `event-${feature.key}`).join(' ')
}

export function gameStatusClass(
  game: Game,
  plan: AttendancePlan,
  record?: GameDayRecord,
  nowMs = Date.now(),
) {
  if (record?.completed) {
    if (record.attendanceActual === 'attended') return 'status-attended'
    if (record.attendanceActual === 'not_attended') return 'status-not-attended'
  }

  if (new Date(game.startsAt).getTime() < nowMs) return 'status-history-unset'

  if (plan === 'yes') return 'status-going'
  if (plan === 'maybe') return 'status-maybe'
  if (plan === 'no') return 'status-not-going'
  return 'status-unset'
}

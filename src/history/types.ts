export type ArchiveCompleteness = 'stub' | 'partial' | 'verified'

export type ArchiveEntityKind =
  | 'season'
  | 'honour'
  | 'jersey'
  | 'legend'
  | 'player'
  | 'arena'
  | 'europe'
  | 'record'
  | 'timeline'
  | 'coach'
  | 'captain'
  | 'identity'
  | 'supporter-culture'

export type ArchiveMediaType = 'photo' | 'jersey' | 'logo' | 'programme' | 'poster' | 'document' | 'other'

export interface ArchiveSource {
  id: string
  title: string
  url: string
  publisher?: string
  accessedAt?: string
  note?: string
  primary?: boolean
}

export interface ArchiveMedia {
  id: string
  type: ArchiveMediaType
  src: string
  alt: string
  caption?: string
  credit?: string
  sourceId?: string
  sourceUrl?: string
  seasonIds?: string[]
  personIds?: string[]
  tags?: string[]
  rightsNote?: string
}

export interface ArchiveLink {
  kind: ArchiveEntityKind
  id: string
  label?: string
}

export interface ArchiveBase {
  id: string
  title: string
  slug: string
  summary?: string
  body?: string[]
  completeness: ArchiveCompleteness
  sources: string[]
  media: ArchiveMedia[]
  related: ArchiveLink[]
  tags?: string[]
  lastVerifiedAt?: string
}

export interface SeasonStanding {
  competition: string
  position?: number
  gamesPlayed?: number
  wins?: number
  draws?: number
  losses?: number
  overtimeWins?: number
  overtimeLosses?: number
  goalsFor?: number
  goalsAgainst?: number
  points?: number
  note?: string
}

export interface SeasonPersonRef {
  personId: string
  role?: string
  number?: string | number
  captaincy?: 'captain' | 'assistant'
}

export interface ArchiveSeason extends ArchiveBase {
  startYear: number
  endYear: number
  displayName: string
  competitions: string[]
  coaches: string[]
  captains: string[]
  roster: SeasonPersonRef[]
  standings: SeasonStanding[]
  playoffSummary?: string
  europeSummary?: string
  trainingSummary?: string
  topScorers?: Array<{ personId: string; points?: number; goals?: number; assists?: number; note?: string }>
  honourIds: string[]
  jerseyIds: string[]
  arenaIds: string[]
  notableMomentIds: string[]
}

export type HonourType = 'norwegian-championship' | 'league-championship' | 'cup' | 'europe' | 'other'

export interface ArchiveHonour extends ArchiveBase {
  honourType: HonourType
  seasonId?: string
  year?: number
  competition?: string
  finalOpponent?: string
  decidingGame?: string
  keyPersonIds: string[]
}

export type JerseyUsage = 'home' | 'away' | 'third' | 'europe' | 'playoff' | 'preseason' | 'special' | 'testimonial' | 'other'

export interface ArchiveJersey extends ArchiveBase {
  fromSeasonId?: string
  toSeasonId?: string
  seasonIds: string[]
  usage: JerseyUsage[]
  manufacturer?: string
  designer?: string
  colours?: string[]
  frontSponsor?: string
  playerIds: string[]
  notableMomentIds: string[]
}

export interface ArchivePerson extends ArchiveBase {
  fullName: string
  born?: string
  died?: string
  birthPlace?: string
  nationality?: string
  position?: string
  shoots?: 'left' | 'right'
  shirtNumbers?: Array<string | number>
  storhamarPeriods?: Array<{ fromSeasonId?: string; toSeasonId?: string; note?: string }>
  seasonIds: string[]
  honourIds: string[]
  roles?: string[]
}

export interface ArchiveLegend extends ArchivePerson {
  honouredNumber?: string | number
  bannerText?: string
  honouredAt?: string
  honourReason?: string
}

export interface ArchiveArena extends ArchiveBase {
  name: string
  aliases?: string[]
  city?: string
  opened?: string
  closed?: string
  capacity?: number
  latitude?: number
  longitude?: number
  homeFromSeasonId?: string
  homeToSeasonId?: string
  notableMomentIds: string[]
}

export interface ArchiveRecord extends ArchiveBase {
  recordType: 'team' | 'player' | 'game' | 'season' | 'streak' | 'attendance' | 'other'
  value?: string | number
  unit?: string
  date?: string
  seasonId?: string
  personIds?: string[]
  gameIds?: string[]
}

export interface ArchiveTimelineEvent extends ArchiveBase {
  date?: string
  year?: number
  era?: string
  importance: 'major' | 'notable' | 'context'
}

export interface ArchiveEuropeCampaign extends ArchiveBase {
  seasonId: string
  competition: string
  stage?: string
  opponentNames: string[]
  gameIds?: string[]
  outcome?: string
}

export interface HistoryArchive {
  sources: ArchiveSource[]
  seasons: ArchiveSeason[]
  honours: ArchiveHonour[]
  jerseys: ArchiveJersey[]
  legends: ArchiveLegend[]
  players: ArchivePerson[]
  arenas: ArchiveArena[]
  europe: ArchiveEuropeCampaign[]
  records: ArchiveRecord[]
  timeline: ArchiveTimelineEvent[]
}

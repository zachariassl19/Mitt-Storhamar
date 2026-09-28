export type DataCompleteness = 'stub' | 'partial' | 'verified'

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

export interface ArchiveSource {
  id: string
  name: string
  url?: string
  sourceType: 'silarkivet' | 'club' | 'league' | 'federation' | 'europe' | 'media' | 'database' | 'book' | 'other'
  role: 'primary' | 'supplementary' | 'verification-only'
  notes?: string
}

export interface ArchiveMedia {
  id: string
  type: 'photo' | 'jersey' | 'logo' | 'trophy' | 'arena' | 'document' | 'other'
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

export interface ArchiveRelation {
  kind: ArchiveEntityKind
  id: string
  label?: string
}

export interface ArchiveBase {
  id: string
  title: string
  slug: string
  summary: string
  body?: string[]
  completeness: DataCompleteness
  sources: string[]
  media: ArchiveMedia[]
  related: ArchiveRelation[]
  tags?: string[]
  lastVerifiedAt?: string
}

export interface ArchiveStanding {
  competition: string
  position?: number
  gamesPlayed?: number
  wins?: number
  draws?: number
  overtimeWins?: number
  overtimeLosses?: number
  losses?: number
  goalsFor?: number
  goalsAgainst?: number
  points?: number
  note?: string
}

export interface ArchiveTopScorer {
  personId?: string
  name?: string
  goals?: number
  assists?: number
  points?: number
  note?: string
}

export interface ArchiveSeason extends ArchiveBase {
  displayName: string
  startYear: number
  endYear: number
  competitions: string[]
  coaches: string[]
  captains: string[]
  roster: string[]
  standings?: ArchiveStanding[]
  playoffSummary?: string
  europeSummary?: string
  topScorers?: ArchiveTopScorer[]
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

export type RafterHonourStatus = 'retired-number' | 'honoured-banner' | 'historic-honour' | 'unclear'

export interface ArchiveLegend extends ArchivePerson {
  honouredNumber?: string | number
  bannerText?: string
  honouredAt?: string
  honourReason?: string
  rafterStatus?: RafterHonourStatus
  rafterStatusNote?: string
}

export interface ArchiveArena extends ArchiveBase {
  name: string
  aliases?: string[]
  city?: string
  opened?: string
  closed?: string
  homeFromSeasonId?: string
  homeToSeasonId?: string
  notableMomentIds: string[]
}

export interface ArchiveEuropeCampaign extends ArchiveBase {
  seasonId: string
  competition: string
  stage?: string
  opponentNames: string[]
  gameIds: string[]
  outcome?: string
}

export type RecordType = 'team' | 'player' | 'game' | 'streak' | 'attendance' | 'other'

export interface ArchiveRecord extends ArchiveBase {
  recordType: RecordType
  value?: string | number
  unit?: string
  date?: string
  seasonId?: string
  personIds?: string[]
}

export interface ArchiveTimelineEvent extends ArchiveBase {
  date?: string
  year: number
  era?: string
  importance: 'major' | 'notable' | 'context'
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

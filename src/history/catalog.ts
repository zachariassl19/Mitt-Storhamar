import {
  earlyArenas,
  earlyHonours,
  earlyJerseys,
  earlyLegends,
  earlyPlayers,
  earlySeasons,
  earlyTimeline,
} from './earlyHistory'
import {
  players1961To1967,
  records1961To1967,
  seasons1961To1967,
  timeline1961To1967,
} from './earlyHistory1961'
import {
  players1967To1977,
  records1967To1977,
  seasons1967To1977,
  timeline1967To1977,
} from './history1967to1977'
import { jerseys1960s } from './jerseys1960s'
import { historySources } from './sources'
import type { ArchiveEntityKind, HistoryArchive } from './types'

export interface HistoryCategory {
  id: ArchiveEntityKind
  title: string
  description: string
  priority: 'primary' | 'secondary'
  icon: 'calendar' | 'trophy' | 'shirt' | 'star' | 'users' | 'globe' | 'chart' | 'arena' | 'book' | 'flame' | 'coach' | 'captain' | 'shield' | 'supporters'
}

export const historyCategories: HistoryCategory[] = [
  { id: 'season', title: 'Sesonger', description: 'Sesong for sesong fra klubbens første år til i dag.', priority: 'primary', icon: 'calendar' },
  { id: 'honour', title: 'Meritter', description: 'NM-gull, seriemesterskap og andre store prestasjoner.', priority: 'primary', icon: 'trophy' },
  { id: 'jersey', title: 'Drakter', description: 'Hjemme-, borte-, Europa- og spesialdrakter med ekte bilder.', priority: 'primary', icon: 'shirt' },
  { id: 'legend', title: 'Legender · I taket', description: 'Personene og numrene som er hedret i Storhamar.', priority: 'primary', icon: 'star' },
  { id: 'player', title: 'Spillere', description: 'Spillerarkiv knyttet til sesonger, drakter og meritter.', priority: 'primary', icon: 'users' },
  { id: 'europe', title: 'Europa', description: 'Europacup, CHL og Storhamars kamper ute i Europa.', priority: 'primary', icon: 'globe' },
  { id: 'record', title: 'Rekorder', description: 'Klubb-, lag-, spiller- og kamprekorder.', priority: 'primary', icon: 'chart' },
  { id: 'arena', title: 'Arenaer', description: 'Fra de første isflatene til dagens arenaer.', priority: 'primary', icon: 'arena' },
  { id: 'timeline', title: 'Tidslinjen', description: 'De viktigste hendelsene i Storhamars historie kronologisk.', priority: 'primary', icon: 'book' },
  { id: 'coach', title: 'Trenere', description: 'Trenerne som har ledet Storhamar gjennom epokene.', priority: 'secondary', icon: 'coach' },
  { id: 'captain', title: 'Kapteiner', description: 'Kapteiner og assisterende kapteiner gjennom historien.', priority: 'secondary', icon: 'captain' },
  { id: 'identity', title: 'Klubbidentitet', description: 'Logoer, navn, farger, Dragons-perioden og klubbens visuelle historie.', priority: 'secondary', icon: 'shield' },
  { id: 'supporter-culture', title: 'Supporterkultur', description: 'Supportere, tribuneliv, sanger, turer og store supporterøyeblikk.', priority: 'secondary', icon: 'supporters' },
]

// Arkivet fylles kun med verifisert eller tydelig markert ufullstendig research.
// Ikke bruk 0, tom statistikk eller oppdiktede felter som erstatning for manglende data.
export const historyArchive: HistoryArchive = {
  sources: historySources,
  seasons: [...earlySeasons, ...seasons1961To1967, ...seasons1967To1977],
  honours: earlyHonours,
  jerseys: [...earlyJerseys, ...jerseys1960s],
  legends: earlyLegends,
  players: [...earlyPlayers, ...players1961To1967, ...players1967To1977],
  arenas: earlyArenas,
  europe: [],
  records: [...records1961To1967, ...records1967To1977],
  timeline: [...earlyTimeline, ...timeline1961To1967, ...timeline1967To1977],
}

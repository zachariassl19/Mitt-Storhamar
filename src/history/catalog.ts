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
import {
  arenas1977To1984,
  jerseys1977To1984,
  players1977To1984,
  records1977To1984,
  seasons1977To1984,
  timeline1977To1984,
} from './history1977to1984'
import {
  jerseys1984To1990,
  players1984To1990,
  records1984To1990,
  seasons1984To1990,
  timeline1984To1990,
} from './history1984to1990'
import {
  arenas1990To1994,
  honours1990To1994,
  legends1990To1994,
  players1990To1994,
  records1990To1994,
  seasons1990To1994,
  timeline1990To1994,
} from './history1990to1994'
import {
  europe1994To1997,
  honours1994To1997,
  players1994To1997,
  records1994To1997,
  seasons1994To1997,
  timeline1994To1997,
} from './history1994to1997'
import {
  europe1997To2000,
  honours1997To2000,
  jerseys1997To2000,
  legends1997To2000,
  records1997To2000,
  seasons1997To2000,
  timeline1997To2000,
} from './history1997to2000'
import {
  europe2000To2005,
  honours2000To2005,
  players2000To2005,
  records2000To2005,
  seasons2000To2005,
  timeline2000To2005,
} from './history2000to2005'
import {
  honours2005To2010,
  jerseys2005To2010,
  legends2005To2010,
  players2005To2010,
  records2005To2010,
  seasons2005To2010,
  timeline2005To2010,
} from './history2005to2010'
import {
  jerseys2010To2015,
  players2010To2015,
  records2010To2015,
  seasons2010To2015,
  timeline2010To2015,
} from './history2010to2015'
import {
  europe2015To2020,
  honours2015To2020,
  jerseys2015To2020,
  players2015To2020,
  records2015To2020,
  seasons2015To2020,
  timeline2015To2020,
} from './history2015to2020'
import {
  legends2020To2023,
  seasons2020To2023,
  timeline2020To2023,
} from './history2020to2023'
import {
  honours2023To2026,
  legends2023To2026,
  players2023To2026,
  seasons2023To2026,
  timeline2023To2026,
} from './history2023to2026'
import { womenHistoryLegends, womenHistoryTimeline } from './historyWomen'
import { rafterLegends, rafterTimeline } from './legendsRafters'
import { withRafterStatus } from './rafterStatus'
import { withLegendMedia } from './legendMedia'
import { verifiedPlayers1997To2000 } from './players1997to2000'
import { careerLeaderboardProfiles } from './playerCareerSupplement'
import { applyVerifiedRosterResearch, buildRosterSupplementPlayers } from './rosterBridge'
import { jerseys1960s } from './jerseys1960s'
import { detailedJerseys } from './jerseysDetailed'
import { jerseys2025To2026 } from './jerseys2025to2026'
import { detailedEuropeCampaigns } from './europeDetailed'
import { europe1996Detail } from './europe1996Detail'
import {
  additionalHistoricArenas,
  additionalHistoricMoments,
  modernHistoryRecords,
} from './historyHighlights'
import { records2024Detailed } from './records2024Detailed'
import {
  resolveHonourResearch,
  resolveLegendResearch,
  resolveSeasonResearch,
  resolveTimelineResearch,
} from './researchResolutions'
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

const rawSeasons = [
  ...earlySeasons,
  ...seasons1961To1967,
  ...seasons1967To1977,
  ...seasons1977To1984,
  ...seasons1984To1990,
  ...seasons1990To1994,
  ...seasons1994To1997,
  ...seasons1997To2000,
  ...seasons2000To2005,
  ...seasons2005To2010,
  ...seasons2010To2015,
  ...seasons2015To2020,
  ...seasons2020To2023,
  ...seasons2023To2026,
]

const rawHonours = [
  ...earlyHonours,
  ...honours1990To1994,
  ...honours1994To1997,
  ...honours1997To2000,
  ...honours2000To2005,
  ...honours2005To2010,
  ...honours2015To2020,
  ...honours2023To2026,
]

const allLegends = [
  ...earlyLegends,
  ...legends1990To1994,
  ...legends1997To2000,
  ...legends2005To2010,
  ...legends2020To2023,
  ...legends2023To2026,
  ...womenHistoryLegends,
  ...rafterLegends,
]

const corePlayers = [
  ...earlyPlayers,
  ...players1961To1967,
  ...players1967To1977,
  ...players1977To1984,
  ...players1984To1990,
  ...players1990To1994,
  ...players1994To1997,
  ...verifiedPlayers1997To2000,
  ...players2000To2005,
  ...players2005To2010,
  ...players2010To2015,
  ...players2015To2020,
  ...players2023To2026,
]
const corePlayerNames = new Set(corePlayers.map((player) => player.fullName))
const careerPlayers = careerLeaderboardProfiles.filter((player) => !corePlayerNames.has(player.fullName))
const playersBeforeRosterBridge = [...corePlayers, ...careerPlayers]
const rosterSupplementPlayers = buildRosterSupplementPlayers(playersBeforeRosterBridge)
const allPlayers = [...playersBeforeRosterBridge, ...rosterSupplementPlayers]

const baseEuropeCampaigns = [
  ...europe1994To1997,
  ...europe1997To2000,
  ...europe2000To2005,
  ...europe2015To2020,
]
const verifiedEuropeDetails = [...europe1996Detail, ...detailedEuropeCampaigns]
const detailedEuropeIds = new Set(verifiedEuropeDetails.map((campaign) => campaign.id))
const allEuropeCampaigns = [
  ...baseEuropeCampaigns.filter((campaign) => !detailedEuropeIds.has(campaign.id)),
  ...verifiedEuropeDetails,
]

const rawTimeline = [
  ...earlyTimeline,
  ...timeline1961To1967,
  ...timeline1967To1977,
  ...timeline1977To1984,
  ...timeline1984To1990,
  ...timeline1990To1994,
  ...timeline1994To1997,
  ...timeline1997To2000,
  ...timeline2000To2005,
  ...timeline2005To2010,
  ...timeline2010To2015,
  ...timeline2015To2020,
  ...timeline2020To2023,
  ...timeline2023To2026,
  ...womenHistoryTimeline,
  ...rafterTimeline,
  ...additionalHistoricMoments,
]

const resolvedSeasons = rawSeasons
  .map(resolveSeasonResearch)
  .map((season) => applyVerifiedRosterResearch(season, allPlayers))

// Arkivet fylles kun med verifisert eller tydelig markert ufullstendig research.
// Ikke bruk 0, tom statistikk eller oppdiktede felter som erstatning for manglende data.
export const historyArchive: HistoryArchive = {
  sources: historySources,
  seasons: resolvedSeasons,
  honours: rawHonours.map(resolveHonourResearch),
  jerseys: [...earlyJerseys, ...jerseys1960s, ...jerseys1977To1984, ...jerseys1984To1990, ...jerseys1997To2000, ...jerseys2005To2010, ...jerseys2010To2015, ...jerseys2015To2020, ...detailedJerseys, ...jerseys2025To2026],
  legends: allLegends.map(resolveLegendResearch).map(withRafterStatus).map(withLegendMedia),
  players: allPlayers,
  arenas: [...earlyArenas, ...arenas1977To1984, ...arenas1990To1994, ...additionalHistoricArenas],
  europe: allEuropeCampaigns,
  records: [...records1961To1967, ...records1967To1977, ...records1977To1984, ...records1984To1990, ...records1990To1994, ...records1994To1997, ...records1997To2000, ...records2000To2005, ...records2005To2010, ...records2010To2015, ...records2015To2020, ...modernHistoryRecords, ...records2024Detailed],
  timeline: rawTimeline.map(resolveTimelineResearch),
}

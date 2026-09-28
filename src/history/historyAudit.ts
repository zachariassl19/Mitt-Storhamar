import { historyArchive } from './catalog'
import { canonicalEuropeCampaignIds } from './europeRegistry'
import { canonicalLeagueChampionshipIds, canonicalNorwegianChampionshipIds } from './honoursRegistry'
import { canonicalRafterLegendIds } from './legendRegistry'
import { silJerseyCoverage } from './jerseyCoverage'
import { historyResearchConflicts } from './researchConflicts'
import { championshipRosterResearch } from './rosterResearch'
import type { ArchiveBase } from './types'

export const expectedCompletedSeasonIds = Array.from({ length: 69 }, (_, index) => {
  const startYear = 1957 + index
  const endYearShort = String((startYear + 1) % 100).padStart(2, '0')
  return `season-${startYear}-${endYearShort}`
})

function partialIds(items: ArchiveBase[]) {
  return items.filter((entry) => entry.completeness !== 'verified').map((entry) => entry.id)
}

function missingIds(expected: readonly string[], actual: string[]) {
  const actualSet = new Set(actual)
  return expected.filter((id) => !actualSet.has(id))
}

export const historyAudit = {
  generatedAt: '2026-09-28',
  seasonCoverage: {
    expectedCompletedSeasons: expectedCompletedSeasonIds.length,
    actualCompletedSeasons: historyArchive.seasons.length,
    missingSeasonIds: missingIds(expectedCompletedSeasonIds, historyArchive.seasons.map((season) => season.id)),
    unexpectedSeasonIds: historyArchive.seasons
      .map((season) => season.id)
      .filter((id) => !expectedCompletedSeasonIds.includes(id)),
  },
  canonicalCoverage: {
    missingLeagueChampionships: missingIds(canonicalLeagueChampionshipIds, historyArchive.honours.map((honour) => honour.id)),
    missingNorwegianChampionships: missingIds(canonicalNorwegianChampionshipIds, historyArchive.honours.map((honour) => honour.id)),
    missingEuropeCampaigns: missingIds(canonicalEuropeCampaignIds, historyArchive.europe.map((campaign) => campaign.id)),
    missingRafterLegends: missingIds(canonicalRafterLegendIds, historyArchive.legends.map((legend) => legend.id)),
  },
  partialEntities: {
    seasons: partialIds(historyArchive.seasons),
    honours: partialIds(historyArchive.honours),
    jerseys: partialIds(historyArchive.jerseys),
    legends: partialIds(historyArchive.legends),
    players: partialIds(historyArchive.players),
    arenas: partialIds(historyArchive.arenas),
    europe: partialIds(historyArchive.europe),
    records: partialIds(historyArchive.records),
    timeline: partialIds(historyArchive.timeline),
  },
  researchConflicts: {
    open: historyResearchConflicts.filter((conflict) => conflict.status === 'open').map((conflict) => conflict.id),
    resolved: historyResearchConflicts.filter((conflict) => conflict.status === 'resolved').map((conflict) => conflict.id),
  },
  jerseys: {
    canonicalSilIndexEntries: silJerseyCoverage.length,
    archiveEntities: historyArchive.jerseys.length,
    archiveEntitiesWithRealImages: historyArchive.jerseys.filter((jersey) => jersey.media.length > 0).length,
    imageCount: historyArchive.jerseys.reduce((sum, jersey) => sum + jersey.media.length, 0),
    note: 'SIL-listen er kontrollista. Ett arkivobjekt kan dekke flere SIL-varianter og én SIL-side kan dekke flere sesonger, så antall objekter skal ikke forventes å være likt antall kontrollistepunkter.',
  },
  rosters: {
    titleSeasonsTracked: championshipRosterResearch.length,
    verifiedCompleteTitleRosters: championshipRosterResearch.filter((entry) => entry.status === 'verified-complete').length,
    partialTitleRosters: championshipRosterResearch.filter((entry) => entry.status !== 'verified-complete').map((entry) => entry.seasonId),
    note: 'Researchlaget bevarer komplette navnelister før hver spiller er koblet til en ArchivePerson-ID. Målet er fortsatt komplette staller for alle 69 ferdigspilte sesonger.',
  },
} as const

export const permanentHistoricalExceptions = [
  {
    entityId: 'season-2020-21',
    reason: 'Sesongen ble aldri ferdigspilt på grunn av koronapandemien. Partial er historisk korrekt og skal ikke tvinges til verified som om sesongen var komplett.',
  },
] as const

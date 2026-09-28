import { historyArchive } from './catalog'
import { championPlayers } from './championPlayers'
import { canonicalEuropeCampaignIds } from './europeRegistry'
import { canonicalLeagueChampionshipIds, canonicalNorwegianChampionshipIds } from './honoursRegistry'
import { canonicalRafterLegendIds } from './legendRegistry'
import { canonicalJerseyCoverageLinks, officialJerseyCoverageLinks } from './jerseyCanonicalCoverage'
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

const archiveJerseyIds = new Set(historyArchive.jerseys.map((jersey) => jersey.id))
const mappedSilJerseyLabels = canonicalJerseyCoverageLinks.filter((link) => link.archiveIds.every((id) => archiveJerseyIds.has(id)))
const officialJerseyLabels = officialJerseyCoverageLinks.filter((link) => link.archiveIds.every((id) => archiveJerseyIds.has(id)))
const championNames = new Set(historyArchive.players.map((player) => player.fullName))
const representedChampions = championPlayers.filter((entry) => championNames.has(entry.archiveName))
const rafterLegendsWithMedia = canonicalRafterLegendIds.filter((id) => {
  const legend = historyArchive.legends.find((entry) => entry.id === id)
  return Boolean(legend && legend.media.length > 0)
})
const verifiedEuropeCampaigns = canonicalEuropeCampaignIds.filter((id) => {
  const campaign = historyArchive.europe.find((entry) => entry.id === id)
  return campaign?.completeness === 'verified'
})

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
  sevenPointCoverage: {
    jerseysAndRealImages: {
      silIndexEntries: silJerseyCoverage.length,
      silEntriesMappedToArchive: mappedSilJerseyLabels.length,
      newerOfficialVariantsTracked: officialJerseyLabels.length,
      archiveJerseys: historyArchive.jerseys.length,
      archiveJerseysWithRealImages: historyArchive.jerseys.filter((jersey) => jersey.media.length > 0).length,
      openResearch: ['Dedikert 2025/26 CHL-drakt er ikke opprettet uten en sikker draktkilde.'],
    },
    rafters: {
      canonicalLegends: canonicalRafterLegendIds.length,
      legendsPresent: canonicalRafterLegendIds.length - missingIds(canonicalRafterLegendIds, historyArchive.legends.map((legend) => legend.id)).length,
      legendsWithRealMedia: rafterLegendsWithMedia.length,
    },
    honours: {
      leagueChampionshipsExpected: canonicalLeagueChampionshipIds.length,
      leagueChampionshipsPresent: canonicalLeagueChampionshipIds.length - missingIds(canonicalLeagueChampionshipIds, historyArchive.honours.map((honour) => honour.id)).length,
      norwegianChampionshipsExpected: canonicalNorwegianChampionshipIds.length,
      norwegianChampionshipsPresent: canonicalNorwegianChampionshipIds.length - missingIds(canonicalNorwegianChampionshipIds, historyArchive.honours.map((honour) => honour.id)).length,
      openResearch: ['Flere merittsider kan fortsatt få flere ekte gullbilder selv om merittregisteret er komplett.'],
    },
    europe: {
      completedCampaignsExpected: canonicalEuropeCampaignIds.length,
      verifiedCampaigns: verifiedEuropeCampaigns.length,
    },
    playersAndRosters: {
      documentedNorwegianChampions: championPlayers.length,
      championsRepresentedInArchive: representedChampions.length,
      titleSeasonsTracked: championshipRosterResearch.length,
      verifiedCompleteTitleRosters: championshipRosterResearch.filter((entry) => entry.status === 'verified-complete').length,
      partialTitleRosters: championshipRosterResearch.filter((entry) => entry.status !== 'verified-complete').map((entry) => entry.seasonId),
      openResearch: ['Komplette spillerstaller for alle 69 sesonger er fortsatt et eget forskningsarbeid; gull-/mesterskapsstallene er kommet lengst.'],
    },
    arenasRecordsMoments: {
      arenas: historyArchive.arenas.length,
      records: historyArchive.records.length,
      timelineEvents: historyArchive.timeline.length,
      keyAwayArenaArchiveAdded: ['arena-jordal-amfi-old', 'arena-jordal-amfi-new', 'arena-sparta-amfi', 'arena-leangen-ishall', 'arena-manglerudhallen', 'arena-lorenskog-ishall', 'arena-dnb-arena'],
    },
    seasonBySeasonControl: {
      expectedCompletedSeasons: expectedCompletedSeasonIds.length,
      presentCompletedSeasons: historyArchive.seasons.length,
      partialSeasonIds: partialIds(historyArchive.seasons),
      openConflictIds: historyResearchConflicts.filter((conflict) => conflict.status === 'open').map((conflict) => conflict.id),
    },
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

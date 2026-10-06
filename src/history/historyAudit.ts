import { historyArchive } from './catalog'
import { championPlayers } from './championPlayers'
import { canonicalEuropeCampaignIds } from './europeRegistry'
import { canonicalLeagueChampionshipIds, canonicalNorwegianChampionshipIds } from './honoursRegistry'
import { canonicalRafterLegendIds } from './legendRegistry'
import { canonicalJerseyCoverageLinks, officialJerseyCoverageLinks } from './jerseyCanonicalCoverage'
import { silJerseyCoverage } from './jerseyCoverage'
import { historyResearchConflicts } from './researchConflicts'
import { championshipRosterResearch } from './rosterResearch'
import { seasonPlayerStatsBySeasonId, seasonStatsCoverage } from './seasonPlayerStats'
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

const playerResearchReview = historyArchive.players.map((player) => {
  const missing: string[] = []
  if (!player.position) missing.push('position')
  if (player.seasonIds.length === 0) missing.push('season-links')
  if (!player.storhamarPeriods?.length) missing.push('storhamar-periods')
  if (!player.shirtNumbers?.length) missing.push('shirt-numbers')
  if (player.media.length === 0) missing.push('media')
  return {
    id: player.id,
    name: player.fullName,
    completeness: player.completeness,
    missing,
  }
})

const seasonStatNames = new Set(
  Object.values(seasonPlayerStatsBySeasonId).flat().map((entry) => entry.playerName),
)
const archivePlayerNames = new Set(historyArchive.players.map((player) => player.fullName))
const unmatchedSeasonStatNames = [...seasonStatNames].filter((name) => !archivePlayerNames.has(name)).sort()

const mediaCoverage = {
  players: {
    total: historyArchive.players.length,
    withMedia: historyArchive.players.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.players.filter((item) => item.media.length === 0).map((item) => item.id),
  },
  seasons: {
    total: historyArchive.seasons.length,
    withMedia: historyArchive.seasons.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.seasons.filter((item) => item.media.length === 0).map((item) => item.id),
  },
  honours: {
    total: historyArchive.honours.length,
    withMedia: historyArchive.honours.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.honours.filter((item) => item.media.length === 0).map((item) => item.id),
  },
  jerseys: {
    total: historyArchive.jerseys.length,
    withMedia: historyArchive.jerseys.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.jerseys.filter((item) => item.media.length === 0).map((item) => item.id),
  },
  europe: {
    total: historyArchive.europe.length,
    withMedia: historyArchive.europe.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.europe.filter((item) => item.media.length === 0).map((item) => item.id),
  },
  arenas: {
    total: historyArchive.arenas.length,
    withMedia: historyArchive.arenas.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.arenas.filter((item) => item.media.length === 0).map((item) => item.id),
  },
  records: {
    total: historyArchive.records.length,
    withMedia: historyArchive.records.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.records.filter((item) => item.media.length === 0).map((item) => item.id),
  },
  timeline: {
    total: historyArchive.timeline.length,
    withMedia: historyArchive.timeline.filter((item) => item.media.length > 0).length,
    missingIds: historyArchive.timeline.filter((item) => item.media.length === 0).map((item) => item.id),
  },
}

export const historyAudit = {
  generatedAt: '2026-10-06',
  mediaCoverage,
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
      archiveJerseysWithoutRealImages: historyArchive.jerseys.filter((jersey) => jersey.media.length === 0).map((jersey) => jersey.id),
      openResearch: ['Alle kontrollistevariantene er koblet til arkivet, inkludert CHL 2025/26. Eldre draktperioder uten media og perioder der ett arkivobjekt dekker flere sesonger bør fortsatt få flere sikre originalbilder og mer variantspesifikk dokumentasjon.'],
    },
    rafters: {
      canonicalLegends: canonicalRafterLegendIds.length,
      legendsPresent: canonicalRafterLegendIds.length - missingIds(canonicalRafterLegendIds, historyArchive.legends.map((legend) => legend.id)).length,
      legendsWithRealMedia: rafterLegendsWithMedia.length,
      partialLegendIds: canonicalRafterLegendIds.filter((id) => historyArchive.legends.find((legend) => legend.id === id)?.completeness !== 'verified'),
      missingHonouredNumberIds: canonicalRafterLegendIds.filter((id) => {
        const legend = historyArchive.legends.find((entry) => entry.id === id)
        return Boolean(legend && legend.honouredNumber === undefined)
      }),
      openResearch: ['Lars Løkken Østli og Lars Erik Hesbråten er dokumentert hedret i 2019, men tilgjengelig tekstkilde oppgir ikke eksplisitt hvilket av deres tidligere draktnumre som står på banneret. Dette må avgjøres fra foto/originalmateriale før honouredNumber fylles inn.'],
    },
    honours: {
      leagueChampionshipsExpected: canonicalLeagueChampionshipIds.length,
      leagueChampionshipsPresent: canonicalLeagueChampionshipIds.length - missingIds(canonicalLeagueChampionshipIds, historyArchive.honours.map((honour) => honour.id)).length,
      norwegianChampionshipsExpected: canonicalNorwegianChampionshipIds.length,
      norwegianChampionshipsPresent: canonicalNorwegianChampionshipIds.length - missingIds(canonicalNorwegianChampionshipIds, historyArchive.honours.map((honour) => honour.id)).length,
      leagueChampionshipsWithRealMedia: historyArchive.honours.filter((honour) => canonicalLeagueChampionshipIds.includes(honour.id as (typeof canonicalLeagueChampionshipIds)[number]) && honour.media.length > 0).length,
      norwegianChampionshipsWithRealMedia: historyArchive.honours.filter((honour) => canonicalNorwegianChampionshipIds.includes(honour.id as (typeof canonicalNorwegianChampionshipIds)[number]) && honour.media.length > 0).length,
      openResearch: ['Merittregisteret er komplett, men seriemesterskapene mangler fortsatt i stor grad egne ekte gull-/avgjørelsesbilder. NM-gullene har langt bedre bildedekning.'],
    },
    europe: {
      completedCampaignsExpected: canonicalEuropeCampaignIds.length,
      verifiedCampaigns: verifiedEuropeCampaigns.length,
      campaignsWithGameLinks: historyArchive.europe.filter((campaign) => (campaign.gameIds?.length ?? 0) > 0).length,
      campaignsWithRealMedia: historyArchive.europe.filter((campaign) => campaign.media.length > 0).length,
      openResearch: ['Alle 13 ferdigspilte Europa-kampanjer finnes og er verifisert på kampanjenivå, men gameIds og ekte kampbilder er fortsatt svakt dekket. Neste dybdepass bør gjøre kamp-for-kamp-kobling i stedet for bare kampanjeoppsummering.'],
    },
    playersAndRosters: {
      documentedNorwegianChampions: championPlayers.length,
      championsRepresentedInArchive: representedChampions.length,
      archivePlayerProfiles: historyArchive.players.length,
      verifiedPlayerProfiles: historyArchive.players.filter((player) => player.completeness === 'verified').length,
      partialPlayerProfiles: historyArchive.players.filter((player) => player.completeness !== 'verified').length,
      profilesWithPosition: historyArchive.players.filter((player) => Boolean(player.position)).length,
      profilesWithSeasonLinks: historyArchive.players.filter((player) => player.seasonIds.length > 0).length,
      profilesWithStorhamarPeriods: historyArchive.players.filter((player) => Boolean(player.storhamarPeriods?.length)).length,
      profilesWithShirtNumbers: historyArchive.players.filter((player) => Boolean(player.shirtNumbers?.length)).length,
      profilesWithRealMedia: historyArchive.players.filter((player) => player.media.length > 0 || historyArchive.legends.some((legend) => legend.fullName === player.fullName && legend.media.length > 0)).length,
      playerResearchReview,
      profilesNeedingResearch: playerResearchReview.filter((entry) => entry.completeness !== 'verified' || entry.missing.length > 0).map((entry) => entry.id),
      seasonsWithRosterLinks: historyArchive.seasons.filter((season) => season.roster.length > 0).length,
      seasonsWithoutRosterLinks: historyArchive.seasons.filter((season) => season.roster.length === 0).map((season) => season.id),
      titleSeasonsTracked: championshipRosterResearch.length,
      verifiedCompleteTitleRosters: championshipRosterResearch.filter((entry) => entry.status === 'verified-complete').length,
      partialTitleRosters: championshipRosterResearch.filter((entry) => entry.status !== 'verified-complete').map((entry) => entry.seasonId),
      latestTitleRosterPlayersTracked: championshipRosterResearch.find((entry) => entry.seasonId === 'season-2025-26')?.players.length ?? 0,
      seasonsWithPlayerStats: seasonStatsCoverage.length,
      playerStatRows: seasonStatsCoverage.reduce((sum, entry) => sum + entry.rows, 0),
      unmatchedSeasonStatNames,
      openResearch: ['Spillerarkivet har nå en profil-for-profil audit og sesongstatistikk fra Elite Prospects er koblet inn for utvalgte mesterskapssesonger. Alle profiler som mangler posisjon, komplette Storhamar-perioder, sesongkoblinger, nummer eller bilde står eksplisitt i researchkøen. Målet er fortsatt full spiller- og stallkontroll for alle sesonger.'],
    },
    arenasRecordsMoments: {
      arenas: historyArchive.arenas.length,
      records: historyArchive.records.length,
      timelineEvents: historyArchive.timeline.length,
      keyAwayArenaArchiveAdded: ['arena-jordal-amfi-old', 'arena-jordal-amfi-new', 'arena-sparta-amfi', 'arena-leangen-ishall', 'arena-manglerudhallen', 'arena-lorenskog-ishall', 'arena-dnb-arena'],
      arenasWithRealMedia: historyArchive.arenas.filter((arena) => arena.media.length > 0).length,
      recordsWithRealMedia: historyArchive.records.filter((record) => record.media.length > 0).length,
      timelineEventsWithRealMedia: historyArchive.timeline.filter((event) => event.media.length > 0).length,
      openResearch: ['Arena-, rekord- og øyeblikksarkivet har mange verifiserte tekster, men lite media. Bortearena-listen er heller ikke ment som komplett kampstedregister ennå; prioriter historisk viktige arenaer og koble dem til konkrete øyeblikk.'],
    },
    seasonBySeasonControl: {
      expectedCompletedSeasons: expectedCompletedSeasonIds.length,
      presentCompletedSeasons: historyArchive.seasons.length,
      partialSeasonIds: partialIds(historyArchive.seasons),
      openConflictIds: historyResearchConflicts.filter((conflict) => conflict.status === 'open').map((conflict) => conflict.id),
    },
  },
  mediaCoverage: {
    seasons: {
      total: historyArchive.seasons.length,
      withMedia: historyArchive.seasons.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.seasons.reduce((sum, item) => sum + item.media.length, 0),
    },
    honours: {
      total: historyArchive.honours.length,
      withMedia: historyArchive.honours.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.honours.reduce((sum, item) => sum + item.media.length, 0),
    },
    jerseys: {
      total: historyArchive.jerseys.length,
      withMedia: historyArchive.jerseys.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.jerseys.reduce((sum, item) => sum + item.media.length, 0),
    },
    legends: {
      total: historyArchive.legends.length,
      withMedia: historyArchive.legends.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.legends.reduce((sum, item) => sum + item.media.length, 0),
    },
    players: {
      total: historyArchive.players.length,
      withMedia: historyArchive.players.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.players.reduce((sum, item) => sum + item.media.length, 0),
    },
    arenas: {
      total: historyArchive.arenas.length,
      withMedia: historyArchive.arenas.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.arenas.reduce((sum, item) => sum + item.media.length, 0),
    },
    europe: {
      total: historyArchive.europe.length,
      withMedia: historyArchive.europe.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.europe.reduce((sum, item) => sum + item.media.length, 0),
    },
    records: {
      total: historyArchive.records.length,
      withMedia: historyArchive.records.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.records.reduce((sum, item) => sum + item.media.length, 0),
    },
    timeline: {
      total: historyArchive.timeline.length,
      withMedia: historyArchive.timeline.filter((item) => item.media.length > 0).length,
      imageCount: historyArchive.timeline.reduce((sum, item) => sum + item.media.length, 0),
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

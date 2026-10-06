import type {
  ArchiveArena,
  ArchiveEuropeCampaign,
  ArchiveHonour,
  ArchiveJersey,
  ArchiveLegend,
  ArchiveMedia,
  ArchivePerson,
  ArchiveRecord,
  ArchiveSeason,
  ArchiveTimelineEvent,
} from './types'

function mergeMedia(...groups: Array<ArchiveMedia[] | undefined>) {
  const seen = new Set<string>()
  const merged: ArchiveMedia[] = []
  for (const item of groups.flatMap((group) => group ?? [])) {
    if (!item?.src || seen.has(item.src)) continue
    seen.add(item.src)
    merged.push(item)
  }
  return merged
}

function capped(items: ArchiveMedia[], limit = 10) {
  return items.slice(0, limit)
}

export function reuseArchiveMedia(input: {
  seasons: ArchiveSeason[]
  honours: ArchiveHonour[]
  jerseys: ArchiveJersey[]
  legends: ArchiveLegend[]
  players: ArchivePerson[]
  arenas: ArchiveArena[]
  europe: ArchiveEuropeCampaign[]
  records: ArchiveRecord[]
  timeline: ArchiveTimelineEvent[]
}) {
  const players = input.players.map((player) => {
    const samePersonLegend = input.legends.find((legend) => legend.fullName === player.fullName)
    return { ...player, media: capped(mergeMedia(player.media, samePersonLegend?.media), 8) }
  })

  const legends = input.legends.map((legend) => {
    const samePersonPlayer = players.find((player) => player.fullName === legend.fullName)
    return { ...legend, media: capped(mergeMedia(legend.media, samePersonPlayer?.media), 8) }
  })

  const playerById = new Map(players.map((item) => [item.id, item]))
  const legendById = new Map(legends.map((item) => [item.id, item]))

  const personMedia = (ids?: string[]) =>
    capped(mergeMedia(...(ids ?? []).map((id) => playerById.get(id)?.media ?? legendById.get(id)?.media)), 8)

  const seasonsPass1 = input.seasons.map((season) => {
    const honourMedia = input.honours.filter((item) => item.seasonId === season.id).flatMap((item) => item.media)
    const europeMedia = input.europe.filter((item) => item.seasonId === season.id).flatMap((item) => item.media)
    const jerseyMedia = input.jerseys.filter((item) => item.seasonIds.includes(season.id)).flatMap((item) => item.media)
    const timelineMedia = input.timeline
      .filter((item) => item.related.some((link) => link.kind === 'season' && link.id === season.id))
      .flatMap((item) => item.media)
    return {
      ...season,
      media: capped(mergeMedia(season.media, honourMedia, timelineMedia, europeMedia, jerseyMedia), 10),
    }
  })
  const seasonById = new Map(seasonsPass1.map((item) => [item.id, item]))

  const honours = input.honours.map((honour) => ({
    ...honour,
    media: capped(mergeMedia(
      honour.media,
      honour.seasonId ? seasonById.get(honour.seasonId)?.media : undefined,
      personMedia(honour.keyPersonIds),
    ), 10),
  }))

  const timelineById = new Map(input.timeline.map((item) => [item.id, item]))
  const jerseys = input.jerseys.map((jersey) => ({
    ...jersey,
    media: capped(mergeMedia(
      jersey.media,
      personMedia(jersey.playerIds),
      ...jersey.notableMomentIds.map((id) => timelineById.get(id)?.media),
    ), 10),
  }))

  const relatedMedia = (related: Array<{ kind: string; id: string }>) => related.flatMap((link) => {
    if (link.kind === 'season') return seasonById.get(link.id)?.media ?? []
    if (link.kind === 'honour') return honours.find((item) => item.id === link.id)?.media ?? []
    if (link.kind === 'jersey') return jerseys.find((item) => item.id === link.id)?.media ?? []
    if (link.kind === 'player') return players.find((item) => item.id === link.id)?.media ?? []
    if (link.kind === 'legend') return legends.find((item) => item.id === link.id)?.media ?? []
    if (link.kind === 'europe') return input.europe.find((item) => item.id === link.id)?.media ?? []
    if (link.kind === 'arena') return input.arenas.find((item) => item.id === link.id)?.media ?? []
    if (link.kind === 'record') return input.records.find((item) => item.id === link.id)?.media ?? []
    if (link.kind === 'timeline') return input.timeline.find((item) => item.id === link.id)?.media ?? []
    return []
  })

  const timeline = input.timeline.map((item) => ({
    ...item,
    media: capped(mergeMedia(item.media, relatedMedia(item.related)), 10),
  }))
  const enrichedTimelineById = new Map(timeline.map((item) => [item.id, item]))

  const arenas = input.arenas.map((arena) => ({
    ...arena,
    media: capped(mergeMedia(
      arena.media,
      ...arena.notableMomentIds.map((id) => enrichedTimelineById.get(id)?.media),
      relatedMedia(arena.related),
    ), 10),
  }))

  const europe = input.europe.map((campaign) => ({
    ...campaign,
    media: capped(mergeMedia(
      campaign.media,
      seasonById.get(campaign.seasonId)?.media,
      relatedMedia(campaign.related),
    ), 10),
  }))

  const records = input.records.map((record) => ({
    ...record,
    media: capped(mergeMedia(
      record.media,
      record.seasonId ? seasonById.get(record.seasonId)?.media : undefined,
      personMedia(record.personIds),
      relatedMedia(record.related),
    ), 10),
  }))

  const seasons = seasonsPass1.map((season) => ({
    ...season,
    media: capped(mergeMedia(
      season.media,
      honours.filter((item) => item.seasonId === season.id).flatMap((item) => item.media),
      europe.filter((item) => item.seasonId === season.id).flatMap((item) => item.media),
    ), 10),
  }))

  return { seasons, honours, jerseys, legends, players, arenas, europe, records, timeline }
}

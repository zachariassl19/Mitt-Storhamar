import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleDot,
  Globe2,
  Image as ImageIcon,
  Landmark,
  Medal,
  Search,
  Shirt,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { historyArchive } from '../history/catalog'
import { historyAudit } from '../history/historyAudit'
import { championshipRosterResearch } from '../history/rosterResearch'
import { historyResearchConflicts } from '../history/researchConflicts'

type ArchiveSection = 'jerseys' | 'rafters' | 'honours' | 'europe' | 'people' | 'moments' | 'seasons'
type PeopleView = 'rosters' | 'players'
type MomentView = 'arenas' | 'records' | 'timeline'
type PlayerPositionFilter = 'all' | 'keeper' | 'back' | 'forward' | 'unknown'
type JerseyFilter = 'all' | 'yellow' | 'blue' | 'white' | 'series' | 'europe' | 'special' | 'testimonial' | 'preseason'

interface ArchiveCardItem {
  id: string
  title: string
  eyebrow: string
  summary: string
  image?: string
  imageAlt?: string
  gallery?: Array<{ src: string; alt: string; caption?: string }>
  chips: string[]
  body: string[]
  details: Array<{ label: string; value: string }>
  sourceUrl?: string
  sourceLabel?: string
  verified: boolean
  searchText: string
  group?: PlayerPositionFilter
  filterTags?: string[]
  seasonStart?: number
  rosterSections?: Array<{ label: string; names: string[] }>
}

interface SectionDefinition {
  key: ArchiveSection
  title: string
  shortTitle: string
  description: string
  count: string
  status: string
  icon: LucideIcon
  cover?: string
}

function seasonYear(id?: string) {
  const match = id?.match(/season-(\d{4})/)
  return match ? Number(match[1]) : 0
}

function dateLabel(value?: string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function sourceFor(sourceIds: string[], mediaSourceUrl?: string) {
  if (mediaSourceUrl) return { url: mediaSourceUrl, label: 'Åpne originalkilde' }
  const source = historyArchive.sources.find((item) => sourceIds.includes(item.id))
  return source ? { url: source.url, label: source.title } : undefined
}

function compactSeasonName(id?: string) {
  if (!id) return ''
  return id.replace('season-', '').replace('-', '/')
}

function statusLabel(verified: boolean) {
  return verified ? 'Verifisert' : 'Under kildekontroll'
}

function playerPositionGroup(position?: string): PlayerPositionFilter {
  const normalized = (position ?? '').toLowerCase()
  if (normalized.includes('keeper') || normalized.includes('målvakt') || normalized.includes('goalie')) return 'keeper'
  if (normalized.includes('back')) return 'back'
  if (normalized.includes('løper') || normalized.includes('forward') || normalized.includes('center') || normalized.includes('ving')) return 'forward'
  return 'unknown'
}

function positionLabel(group: PlayerPositionFilter) {
  if (group === 'keeper') return 'Keepere'
  if (group === 'back') return 'Backer'
  if (group === 'forward') return 'Forwards'
  if (group === 'unknown') return 'Ikke ferdig klassifisert'
  return 'Alle'
}

function playerByName(name: string) {
  return historyArchive.players.find((player) => player.fullName === name)
}

function mediaForPlayer(fullName: string, ownMedia?: { src: string; alt: string; sourceUrl?: string }[]) {
  if (ownMedia?.[0]) return ownMedia[0]
  return historyArchive.legends.find((legend) => legend.fullName === fullName)?.media[0]
}

function rosterGroups(names: string[]) {
  const grouped: Record<'keeper' | 'back' | 'forward' | 'unknown', string[]> = {
    keeper: [],
    back: [],
    forward: [],
    unknown: [],
  }
  for (const name of names) {
    const player = playerByName(name)
    grouped[playerPositionGroup(player?.position) as keyof typeof grouped].push(name)
  }
  return grouped
}

export function HistoryArchivePage() {
  const [section, setSection] = useState<ArchiveSection | null>(null)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [peopleView, setPeopleView] = useState<PeopleView>('rosters')
  const [momentView, setMomentView] = useState<MomentView>('arenas')
  const [pageIndex, setPageIndex] = useState(0)
  const [jerseyEra, setJerseyEra] = useState('all')
  const [jerseySort, setJerseySort] = useState<'newest'|'oldest'>('newest')
  const [playerPosition, setPlayerPosition] = useState<PlayerPositionFilter>('all')
  const [jerseyFilter, setJerseyFilter] = useState<JerseyFilter>('all')

  const recentGold = historyArchive.honours.find((honour) => honour.id === 'honour-2026-nm')?.media[0]?.src
  const recentEurope = historyArchive.europe.find((campaign) => campaign.id === 'europe-2025-26-chl')?.media[0]?.src
  const recentJersey = historyArchive.jerseys.find((jersey) => jersey.id === 'jersey-2025-26-chl')?.media[0]?.src
  const recentRafter = historyArchive.legends.find((legend) => legend.id === 'legend-patrick-thoresen')?.media[0]?.src
  const classic = historyArchive.timeline.find((event) => event.id === 'timeline-2023-hockey-classic-record')?.media[0]?.src

  const sections: SectionDefinition[] = [
    {
      key: 'jerseys',
      title: 'Drakter og ekte bilder',
      shortTitle: 'Drakter',
      description: 'Serie, sluttspill, Europa, forsesong og spesialdrakter – med ekte bilder når kilden er sikker.',
      count: `${historyArchive.jerseys.length} arkivposter`,
      status: `${historyArchive.jerseys.filter((item) => item.media.length > 0).length} med bilde`,
      icon: Shirt,
      cover: recentJersey,
    },
    {
      key: 'rafters',
      title: 'Draktene i taket',
      shortTitle: 'I taket',
      description: 'Spillerne og profilene Storhamar har hedret, med forskjell på fredet nummer og blått hedersbanner.',
      count: `${historyAudit.sevenPointCoverage.rafters.canonicalLegends} hedringer`,
      status: 'Alle har ekte media',
      icon: Medal,
      cover: recentRafter,
    },
    {
      key: 'honours',
      title: 'Meritter',
      shortTitle: 'Meritter',
      description: 'NM-gull og seriemesterskap samlet kronologisk, med avgjørende kamper og gullbilder.',
      count: '10 NM-gull · 11 seriegull',
      status: `${historyAudit.sevenPointCoverage.honours.norwegianChampionshipsWithRealMedia} NM-gull med bilde`,
      icon: Trophy,
      cover: recentGold,
    },
    {
      key: 'europe',
      title: 'Europa',
      shortTitle: 'Europa',
      description: 'Europacup, Continental Cup og Champions Hockey League fra første europakamp til nyere CHL-eventyr.',
      count: `${historyArchive.europe.length} kampanjer`,
      status: `${historyArchive.europe.filter((item) => item.media.length > 0).length} med kampbilde`,
      icon: Globe2,
      cover: recentEurope,
    },
    {
      key: 'people',
      title: 'Spillere og staller',
      shortTitle: 'Spillere',
      description: 'Spillerprofiler og sesongstaller. Gullsesongene er lengst kommet, mens hele arkivet bygges sesong for sesong.',
      count: `${historyArchive.players.length} profiler`,
      status: `${championshipRosterResearch.filter((item) => item.status === 'verified-complete').length}/${championshipRosterResearch.length} gullstaller komplette`,
      icon: Users,
    },
    {
      key: 'moments',
      title: 'Arenaer, rekorder og øyeblikk',
      shortTitle: 'Øyeblikk',
      description: 'Stedene, rekordene og kampene som har satt spor i Storhamar-historien.',
      count: `${historyArchive.arenas.length} arenaer · ${historyArchive.records.length} rekorder`,
      status: `${historyArchive.timeline.length} tidslinjeøyeblikk`,
      icon: Landmark,
      cover: classic,
    },
    {
      key: 'seasons',
      title: 'Sesong for sesong',
      shortTitle: 'Sesonger',
      description: 'Alle sesonger fra 1957/58 til 2025/26, med tydelig merking av avbrutte sesonger og når historiske kilder ikke er komplette.',
      count: `${historyArchive.seasons.length} sesonger`,
      status: `${historyResearchConflicts.filter((item) => item.status === 'open').length} åpent kildeavvik`,
      icon: CalendarDays,
    },
  ]

  useEffect(() => {
    setQuery('')
    setSelectedId(null)
    setPageIndex(0)
    setPlayerPosition('all')
    setJerseyFilter('all')
  }, [section])

  const items = useMemo<ArchiveCardItem[]>(() => {
    if (!section) return []

    if (section === 'jerseys') {
      return [...historyArchive.jerseys]
        .sort((a, b) => seasonYear(b.fromSeasonId ?? b.seasonIds[0]) - seasonYear(a.fromSeasonId ?? a.seasonIds[0]))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          const seasons = item.seasonIds.map(compactSeasonName).filter(Boolean).join(', ')
          return {
            id: item.id,
            title: item.title,
            eyebrow: item.usage.map((value) => value.toUpperCase()).join(' · ') || 'DRAKT',
            summary: item.summary ?? 'Historisk Storhamar-drakt.',
            image: media?.src,
            imageAlt: media?.alt,
            gallery: item.media.map((asset) => ({ src: asset.src, alt: asset.alt, caption: asset.caption })),
            seasonStart: seasonYear(item.fromSeasonId ?? item.seasonIds[0]),
            chips: [seasons, ...(item.colours ?? [])].filter(Boolean).slice(0, 4),
            body: item.body ?? [],
            details: [
              { label: 'Sesong', value: seasons || 'Ikke spesifisert' },
              { label: 'Bruk', value: item.usage.join(', ') },
              ...(item.manufacturer ? [{ label: 'Produsent', value: item.manufacturer }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.title, item.summary, seasons, item.tags?.join(' '), item.colours?.join(' '), item.usage.join(' ')].filter(Boolean).join(' ').toLowerCase(),
            filterTags: [
              ...(item.colours ?? []).map((value) => value.toLowerCase()),
              ...item.usage.map((value) => value.toLowerCase()),
              ...(item.tags ?? []).map((value) => value.toLowerCase()),
            ],
          }
        })
    }

    if (section === 'rafters') {
      return historyArchive.legends
        .filter((item) => item.rafterStatus)
        .sort((a, b) => (b.honouredAt ?? '').localeCompare(a.honouredAt ?? ''))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          const rafterStatus =
            item.rafterStatus === 'retired-number' ? 'Fredet nummer' :
            item.rafterStatus === 'honoured-banner' ? 'Hedersbanner' :
            item.rafterStatus === 'historic-honour' ? 'Historisk heder' : 'Status under kontroll'
          return {
            id: item.id,
            title: item.honouredNumber !== undefined ? `${item.fullName} · #${item.honouredNumber}` : item.fullName,
            eyebrow: rafterStatus.toUpperCase(),
            summary: item.summary ?? item.honourReason ?? '',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [item.honouredAt ? dateLabel(item.honouredAt) : '', item.position ?? '', rafterStatus].filter(Boolean),
            body: item.body ?? [],
            details: [
              ...(item.honouredAt ? [{ label: 'Hedret', value: dateLabel(item.honouredAt) }] : []),
              ...(item.honouredNumber !== undefined ? [{ label: 'Nummer', value: String(item.honouredNumber) }] : []),
              ...(item.rafterStatusNote ? [{ label: 'Bannerstatus', value: item.rafterStatusNote }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.fullName, item.summary, item.honouredNumber, item.roles?.join(' ')].filter(Boolean).join(' ').toLowerCase(),
          }
        })
    }

    if (section === 'honours') {
      return [...historyArchive.honours]
        .sort((a, b) => (b.year ?? seasonYear(b.seasonId)) - (a.year ?? seasonYear(a.seasonId)))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          const type = item.honourType === 'norwegian-championship' ? 'NM-GULL' : item.honourType === 'league-championship' ? 'SERIEGULL' : 'MERITT'
          return {
            id: item.id,
            title: item.title,
            eyebrow: type,
            summary: item.summary ?? '',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [item.year ? String(item.year) : '', item.finalOpponent ? `Mot ${item.finalOpponent}` : '', item.competition ?? ''].filter(Boolean),
            body: item.body ?? [],
            details: [
              ...(item.decidingGame ? [{ label: 'Avgjørende kamp', value: item.decidingGame }] : []),
              ...(item.finalOpponent ? [{ label: 'Finalemotstander', value: item.finalOpponent }] : []),
              ...(item.competition ? [{ label: 'Turnering', value: item.competition }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.title, item.summary, item.finalOpponent, item.decidingGame].filter(Boolean).join(' ').toLowerCase(),
          }
        })
    }

    if (section === 'europe') {
      return [...historyArchive.europe]
        .sort((a, b) => seasonYear(b.seasonId) - seasonYear(a.seasonId))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          return {
            id: item.id,
            title: item.title,
            eyebrow: item.competition.toUpperCase(),
            summary: item.summary ?? '',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [compactSeasonName(item.seasonId), item.stage ?? '', `${item.opponentNames.length} motstandere`].filter(Boolean),
            body: item.body ?? [],
            details: [
              ...(item.stage ? [{ label: 'Nivå', value: item.stage }] : []),
              ...(item.outcome ? [{ label: 'Resultat', value: item.outcome }] : []),
              ...(item.opponentNames.length ? [{ label: 'Motstandere', value: item.opponentNames.join(', ') }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.title, item.summary, item.competition, item.stage, item.opponentNames.join(' ')].filter(Boolean).join(' ').toLowerCase(),
          }
        })
    }

    if (section === 'people' && peopleView === 'rosters') {
      return [...championshipRosterResearch]
        .sort((a, b) => seasonYear(b.seasonId) - seasonYear(a.seasonId))
        .map((item) => {
          const groups = rosterGroups(item.players)
          const imagePlayer = item.players
            .map((name) => playerByName(name))
            .find((player) => mediaForPlayer(player?.fullName ?? '', player?.media)?.src)
          const media = imagePlayer ? mediaForPlayer(imagePlayer.fullName, imagePlayer.media) : undefined
          return {
            id: `roster-${item.seasonId}`,
            title: `${item.displayName} · spillerstall`,
            eyebrow: item.status === 'verified-complete' ? 'KONTROLLERT STALL' : 'STALL UNDER ARBEID',
            summary: item.note ?? `${item.players.length} spillere og ${item.coaches.length} trener(e) er registrert i researchgrunnlaget.`,
            image: media?.src,
            imageAlt: media?.alt,
            chips: [
              `${item.players.length} spillere`,
              `${groups.keeper.length} K · ${groups.back.length} B · ${groups.forward.length} F`,
              item.status === 'verified-complete' ? 'Komplett' : 'Partial',
            ],
            body: item.note ? [item.note] : [],
            rosterSections: [
              { label: 'Keepere', names: groups.keeper },
              { label: 'Backer', names: groups.back },
              { label: 'Forwards', names: groups.forward },
              { label: 'Posisjon under kontroll', names: groups.unknown },
            ].filter((part) => part.names.length > 0),
            details: [
              ...(groups.keeper.length ? [{ label: 'Keepere', value: groups.keeper.join(', ') }] : []),
              ...(groups.back.length ? [{ label: 'Backer', value: groups.back.join(', ') }] : []),
              ...(groups.forward.length ? [{ label: 'Forwards', value: groups.forward.join(', ') }] : []),
              ...(groups.unknown.length ? [{ label: 'Ikke ferdig klassifisert', value: groups.unknown.join(', ') }] : []),
              { label: 'Trenere', value: item.coaches.join(', ') },
            ],
            sourceUrl: item.sourceUrl,
            sourceLabel: 'Åpne stallkilde',
            verified: item.status === 'verified-complete' && groups.unknown.length === 0,
            searchText: [item.displayName, item.players.join(' '), item.coaches.join(' '), item.note].filter(Boolean).join(' ').toLowerCase(),
          }
        })
    }

    if (section === 'people') {
      return [...historyArchive.players]
        .sort((a, b) => {
          const groupOrder = { keeper: 0, back: 1, forward: 2, unknown: 3, all: 4 }
          const positionDiff = groupOrder[playerPositionGroup(a.position)] - groupOrder[playerPositionGroup(b.position)]
          return positionDiff || a.fullName.localeCompare(b.fullName, 'nb')
        })
        .map((item) => {
          const media = mediaForPlayer(item.fullName, item.media)
          const source = sourceFor(item.sources, media?.sourceUrl)
          const group = playerPositionGroup(item.position)
          const seasons = item.seasonIds.length
          const verifiedCareer = item.completeness === 'verified'
          return {
            id: item.id,
            title: item.fullName,
            eyebrow: group === 'unknown' ? 'POSISJON UNDER KONTROLL' : positionLabel(group).toUpperCase(),
            summary: item.summary ?? 'Storhamar-spiller i historiearkivet.',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [
              item.shirtNumbers?.length ? `#${item.shirtNumbers.join(' / #')}` : '',
              seasons ? (verifiedCareer ? `${seasons} sesonger` : `${seasons} dokumenterte sesonger`) : 'Sesonger under research',
              item.honourIds.length ? `${item.honourIds.length} meritter` : '',
            ].filter(Boolean),
            body: item.body ?? [],
            details: [
              ...(item.position ? [{ label: 'Posisjon', value: item.position }] : []),
              ...(item.storhamarPeriods?.length ? [{ label: 'Storhamar-perioder', value: item.storhamarPeriods.map((period) => [compactSeasonName(period.fromSeasonId), compactSeasonName(period.toSeasonId)].filter(Boolean).join('–') || period.note).filter(Boolean).join(', ') }] : []),
              ...(item.seasonIds.length ? [{ label: verifiedCareer ? 'Registrerte sesonger' : 'Dokumenterte sesonger så langt', value: item.seasonIds.map(compactSeasonName).join(', ') }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.fullName, item.summary, item.position, item.shirtNumbers?.join(' '), item.seasonIds.join(' ')].filter(Boolean).join(' ').toLowerCase(),
            group,
          }
        })
    }

    if (section === 'moments' && momentView === 'arenas') {
      return [...historyArchive.arenas]
        .sort((a, b) => a.name.localeCompare(b.name, 'nb'))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          return {
            id: item.id,
            title: item.name,
            eyebrow: (item.city ?? 'ARENA').toUpperCase(),
            summary: item.summary ?? '',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [item.city ?? '', item.opened ? `Åpnet ${item.opened}` : '', item.capacity ? `${item.capacity.toLocaleString('nb-NO')} plasser` : ''].filter(Boolean),
            body: item.body ?? [],
            details: [
              ...(item.aliases?.length ? [{ label: 'Også kjent som', value: item.aliases.join(', ') }] : []),
              ...(item.tags?.length ? [{ label: 'Historisk rolle', value: item.tags.filter((tag) => !tag.startsWith('http')).join(', ') }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.name, item.summary, item.city, item.aliases?.join(' '), item.tags?.join(' ')].filter(Boolean).join(' ').toLowerCase(),
          }
        })
    }

    if (section === 'moments' && momentView === 'records') {
      return [...historyArchive.records]
        .sort((a, b) => seasonYear(b.seasonId) - seasonYear(a.seasonId))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          return {
            id: item.id,
            title: item.title,
            eyebrow: 'REKORD',
            summary: item.summary ?? '',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [item.value !== undefined ? `${item.value} ${item.unit ?? ''}`.trim() : '', compactSeasonName(item.seasonId)].filter(Boolean),
            body: item.body ?? [],
            details: [
              ...(item.date ? [{ label: 'Dato', value: dateLabel(item.date) }] : []),
              ...(item.seasonId ? [{ label: 'Sesong', value: compactSeasonName(item.seasonId) }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.title, item.summary, item.value, item.unit].filter(Boolean).join(' ').toLowerCase(),
          }
        })
    }

    if (section === 'moments') {
      return [...historyArchive.timeline]
        .sort((a, b) => (b.date ?? String(b.year ?? '')).localeCompare(a.date ?? String(a.year ?? '')))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          return {
            id: item.id,
            title: item.title,
            eyebrow: item.importance === 'major' ? 'STORT ØYEBLIKK' : 'TIDSLINJEN',
            summary: item.summary ?? '',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [item.date ? dateLabel(item.date) : item.year ? String(item.year) : '', item.era ?? ''].filter(Boolean),
            body: item.body ?? [],
            details: item.era ? [{ label: 'Epoke', value: item.era }] : [],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.title, item.summary, item.era, item.year].filter(Boolean).join(' ').toLowerCase(),
          }
        })
    }

    return [...historyArchive.seasons]
      .sort((a, b) => b.startYear - a.startYear)
      .map((item) => {
        const media = item.media[0]
        const source = sourceFor(item.sources, media?.sourceUrl)
        const conflicts = historyResearchConflicts.filter((conflict) => conflict.entityId === item.id && conflict.status === 'open')
        return {
          id: item.id,
          title: item.displayName,
          eyebrow: conflicts.length ? 'KILDEAVVIK' : 'SESONG',
          summary: item.summary ?? '',
          image: media?.src,
          imageAlt: media?.alt,
          chips: [
            item.standings[0]?.position ? `${item.standings[0].position}. plass` : '',
            item.honourIds.length ? `${item.honourIds.length} meritter` : '',
            conflicts.length ? `${conflicts.length} åpent avvik` : statusLabel(item.completeness === 'verified'),
          ].filter(Boolean),
          body: item.body ?? [],
          details: [
            { label: 'Turneringer', value: item.competitions.join(', ') },
            ...(item.coaches.length ? [{ label: 'Trener(e)', value: item.coaches.join(', ') }] : []),
            ...(item.playoffSummary ? [{ label: 'Sluttspill', value: item.playoffSummary }] : []),
            ...(item.europeSummary ? [{ label: 'Europa', value: item.europeSummary }] : []),
            ...(conflicts.length ? [{ label: 'Åpent kildeavvik', value: conflicts.map((conflict) => conflict.alternatives.map((alt) => alt.value).join(' / ')).join(', ') }] : []),
          ],
          sourceUrl: source?.url,
          sourceLabel: source?.label,
          verified: item.completeness === 'verified' && conflicts.length === 0,
          searchText: [item.displayName, item.summary, item.competitions.join(' '), item.coaches.join(' ')].filter(Boolean).join(' ').toLowerCase(),
        }
      })
  }, [section, peopleView, momentView])

  const filteredItems = useMemo(() => {
    const cleaned = query.trim().toLowerCase()
    return items.filter((item) => {
      if (cleaned && !item.searchText.includes(cleaned)) return false
      if (section === 'people' && peopleView === 'players' && playerPosition !== 'all' && item.group !== playerPosition) return false
      if (section === 'jerseys') {
        const tags = item.filterTags ?? []
        if (jerseyFilter !== 'all') {
          const matches =
            jerseyFilter === 'yellow' ? tags.includes('gul') :
            jerseyFilter === 'blue' ? tags.includes('blå') :
            jerseyFilter === 'white' ? tags.includes('hvit') :
            jerseyFilter === 'series' ? tags.includes('home') || tags.includes('away') || tags.includes('serie') :
            jerseyFilter === 'europe' ? tags.includes('europe') || tags.some((tag) => tag.includes('chl')) :
            jerseyFilter === 'special' ? tags.includes('special') || tags.some((tag) => tag.includes('spesial')) :
            jerseyFilter === 'testimonial' ? tags.some((tag) => tag.includes('testimonial')) :
            jerseyFilter === 'preseason' ? tags.includes('preseason') || tags.some((tag) => tag.includes('forsesong')) : true
          if (!matches) return false
        }
        if (jerseyEra !== 'all' && String(Math.floor((item.seasonStart ?? 0) / 10) * 10) !== jerseyEra) return false
      }
      return true
    }).sort((a, b) => section === 'jerseys'
      ? (jerseySort === 'newest' ? (b.seasonStart ?? 0) - (a.seasonStart ?? 0) : (a.seasonStart ?? 0) - (b.seasonStart ?? 0)) : 0)
  }, [items, query, section, peopleView, playerPosition, jerseyFilter, jerseyEra, jerseySort])

  const currentSection = sections.find((item) => item.key === section)
  const pageSize = section === 'people' && peopleView === 'rosters' ? 1 : 9
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const currentPage = Math.min(pageIndex, pageCount - 1)
  const visibleItems = filteredItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  useEffect(() => { setPageIndex(0); setSelectedId(null) }, [query, playerPosition, jerseyFilter, jerseyEra, jerseySort, peopleView, momentView])

  if (!section) {
    return (
      <section className="page-section history-archive">
        <header className="archive-heading">
          <span className="eyebrow">STORHAMAR-ARKIVET</span>
          <h1>Historie</h1>
          <p>Klubbhistorien samlet på ett sted – fra uteisen på 50-tallet til dagens gullag.</p>
        </header>

        <article className="archive-hero card">
          {recentGold && <img src={recentGold} alt="Storhamar feirer NM-gull" className="archive-hero-image" />}
          <div className="archive-hero-shade" />
          <div className="archive-hero-content">
            <span className="archive-kicker"><Sparkles size={14} /> 1957 → 2026</span>
            <h2>69 sesonger. Ett arkiv.</h2>
            <p>Drakter, gull, spillere, Europa, arenaer og øyeblikk – koblet sammen med kilder og ekte bilder.</p>
            <div className="archive-hero-stats">
              <div><strong>69</strong><span>sesonger</span></div>
              <div><strong>10</strong><span>NM-gull</span></div>
              <div><strong>13</strong><span>Europa</span></div>
            </div>
          </div>
        </article>

        <div className="archive-trust">
          <CircleCheck size={18} />
          <div>
            <strong>Historie uten gjetting</strong>
            <span>Usikre opplysninger merkes som under kildekontroll i stedet for å fylles inn som fakta.</span>
          </div>
        </div>

        <div className="archive-section-grid">
          {sections.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                className="archive-section-card"
                key={item.key}
                onClick={() => setSection(item.key)}
              >
                {item.cover && <img src={item.cover} alt="" aria-hidden="true" className="archive-section-cover" />}
                <div className="archive-section-overlay" />
                <div className="archive-section-top">
                  <span className="archive-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="archive-icon"><Icon size={19} /></span>
                </div>
                <div className="archive-section-copy">
                  <strong>{item.shortTitle}</strong>
                  <span>{item.count}</span>
                  <small>{item.status}</small>
                </div>
                <ChevronRight size={19} className="archive-section-arrow" />
              </button>
            )
          })}
        </div>

        <article className="archive-research-card card">
          <div>
            <span className="eyebrow">RESEARCHSTATUS</span>
            <h3>{historyResearchConflicts.filter((item) => item.status === 'open').length} historisk kildeavvik står åpent</h3>
            <p>To tidligere statistikkavvik er løst. Resten av hullene ligger synlig i arkivet mens researchen fortsetter.</p>
          </div>
          <BookOpen size={27} />
        </article>
      </section>
    )
  }

  return (
    <section className="page-section history-archive">
      <button className="archive-back" type="button" onClick={() => setSection(null)}>
        <ArrowLeft size={17} /> Hele arkivet
      </button>

      <header className="archive-heading archive-heading-detail">
        <span className="eyebrow">{currentSection?.count}</span>
        <h1>{currentSection?.title}</h1>
        <p>{currentSection?.description}</p>
      </header>

      {section === 'people' && (
        <div className="archive-segmented" role="tablist" aria-label="Spillere og staller">
          <button className={peopleView === 'rosters' ? 'active' : ''} onClick={() => setPeopleView('rosters')}>Staller</button>
          <button className={peopleView === 'players' ? 'active' : ''} onClick={() => setPeopleView('players')}>Spillere</button>
        </div>
      )}

      {section === 'moments' && (
        <div className="archive-segmented archive-segmented-three" role="tablist" aria-label="Arenaer, rekorder og øyeblikk">
          <button className={momentView === 'arenas' ? 'active' : ''} onClick={() => setMomentView('arenas')}>Arenaer</button>
          <button className={momentView === 'records' ? 'active' : ''} onClick={() => setMomentView('records')}>Rekorder</button>
          <button className={momentView === 'timeline' ? 'active' : ''} onClick={() => setMomentView('timeline')}>Tidslinje</button>
        </div>
      )}

      {section === 'people' && peopleView === 'players' && (
        <div className="archive-filter-block">
          <span className="archive-filter-label">Posisjon</span>
          <div className="archive-filter-scroll">
            {([
              ['all', 'Alle'],
              ['keeper', 'Keepere'],
              ['back', 'Backer'],
              ['forward', 'Forwards'],
              ['unknown', 'Mangler posisjon'],
            ] as Array<[PlayerPositionFilter, string]>).map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={playerPosition === value ? 'active' : ''}
                onClick={() => setPlayerPosition(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {section === 'jerseys' && (
        <div className="archive-filter-block">
          <span className="archive-filter-label">Filtrer drakter</span>
          <div className="archive-filter-scroll">
            {([
              ['all', 'Alle'],
              ['yellow', 'Gule'],
              ['blue', 'Blå'],
              ['white', 'Hvite'],
              ['series', 'Serie'],
              ['europe', 'Europa / CHL'],
              ['special', 'Spesial'],
              ['testimonial', 'Testimonial'],
              ['preseason', 'Forsesong'],
            ] as Array<[JerseyFilter, string]>).map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={jerseyFilter === value ? 'active' : ''}
                onClick={() => setJerseyFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {section === 'jerseys' && (
        <div className="archive-filter-panel">
          <strong>Sorter drakter</strong>
          <div className="archive-filter-grid">
            <label>Drakttype
              <select value={jerseyFilter} onChange={(e) => setJerseyFilter(e.target.value as JerseyFilter)}>
                <option value="all">Alle drakter</option>
                <option value="series">Serie / hjemme / borte</option>
                <option value="europe">CHL / Europa</option>
                <option value="preseason">Forsesong</option>
                <option value="special">Spesialdrakter</option>
                <option value="testimonial">Testimonial</option>
                <option value="yellow">Gule drakter</option>
                <option value="blue">Blå drakter</option>
                <option value="white">Hvite drakter</option>
              </select>
            </label>
            <label>Tiår
              <select value={jerseyEra} onChange={(e) => setJerseyEra(e.target.value)}>
                <option value="all">Alle tiår</option>
                {[2020,2010,2000,1990,1980,1970,1960,1950].map((year) => <option key={year} value={String(year)}>{year}-tallet</option>)}
              </select>
            </label>
            <label>Sortering
              <select value={jerseySort} onChange={(e) => setJerseySort(e.target.value as 'newest'|'oldest')}>
                <option value="newest">Nyeste først</option>
                <option value="oldest">Eldste først</option>
              </select>
            </label>
          </div>
        </div>
      )}
      {section === 'people' && peopleView === 'players' && (
        <div className="archive-position-filters" aria-label="Spillerposisjoner">
          {([['all','Alle'],['keeper','Keepere'],['back','Backer'],['forward','Forwards'],['unknown','Uavklart']] as const).map(([value,label]) => (
            <button type="button" key={value} className={playerPosition === value ? 'active' : ''}
              aria-pressed={playerPosition === value} onClick={() => setPlayerPosition(value)}>{label}</button>
          ))}
        </div>
      )}
      {section === 'people' && peopleView === 'rosters' && (
        <div className="archive-roster-explain">
          <strong>Velg en sesong</strong>
          <p>Stallene vises én sesong av gangen, med egne grupper for keepere, backer og forwards. Bla med Forrige/Neste nederst.</p>
        </div>
      )}

      <label className="archive-search">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={section === 'people' && peopleView === 'players' ? 'Søk etter spiller…' : 'Søk i arkivet…'}
        />
        {query && <button type="button" onClick={() => setQuery('')} aria-label="Tøm søk">×</button>}
      </label>

      <div className="archive-result-line">
        <span>{filteredItems.length} treff</span>
        <span className={currentSection?.status.includes('åpent') ? 'archive-status warning' : 'archive-status'}>
          <CircleDot size={11} /> {currentSection?.status}
        </span>
      </div>

      <div className="archive-list">
        {visibleItems.map((item, index) => {
          const expanded = selectedId === item.id
          const showPositionHeading =
            section === 'people' &&
            peopleView === 'players' &&
            item.group &&
            item.group !== 'all' &&
            (index === 0 || visibleItems[index - 1]?.group !== item.group)
          return (
            <Fragment key={item.id}>
              {showPositionHeading && (
                <div className="archive-position-heading">
                  <span>{positionLabel(item.group!)}</span>
                  <small>{filteredItems.filter((candidate) => candidate.group === item.group).length}</small>
                </div>
              )}
              <article className={`archive-item ${expanded ? 'expanded' : ''}`}>
              <button
                type="button"
                className="archive-item-main"
                onClick={() => setSelectedId(expanded ? null : item.id)}
                aria-expanded={expanded}
              >
                <div className="archive-thumb">
                  {item.image ? (
                    <img src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
                  ) : (
                    <ImageIcon size={20} />
                  )}
                </div>
                <div className="archive-item-copy">
                  <span className="archive-item-eyebrow">{item.eyebrow}</span>
                  <strong>{item.title}</strong>
                  <p>{item.summary}</p>
                  <div className="archive-chips">
                    {item.chips.slice(0, 3).map((chip) => <span key={chip}>{chip}</span>)}
                  </div>
                </div>
                <ChevronDown size={18} className="archive-expand-icon" />
              </button>

              {expanded && (
                <div className="archive-item-detail">
                  {item.gallery && item.gallery.length > 1 ? (
                    <div className="archive-gallery">
                      {item.gallery.map((asset) => (
                        <figure key={asset.src}>
                          <img src={asset.src} alt={asset.alt} loading="lazy" />
                          <figcaption>{asset.caption ?? asset.alt}</figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : item.image ? (
                    <figure>
                      <img src={item.image} alt={item.imageAlt ?? item.title} />
                      <figcaption>{item.imageAlt ?? item.title}</figcaption>
                    </figure>
                  ) : null}

                  <div className={`archive-verification ${item.verified ? 'verified' : 'partial'}`}>
                    {item.verified ? <CircleCheck size={15} /> : <CircleDot size={15} />}
                    <span>{statusLabel(item.verified)}</span>
                  </div>

                  {item.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

                  {item.rosterSections && (
                    <div className="archive-roster-groups">
                      {item.rosterSections.map((group) => (
                        <section className="archive-roster-group" key={group.label}>
                          <h3>{group.label} <span>{group.names.length}</span></h3>
                          <div className="archive-roster-rows">
                            {group.names.map((name) => {
                              const player = playerByName(name)
                              const photo = mediaForPlayer(name, player?.media)
                              return (
                                <button type="button" key={name} className="archive-roster-row" onClick={() => {
                                  setPeopleView('players'); setPlayerPosition('all'); setQuery(name); setSelectedId(null)
                                }}>
                                  {photo?.src ? <img src={photo.src} alt="" loading="lazy" /> : <span className="archive-roster-avatar">#</span>}
                                  <span><strong>{name}</strong><small>{player?.shirtNumbers?.length ? `#${player.shirtNumbers.join(', #')}` : 'Åpne spillerprofil'}</small></span>
                                  <ChevronRight size={16} />
                                </button>
                              )
                            })}
                          </div>
                        </section>
                      ))}
                    </div>
                  )}
                  {item.details.length > 0 && (
                    <dl className="archive-detail-list">
                      {item.details.filter((detail) => !item.rosterSections || !['Keepere','Backer','Forwards','Ikke ferdig klassifisert'].includes(detail.label)).map((detail) => (
                        <div key={detail.label}>
                          <dt>{detail.label}</dt>
                          <dd>{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {item.sourceUrl && (
                    <a className="archive-source-button" href={item.sourceUrl} target="_blank" rel="noreferrer">
                      <BookOpen size={15} /> {item.sourceLabel ?? 'Åpne kilde'} <ChevronRight size={15} />
                    </a>
                  )}
                </div>
              )}
            </article>
            </Fragment>
          )
        })}
      </div>

      {filteredItems.length > 0 && pageCount > 1 && (
        <nav className="archive-pagination" aria-label="Bla gjennom arkivet">
          <button type="button" disabled={currentPage === 0}
            onClick={() => { setPageIndex(currentPage - 1); setSelectedId(null) }}>‹ Forrige</button>
          <span>{section === 'people' && peopleView === 'rosters'
            ? `Stall ${currentPage + 1} av ${pageCount}` : `Side ${currentPage + 1} av ${pageCount}`}</span>
          <button type="button" disabled={currentPage + 1 >= pageCount}
            onClick={() => { setPageIndex(currentPage + 1); setSelectedId(null) }}>Neste ›</button>
        </nav>
      )}

      {filteredItems.length === 0 && (
        <div className="archive-empty">
          <Search size={23} />
          <strong>Ingen treff</strong>
          <span>Prøv et annet navn, årstall eller søkeord.</span>
        </div>
      )}
    </section>
  )
}

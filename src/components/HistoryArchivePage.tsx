import { useEffect, useMemo, useState } from 'react'
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

interface ArchiveCardItem {
  id: string
  title: string
  eyebrow: string
  summary: string
  image?: string
  imageAlt?: string
  chips: string[]
  body: string[]
  details: Array<{ label: string; value: string }>
  sourceUrl?: string
  sourceLabel?: string
  verified: boolean
  searchText: string
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

export function HistoryArchivePage() {
  const [section, setSection] = useState<ArchiveSection | null>(null)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [peopleView, setPeopleView] = useState<PeopleView>('rosters')
  const [momentView, setMomentView] = useState<MomentView>('arenas')
  const [visibleCount, setVisibleCount] = useState(18)

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
    setVisibleCount(18)
  }, [section, peopleView, momentView])

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
            searchText: [item.title, item.summary, seasons, item.tags?.join(' ')].filter(Boolean).join(' ').toLowerCase(),
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
        .map((item) => ({
          id: `roster-${item.seasonId}`,
          title: `${item.displayName} · spillerstall`,
          eyebrow: item.status === 'verified-complete' ? 'KONTROLLERT STALL' : 'STALL UNDER ARBEID',
          summary: item.note ?? `${item.players.length} spillere og ${item.coaches.length} trener(e) er registrert i researchgrunnlaget.`,
          chips: [`${item.players.length} spillere`, `${item.coaches.length} trener(e)`, item.status === 'verified-complete' ? 'Komplett' : 'Partial'],
          body: item.note ? [item.note] : [],
          details: [
            { label: 'Spillere', value: item.players.join(', ') },
            { label: 'Trenere', value: item.coaches.join(', ') },
          ],
          sourceUrl: item.sourceUrl,
          sourceLabel: 'Åpne stallkilde',
          verified: item.status === 'verified-complete',
          searchText: [item.displayName, item.players.join(' '), item.coaches.join(' '), item.note].filter(Boolean).join(' ').toLowerCase(),
        }))
    }

    if (section === 'people') {
      return [...historyArchive.players]
        .sort((a, b) => a.fullName.localeCompare(b.fullName, 'nb'))
        .map((item) => {
          const media = item.media[0]
          const source = sourceFor(item.sources, media?.sourceUrl)
          return {
            id: item.id,
            title: item.fullName,
            eyebrow: (item.position ?? 'SPILLER').toUpperCase(),
            summary: item.summary ?? 'Storhamar-spiller i historiearkivet.',
            image: media?.src,
            imageAlt: media?.alt,
            chips: [
              item.shirtNumbers?.length ? `#${item.shirtNumbers.join(' / #')}` : '',
              `${item.seasonIds.length} sesonger`,
              item.honourIds.length ? `${item.honourIds.length} meritter` : '',
            ].filter(Boolean),
            body: item.body ?? [],
            details: [
              ...(item.position ? [{ label: 'Posisjon', value: item.position }] : []),
              ...(item.storhamarPeriods?.length ? [{ label: 'Storhamar-perioder', value: item.storhamarPeriods.map((period) => [compactSeasonName(period.fromSeasonId), compactSeasonName(period.toSeasonId)].filter(Boolean).join('–') || period.note).filter(Boolean).join(', ') }] : []),
            ],
            sourceUrl: source?.url,
            sourceLabel: source?.label,
            verified: item.completeness === 'verified',
            searchText: [item.fullName, item.summary, item.position, item.shirtNumbers?.join(' ')].filter(Boolean).join(' ').toLowerCase(),
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
    if (!cleaned) return items
    return items.filter((item) => item.searchText.includes(cleaned))
  }, [items, query])

  const currentSection = sections.find((item) => item.key === section)
  const visibleItems = filteredItems.slice(0, visibleCount)

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
        {visibleItems.map((item) => {
          const expanded = selectedId === item.id
          return (
            <article className={`archive-item ${expanded ? 'expanded' : ''}`} key={item.id}>
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
                  {item.image && (
                    <figure>
                      <img src={item.image} alt={item.imageAlt ?? item.title} />
                      <figcaption>{item.imageAlt ?? item.title}</figcaption>
                    </figure>
                  )}

                  <div className={`archive-verification ${item.verified ? 'verified' : 'partial'}`}>
                    {item.verified ? <CircleCheck size={15} /> : <CircleDot size={15} />}
                    <span>{statusLabel(item.verified)}</span>
                  </div>

                  {item.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

                  {item.details.length > 0 && (
                    <dl className="archive-detail-list">
                      {item.details.map((detail) => (
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
          )
        })}
      </div>

      {visibleCount < filteredItems.length && (
        <button className="archive-load-more" type="button" onClick={() => setVisibleCount((current) => current + 18)}>
          Vis flere <span>{filteredItems.length - visibleCount} igjen</span>
        </button>
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

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, BookOpen, CalendarDays, CheckCircle2, ChevronRight, Clock3,
  ExternalLink, Globe2, ImageOff, Landmark, MapPin, Medal, Search, Shield,
  Shirt, Star, Trophy, UserRound, Users, X, Layers, History, Filter,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { historyArchive, historyCategories } from '../history/catalog'
import { featuredPlayerStoryNames, playerStories, playerStoryForName } from '../history/playerStories'
import { leadersForSeason, coachChronologySource, captainChronologySource } from '../history/leadershipChronology'
import { linkedSeasonJerseys, seasonHistoryCoverage } from '../history/coverageAudit'
import { careerTotalForName, careerTotalsSource } from '../history/careerTotals'
import { numberIndex } from '../history/numberIndex'
import { officialSeasonIndex, officialSeasonIndexSource } from '../history/seasonSourceIndex'
import { CareerTotalsPage, HistoryAuditPage, HistoryNumberPage } from './HistoryResearchViews'
import {
  archiveItem, archiveItems, archiveRelationships, entryYear, historyChapters,
  isBrowsableKind, matchesArchiveSearch, sourceRoleLists,
} from '../history/archiveExplorer'
import type { BrowsableKind, HistoryChapter } from '../history/archiveExplorer'
import type {
  ArchiveBase, ArchiveEntityKind, ArchiveMedia, ArchivePerson, ArchiveSeason,
  ArchiveJersey, ArchiveHonour, ArchiveEuropeCampaign, ArchiveRecord,
  ArchiveTimelineEvent, ArchiveArena, ArchiveLegend,
} from '../history/types'

type Section = 'overview' | 'audit' | 'numbers' | 'career-stats' | ArchiveEntityKind
type Selection = { kind: BrowsableKind; id: string }
type ImageTarget = { media: ArchiveMedia; caption: string } | null
type SortOrder = 'newest' | 'oldest' | 'alpha'

const ICONS: Record<ArchiveEntityKind, LucideIcon> = {
  season: CalendarDays, honour: Trophy, jersey: Shirt, legend: Star,
  player: Users, arena: Landmark, europe: Globe2, record: Medal,
  timeline: History, coach: UserRound, captain: Shield,
  identity: Layers, 'supporter-culture': Users,
}
const KIND_LABELS: Record<BrowsableKind, string> = {
  season: 'Sesong', honour: 'Meritt', jersey: 'Drakt',
  legend: 'I taket', player: 'Spiller', arena: 'Arena',
  europe: 'Europa', record: 'Rekord', timeline: 'Hendelse',
}
const JERSEY_FILTERS = [
  ['all', 'Alle drakter'], ['home', 'Hjemme'], ['away', 'Borte'],
  ['europe', 'Europa'], ['playoff', 'Sluttspill'], ['preseason', 'Forsesong'],
  ['special', 'Spesial'], ['testimonial', 'Testimonial'], ['third', 'Tredjedrakt'],
] as const

function sourceLinks(entry: ArchiveBase) {
  const links: { label: string; url: string }[] = []
  for (const sourceId of entry.sources) {
    const matching = historyArchive.sources.find((source) => source.id === sourceId)
    if (matching) links.push({ label: matching.title, url: matching.url })
    else if (/^https?:\/\//.test(sourceId)) links.push({ label: 'Kilde', url: sourceId })
  }
  for (const media of entry.media) {
    if (media.sourceUrl && !links.some((link) => link.url === media.sourceUrl)) {
      links.push({ label: media.credit || 'Originalt bilde', url: media.sourceUrl })
    }
  }
  return links
}

function imageFor(kind: BrowsableKind, item: ArchiveBase): ArchiveMedia | undefined {
  const own = item.media.find((media) => media.src)
  if (own) return own
  if (kind === 'season') {
    const season = item as ArchiveSeason
    for (const jersey of linkedSeasonJerseys(season)) {
      const photo = jersey.media.find((media) => media.src)
      if (photo) return photo
    }
  }
  return undefined
}

function findPerson(personId: string): ArchivePerson | undefined {
  return (archiveItem('player', personId) ?? archiveItem('legend', personId)) as ArchivePerson | undefined
}

function completenessLabel(entry: ArchiveBase) {
  return entry.completeness === 'verified' ? 'Kildekontrollert'
    : entry.completeness === 'partial' ? 'Delvis dokumentert'
      : 'Under kartlegging'
}

function HistoryPicture({ media, onOpen, compact = false }: {
  media?: ArchiveMedia
  onOpen?: (media: ArchiveMedia) => void
  compact?: boolean
}) {
  const [failed, setFailed] = useState(false)
  if (!media || failed) {
    return <div className={'ha-image-placeholder ' + (compact ? 'compact' : '')}><ImageOff size={compact ? 19 : 26} /><span>{failed ? 'Bildet kan ikke lastes' : 'Ingen dokumentert bilde'}</span></div>
  }
  return (
    <div className={'ha-picture ' + (compact ? 'compact' : '')}>
      {onOpen ? (
        <button type="button" className="ha-picture-button" onClick={() => onOpen(media)} aria-label={'Se større bilde: ' + media.alt}>
          <img loading="lazy" decoding="async" src={media.src} alt={media.alt} onError={() => setFailed(true)} />
        </button>
      ) : (
        <img loading="lazy" decoding="async" src={media.src} alt={media.alt} onError={() => setFailed(true)} />
      )}
      {!compact && <span className="ha-photo-credit">Foto: {media.credit ?? 'Kilde oppgitt i arkivet'}</span>}
    </div>
  )
}

function DetailsData({ kind, item, openItem }: { kind: BrowsableKind; item: ArchiveBase; openItem: (kind: BrowsableKind, id: string) => void }) {
  if (kind === 'season') {
    const season = item as ArchiveSeason
    const leadership = leadersForSeason(season.startYear)
    const coverage = seasonHistoryCoverage(season)
    const silSeason = officialSeasonIndex(season.id)
    const coaches = [...new Set([...season.coaches, ...leadership.coaches.map((term)=>term.name)])]
    const captains = [...new Set([...season.captains, ...leadership.captains.map((term)=>term.name)])]
    return <>
      <div className="ha-fact-list">
        {season.competitions.length > 0 && <div><span>Turneringer</span><strong>{season.competitions.join(', ')}</strong></div>}
        {coaches.length > 0 && <div><span>Trenere</span><strong>{coaches.join(', ')}</strong></div>}
        {captains.length > 0 && <div><span>Kapteiner</span><strong>{captains.join(', ')}</strong></div>}
        {season.playoffSummary && <div><span>Sluttspill</span><strong>{season.playoffSummary}</strong></div>}
        {season.europeSummary && <div><span>Europa</span><strong>{season.europeSummary}</strong></div>}
      </div>
      {silSeason && <section className="ha-season-sil-source ha-block">
        <span className="ha-kicker">SIL-ARKIVETS OPPSUMMERING</span>
        <h3>Sesongen {season.displayName}</h3>
        <div className="ha-fact-list">
          {silSeason.placement && <div><span>Tabellplassering</span><strong>{silSeason.placement}</strong></div>}
          {silSeason.postSeason && <div><span>Sluttspill / kvalifisering</span><strong>{silSeason.postSeason}</strong></div>}
          {silSeason.leadingPlayer && <div><span>Poengkonge / toppscorer</span><strong>{silSeason.leadingPlayer}</strong></div>}
          {silSeason.leadingStatistic && <div><span>Registrert statistikk</span><strong>{silSeason.leadingStatistic}</strong></div>}
          {silSeason.averageAttendance && <div><span>Publikumssnitt (SIL-indeks)</span><strong>{silSeason.averageAttendance}</strong></div>}
        </div>
        <p>Dette er den historiske sesongindeksens tall og formuleringer, ikke en fullstendig kamp-for-kamp-statistikk. Et målmerket tall (m) må ikke forveksles med poeng (p).</p>
        <a className="ha-source-link" href={silSeason.sourceUrl || officialSeasonIndexSource} target="_blank" rel="noopener noreferrer">Åpne sesongens dokumentasjon i SIL-arkivet <ExternalLink size={15}/></a>
      </section>}
      {(leadership.coaches.length>0 || leadership.captains.length>0) && <div className="ha-role-source-note">Trener-/kapteinoversiktene følger SIL-arkivets periodeangivelser. Trenerbytter midt i en sesong kan gi flere navn. <a href={coachChronologySource} target="_blank" rel="noopener noreferrer">Trenere</a> · <a href={captainChronologySource} target="_blank" rel="noopener noreferrer">Kapteiner</a></div>}
      <section className="ha-season-audit-inline">
        <strong>Dokumentasjonsstatus</strong>
        <p>{coverage.documentedRoster} spillere registrert · {coverage.jerseyCount} drakter koblet · {coverage.hasImageReference ? 'Bildekilde finnes' : 'Mangler bildekilde'}</p>
        {coverage.issues.length > 0 && <details><summary>Hva mangler for denne sesongen? ({coverage.issues.length})</summary>{coverage.issues.map((issue)=><p key={issue}>• {issue}</p>)}</details>}
      </section>
      {season.standings.length > 0 && <section className="ha-block">
        <h3>Tabell og seriespill</h3>
        <div className="ha-standings">{season.standings.map((row, index) => (
          <div className="ha-standing" key={row.competition + index}>
            <strong>{row.competition}</strong>
            <div>
              {row.position != null && <span>{row.position}. plass</span>}
              {row.gamesPlayed != null && <span>{row.gamesPlayed} kamper</span>}
              {row.points != null && <span>{row.points} poeng</span>}
              {row.wins != null && <span>{row.wins} seire</span>}
            </div>
            {row.note && <p>{row.note}</p>}
          </div>
        ))}</div>
      </section>}
      {season.topScorers && season.topScorers.length > 0 && <section className="ha-block">
        <h3>Poeng og mål</h3>
        <div className="ha-person-list">{season.topScorers.map((player, index) => {
          const person = findPerson(player.personId)
          return <div className="ha-person-row" key={player.personId + index}>
            <strong>{person?.fullName ?? 'Navn ikke dokumentert'}</strong>
            <span>{[player.points != null ? player.points + ' p' : '', player.goals != null ? player.goals + ' mål' : '', player.assists != null ? player.assists + ' assist' : ''].filter(Boolean).join(' · ') || 'Statistikk ufullstendig'}</span>
            {player.note && <small>{player.note}</small>}
          </div>
        } )}</div>
      </section>}
      {season.roster.length > 0 && <section className="ha-block">
        <h3>Spillerstall ({season.roster.length})</h3>
        <div className="ha-roster-list">{season.roster.map((player, index) => {
          const person = findPerson(player.personId)
          if (!person) return <span key={player.personId + index} className="ha-roster-unknown">{player.number ? '#' + player.number + ' · ' : ''}Spiller ikke koblet</span>
          const kindToOpen = archiveItem('player', person.id) ? 'player' : 'legend'
          return <button key={player.personId + index} onClick={() => openItem(kindToOpen, person.id)}>
            <span>{player.number != null ? '#' + player.number : '–'}</span>{person.fullName}<ChevronRight size={13}/>
          </button>
        })}</div>
      </section>}
    </>
  }
  if (kind === 'jersey') {
    const jersey = item as ArchiveJersey
    return <div className="ha-fact-list">
      <div><span>Brukt som</span><strong>{jersey.usage.join(', ') || 'Ikke registrert'}</strong></div>
      {jersey.manufacturer && <div><span>Produsent</span><strong>{jersey.manufacturer}</strong></div>}
      {jersey.colours && jersey.colours.length > 0 && <div><span>Farger</span><strong>{jersey.colours.join(', ')}</strong></div>}
      {jersey.frontSponsor && <div><span>Brystsponsor</span><strong>{jersey.frontSponsor}</strong></div>}
      {jersey.designer && <div><span>Design</span><strong>{jersey.designer}</strong></div>}
      {jersey.seasonIds.length > 0 && <div><span>Sesonger</span><strong>{jersey.seasonIds.map((id) => id.replace('season-', '').replace('-', '/')).join(', ')}</strong></div>}
    </div>
  }
  if (kind === 'honour') {
    const honour = item as ArchiveHonour
    return <div className="ha-fact-list">
      {honour.year != null && <div><span>År</span><strong>{honour.year}</strong></div>}
      {honour.competition && <div><span>Turnering</span><strong>{honour.competition}</strong></div>}
      {honour.finalOpponent && <div><span>Finalemotstander</span><strong>{honour.finalOpponent}</strong></div>}
      {honour.decidingGame && <div><span>Avgjørende kamp</span><strong>{honour.decidingGame}</strong></div>}
    </div>
  }
  if (kind === 'player' || kind === 'legend') {
    const person = item as ArchivePerson & Partial<ArchiveLegend>
    const careerTotal = careerTotalForName(person.fullName)
    const officialNumbers = numberIndex.flatMap((row) => row.holders.filter((holder) => holder.name === person.fullName).map((holder)=>({number:row.number,period:holder.period})))
    return <>
      {careerTotal && <section className="ha-person-stats">
        <span className="ha-kicker">KARRIERETALL · SIL-ARKIVET</span>
        <div className="ha-person-stat-grid">
          <div><strong>{careerTotal.games}</strong><span>Kamper</span></div>
          <div><strong>{careerTotal.goals}</strong><span>Mål</span></div>
          <div><strong>{careerTotal.assists}</strong><span>Assist</span></div>
          <div><strong>{careerTotal.points}</strong><span>Poeng</span></div>
        </div>
        <p>{careerTotal.seasons} sesonger · {careerTotal.penaltyMinutes} utvisningsminutter · tall til og med 2025/26.</p>
        <a href={careerTotalsSource} target="_blank" rel="noopener noreferrer">Kilde: SIL-arkivets adelskalender <ExternalLink size={13}/></a>
      </section>}
      <div className="ha-fact-list">
      {person.position && <div><span>Posisjon</span><strong>{person.position}</strong></div>}
      {person.nationality && <div><span>Nasjonalitet</span><strong>{person.nationality}</strong></div>}
      {officialNumbers.length > 0 && <div><span>Dokumenterte draktnummer</span><strong>{officialNumbers.map((item)=>'#'+item.number+(item.period ? ' ('+item.period+')' : '')).join(', ')}</strong></div>}
      {officialNumbers.length === 0 && person.shirtNumbers && person.shirtNumbers.length > 0 && <div><span>Draktnummer i spillerprofil</span><strong>{person.shirtNumbers.join(', ')}</strong></div>}
      {person.honouredNumber && <div><span>Hedret nummer</span><strong>#{person.honouredNumber}</strong></div>}
      {person.honouredAt && <div><span>Hedret</span><strong>{person.honouredAt}</strong></div>}
      {person.roles && person.roles.length > 0 && <div><span>Roller</span><strong>{person.roles.join(', ')}</strong></div>}
      {person.storhamarPeriods && person.storhamarPeriods.length > 0 && <div><span>Storhamar-perioder</span><strong>{person.storhamarPeriods.map((period) => [period.fromSeasonId?.replace('season-', ''), period.toSeasonId?.replace('season-', '')].filter(Boolean).join('–')).join(', ')}</strong></div>}
    </div>
    </>
  }
  if (kind === 'arena') {
    const arena = item as ArchiveArena
    return <div className="ha-fact-list">
      {arena.city && <div><span>Sted</span><strong>{arena.city}</strong></div>}
      {arena.opened && <div><span>Åpnet</span><strong>{arena.opened}</strong></div>}
      {arena.capacity != null && <div><span>Kapasitet</span><strong>{arena.capacity.toLocaleString('nb-NO')}</strong></div>}
      {arena.closed && <div><span>Stengt</span><strong>{arena.closed}</strong></div>}
    </div>
  }
  if (kind === 'europe') {
    const campaign = item as ArchiveEuropeCampaign
    return <div className="ha-fact-list">
      <div><span>Turnering</span><strong>{campaign.competition}</strong></div>
      {campaign.stage && <div><span>Fase</span><strong>{campaign.stage}</strong></div>}
      {campaign.opponentNames.length > 0 && <div><span>Motstandere</span><strong>{campaign.opponentNames.join(', ')}</strong></div>}
      {campaign.outcome && <div><span>Resultat</span><strong>{campaign.outcome}</strong></div>}
    </div>
  }
  if (kind === 'record') {
    const record = item as ArchiveRecord
    return <div className="ha-fact-list">
      {record.value != null && <div><span>Rekord</span><strong>{record.value} {record.unit ?? ''}</strong></div>}
      {record.date && <div><span>Dato</span><strong>{record.date}</strong></div>}
    </div>
  }
  if (kind === 'timeline') {
    const event = item as ArchiveTimelineEvent
    return <div className="ha-fact-list">
      {event.date && <div><span>Dato</span><strong>{event.date}</strong></div>}
      {event.year && <div><span>År</span><strong>{event.year}</strong></div>}
      {event.era && <div><span>Periode</span><strong>{event.era}</strong></div>}
    </div>
  }
  return null
}

function DetailView({ selection, back, openItem, openPhoto }: {
  selection: Selection
  back: () => void
  openItem: (kind: BrowsableKind, id: string) => void
  openPhoto: (media: ArchiveMedia) => void
}) {
  const item = archiveItem(selection.kind, selection.id)
  const [photoIndex, setPhotoIndex] = useState(0)
  if (!item) return <section className="ha-shell"><button className="ha-back" onClick={back}><ArrowLeft size={17}/>Tilbake</button><p>Oppføringen er ikke tilgjengelig.</p></section>
  const media = item.media.filter((photo) => photo.src)
  const linked = archiveRelationships(selection.kind, item)
  const isPerson = selection.kind === 'player' || selection.kind === 'legend'
  const personStory = isPerson ? playerStoryForName((item as ArchivePerson).fullName) : undefined
  const references = [...sourceLinks(item), ...(personStory?.sources ?? [])]
    .filter((link, index, array) => array.findIndex((other) => other.url === link.url) === index)
  return <section className="ha-shell ha-detail">
    <button className="ha-back" onClick={back}><ArrowLeft size={17}/> Tilbake til {KIND_LABELS[selection.kind].toLowerCase()}arkivet</button>
    <div className="ha-detail-heading">
      <span className="ha-kicker">{KIND_LABELS[selection.kind]} · Storhamars historie</span>
      <h1>{item.title}</h1>
      {!isPerson && <span className={'ha-proof ' + item.completeness}>{item.completeness === 'verified' ? <CheckCircle2 size={13}/> : <Clock3 size={13}/>} {completenessLabel(item)}</span>}
    </div>
    {media.length > 0 && <div className="ha-gallery">
      <HistoryPicture key={media[photoIndex]?.id} media={media[photoIndex]} onOpen={openPhoto}/>
      {media[photoIndex]?.caption && <p className="ha-caption">{media[photoIndex].caption}</p>}
      {media.length > 1 && <div className="ha-gallery-thumbs">
        {media.map((photo, index) => <button className={photoIndex === index ? 'selected' : ''} key={photo.id} onClick={() => setPhotoIndex(index)} aria-label={'Vis bilde ' + (index + 1)}><img loading="lazy" src={photo.src} alt={photo.alt}/></button>)}
      </div>}
    </div>}
    {(personStory?.lead || item.summary) && <p className="ha-lead">{personStory?.lead ?? item.summary}</p>}
    {personStory ? (
      <section className="ha-player-story" aria-label={'Historien om ' + personStory.name}>
        {personStory.chapters.map((chapter, index) => <div className="ha-story-chapter" key={chapter.heading}>
          <span className="ha-story-ordinal">{String(index + 1).padStart(2, '0')}</span>
          <h2>{chapter.heading}</h2>
          <p>{chapter.text}</p>
        </div>)}
      </section>
    ) : item.body && item.body.length > 0 ? (
      <section className="ha-prose">{item.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>
    ) : null}
    <DetailsData kind={selection.kind} item={item} openItem={openItem}/>
    {linked.length > 0 && <section className="ha-block">
      <h3>Se også i Storhamar-historien</h3>
      <div className="ha-link-list">{linked.slice(0, 45).map((link) => {
        if (!isBrowsableKind(link.kind)) return null
        const related = archiveItem(link.kind, link.id)
        if (!related) return null
        return <button key={link.kind + link.id} onClick={() => openItem(link.kind as BrowsableKind, link.id)}>
          <span>{link.label || related.title}</span><small>{KIND_LABELS[link.kind]}</small><ChevronRight size={15}/>
        </button>
      })}</div>
    </section>}
    {references.length > 0 && <section className="ha-block ha-sources">
      <h3>Kilder og bilder</h3>
      {!isPerson && <p>SIL-arkivet er hovedkilde. Andre primærkilder brukes der de dokumenterer flere detaljer.</p>}
      {references.map((source, index) => <a key={source.url + index} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ExternalLink size={14}/></a>)}
      {item.media.some((photo) => photo.rightsNote) && <small>Bildene vises fra kildenes egne adresser med oppgitt kreditering. Rettigheter og videre bruk følger originalkildene.</small>}
    </section>}
    {item.completeness !== 'verified' && !isPerson && <p className="ha-research-note">Denne oppføringen er merket som ufullstendig. Manglende historiske tall og fakta vises ikke som null eller som antatte opplysninger.</p>}
  </section>
}

function ArchiveCard({ kind, item, onClick, openPhoto }: {
  kind: BrowsableKind
  item: ArchiveBase
  onClick: () => void
  openPhoto: (media: ArchiveMedia) => void
}) {
  const year = entryYear(kind, item)
  const media = imageFor(kind, item)
  const Icon = ICONS[kind]
  return <article className={'ha-entry-card ' + (kind === 'jersey' ? 'jersey' : '')}>
    {media ? <div className="ha-card-art"><HistoryPicture key={media.id} media={media} compact onOpen={openPhoto}/></div> : <div className="ha-card-symbol"><Icon size={27}/></div>}
    <button type="button" className="ha-card-content" onClick={onClick}>
      <span className="ha-card-meta">{KIND_LABELS[kind]} {year ? '· ' + year : ''}</span>
      <strong>{item.title}</strong>
      {item.summary && <p>{item.summary}</p>}
      <span className="ha-card-bottom"><small>{completenessLabel(item)}</small><ChevronRight size={16}/></span>
    </button>
  </article>
}

function ChapterView({ chapter, back, openItem, openPhoto }: {
  chapter: HistoryChapter
  back: () => void
  openItem: (kind: BrowsableKind, id: string) => void
  openPhoto: (media: ArchiveMedia) => void
}) {
  const jersey = chapter.imageJerseyId ? archiveItem('jersey', chapter.imageJerseyId) : undefined
  const media = jersey?.media[0]
  return <section className="ha-shell ha-chapter-view">
    <button className="ha-back" onClick={back}><ArrowLeft size={17}/> Tilbake til historien</button>
    <span className="ha-kicker">{chapter.period}</span>
    <h1>{chapter.title}</h1>
    {media && <div className="ha-chapter-image"><HistoryPicture media={media} onOpen={openPhoto}/></div>}
    <p className="ha-lead">{chapter.summary}</p>
    <div className="ha-prose">{chapter.paragraphs.map((p,index)=><p key={index}>{p}</p>)}</div>
    <section className="ha-block">
      <h3>Utforsk denne epoken</h3>
      <div className="ha-link-list">{chapter.archiveLinks.map((link) => {
        const item = archiveItem(link.kind, link.id)
        return item ? <button key={link.kind + link.id} onClick={() => openItem(link.kind, item.id)}><span>{item.title}</span><small>{KIND_LABELS[link.kind]}</small><ChevronRight size={15}/></button> : null
      })}</div>
    </section>
    <a className="ha-source-link" href={chapter.sourceUrl} target="_blank" rel="noopener noreferrer">Les den historiske kilden hos SIL-arkivet <ExternalLink size={15}/></a>
  </section>
}

export function HistoryArchivePage() {
  const [section, setSection] = useState<Section>('overview')
  const [selection, setSelection] = useState<Selection | null>(null)
  const [chapterId, setChapterId] = useState<string | null>(null)
  const [photo, setPhoto] = useState<ImageTarget>(null)
  const [query, setQuery] = useState('')
  const [decade, setDecade] = useState('all')
  const [jerseyType, setJerseyType] = useState('all')
  const [sort, setSort] = useState<SortOrder>('newest')
  const [visibleCount, setVisibleCount] = useState(24)

  // History drill-downs live inside the app's own scroll region.
  // Opening a player/season or going back must start at the top.
  useEffect(() => {
    const region = document.getElementById('app-scroll-content')
    if (region) region.scrollTop = 0
  }, [section, selection?.kind, selection?.id, chapterId])

  const sectionInfo = historyCategories.find((category) => category.id === section)
  const allItems = useMemo(() => section !== 'overview' && isBrowsableKind(section) ? archiveItems(section) : [], [section])
  const matches = useMemo(() => {
    if (section === 'overview' || !isBrowsableKind(section)) return []
    const kind = section
    const filtered = allItems.filter((item) => {
      if (!matchesArchiveSearch(item, query)) return false
      const year = entryYear(kind, item)
      if (decade !== 'all' && (year == null || Math.floor(year / 10) * 10 !== Number(decade))) return false
      if (kind === 'jersey' && jerseyType !== 'all' && !(item as ArchiveJersey).usage.includes(jerseyType as ArchiveJersey['usage'][number])) return false
      return true
    })
    filtered.sort((a, b) => {
      if (sort === 'alpha' || (kind === 'player' && sort === 'newest')) return a.title.localeCompare(b.title, 'nb-NO')
      const delta = (entryYear(kind, b) ?? 0) - (entryYear(kind, a) ?? 0)
      return (sort === 'oldest' ? -delta : delta) || a.title.localeCompare(b.title, 'nb-NO')
    })
    return filtered
  }, [allItems, section, query, decade, jerseyType, sort])

  const universalMatches = useMemo(() => {
    if (section !== 'overview' || !query.trim()) return []
    const kinds: BrowsableKind[] = ['season','jersey','honour','legend','player','europe','arena','record','timeline']
    return kinds.flatMap((kind) => archiveItems(kind).filter((item) => matchesArchiveSearch(item, query)).map((item) => ({kind, item}))).slice(0, 30)
  }, [query, section])

  function goSection(next: Section) {
    setSection(next)
    setSelection(null)
    setChapterId(null)
    setQuery('')
    setDecade('all')
    setJerseyType('all')
    setSort(next === 'player' || next === 'legend' ? 'alpha' : 'newest')
    setVisibleCount(24)
  }
  function openItem(kind: BrowsableKind, id: string) {
    setSection(kind)
    setSelection({kind,id})
    setChapterId(null)
  }
  function openChapter(id: string) {
    setSection('overview')
    setSelection(null)
    setChapterId(id)
  }
  function openPhoto(media: ArchiveMedia) {
    setPhoto({media, caption: media.caption || media.alt})
  }

  const featuredJersey = archiveItem('jersey','jersey-1957-67')?.media[0]
  const featuredProfiles = featuredPlayerStoryNames.map((name) => {
    const person = historyArchive.legends.find((entry) => entry.fullName === name)
      ?? historyArchive.players.find((entry) => entry.fullName === name)
    if (!person) return null
    return {
      kind: historyArchive.legends.some((entry) => entry.id === person.id) ? 'legend' as const : 'player' as const,
      person,
      story: playerStoryForName(name)!,
    }
  }).filter((entry): entry is NonNullable<typeof entry> => entry !== null)
  const chapter = chapterId ? historyChapters.find((item) => item.id === chapterId) : undefined
  const roleList = section === 'captain' || section === 'coach' ? sourceRoleLists[section] : null
  const sectionIcon = sectionInfo ? ICONS[sectionInfo.id] : BookOpen

  return <div className="ha-wrap">
    {photo && <div className="ha-lightbox" role="dialog" aria-modal="true" aria-label="Historisk bilde">
      <button className="ha-lightbox-close" onClick={() => setPhoto(null)} aria-label="Lukk bilde"><X size={22}/></button>
      <img src={photo.media.src} alt={photo.media.alt}/>
      <p>{photo.caption}</p>
      <span>{photo.media.credit || 'Kilde oppgitt i arkivet'}</span>
      {photo.media.sourceUrl && <a href={photo.media.sourceUrl} target="_blank" rel="noopener noreferrer">Se originalkilde <ExternalLink size={13}/></a>}
    </div>}

    {selection ? <DetailView key={selection.kind + selection.id} selection={selection} back={() => setSelection(null)} openItem={openItem} openPhoto={openPhoto}/>
    : chapter ? <ChapterView key={chapter.id} chapter={chapter} back={() => setChapterId(null)} openItem={openItem} openPhoto={openPhoto}/>
    : section === 'overview' ? <section className="ha-shell">
      <div className="ha-hero">
        {featuredJersey && <div className="ha-hero-image"><HistoryPicture media={featuredJersey} compact/></div>}
        <span className="ha-kicker">MITT STORHAMAR · HISTORIEARKIV</span>
        <h1>Fra uteisen til evig gult og blått</h1>
        <p>Klubbens historier, mennesker, drakter og gull. Kildebasert på SIL-arkivet, med dokumentasjon og ekte historiske bilder.</p>
        <a href="https://silarkivet.no/" target="_blank" rel="noopener noreferrer">Hovedkilde: SIL-arkivet <ExternalLink size={14}/></a>
      </div>
      <div className="ha-stats">
        <div><strong>1957</strong><span>Storhamarbana</span></div>
        <div><strong>69</strong><span>Historiske sesonger</span></div>
        <div><strong>10</strong><span>NM-gull</span></div>
        <div><strong>11</strong><span>Seriemesterskap</span></div>
      </div>
      <div className="ha-extra-actions">
        <button onClick={()=>goSection('audit')}><Shield size={17}/><span><strong>Kildekontroll</strong><small>Hva mangler i de 69 sesongene?</small></span><ChevronRight size={16}/></button>
        <button onClick={()=>goSection('numbers')}><Shirt size={17}/><span><strong>Draktnummer 01–98</strong><small>Søk i nummerhistorien</small></span><ChevronRight size={16}/></button>
        <button onClick={()=>goSection('career-stats')}><Trophy size={17}/><span><strong>Adelskalenderen</strong><small>Rekorder og karrieretall</small></span><ChevronRight size={16}/></button>
      </div>
      <div className="ha-section-title"><span className="ha-kicker">START HER</span><h2>Utforsk Storhamar</h2><p>Velg en samling eller søk direkte etter et navn, en sesong eller en hendelse.</p></div>
      <label className="ha-search"><Search size={17}/><input aria-label="Søk i hele historiearkivet" placeholder="Søk etter drakter, spillere, år og gull…" value={query} onChange={(event)=>setQuery(event.target.value)}/>{query && <button onClick={()=>setQuery('')} aria-label="Tøm søk"><X size={15}/></button>}</label>
      {query.trim() ? <div className="ha-search-results">
        <h3>Søkeresultater</h3>
        <p>{universalMatches.length === 30 ? 'Viser de første 30 treffene. Velg en kategori for mer presise søk.' : universalMatches.length + ' treff'}</p>
        <div className="ha-link-list">{universalMatches.map(({kind,item}) => <button key={kind+item.id} onClick={()=>openItem(kind,item.id)}><span>{item.title}</span><small>{KIND_LABELS[kind]}</small><ChevronRight size={15}/></button>)}</div>
        {universalMatches.length === 0 && <p>Ingen dokumenterte treff. Prøv et annet navn eller årstall.</p>}
      </div> : <>
        <div className="ha-category-grid">{historyCategories.filter((item)=>item.priority==='primary').map((category)=>{
          const Icon = ICONS[category.id]
          return <button className="ha-category" key={category.id} onClick={()=>goSection(category.id)}>
            <Icon size={21}/><strong>{category.title}</strong><small>{category.description}</small><ChevronRight className="ha-category-arrow" size={16}/>
          </button>
        })}</div>
        <div className="ha-section-title"><span className="ha-kicker">MENNESKENE BAK KLUBBEN</span><h2>Spillerne og historiene deres</h2><p>Fra de første pionerene til moderne gullhelter. Les om karrierene, øyeblikkene og menneskene bak tallene.</p></div>
        <div className="ha-story-feature-grid">{featuredProfiles.map(({kind,person,story})=>{
          const photo = imageFor(kind, person)
          return <button className="ha-story-feature" key={person.id} onClick={()=>openItem(kind,person.id)}>
            {photo ? <span className="ha-story-feature-image"><img src={photo.src} alt={photo.alt} loading="lazy"/></span> : <span className="ha-story-feature-symbol"><UserRound size={25}/></span>}
            <span className="ha-story-feature-text"><strong>{story.name}</strong><small>{story.lead}</small><span>Les historien <ChevronRight size={14}/></span></span>
          </button>
        })}</div>
        <button className="ha-load-more" onClick={()=>goSection('player')}>Se alle spillere og flere biografier ({playerStories.length}) <ChevronRight size={17}/></button>
        <div className="ha-section-title"><span className="ha-kicker">HISTORIEN BAK RESULTATENE</span><h2>Epokene som formet klubben</h2></div>
        <div className="ha-chapter-list">{historyChapters.map((part)=>{
          const media = part.imageJerseyId ? archiveItem('jersey',part.imageJerseyId)?.media[0] : undefined
          return <button className="ha-chapter-card" key={part.id} onClick={()=>openChapter(part.id)}>
            {media && <span className="ha-chapter-thumb"><img src={media.src} alt={media.alt} loading="lazy"/></span>}
            <span className="ha-chapter-content"><small>{part.period}</small><strong>{part.title}</strong><span>{part.summary}</span></span><ChevronRight size={19}/>
          </button>
        })}</div>
        <div className="ha-section-title"><span className="ha-kicker">FORDYPNING</span><h2>Flere sider av historien</h2></div>
        <div className="ha-category-grid ha-secondary-categories">{historyCategories.filter((item)=>item.priority==='secondary').map((category)=>{
          const Icon = ICONS[category.id]
          return <button className="ha-category" key={category.id} onClick={()=>goSection(category.id)}><Icon size={18}/><strong>{category.title}</strong><small>{category.description}</small><ChevronRight className="ha-category-arrow" size={15}/></button>
        })}</div>
        <div className="ha-research-note">Historiearkivet bygger på kilder, ikke antakelser. Enkelte eldre sesonger og spillerstaller er ufullstendige. Databasen går til og med sesongen 2025/26; pågående sesong registreres først som ferdig historie etter sesongslutt.</div>
      </>}
    </section>
    : section === 'audit' ? <HistoryAuditPage back={()=>goSection('overview')} openSeason={(id)=>openItem('season',id)}/>
    : section === 'numbers' ? <HistoryNumberPage back={()=>goSection('overview')} openPerson={(kind,id)=>openItem(kind,id)}/>
    : section === 'career-stats' ? <CareerTotalsPage back={()=>goSection('overview')} openPerson={(kind,id)=>openItem(kind,id)}/>
    : isBrowsableKind(section) ? <section className="ha-shell">
      <button className="ha-back" onClick={()=>goSection('overview')}><ArrowLeft size={17}/> Tilbake til Historie</button>
      <div className="ha-section-heading">{(() => { const Icon=sectionIcon;return <Icon size={24}/> })()}<div><span className="ha-kicker">STORHAMAR · ARKIVET</span><h1>{sectionInfo?.title}</h1><p>{sectionInfo?.description}</p></div></div>
      {section === 'jersey' && <div className="ha-topic-note">SIL-arkivet dokumenterer at klubbens aller første drakter var svarte og gule. Den gule og blå draktidentiteten kom senere. Her finner du også Europa-, sluttspill- og spesialdrakter med kilde og bilde der det finnes.</div>}
      {section === 'season' && <div className="ha-topic-note">Sesonger fra 1957/58 til 2025/26. Det som ikke kan dokumenteres – særlig eldre statistikk – er merket som ufullstendig.</div>}
      {(section === 'player' || section === 'legend') && <div className="ha-topic-note">Mange profiler har nå egne fortellinger om oppvekst, karriere og historiske kamper. Åpne en spiller for å lese historien. Kildene står samlet nederst på profilen.</div>}
      {section === 'legend' && <div className="ha-topic-note">Legender, hedrede bannere og draktnumre. Statusen på en hedring forklares på hver profil og blandes ikke med et formelt fredet nummer.</div>}
      <label className="ha-search"><Search size={17}/><input value={query} aria-label={'Søk i ' + sectionInfo?.title} onChange={(event)=>{setQuery(event.target.value);setVisibleCount(24)}} placeholder={'Søk i ' + (sectionInfo?.title.toLowerCase() ?? 'arkivet') + '…'}/>{query && <button onClick={()=>setQuery('')} aria-label="Tøm søk"><X size={15}/></button>}</label>
      <div className="ha-filters">
        <label><Filter size={13}/> Tidsrom<select value={decade} onChange={(event)=>{setDecade(event.target.value);setVisibleCount(24)}}><option value="all">Alle år</option>{['2020','2010','2000','1990','1980','1970','1960','1950'].map((year)=><option key={year} value={year}>{year}-tallet</option>)}</select></label>
        <label>Sorter<select value={sort} onChange={(event)=>setSort(event.target.value as SortOrder)}><option value="newest">Nyeste først</option><option value="oldest">Eldste først</option><option value="alpha">A–Å</option></select></label>
      </div>
      {section === 'jersey' && <div className="ha-pill-filters">{JERSEY_FILTERS.map(([value,label])=><button key={value} className={jerseyType===value ? 'active' : ''} onClick={()=>{setJerseyType(value);setVisibleCount(24)}}>{label}</button>)}</div>}
      <p className="ha-results-count">{matches.length} dokumenterte oppføringer · viser {Math.min(matches.length,visibleCount)}</p>
      <div className={section === 'jersey' ? 'ha-entry-grid ha-jersey-grid' : 'ha-entry-grid'}>
        {matches.slice(0,visibleCount).map((item)=><ArchiveCard key={item.id} item={item} kind={section} onClick={()=>openItem(section,item.id)} openPhoto={openPhoto}/>)}
      </div>
      {matches.length===0 && <div className="ha-empty">Ingen treff med dette søket. Endre filter eller søk.</div>}
      {visibleCount<matches.length && <button className="ha-load-more" onClick={()=>setVisibleCount((count)=>count+24)}>Vis flere ({matches.length-visibleCount} igjen) <ChevronRight size={17}/></button>}
    </section>
    : roleList ? <section className="ha-shell">
      <button className="ha-back" onClick={()=>goSection('overview')}><ArrowLeft size={17}/> Tilbake til Historie</button>
      <div className="ha-section-heading"><Star size={22}/><div><span className="ha-kicker">SIL-ARKIVET</span><h1>{roleList.title}</h1><p>Navn og perioder er basert på SIL-arkivets historiske oversikt.</p></div></div>
      <label className="ha-search"><Search size={17}/><input value={query} placeholder={'Søk blant ' + roleList.title.toLowerCase()} onChange={(event)=>setQuery(event.target.value)}/></label>
      <div className="ha-roles">{roleList.entries.filter(([name,years])=>(name+' '+years).toLocaleLowerCase('nb-NO').includes(query.toLocaleLowerCase('nb-NO'))).map(([name,years], index)=>{
        const profile=historyArchive.players.find((player)=>player.fullName===name) ?? historyArchive.legends.find((player)=>player.fullName===name)
        return <div className="ha-role-card" key={name+index}>
          <span>{years}</span><strong>{name}</strong>
          {profile && <button onClick={()=>openItem(archiveItem('player',profile.id)?'player':'legend',profile.id)}>Åpne profil <ChevronRight size={13}/></button>}
        </div>
      })}</div>
      <a className="ha-source-link" href={roleList.sourceUrl} target="_blank" rel="noopener noreferrer">Full oversikt hos SIL-arkivet <ExternalLink size={15}/></a>
    </section>
    : section === 'identity' ? <section className="ha-shell">
      <button className="ha-back" onClick={()=>goSection('overview')}><ArrowLeft size={17}/> Tilbake til Historie</button>
      <div className="ha-section-heading"><Shirt size={24}/><div><span className="ha-kicker">FARGER · SYMBOLER · NAVN</span><h1>Klubbidentitet</h1></div></div>
      <p className="ha-lead">Fra svart og gult til de karakteristiske gule og blå draktene. Storhamars visuelle historie forteller også historien om klubbens vekst.</p>
      <div className="ha-prose"><p>I starten handlet det om å få tak i utstyr. Draktene var svarte og gule. Senere ble gult og blått den tydelige klubbidentiteten, mens nye design, sponsorer og Dragons-perioden satte sitt preg på ulike epoker.</p></div>
      <div className="ha-entry-grid ha-jersey-grid">{['jersey-1957-67','jersey-1967-77','jersey-2025-26-series','jersey-2025-preseason-hamar'].map((id)=>{
        const item=archiveItem('jersey',id)
        return item ? <ArchiveCard kind="jersey" item={item} key={id} onClick={()=>openItem('jersey',id)} openPhoto={openPhoto}/> : null
      })}</div>
      <button className="ha-load-more" onClick={()=>goSection('jersey')}>Utforsk hele draktarkivet <ChevronRight size={17}/></button>
      <a className="ha-source-link" href="https://silarkivet.no/drakter/" target="_blank" rel="noopener noreferrer">Kilde: SIL-arkivets drakthistorie <ExternalLink size={15}/></a>
    </section>
    : <section className="ha-shell">
      <button className="ha-back" onClick={()=>goSection('overview')}><ArrowLeft size={17}/> Tilbake til Historie</button>
      <div className="ha-section-heading"><Users size={24}/><div><span className="ha-kicker">TRIBUNENE · SUPPORTERNE</span><h1>Supporterkultur</h1></div></div>
      <p className="ha-lead">Storhamar er mer enn resultater. Den organiserte supporterkulturen er også en del av klubbhistorien.</p>
      <div className="ha-prose"><p><strong>25. oktober 2001:</strong> Storhamar Supporterunion ble stiftet. Stiftelsesdato og formål om å støtte Storhamar Hockey er dokumentert i Brønnøysundregistrene.</p><p>SSU og tribunelivet er viktig for historien om hockeyen på Hamar. Vi har foreløpig ikke importert en komplett kronologi over tifoer, borteturer og supportersanger. Slikt skal bare føres inn når hendelsene kan kildebelegges.</p></div>
      <button className="ha-load-more" onClick={()=>openItem('timeline','timeline-2001-ssu-founded')}>Les om SSUs stiftelse <ChevronRight size={17}/></button>
      <a className="ha-source-link" href="https://virksomhet.brreg.no/nb/oppslag/enheter/994331981" target="_blank" rel="noopener noreferrer">Kilde: Brønnøysundregistrene <ExternalLink size={15}/></a>
      <div className="ha-link-list">
        {['arena-hamar-ol-amfi','arena-storhamar-ishall'].map((id)=>{
          const item=archiveItem('arena',id)
          return item ? <button key={id} onClick={()=>openItem('arena',id)}><span>{item.title}</span><small>Arena</small><ChevronRight size={15}/></button> : null
        })}
        <button onClick={()=>goSection('record')}><span>Rekorder og publikumsøyeblikk</span><small>Rekorder</small><ChevronRight size={15}/></button>
      </div>
      <a className="ha-source-link" href="https://silarkivet.no/tidslinje/milepaeler/" target="_blank" rel="noopener noreferrer">Kilde: SIL-arkivets milepæler og publikumsrekorder <ExternalLink size={15}/></a>
    </section>}
  </div>
}

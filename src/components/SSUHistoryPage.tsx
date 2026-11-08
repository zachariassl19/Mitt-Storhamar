import { useRef, useState } from 'react'
import {
  ArrowLeft, BookOpen, CalendarDays, Camera, ChevronDown, ChevronRight,
  Clock3, ExternalLink, HeartHandshake, ImageOff, Star, Users, X,
} from 'lucide-react'
import {
  ssuChapters, ssuFoundationDate, ssuPhotos, ssuSource, ssuSources, ssuTimeline,
} from '../history/ssuHistory'
import type { SSUPhoto, SSUEvent } from '../history/ssuHistory'
import { filteredSSUHighlights, highlightCategories, ssuHighlights } from '../history/ssuHighlights'
import type { SSUHighlight, SSUHighlightCategory } from '../history/ssuHighlights'

type SSUTab = 'highlights' | 'chapters' | 'timeline' | 'photos'

const sections: Array<{id:SSUTab; title:string}> = [
  {id:'highlights',title:'Høydepunkter'},
  {id:'chapters',title:'Historien'},
  {id:'timeline',title:'Tidslinje'},
  {id:'photos',title:'Bilder'},
]

function SupportPhoto({ photo, onOpen }: { photo:SSUPhoto; onOpen:(photo:SSUPhoto)=>void }) {
  const [broken,setBroken]=useState(false)
  return <figure className="ssu-photo">
    {broken
      ? <div className="ssu-photo-missing"><ImageOff size={25}/><span>Bildet er ikke tilgjengelig</span></div>
      : <button type="button" onClick={()=>onOpen(photo)} aria-label={'Vis bilde: '+photo.title}>
          <img src={photo.src} alt={photo.alt} loading="lazy" onError={()=>setBroken(true)}/>
        </button>}
    <figcaption>
      <strong>{photo.title}</strong>
      <span>{photo.date} · {photo.credit}</span>
      <a href={photo.originalUrl} target="_blank" rel="noopener noreferrer">Originalbilde <ExternalLink size={12}/></a>
      <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">Bildebruk og lisens <ExternalLink size={12}/></a>
    </figcaption>
  </figure>
}

function EventList({events,title}:{events:SSUEvent[];title:string}) {
  if(!events.length) return null
  return <section className="ssu-timeline-group">
    <h3>{title}</h3>
    <div className="ssu-timeline-items">
      {events.map((event)=><article className="ssu-timeline-event" key={event.id}>
        <div className="ssu-timeline-date">{event.year}</div>
        <div className="ssu-timeline-copy">
          <h4>{event.title}</h4>
          <p>{event.text}</p>
          {event.uncertain && <small>Forløperen er omtalt i en sekundærkilde. Eksakte datoer er ikke fastslått.</small>}
          <div className="ssu-event-sources">
            {event.sourceIds.map((id)=>{
              const source=ssuSource(id)
              return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" title={source.label}>Les kilden <ExternalLink size={11}/></a> : null
            })}
          </div>
        </div>
      </article>)}
    </div>
  </section>
}

function SSUHighlightCard({item,expanded,onToggle,onPhoto}:{
  item:SSUHighlight
  expanded:boolean
  onToggle:()=>void
  onPhoto:(photo:SSUPhoto)=>void
}) {
  const photo=item.photoId ? ssuPhotos.find((entry)=>entry.id===item.photoId) : undefined
  return <article className={'ssu-highlight-card'+(expanded?' expanded':'')}>
    <button type="button" className="ssu-highlight-summary" onClick={onToggle} aria-expanded={expanded}>
      {photo && <span className="ssu-highlight-thumb"><img src={photo.src} alt={photo.alt} loading="lazy"/></span>}
      <span className="ssu-highlight-main">
        <span className="ssu-highlight-year">{item.year}{item.beforeSSU?' · FØR SSU':''}</span>
        <strong>{item.title}</strong>
        <span>{item.teaser}</span>
        <small>{item.keyFact}</small>
      </span>
      <span className="ssu-highlight-toggle">{expanded?'−':'+'}</span>
    </button>
    {expanded && <div className="ssu-highlight-detail">
      {item.paragraphs.map((paragraph,index)=><p key={index}>{paragraph}</p>)}
      {photo && <button type="button" className="ssu-highlight-open-photo" onClick={()=>onPhoto(photo)}>
        Se bildet <ExternalLink size={14}/>
      </button>}
      <div className="ssu-highlight-references">
        {item.sourceIds.map((id)=>{
          const source=ssuSource(id)
          return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <ExternalLink size={12}/></a> : null
        })}
      </div>
    </div>}
  </article>
}

function OverviewHeading({kicker,title,subtitle}:{kicker:string;title:string;subtitle:string}) {
  return <div className="ha-section-title ssu-part-heading">
    <span className="ha-kicker">{kicker}</span><h2>{title}</h2><p>{subtitle}</p>
  </div>
}

export function SSUHistoryPage({onBack}:{onBack:()=>void}) {
  const [selectedTab,setSelectedTab]=useState<SSUTab>('highlights')
  const [category,setCategory]=useState<SSUHighlightCategory|'all'>('all')
  const [visibleCount,setVisibleCount]=useState(6)
  const [openHighlightId,setOpenHighlightId]=useState<string|null>(null)
  const [openPhoto,setOpenPhoto]=useState<SSUPhoto|null>(null)
  const [timelineRange,setTimelineRange]=useState<'all'|'early'|'middle'|'recent'>('all')
  const sectionRef=useRef<HTMLDivElement>(null)
  const highlights=filteredSSUHighlights(category)
  const precursors=ssuTimeline.filter((event)=>event.beforeSSU)
  const unionHistory=ssuTimeline.filter((event)=>!event.beforeSSU)
  const timelineFilter=(event:SSUEvent)=>{
    if(timelineRange==='all') return true
    const year=Number(event.date?.slice(0,4) || event.year.slice(0,4))
    if(timelineRange==='early') return Boolean(event.beforeSSU)
    if(timelineRange==='middle') return !event.beforeSSU && year>=2001 && year<=2019
    return !event.beforeSSU && year>=2020
  }

  function chooseTab(next:SSUTab) {
    setSelectedTab(next)
    setOpenHighlightId(null)
    sectionRef.current?.scrollIntoView({block:'start',behavior:'auto'})
  }

  return <section className="ha-shell ssu-history-page">
    <button className="ha-back" type="button" onClick={onBack}><ArrowLeft size={17}/> Tilbake til Historie</button>

    <div className="ssu-history-hero">
      <div className="ssu-hero-photo"><img src={ssuPhotos[0].src} alt="Storhamar-supportere i gult og blått"/></div>
      <div className="ssu-hero-content">
        <span className="ha-kicker">EGEN HISTORIEDEL · STORHAMAR SUPPORTER UNION</span>
        <h1>Historien om SSU</h1>
        <p>Fellesskapet, borteturene, sangene og menneskene som følger Storhamar.</p>
        <div className="ssu-hero-facts"><span><CalendarDays size={15}/> 25. oktober 2001</span><span><Users size={15}/> Hjemme og borte</span></div>
      </div>
    </div>

    <div className="ssu-stats">
      <div><strong>25 år</strong><span>2001–2026</span></div>
      <div><strong>{ssuHighlights.length}</strong><span>Høydepunkter</span></div>
      <div><strong>{ssuPhotos.length}</strong><span>Historiske bilder</span></div>
    </div>

    <div className="ssu-section-navigation" ref={sectionRef} aria-label="Velg del av SSU-historien">
      {sections.map((section)=><button type="button" key={section.id}
        className={selectedTab===section.id?'active':''}
        aria-pressed={selectedTab===section.id}
        onClick={()=>chooseTab(section.id)}>
        {section.id==='highlights' && <Star size={17}/>}
        {section.id==='chapters' && <BookOpen size={17}/>}
        {section.id==='timeline' && <Clock3 size={17}/>}
        {section.id==='photos' && <Camera size={17}/>}
        <span>{section.title}</span>
      </button>)}
    </div>

    {selectedTab==='highlights' && <div className="ssu-history-content">
      <OverviewHeading kicker="ØYEBLIKKENE SOM FORMET FELLESSKAPET" title="Historiske høydepunkter"
        subtitle="De store borteturene, tribuneøyeblikkene og menneskene bak supporterklubben."/>
      <div className="ssu-highlight-filters" aria-label="Filtrer høydepunkter">
        <button type="button" className={category==='all'?'active':''} aria-pressed={category==='all'}
          onClick={()=>{setCategory('all');setVisibleCount(6);setOpenHighlightId(null)}}>Alle ({ssuHighlights.length})</button>
        {highlightCategories.map((item)=><button type="button" key={item.id}
          className={category===item.id?'active':''} aria-pressed={category===item.id}
          onClick={()=>{setCategory(item.id);setVisibleCount(6);setOpenHighlightId(null)}}>
          {item.title} ({ssuHighlights.filter((entry)=>entry.category===item.id).length})
        </button>)}
      </div>
      <div className="ssu-highlights-list">{highlights.slice(0,visibleCount).map((item)=>
        <SSUHighlightCard key={item.id} item={item} expanded={openHighlightId===item.id}
          onToggle={()=>setOpenHighlightId((id)=>id===item.id?null:item.id)} onPhoto={setOpenPhoto}/>)}</div>
      {visibleCount<highlights.length && <button type="button" className="ha-load-more" onClick={()=>setVisibleCount((count)=>count+6)}>
        Vis flere høydepunkter ({highlights.length-visibleCount}) <ChevronRight size={17}/>
      </button>}
    </div>}

    {selectedTab==='chapters' && <div className="ssu-history-content">
      <OverviewHeading kicker="FRA DE FØRSTE SUPPORTERNE" title="Historien i kapitler"
        subtitle="Les om miljøet før SSU, den organiserte unionen, reisen og kulturen gjennom 25 år."/>
      <div className="ssu-introduction">
        <h2>Mer enn 60 minutter hockey</h2>
        <p>På tribunene har generasjoner med Storhamar-supportere feiret seire, reist land og strand rundt og holdt sammen i motgang. I 2001 fikk fellesskapet en ny organisert stemme. Historien begynner likevel lenge før stiftelsesdagen.</p>
      </div>
      <div className="ssu-chapter-accordion">{ssuChapters.map((chapter,index)=>
        <details key={chapter.id} className="ssu-chapter-disclosure" open={index===0?true:undefined}>
          <summary><span className="ssu-chapter-number">{String(index+1).padStart(2,'0')}</span>
            <span className="ssu-chapter-heading"><small>{chapter.kicker}</small><strong>{chapter.title}</strong></span>
            <ChevronDown size={18}/>
          </summary>
          <div className="ssu-chapter-prose">
            {chapter.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
            {chapter.id==='before' && <div className="ssu-older-context">
              <strong>Storhamar supporterforening</strong>
              <span>Den eldre foreningen er omtalt i sekundærkilder. Vi har ennå ikke dokumentert presise etablerings- og avslutningsdatoer.</span>
            </div>}
            <div className="ssu-highlight-references">
              {chapter.sourceIds.map((id)=>{
                const source=ssuSource(id)
                return source ? <a href={source.url} key={id} target="_blank" rel="noopener noreferrer">Kilde: {source.label} <ExternalLink size={12}/></a> : null
              })}
            </div>
          </div>
        </details>)}</div>
      <div className="ssu-today"><HeartHandshake size={23}/><div>
        <h2>Historien fortsetter</h2>
        <p>Hver supporterbuss, hvert skjerf og hver sang er en del av historien. Det viktigste er menneskene som stiller opp for klubben år etter år.</p>
      </div></div>
    </div>}

    {selectedTab==='timeline' && <div className="ssu-history-content">
      <OverviewHeading kicker="ÅR FOR ÅR" title="SSU gjennom tidene"
        subtitle="En tidslinje som også forteller om supporterkulturen før supporterunionen ble stiftet."/>
      <div className="ssu-timeline-filters" aria-label="Velg periode i tidslinjen">
        {([
          ['all','Alle år'],
          ['early','Før SSU'],
          ['middle','2001–2019'],
          ['recent','2020–2026'],
        ] as const).map(([id,label])=><button type="button" key={id}
          className={timelineRange===id?'active':''} aria-pressed={timelineRange===id}
          onClick={()=>setTimelineRange(id)}>{label}</button>)}
      </div>
      <div className="ssu-timeline-layout">
        {(timelineRange==='all'||timelineRange==='early') && <EventList title="Før unionen" events={precursors.filter(timelineFilter)}/>}
        {(timelineRange==='all'||timelineRange==='middle') && <EventList title="Fra stiftelsen til 2019" events={unionHistory.filter((event)=>timelineFilter(event)&&Number(event.year.slice(0,4))<=2019)}/>}
        {(timelineRange==='all'||timelineRange==='recent') && <EventList title="De nyeste årene" events={unionHistory.filter((event)=>timelineFilter(event)&&Number(event.year.slice(0,4))>=2020)}/>}
      </div>
    </div>}

    {selectedTab==='photos' && <div className="ssu-history-content">
      <OverviewHeading kicker="FOTOGRAFIER FRA BORTETRIBUNEN" title="SSU i bilder"
        subtitle="Historiske fotografier med årstall, fotograf og lenke til originalbildene."/>
      <div className="ssu-photo-grid">{ssuPhotos.map((photo)=><SupportPhoto key={photo.id} photo={photo} onOpen={setOpenPhoto}/>)}</div>
      <p className="ssu-photo-note">Vi bruker bilder med dokumentert opphav og lisens. Eldre bilder fra Facebook og Instagram kan legges inn når originalinnlegg og rettigheter er gjennomgått.</p>
    </div>}

    <details className="ssu-sources-disclosure">
      <summary><span>Kilder og bildedokumentasjon</span><ChevronDown size={17}/></summary>
      <div className="ssu-source-list">
        <p>Historien bygger på offentlige dokumenter, klubbhistorie, gamle supporterutgivelser og fotografier. Materiale om den eldre supporterforeningen er markert der dokumentasjonen mangler.</p>
        <p>Gamle innlegg fra SSUs Facebook og Instagram kan også være historiske kilder. De må ha kontrollert dato og originalpost før de brukes her. Vi legger ikke ut innhold fra lukkede kontoer eller privat medlemsinformasjon.</p>
        {ssuSources.map((source)=><a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" title={source.note}>{source.label} <ExternalLink size={13}/></a>)}
        <small>SSU ble stiftet {ssuFoundationDate}. Bildene er kreditert til Repstad/Vegard Gran via Wikimedia Commons under CC BY-SA 4.0.</small>
      </div>
    </details>

    {openPhoto && <div className="ha-lightbox" role="dialog" aria-modal="true" aria-label={openPhoto.title}>
      <button type="button" className="ha-lightbox-close" onClick={()=>setOpenPhoto(null)} aria-label="Lukk bilde"><X size={22}/></button>
      <img src={openPhoto.src} alt={openPhoto.alt}/>
      <p>{openPhoto.title} · {openPhoto.date}</p>
      <span>{openPhoto.credit}</span>
      <a href={openPhoto.originalUrl} target="_blank" rel="noopener noreferrer">Originalfoto <ExternalLink size={13}/></a>
      <a href={openPhoto.licenseUrl} target="_blank" rel="noopener noreferrer">Lisens <ExternalLink size={13}/></a>
    </div>}
  </section>
}

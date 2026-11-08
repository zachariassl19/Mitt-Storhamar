import { useState } from 'react'
import { ArrowLeft, CalendarDays, ExternalLink, HeartHandshake, ImageOff, Users, X } from 'lucide-react'
import { ssuChapters, ssuFoundationDate, ssuPhotos, ssuSource, ssuSources, ssuTimeline } from '../history/ssuHistory'
import type { SSUPhoto, SSUEvent } from '../history/ssuHistory'

function SupportPhoto({ photo, onOpen }: { photo: SSUPhoto; onOpen: (photo: SSUPhoto) => void }) {
  const [broken, setBroken] = useState(false)
  return <figure className="ssu-photo">
    {broken
      ? <div className="ssu-photo-missing"><ImageOff size={25}/><span>Bildet er ikke tilgjengelig</span></div>
      : <button type="button" onClick={()=>onOpen(photo)} aria-label={'Vis større bilde: '+photo.title}>
          <img src={photo.src} alt={photo.alt} loading="lazy" onError={()=>setBroken(true)}/>
        </button>}
    <figcaption>
      <strong>{photo.title}</strong>
      <span>{photo.date} · {photo.credit}</span>
      <a href={photo.originalUrl} target="_blank" rel="noopener noreferrer">Se originalfoto <ExternalLink size={12}/></a>
    </figcaption>
  </figure>
}

function EventList({ events, title }: { events: SSUEvent[]; title: string }) {
  return <section className="ssu-timeline-group">
    <h3>{title}</h3>
    <div className="ssu-timeline-items">{events.map((event)=><article className="ssu-timeline-event" key={event.id}>
      <div className="ssu-timeline-date">{event.year}</div>
      <div className="ssu-timeline-copy">
        <h4>{event.title}</h4>
        <p>{event.text}</p>
        {event.uncertain && <small>Opplysningen om den eldre foreningen bygger foreløpig på en sekundærkilde.</small>}
        <div className="ssu-event-sources">
          {event.sourceIds.map((id)=>{
            const source=ssuSource(id)
            return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" title={source.label}>Les mer <ExternalLink size={11}/></a> : null
          })}
        </div>
      </div>
    </article>)}</div>
  </section>
}

export function SSUHistoryPage({ onBack }: { onBack: () => void }) {
  const [openPhoto, setOpenPhoto] = useState<SSUPhoto | null>(null)
  const precursors=ssuTimeline.filter((event)=>event.beforeSSU)
  const unionHistory=ssuTimeline.filter((event)=>!event.beforeSSU)
  return <section className="ha-shell ssu-history-page">
    <button className="ha-back" type="button" onClick={onBack}><ArrowLeft size={17}/> Tilbake til Historie</button>

    <div className="ssu-history-hero">
      <div className="ssu-hero-photo"><img src={ssuPhotos[0].src} alt={ssuPhotos[0].alt}/></div>
      <div className="ssu-hero-content">
        <span className="ha-kicker">STORHAMARS SUPPORTERHISTORIE</span>
        <h1>Storhamar Supporter Union</h1>
        <p>Historien om stemmene på tribunen, menneskene på bortetur og fellesskapet som følger Storhamar.</p>
        <div className="ssu-hero-facts"><span><CalendarDays size={15}/> 25. oktober 2001</span><span><Users size={15}/> Gult og blått – hjemme og borte</span></div>
      </div>
    </div>

    <div className="ssu-stats">
      <div><strong>2001</strong><span>Stiftet</span></div>
      <div><strong>25 år</strong><span>25. oktober 2026</span></div>
      <div><strong>SSU</strong><span>Storhamar Supporter Union</span></div>
    </div>

    <div className="ssu-introduction">
      <span className="ha-kicker">HISTORIEN VÅR</span>
      <h2>Mer enn 60 minutter hockey</h2>
      <p>Storhamar har aldri bare handlet om spillerne på isen. På tribunene har generasjoner med supportere feiret seire, reist land og strand rundt og holdt sammen også når resultatene har gått imot. I 2001 fikk fellesskapet en ny organisert stemme: Storhamar Supporter Union.</p>
      <p>Men historien begynner før SSU. Den omfatter de første hockeytilskuerne, en eldre supporterforening og Køllebladet, som ga fansen deres egen stemme lenge før sosiale medier.</p>
    </div>

    <div className="ha-section-title"><span className="ha-kicker">FRA UTEISEN TIL TRIBUNEN</span><h2>Historien i kapitler</h2></div>
    <div className="ssu-chapter-list">
      {ssuChapters.map((chapter,index)=><article className="ssu-story-chapter" key={chapter.id}>
        <div className="ssu-chapter-index"><span>{String(index+1).padStart(2,'0')}</span></div>
        <div className="ssu-chapter-content">
          <span className="ha-kicker">{chapter.kicker}</span>
          <h3>{chapter.title}</h3>
          {chapter.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
          {chapter.id==='before' && <div className="ssu-older-context"><strong>Storhamar supporterforening</strong><span>Navnet er omtalt som en eldre supporterforening. Detaljene om etablering og avslutning undersøkes fortsatt, så vi setter ikke udokumenterte datoer på den.</span></div>}
        </div>
      </article>)}
    </div>

    <div className="ha-section-title"><span className="ha-kicker">ØYEBLIKKENE</span><h2>SSU i bilder</h2><p>Ekte bilder fra bortetribunen – dokumentert med fotograf og lisens.</p></div>
    <div className="ssu-photo-grid">{ssuPhotos.map((photo)=><SupportPhoto key={photo.id} photo={photo} onOpen={setOpenPhoto}/>)}</div>

    <div className="ha-section-title"><span className="ha-kicker">ÅR FOR ÅR</span><h2>Tidslinjen</h2><p>Fra supporterforeningen som kom før til 25-årsjubileet i 2026.</p></div>
    <div className="ssu-timeline-layout">
      <EventList title="Før SSU" events={precursors}/>
      <EventList title="Storhamar Supporter Union 2001–2026" events={unionHistory}/>
    </div>

    <div className="ssu-today"><HeartHandshake size={24}/>
      <div><h2>Historien fortsetter</h2><p>Hver busstur, hvert sjerf og hvert møte mellom supportere er en del av historien. SSU har vært med Storhamar i både motgang og medgang. De store øyeblikkene betyr mest fordi de deles.</p></div>
    </div>

    <section className="ha-block ha-sources ssu-source-list">
      <h3>Kilder og bildedokumentasjon</h3>
      <p>Historien bygger på klubbhistorie, offentlige dokumenter, gamle supporterutgivelser og fotografier. Opplysninger om forløperen er skilt fra de dokumenterte SSU-hendelsene.</p>
      {ssuSources.map((source)=><a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" title={source.note}>{source.label}<ExternalLink size={14}/></a>)}
      <small>Foto: Repstad via Wikimedia Commons, CC BY-SA 4.0. Originalkilder og lisens er tilgjengelige ved hvert bilde. SSUs stiftelsesdato {ssuFoundationDate} følger Brønnøysundregistrene.</small>
    </section>

    {openPhoto && <div className="ha-lightbox" role="dialog" aria-modal="true" aria-label={openPhoto.title}>
      <button type="button" className="ha-lightbox-close" onClick={()=>setOpenPhoto(null)} aria-label="Lukk bilde"><X size={22}/></button>
      <img src={openPhoto.src} alt={openPhoto.alt}/>
      <p>{openPhoto.title} · {openPhoto.date}</p>
      <span>{openPhoto.credit}</span>
      <a href={openPhoto.originalUrl} target="_blank" rel="noopener noreferrer">Originalfoto og lisens <ExternalLink size={13}/></a>
    </div>}
  </section>
}

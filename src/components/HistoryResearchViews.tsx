import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronRight, ExternalLink, Search, ShieldCheck, Shirt, Users } from 'lucide-react'
import { careerTotals, careerTotalsSource, careerStatDiscrepancies, careerNamesRepeated } from '../history/careerTotals'
import { historyAuditSummary, seasonAudit } from '../history/coverageAudit'
import { numberIndex, officialNumberSource } from '../history/numberIndex'
import { historyArchive } from '../history/catalog'

type PersonKind = 'player' | 'legend'
type OpenPerson = (kind: PersonKind, id: string) => void

function personProfile(name: string): { kind: PersonKind; id: string } | null {
  const player = historyArchive.players.find((p) => p.fullName === name)
  if (player) return { kind:'player', id:player.id }
  const legend = historyArchive.legends.find((p) => p.fullName === name)
  return legend ? { kind:'legend',id:legend.id } : null
}

export function HistoryAuditPage({ back, openSeason }: { back: () => void; openSeason:(id:string)=>void }) {
  const [decade,setDecade] = useState('all')
  const [showOnlyMissing,setShowOnlyMissing] = useState(false)
  const rows=useMemo(()=>seasonAudit.filter((entry)=>
    (decade === 'all' || Math.floor(entry.startYear/10)*10===Number(decade)) &&
    (!showOnlyMissing || entry.issues.length > 0)
  ),[decade,showOnlyMissing])
  return <section className="ha-shell">
    <button className="ha-back" onClick={back}><ArrowLeft size={17}/> Tilbake til Historie</button>
    <div className="ha-section-heading"><ShieldCheck size={23}/><div>
      <span className="ha-kicker">KILDEKONTROLL · VERSJONERT ARKIV</span>
      <h1>Hva er dokumentert?</h1>
      <p>Vi viser faktiske data og hull i arkivet. En sesongside er ikke nødvendigvis komplett selv om oppføringen er kildekontrollert.</p>
    </div></div>
    <div className="ha-audit-grid">
      <div><strong>{historyAuditSummary.totalSeasons}</strong><span>Sesonger registrert</span></div>
      <div><strong>{historyAuditSummary.seasonsWithRosters}</strong><span>Med spillerstall</span></div>
      <div><strong>{historyAuditSummary.seasonsWithJerseys}</strong><span>Med draktkobling</span></div>
      <div><strong>{historyAuditSummary.seasonsWithFullLeagueTotals}</strong><span>Med fulle tabelltall</span></div>
      <div><strong>{historyAuditSummary.seasonsWithImageSources}</strong><span>Med bildekilder</span></div>
      <div><strong>{historyAuditSummary.archiveEntriesPartial}</strong><span>Arkivoppføringer delvis dokumentert</span></div>
    </div>
    <p className="ha-topic-note">Det finnes {historyAuditSummary.archiveEntries} historiske oppføringer i appen. {historyAuditSummary.archiveEntriesWithImages} har én eller flere bildekilder. Tallene betyr registrert innhold, ikke at eksterne bilde-URL-er er kontrollert eller at alle sesongens kamper er importert.</p>
    <h2>Sesong for sesong</h2>
    <div className="ha-filters">
      <label>Tiår <select value={decade} onChange={(e)=>setDecade(e.target.value)}>
        <option value="all">Alle sesonger</option>
        {['2020','2010','2000','1990','1980','1970','1960','1950'].map((v)=><option value={v} key={v}>{v}-tallet</option>)}
      </select></label>
      <label className="ha-audit-toggle"><input type="checkbox" checked={showOnlyMissing} onChange={(e)=>setShowOnlyMissing(e.target.checked)}/> Kun ufullstendige</label>
    </div>
    <div className="ha-audit-seasons">{rows.map((entry)=><article key={entry.id} className="ha-audit-season">
      <button className="ha-audit-season-top" onClick={()=>openSeason(entry.id)}>
        <strong>{entry.label}</strong>
        <span className={entry.issues.length ? 'ha-audit-open' : 'ha-audit-done'}>{entry.issues.length ? entry.issues.length + ' åpne punkter' : 'Ingen registrerte gap'}</span>
        <ChevronRight size={17}/>
      </button>
      <div className="ha-audit-labels">
        <span>{entry.documentedRoster} spillere</span>
        <span>{entry.jerseyCount} drakter</span>
        {entry.hasFullLeagueTotals ? <span>Tabell: komplett feltsett</span> : <span>Tabell: delvis</span>}
        {entry.hasImageReference && <span>Bildekilde</span>}
      </div>
      {entry.issues.length > 0 && <details><summary>Se mangler og forbehold</summary><div>{entry.issues.map((issue)=><p key={issue}>• {issue}</p>)}</div></details>}
    </article>)}</div>
    <div className="ha-research-note">
      <strong>Åpent kildearbeid:</strong>
      {historyAuditSummary.currentNotImported.map((message)=><p key={message}>{message}</p>)}
    </div>
    <a className="ha-source-link" href="https://silarkivet.no/sesonger/" rel="noopener noreferrer" target="_blank">Originale sesongreferater og kampfakta hos SIL-arkivet <ExternalLink size={15}/></a>
  </section>
}

export function HistoryNumberPage({ back, openPerson }: { back:()=>void;openPerson:OpenPerson }) {
  const [selected,setSelected]=useState('08')
  const [search,setSearch]=useState('')
  const row=numberIndex.find((entry)=>entry.number===selected)!
  const matches=numberIndex.filter((entry)=>entry.number.includes(search) || entry.holders.some((holder)=>holder.name.toLocaleLowerCase('nb-NO').includes(search.toLocaleLowerCase('nb-NO'))))
  return <section className="ha-shell">
    <button className="ha-back" onClick={back}><ArrowLeft size={17}/> Tilbake til Historie</button>
    <div className="ha-section-heading"><Shirt size={24}/><div>
      <span className="ha-kicker">DRAKTNUMMER · FRA 01 TIL 98</span>
      <h1>Hvem brukte nummeret?</h1>
      <p>Søk og velg et draktnummer. Appen viser spillerprofilene vi har koblet, med lenke til den fullstendige oversikten i SIL-arkivet.</p>
    </div></div>
    <label className="ha-search"><Search size={17}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Søk nummer eller spiller…"/></label>
    <div className="ha-number-grid">{matches.map((entry)=><button key={entry.number} onClick={()=>setSelected(entry.number)} className={selected===entry.number?'active':''}><strong>{entry.number}</strong><span>{entry.holders.length} kjente navn</span></button>)}</div>
    {matches.length===0 && <p>Ingen treff. Den fullstendige nummeroversikten ligger hos SIL-arkivet.</p>}
    <div className="ha-number-detail">
      <span className="ha-kicker">VALGT DRAKTNUMMER</span>
      <strong className="ha-number-large">#{row.number}</strong>
      {row.holders.length===0 ? <p>Ingen spillerprofiler med dette nummeret er koblet i appen ennå. Det betyr ikke at nummeret aldri er brukt.</p> : <div className="ha-link-list">{row.holders.map((person)=>{
        const target=person.profileId && person.profileKind ? {id:person.profileId,kind:person.profileKind} : null
        return target ? <button key={person.name} onClick={()=>openPerson(target.kind,target.id)}><span>{person.name}</span><small>Spillerprofil</small><ChevronRight size={15}/></button> : <p key={person.name}>{person.name} · SIL-arkivet</p>
      })}</div>}
    </div>
    <a className="ha-source-link" href={officialNumberSource} rel="noopener noreferrer" target="_blank">Komplett historisk nummeroversikt hos SIL-arkivet <ExternalLink size={15}/></a>
    <div className="ha-research-note">Appens nummeroversikt er foreløpig et utvalg basert på registrerte spillerprofiler. SIL-arkivet har flere historiske brukere av hvert nummer som fortsatt skal kobles til appen.</div>
  </section>
}

type StatKey = 'games' | 'points' | 'goals' | 'assists'
export function CareerTotalsPage({ back, openPerson }: { back:()=>void;openPerson:OpenPerson }) {
  const [sort,setSort]=useState<StatKey>('games')
  const [query,setQuery]=useState('')
  const [visibleCount,setVisibleCount]=useState(60)
  const ordered=useMemo(()=>{
    const clean=query.toLocaleLowerCase('nb-NO').trim()
    return [...careerTotals]
      .filter((entry)=>entry.name.toLocaleLowerCase('nb-NO').includes(clean))
      .sort((a,b)=>b[sort]-a[sort] || a.name.localeCompare(b.name,'nb-NO'))
  },[sort,query])
  const sorter: {key:StatKey;label:string}[] = [
    {key:'games',label:'Kamper'},{key:'points',label:'Poeng'},{key:'goals',label:'Mål'},{key:'assists',label:'Assist'},
  ]
  return <section className="ha-shell">
    <button className="ha-back" onClick={back}><ArrowLeft size={17}/> Tilbake til Historie</button>
    <div className="ha-section-heading"><Users size={24}/><div><span className="ha-kicker">SIL-ARKIVET · A JOUR ETTER 2025/26</span><h1>Adelskalenderen</h1><p>Alle {careerTotals.length} dokumenterte rader fra SIL-arkivets samlede karrieretabell. Tallene er historiske og ikke live-statistikk for 2026/27.</p></div></div>
    <label className="ha-search"><Search size={17}/><input aria-label="Søk i den historiske adelskalenderen" value={query} onChange={(e)=>{setQuery(e.target.value);setVisibleCount(60)}} placeholder="Søk etter spiller…"/></label>
    <div className="ha-pill-filters">{sorter.map((item)=><button key={item.key} className={sort===item.key?'active':''} onClick={()=>{setSort(item.key);setVisibleCount(60)}}>{item.label}</button>)}</div>
    <p className="ha-results-count">{ordered.length} registreringer · viser {Math.min(ordered.length,visibleCount)}</p>
    <div className="ha-career-header"><span>Spiller</span><span>K</span><span>M</span><span>A</span><span>P</span></div>
    <div className="ha-career-table">{ordered.slice(0,visibleCount).map((entry,index)=>{
      const duplicate=careerNamesRepeated.includes(entry.name)
      const profile=duplicate ? null : personProfile(entry.name)
      const discrepancy=entry.goals+entry.assists !== entry.points
      return <div key={entry.name+'-'+index} className={'ha-career-row '+(discrepancy?'ha-career-discrepancy':'')}>
        {profile ? <button onClick={()=>openPerson(profile.kind,profile.id)}><small>{index+1}</small>{entry.name}<ChevronRight size={12}/></button> : <span><small>{index+1}</small>{entry.name}{duplicate ? ' *' : ''}</span>}
        <strong>{entry.games}</strong><span>{entry.goals}</span><span>{entry.assists}</span><strong>{entry.points}</strong>
      </div>
    })}</div>
    {visibleCount<ordered.length && <button className="ha-load-more" onClick={()=>setVisibleCount((n)=>n+60)}>Vis flere ({ordered.length-visibleCount} gjenstår) <ChevronRight size={17}/></button>}
    <p className="ha-topic-note">K = kamper, M = mål, A = målgivende pasninger, P = poeng. Den historiske tabellen inneholder {careerStatDiscrepancies.length} rader hvor M + A ikke stemmer med oppgitt P i SIL-kilden. Disse er markert i tabellen og ikke korrigert uten dokumentasjon. {careerNamesRepeated.length} navn forekommer flere ganger og er ikke automatisk koblet til én personprofil.</p>
    <a className="ha-source-link" href={careerTotalsSource} rel="noopener noreferrer" target="_blank">Åpne originaltabellen hos SIL-arkivet <ExternalLink size={15}/></a>
  </section>
}

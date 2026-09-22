import { UserRound, Users } from 'lucide-react'
import { games } from '../data/games'
import {
  loadCompanions,
  loadGameCompanionSelections,
  summarizeCompanions,
} from '../lib/companions'
import type { GameDayRecord } from '../types'
import '../companions.css'

export function CompanionStatsPanel({ records }: { records: Record<string, GameDayRecord> }) {
  const summary = summarizeCompanions(loadCompanions(), loadGameCompanionSelections(), records, games)
  const knownCompanionGames = summary.registeredGames - summary.soloGames

  return (
    <div className="companion-stats-panel">
      <article className="card companion-summary-card">
        <div className="min-card-title"><Users size={20} /><div><span className="eyebrow">REISEFØLGE</span><h2>Hvem du drar med</h2></div></div>
        <div className="companion-summary-grid">
          <div><span>Registrert</span><strong>{summary.registeredGames}</strong><small>kampdager</small></div>
          <div><span>Med noen</span><strong>{knownCompanionGames}</strong><small>kamper</small></div>
          <div><span>Alene</span><strong>{summary.soloGames}</strong><small>kamper</small></div>
          <div><span>Ukjent</span><strong>{summary.unknownGames}</strong><small>bekreftede kamper</small></div>
        </div>
      </article>

      <article className="card companion-highlight-card">
        <span className="eyebrow">OFTEST MED</span>
        <strong>{summary.topCompanion?.name ?? 'Ikke nok data'}</strong>
        <p>{summary.topCompanion ? `${summary.topCompanion.games} kamper sammen` : 'Registrer reisefølge på ferdige kamper for å bygge statistikken.'}</p>
        {summary.topCombination && summary.topCombination.names.length > 1 && (
          <div className="companion-combination"><span>Vanligste kombinasjon</span><strong>{summary.topCombination.names.join(' + ')}</strong><small>{summary.topCombination.games} kamper</small></div>
        )}
      </article>

      <div className="companion-person-list">
        {summary.people.map((person, index) => (
          <article className="card companion-person-row" key={person.id}>
            <span className="companion-rank">{index + 1}</span>
            <div className="companion-person-main">
              <div className="companion-avatar"><UserRound size={17} /></div>
              <div><strong>{person.name}</strong><span>{person.games} {person.games === 1 ? 'kamp' : 'kamper'} sammen</span></div>
            </div>
            <div className="companion-home-away"><strong>{person.homeGames}H</strong><span>·</span><strong>{person.awayGames}B</strong></div>
          </article>
        ))}
      </div>

      <p className="min-footnote companion-stats-note">H = hjemmekamp og B = bortekamp. Hvis du velger flere personer på samme kamp, teller kampen én gang på hver person.</p>
    </div>
  )
}

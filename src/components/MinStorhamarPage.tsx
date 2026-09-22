import { useMemo, useState } from 'react'
import { BarChart3, MapPin, Route, ShoppingBag, Ticket, WalletCards } from 'lucide-react'
import { games } from '../data/games'
import { confirmedLocalCareerStats } from '../lib/careerStats'
import { confirmedLegacyCareerStats } from '../lib/legacyStats'
import { summarizePurchases, unitPrice } from '../lib/purchases'
import type { GamePurchase, GameDayRecord, HubExport, Trip } from '../types'

type MinStorhamarTab = 'overview' | 'economy' | 'arenas'

interface ArenaStat {
  arena: string
  visits: number
  spentAtArena: number
  kioskSpent: number
  purchases: number
}

interface PriceComparison {
  item: string
  size: string | null
  observations: number
  cheapest: { arena: string; price: number }
  dearest: { arena: string; price: number }
}

function money(value: number) {
  return new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(value) + ' kr'
}

function decimalMoney(value: number) {
  return new Intl.NumberFormat('nb-NO', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value) + ' kr'
}

function sumKind(purchases: GamePurchase[], kind: GamePurchase['kind']) {
  return purchases
    .filter((purchase) => purchase.kind === kind)
    .reduce((sum, purchase) => sum + purchase.totalPrice, 0)
}

export function MinStorhamarPage({ hubData, trips, records, purchases }: {
  hubData: HubExport | null
  trips: Trip[]
  records: Record<string, GameDayRecord>
  purchases: GamePurchase[]
}) {
  const [tab, setTab] = useState<MinStorhamarTab>('overview')

  const stats = useMemo(() => {
    const local = confirmedLocalCareerStats(records, trips)
    const legacy = confirmedLegacyCareerStats(hubData, records)
    const attendedIds = legacy.attendedGameIds
    const confirmedPurchases = purchases.filter((purchase) => attendedIds.has(purchase.gameId))
    const purchaseSummary = summarizePurchases(confirmedPurchases)

    const ticketRecords = Object.values(records).filter(
      (record) => record.completed && record.attendanceActual === 'attended' && record.ticketCost != null,
    )
    const ticketTotal = ticketRecords.reduce((sum, record) => sum + (record.ticketCost ?? 0), 0)
    const travelTotal = local.travelCost
    const kioskTotal = sumKind(confirmedPurchases, 'kiosk')
    const lotteryTotal = sumKind(confirmedPurchases, 'lottery')
    const supporterTotal = sumKind(confirmedPurchases, 'supporter')
    const parkingTotal = sumKind(confirmedPurchases, 'parking')
    const accommodationTotal = sumKind(confirmedPurchases, 'accommodation')
    const otherTotal = sumKind(confirmedPurchases, 'other')
    const totalSpent = travelTotal + ticketTotal + purchaseSummary.totalSpent

    const financialGameIds = new Set<string>()
    for (const purchase of confirmedPurchases) financialGameIds.add(purchase.gameId)
    for (const record of ticketRecords) financialGameIds.add(record.gameId)
    for (const trip of trips) {
      if (trip.status === 'completed' && attendedIds.has(trip.gameId)) {
        const hasCost = trip.legs.some((leg) => (leg.actualCost ?? leg.estimatedCost) != null)
        if (hasCost) financialGameIds.add(trip.gameId)
      }
    }
    const averagePerFinancialGame = financialGameIds.size > 0 ? totalSpent / financialGameIds.size : 0

    const spendByGame = new Map<string, number>()
    const arenaSpendByGame = new Map<string, number>()
    const kioskByGame = new Map<string, number>()
    const purchaseCountByGame = new Map<string, number>()

    for (const purchase of confirmedPurchases) {
      spendByGame.set(purchase.gameId, (spendByGame.get(purchase.gameId) ?? 0) + purchase.totalPrice)
      arenaSpendByGame.set(purchase.gameId, (arenaSpendByGame.get(purchase.gameId) ?? 0) + purchase.totalPrice)
      purchaseCountByGame.set(purchase.gameId, (purchaseCountByGame.get(purchase.gameId) ?? 0) + 1)
      if (purchase.kind === 'kiosk') kioskByGame.set(purchase.gameId, (kioskByGame.get(purchase.gameId) ?? 0) + purchase.totalPrice)
    }

    for (const record of ticketRecords) {
      const value = record.ticketCost ?? 0
      spendByGame.set(record.gameId, (spendByGame.get(record.gameId) ?? 0) + value)
      arenaSpendByGame.set(record.gameId, (arenaSpendByGame.get(record.gameId) ?? 0) + value)
    }

    for (const trip of trips) {
      if (trip.status !== 'completed' || !attendedIds.has(trip.gameId)) continue
      const tripCost = trip.legs.reduce((sum, leg) => sum + (leg.actualCost ?? leg.estimatedCost ?? 0), 0)
      spendByGame.set(trip.gameId, (spendByGame.get(trip.gameId) ?? 0) + tripCost)
    }

    const knownAttendedGames = games.filter((game) => attendedIds.has(game.id))
    const homeGames = knownAttendedGames.filter((game) => game.homeTeam === 'Storhamar')
    const awayGames = knownAttendedGames.filter((game) => game.awayTeam === 'Storhamar')
    const homeSpent = homeGames.reduce((sum, game) => sum + (spendByGame.get(game.id) ?? 0), 0)
    const awaySpent = awayGames.reduce((sum, game) => sum + (spendByGame.get(game.id) ?? 0), 0)

    const arenaMap = new Map<string, ArenaStat>()
    for (const game of knownAttendedGames) {
      const current = arenaMap.get(game.arena) ?? {
        arena: game.arena,
        visits: 0,
        spentAtArena: 0,
        kioskSpent: 0,
        purchases: 0,
      }
      current.visits += 1
      current.spentAtArena += arenaSpendByGame.get(game.id) ?? 0
      current.kioskSpent += kioskByGame.get(game.id) ?? 0
      current.purchases += purchaseCountByGame.get(game.id) ?? 0
      arenaMap.set(game.arena, current)
    }
    const arenas = [...arenaMap.values()].sort((a, b) => b.spentAtArena - a.spentAtArena || b.visits - a.visits)

    const categoryTotals = [
      { label: 'Billett', value: ticketTotal },
      { label: 'Reise', value: travelTotal },
      { label: 'Kiosk', value: kioskTotal },
      { label: 'Lotteri', value: lotteryTotal },
      { label: 'Supporterutstyr', value: supporterTotal },
      { label: 'Parkering', value: parkingTotal },
      { label: 'Overnatting', value: accommodationTotal },
      { label: 'Annet', value: otherTotal },
    ]
    const biggestCategory = [...categoryTotals].sort((a, b) => b.value - a.value)[0]

    const priceGroups = new Map<string, {
      item: string
      size: string | null
      observations: number
      arenas: Map<string, { total: number; count: number }>
    }>()

    for (const purchase of confirmedPurchases) {
      if (purchase.kind !== 'kiosk') continue
      const game = games.find((candidate) => candidate.id === purchase.gameId)
      const price = unitPrice(purchase)
      if (!game || price == null || !Number.isFinite(price) || price < 0) continue
      const cleanSize = purchase.size?.trim() || null
      const key = `${purchase.item.trim().toLocaleLowerCase('nb-NO')}|${cleanSize?.toLocaleLowerCase('nb-NO') ?? ''}`
      const group = priceGroups.get(key) ?? {
        item: purchase.item,
        size: cleanSize,
        observations: 0,
        arenas: new Map<string, { total: number; count: number }>(),
      }
      const arenaPrice = group.arenas.get(game.arena) ?? { total: 0, count: 0 }
      arenaPrice.total += price
      arenaPrice.count += 1
      group.arenas.set(game.arena, arenaPrice)
      group.observations += 1
      priceGroups.set(key, group)
    }

    const comparisons: PriceComparison[] = []
    for (const group of priceGroups.values()) {
      if (group.arenas.size < 2) continue
      const arenaPrices = [...group.arenas.entries()].map(([arena, value]) => ({
        arena,
        price: value.total / value.count,
      })).sort((a, b) => a.price - b.price)
      comparisons.push({
        item: group.item,
        size: group.size,
        observations: group.observations,
        cheapest: arenaPrices[0],
        dearest: arenaPrices[arenaPrices.length - 1],
      })
    }
    comparisons.sort((a, b) => (b.dearest.price - b.cheapest.price) - (a.dearest.price - a.cheapest.price) || b.observations - a.observations)

    return {
      attendedGames: attendedIds.size,
      km: Math.round(legacy.confirmedKm + local.km),
      completedTrips: local.completedTrips,
      totalSpent,
      purchaseSummary,
      confirmedPurchases,
      ticketTotal,
      travelTotal,
      kioskTotal,
      lotteryTotal,
      supporterTotal,
      parkingTotal,
      accommodationTotal,
      otherTotal,
      averagePerFinancialGame,
      financialGames: financialGameIds.size,
      homeGames: homeGames.length,
      awayGames: awayGames.length,
      homeSpent,
      awaySpent,
      arenas,
      biggestCategory,
      categoryTotals,
      comparisons,
    }
  }, [hubData, purchases, records, trips])

  const topArena = stats.arenas[0] ?? null

  return (
    <section className="page-section min-storhamar-page">
      <div className="page-heading min-storhamar-heading">
        <span className="eyebrow">DIN SUPPORTERREISE</span>
        <h1>Min Storhamar</h1>
        <p>Kamper, reiser og penger samlet fra kampdagene du faktisk har bekreftet.</p>
      </div>

      <div className="min-storhamar-tabs" role="tablist" aria-label="Min Storhamar">
        <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>Oversikt</button>
        <button className={tab === 'economy' ? 'active' : ''} onClick={() => setTab('economy')}>Økonomi</button>
        <button className={tab === 'arenas' ? 'active' : ''} onClick={() => setTab('arenas')}>Arenaer</button>
      </div>

      {tab === 'overview' && (
        <>
          <div className="min-summary-grid">
            <article><span>Kamper sett</span><strong>{stats.attendedGames}</strong></article>
            <article><span>Bekreftede km</span><strong>{stats.km}</strong></article>
            <article><span>Gjennomførte reiser</span><strong>{stats.completedTrips}</strong></article>
            <article className="money"><span>Totalt brukt</span><strong>{money(stats.totalSpent)}</strong></article>
          </div>

          <article className="card min-insight-card">
            <div className="min-card-title"><Route size={20} /><div><span className="eyebrow">KAMPENE DINE</span><h2>Hjemme og borte</h2></div></div>
            <div className="home-away-grid">
              <div><span>HJEMME</span><strong>{stats.homeGames} kamper</strong><small>{money(stats.homeSpent)} registrert</small></div>
              <div><span>BORTE</span><strong>{stats.awayGames} kamper</strong><small>{money(stats.awaySpent)} registrert</small></div>
            </div>
            <p className="min-footnote">Kamper fra gammel historikk uten kampdetaljer kan telle i totalen, men kan ikke alltid fordeles som hjemme/borte.</p>
          </article>

          <article className="card min-insight-card">
            <div className="min-card-title"><ShoppingBag size={20} /><div><span className="eyebrow">KJØPSVANER</span><h2>Det du faktisk registrerer</h2></div></div>
            <div className="min-highlight-list">
              <div><span>Mest kjøpt</span><strong>{stats.purchaseSummary.mostBoughtItem ?? 'Ikke nok data'}</strong><small>{stats.purchaseSummary.mostBoughtItem ? `${stats.purchaseSummary.mostBoughtQuantity} stk` : 'Registrer kjøp etter kamp'}</small></div>
              <div><span>Mest penger på</span><strong>{stats.biggestCategory.value > 0 ? stats.biggestCategory.label : 'Ikke nok data'}</strong><small>{stats.biggestCategory.value > 0 ? money(stats.biggestCategory.value) : '—'}</small></div>
              <div><span>Mest brukt på arena</span><strong>{topArena?.spentAtArena ? topArena.arena : 'Ikke nok data'}</strong><small>{topArena?.spentAtArena ? money(topArena.spentAtArena) : '—'}</small></div>
            </div>
          </article>
        </>
      )}

      {tab === 'economy' && (
        <>
          <article className="card economy-total-card">
            <span className="eyebrow">BEKREFTET ØKONOMI</span>
            <strong>{money(stats.totalSpent)}</strong>
            <p>{stats.financialGames > 0 ? `${money(stats.averagePerFinancialGame)} i snitt per kamp med registrert økonomi.` : 'Registrer kostnader på en ferdig kamp for å bygge statistikken.'}</p>
          </article>

          <div className="economy-breakdown-grid">
            {stats.categoryTotals.map((category) => (
              <article key={category.label} className="card">
                <span>{category.label}</span>
                <strong>{money(category.value)}</strong>
              </article>
            ))}
          </div>

          <article className="card min-insight-card">
            <div className="min-card-title"><WalletCards size={20} /><div><span className="eyebrow">KJØP</span><h2>Oppsummering</h2></div></div>
            <div className="purchase-summary-row">
              <div><strong>{stats.purchaseSummary.purchaseCount}</strong><span>registreringer</span></div>
              <div><strong>{stats.purchaseSummary.totalItems}</strong><span>varer totalt</span></div>
              <div><strong>{money(stats.purchaseSummary.totalSpent)}</strong><span>kjøp totalt</span></div>
            </div>
          </article>
        </>
      )}

      {tab === 'arenas' && (
        <>
          <article className="card min-insight-card arena-intro-card">
            <div className="min-card-title"><MapPin size={20} /><div><span className="eyebrow">ARENAER</span><h2>Hvor pengene går</h2></div></div>
            <p>Her teller billett og kjøp på selve kampdagen. Reisekostnad holdes utenfor arena-beløpet, så sammenligningen blir mer rettferdig.</p>
          </article>

          {stats.arenas.length === 0 ? (
            <article className="card min-empty-card"><MapPin size={22} /><strong>Ingen arenaøkonomi ennå</strong><span>Registrer billett eller kjøp på en bekreftet kamp.</span></article>
          ) : (
            <div className="arena-stat-list">
              {stats.arenas.map((arena, index) => (
                <article className="card arena-stat-row" key={arena.arena}>
                  <span className="arena-rank">{index + 1}</span>
                  <div className="arena-stat-main"><strong>{arena.arena}</strong><span>{arena.visits} {arena.visits === 1 ? 'besøk' : 'besøk'} · {arena.purchases} kjøpsregistreringer</span></div>
                  <div className="arena-stat-money"><strong>{money(arena.spentAtArena)}</strong><span>Kiosk {money(arena.kioskSpent)}</span></div>
                </article>
              ))}
            </div>
          )}

          <article className="card price-compare-card">
            <div className="min-card-title"><BarChart3 size={20} /><div><span className="eyebrow">PRISSAMMENLIGNING</span><h2>Samme vare, ulike arenaer</h2></div></div>
            {stats.comparisons.length === 0 ? (
              <p className="min-footnote">Når samme kiosk-vare og størrelse er registrert på minst to arenaer, sammenligner appen automatisk snittprisene.</p>
            ) : (
              <div className="price-compare-list">
                {stats.comparisons.slice(0, 5).map((comparison) => (
                  <div className="price-compare-row" key={`${comparison.item}-${comparison.size ?? ''}`}>
                    <div className="price-product"><strong>{comparison.item}{comparison.size ? ` · ${comparison.size}` : ''}</strong><span>{comparison.observations} registreringer</span></div>
                    <div className="price-side cheap"><span>Lavest</span><strong>{decimalMoney(comparison.cheapest.price)}</strong><small>{comparison.cheapest.arena}</small></div>
                    <div className="price-side expensive"><span>Høyest</span><strong>{decimalMoney(comparison.dearest.price)}</strong><small>{comparison.dearest.arena}</small></div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </>
      )}

      <article className="card min-rule-card">
        <Ticket size={18} />
        <p><strong>Bare bekreftet historikk teller.</strong> Planlagt «Ja» og planlagte reiser påvirker ikke Min Storhamar før kampdagen er fullført.</p>
      </article>
    </section>
  )
}

import { describe, expect, it } from 'vitest'
import { kioskCatalog } from '../data/purchaseCatalog'
import type { GamePurchase } from '../types'
import { summarizePurchases, unitPrice } from './purchases'

function purchase(item: string, quantity: number, totalPrice: number, kind: GamePurchase['kind'] = 'kiosk'): GamePurchase {
  return {
    id: `purchase:${item}`,
    gameId: 'game:test',
    kind,
    category: kind === 'kiosk' ? 'Drikke' : 'Lotteri',
    subcategory: kind === 'kiosk' ? 'Brus' : null,
    item,
    size: kind === 'kiosk' ? '0,5 L' : null,
    quantity,
    totalPrice,
    currency: 'NOK',
    createdAt: '2026-09-23T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  }
}

describe('purchase catalog', () => {
  it('contains the agreed kiosk selection', () => {
    const items = kioskCatalog.flatMap((group) => group.subcategories.flatMap((subcategory) => subcategory.items))
    expect(items).toContain('Fanta Exotic')
    expect(items).toContain('Puckpølse')
    expect(items).toContain('Pølse med vaffel')
    expect(items).toContain('Melkerull')
    expect(items).toContain('Smil')
    expect(items).toContain('Smurf')
    expect(items).not.toContain('7UP')
  })
})

describe('purchase statistics', () => {
  it('tracks totals and the most bought product by quantity', () => {
    const summary = summarizePurchases([
      purchase('Cola', 1, 40),
      purchase('Cola', 2, 80),
      purchase('Puckpølse', 1, 65),
      purchase('Lodd', 5, 100, 'lottery'),
    ])

    expect(summary.totalSpent).toBe(285)
    expect(summary.purchaseCount).toBe(4)
    expect(summary.totalItems).toBe(9)
    expect(summary.mostBoughtItem).toBe('Lodd')
    expect(summary.mostBoughtQuantity).toBe(5)
  })

  it('calculates unit price from total price and quantity', () => {
    expect(unitPrice(purchase('Cola', 2, 80))).toBe(40)
  })
})

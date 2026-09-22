import type { GamePurchase } from '../types'

const PURCHASES_KEY = 'mitt-storhamar:purchases:v1'

export interface PurchaseSummary {
  totalSpent: number
  purchaseCount: number
  totalItems: number
  mostBoughtItem: string | null
  mostBoughtQuantity: number
}

export function loadPurchases(): GamePurchase[] {
  try {
    const raw = localStorage.getItem(PURCHASES_KEY)
    return raw ? (JSON.parse(raw) as GamePurchase[]) : []
  } catch {
    return []
  }
}

function persistPurchases(purchases: GamePurchase[]) {
  localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases))
}

export function savePurchase(purchase: GamePurchase): GamePurchase[] {
  const current = loadPurchases()
  const index = current.findIndex((item) => item.id === purchase.id)
  const next = index >= 0
    ? current.map((item) => (item.id === purchase.id ? purchase : item))
    : [...current, purchase]
  persistPurchases(next)
  return next
}

export function deletePurchase(purchaseId: string): GamePurchase[] {
  const next = loadPurchases().filter((purchase) => purchase.id !== purchaseId)
  persistPurchases(next)
  return next
}

export function purchasesForGame(purchases: GamePurchase[], gameId: string) {
  return purchases.filter((purchase) => purchase.gameId === gameId)
}

export function summarizePurchases(purchases: GamePurchase[]): PurchaseSummary {
  const totals = new Map<string, number>()
  let totalSpent = 0
  let totalItems = 0

  for (const purchase of purchases) {
    totalSpent += Number.isFinite(purchase.totalPrice) ? purchase.totalPrice : 0
    const quantity = Number.isFinite(purchase.quantity) && purchase.quantity > 0 ? purchase.quantity : 0
    totalItems += quantity
    totals.set(purchase.item, (totals.get(purchase.item) ?? 0) + quantity)
  }

  let mostBoughtItem: string | null = null
  let mostBoughtQuantity = 0
  for (const [item, quantity] of totals) {
    if (quantity > mostBoughtQuantity) {
      mostBoughtItem = item
      mostBoughtQuantity = quantity
    }
  }

  return {
    totalSpent,
    purchaseCount: purchases.length,
    totalItems,
    mostBoughtItem,
    mostBoughtQuantity,
  }
}

export function unitPrice(purchase: GamePurchase) {
  return purchase.quantity > 0 ? purchase.totalPrice / purchase.quantity : null
}

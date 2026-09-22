import { useMemo, useState } from 'react'
import { Check, Pencil, Plus, ShoppingBasket, Trash2, X } from 'lucide-react'
import { kioskCatalog, purchaseKindLabels, simplePurchaseItems } from '../data/purchaseCatalog'
import { unitPrice } from '../lib/purchases'
import type { Game, GamePurchase, PurchaseKind } from '../types'

const kindOrder: PurchaseKind[] = ['kiosk', 'lottery', 'supporter', 'parking', 'accommodation', 'other']

function money(value: number) {
  return new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 2 }).format(value) + ' kr'
}

function isDrinkCategory(category: string) {
  return category === 'Drikke'
}

export function GamePurchases({ game, purchases, onSave, onDelete }: {
  game: Game
  purchases: GamePurchase[]
  onSave: (purchase: GamePurchase) => void
  onDelete: (purchaseId: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [kind, setKind] = useState<PurchaseKind | null>(null)
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [item, setItem] = useState('')
  const [customItem, setCustomItem] = useState(false)
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [totalPrice, setTotalPrice] = useState('')
  const [message, setMessage] = useState('')

  const selectedCategory = kioskCatalog.find((group) => group.category === category)
  const selectedSubcategory = selectedCategory?.subcategories.find((group) => group.name === subcategory)
  const total = useMemo(() => purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0), [purchases])

  function resetForm(close = false) {
    setEditingId(null)
    setKind(null)
    setCategory('')
    setSubcategory('')
    setItem('')
    setCustomItem(false)
    setSize('')
    setQuantity('1')
    setTotalPrice('')
    if (close) setOpen(false)
  }

  function chooseKind(next: PurchaseKind) {
    setKind(next)
    setCategory(next === 'kiosk' ? '' : purchaseKindLabels[next])
    setSubcategory('')
    setItem('')
    setCustomItem(false)
    setSize('')
  }

  function chooseCategory(next: string) {
    setCategory(next)
    setSubcategory('')
    setItem('')
    setCustomItem(false)
    setSize('')
  }

  function chooseSubcategory(next: string) {
    setSubcategory(next)
    setItem('')
    setCustomItem(false)
  }

  function beginCustomItem() {
    setItem('')
    setCustomItem(true)
  }

  function editPurchase(purchase: GamePurchase) {
    setOpen(true)
    setEditingId(purchase.id)
    setKind(purchase.kind)
    setCategory(purchase.category)
    setSubcategory(purchase.subcategory ?? '')
    setItem(purchase.item)
    setCustomItem(false)
    setSize(purchase.size ?? '')
    setQuantity(String(purchase.quantity))
    setTotalPrice(String(purchase.totalPrice))
    setMessage('')
  }

  function save() {
    const parsedQuantity = Math.max(1, Math.floor(Number(quantity)))
    const parsedPrice = Number(totalPrice.replace(',', '.'))
    if (!kind || !category || !item.trim() || !Number.isFinite(parsedQuantity) || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setMessage('Velg vare, antall og legg inn totalprisen.')
      return
    }

    const existing = editingId ? purchases.find((purchase) => purchase.id === editingId) : undefined
    const now = new Date().toISOString()
    onSave({
      id: existing?.id ?? `purchase:${game.id}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
      gameId: game.id,
      kind,
      category,
      subcategory: subcategory || null,
      item: item.trim(),
      size: size.trim() || null,
      quantity: parsedQuantity,
      totalPrice: parsedPrice,
      currency: 'NOK',
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    })
    setMessage(editingId ? 'Kjøpet er oppdatert.' : 'Kjøpet er lagt til kampdagen.')
    resetForm(true)
  }

  function trail(purchase: GamePurchase) {
    return purchase.kind === 'kiosk'
      ? [purchase.category, purchase.subcategory, purchase.item].filter(Boolean).join(' › ')
      : [purchaseKindLabels[purchase.kind], purchase.item].filter(Boolean).join(' › ')
  }

  const simpleItems = kind && kind !== 'kiosk' ? (simplePurchaseItems[kind] ?? []) : []
  const itemReady = Boolean(item.trim())

  return (
    <article className="card detail-card purchases-card">
      <div className="card-heading">
        <div><span className="eyebrow">ETTER KAMPEN · ØKONOMI</span><h2>Kjøp og kostnader</h2></div>
        <span className="purchase-total">{money(total)}</span>
      </div>
      <p className="travel-footnote">Kjøpene kobles automatisk til {game.arena} og denne kampen. Billett og reise registreres i sine egne deler og skal ikke legges inn dobbelt her.</p>

      {purchases.length > 0 && (
        <div className="purchase-list">
          {purchases.map((purchase) => {
            const perItem = unitPrice(purchase)
            return (
              <div className="purchase-row" key={purchase.id}>
                <div className="purchase-row-icon"><ShoppingBasket size={17} /></div>
                <div className="purchase-row-main">
                  <strong>{trail(purchase)}</strong>
                  <span>{purchase.size ? `${purchase.size} · ` : ''}{purchase.quantity} stk · {money(purchase.totalPrice)}{purchase.quantity > 1 && perItem != null ? ` · ${money(perItem)}/stk` : ''}</span>
                </div>
                <div className="purchase-row-actions">
                  <button onClick={() => editPurchase(purchase)} aria-label="Rediger kjøp"><Pencil size={15} /></button>
                  <button onClick={() => onDelete(purchase.id)} aria-label="Slett kjøp"><Trash2 size={15} /></button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!open ? (
        <button className="primary-action full-width" onClick={() => { setOpen(true); setMessage('') }}><Plus size={17} /> Legg til kjøp</button>
      ) : (
        <div className="purchase-builder">
          <div className="purchase-builder-top"><strong>{editingId ? 'Rediger kjøp' : 'Nytt kjøp'}</strong><button onClick={() => resetForm(true)} aria-label="Lukk"><X size={17} /></button></div>

          <div className="purchase-step">
            <span>1 · Hva slags kostnad?</span>
            <div className="purchase-choice-grid">{kindOrder.map((value) => <button key={value} className={kind === value ? 'selected' : ''} onClick={() => chooseKind(value)}>{purchaseKindLabels[value]}</button>)}</div>
          </div>

          {kind === 'kiosk' && (
            <div className="purchase-step">
              <span>2 · Kategori</span>
              <div className="purchase-choice-grid">{kioskCatalog.map((group) => <button key={group.category} className={category === group.category ? 'selected' : ''} onClick={() => chooseCategory(group.category)}>{group.category}</button>)}</div>
            </div>
          )}

          {kind === 'kiosk' && selectedCategory && (
            <div className="purchase-step">
              <span>3 · Type</span>
              <div className="purchase-choice-grid">{selectedCategory.subcategories.map((group) => <button key={group.name} className={subcategory === group.name ? 'selected' : ''} onClick={() => chooseSubcategory(group.name)}>{group.name}</button>)}</div>
            </div>
          )}

          {kind === 'kiosk' && selectedSubcategory && (
            <div className="purchase-step">
              <span>4 · Vare</span>
              <div className="purchase-choice-grid purchase-products">{selectedSubcategory.items.map((value) => <button key={value} className={!customItem && item === value ? 'selected' : ''} onClick={() => { setItem(value); setCustomItem(false) }}>{value}</button>)}<button className={customItem ? 'selected' : ''} onClick={beginCustomItem}>+ Egen vare</button></div>
            </div>
          )}

          {kind && kind !== 'kiosk' && (
            <div className="purchase-step">
              <span>2 · Velg</span>
              <div className="purchase-choice-grid purchase-products">{simpleItems.map((value) => <button key={value} className={!customItem && item === value ? 'selected' : ''} onClick={() => { setItem(value); setCustomItem(false) }}>{value}</button>)}<button className={customItem ? 'selected' : ''} onClick={beginCustomItem}>+ Egen vare</button></div>
            </div>
          )}

          {customItem && <label className="purchase-custom"><span>Navn på varen</span><input autoFocus value={item} onChange={(event) => setItem(event.target.value)} placeholder="Skriv hva du kjøpte" /></label>}

          {itemReady && (
            <div className="purchase-final-fields">
              {kind === 'kiosk' && isDrinkCategory(category) && <label><span>Størrelse <small>(valgfritt)</small></span><input value={size} onChange={(event) => setSize(event.target.value)} placeholder="f.eks. 0,5 L" /></label>}
              <label><span>Antall</span><input type="number" min="1" step="1" inputMode="numeric" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></label>
              <label><span>Totalpris</span><div className="price-input"><input type="number" min="0" step="0.01" inputMode="decimal" value={totalPrice} onChange={(event) => setTotalPrice(event.target.value)} placeholder="40" /><b>kr</b></div></label>
            </div>
          )}

          {itemReady && Number(quantity) > 0 && Number(totalPrice) >= 0 && totalPrice !== '' && <div className="purchase-preview"><Check size={16} /><span>{kind === 'kiosk' ? [category, subcategory, item].filter(Boolean).join(' › ') : `${purchaseKindLabels[kind!]} › ${item}`} · {Math.max(1, Math.floor(Number(quantity)))} stk · {money(Number(totalPrice))}</span></div>}
          {message && <p className="save-warning">{message}</p>}
          {itemReady && <button className="primary-action full-width" onClick={save}><Check size={17} /> {editingId ? 'Lagre endringer' : 'Legg til kjøpet'}</button>}
        </div>
      )}
      {message && !open && <p className="save-success">{message}</p>}
    </article>
  )
}

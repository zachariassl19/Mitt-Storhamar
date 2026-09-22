import type { PurchaseKind } from '../types'

export interface PurchaseCatalogGroup {
  category: string
  subcategories: { name: string; items: string[] }[]
}

export const purchaseKindLabels: Record<PurchaseKind, string> = {
  kiosk: 'Kiosk',
  lottery: 'Lotteri',
  supporter: 'Supporterutstyr',
  parking: 'Parkering',
  accommodation: 'Overnatting',
  other: 'Annet',
}

export const kioskCatalog: PurchaseCatalogGroup[] = [
  {
    category: 'Drikke',
    subcategories: [
      { name: 'Brus', items: ['Cola', 'Cola Zero', 'Pepsi', 'Pepsi Max', 'Solo', 'Fanta', 'Fanta Exotic', 'Sprite', 'Urge', 'Villa', 'Annen brus'] },
      { name: 'Vann', items: ['Vanlig vann', 'Kullsyrevann', 'Smaksvann'] },
      { name: 'Kaffe', items: ['Svart kaffe', 'Annen kaffe'] },
      { name: 'Varm drikke', items: ['Kakao', 'Te'] },
      { name: 'Annet', items: ['Juice'] },
    ],
  },
  {
    category: 'Mat',
    subcategories: [
      { name: 'Pølse', items: ['Grillpølse', 'Wienerpølse', 'Puckpølse', 'Pølse med vaffel', 'Annen pølse'] },
      { name: 'Burger', items: ['Hamburger', 'Cheeseburger', 'Annen burger'] },
      { name: 'Pizza', items: ['Pizzastykke', 'Hel pizza'] },
      { name: 'Annet', items: ['Pommes frites', 'Vaffel'] },
    ],
  },
  {
    category: 'Snacks',
    subcategories: [
      { name: 'Snacks', items: ['Chips / potetgull', 'Popcorn', 'Nøtter', 'Baconcrisp', 'Annet snacks'] },
    ],
  },
  {
    category: 'Sjokolade',
    subcategories: [
      { name: 'Sjokolade', items: ['Kvikk Lunsj', 'Snickers', 'Twix', 'KitKat', 'Melkesjokolade', 'Firkløver', 'Stratos', 'Melkerull', 'Smil', 'Annen sjokolade'] },
    ],
  },
  {
    category: 'Godis',
    subcategories: [
      { name: 'Godis', items: ['Smågodt', 'Vingummi', 'Lakris', 'Surt godteri', 'Karameller', 'Pastiller', 'Smurf', 'Annet godteri'] },
    ],
  },
  {
    category: 'Is',
    subcategories: [
      { name: 'Is', items: ['Pinneis', 'Kroneis', 'Sandwich', 'Softis', 'Annen is'] },
    ],
  },
]

export const simplePurchaseItems: Partial<Record<PurchaseKind, string[]>> = {
  lottery: ['Lodd', '50/50', 'Puckkast / konkurranse', 'Annet lotteri'],
  supporter: ['Skjerf', 'Caps', 'Lue', 'Drakt', 'T-skjorte', 'Hettegenser', 'Flagg', 'Pin', 'Klistremerke', 'Annet supporterutstyr'],
  parking: ['Parkering'],
  accommodation: ['Overnatting'],
  other: ['Annet'],
}

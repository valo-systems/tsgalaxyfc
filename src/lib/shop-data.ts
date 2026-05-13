// Single source of truth for TS Galaxy FC shop products.
// Used by the Shop page and Home page shop preview.
// When database integration is added, replace this module with API/CMS data.

import { SHOP_IMAGES } from './assets';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductCategory = 'Jerseys' | 'Supporter Wear' | 'Accessories' | 'Special Edition';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number | null;
  priceLabel: string;
  image: string;
  badge?: string;
  description: string;
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  homeFeatured?: boolean;
}

// ─── WhatsApp helper ──────────────────────────────────────────────────────────

export const SHOP_WHATSAPP = '+27137500060';

export function buildWhatsAppMessage(product: Product, size?: string, qty = 1): string {
  const lines = [
    `Hi TS Galaxy FC Shop! I'd like to order:`,
    ``,
    `Product: ${product.name}`,
    qty > 1 ? `Quantity: ${qty}` : '',
    size ? `Size: ${size}` : '',
    `Price: ${product.priceLabel}`,
    ``,
    `Please confirm availability. Thank you!`,
  ];
  return encodeURIComponent(lines.filter(Boolean).join('\n'));
}

export function whatsAppLink(product: Product, size?: string, qty = 1): string {
  return `https://wa.me/${SHOP_WHATSAPP.replace('+', '')}?text=${buildWhatsAppMessage(product, size, qty)}`;
}

// ─── Product catalogue ────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // ── Jerseys ──────────────────────────────────────────────────────────────
  {
    id: 'home-kit-2025-26',
    slug: 'home-kit-2025-26',
    name: '2025/26 Home Kit Jersey',
    category: 'Jerseys',
    price: 1300,
    priceLabel: 'R1,300.00',
    image: SHOP_IMAGES.homeKit,
    badge: 'Official Kit',
    description: 'The official 2025/26 home kit jersey for TS Galaxy FC supporters. Featuring the iconic red design and embroidered club crest — perfect for matchdays and everyday wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
    isNew: true,
    homeFeatured: true,
  },
  {
    id: 'away-kit-2025-26',
    slug: 'away-kit-2025-26',
    name: '2025/26 Away Kit Jersey',
    category: 'Jerseys',
    price: 1300,
    priceLabel: 'R1,300.00',
    image: SHOP_IMAGES.awayKit,
    badge: 'Official Kit',
    description: 'The official 2025/26 away kit jersey. Back The Rockets wherever they travel in the clean away colours.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNew: true,
    homeFeatured: true,
  },
  {
    id: 'alternative-kit-2025-26',
    slug: 'alternative-kit-2025-26',
    name: '2025/26 Alternative Kit Jersey',
    category: 'Jerseys',
    price: 1300,
    priceLabel: 'R1,300.00',
    image: SHOP_IMAGES.alternativeKit,
    badge: 'Official Kit',
    description: 'The official 2025/26 alternative kit jersey. Complete your collection with all three editions of the season.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNew: true,
    homeFeatured: true,
  },
  // ── Supporter Wear ───────────────────────────────────────────────────────
  {
    id: 'supporters-shirt',
    slug: 'supporters-shirt',
    name: 'TS Galaxy Supporters Shirt',
    category: 'Supporter Wear',
    price: 150,
    priceLabel: 'R150.00',
    image: SHOP_IMAGES.supportersShirtRed,
    badge: 'Supporter Wear',
    description: 'Show your colours with the official TS Galaxy FC supporters shirt. Lightweight and comfortable for matchdays. Available in red, white and black.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    homeFeatured: true,
  },
  {
    id: 'golf-shirt',
    slug: 'golf-shirt',
    name: 'TS Galaxy Golf Shirt',
    category: 'Supporter Wear',
    price: 500,
    priceLabel: 'R500.00',
    image: SHOP_IMAGES.golfShirtBlack,
    badge: 'Supporter Wear',
    description: 'The official TS Galaxy FC polo/golf shirt. Smart and comfortable — take The Rockets anywhere. Available in black and white.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: 'swati-ihiya',
    slug: 'swati-ihiya',
    name: 'TS Galaxy Swati Ihiya',
    category: 'Special Edition',
    price: 400,
    priceLabel: 'R400.00',
    image: SHOP_IMAGES.swatiIhiya,
    badge: 'Special Edition',
    description: "A unique TS Galaxy FC traditional wear item celebrating the club's Mpumalanga roots and cultural identity.",
    inStock: true,
  },
  // ── Accessories ──────────────────────────────────────────────────────────
  {
    id: 'beanie',
    slug: 'beanie',
    name: 'TS Galaxy Beanie',
    category: 'Accessories',
    price: 150,
    priceLabel: 'R150.00',
    image: SHOP_IMAGES.beanieRed,
    badge: 'Accessory',
    description: 'Stay warm and back The Rockets in the official TS Galaxy FC beanie. Available in red and black.',
    inStock: true,
  },
  {
    id: 'cap',
    slug: 'cap',
    name: 'TS Galaxy Cap',
    category: 'Accessories',
    price: 250,
    priceLabel: 'R250.00',
    image: SHOP_IMAGES.capWhite,
    badge: 'Accessory',
    description: 'The official TS Galaxy FC cap. Wear the crest and represent The Rockets.',
    inStock: true,
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** Products shown in the Home page shop preview section. */
export const HOME_PRODUCTS = PRODUCTS.filter(p => p.homeFeatured);

/** Featured/hero product for the Shop page spotlight. */
export const FEATURED_PRODUCT = PRODUCTS.find(p => p.featured) ?? PRODUCTS[0];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

// ─── Category filters ─────────────────────────────────────────────────────────

export const CATEGORY_FILTERS: { id: string; label: string }[] = [
  { id: 'all',              label: 'All'              },
  { id: 'Jerseys',          label: 'Jerseys'          },
  { id: 'Supporter Wear',   label: 'Supporter Wear'   },
  { id: 'Accessories',      label: 'Accessories'      },
  { id: 'Special Edition',  label: 'Special Edition'  },
];

import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ChevronRight, ShieldCheck, Truck, MessageCircle,
  Minus, Plus, X, ShoppingBag, Calendar, Users, Ticket,
  Newspaper, AlertCircle,
} from 'lucide-react';
import { LOGO, THE_CLUB_IMAGES, QUEENS_IMAGES } from '@/lib/assets';
import {
  PRODUCTS, CATEGORY_FILTERS, whatsAppLink,
  type Product,
} from '@/lib/shop-data';
import { useCart } from '@/context/CartContext';

// ─── Style constants ──────────────────────────────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};

// ─── Badge colour map ─────────────────────────────────────────────────────────

const BADGE_CLS: Record<string, string> = {
  'Official Kit':    'bg-red-600 text-white',
  'Supporter Wear':  'bg-gray-800 text-white',
  'Accessory':       'bg-gray-700 text-white',
  'Special Edition': 'bg-amber-500 text-black',
};

// ─── SizeChip ─────────────────────────────────────────────────────────────────

function SizeChip({
  size, selected, onClick,
}: { size: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Select size ${size}`}
      className={`min-w-[44px] h-11 px-3 rounded-xl font-black text-sm border-2 transition-all ${
        selected
          ? 'border-red-600 bg-red-50 text-red-600'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
      }`}
    >
      {size}
    </button>
  );
}

// ─── QtySelector ─────────────────────────────────────────────────────────────

function QtySelector({ qty, onChange }: { qty: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-xl font-black w-8 text-center">{qty}</span>
      <button
        onClick={() => onChange(qty + 1)}
        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({ product, onView }: { product: Product; onView: (p: Product) => void }) {
  const { addItem } = useCart();
  const navigate    = useNavigate();

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (product.sizes && product.sizes.length > 0) {
      // Open drawer so user can pick a size
      onView(product);
    } else {
      addItem({
        productId:  product.id,
        slug:       product.slug,
        name:       product.name,
        image:      product.image,
        price:      product.price ?? 0,
        priceLabel: product.priceLabel,
        quantity:   1,
        lineTotal:  product.price ?? 0,
      });
      navigate('/checkout');
    }
  }

  return (
    <article
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group flex flex-col cursor-pointer"
      onClick={() => onView(product)}
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-5 transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${BADGE_CLS[product.badge] ?? 'bg-gray-800 text-white'}`}>
            {product.badge}
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-sm leading-snug text-gray-900 group-hover:text-red-600 transition-colors mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{product.category}</p>
        <p className="text-sm font-black text-red-600 mb-4">{product.priceLabel}</p>

        {product.sizes && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.sizes.map(s => (
              <span key={s} className="text-[10px] font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto space-y-2">
          <button
            onClick={e => { e.stopPropagation(); onView(product); }}
            className="w-full bg-red-600 text-white text-xs font-black py-2.5 rounded-xl hover:bg-red-700 transition-colors"
            aria-label={`View details for ${product.name}`}
          >
            View Details
          </button>
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-1.5 bg-gray-900 text-white text-xs font-black py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            {product.sizes && product.sizes.length > 0 ? 'Select Size' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── ProductDrawer ────────────────────────────────────────────────────────────

function ProductDrawer({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, size?: string, qty?: number) => void;
}) {
  const [size,      setSize]      = useState(product.sizes?.[1] ?? '');
  const [qty,       setQty]       = useState(1);
  const [sizeError, setSizeError] = useState(false);

  function handleAddToCart() {
    if (product.sizes && product.sizes.length > 0 && !size) {
      setSizeError(true);
      return;
    }
    onAddToCart(product, size || undefined, qty);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — slides from right on desktop, bottom on mobile */}
      <div
        className="fixed z-50 bg-white shadow-2xl flex flex-col
          bottom-0 left-0 right-0 rounded-t-3xl max-h-[92dvh]
          lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[480px] lg:rounded-none lg:rounded-l-3xl lg:max-h-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Product details: ${product.name}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            {product.badge && (
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${BADGE_CLS[product.badge] ?? 'bg-gray-800 text-white'}`}>
                {product.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close product details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {/* Product image */}
          <div className="bg-gray-50 rounded-2xl flex items-center justify-center mb-5" style={{ aspectRatio: '4/3' }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-6"
            />
          </div>

          <h2 className="font-black text-xl text-gray-900 leading-tight mb-1">{product.name}</h2>
          <p className="text-xs text-gray-400 mb-2">{product.category}</p>
          <p className="text-lg font-black text-red-600 mb-4">{product.priceLabel}</p>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{product.description}</p>

          {/* Size selector */}
          {product.sizes && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <label className="font-black text-sm text-gray-900">Select Size</label>
                <span className="text-xs text-gray-400">Contact shop for size guide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <SizeChip
                    key={s}
                    size={s}
                    selected={size === s}
                    onClick={() => { setSize(s); setSizeError(false); }}
                  />
                ))}
              </div>
              {sizeError && (
                <div className="flex items-center gap-1.5 mt-2 text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <p className="text-xs font-bold">Please select a size.</p>
                </div>
              )}
            </div>
          )}

          {/* Qty */}
          <div className="mb-6">
            <label className="font-black text-sm text-gray-900 block mb-3">Quantity</label>
            <QtySelector qty={qty} onChange={setQty} />
          </div>

          {/* Delivery info */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">Choose collection or delivery at checkout.</p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">100% official TS Galaxy FC merchandise.</p>
            </div>
          </div>
        </div>

        {/* Sticky actions */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 text-white font-black text-sm py-3.5 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            Add to Cart
          </button>
          <a
            href={whatsAppLink(product, size || undefined, qty)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-gray-500 font-bold text-xs py-2.5 rounded-xl hover:text-gray-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Need help? WhatsApp the shop
          </a>
        </div>
      </div>
    </>
  );
}

// ─── ShopPage ─────────────────────────────────────────────────────────────────

export function ShopPage() {
  const navigate = useNavigate();
  const { id: paramSlug } = useParams<{ id?: string }>();

  const { addItem, itemCount } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [drawerProduct,  setDrawerProduct]  = useState<Product | null>(
    paramSlug ? (PRODUCTS.find(p => p.slug === paramSlug) ?? null) : null
  );

  const filteredProducts = useMemo(() =>
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const featuredProduct = PRODUCTS.find(p => p.featured) ?? PRODUCTS[0];

  function openProduct(p: Product) {
    setDrawerProduct(p);
    navigate(`/shop/${p.slug}`, { replace: true });
  }

  function closeProduct() {
    setDrawerProduct(null);
    navigate('/shop', { replace: true });
  }

  function addToCart(product: Product, size?: string, qty = 1) {
    addItem({
      productId:    product.id,
      slug:         product.slug,
      name:         product.name,
      image:        product.image,
      price:        product.price ?? 0,
      priceLabel:   product.priceLabel,
      selectedSize: size,
      quantity:     qty,
      lineTotal:    (product.price ?? 0) * qty,
    });
    setDrawerProduct(null);
    navigate('/checkout');
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          § 1  HERO
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="TS Galaxy FC Official Shop"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={QUEENS_IMAGES.matchAction01} alt="" className="w-full h-full object-cover object-[center_20%]" />
          <div className="absolute inset-0 bg-gray-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
        <img src={LOGO.favicon.png256} alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 lg:w-80 lg:h-80 opacity-[0.05] pointer-events-none select-none" />

        <div className="container mx-auto px-4 lg:px-6 py-10 lg:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">

            {/* Left: copy */}
            <div className="flex-1 min-w-0 pb-8 lg:pb-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" aria-hidden="true" />
                <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">Official Shop</span>
              </div>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-3">
                <span className="block">Wear</span>
                <span className="block text-red-400">The Rockets.</span>
              </h1>

              <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 max-w-lg">
                Shop official TS Galaxy FC merchandise, kits and supporter wear. Secure checkout — all items are authentic club products.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { setActiveCategory('Jerseys'); document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
                >
                  Shop Jerseys
                </button>
                <a
                  href="https://wa.me/27137500060?text=Hi%20TS%20Galaxy%20FC%20Shop!%20I%27d%20like%20to%20enquire%20about%20your%20merchandise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Need help? WhatsApp
                </a>
              </div>
            </div>

            {/* Right: featured product card — desktop */}
            <div className="hidden lg:block w-[280px] xl:w-[300px] flex-shrink-0">
              <div
                className="bg-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => openProduct(featuredProduct)}
              >
                <div className="relative bg-gray-50 p-6" style={{ aspectRatio: '1/1' }}>
                  <img src={featuredProduct.image} alt={featuredProduct.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Official Kit
                  </span>
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                </div>
                <div className="px-4 py-3 bg-white border-t border-gray-100">
                  <p className="font-black text-xs text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">{featuredProduct.name}</p>
                  <p className="text-xs text-red-600 font-bold mt-0.5">{featuredProduct.priceLabel}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 2  TRUST STRIP
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 text-white" aria-label="Official merchandise trust">
        <div className="container mx-auto px-4 lg:px-6 py-3">
          <div className="flex gap-6 overflow-x-auto py-1" style={{ scrollbarWidth: 'none' }}>
            {[
              { Icon: ShieldCheck,    label: 'Official Club Merchandise' },
              { Icon: ShieldCheck,    label: 'Secure Checkout'           },
              { Icon: Users,          label: 'Sizing Support Available'  },
              { Icon: Truck,          label: 'Collection & Delivery'     },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-bold text-gray-300 whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 3  FEATURED KIT PANEL
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-10" aria-labelledby="featured-product-heading">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image */}
            <div className="bg-gray-50 flex items-center justify-center p-8 lg:p-12 relative" style={{ minHeight: '320px' }}>
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full max-w-[280px] lg:max-w-[340px] object-contain"
              />
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                Official Kit
              </span>
              <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-black px-2.5 py-1 rounded-full">
                NEW 2025/26
              </span>
            </div>

            {/* Info */}
            <div className="p-6 lg:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Featured Product</span>
              </div>

              <h2 id="featured-product-heading" className="font-black text-2xl lg:text-3xl text-gray-900 leading-tight mb-2">
                {featuredProduct.name}
              </h2>

              <p className="text-xl font-black text-red-600 mb-3">{featuredProduct.priceLabel}</p>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">{featuredProduct.description}</p>

              <ul className="space-y-1.5 mb-5 text-sm text-gray-600">
                {['Official TS Galaxy FC merchandise', 'High-quality breathable fabric', 'Embroidered club crest', 'Available in all sizes'].map(point => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Sizes */}
              {featuredProduct.sizes && (
                <div className="mb-5">
                  <p className="font-black text-xs text-gray-700 mb-2">Sizes Available</p>
                  <div className="flex flex-wrap gap-2">
                    {featuredProduct.sizes.map(s => (
                      <span key={s} className="min-w-[40px] h-9 px-3 flex items-center justify-center border border-gray-200 rounded-xl text-xs font-bold text-gray-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  onClick={() => openProduct(featuredProduct)}
                  className="flex-1 bg-red-600 text-white font-black text-sm py-3.5 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  View & Add to Cart
                </button>
                <a
                  href={whatsAppLink(featuredProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 text-gray-700 font-bold text-sm py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Need help? WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 4  CATEGORY CHIPS  (sticky)
          ══════════════════════════════════════════════════════════════ */}
      <div
        id="product-grid"
        className="sticky top-16 lg:top-[73px] z-40 bg-white border-b border-gray-100 shadow-sm"
        role="navigation"
        aria-label="Product categories"
      >
        <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-0.5 flex-1" style={{ scrollbarWidth: 'none' }}>
            {CATEGORY_FILTERS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                aria-pressed={activeCategory === id}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                  activeCategory === id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
                {id !== 'all' && (
                  <span className="ml-1 text-[10px] opacity-60">
                    ({PRODUCTS.filter(p => p.category === id).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Cart badge — desktop */}
          {itemCount > 0 && (
            <button
              onClick={() => navigate('/checkout')}
              className="hidden lg:flex flex-shrink-0 items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-black text-xs hover:bg-red-700 transition-colors"
              aria-label={`Go to cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              Cart ({itemCount})
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          § 5  PRODUCT GRID
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-10"
        aria-labelledby="shop-grid-heading"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 id="shop-grid-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight">
            {activeCategory === 'all' ? 'All Products' : activeCategory}
            <span className="ml-2 text-sm font-bold text-gray-400">({filteredProducts.length})</span>
          </h2>
          {activeCategory !== 'all' && (
            <button onClick={() => setActiveCategory('all')} className="text-xs font-bold text-red-600 hover:underline">
              View all
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onView={openProduct} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 6  DELIVERY / COLLECTION INFO
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="delivery-heading">
        <h2 id="delivery-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-5">
          Ordering Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              Icon: ShieldCheck,
              title: 'Official Merchandise',
              body: 'Every item is authentic TS Galaxy FC merchandise. Buying from the official shop directly supports the club.',
            },
            {
              Icon: Truck,
              title: 'Collection & Delivery',
              body: 'Choose collection or delivery when you checkout. Delivery options and fees are confirmed at checkout.',
            },
            {
              Icon: ShieldCheck,
              title: 'Secure Checkout',
              body: 'Your payment is processed securely via a hosted payment provider. No card details are stored by the club.',
            },
            {
              Icon: MessageCircle,
              title: 'WhatsApp Support',
              body: 'Have a question before ordering? WhatsApp the shop team and they will assist with your query.',
            },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-red-600" aria-hidden="true" />
              </div>
              <h3 className="font-black text-sm text-gray-900 mb-2">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 7  RELATED CLUB LINKS
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="related-links-heading">
        <h2 id="related-links-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-5">
          More from TS Galaxy FC
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Fixtures',   sub: 'Wear your colours on matchday.',   path: '/fixtures',   Icon: Calendar  },
            { label: 'Membership', sub: 'Get closer to The Rockets.',        path: '/membership', Icon: Users     },
            { label: 'News',       sub: 'Follow latest club updates.',       path: '/news',       Icon: Newspaper },
            { label: 'Tickets',    sub: 'Secure your seat at Mbombela.',     path: '/fixtures',   Icon: Ticket    },
          ].map(({ label, sub, path, Icon }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="group bg-white rounded-2xl border border-gray-100 p-5 text-left shadow-sm hover:shadow-md hover:border-red-100 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center mb-3 group-hover:bg-red-600 transition-colors">
                <Icon className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <p className="font-black text-sm text-gray-900 group-hover:text-red-600 transition-colors mb-1 flex items-center gap-1">
                {label}
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </p>
              <p className="text-xs text-gray-500 leading-snug">{sub}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 8  FINAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-14 mb-16 lg:mt-16 lg:mb-20">
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-2xl overflow-hidden text-white p-8 lg:p-12 text-center shadow-xl">
          <div className="absolute inset-0 opacity-[0.04]" style={STRIPE_BG} aria-hidden="true" />
          <img src={LOGO.favicon.png256} alt="" aria-hidden="true"
            className="absolute right-4 bottom-0 w-32 h-32 lg:w-48 lg:h-48 opacity-[0.06] pointer-events-none select-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="font-black text-2xl lg:text-3xl mb-3 leading-tight">
              Back The Rockets in official colours.
            </h2>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-7">
              Explore official TS Galaxy FC merchandise and support the club on matchday.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => navigate('/fixtures')}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
              >
                View Fixtures
              </button>
              <button
                onClick={() => navigate('/membership')}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
              >
                Join Membership
              </button>
              <a
                href="https://wa.me/27137500060?text=Hi%20TS%20Galaxy%20FC%20Shop!%20I%27d%20like%20to%20browse%20your%20merchandise."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp Shop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STICKY CART BAG  (mobile — when items in cart)
          ══════════════════════════════════════════════════════════════ */}
      {itemCount > 0 && !drawerProduct && (
        <div className="lg:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom)+8px)] left-0 right-0 z-40 px-4">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-red-600 text-white font-black text-sm py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2"
            aria-label={`Go to cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            View Cart ({itemCount})
          </button>
        </div>
      )}

      {/* ── Product drawer ── */}
      {drawerProduct && (
        <ProductDrawer
          product={drawerProduct}
          onClose={closeProduct}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
}

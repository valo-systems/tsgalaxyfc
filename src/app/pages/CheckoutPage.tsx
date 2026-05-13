/**
 * TS Galaxy FC Shop — Checkout Flow
 * Steps: Cart Review → Customer Details → Delivery/Collection → Payment → Confirmation
 *
 * Payment rule: no raw card data is collected or stored in this application.
 * The payment step calls createPaymentSession() which is a safe abstraction —
 * replace its body with a real provider redirect/SDK when configured.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight, ChevronLeft, X, Minus, Plus,
  ShoppingBag, User, Truck, ShieldCheck, CheckCircle,
  CreditCard, AlertCircle, Loader2, Package, Home,
  MapPin, MessageCircle, ArrowRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createPaymentSession } from '@/services/payment';
import { LOGO } from '@/lib/assets';
import type { CustomerDetails, Fulfilment, Order, CartItem } from '@/lib/cart-types';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Step = 'cart' | 'details' | 'delivery' | 'payment' | 'confirmation';

const STEPS: { id: Step; label: string }[] = [
  { id: 'cart',         label: 'Cart'     },
  { id: 'details',      label: 'Details'  },
  { id: 'delivery',     label: 'Delivery' },
  { id: 'payment',      label: 'Payment'  },
  { id: 'confirmation', label: 'Done'     },
];

const SA_PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
  'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape',
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatRand(cents: number) {
  return `R${cents.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
}

function generateOrderNumber() {
  const d = new Date();
  return `TSG-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// ─── Shared sub-components ─────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const currentIdx = STEPS.findIndex(s => s.id === current);
  return (
    <nav aria-label="Checkout progress" className="flex items-center gap-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      {STEPS.filter(s => s.id !== 'confirmation').map((step, idx) => {
        const done    = idx < currentIdx;
        const active  = step.id === current;
        return (
          <div key={step.id} className="flex items-center flex-shrink-0">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-black transition-all ${
              active ? 'bg-red-600 text-white' : done ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400'
            }`}>
              {done
                ? <CheckCircle className="w-3 h-3" aria-hidden="true" />
                : <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-black leading-none
                    border-current">{idx + 1}</span>
              }
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {idx < STEPS.filter(s => s.id !== 'confirmation').length - 1 && (
              <div className={`w-4 h-px mx-0.5 ${done ? 'bg-emerald-300' : 'bg-gray-200'}`} aria-hidden="true" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

function CartItemRow({
  item,
  onRemove,
  onQty,
  readonly,
}: {
  item: CartItem;
  onRemove?: () => void;
  onQty?: (q: number) => void;
  readonly?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-black text-sm text-gray-900 leading-tight mb-0.5 line-clamp-2">{item.name}</p>
        {item.selectedSize && (
          <p className="text-[11px] text-gray-400 mb-1">Size: {item.selectedSize}</p>
        )}
        <p className="text-sm font-black text-red-600">{formatRand(item.lineTotal)}</p>
      </div>
      {!readonly && onQty && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => onQty(item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-black w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => onQty(item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      )}
      {!readonly && onRemove && (
        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
          aria-label={`Remove ${item.name} from cart`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
      {readonly && (
        <p className="text-xs text-gray-400 flex-shrink-0">×{item.quantity}</p>
      )}
    </div>
  );
}

function OrderSummary({
  items,
  subtotal,
  deliveryFee,
  compact,
}: {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number | null;
  compact?: boolean;
}) {
  const total = subtotal + (deliveryFee ?? 0);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {!compact && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-black text-sm text-gray-900">Order Summary</h3>
        </div>
      )}
      <div className="px-5">
        {!compact && items.map(item => (
          <CartItemRow key={`${item.productId}::${item.selectedSize}`} item={item} readonly />
        ))}
      </div>
      <div className="px-5 py-4 border-t border-gray-100 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''})</span>
          <span className="font-bold">{formatRand(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Delivery</span>
          <span>{deliveryFee === null ? 'To be confirmed' : deliveryFee === 0 ? 'Free' : formatRand(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-red-600">{formatRand(total)}</span>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Delivery and collection details will be confirmed by the club shop team.
        </p>
      </div>
    </div>
  );
}

// ─── STEP 1: CART REVIEW ───────────────────────────────────────────────────────

function CartStep({
  onNext,
  onShop,
}: {
  onNext: () => void;
  onShop: () => void;
}) {
  const { items, subtotal, removeItem, updateQuantity, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-300" aria-hidden="true" />
        </div>
        <h2 className="font-black text-xl text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-xs">Browse the official shop and add some items to get started.</p>
        <button
          onClick={onShop}
          className="bg-red-600 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-gray-100">
        {items.map(item => (
          <CartItemRow
            key={`${item.productId}::${item.selectedSize}`}
            item={item}
            onRemove={() => removeItem(item.productId, item.selectedSize)}
            onQty={(q) => updateQuantity(item.productId, item.selectedSize, q)}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">{formatRand(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Delivery</span>
          <span>Calculated at next step</span>
        </div>
        <div className="flex justify-between text-base font-black pt-2 border-t border-gray-100">
          <span>Estimated Total</span>
          <span className="text-red-600">{formatRand(subtotal)}</span>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full bg-red-600 text-white font-black text-sm py-4 rounded-xl hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
      >
        Continue to Details <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── STEP 2: CUSTOMER DETAILS ──────────────────────────────────────────────────

const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: '', lastName: '', email: '', phone: '', alternatePhone: '',
};

function DetailsStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: CustomerDetails;
  onChange: (d: CustomerDetails) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  function validate() {
    const e: typeof errors = {};
    if (!value.firstName.trim()) e.firstName = 'First name is required';
    if (!value.lastName.trim())  e.lastName  = 'Last name is required';
    if (!value.email.trim())     e.email     = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) e.email = 'Enter a valid email address';
    if (!value.phone.trim())     e.phone     = 'Phone number is required';
    return e;
  }

  function handleNext() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext();
  }

  function field(id: keyof CustomerDetails, label: string, type = 'text', required = true) {
    return (
      <div>
        <label htmlFor={`cd-${id}`} className="block text-xs font-black text-gray-700 mb-1.5">
          {label}{required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
        <input
          id={`cd-${id}`}
          type={type}
          autoComplete={id === 'email' ? 'email' : id === 'phone' ? 'tel' : 'given-name'}
          value={value[id] ?? ''}
          onChange={e => { onChange({ ...value, [id]: e.target.value }); setErrors(prev => ({ ...prev, [id]: '' })); }}
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors ${
            errors[id] ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
          aria-describedby={errors[id] ? `cd-${id}-err` : undefined}
          aria-invalid={!!errors[id]}
          required={required}
        />
        {errors[id] && (
          <p id={`cd-${id}-err`} role="alert" className="flex items-center gap-1 mt-1 text-[11px] text-red-600">
            <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {errors[id]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('firstName', 'First Name')}
          {field('lastName',  'Last Name')}
        </div>
        {field('email', 'Email Address', 'email')}
        {field('phone', 'Phone Number', 'tel')}
        {field('alternatePhone', 'Alternate Phone (optional)', 'tel', false)}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Back to cart"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-red-600 text-white font-black text-sm py-3 rounded-xl hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
        >
          Continue to Delivery <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── STEP 3: DELIVERY / COLLECTION ────────────────────────────────────────────

const EMPTY_FULFILMENT: Fulfilment = {
  type: 'collection',
  address: { street: '', suburb: '', city: '', province: '', postalCode: '' },
  notes: '',
};

function DeliveryStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: Fulfilment;
  onChange: (f: Fulfilment) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (value.type === 'delivery') {
      const a = value.address!;
      if (!a.street.trim())     e.street     = 'Street address is required';
      if (!a.suburb.trim())     e.suburb     = 'Suburb is required';
      if (!a.city.trim())       e.city       = 'City is required';
      if (!a.province.trim())   e.province   = 'Province is required';
      if (!a.postalCode.trim()) e.postalCode = 'Postal code is required';
    }
    return e;
  }

  function handleNext() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext();
  }

  function addrField(id: keyof NonNullable<Fulfilment['address']>, label: string, required = true) {
    const val = value.address?.[id] ?? '';
    return (
      <div>
        <label htmlFor={`addr-${id}`} className="block text-xs font-black text-gray-700 mb-1.5">
          {label}{required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
        <input
          id={`addr-${id}`}
          type="text"
          value={val}
          onChange={e => {
            onChange({ ...value, address: { ...value.address!, [id]: e.target.value } });
            setErrors(prev => ({ ...prev, [id]: '' }));
          }}
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors ${
            errors[id] ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
          aria-invalid={!!errors[id]}
          aria-describedby={errors[id] ? `addr-${id}-err` : undefined}
        />
        {errors[id] && (
          <p id={`addr-${id}-err`} role="alert" className="flex items-center gap-1 mt-1 text-[11px] text-red-600">
            <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {errors[id]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Type selector */}
      <div className="flex gap-3 mb-6" role="group" aria-label="Fulfilment method">
        {([
          { id: 'collection' as const, label: 'Collection', Icon: Package },
          { id: 'delivery'   as const, label: 'Delivery',   Icon: Truck   },
        ]).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange({ ...value, type: id })}
            aria-pressed={value.type === id}
            className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 text-sm font-black transition-all ${
              value.type === id ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {/* Collection info */}
      {value.type === 'collection' && (
        <div className="bg-gray-50 rounded-2xl p-5 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black text-sm text-gray-900 mb-1">Collection point</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Collection location will be confirmed by the TS Galaxy FC shop team when your order is processed.
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="col-notes" className="block text-xs font-black text-gray-700 mb-1.5">
              Notes (optional)
            </label>
            <textarea
              id="col-notes"
              rows={2}
              value={value.notes ?? ''}
              onChange={e => onChange({ ...value, notes: e.target.value })}
              placeholder="Any collection preferences or questions…"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors resize-none"
            />
          </div>
        </div>
      )}

      {/* Delivery address fields */}
      {value.type === 'delivery' && (
        <div className="space-y-4 mb-4">
          {addrField('street', 'Street Address')}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addrField('suburb', 'Suburb')}
            {addrField('city',   'City')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="addr-province" className="block text-xs font-black text-gray-700 mb-1.5">
                Province<span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </label>
              <select
                id="addr-province"
                value={value.address?.province ?? ''}
                onChange={e => {
                  onChange({ ...value, address: { ...value.address!, province: e.target.value } });
                  setErrors(prev => ({ ...prev, province: '' }));
                }}
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors ${
                  errors.province ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
                aria-invalid={!!errors.province}
              >
                <option value="">Select province</option>
                {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.province && (
                <p role="alert" className="flex items-center gap-1 mt-1 text-[11px] text-red-600">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.province}
                </p>
              )}
            </div>
            {addrField('postalCode', 'Postal Code')}
          </div>
          <div>
            <label htmlFor="del-notes" className="block text-xs font-black text-gray-700 mb-1.5">
              Delivery Notes (optional)
            </label>
            <textarea
              id="del-notes"
              rows={2}
              value={value.notes ?? ''}
              onChange={e => onChange({ ...value, notes: e.target.value })}
              placeholder="Special delivery instructions…"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors resize-none"
            />
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-400 leading-relaxed mb-5">
        Delivery and collection details will be confirmed by the club shop team where required.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Back to customer details"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-red-600 text-white font-black text-sm py-3 rounded-xl hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
        >
          Continue to Payment <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── STEP 4: PAYMENT ──────────────────────────────────────────────────────────

function PaymentStep({
  total,
  onPay,
  onBack,
  paying,
}: {
  total: number;
  onPay: (method: 'card' | 'eft') => void;
  onBack: () => void;
  paying: boolean;
}) {
  const [method, setMethod] = useState<'card' | 'eft'>('card');

  return (
    <div>
      {/* Payment method selector */}
      <div className="space-y-3 mb-6" role="group" aria-label="Payment method">
        {/* Card */}
        <button
          type="button"
          onClick={() => setMethod('card')}
          aria-pressed={method === 'card'}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
            method === 'card' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${method === 'card' ? 'bg-red-600' : 'bg-gray-100'}`}>
            <CreditCard className={`w-5 h-5 ${method === 'card' ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-black text-sm text-gray-900">Card Payment</p>
            <p className="text-xs text-gray-500">Secure payment via payment provider</p>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${method === 'card' ? 'border-red-600 bg-red-600' : 'border-gray-300'}`} aria-hidden="true">
            {method === 'card' && <div className="w-full h-full rounded-full bg-white scale-50 block" />}
          </div>
        </button>

        {/* EFT */}
        <button
          type="button"
          onClick={() => setMethod('eft')}
          aria-pressed={method === 'eft'}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
            method === 'eft' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${method === 'eft' ? 'bg-red-600' : 'bg-gray-100'}`}>
            <Home className={`w-5 h-5 ${method === 'eft' ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-black text-sm text-gray-900">EFT / Bank Transfer</p>
            <p className="text-xs text-gray-500">Banking details confirmed after order</p>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${method === 'eft' ? 'border-red-600 bg-red-600' : 'border-gray-300'}`} aria-hidden="true">
            {method === 'eft' && <div className="w-full h-full rounded-full bg-white scale-50 block" />}
          </div>
        </button>
      </div>

      {/* Security notice — replaces raw card fields */}
      {method === 'card' && (
        <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-100">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-black text-sm text-gray-900 mb-1">Secure payment provider</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Card payment is handled entirely by a compliant payment provider.
                No card details are entered on this site. You will be redirected
                to the secure payment page when you click <strong>Pay Securely</strong>.
              </p>
              {/* ── INTEGRATION POINT ───────────────────────────────────────
                  Replace the mock button action in onPay() with a real
                  provider redirect. The secure hosted payment fields / iFrame
                  from your chosen provider (PayFast, Yoco, Peach, etc.) should
                  load here or as a redirect when the button is clicked.
                  ─────────────────────────────────────────────────────────── */}
              <p className="text-[10px] text-amber-600 font-bold mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                Demo mode — payment gateway not yet configured
              </p>
            </div>
          </div>
        </div>
      )}

      {method === 'eft' && (
        <div className="bg-blue-50 rounded-2xl p-5 mb-5 border border-blue-100">
          <p className="font-black text-sm text-gray-900 mb-1">EFT instructions</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Banking details will be provided in your order confirmation. Your order
            will be held for <strong>48 hours</strong> pending proof of payment.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Total to pay</span>
        <span className="font-black text-xl text-red-600">{formatRand(total)}</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={paying}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
          aria-label="Back to delivery"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>
        <button
          onClick={() => onPay(method)}
          disabled={paying}
          className="flex-1 bg-red-600 text-white font-black text-sm py-3.5 rounded-xl hover:bg-red-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
          aria-live="polite"
        >
          {paying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Processing…
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              {method === 'card' ? 'Pay Securely' : 'Place Order'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── STEP 5: CONFIRMATION ──────────────────────────────────────────────────────

function ConfirmationStep({
  order,
  onShop,
  onFixtures,
}: {
  order: Order;
  onShop: () => void;
  onFixtures: () => void;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-5">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-emerald-500" aria-hidden="true" />
        </div>
      </div>

      <h2 className="font-black text-2xl text-gray-900 mb-2">Order received!</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
        Thank you, {order.customer.firstName}. The TS Galaxy FC shop team will confirm fulfilment details.
      </p>

      {/* Order reference */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-5 text-left">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">Order Number</p>
            <p className="font-black text-gray-900">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">Payment Ref</p>
            <p className="font-black text-gray-900 text-xs truncate">{order.payment.reference ?? '—'}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">Customer</p>
            <p className="font-bold text-gray-700 text-xs">{order.customer.firstName} {order.customer.lastName}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">Total</p>
            <p className="font-black text-red-600">{formatRand(order.total)}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">Fulfilment</p>
            <p className="font-bold text-gray-700 text-xs capitalize">{order.fulfilment.type}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-0.5">Items</p>
            <p className="font-bold text-gray-700 text-xs">{order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Items summary */}
      <div className="bg-white rounded-2xl border border-gray-100 mb-5 text-left overflow-hidden">
        {order.items.map(item => (
          <CartItemRow key={`${item.productId}::${item.selectedSize}`} item={item} readonly />
        ))}
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left">
        <p className="text-xs text-blue-700 leading-relaxed">
          A confirmation has been noted. The TS Galaxy FC shop team will be in touch at{' '}
          <strong>{order.customer.email}</strong> to confirm fulfilment, sizing and any delivery details.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onShop}
          className="bg-red-600 text-white px-7 py-3.5 rounded-xl font-black text-sm hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          Continue Shopping
        </button>
        <button
          onClick={onFixtures}
          className="bg-white text-gray-900 px-7 py-3.5 rounded-xl font-bold text-sm border border-gray-200 hover:border-red-300 transition-colors flex items-center justify-center gap-2"
        >
          View Fixtures <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* WhatsApp follow-up */}
      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-2">Need help with your order?</p>
        <a
          href="https://wa.me/27137500060?text=Hi%20TS%20Galaxy%20FC%20Shop!%20I%20have%20a%20question%20about%20my%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          WhatsApp the shop team
        </a>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, clearCart } = useCart();

  const [step,       setStep]       = useState<Step>('cart');
  const [customer,   setCustomer]   = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [fulfilment, setFulfilment] = useState<Fulfilment>(EMPTY_FULFILMENT);
  const [paying,     setPaying]     = useState(false);
  const [order,      setOrder]      = useState<Order | null>(null);

  // Redirect to shop if cart empty and not on confirmation
  useEffect(() => {
    if (itemCount === 0 && step !== 'confirmation') {
      // don't redirect — show empty cart state inside step instead
    }
  }, [itemCount, step]);

  const deliveryFee: number | null = null; // TBD by shop team
  const total = subtotal + (deliveryFee ?? 0);

  const stepIdx = STEPS.findIndex(s => s.id === step);

  async function handlePay(method: 'card' | 'eft') {
    setPaying(true);
    try {
      const orderNumber = generateOrderNumber();
      const partialOrder = {
        id: `order-${Date.now()}`,
        orderNumber,
        total,
        customer,
      };
      const result = await createPaymentSession(partialOrder);

      if (result.status === 'success') {
        const newOrder: Order = {
          id:          partialOrder.id,
          orderNumber,
          customer,
          fulfilment,
          items:       [...items],
          subtotal,
          deliveryFee,
          total,
          payment: {
            method,
            status:    'paid',
            reference: result.paymentReference,
          },
          status:    'created',
          createdAt: new Date().toISOString(),
        };
        setOrder(newOrder);
        clearCart();
        setStep('confirmation');
      }
    } finally {
      setPaying(false);
    }
  }

  const isCheckout = step !== 'cart' && step !== 'confirmation';

  return (
    <>
      {/* Header strip */}
      <div className="sticky top-16 lg:top-[73px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors flex-shrink-0"
            aria-label="Back to shop"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Shop</span>
          </button>

          <StepIndicator current={step} />

          {/* Cart count badge */}
          {step === 'cart' && itemCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-black text-gray-500 flex-shrink-0">
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              {itemCount}
            </span>
          )}
          {step !== 'cart' && <div className="w-10" aria-hidden="true" />}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-10">
        {step === 'confirmation' && order ? (
          // Confirmation: centred, no sidebar
          <div className="max-w-lg mx-auto">
            <ConfirmationStep
              order={order}
              onShop={() => navigate('/shop')}
              onFixtures={() => navigate('/fixtures')}
            />
          </div>
        ) : (
          // All other steps: 2-col on desktop
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start max-w-5xl mx-auto">

            {/* Left: step form */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6">

                {/* Step heading */}
                <div className="flex items-center gap-2 mb-6">
                  {step === 'cart'     && <ShoppingBag className="w-5 h-5 text-red-600" aria-hidden="true" />}
                  {step === 'details'  && <User         className="w-5 h-5 text-red-600" aria-hidden="true" />}
                  {step === 'delivery' && <Truck        className="w-5 h-5 text-red-600" aria-hidden="true" />}
                  {step === 'payment'  && <ShieldCheck  className="w-5 h-5 text-red-600" aria-hidden="true" />}
                  <h1 className="font-black text-lg text-gray-900">
                    {step === 'cart'     && 'Your Cart'}
                    {step === 'details'  && 'Customer Details'}
                    {step === 'delivery' && 'Delivery or Collection'}
                    {step === 'payment'  && 'Payment'}
                  </h1>
                </div>

                {step === 'cart' && (
                  <CartStep
                    onNext={() => setStep('details')}
                    onShop={() => navigate('/shop')}
                  />
                )}
                {step === 'details' && (
                  <DetailsStep
                    value={customer}
                    onChange={setCustomer}
                    onNext={() => setStep('delivery')}
                    onBack={() => setStep('cart')}
                  />
                )}
                {step === 'delivery' && (
                  <DeliveryStep
                    value={fulfilment}
                    onChange={setFulfilment}
                    onNext={() => setStep('payment')}
                    onBack={() => setStep('details')}
                  />
                )}
                {step === 'payment' && (
                  <PaymentStep
                    total={total}
                    onPay={handlePay}
                    onBack={() => setStep('delivery')}
                    paying={paying}
                  />
                )}

              </div>
            </div>

            {/* Right: sticky order summary */}
            {itemCount > 0 && (
              <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-[calc(73px+4rem+1rem)]">
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                />

                {/* Trust strip */}
                <div className="mt-4 bg-gray-50 rounded-2xl p-4 space-y-2.5">
                  {[
                    { Icon: ShieldCheck, text: 'Official TS Galaxy FC merchandise' },
                    { Icon: CreditCard,  text: 'Payment handled by secure provider' },
                    { Icon: Truck,       text: 'Delivery or collection confirmed by shop team' },
                    { Icon: MessageCircle, text: 'Need help? WhatsApp the shop' },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5 text-red-500 flex-shrink-0" aria-hidden="true" />
                      <p className="text-[11px] text-gray-500">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Mobile spacer for bottom nav */}
      <div className="h-6" aria-hidden="true" />
    </>
  );
}

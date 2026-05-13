/**
 * CartContext — provides global cart state and actions.
 * Cart is persisted to localStorage so a page refresh doesn't lose items.
 */

import {
  createContext, useContext, useReducer, useEffect,
  type ReactNode,
} from 'react';
import type { CartState, CartAction, CartItem } from '@/lib/cart-types';

// ─── Reducer ─────────────────────────────────────────────────────────────────

function cartKey(productId: string, selectedSize?: string) {
  return `${productId}::${selectedSize ?? ''}`;
}

function recalc(items: CartItem[]): CartState {
  const subtotal  = items.reduce((s, i) => s + i.lineTotal, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  return { items, subtotal, itemCount };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { payload } = action;
      const key   = cartKey(payload.productId, payload.selectedSize);
      const exist = state.items.find(i => cartKey(i.productId, i.selectedSize) === key);

      const items = exist
        ? state.items.map(i =>
            cartKey(i.productId, i.selectedSize) === key
              ? { ...i, quantity: i.quantity + payload.quantity, lineTotal: i.price * (i.quantity + payload.quantity) }
              : i
          )
        : [...state.items, { ...payload, lineTotal: payload.price * payload.quantity }];

      return recalc(items);
    }

    case 'REMOVE_ITEM': {
      const key   = cartKey(action.payload.productId, action.payload.selectedSize);
      const items = state.items.filter(i => cartKey(i.productId, i.selectedSize) !== key);
      return recalc(items);
    }

    case 'UPDATE_QUANTITY': {
      const { productId, selectedSize, quantity } = action.payload;
      const key = cartKey(productId, selectedSize);
      if (quantity <= 0) {
        return recalc(state.items.filter(i => cartKey(i.productId, i.selectedSize) !== key));
      }
      const items = state.items.map(i =>
        cartKey(i.productId, i.selectedSize) === key
          ? { ...i, quantity, lineTotal: i.price * quantity }
          : i
      );
      return recalc(items);
    }

    case 'CLEAR_CART':
      return { items: [], subtotal: 0, itemCount: 0 };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'tsg_cart_v1';

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {
    // ignore malformed storage
  }
  return { items: [], subtotal: 0, itemCount: 0 };
}

interface CartContextValue extends CartState {
  addItem:        (item: CartItem) => void;
  removeItem:     (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, selectedSize: string | undefined, quantity: number) => void;
  clearCart:      () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // Persist to localStorage on every state change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const value: CartContextValue = {
    ...state,
    addItem:        item    => dispatch({ type: 'ADD_ITEM',        payload: item }),
    removeItem:     (id, s) => dispatch({ type: 'REMOVE_ITEM',     payload: { productId: id, selectedSize: s } }),
    updateQuantity: (id, s, q) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, selectedSize: s, quantity: q } }),
    clearCart:      ()      => dispatch({ type: 'CLEAR_CART' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

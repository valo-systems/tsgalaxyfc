# Checkout & Cart

> How the cart works, how the checkout flow is structured, and how to wire up a real payment provider.

---

## Cart state

Cart state is managed globally with React Context + `useReducer` and persisted to `localStorage` under the key `tsg_cart_v1`.

```
src/context/CartContext.tsx   — CartProvider, useCart hook
src/lib/cart-types.ts         — CartItem, CartState, CartAction, Order interfaces
```

### Cart item key

Each cart line is keyed by `${productId}::${selectedSize}`. This allows the same product in different sizes (e.g. Home Kit S and Home Kit L) to be separate rows.

### Using the cart

```tsx
import { useCart } from '@/context/CartContext'

const { items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart } = useCart()

// Add an item
addItem({
  productId: product.id,
  slug:       product.slug,
  name:       product.name,
  image:      product.image,
  price:      product.price ?? 0,
  priceLabel: product.priceLabel,
  selectedSize: size,       // optional
  selectedColour: colour,   // optional
  quantity:   1,
  lineTotal:  product.price ?? 0,
})
```

### Cart persistence

The cart is persisted to `localStorage` via a `useEffect` that runs on every state change. On first load, `CartProvider` initialises from `localStorage` using the `loadCart()` lazy initialiser.

---

## Checkout steps

The checkout is a 5-step linear flow managed in `CheckoutPage.tsx`:

```
Step 1 — Cart review       Show all cart items, subtotal, empty state
Step 2 — Your details      firstName, lastName, email, phone (+ optional altPhone)
Step 3 — Delivery          Collection or delivery toggle; delivery shows full address form
Step 4 — Payment           Card (redirect) or EFT; no card fields in the app
Step 5 — Confirmation      Order reference, payment ref, summary
```

### State shape

```ts
interface CustomerDetails { firstName, lastName, email, phone, alternatePhone? }
interface DeliveryAddress { street, suburb, city, province, postalCode }
interface Fulfilment { type: 'delivery' | 'collection', address?: DeliveryAddress, notes? }
interface OrderPayment { method: 'card' | 'eft', status: 'pending'|'paid'|'failed', reference? }
interface Order {
  id, orderNumber, customer, fulfilment, items, subtotal,
  deliveryFee: number | null,  // null = "to be confirmed"
  total, payment, status, createdAt
}
```

---

## Payment integration

**The current implementation is a safe demo.** No card data is collected or stored anywhere in the app. The integration point is:

```
src/services/payment.ts → createPaymentSession(order)
```

The function currently simulates a 1.2 s network delay and returns a demo reference. **To go live**, replace the body of `createPaymentSession` with a real provider call:

### Recommended providers (South Africa)

| Provider | Docs |
|---|---|
| PayFast | https://developers.payfast.co.za |
| Peach Payments | https://developer.peachpayments.com |
| Yoco | https://developer.yoco.com |
| Ozow | https://ozow.com/developers |

### Integration pattern

```ts
export async function createPaymentSession(
  order: Pick<Order, 'id' | 'orderNumber' | 'total' | 'customer'>
): Promise<PaymentSessionResult> {
  // 1. POST order to your backend
  const res = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json' },
  })
  const { paymentUrl, reference } = await res.json()

  // 2. Redirect user to hosted payment page
  window.location.href = paymentUrl

  return { status: 'success', paymentReference: reference, redirectUrl: paymentUrl }
}
```

The real provider handles card collection on their own hosted page — raw card data never passes through this application.

---

## Delivery fees

`deliveryFee` is currently set to `null` on all orders, which renders as "To be confirmed" in the UI. To set a real delivery fee, calculate it in `CheckoutPage.tsx` when the user selects delivery in step 3 and pass it into the `Order` object before calling `createPaymentSession`.

---

## After successful payment

`CheckoutPage.tsx` calls `clearCart()` after a successful payment session, empties the cart context and localStorage, and advances to step 5 (confirmation). The order reference and payment reference are displayed to the user.

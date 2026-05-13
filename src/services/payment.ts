/**
 * Payment service abstraction for TS Galaxy FC shop.
 *
 * ──────────────────────────────────────────────────────────────────
 * IMPORTANT: This module is a safe placeholder.
 * - No card numbers, CVV or expiry details are stored or processed here.
 * - The real integration should redirect to or embed a hosted checkout
 *   page from a compliant payment provider (e.g. PayFast, Peach Payments,
 *   Yoco, Stripe, etc.).
 * - Replace `createPaymentSession` with the real provider's session/init
 *   call when integration is configured.
 * ──────────────────────────────────────────────────────────────────
 */

import type { Order } from '@/lib/cart-types';

export interface PaymentSessionResult {
  status:           'success' | 'failed';
  paymentReference: string;
  /** URL to redirect to for hosted checkout — populated by real provider */
  redirectUrl?:     string;
}

/**
 * Create a payment session for the given order.
 *
 * DEMO IMPLEMENTATION — simulates a successful hosted-checkout redirect.
 * Replace the body of this function with real provider SDK/API call.
 *
 * The real version should:
 *   1. POST order details to your backend.
 *   2. Backend creates a payment session with the provider.
 *   3. Return a redirect URL to the provider's hosted payment page.
 *   4. Never pass raw card data through this app.
 */
export async function createPaymentSession(
  order: Pick<Order, 'id' | 'orderNumber' | 'total' | 'customer'>,
): Promise<PaymentSessionResult> {
  // ── TODO: Replace with real payment provider integration ──────────
  // Example providers for South Africa:
  //   PayFast:         https://developers.payfast.co.za
  //   Peach Payments:  https://developer.peachpayments.com
  //   Yoco:            https://developer.yoco.com
  //   Ozow:            https://ozow.com/developers
  // ─────────────────────────────────────────────────────────────────

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Demo: always succeed
  return {
    status:           'success',
    paymentReference: `TSG-DEMO-${Date.now()}`,
    // redirectUrl would be the provider's hosted checkout URL in production
  };
}

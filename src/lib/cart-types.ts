// Cart and order types for the TS Galaxy FC shop checkout flow.
// Structured so a backend can be added without changing the frontend data shape.

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  productId:      string;
  slug:           string;
  name:           string;
  image:          string;
  price:          number;
  priceLabel:     string;
  selectedSize?:  string;
  selectedColour?: string;
  quantity:       number;
  lineTotal:      number;
}

export interface CartState {
  items:       CartItem[];
  subtotal:    number;
  itemCount:   number;
}

export type CartAction =
  | { type: 'ADD_ITEM';        payload: CartItem }
  | { type: 'REMOVE_ITEM';     payload: { productId: string; selectedSize?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; selectedSize?: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// ─── Order / Checkout ─────────────────────────────────────────────────────────

export interface CustomerDetails {
  firstName:       string;
  lastName:        string;
  email:           string;
  phone:           string;
  alternatePhone?: string;
}

export interface DeliveryAddress {
  street:     string;
  suburb:     string;
  city:       string;
  province:   string;
  postalCode: string;
}

export interface Fulfilment {
  type:     'delivery' | 'collection';
  address?: DeliveryAddress;
  notes?:   string;
}

export interface OrderPayment {
  method:     'card' | 'eft';
  status:     'pending' | 'paid' | 'failed';
  reference?: string;
}

export interface Order {
  id:          string;
  orderNumber: string;
  customer:    CustomerDetails;
  fulfilment:  Fulfilment;
  items:       CartItem[];
  subtotal:    number;
  deliveryFee: number | null;
  total:       number;
  payment:     OrderPayment;
  status:      'created' | 'paid' | 'processing' | 'completed';
  createdAt:   string;
}

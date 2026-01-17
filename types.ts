
export type Language = 'ru' | 'en' | 'uz';

export interface Product {
  id: string;
  name: Record<Language, string>;
  price: number;
  calories: number;
  image: string;
  category: string;
  description: Record<Language, string>;
  proteins?: number;
  fats?: number;
  carbs?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Card {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard' | 'mir';
  expiry: string;
  holderName: string;
  color: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: string[];
  status: 'delivered' | 'cancelled' | 'active';
  image: string;
}

export type PaymentMethod = 'card' | 'cash';

export interface Category {
  id: string;
  name: Record<Language, string>;
  icon: string;
}

export interface Promotion {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  code?: string;
  discountTag: string;
  expiryDate: Record<Language, string>;
  color: 'red' | 'orange' | 'green';
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  hours: string;
  status: 'open' | 'closed';
  distance: string;
  image: string;
  phone: string;
}

export type DeliveryType = 'delivery' | 'pickup';
export type TabType = 'home' | 'menu' | 'promo' | 'restaurants' | 'more' | 'cart' | 'checkout' | 'success' | 'location' | 'payment-manage' | 'profile-edit' | 'search-full' | 'loyalty';

export interface AppState {
  user: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    loyaltyPoints: number;
  };
  notifications: {
    orderStatus: boolean;
    deliveryUpdates: boolean;
    promotions: boolean;
  };
  location: string;
  deliveryType: DeliveryType;
  selectedCategory: string;
  cart: CartItem[];
  activeTab: TabType;
  selectedProductId: string | null;
  paymentMethod: PaymentMethod;
  deliveryTime: string;
  savedCards: Card[];
  selectedCardId: string | null;
  orders: Order[];
  language: Language;
}

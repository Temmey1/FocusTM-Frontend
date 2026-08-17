export interface Product {
  id: string; slug: string; name: string; description: string; price: number;
  images: string[]; category: "tops"|"shirts"|"caps"|"wears";
  sizes: string[]; colors: string[]; customizable: boolean; stock: number; featured?: boolean; createdAt?: string;
}
export interface CartItem {
  productId: string; name: string; image: string; price: number;
  size: string; color: string; quantity: number; customNote?: string;
}
export type DeliveryMethod = "delivery" | "pickup";
export interface DeliveryDetails {
  fullName: string; phone: string; email?: string; method: DeliveryMethod;
  state: string; city: string; address?: string; note?: string;
}
export type PaymentMethod = "whatsapp" | "monnify";
export interface Order {
  id: string; orderNumber?: string; items: CartItem[]; subtotal: number; deliveryFee: number; total: number;
  delivery: DeliveryDetails; paymentMethod: PaymentMethod;
  status: "pending"|"paid"|"processing"|"shipped"|"completed"|"cancelled";
  createdAt: string; userId?: string|null;
}
export interface DeliveryLocation {
  id: string; type: "delivery"|"pickup"; state: string; city?: string;
  address?: string; fee: number; active: boolean; note?: string;
}

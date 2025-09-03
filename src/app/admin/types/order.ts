export type OrderStatus =
  | "Completed"
  | "Pending"
  | "Rejected"
  | "Processing";

export type PaymentStatus = "Paid" | "Not paid";

export interface Order {
  id: string; // "#95647"
  date: string; // ISO string
  name: string;
  address: string;
  phone: string;     // <-- Added
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number; // in cents or unit (here we'll use raw dollars)
  time: string; // "01:25 AM"
}

export interface OrderDb {
  id: string;
  order_id: string;
  name: string;
  surname: string;
  street?: string;
  city: string;
  phone: string;
  email: string;
  total: number;
  status: string;
  paid: boolean;
  payment_date?: string;
  created_at: string;
  updated_at?: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface OrderItemPayload {
  product_id: string;
  quantity: number;
  price: number;
}

export interface OrderPayload {
  id?: string;
  name: string;
  surname: string;
  street?: string;
  city: string;
  phone: string;
  email: string;
  total: number;
  items?: OrderItemPayload[];
}
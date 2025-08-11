export type OrderStatus =
  | "Completed"
  | "Pending"
  | "Rejected"
  | "Processing";

export type PaymentStatus = "Paid" | "Not paid";

export interface Order {
  id: number;
  code: string; // "#95647"
  date: string; // ISO string
  name: string;
  address: string;
  phone: string;     // <-- Added
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number; // in cents or unit (here we'll use raw dollars)
  time: string; // "01:25 AM"
}

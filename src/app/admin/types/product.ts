// src/app/admin/types/product.ts

export type ProductStatus = "New" | "Old" | "Expired";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sale_price?: number | null;
  description: string;
  images: string[];
  status: ProductStatus;
  created_at?: string;
  updated_at?: string;
}

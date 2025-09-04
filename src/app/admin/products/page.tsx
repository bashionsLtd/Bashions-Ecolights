// src/app/admin/products/page.tsx
export const dynamic = 'force-dynamic';

import ProductTable from "../components/product/ProductTable";
import type { Product } from "../types/product";

async function getProducts(): Promise<Product[]> {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const res = await fetch(`${baseUrl}/api/products`, {
  method: "GET",
  cache: "no-store",
  headers: { accept: "application/json" },
});


  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-4">
      <ProductTable products={products} />
    </div>
  );
}

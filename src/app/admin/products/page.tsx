// src/app/admin/products/page.tsx
export const dynamic = 'force-dynamic';
import { supabaseClient as supabase } from "@/lib/utils/supabase/supabaseClient";


import ProductTable from "../components/product/ProductTable";
import type { Product } from "../types/product";

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw new Error(error.message);
  return data ?? [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-4">
      <ProductTable products={products} />
    </div>
  );
}

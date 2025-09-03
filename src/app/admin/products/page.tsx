import ProductTable from "../components/product/ProductTable";
import type { Product } from "../types/product";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    method: "GET",
    cache: "no-store", // always fetch fresh data (no caching)
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

"use client";

import FilterSidebar from "../components/pages/products/filterSidebar";
import ProductCard from "../components/shared/product";
import { useProducts } from "../hooks/useProducts";
import { useState, useEffect } from "react";

export default function ProductList() {
    const { products, isLoading, isError, error } = useProducts("/admin/api/products");
    const [filteredProducts, setFilteredProducts] = useState<typeof products>([]);

    // Sync filteredProducts when products change
   useEffect(() => {
  if (products && products.length > 0) {
      setFilteredProducts(prev => {
        // only update if different
        if (prev.length !== products.length) return products;
        return prev;
      });
    }
  }, [products]);

  if (isLoading) return <section className="p-8">Loading products...</section>;
  if (isError) return <section className="p-8 text-red-600">Error: {error?.message}</section>;

  return (
    <section className="mt-22 pr-4 w-full max-w-8xl mx-auto bg-slate-50">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          products={products}
          onFilterChange={setFilteredProducts}
        />
        <div className="flex-1 py-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              <span className="before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
                PRODUCTS
              </span>
            </h2>
            <p className="text-gray-500 italic mt-2">
              All Our Products Are Available At Your Request
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

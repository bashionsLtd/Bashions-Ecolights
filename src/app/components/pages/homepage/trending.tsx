"use client";

import ProductCard from "../../shared/product";
import { useProducts } from "../../../hooks/useProducts";

export const TrendingProducts = () => {
  const { products, isLoading, isError } = useProducts("/admin/api/products");
  const limitedProducts = products.slice(0, 4);

  if (isLoading) return <section className="px-4 py-16">Loading…</section>;
  if (isError) return <section className="px-4 py-16 text-red-600">Failed to load trending</section>;

  return (
    <section className="px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
          <span className="before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
            TRENDING
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">Top view in this week</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {limitedProducts.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
};

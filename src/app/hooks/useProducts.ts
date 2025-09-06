"use client";

import { useQuery } from "@tanstack/react-query";

interface ApiProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  sale_price: number | undefined;
  description: string;
  images: string[];
  status: string; // "New" | "Old" | "Expired"
}

export interface ProductCardProps {
  id: string;
  category: string;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  images: string[];
  badge?: { text: string; color: string } | undefined;
}

async function fetchProducts(apiUrl: string): Promise<ApiProduct[]> {
  const res = await fetch(apiUrl, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

function transformProducts(data: ApiProduct[]): ProductCardProps[] {
  return (
    data
      // ✅ Ignore expired
      .filter((p) => p.status !== "Expired")
      .map((p) => {
        let badge: { text: string; color: string } | undefined;

        if (p.sale_price) {
          const discount = Math.round(
            ((p.price - p.sale_price) / p.price) * 100
          );
          badge = { text: `-${discount}%`, color: "bg-orange-500" };
        } else if (p.status === "New") {
          badge = { text: "New", color: "bg-green-600" };
        }

        return {
          id: p.id,
          category: p.category,
          name: p.name,
          price: p.price,
          salePrice: p.sale_price ?? undefined,
          description: p.description,
          images: p.images,
          badge,
        };
      })
  );
}

export function useProducts(apiUrl: string) {
  const query = useQuery({
    queryKey: ["products", apiUrl],
    queryFn: () => fetchProducts(apiUrl).then(transformProducts),
    placeholderData: (prev) => prev,
  });

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

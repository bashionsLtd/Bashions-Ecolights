'use client';

import { useState } from "react";
import {ProductCardProps as Product} from "../../../hooks/useProducts";

interface FilterSidebarProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

const FilterSidebar = ({ products, onFilterChange }: FilterSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories and counts
  const categoryCounts = products.reduce((acc: Record<string, number>, product) => {
    const cat = product.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // Handle checkbox toggle
  const toggleCategory = (category: string) => {
    let updated: string[];
    if (selectedCategories.includes(category)) {
      updated = selectedCategories.filter(c => c !== category);
    } else {
      updated = [...selectedCategories, category];
    }
    setSelectedCategories(updated);

    // Filter products and send to parent
    if (updated.length === 0) {
      onFilterChange(products); // No filter
    } else {
      onFilterChange(products.filter(p => updated.includes(p.category)));
    }
  };

  return (
    <aside className="w-full bg-gradient-to-bl from-slate-700 via-slate-950 to-slate-800 md:w-64 p-6 space-y-12 text-white pt-30">
      <div className="border-b-2 border-gray-400 flex flex-col gap-4">
        <h3 className="font-bold text-2xl mb-2">Categories</h3>
        {Object.keys(categoryCounts).map((cat) => (
          <div key={cat} className="flex items-center space-x-2 pb-6">
            <input
              type="checkbox"
              id={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            <label htmlFor={cat}>{cat}</label>
            <span className="ml-auto text-gray-500 text-xs">{categoryCounts[cat]}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;

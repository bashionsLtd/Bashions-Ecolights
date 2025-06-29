'use client';

import FilterSidebar from '../components/pages/products/filterSidebar';
import ProductCard from '../components/shared/product';

const products = [
  {
    name: 'Asymmetric Neckline Top',
    price: 120,
    image: '/images/blb.jpg',
    rating: 5,
  },
  {
    name: 'Asymmetric Polyamide Top',
    price: 200,
    salePrice: 110,
    image: '/images/art.jpeg',
    rating: 4,
    badge: { text: '-45%', color: 'bg-orange-500' },
  },
  {
    name: 'Balloon Denim Mini Skirt',
    price: 110,
    image: '/images/bb.jpg',
    rating: 4,
  },
  {
      name: 'Analogue Resin Strap',
      price: 30,
      image: '/images/better.jpg',
      badge: { text: 'New', color: 'bg-green-600' },
      rating: 4
    },
    {
      name: 'Ridley High Waist',
      price: 36,
      image: '/images/art.jpeg',
      outOfStock: true,
      rating: 5
    },
    {
      name: 'Blush Beanie',
      price: 15,
      image: '/images/blb.jpg',
      rating: 3
    },
];

export default function ProductList() {
  return (
    <section className="mt-24 pr-4 py-8 w-full max-w-8xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide relative inline-block">
          <span className="before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
            PRODUCTS
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">All Our Products Are Available At Your Request</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">Showing 1-6 of 24 Results</p>
            <div>
              <label htmlFor="sort" className="text-sm mr-2">Sort by:</label>
              <select id="sort" className="text-sm border px-2 py-1">
                <option>Alphabetically, A-Z</option>
                <option>Price, Low to High</option>
                <option>Price, High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import FilterSidebar from '../components/pages/products/filterSidebar';
import ProductCard from '../components/shared/product';

const products = [
  {
    category: 'Wooden Lamps',
    name: 'Asymmetric Neckline Top',
    price: 120,
      description: 'mnhyfrsedxdfghgjhgh',
      images: ['/images/sofa.jpeg', '/images/bb.jpg'],
    rating: 5,
  },
  {
    category: 'Wooden Lamps',
    name: 'Asymmetric Polyamide Top',
    price: 200,
    salePrice: 110,
      description: 'mnhyfrsedxdfghgjhgh',
      images: ['/images/blb.jpg', '/images/bb2.jpg'],
    rating: 4,
    badge: { text: '-45%', color: 'bg-orange-500' },
  },
  {
    category: 'Wooden Lamps',
    name: 'Balloon Denim Mini Skirt',
    price: 110,
      description: 'mnhyfrsedxdfghgjhgh',
      images: ['/images/art.jpeg', '/images/bb2.jpg'],
    rating: 4,
  },
  {
      category: 'Wooden Lamps',
      name: 'Analogue Resin Strap',
      price: 30,
      description: 'mnhyfrsedxdfghgjhgh',
      images: ['/images/desin.jpeg', '/images/bb2.jpg'],
      badge: { text: 'New', color: 'bg-green-600' },
      rating: 4
    },
    {
      category: 'Wooden Lamps',
      name: 'Ridley High Waist',
      price: 36,
      description: 'mnhyfrsedxdfghgjhgh',
      images: ['/images/plates.jpg', '/images/bb2.jpg'],
      outOfStock: true,
      rating: 5
    },
    {
      category: 'Wooden Lamps',
      name: 'Blush Beanie',
      price: 15,
      description: 'mnhyfrsedxdfghgjhgh',
      images: ['/images/lightart.jpeg', '/images/better.jpg'],
      rating: 3
    },
];

export default function ProductList() {
  return (
    <section className="mt-22 pr-4 w-full max-w-8xl mx-auto bg-slate-50">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar />
        <div className="flex-1 py-8">
          <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
          <span className="before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
            PRODUCTS
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">All Our Products Are Available At Your Request</p>
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

'use client';

import Image from 'next/image';
import { FaChevronUp } from 'react-icons/fa';

interface Product {
  name: string;
  price: string;
  salePrice?: string;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
}

const products: Product[] = [
  {
    name: 'Analogue Resin Strap',
    price: '$30.00',
    image: '/images/better.jpg',
    badge: { text: 'New', color: 'bg-green-600' },
  },
  {
    name: 'Ridley High Waist',
    price: '$36.00',
    image: '/images/better.jpg',
  },
  {
    name: 'Blush Beanie',
    price: '$15.00',
    image: '/images/better.jpg',
  },
  {
    name: 'Cluse La Boheme Rose Gold',
    price: '$60.00',
    salePrice: '$45.00',
    image: '/images/better.jpg',
    badge: { text: '-25%', color: 'bg-orange-500' },
  },
];

const TrendingProducts = () => {
  return (
    <section className="px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide relative inline-block">
          <span className="before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-[1px] before:bg-black after:absolute after:top-1/2 after:-right-10 after:w-8 after:h-[1px] after:bg-black">
            TRENDING
          </span>
        </h2>
        <p className="text-gray-500 italic mt-2">Top view in this week</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, idx) => (
          <div key={idx} className="relative">
            <div className="relative aspect-[4/5] rounded overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              {product.badge && (
                <span className={`absolute top-4 right-4 text-white text-sm px-3 py-1 rounded-full ${product.badge.color}`}>
                  {product.badge.text}
                </span>
              )}
            </div>

            <h3 className="text-sm font-semibold mt-4">{product.name}</h3>
            <div className="mt-1 text-sm">
              {product.salePrice ? (
                <>
                  <span className="text-gray-500 line-through mr-2">
                    {product.price}
                  </span>
                  <span className="text-red-500 font-semibold">
                    {product.salePrice}
                  </span>
                </>
              ) : (
                <span className="text-gray-800">{product.price}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-12 h-12 rounded-md bg-white shadow-lg border hover:bg-gray-100 transition flex items-center justify-center">
          <FaChevronUp className="text-black" />
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;

import ProductCard from "../../shared/product";

export const TrendingProducts = () => {
  const products = [
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
    {
      name: 'Cluse La Boheme Rose Gold',
      price: 60,
      salePrice: 45,
      image: '/images/bb.jpg',
      badge: { text: '-25%', color: 'bg-orange-500' },
      rating: 1
    },
  ];

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
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
};

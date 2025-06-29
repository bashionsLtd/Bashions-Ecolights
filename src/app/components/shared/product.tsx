'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { addItem, toggleCart } from '@/redux/store/slices/cartSlice';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface ProductCardProps {
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
  outOfStock?: boolean;
  rating?: number; // New prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  salePrice,
  image,
  badge,
  outOfStock,
  rating = 4, // default rating is 4
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.name === name);

  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    if (!cartItem && !outOfStock) {
      setQuantity(1);
    }
  }, [cartItem, outOfStock]);

  const handleAddToCart = () => {
    dispatch(addItem({ name, price: salePrice || price, image, quantity }));
    dispatch(toggleCart());
  };

  return (
    <div className="relative group">
      <div className="relative aspect-[4/5] rounded overflow-hidden group-hover:opacity-90 transition">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
        {badge && (
          <span
            className={`absolute top-4 right-4 text-white text-sm px-3 py-1 rounded-full ${badge.color}`}
          >
            {badge.text}
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded">
            Out of Stock
          </span>
        )}

        <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md">
            Quick view
          </button>

          {!outOfStock && (
            <div className="flex items-center rounded-full overflow-hidden shadow-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-white text-black px-3 py-2"
              >
                <HiMinus />
              </button>
              <span className="bg-white px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-white text-black px-3 py-2"
              >
                <HiPlus />
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-sky-600 text-white px-6 py-2 text-sm font-semibold"
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-sm font-semibold mt-4">{name}</h3>

      {/* Rating Stars */}
      <div className="flex items-center mt-1 text-yellow-500 text-xs">
        {Array.from({ length: 5 }).map((_, idx) =>
          idx < rating ? <FaStar key={idx} /> : <FaRegStar key={idx} />
        )}
      </div>

      <div className="mt-1 text-sm">
        {salePrice ? (
          <>
            <span className="text-gray-500 line-through mr-2">${price.toFixed(2)}</span>
            <span className="text-red-500 font-semibold">${salePrice.toFixed(2)}</span>
          </>
        ) : (
          <span className="text-gray-800">${price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

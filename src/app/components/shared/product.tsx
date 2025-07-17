'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { addItem, toggleCart } from '@/redux/store/slices/cartSlice';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface ProductCardProps {
  category: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  description: string;
  badge?: {
    text: string;
    color: string;
  };
  outOfStock?: boolean;
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  category,
  name,
  price,
  salePrice,
  images,
  description,
  badge,
  outOfStock,
  rating = 4,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.name === name);

  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);
  const [showQuickView, setShowQuickView] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const mainImage = images[currentImageIdx] || '/placeholder.jpg';

  useEffect(() => {
    if (!cartItem && !outOfStock) {
      setQuantity(1);
    }
  }, [cartItem, outOfStock]);

  const handleAddToCart = () => {
    dispatch(addItem({ name, price: salePrice || price, image: mainImage, quantity }));
    dispatch(toggleCart());
  };

  return (
    <>
      {/* Product Card */}
      <div className="relative group">
        <div className="relative aspect-[4/5] rounded overflow-hidden group-hover:opacity-90 transition">
          <Image
            src={images[0]}
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
            <button
              onClick={() => {
                setShowQuickView(true);
                setCurrentImageIdx(0);
                setAgreed(false);
              }}
              className="bg-white text-black cursor-pointer px-6 py-2 rounded-full font-semibold shadow-md"
            >
              Quick view
            </button>

            {!outOfStock && (
              <div className="flex items-center rounded-full overflow-hidden shadow-md bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-black cursor-pointer px-3 py-2"
                >
                  <HiMinus />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-black cursor-pointer px-3 py-2"
                >
                  <HiPlus />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-sky-600 cursor-pointer text-white px-6 py-2 text-sm font-semibold"
                >
                  Add to cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-4 text-yellow-500 text-xs">
          {Array.from({ length: 5 }).map((_, idx) =>
            idx < rating ? <FaStar key={idx} /> : <FaRegStar key={idx} />
          )}
        </div>
        
        <h3 className="text-sm mt-1">{name}</h3>


        <div className="mt-1 text-sm">
          {salePrice ? (
            <>
              <span className="text-gray-500 line-through mr-2">
                ${price.toFixed(2)}
              </span>
              <span className="text-red-500 font-semibold">
                ${salePrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-gray-800">${price.toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row overflow-hidden relative">
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-80 sm:h-120">
              <Image src={mainImage} alt={name} fill className="object-cover" />

              {/* Prev & Next Controls */}
              {currentImageIdx > 0 && (
                <button
                  onClick={() => setCurrentImageIdx((i) => i - 1)}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full px-2 py-1 text-sm shadow"
                >
                  ◀
                </button>
              )}
              {currentImageIdx < images.length - 1 && (
                <button
                  onClick={() => setCurrentImageIdx((i) => i + 1)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full px-2 py-1 text-sm shadow"
                >
                  ▶
                </button>
              )}
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-between p-6 relative">
            <div>

              <button
                className="absolute top-4 right-4 text-xl cursor-pointer"
                onClick={() => setShowQuickView(false)}
              >
                ✕
              </button>

              <p className="text-sm text-sky-600 font-medium">{category}</p>
              <h2 className="text-2xl mt-3 font-semibold">{name}</h2>
              <div className='mt-3 flex items-center justify-between pr-8'>  
                <div className="text-xl font-bold">
                  ${salePrice?.toFixed(2) || price.toFixed(2)}
                </div>

                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, idx) =>
                    idx < rating ? <FaStar key={idx} /> : <FaRegStar key={idx} />
                  )}
                  <span className="ml-2 text-sm text-gray-500">1 Review</span>
                </div>
              </div>
            </div>

              <p className="text-gray-600 text-sm">{description}</p>

              <div className="flex flex-wrap gap-3">
                <div className="flex border rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2"
                  >
                    <HiMinus />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2"
                  >
                    <HiPlus />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-6 py-2 rounded-full font-medium"
                >
                  Add To Cart
                </button>
              </div>

              {/* Terms & Buy Now */}
              <div>
                <div className="text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    I agree with{' '}
                    <a href="#" className="underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>

                <button
                  disabled={!agreed}
                  className={`mt-5 w-full py-3 rounded-full text-lg font-medium transition ${
                    agreed ? 'bg-rose-500 text-white' : 'bg-rose-300 text-white cursor-not-allowed'
                  }`}
                >
                  Place Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;

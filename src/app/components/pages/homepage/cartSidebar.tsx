'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { toggleCart, removeItem, addItem } from '@/redux/store/slices/cartSlice';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => dispatch(toggleCart())}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your cart</h2>
          <button onClick={() => dispatch(toggleCart())}>
            <FaTimes />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => dispatch(removeItem(item.name))} className="px-2 py-1 border rounded">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(addItem(item))} className="px-2 py-1 border rounded">
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => dispatch(removeItem(item.name))} className="text-sm text-red-500">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Subtotal:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full py-2 text-white bg-gray-800 hover:bg-gray-700 rounded transition"
            onClick={() => alert('Proceed to checkout')}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

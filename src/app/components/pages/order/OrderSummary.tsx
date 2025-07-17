'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const OrderSummaryPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    street: '',
    city: '',
    phone: '',
    email: '',
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 3.99;
  const total = subtotal + delivery;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // TODO: Add form validation or submission logic
    console.log('Placing order for:', form);
    alert('Order placed!');
    router.push('/thank-you'); // Optional redirection
  };

  return (
    <div className="min-h-screen mt-22 bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Basic Information Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <span className="text-yellow-600 text-2xl">👤</span> Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Name:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInput}
                className="w-full mt-1 border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm">Surname:</label>
              <input
                type="text"
                name="surname"
                value={form.surname}
                onChange={handleInput}
                className="w-full mt-1 border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm">Street and number:</label>
              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleInput}
                className="w-full mt-1 border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm">City:</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInput}
                className="w-full mt-1 border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm">Phone number:</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInput}
                className="w-full mt-1 border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm">E-mail address:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                className="w-full mt-1 border p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <div className="bg-gray-800 text-white p-4 rounded-t">
            <h2 className="text-lg font-semibold">Your order</h2>
          </div>

          <div className="divide-y">
            {items.length === 0 ? (
              <p className="text-gray-500 p-4">Cart is empty</p>
            ) : (
              items.map((item, index) => (
                <div key={index} className="flex justify-between items-start p-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Order total:</span>
              <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery:</span>
              <span className="text-gray-800 font-semibold">${delivery.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 border-t pt-4 flex justify-between items-center text-xl font-semibold">
            <span>Total:</span>
            <span className="text-black">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;

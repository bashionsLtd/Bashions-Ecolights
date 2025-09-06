'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store/store';
import React, { useState } from 'react';
import { useCreateOrder } from '../../../hooks/useCreateOrder';
import { clearCart } from '@/redux/store/slices/cartSlice';
import { OrderPayload } from '@/app/admin/types/order';
import { toast } from 'sonner';

const OrderSummaryPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { mutate: createOrder, isPending, isError, error } = useCreateOrder();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    street: '',
    city: '',
    phone: '',
    email: '',
  });

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (items.length === 0) {
      toast.error('⚠️ Cart is empty');
      return false;
    }
    if (!form.name || !form.surname || !form.city || !form.phone || !form.email) {
      toast.error('⚠️ Please fill in all required fields');
      return false;
    }
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error('⚠️ Invalid phone number');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('⚠️ Invalid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = {
      ...form,
      total,
      items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    createOrder(payload, {
  onSuccess: async () => {
    dispatch(clearCart());
    toast.success("✅ Order placed successfully!");

    // Send confirmation email
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          surname: form.surname,
          items,
          total,
        }),
      });
    } catch (e) {
      console.error("Email sending failed", e);
    }
  },
  onError: (err) => {
    toast.error(`❌ ${(err as Error).message}`);
  },
});

  };

  return (
    <div className="min-h-screen w-11/12 mt-22 bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Basic Information Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <span className="text-orange-500 text-2xl">👤</span> Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(['name','surname','street','city','phone','email'] as const).map((field) => (
              <div key={field}>
                <label className="text-sm capitalize">{field}:</label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  value={(form as OrderPayload)[field]}
                  onChange={handleInput}
                  className="w-full mt-1 border p-2 rounded"
                />
              </div>
            ))}
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
                    Rwf{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 border-t pt-4 flex justify-between items-center text-xl font-semibold">
            <span>Total:</span>
            <span className="text-black">Rwf{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="mt-6 w-full py-2 text-white bg-orange-500 hover:bg-orange-500 rounded transition"
          >
            {isPending ? 'Placing Order...' : 'Confirm Order'}
          </button>

          {isError && <p className="text-red-600 mt-2">Error: {String(error?.message)}</p>}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;

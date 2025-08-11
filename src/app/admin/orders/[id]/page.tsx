'use client';

import { useParams } from 'next/navigation';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id;

  return (
    <main className="p-8">
      <h1 className="mt-22 text-2xl font-bold">Order Details - #{orderId}</h1>
      {/* Fetch and display order data here */}
    </main>
  );
}

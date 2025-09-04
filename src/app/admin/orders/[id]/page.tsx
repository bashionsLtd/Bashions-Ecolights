"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { OrderDb } from "../../types/order";
import { Product } from "../../types/product";
import DeleteButton from "../../components/DeleteButton";
import { toast } from "sonner";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "RWF",
});

function initials(name: string, surname?: string) {
  const a = (name?.[0] || "").toUpperCase();
  const b = (surname?.[0] || "").toUpperCase();
  const s = `${a}${b}`.trim();
  return s || "C"; // fallback
}

// ---------- Status / Payment Color Maps ----------
type OrderStatus = "Completed" | "Pending" | "Rejected" | "Processing";
type PaymentStatus = "Paid" | "Not paid";

const statusStyles: Record<OrderStatus, { bg: string; text: string }> = {
  Completed: { bg: "bg-green-100", text: "text-green-700" },
  Pending: { bg: "bg-sky-200", text: "text-blue-700" },
  Rejected: { bg: "bg-red-100", text: "text-red-700" },
  Processing: { bg: "bg-orange-100", text: "text-orange-700" },
};

const paymentDotColor: Record<PaymentStatus, { bg: string; text: string }> = {
  Paid: {bg:"bg-emerald-200", text: "text-green-800"},
  "Not paid": {bg:"bg-red-100", text: "text-red-600"},
};

// ---------- API ----------
async function fetchOrder(orderId: string): Promise<OrderDb> {
  const res = await fetch(`/api/orders/${orderId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

async function fetchProduct(productId: string): Promise<Product> {
  const res = await fetch(`/api/products/${productId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

async function updateOrder(
  orderId: string,
  updates: Partial<OrderDb>
): Promise<OrderDb> {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

// ---------- Component ----------
export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const orderId = decodeURIComponent(id);
  const [order, setOrder] = useState<OrderDb | null>(null);
  const [productsById, setProductsById] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editable fields state
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const o = await fetchOrder(orderId);
        if (cancelled) return;
        setOrder(o);
        setStatus(o.status);
        setPaid(o.paid ?? false);
        setPaymentDate(o.payment_date ? o.payment_date : "");

        // fetch unique products
        const ids = Array.from(new Set(o.order_items?.map((i) => i.product_id)));
        const entries = await Promise.all(
          ids.map(async (id) => {
            try {
              const p = await fetchProduct(id);
              return [id, p] as const;
            } catch {
              return [id, undefined] as const;
            }
          })
        );
        if (cancelled) return;
        const map: Record<string, Product> = {};
        for (const [id, p] of entries) if (p) map[id] = p;
        setProductsById(map);
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Something went wrong";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const subtotal = useMemo<number>(() => {
    const items = order?.order_items ?? [];
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }, [order]);

  const shippingFee = useMemo<number>(() => {
    if (!order) return 0;
    const fee = order.total - subtotal;
    return fee > 0 ? fee : 0;
  }, [order, subtotal]);

  const tax = 0;

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl p-6 animate-pulse">
        {/* Skeleton Loader */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!order) return null;

  const fullName = `${order.name} ${order.surname}`.trim();
  const shortId = order.id.replace(/^ORD-/, "");
  const orderDate = new Date(order.created_at).toLocaleString();

  // Map status / payment values for colors
  const orderStatus = (status.charAt(0).toUpperCase() + status.slice(1)) as OrderStatus;
  const paymentStatus = paid ? "Paid" : "Not paid";

  async function handleSave() {
    if (!order) return;
    try {
      const updated = await updateOrder(order.id, {
        status,
        paid,
        payment_date: paid ? paymentDate : '',
      });
      setOrder(updated);
      toast.success("✅ Order updated successfully");
      router.push("/admin")
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "❌ Failed to update order"
      );
    }
  }

  return (
    <div className="mx-auto mt-24 max-w-7xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
            {initials(order.name, order.surname)}
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold text-gray-900">
              {fullName || "Customer"}
            </div>
            <div className="text-sm text-gray-500">{order.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Order #{shortId}
          </div>
          <DeleteButton
            id={order.id}
            resource="orders"
            onDeleted={() => router.push("/admin")}
          />
        </div>
      </div>

      {/* Editable fields */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          {/* Status */}
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`mt-1 rounded-lg px-3  py-2 text-sm ${statusStyles[orderStatus].bg} ${statusStyles[orderStatus].text}`}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Paid status */}
          <div>
            <select
              value={paid ? "true" : "false"}
              onChange={(e) => setPaid(e.target.value === "true")}
              className={`mt-1 rounded-lg px-3  py-2 text-sm ${paymentDotColor[paymentStatus].bg} ${paymentDotColor[paymentStatus].text}`}
            >
              <option value="false">Not Paid</option>
              <option value="true">Paid</option>
            </select>
          </div>

          {/* Payment Date */}
          {paid && (
            <div>
              <input
                type="datetime-local"
                value={paymentDate ? paymentDate.slice(0, 16) : ""}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="mt-1 rounded-lg border-gray-300 text-sm"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 border text-orange-500 hover:bg-orange-500 hover:text-white hover:cursor-pointer px-4 py-2 rounded-md text-sm font-bold shadow"
        >
          Save Changes
        </button>
      </div>
      
      {/* Items table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-orange-600 text-sm font-medium text-white">
            <tr>
              <th scope="col" className="px-6 py-4 text-left">
                Product Name
              </th>
              <th scope="col" className="px-6 py-4 text-left">
                Product Code
              </th>
              <th scope="col" className="px-6 py-4 text-left">
                Quantity
              </th>
              <th scope="col" className="px-6 py-4 text-left">
                Price
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.order_items?.map((item) => {
              const product = productsById[item.product_id];
              const thumb = product?.images?.[0];
              return (
                <tr key={item.id} className="align-middle">
                  <td className="px-6 py-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt={product?.name || "Product image"}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-gray-900">
                          {product?.name || "Product"}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-gray-500">
                          {product?.category
                            ? `Category : ${product.category}`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">
                    {(product?.id || item.product_id).toUpperCase()}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                    x{item.quantity}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-orange-600">
                    {currency.format(item.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-10">
        <div className="mx-auto w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4 text-center text-base font-semibold text-gray-900">
            Order Summary
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">
                {currency.format(subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Shipping fee</dt>
              <dd className="font-medium text-gray-900">
                {currency.format(shippingFee)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Tax</dt>
              <dd className="font-medium text-gray-900">
                {currency.format(tax)}
              </dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Placed on</dt>
              <dd className="font-medium text-gray-900">{orderDate}</dd>
            </div>
            {order.payment_date && (
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Payment date</dt>
                <dd className="font-medium text-gray-900">
                  {new Date(order.payment_date).toLocaleString()}
                </dd>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <dt className="text-gray-900">Total</dt>
                <dd className="text-base font-semibold text-gray-900">
                  {currency.format(order.total)}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

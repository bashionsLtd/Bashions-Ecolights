"use client";

import Link from "next/link";
import { MoreVertical, Search } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { OrderDb, Order, OrderStatus, PaymentStatus } from "../../types/order";

// ===== Config =====
const PAGE_SIZE = 3; // keep this in sync with your API

// --- Styles ---
const statusStyles: Record<OrderStatus, { bg: string; text: string }> = {
  Completed: { bg: "bg-green-100", text: "text-green-700" },
  Pending: { bg: "bg-sky-200", text: "text-blue-700" },
  Rejected: { bg: "bg-red-100", text: "text-red-700" },
  Processing: { bg: "bg-orange-100", text: "text-orange-700" },
};

const paymentDotColor: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-500",
  "Not paid": "bg-red-500",
};

const paymentTextColor: Record<PaymentStatus, string> = {
  Paid: "text-emerald-600",
  "Not paid": "text-red-600",
};

const money = (n: number) =>
  n.toLocaleString("en-gb", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

// --- Fetcher: returns UI shape (Order[]) ---
// We pass an explicit OFFSET so the server can't return the same rows again.
// If your API only supports page=… (1-based), switch to `page=${pageParam + 1}&limit=${PAGE_SIZE}`.
async function fetchOrders({ pageParam = 0 }): Promise<Order[]> {
  const offset = pageParam * PAGE_SIZE;
  const res = await fetch(`/api/orders?offset=${offset}&limit=${PAGE_SIZE}`, {
    // optional: avoid caching
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch orders");

  const data: OrderDb[] = await res.json();

  return data.map((o) => {
    const createdAt = new Date(o.created_at);
    return {
      id: o.id,
      date: createdAt.toISOString().split("T")[0],
      time: createdAt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      name: `${o.name} ${o.surname}`,
      address: `${o.street ? o.street + ", " : ""}${o.city}`,
      phone: o.phone,
      orderStatus: (o.status.charAt(0).toUpperCase() + o.status.slice(1)) as OrderStatus,
      paymentStatus: o.paid ? ("Paid" as const) : ("Not paid" as const),
      total: o.total,
    } satisfies Order;
  });
}

type LatestOrdersProps = { title?: string };

export default function LatestOrders({ title = "Latest Orders" }: LatestOrdersProps) {
  const {
    data: orders = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<Order[], Error, Order[], ["orders"], number>({
    queryKey: ["orders"],
    queryFn: ({ pageParam = 0 }) => fetchOrders({ pageParam }),
    initialPageParam: 0,
    // If the last page has fewer than PAGE_SIZE items, we've reached the end.
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
    // Flatten AND de-dupe by id to avoid duplicate-key warnings even if API repeats rows
    select: (data) => {
      const map = new Map<string, Order>();
      for (const o of data.pages.flat()) map.set(o.id, o);
      return Array.from(map.values());
    },
    refetchOnWindowFocus: false,
  });

  if (status === "pending") return <p className="p-6">Loading orders...</p>;
  if (status === "error") return <p className="p-6 text-red-600">Error: {error.message}</p>;

  return (
    <section className="w-full bg-white shadow-sm ring-1 ring-slate-200 rounded-md">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <Search size={18} />
          </button>
          <button
            aria-label="More"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-500 text-xs font-semibold">
            <tr>
              <Th>ORDER</Th>
              <Th>DATE</Th>
              <Th>NAME</Th>
              <Th>ADDRESS</Th>
              <Th>PHONE</Th>
              <Th>STATUS</Th>
              <Th>PAYMENT</Th>
              <Th className="text-right pr-6">TOTAL</Th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                <Td>
                  <Link href={`/admin/orders/${o.id}`} className="text-pink-600 font-semibold hover:underline">
                    {o.id}
                  </Link>
                </Td>

                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {new Date(o.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                    <span className="text-xs text-gray-400">{o.time}</span>
                  </div>
                </td>

                <Td><span className="font-medium">{o.name}</span></Td>
                <Td>{o.address}</Td>
                <Td><span className="font-mono text-xs text-gray-600">{o.phone}</span></Td>
                <Td><StatusBadge status={o.orderStatus} /></Td>

                <Td>
                  <div className={clsx("flex items-center gap-2 font-medium", paymentTextColor[o.paymentStatus])}>
                    <span className={clsx("inline-block h-2 w-2 rounded-full", paymentDotColor[o.paymentStatus])} />
                    {o.paymentStatus}
                  </div>
                </Td>

                <Td className="text-right pr-6 font-semibold">{money(o.total)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="flex justify-center p-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-slate-800 text-white text-sm rounded-md hover:bg-slate-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

    </section>
  );
}

// ---- Subcomponents ----
function Th({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <th className={clsx("px-4 py-3 uppercase tracking-wide", className)}>{children}</th>;
}
function Td({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <td className={clsx("px-4 py-4 align-middle", className)}>{children}</td>;
}
function StatusBadge({ status }: { status: OrderStatus }) {
  const s = statusStyles[status];
  return (
    <span className={clsx("inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold", s.bg, s.text)}>
      {status}
    </span>
  );
}

"use client";

import Link from "next/link";
import { MoreVertical, Search } from "lucide-react";
import { Order, OrderStatus, PaymentStatus } from "../../types/order";
import clsx from "clsx";

// --- Styles ---
const statusStyles: Record<OrderStatus, { bg: string; text: string }> = {
  Completed: { bg: "bg-green-100", text: "text-green-700" },
  Pending: { bg: "bg-sky-200", text: "text-blue-700" },
  Rejected: { bg: "bg-red-100", text: "text-red-700" },
  Processing: { bg: "bg-yellow-100", text: "text-yellow-700" },
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

type LatestOrdersProps = {
  title?: string;
  orders: Order[];
};

export function LatestOrders({ title = "Latest Orders", orders }: LatestOrdersProps) {
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
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    {o.code}
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

                <Td>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{o.name}</span>
                  </div>
                </Td>

                <Td>{o.address}</Td>

                <Td>
                  <span className="font-mono text-xs text-gray-600">{o.phone}</span>
                </Td>

                <Td>
                  <StatusBadge status={o.orderStatus} />
                </Td>

                <Td>
                  <div
                    className={clsx(
                      "flex items-center gap-2 font-medium",
                      paymentTextColor[o.paymentStatus]
                    )}
                  >
                    <span
                      className={clsx(
                        "inline-block h-2 w-2 rounded-full",
                        paymentDotColor[o.paymentStatus]
                      )}
                    />
                    {o.paymentStatus}
                  </div>
                </Td>

                <Td className="text-right pr-6 font-semibold">
                  {money(o.total)}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ---- Subcomponents ----
function Th({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <th className={clsx("px-4 py-3 uppercase tracking-wide", className)}>{children}</th>
  );
}

function Td({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <td className={clsx("px-4 py-4 align-middle", className)}>{children}</td>;
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const s = statusStyles[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold",
        s.bg,
        s.text
      )}
    >
      {status}
    </span>
  );
}

export default LatestOrders;

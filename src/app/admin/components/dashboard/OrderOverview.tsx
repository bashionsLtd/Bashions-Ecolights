"use client";

import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import { OrderDb } from "../../types/order";

interface OverviewStats {
  income: string;
  pendingIncome: string;
  completed: string;
  pending: string;
  rejected: string;
  processing: string;
}

export default function OrderOverview({}) {
  const [stats, setStats] = useState<OverviewStats>({
    income: "0",
    pendingIncome: "0",
    completed: "0",
    pending: "0",
    rejected: "0",
    processing: "0"
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const orders: OrderDb[] = await res.json();

        const now = new Date();
        const currentYear = now.getFullYear();

        let incomeTotal = 0;
        let pendingIncomeTotal = 0;
        let completedCount = 0;
        let pendingCount = 0;
        let rejectedCount = 0;
        let processingCount = 0;

        orders.forEach((order) => {
          const createdYear = new Date(order.created_at).getFullYear();

          if (createdYear === currentYear) {
            // Paid orders contribute to income
            if (order.paid) incomeTotal += order.total;

            // Unpaid orders that are NOT rejected contribute to pendingIncome
            if (!order.paid && order.status.toLowerCase() !== "rejected") {
              pendingIncomeTotal += order.total;
            }

            // Count by status
            switch (order.status.toLowerCase()) {
              case "completed":
                completedCount += 1;
                break;
              case "pending":
                pendingCount += 1;
                break;
              case "rejected":
                rejectedCount += 1;
                break;
              case "processing":
                processingCount += 1;
                break;
            }
          }
        });

        setStats({
          income: incomeTotal.toLocaleString("en-US", {
            style: "currency",
            currency: "RWF",
          }),
          pendingIncome: pendingIncomeTotal.toLocaleString("en-US", {
            style: "currency",
            currency: "RWF",
          }),
          completed: completedCount.toString(),
          pending: pendingCount.toString(),
          rejected: rejectedCount.toString(),
          processing: processingCount.toString(),
        });
      } catch (e) {
        console.error(e);
      }
    }

    loadStats();
  }, []);

  return (
    <section className=" mt-22 bg-white shadow-sm ring-1 ring-slate-200 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-slate-800">Order Overview</h2>
        <div className="flex items-center gap-3">
          <button
            aria-label="More"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mb-6">
        <StatCard value={stats.income} label="Income" icon="" />
        <StatCard value={stats.pendingIncome} label="Pending Income" icon="" />
        <StatCard value={stats.completed} label="Completed" icon="✅" />
        <StatCard value={stats.pending} label="Pending" icon="⏱" />
        <StatCard value={stats.processing} label="Processing" icon="⚙️" />
        <StatCard value={stats.rejected} label="Rejected" icon="❌" />
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center rounded-lg bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-slate-800">{value}</span>
        <span className="text-lg font-bold">{icon}</span>
      </div>
      <p className="text-slate-500 text-sm mt-1">{label}</p>
    </div>
  );
}

"use client";
import { OverviewStats} from "../../types/overview";
import { MoreVertical } from "lucide-react";

interface OrderOverviewProps {
  stats: OverviewStats;
}

export default function OrderOverview({
  stats
}: OrderOverviewProps) {
  return (
    <section className=" mt-22 bg-white shadow-sm ring-1 ring-slate-200 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-slate-800">
          Order Overview
        </h2>
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard value={stats.income} label="Income" icon="RWF" />
        <StatCard value={stats.completed} label="Completed" icon="✅" />
        <StatCard value={stats.pending.toString()} label="Pending" icon="⏱" />
        <StatCard value={stats.rejected.toString()} label="Rejected" icon="❌" />
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
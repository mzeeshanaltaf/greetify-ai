"use client";

import { Coins, ImageIcon, Trophy, Zap, BookOpen } from "lucide-react";
import CreditsBadge from "@/components/shared/CreditsBadge";
import type { UserStats } from "@/lib/db/queries/stats";
import type { Card } from "@/lib/db/schema";

interface Props {
  stats: UserStats;
  recentCards: Card[];
}

export default function StatsClient({ stats, recentCards }: Props) {
  const { totalSaved, byOutputType, topOccasion, credits } = stats;
  const totalGenerations = totalSaved + Math.max(0, 5 - credits);

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
          Stats
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#0d0b18] mt-2"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Your Activity
        </h1>
        <p className="text-sm text-[#7a6f66] mt-2">
          An overview of your card generation history and credit balance.
        </p>
      </div>

      {/* Out-of-credits banner */}
      {credits === 0 && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-200 mb-8">
          <Zap className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            You&apos;re out of credits.{" "}
            <a
              href="/#pricing"
              className="underline underline-offset-2 hover:text-amber-900 font-semibold"
            >
              Upgrade to Pro →
            </a>
          </p>
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <KpiCard
          icon={<Coins className="w-5 h-5 text-[#d4a853]" />}
          label="Credits Remaining"
          value={<CreditsBadge credits={credits} className="text-sm" />}
        />
        <KpiCard
          icon={<ImageIcon className="w-5 h-5 text-purple-500" />}
          label="Cards Saved"
          value={<span className="text-2xl font-bold text-[#0d0b18]">{totalSaved}</span>}
        />
        <KpiCard
          icon={<Zap className="w-5 h-5 text-blue-500" />}
          label="Total Generated"
          value={<span className="text-2xl font-bold text-[#0d0b18]">{totalGenerations}</span>}
        />
        <KpiCard
          icon={<Trophy className="w-5 h-5 text-emerald-500" />}
          label="Top Occasion"
          value={
            topOccasion ? (
              <span className="text-sm font-semibold text-[#0d0b18] leading-tight">
                {topOccasion.label}
                <span className="block text-xs text-[#7a6f66] font-normal mt-0.5">
                  {topOccasion.count} card{topOccasion.count !== 1 ? "s" : ""}
                </span>
              </span>
            ) : (
              <span className="text-sm text-[#7a6f66]">None yet</span>
            )
          }
        />
      </div>

      {/* Format breakdown */}
      {totalSaved > 0 && (
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#0d0b18]/8 p-6 md:p-8 mb-10">
          <h2 className="text-base font-semibold text-[#0d0b18] mb-5">
            Format Breakdown
          </h2>
          <div className="space-y-4">
            <FormatBar label="E-Card" count={byOutputType.ecard} total={totalSaved} color="bg-[#d4a853]" />
            <FormatBar label="Poster" count={byOutputType.poster} total={totalSaved} color="bg-purple-500" />
            <FormatBar label="Flyer" count={byOutputType.flyer} total={totalSaved} color="bg-blue-500" />
          </div>
        </div>
      )}

      {/* Recent cards strip */}
      {recentCards.length > 0 && (
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#0d0b18]/8 p-6 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-[#0d0b18]">Recent Cards</h2>
            <a
              href="/library"
              className="flex items-center gap-1.5 text-sm text-[#d4a853] hover:text-[#c49240] font-semibold transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              View all
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {recentCards.map((card) => (
              <div
                key={card.id}
                className="aspect-square rounded-xl overflow-hidden border border-[#0d0b18]/10 bg-[#f7f3ee] pointer-events-none select-none"
              >
                <img
                  src={card.imageUrl}
                  alt={card.occasion}
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {totalSaved === 0 && (
        <div className="text-center py-16">
          <ImageIcon className="w-12 h-12 text-[#7a6f66]/30 mx-auto mb-4" />
          <p className="text-[#7a6f66] text-sm">
            No cards saved yet.{" "}
            <a href="/dashboard" className="text-[#d4a853] font-semibold hover:underline">
              Generate your first card →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#0d0b18]/8 p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium text-[#7a6f66] uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div>{value}</div>
    </div>
  );
}

function FormatBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#3d3530] font-medium w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[#0d0b18]/8 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#7a6f66] w-12 text-right">
        {count} ({pct}%)
      </span>
    </div>
  );
}

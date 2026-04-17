import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/landing/Footer";
import StatsClient from "@/components/stats/StatsClient";
import { auth } from "@/lib/auth";
import { getUserStats, getRecentCards } from "@/lib/db/queries/stats";

export const metadata: Metadata = {
  title: "Stats — Greetify",
  description: "Your card generation activity and credit balance.",
};

export default async function StatsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login?next=/stats");

  const credits = (session.user as { credits?: number }).credits ?? 5;

  const [stats, recentCards] = await Promise.all([
    getUserStats(session.user.id),
    getRecentCards(session.user.id, 6),
  ]);

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <DashboardNav userName={session.user.name ?? session.user.email} credits={credits} />
      <main className="pt-24 sm:pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <StatsClient stats={stats} recentCards={recentCards} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { desc, eq } from "drizzle-orm";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/landing/Footer";
import LibraryClient from "@/components/library/LibraryClient";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Library — Greetify",
  description: "Browse and manage your saved greeting cards.",
};

const PAGE_LIMIT = 20;

export default async function LibraryPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login?next=/library");

  const credits = (session.user as { credits?: number }).credits ?? 5;

  const rows = await db
    .select()
    .from(cards)
    .where(eq(cards.userId, session.user.id))
    .orderBy(desc(cards.createdAt))
    .limit(PAGE_LIMIT + 1);

  const hasMore = rows.length > PAGE_LIMIT;
  const initialCards = hasMore ? rows.slice(0, PAGE_LIMIT) : rows;
  const initialNextCursor =
    hasMore ? initialCards[initialCards.length - 1].createdAt.toISOString() : null;

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <DashboardNav userName={session.user.name ?? session.user.email} credits={credits} />
      <main className="pt-24 sm:pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
              Library
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold text-[#0d0b18] mt-2"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Your Cards
            </h1>
            <p className="text-sm text-[#7a6f66] mt-2">
              {initialCards.length === 0
                ? "No saved cards yet."
                : `${initialCards.length}${hasMore ? "+" : ""} saved card${initialCards.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <LibraryClient
            initialCards={initialCards}
            initialNextCursor={initialNextCursor}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

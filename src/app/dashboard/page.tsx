import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardClient from "@/components/dashboard/DashboardClient";
import Footer from "@/components/landing/Footer";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard — Greetify",
  description: "Generate and save AI-powered greeting cards.",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const credits = (session.user as { credits?: number }).credits ?? 5;
  const userName = session.user.name ?? session.user.email;

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <DashboardNav userName={userName} credits={credits} />
      <main className="pt-24 sm:pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <DashboardClient userName={userName} initialCredits={credits} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

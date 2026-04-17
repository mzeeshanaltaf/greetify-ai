"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, LayoutDashboard, BookOpen, BarChart2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth/client";
import CreditsBadge from "@/components/shared/CreditsBadge";

interface Props {
  userName: string;
  credits: number;
}

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Library",   href: "/library",   icon: BookOpen },
  { label: "Stats",     href: "/stats",      icon: BarChart2 },
];

export default function DashboardNav({ userName, credits }: Props) {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigningOut(true);
    try {
      await authClient.signOut();
    } catch {
      // proceed with navigation even if API call fails
    }
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0b18]/95 backdrop-blur-xl border-b border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#d4a853] to-[#c49240] flex items-center justify-center shadow-[0_0_12px_rgba(212,168,83,0.5)] group-hover:shadow-[0_0_20px_rgba(212,168,83,0.7)] transition-shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#0d0b18]" />
          </div>
          <span
            className="font-display text-lg font-semibold text-[#f7f3ee] tracking-wide"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Greetify
          </span>
        </a>

        {/* Page links */}
        <nav className="hidden sm:flex items-center gap-1">
          {links.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <a
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "text-[#d4a853] bg-[#d4a853]/10"
                    : "text-[#f7f3ee]/60 hover:text-[#f7f3ee] hover:bg-white/5",
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </a>
            );
          })}
        </nav>

        {/* Right side: credits + user + sign out */}
        <div className="flex items-center gap-3">
          <a href="/stats">
            <CreditsBadge credits={credits} />
          </a>
          <span className="hidden md:block text-sm text-[#f7f3ee]/50 truncate max-w-[140px]">
            {userName.split(" ")[0]}
          </span>
          <form
            action="/api/auth-fallback/signout"
            method="post"
            onSubmit={handleSignOut}
          >
            <button
              type="submit"
              disabled={signingOut}
              className="flex items-center gap-1.5 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] transition-colors font-medium px-2 py-1.5 rounded-lg hover:bg-white/5 disabled:opacity-50 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{signingOut ? "Signing out…" : "Sign Out"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile page links */}
      <div className="sm:hidden border-t border-white/6 px-4 py-2 flex gap-1">
        {links.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <a
              key={href}
              href={href}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors",
                active
                  ? "text-[#d4a853] bg-[#d4a853]/10"
                  : "text-[#f7f3ee]/50 hover:text-[#f7f3ee] hover:bg-white/5",
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </a>
          );
        })}
      </div>
    </header>
  );
}

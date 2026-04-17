"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Menu, X, LayoutDashboard, LogOut, BookOpen, BarChart2 } from "lucide-react";
import GradientButton from "@/components/shared/GradientButton";
import CreditsBadge from "@/components/shared/CreditsBadge";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth/client";

const navLinks = [
  { label: "Occasions", href: "/#occasions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { data: sessionData, isPending } = authClient.useSession();
  const isSignedIn = !!sessionData?.user && !isPending;
  const credits = (sessionData?.user as { credits?: number } | undefined)?.credits ?? 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        "bg-[#0d0b18]/95 backdrop-blur-xl border-b border-white/6",
        scrolled && "shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#d4a853] to-[#c49240] flex items-center justify-center shadow-[0_0_16px_rgba(212,168,83,0.5)] group-hover:shadow-[0_0_24px_rgba(212,168,83,0.7)] transition-shadow">
            <Sparkles className="w-4 h-4 text-[#0d0b18]" />
          </div>
          <span
            className="font-display text-xl font-semibold text-[#f7f3ee] tracking-wide"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Greetify
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[#f7f3ee]/60 hover:text-[#d4a853] transition-colors duration-200 rounded-lg hover:bg-white/5 font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isSignedIn ? (
            <>
              {/* Credits badge — links to /stats */}
              <a href="/stats" className="flex items-center">
                <CreditsBadge credits={credits} />
              </a>
              <a
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] transition-colors font-medium px-3 py-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </a>
              <a
                href="/library"
                className="flex items-center gap-1.5 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] transition-colors font-medium px-3 py-2"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Library
              </a>
              <a
                href="/stats"
                className="flex items-center gap-1.5 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] transition-colors font-medium px-3 py-2"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                Stats
              </a>
              <form
                action="/api/auth-fallback/signout"
                method="post"
                onSubmit={handleSignOut}
              >
                <button
                  type="submit"
                  disabled={signingOut}
                  className="flex items-center gap-1.5 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] transition-colors font-medium px-3 py-2 disabled:opacity-50 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {signingOut ? "Signing out…" : "Sign Out"}
                </button>
              </form>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] transition-colors font-medium px-3 py-2"
              >
                Sign In
              </a>
              <GradientButton size="sm" variant="gold" href="/signup">
                <Sparkles className="w-3.5 h-3.5" />
                Create Card Free
              </GradientButton>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#f7f3ee]/70 hover:text-[#f7f3ee] hover:bg-white/10 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-[#0d0b18]/95 backdrop-blur-xl border-b border-white/6",
          menuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm text-[#f7f3ee]/70 hover:text-[#d4a853] rounded-lg hover:bg-white/5 transition-all font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-white/8 mt-2 pt-3 flex flex-col gap-2">
            {isSignedIn ? (
              <>
                {/* Credits in mobile menu */}
                <a
                  href="/stats"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center"
                >
                  <CreditsBadge credits={credits} />
                </a>
                <a
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] rounded-lg hover:bg-white/5 transition-all font-medium text-center"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </a>
                <a
                  href="/library"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] rounded-lg hover:bg-white/5 transition-all font-medium text-center"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Library
                </a>
                <a
                  href="/stats"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] rounded-lg hover:bg-white/5 transition-all font-medium text-center"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  Stats
                </a>
                <form
                  action="/api/auth-fallback/signout"
                  method="post"
                  onSubmit={(e) => {
                    setMenuOpen(false);
                    handleSignOut(e);
                  }}
                >
                  <button
                    type="submit"
                    disabled={signingOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] rounded-lg hover:bg-white/5 transition-all font-medium text-center disabled:opacity-50 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {signingOut ? "Signing out…" : "Sign Out"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm text-[#f7f3ee]/60 hover:text-[#f7f3ee] rounded-lg hover:bg-white/5 transition-all font-medium text-center"
                >
                  Sign In
                </a>
                <GradientButton size="sm" variant="gold" href="/signup" className="w-full justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                  Create Card Free
                </GradientButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

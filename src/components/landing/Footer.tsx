"use client";

import { Sparkles } from "lucide-react";

const productLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export default function Footer() {
  return (
      <footer className="bg-[#0d0b18] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a853] to-[#c49240] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#0d0b18]" />
                </div>
                <span
                  className="text-lg font-semibold text-[#f7f3ee]"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  Greetify
                </span>
              </div>
              <p className="text-sm text-[#f7f3ee]/35 leading-relaxed max-w-[180px]">
                AI-powered greeting cards for every occasion and every culture.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold text-[#f7f3ee]/40 uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#f7f3ee]/50 hover:text-[#d4a853] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold text-[#f7f3ee]/40 uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/about"
                    className="text-sm text-[#f7f3ee]/50 hover:text-[#d4a853] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-sm text-[#f7f3ee]/50 hover:text-[#d4a853] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold text-[#f7f3ee]/40 uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#f7f3ee]/50 hover:text-[#d4a853] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#f7f3ee]/25">
              © {new Date().getFullYear()} Greetify. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-[#f7f3ee]/25">
              <span>Powered by</span>
              <span className="gradient-text-gold font-semibold">Google Nano Banana</span>
            </div>
          </div>
        </div>
      </footer>
  );
}

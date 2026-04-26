"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import GradientButton from "@/components/shared/GradientButton";
import { STATS } from "@/lib/constants/features";

// Pre-computed star data to avoid Math.random() during render (hydration mismatch)
const STAR_DATA = Array.from({ length: 50 }, (_, i) => ({
  left: `${((i * 17 + 7) % 100).toFixed(1)}%`,
  top: `${((i * 23 + 13) % 100).toFixed(1)}%`,
  duration: 2 + (i % 5) * 0.7,
  delay: (i % 8) * 0.4,
}));

const CARD_MOCKUPS = [
  {
    id: 1,
    label: "Eid Mubarak",
    sublabel: "Gold Luxury Card",
    emoji: "☪️",
    from: "#1a4731",
    to: "#0d2b1e",
    accent: "#d4a853",
    rotate: "-8deg",
    x: "-30px",
    y: "20px",
    z: 0,
  },
  {
    id: 2,
    label: "Happy Birthday",
    sublabel: "Luxury Edition",
    emoji: "🎂",
    from: "#4c1d95",
    to: "#2d1060",
    accent: "#f0c96d",
    rotate: "0deg",
    x: "0px",
    y: "0px",
    z: 10,
  },
  {
    id: 3,
    label: "Merry Christmas",
    sublabel: "Snow Theme",
    emoji: "🎄",
    from: "#7f1d1d",
    to: "#450a0a",
    accent: "#86efac",
    rotate: "8deg",
    x: "30px",
    y: "20px",
    z: 0,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0d0b18] overflow-hidden noise-overlay flex items-center">
      {/* Background orbs */}
      <div className="orb orb-gold w-[600px] h-[600px] top-[-100px] left-[-200px] opacity-60" />
      <div className="orb orb-coral w-[500px] h-[500px] bottom-[-50px] right-[-100px] opacity-50" />
      <div className="orb orb-indigo w-[400px] h-[400px] top-[30%] left-[40%] opacity-40" />

      {/* Star field — CSS animation avoids framer-motion v12 init issues */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STAR_DATA.map((star, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              opacity: 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          {/* Left: Content */}
          <motion.div
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow badge */}
            <motion.div
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-sm text-[#d4a853] font-medium mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a853] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4a853]" />
              </span>
              Powered by OpenAI&apos;s Next-Gen Image Model
            </motion.div>

            {/* Headline */}
            <motion.h1
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl lg:text-7xl font-bold text-[#f7f3ee] leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Beautiful Cards,{" "}
              <span className="gradient-text-gold italic">
                Crafted
              </span>
              {" "}by AI
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-lg text-[#f7f3ee]/55 leading-relaxed mb-10 max-w-lg font-light"
            >
              Generate stunning, personalized greeting cards for every
              occasion — Eid, Christmas, Birthdays, Weddings and more.
              Just pick your occasion and let AI create something memorable.
            </motion.p>

            {/* CTAs */}
            <motion.div
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <GradientButton size="lg" variant="gold" href="/signup">
                <Sparkles className="w-4 h-4" />
                Create Your Card Free
                <ArrowRight className="w-4 h-4" />
              </GradientButton>
              <GradientButton size="lg" variant="ghost" href="#gallery">
                See Examples
              </GradientButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  className="text-center"
                >
                  <div
                    className="text-2xl font-bold gradient-text-gold"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#f7f3ee]/40 uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Floating Card Mockups */}
          <motion.div
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center h-[480px] lg:h-[560px]"
          >
            {CARD_MOCKUPS.map((card, i) => (
              <motion.div
                key={card.id}
                animate={{ rotate: card.rotate }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  zIndex: card.z,
                  x: card.x,
                  y: card.y,
                }}
                whileHover={{ y: -8, scale: 1.03, zIndex: 20, transition: { duration: 0.3 } }}
                className="cursor-pointer"
              >
                <div
                  className="w-[220px] h-[300px] rounded-2xl card-float flex flex-col items-center justify-center p-6 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${card.from}, ${card.to})`,
                    border: `1px solid ${card.accent}25`,
                  }}
                >
                  {/* Card inner glow */}
                  <div
                    className="absolute top-0 left-0 w-full h-32 opacity-30"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${card.accent}60, transparent 70%)`,
                    }}
                  />

                  {/* Corner ornaments */}
                  <div
                    className="absolute top-3 left-3 w-8 h-8 opacity-30"
                    style={{ borderTop: `1px solid ${card.accent}`, borderLeft: `1px solid ${card.accent}`, borderRadius: "4px 0 0 0" }}
                  />
                  <div
                    className="absolute bottom-3 right-3 w-8 h-8 opacity-30"
                    style={{ borderBottom: `1px solid ${card.accent}`, borderRight: `1px solid ${card.accent}`, borderRadius: "0 0 4px 0" }}
                  />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-4">{card.emoji}</div>
                    <div
                      className="text-lg font-semibold mb-1"
                      style={{
                        color: card.accent,
                        fontFamily: "var(--font-display), serif",
                      }}
                    >
                      {card.label}
                    </div>
                    <div className="text-xs text-white/40 tracking-wider uppercase">
                      {card.sublabel}
                    </div>
                  </div>

                  {/* Star decorations */}
                  {[...Array(3)].map((_, si) => (
                    <Star
                      key={si}
                      className="absolute opacity-15"
                      style={{
                        width: 8 + si * 4,
                        height: 8 + si * 4,
                        color: card.accent,
                        top: `${20 + si * 25}%`,
                        right: `${8 + si * 5}%`,
                      }}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Ambient glow behind cards */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full opacity-20 blur-3xl bg-[#d4a853]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7f3ee] to-transparent pointer-events-none" />
    </section>
  );
}

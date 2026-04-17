"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Wand2, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: LayoutGrid,
    title: "Choose Your Occasion",
    description:
      "Browse 50+ occasions across 7 categories. Select the one that fits — from religious festivals to personal milestones.",
    detail: "50+ occasions available",
    color: "#d4a853",
    bgColor: "rgba(212, 168, 83, 0.08)",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Customize with AI",
    description:
      "Enter the recipient's name, choose a tone (Romantic, Funny, Poetic, Islamic...) and let Gemini AI craft the perfect message.",
    detail: "9 tone styles",
    color: "#e86f4e",
    bgColor: "rgba(232, 111, 78, 0.08)",
  },
  {
    number: "03",
    icon: Download,
    title: "Download & Share",
    description:
      "Your AI-generated card is ready in seconds. Download as E-Card, Poster, or Banner — and share it anywhere.",
    detail: "3 output formats",
    color: "#7c6bd6",
    bgColor: "rgba(124, 107, 214, 0.08)",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#0d0b18] py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10"
          style={{
            background: "radial-gradient(ellipse at center, #d4a853 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-rule">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
              How It Works
            </span>
          </div>
          <h2
            className="text-4xl lg:text-6xl font-bold text-[#f7f3ee] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Three Steps to{" "}
            <span className="gradient-text-coral italic">Perfection</span>
          </h2>
          <p className="text-lg text-[#f7f3ee]/45 max-w-xl mx-auto leading-relaxed font-light">
            From choosing an occasion to holding a beautiful card — the whole
            process takes under a minute.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-[60px] left-[calc(16.5%+60px)] right-[calc(16.5%+60px)] h-px hidden lg:block">
            <div className="w-full h-full border-t border-dashed border-[#d4a853]/20" />
            <div
              className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4a853]/30"
              style={{ transform: "translateY(-50%)" }}
            />
            <div
              className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4a853]/30"
              style={{ transform: "translateY(-50%)" }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 h-full hover:bg-white/[0.05] transition-colors group">
                  {/* Step number */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center relative"
                      style={{ background: step.bgColor, border: `1px solid ${step.color}25` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-5xl font-bold opacity-10 leading-none"
                      style={{
                        color: step.color,
                        fontFamily: "var(--font-display), serif",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-[#f7f3ee] mb-3"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#f7f3ee]/45 leading-relaxed text-sm mb-6">
                    {step.description}
                  </p>

                  {/* Detail badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                    style={{
                      background: step.bgColor,
                      color: step.color,
                      border: `1px solid ${step.color}25`,
                    }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: step.color }}
                    />
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

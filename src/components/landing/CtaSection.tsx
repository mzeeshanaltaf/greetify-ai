"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import GradientButton from "@/components/shared/GradientButton";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying Greetify",
    features: [
      "5 cards per month",
      "All occasion categories",
      "3 tone styles",
      "E-Card format",
      "Standard templates",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    featured: false,
  },
  {
    name: "Pro",
    price: "9",
    description: "For those who celebrate more",
    features: [
      "Unlimited card generation",
      "All 50+ occasions",
      "All 9 tone styles",
      "All 3 output formats",
      "Premium templates",
      "Multi-language support",
      "Priority generation",
    ],
    cta: "Get Pro",
    variant: "gold" as const,
    featured: true,
  },
];

export default function CtaSection() {
  return (
    <section id="pricing" className="bg-[#f7f3ee] py-24 lg:py-32 relative overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Large ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212,168,83,0.12), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-rule">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
              Pricing
            </span>
          </div>
          <h2
            className="text-4xl lg:text-6xl font-bold text-[#0d0b18] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Start Creating{" "}
            <span className="gradient-text-gold italic">Beautiful Cards</span>
          </h2>
          <p className="text-lg text-[#7a6f66] max-w-xl mx-auto leading-relaxed font-light">
            Begin for free — no credit card required. Upgrade when you're ready
            to celebrate without limits.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? "bg-[#0d0b18] border border-[#d4a853]/25 shadow-[0_0_60px_rgba(212,168,83,0.1)]"
                  : "bg-white border border-[#0d0b18]/8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#d4a853] to-[#c49240] text-[#0d0b18] text-xs font-bold tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`text-sm font-semibold tracking-wider uppercase mb-2 ${
                    plan.featured ? "text-[#d4a853]" : "text-[#7a6f66]"
                  }`}
                >
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span
                    className={`text-5xl font-bold ${
                      plan.featured ? "text-[#f7f3ee]" : "text-[#0d0b18]"
                    }`}
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={`text-sm mb-2 ${
                      plan.featured ? "text-[#f7f3ee]/40" : "text-[#7a6f66]"
                    }`}
                  >
                    /month
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    plan.featured ? "text-[#f7f3ee]/50" : "text-[#7a6f66]"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.featured
                          ? "bg-[#d4a853]/20 text-[#d4a853]"
                          : "bg-[#0d0b18]/8 text-[#0d0b18]"
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span
                      className={plan.featured ? "text-[#f7f3ee]/70" : "text-[#3d3530]"}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <GradientButton
                variant={plan.variant}
                size="md"
                className="w-full justify-center"
              >
                {plan.featured && <Sparkles className="w-4 h-4" />}
                {plan.cta}
              </GradientButton>
            </motion.div>
          ))}
        </div>

        {/* Bottom reassurance */}
        <motion.p
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-[#7a6f66] mt-8"
        >
          No credit card required · Cancel anytime · Instant access
        </motion.p>
      </div>
    </section>
  );
}

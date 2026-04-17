"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  LayoutTemplate,
  FileImage,
  Globe,
  Zap,
  CalendarHeart,
} from "lucide-react";
import { FEATURES } from "@/lib/constants/features";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  LayoutTemplate,
  FileImage,
  Globe,
  Zap,
  CalendarHeart,
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-[#0d0b18] py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, #d4a853, transparent 70%)" }}
      />
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at 0% 100%, #e86f4e, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-rule">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
              Why Greetify
            </span>
          </div>
          <h2
            className="text-4xl lg:text-6xl font-bold text-[#f7f3ee] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Everything You Need to{" "}
            <span className="gradient-text-gold italic">Celebrate</span>
          </h2>
          <p className="text-lg text-[#f7f3ee]/45 max-w-xl mx-auto leading-relaxed font-light">
            Greetify combines beautiful design templates with the power of AI
            to create cards that feel genuinely personal.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.id}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7 hover:bg-white/[0.055] hover:border-white/[0.1] transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center group-hover:border-white/[0.1] transition-colors">
                    {Icon && <Icon className={`w-5 h-5 ${feature.color}`} />}
                  </div>
                </div>

                <h3
                  className="text-lg font-bold text-[#f7f3ee] mb-2"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-[#f7f3ee]/45 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 h-px mx-auto max-w-2xl"
          style={{
            background: "linear-gradient(90deg, transparent, #d4a853, transparent)",
          }}
        />
      </div>
    </section>
  );
}

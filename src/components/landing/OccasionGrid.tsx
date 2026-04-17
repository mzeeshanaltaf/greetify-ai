"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { OCCASION_CATEGORIES } from "@/lib/constants/occasions";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function OccasionGrid() {
  return (
    <section id="occasions" className="bg-[#f7f3ee] py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-rule">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
              Every Occasion
            </span>
          </div>
          <h2
            className="text-4xl lg:text-6xl font-bold text-[#0d0b18] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Cards for Every{" "}
            <span className="gradient-text-gold italic">Celebration</span>
          </h2>
          <p className="text-lg text-[#7a6f66] max-w-xl mx-auto leading-relaxed font-light">
            From sacred religious festivals to personal milestones — we have
            beautifully designed templates waiting for your personal touch.
          </p>
        </motion.div>

        {/* Occasion Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {OCCASION_CATEGORIES.map((category) => (
            <motion.a
              key={category.id}
              href="#"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="shimmer-hover group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: `linear-gradient(145deg, ${category.bgFrom}, ${category.bgTo})`,
              }}
            >
              {/* Inner highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent" />

              <div className="relative z-10 p-6 min-h-[180px] flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-3">{category.emoji}</div>
                  <h3
                    className="text-lg font-bold text-white mb-1 leading-snug"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    {category.label}
                  </h3>
                  <p className="text-sm text-white/55 leading-snug">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium border border-white/10">
                    {category.templateCount} templates
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/25 transition-all">
                    <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-[#7a6f66] hover:text-[#d4a853] transition-colors font-medium group"
          >
            View all occasions
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

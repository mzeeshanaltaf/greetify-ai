"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const GALLERY_CARDS = [
  {
    id: 1,
    occasion: "Eid ul Fitr",
    template: "Gold Luxury Card",
    emoji: "☪️",
    from: "#1a4731",
    to: "#0d2b1e",
    accent: "#d4a853",
    tall: true,
  },
  {
    id: 2,
    occasion: "Birthday",
    template: "Luxury Edition",
    emoji: "🎂",
    from: "#3b1d8a",
    to: "#1e0f50",
    accent: "#f0c96d",
    tall: false,
  },
  {
    id: 3,
    occasion: "Valentine's Day",
    template: "Romantic Card",
    emoji: "💝",
    from: "#7f1d1d",
    to: "#500a0a",
    accent: "#f9a8d4",
    tall: false,
  },
  {
    id: 4,
    occasion: "Christmas",
    template: "Snow Theme",
    emoji: "🎄",
    from: "#14532d",
    to: "#052e16",
    accent: "#86efac",
    tall: true,
  },
  {
    id: 5,
    occasion: "Graduation",
    template: "Cap Theme",
    emoji: "🎓",
    from: "#1e1b4b",
    to: "#0f0d2e",
    accent: "#c084fc",
    tall: false,
  },
  {
    id: 6,
    occasion: "Mother's Day",
    template: "Floral Card",
    emoji: "💐",
    from: "#831843",
    to: "#4a0d28",
    accent: "#f9a8d4",
    tall: false,
  },
  {
    id: 7,
    occasion: "Diwali",
    template: "Lights Theme",
    emoji: "🪔",
    from: "#451a03",
    to: "#1c0a01",
    accent: "#fdba74",
    tall: true,
  },
  {
    id: 8,
    occasion: "New Year",
    template: "Fireworks Card",
    emoji: "🎆",
    from: "#0c1445",
    to: "#060a24",
    accent: "#93c5fd",
    tall: false,
  },
  {
    id: 9,
    occasion: "Wedding",
    template: "Nikah Mubarak",
    emoji: "💍",
    from: "#1a1100",
    to: "#0d0900",
    accent: "#fcd34d",
    tall: false,
  },
];

function GalleryCard({
  card,
  index,
}: {
  card: (typeof GALLERY_CARDS)[0];
  index: number;
}) {
  return (
    <motion.div
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer card-float-sm"
      style={{
        background: `linear-gradient(145deg, ${card.from}, ${card.to})`,
        border: `1px solid ${card.accent}18`,
        minHeight: card.tall ? "280px" : "180px",
      }}
    >
      {/* Gradient overlay top */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${card.accent}30, transparent 70%)`,
        }}
      />

      {/* Corner ornaments */}
      <div
        className="absolute top-3 left-3 w-6 h-6 opacity-25"
        style={{
          borderTop: `1px solid ${card.accent}`,
          borderLeft: `1px solid ${card.accent}`,
          borderRadius: "3px 0 0 0",
        }}
      />
      <div
        className="absolute bottom-3 right-3 w-6 h-6 opacity-25"
        style={{
          borderBottom: `1px solid ${card.accent}`,
          borderRight: `1px solid ${card.accent}`,
          borderRadius: "0 0 3px 0",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col justify-center items-center h-full text-center gap-3">
        <div className={card.tall ? "text-5xl" : "text-4xl"}>{card.emoji}</div>
        <div>
          <div
            className="font-semibold text-sm mb-0.5"
            style={{
              color: card.accent,
              fontFamily: "var(--font-display), serif",
            }}
          >
            {card.occasion}
          </div>
          <div className="text-white/35 text-xs">{card.template}</div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs text-white/80 font-medium">See Template</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SampleGallery() {
  return (
    <section id="gallery" className="bg-[#f7f3ee] py-24 lg:py-32 relative overflow-hidden">
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
              Gallery
            </span>
          </div>
          <h2
            className="text-4xl lg:text-6xl font-bold text-[#0d0b18] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            See What{" "}
            <span className="gradient-text-gold italic">Greetify</span> Creates
          </h2>
          <p className="text-lg text-[#7a6f66] max-w-xl mx-auto leading-relaxed font-light">
            Every card is uniquely generated — these are just a glimpse of what
            AI-powered personalization looks like.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
          {GALLERY_CARDS.map((card, i) => (
            <div key={card.id} className="break-inside-avoid mb-3">
              <GalleryCard card={card} index={i} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-[#7a6f66] mb-4">
            Every card is AI-generated and fully personalized for you
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4a853]/30 text-[#0d0b18] text-sm font-semibold hover:border-[#d4a853]/60 hover:bg-[#d4a853]/8 transition-all"
          >
            Browse All Templates
          </a>
        </motion.div>
      </div>
    </section>
  );
}

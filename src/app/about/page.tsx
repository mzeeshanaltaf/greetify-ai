import type { Metadata } from "next";
import { Sparkles, Heart, Globe, Zap, Users } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "About — Greetify",
  description:
    "Learn about Greetify's mission to make heartfelt, AI-powered greeting cards accessible for every occasion and every culture.",
};

const values = [
  {
    icon: Heart,
    title: "Genuine Warmth",
    description:
      "Every card should feel personal. We build tools that capture the warmth behind your words, not just fill a template.",
    color: "#e86f4e",
  },
  {
    icon: Globe,
    title: "Cultural Respect",
    description:
      "Celebrations are universal but culturally distinct. Greetify is built to honour every tradition — from Eid to Christmas to Diwali.",
    color: "#d4a853",
  },
  {
    icon: Zap,
    title: "Effortless Creation",
    description:
      "A meaningful card shouldn't take hours. We harness Google Gemini AI so your message goes from idea to beautiful card in seconds.",
    color: "#7c6bd6",
  },
  {
    icon: Users,
    title: "Everyone Welcome",
    description:
      "Whether you're sending a card to a childhood friend or a corporate partner, Greetify has a tone and style that fits.",
    color: "#4ea8e8",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative bg-[#0d0b18] overflow-hidden">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[400px] opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #d4a853 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-sm text-[#d4a853] font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Our Story
            </div>
            <h1
              className="text-5xl lg:text-7xl font-bold text-[#f7f3ee] leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Cards That{" "}
              <span className="gradient-text-gold italic">Actually</span> Feel Personal
            </h1>
            <p className="text-lg text-[#f7f3ee]/55 max-w-2xl mx-auto leading-relaxed font-light">
              Greetify was built because generic cards feel hollow. We believe every
              celebration deserves a message as unique as the person receiving it — and
              AI makes that possible at scale.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-rule justify-start mb-4">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
                  Our Mission
                </span>
              </div>
              <h2
                className="text-4xl font-bold text-[#0d0b18] leading-tight mb-5"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Meaningful moments shouldn&apos;t require a design degree
              </h2>
              <p className="text-[#7a6f66] leading-relaxed mb-4">
                We started Greetify after realising that most people either send a
                generic e-card or skip the gesture entirely because creating something
                beautiful felt too hard. The rise of large language models changed
                everything.
              </p>
              <p className="text-[#7a6f66] leading-relaxed">
                Today, Greetify uses Google Gemini to craft unique, heartfelt messages
                tailored to the occasion, the recipient&apos;s personality, and the tone you
                choose — then pairs that message with a professionally designed card
                template. The result: something genuinely special, in under a minute.
              </p>
            </div>

            {/* Stats card */}
            <div className="rounded-2xl bg-[#0d0b18] border border-white/[0.08] p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "50+", label: "Occasions" },
                  { value: "9", label: "Tone Styles" },
                  { value: "100+", label: "Templates" },
                  { value: "3", label: "Output Formats" },
                ].map((s) => (
                  <div key={s.label} className="text-center py-4">
                    <div
                      className="text-4xl font-bold gradient-text-gold mb-1"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs text-[#f7f3ee]/40 uppercase tracking-widest">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#0d0b18] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="section-rule">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
                  What We Stand For
                </span>
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold text-[#f7f3ee] tracking-tight"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                Built on Four{" "}
                <span className="gradient-text-coral italic">Core Values</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.05] transition-colors"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `${v.color}14`,
                        border: `1px solid ${v.color}25`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: v.color }} />
                    </div>
                    <h3
                      className="text-lg font-bold text-[#f7f3ee] mb-2"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#f7f3ee]/45 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-24 max-w-4xl mx-auto px-6 text-center">
          <div className="section-rule">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
              Technology
            </span>
          </div>
          <h2
            className="text-4xl font-bold text-[#0d0b18] mb-5"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Powered by Google Gemini AI
          </h2>
          <p className="text-[#7a6f66] leading-relaxed max-w-2xl mx-auto mb-8">
            We use Google&apos;s Gemini model — one of the world&apos;s most capable
            multimodal AI systems — to generate both the text content and the visual
            imagery for each card. Every output is unique; no two cards are ever
            identical.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4a853] to-[#c49240] text-[#0d0b18] text-sm font-bold hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(212,168,83,0.35)]"
          >
            <Sparkles className="w-4 h-4" />
            Try Greetify Free
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

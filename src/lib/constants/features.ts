export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

export const FEATURES: Feature[] = [
  {
    id: "ai-text",
    title: "AI-Crafted Messages",
    description:
      "Choose your tone — Emotional, Funny, Romantic, Islamic, Poetic — and let OpenAI write the perfect words for your occasion.",
    icon: "Sparkles",
    color: "text-amber-400",
  },
  {
    id: "templates",
    title: "100+ Curated Templates",
    description:
      "Hand-crafted templates designed specifically for each occasion — from elegant Eid cards to vibrant Holi greetings.",
    icon: "LayoutTemplate",
    color: "text-violet-400",
  },
  {
    id: "formats",
    title: "Multiple Output Formats",
    description:
      "Generate E-Cards for messaging apps, Posters for printing, or wide-format Banners for social media posts.",
    icon: "FileImage",
    color: "text-sky-400",
  },
  {
    id: "multilang",
    title: "Multi-Language Support",
    description:
      "Generate messages in Arabic, Urdu, English, Hindi, French and more. Greet your loved ones in their language.",
    icon: "Globe",
    color: "text-emerald-400",
  },
  {
    id: "instant",
    title: "Instant Generation",
    description:
      "Your personalized card is generated in seconds. No waiting, no queue — download and share immediately.",
    icon: "Zap",
    color: "text-yellow-400",
  },
  {
    id: "occasions",
    title: "Every Occasion Covered",
    description:
      "From religious festivals across cultures to personal milestones and corporate events — we have a card for it.",
    icon: "CalendarHeart",
    color: "text-rose-400",
  },
];

export const STATS = [
  { value: "100+", label: "Templates" },
  { value: "50+", label: "Occasions" },
  { value: "9", label: "Tone Styles" },
  { value: "∞", label: "Combinations" },
];

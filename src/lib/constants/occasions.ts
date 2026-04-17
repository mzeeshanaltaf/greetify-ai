export type OccasionCategory = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
  bgFrom: string;
  bgTo: string;
  templateCount: number;
  occasions: string[];
};

export const OCCASION_CATEGORIES: OccasionCategory[] = [
  {
    id: "religious",
    label: "Religious Festivals",
    emoji: "☪️",
    description: "Eid, Ramadan, Christmas, Diwali, Holi & more",
    color: "from-emerald-600 to-teal-700",
    bgFrom: "#065f46",
    bgTo: "#0f766e",
    templateCount: 24,
    occasions: ["Eid ul Fitr", "Eid ul Adha", "Ramadan", "Christmas", "Diwali", "Holi", "Easter"],
  },
  {
    id: "new-year",
    label: "New Year & Calendars",
    emoji: "🎆",
    description: "New Year, Lunar New Year, Independence Days",
    color: "from-violet-600 to-purple-800",
    bgFrom: "#4c1d95",
    bgTo: "#5b21b6",
    templateCount: 12,
    occasions: ["New Year", "Chinese New Year", "Independence Day", "Republic Day"],
  },
  {
    id: "love-family",
    label: "Love & Family",
    emoji: "❤️",
    description: "Valentine's, Mother's Day, Anniversary, Weddings",
    color: "from-rose-500 to-pink-700",
    bgFrom: "#9f1239",
    bgTo: "#be185d",
    templateCount: 18,
    occasions: ["Valentine's Day", "Mother's Day", "Father's Day", "Anniversary", "Wedding"],
  },
  {
    id: "milestones",
    label: "Personal Milestones",
    emoji: "🎂",
    description: "Birthdays, Graduation, Baby Shower, Retirement",
    color: "from-amber-500 to-orange-600",
    bgFrom: "#92400e",
    bgTo: "#c2410c",
    templateCount: 20,
    occasions: ["Birthday", "Baby Shower", "Graduation", "Retirement", "Housewarming"],
  },
  {
    id: "appreciation",
    label: "Appreciation Days",
    emoji: "🌟",
    description: "Teacher's Day, Boss Day, Nurses & Doctors Day",
    color: "from-sky-500 to-blue-700",
    bgFrom: "#0c4a6e",
    bgTo: "#1d4ed8",
    templateCount: 10,
    occasions: ["Teacher's Day", "Boss Day", "Employee Appreciation", "Nurses Day"],
  },
  {
    id: "social",
    label: "Social & Global Days",
    emoji: "🌍",
    description: "Women's Day, Earth Day, Friendship Day & more",
    color: "from-lime-500 to-green-700",
    bgFrom: "#14532d",
    bgTo: "#166534",
    templateCount: 8,
    occasions: ["Women's Day", "Earth Day", "Friendship Day", "Children's Day"],
  },
  {
    id: "corporate",
    label: "Business & Corporate",
    emoji: "💼",
    description: "Congratulations, Thank You, Welcome, Marketing",
    color: "from-slate-600 to-gray-800",
    bgFrom: "#1e293b",
    bgTo: "#334155",
    templateCount: 14,
    occasions: ["Congratulations", "Thank You", "Welcome", "Promotions"],
  },
];

export const TONE_OPTIONS = [
  { id: "emotional", label: "Emotional", emoji: "💝" },
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "funny", label: "Funny", emoji: "😄" },
  { id: "romantic", label: "Romantic", emoji: "💕" },
  { id: "islamic", label: "Islamic", emoji: "☪️" },
  { id: "inspirational", label: "Inspirational", emoji: "✨" },
  { id: "respectful", label: "Respectful", emoji: "🙏" },
  { id: "short", label: "Short & Sweet", emoji: "💫" },
  { id: "poetic", label: "Poetic", emoji: "📜" },
] as const;

export const OUTPUT_TYPES = [
  { id: "ecard", label: "E-Card", description: "Perfect for sharing digitally" },
  { id: "poster", label: "Poster", description: "Large format, ideal for printing" },
  { id: "flyer", label: "Flyer / Banner", description: "Wide format for social media" },
] as const;

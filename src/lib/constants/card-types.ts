export type CardTemplate = {
  id: string;
  label: string;
};

export type OccasionTemplates = {
  occasionId: string;
  occasionLabel: string;
  categoryId: string;
  templates: CardTemplate[];
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const raw: Array<{ category: string; occasion: string; templates: string[] }> = [
  { category: "religious", occasion: "Eid ul Fitr", templates: ["Elegant Islamic Card", "Moon & Lantern Card", "Family Greeting Card", "Kids Eid Card", "Corporate Eid Card", "Gold Luxury Card"] },
  { category: "religious", occasion: "Eid ul Adha", templates: ["Sacrifice Theme Card", "Family Blessings Card", "Charity Message Card"] },
  { category: "religious", occasion: "Ramadan", templates: ["Ramadan Mubarak Card", "Iftar Invitation", "Sehri Reminder Poster", "Mosque Theme Poster"] },
  { category: "religious", occasion: "Christmas", templates: ["Santa Theme", "Snow Theme", "Family Card", "Kids Cartoon Card", "Luxury Red & Gold"] },
  { category: "religious", occasion: "Easter", templates: ["Cross Theme", "Bunny Theme", "Floral Easter Card", "Family Greeting"] },
  { category: "religious", occasion: "Diwali", templates: ["Lights Theme", "Rangoli Theme", "Gold Festive Card"] },
  { category: "religious", occasion: "Holi", templates: ["Color Splash Card", "Party Invite", "Joyful Family Card"] },

  { category: "new-year", occasion: "New Year", templates: ["Fireworks Card", "Luxury Gold Card", "Corporate Greeting", "Motivation Poster", "Countdown Theme"] },
  { category: "new-year", occasion: "Chinese New Year", templates: ["Zodiac Theme", "Red Envelope Theme", "Dragon Theme"] },
  { category: "new-year", occasion: "Independence Day", templates: ["Flag Theme", "Patriotic Poster", "Hero Tribute Card"] },
  { category: "new-year", occasion: "Republic Day", templates: ["Government Style", "Public Celebration Poster"] },

  { category: "love-family", occasion: "Valentine's Day", templates: ["Romantic Card", "Cute Couple Card", "Minimal Love Card", "Funny Card"] },
  { category: "love-family", occasion: "Mother's Day", templates: ["Floral Card", "Thank You Mom", "Emotional Letter Card", "Elegant Gold Card"] },
  { category: "love-family", occasion: "Father's Day", templates: ["Hero Dad Card", "Vintage Card", "Funny Dad Card"] },
  { category: "love-family", occasion: "Parents Day", templates: ["Family Appreciation Card", "Elegant Family Card"] },
  { category: "love-family", occasion: "Anniversary", templates: ["Romantic Couple Card", "Golden Anniversary", "Photo Memory Card"] },
  { category: "love-family", occasion: "Wedding", templates: ["Congratulations Card", "Nikah Mubarak", "Elegant Invite"] },

  { category: "milestones", occasion: "Birthday", templates: ["Kids Birthday", "Adult Elegant", "Funny Birthday", "Photo Birthday Card", "Luxury Birthday"] },
  { category: "milestones", occasion: "Baby Shower", templates: ["Cute Baby Theme", "Gender Neutral Card"] },
  { category: "milestones", occasion: "Graduation", templates: ["Cap Theme", "Success Card", "Proud Parents Card"] },
  { category: "milestones", occasion: "Retirement", templates: ["Thank You Card", "Achievement Poster"] },
  { category: "milestones", occasion: "Housewarming", templates: ["New Home Card", "Blessing Card"] },

  { category: "appreciation", occasion: "Teacher's Day", templates: ["Chalkboard Theme", "Elegant Thanks Card", "Funny Teacher Card"] },
  { category: "appreciation", occasion: "Boss Day", templates: ["Corporate Thank You", "Respectful Card"] },
  { category: "appreciation", occasion: "Employee Appreciation", templates: ["Achievement Card", "Team Poster"] },
  { category: "appreciation", occasion: "Nurses Day", templates: ["Healthcare Tribute Card"] },
  { category: "appreciation", occasion: "Doctors Day", templates: ["Medical Appreciation Card"] },

  { category: "social", occasion: "Women's Day", templates: ["Empowerment Poster", "Elegant Greeting Card"] },
  { category: "social", occasion: "Earth Day", templates: ["Nature Poster", "Save Planet Card"] },
  { category: "social", occasion: "Friendship Day", templates: ["Best Friends Card", "Funny Friendship Card"] },
  { category: "social", occasion: "Children's Day", templates: ["Cartoon Card", "School Poster"] },
  { category: "social", occasion: "Labour Day", templates: ["Worker Tribute Poster"] },

  { category: "corporate", occasion: "Congratulations", templates: ["Achievement Card", "Promotion Card"] },
  { category: "corporate", occasion: "Thank You", templates: ["Client Thank You", "Customer Loyalty Card"] },
  { category: "corporate", occasion: "Welcome", templates: ["New Employee Welcome", "Client Welcome Card"] },
  { category: "corporate", occasion: "Sale / Marketing", templates: ["Discount Poster", "Festival Offer Poster"] },
];

export const OCCASION_TEMPLATES: OccasionTemplates[] = raw.map((r) => ({
  categoryId: r.category,
  occasionId: slug(r.occasion),
  occasionLabel: r.occasion,
  templates: r.templates.map((label) => ({ id: slug(label), label })),
}));

export function findOccasion(occasionId: string): OccasionTemplates | undefined {
  return OCCASION_TEMPLATES.find((o) => o.occasionId === occasionId);
}

export function findTemplate(
  occasionId: string,
  templateId: string,
): CardTemplate | undefined {
  return findOccasion(occasionId)?.templates.find((t) => t.id === templateId);
}

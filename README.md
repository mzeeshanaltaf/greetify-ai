# Greetify — AI-Crafted Cards for Every Celebration

Greetify is a full-stack web app that generates personalized greeting cards powered by **OpenAI's Next-Gen Image Model**. Pick an occasion, set the vibe, and get a ready-to-download card in seconds.

---

## Features

- **AI Card Generation** — OpenAI's image generation model draws a unique card for every request
- **Live Prompt Preview** — see exactly what's sent to the AI as you tweak settings
- **50+ Occasions** — Eid, Ramadan, Christmas, Diwali, birthdays, weddings, Valentine's Day, and more
- **3 Output Formats** — E-Card (1:1 square), Poster (3:4 portrait), Flyer (16:9 landscape)
- **9 Tones** — Emotional, Professional, Funny, Romantic, Islamic, Inspirational, Respectful, Short & Sweet, Poetic
- **6 Languages** — English, Arabic, Urdu, Hindi, French, Spanish
- **Custom Messages** — Add a recipient name, sender name, and personal message (up to 500 chars)
- **Card Library** — Save generated cards, browse your history, and re-use any card as a starting point
- **Stats Dashboard** — Track credits remaining, cards saved, total generated, and format breakdown
- **Credit System** — 5 free credits on sign-up; each generation spends 1 credit
- **Authentication** — Email/password + Google OAuth via Better Auth
- **Download** — Export any card as a PNG

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, Lucide Icons |
| AI | OpenAI Image API (`openai`, model: `gpt-image-1.5`) |
| Auth | Better Auth (email + Google OAuth) |
| Database | PostgreSQL + Drizzle ORM |
| Storage | Vercel Blob |
| Validation | Zod |
| Animation | Framer Motion |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/login & signup     # Auth pages (progressive form pattern)
│   ├── api/                      # API routes (generate, save, cards, auth-fallback)
│   ├── dashboard/                # Card generation UI
│   ├── library/                  # Saved cards browser
│   ├── stats/                    # Activity & credit stats
│   ├── about/, contact/, ...     # Marketing/legal pages
│   └── page.tsx                  # Landing page
├── components/
│   ├── auth/                     # LoginForm, SignupForm
│   ├── dashboard/                # DashboardNav, DashboardClient
│   ├── landing/                  # Navbar, Footer, hero sections
│   ├── library/                  # LibraryClient
│   ├── shared/                   # CreditsBadge, GradientButton
│   └── stats/                    # StatsClient
└── lib/
    ├── ai/                       # OpenAI prompt builder & image generator
    ├── auth/                     # Better Auth config + client
    ├── constants/                # Occasion templates catalogue
    ├── credits/                  # Credit deduction logic
    ├── db/                       # Drizzle schema, migrations, queries
    ├── storage/                  # Vercel Blob upload helpers
    └── validation/               # Zod schemas (cards, etc.)
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- OpenAI API key
- Google OAuth credentials (optional)
- Vercel Blob store (optional — for saving cards)

### Installation

```bash
git clone https://github.com/mzeeshanaltaf/greetify-ai.git
cd greetify-ai
npm install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/greetify

# Better Auth
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Vercel Blob (for saving card images)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### Database Setup

```bash
# Push schema to your database
npm run db:push

# Or generate and run migrations
npm run db:generate
npm run db:migrate
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:studio` | Open Drizzle Studio |

---

## How It Works

1. **Sign up** — get 5 free credits
2. **Choose** — select occasion, template, tone, language, and output format
3. **Personalise** — add recipient/sender names and a custom message
4. **Generate** — OpenAI's image model draws a card and returns it as a base64 PNG
5. **Save or Download** — save to your library or download the PNG immediately
6. **Reuse** — click any library card to pre-fill the form and iterate

---

## Deployment

Greetify is optimised for **Vercel**. Push to GitHub and import the repo on [vercel.com](https://vercel.com). Add all environment variables in the Vercel dashboard, then deploy.

---

## License

MIT

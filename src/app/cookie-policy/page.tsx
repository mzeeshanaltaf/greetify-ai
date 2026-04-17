import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy — Greetify",
  description: "How Greetify uses cookies and similar tracking technologies.",
};

const LAST_UPDATED = "April 15, 2026";

const cookieTypes = [
  {
    name: "Strictly Necessary",
    purpose: "Essential for the website to function. Cannot be disabled.",
    examples: "Session tokens, authentication cookies, CSRF protection",
    retention: "Session / up to 30 days",
  },
  {
    name: "Performance",
    purpose:
      "Help us understand how visitors interact with the site by collecting anonymous data.",
    examples: "Page view counts, load times, error reports",
    retention: "Up to 12 months",
  },
  {
    name: "Functional",
    purpose:
      "Remember your preferences to provide a more personalised experience.",
    examples: "Language preference, theme preference, dismissed banners",
    retention: "Up to 12 months",
  },
  {
    name: "Analytics",
    purpose: "Track aggregate usage to improve our features and content.",
    examples: "Anonymous analytics identifiers",
    retention: "Up to 24 months",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853] mb-3">
              Legal
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-[#0d0b18] mb-4"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Cookie Policy
            </h1>
            <p className="text-sm text-[#7a6f66]">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="space-y-10 text-[#3d3530]">
            <Section title="What Are Cookies?">
              <p>
                Cookies are small text files placed on your device when you visit a
                website. They are widely used to make websites work, or work more
                efficiently, as well as to provide information to website owners.
                Greetify uses cookies and similar technologies (such as local storage and
                session storage) to operate our service and improve your experience.
              </p>
            </Section>

            <Section title="Types of Cookies We Use">
              <p>The table below describes the categories of cookies we use:</p>
              <div className="mt-4 rounded-xl overflow-hidden border border-[#0d0b18]/10">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#0d0b18] text-[#f7f3ee]">
                      <th className="text-left px-4 py-3 font-semibold tracking-wide">Type</th>
                      <th className="text-left px-4 py-3 font-semibold tracking-wide">Purpose</th>
                      <th className="text-left px-4 py-3 font-semibold tracking-wide hidden sm:table-cell">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTypes.map((c, i) => (
                      <tr
                        key={c.name}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#f7f3ee]"}
                      >
                        <td className="px-4 py-3 font-semibold text-[#0d0b18] align-top whitespace-nowrap">
                          {c.name}
                        </td>
                        <td className="px-4 py-3 text-[#4a3f38] align-top leading-relaxed">
                          <p>{c.purpose}</p>
                          <p className="text-[#7a6f66] mt-1 italic">e.g. {c.examples}</p>
                        </td>
                        <td className="px-4 py-3 text-[#7a6f66] align-top hidden sm:table-cell whitespace-nowrap">
                          {c.retention}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Third-Party Cookies">
              <p>
                Some cookies on our site are set by third-party services. These include:
              </p>
              <ul>
                <li>
                  <strong>Google:</strong> Used for AI features (Gemini API). Google may
                  set their own cookies as part of API requests.
                </li>
                <li>
                  <strong>Vercel Analytics:</strong> Our hosting provider may collect
                  anonymised performance data.
                </li>
              </ul>
              <p>
                We do not control how third parties use cookies. Please refer to their
                respective privacy and cookie policies for details.
              </p>
            </Section>

            <Section title="How to Control Cookies">
              <p>You have the following options for managing cookies:</p>
              <ul>
                <li>
                  <strong>Browser settings:</strong> Most browsers allow you to refuse or
                  delete cookies through their settings. Consult your browser&apos;s help
                  documentation for specific instructions.
                </li>
                <li>
                  <strong>Opt-out tools:</strong> For analytics cookies, you can use
                  browser opt-out plugins provided by analytics vendors.
                </li>
                <li>
                  <strong>Do Not Track:</strong> Some browsers send a &ldquo;Do Not Track&rdquo;
                  signal. We respect this signal where technically feasible.
                </li>
              </ul>
              <p>
                Please note that disabling certain cookies may affect the functionality
                of our website and some features may not work as intended.
              </p>
            </Section>

            <Section title="Cookie Consent">
              <p>
                When you first visit Greetify, we will ask for your consent to place
                non-essential cookies on your device. You can withdraw your consent at
                any time by adjusting your browser cookie settings or contacting us.
              </p>
            </Section>

            <Section title="Updates to This Policy">
              <p>
                We may update this Cookie Policy periodically to reflect changes in
                technology, regulation, or our business practices. We will update the
                &ldquo;Last updated&rdquo; date when we do. Continued use of the site after changes
                constitutes acceptance.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have any questions about our use of cookies, please contact us at{" "}
                <a href="mailto:privacy@greetify.app" className="text-[#d4a853] hover:underline">
                  privacy@greetify.app
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="text-xl font-bold text-[#0d0b18] mb-3"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-[#4a3f38] leading-relaxed text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-[#0d0b18] [&_strong]:font-semibold">
        {children}
      </div>
    </div>
  );
}

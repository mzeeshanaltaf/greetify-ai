import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Greetify",
  description: "How Greetify collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "April 15, 2026";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-[#7a6f66]">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose-custom space-y-10 text-[#3d3530]">
            <Section title="1. Introduction">
              <p>
                Welcome to Greetify (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to protecting
                your personal information and your right to privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when
                you use our website and services.
              </p>
              <p>
                Please read this policy carefully. If you disagree with its terms, please
                discontinue use of our site.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We may collect information about you in a variety of ways:</p>
              <ul>
                <li>
                  <strong>Personal Data:</strong> Name and email address when you contact us
                  or create an account.
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent, referring URLs,
                  browser type, and device information — collected automatically via cookies
                  and similar technologies.
                </li>
                <li>
                  <strong>Card Content:</strong> The recipient name, occasion details, tone
                  preference, and any custom text you provide when generating a card. This
                  data is sent to Google Gemini AI to generate your card and is not stored
                  permanently on our servers unless you are a registered user.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Generate and deliver AI-powered greeting cards as requested</li>
                <li>Operate, maintain, and improve our services</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Send transactional emails (e.g., card delivery confirmations)</li>
                <li>Monitor usage patterns and diagnose technical problems</li>
                <li>Comply with applicable laws and legal obligations</li>
              </ul>
              <p>We do not sell, rent, or trade your personal information to third parties.</p>
            </Section>

            <Section title="4. Third-Party Services">
              <p>
                We use the following third-party services that may have access to certain
                data:
              </p>
              <ul>
                <li>
                  <strong>Google Gemini AI:</strong> Card content data is processed by
                  Google&apos;s Gemini API. Refer to Google&apos;s Privacy Policy for their data
                  handling practices.
                </li>
                <li>
                  <strong>Vercel:</strong> Our hosting provider. Vercel may log request
                  metadata for operational purposes.
                </li>
                <li>
                  <strong>Analytics tools:</strong> We may use anonymised analytics to
                  understand traffic patterns.
                </li>
              </ul>
            </Section>

            <Section title="5. Cookies">
              <p>
                We use cookies and similar tracking technologies to enhance your experience.
                You can instruct your browser to refuse all cookies or to indicate when a
                cookie is being sent. However, some features of our service may not function
                properly without cookies. See our{" "}
                <a href="/cookie-policy" className="text-[#d4a853] hover:underline">
                  Cookie Policy
                </a>{" "}
                for details.
              </p>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain personal data only as long as necessary to fulfil the purposes
                outlined in this policy, unless a longer retention period is required by law.
                Contact form submissions are retained for up to 12 months. Account data is
                retained for the lifetime of the account.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability (receive your data in a machine-readable format)</li>
              </ul>
              <p>
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@greetify.app" className="text-[#d4a853] hover:underline">
                  privacy@greetify.app
                </a>
                .
              </p>
            </Section>

            <Section title="8. Security">
              <p>
                We implement industry-standard security measures including HTTPS encryption,
                access controls, and regular security reviews. However, no method of
                transmission over the Internet is 100% secure. We cannot guarantee absolute
                security of your information.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Our services are not directed to individuals under the age of 13. We do not
                knowingly collect personal information from children. If you believe we have
                inadvertently collected such information, please contact us immediately.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of
                significant changes by updating the &ldquo;Last updated&rdquo; date at the top of this
                page. Your continued use of our services after any changes constitutes your
                acceptance of the updated policy.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                If you have questions or concerns about this Privacy Policy, please contact
                us at:{" "}
                <a href="mailto:privacy@greetify.app" className="text-[#d4a853] hover:underline">
                  privacy@greetify.app
                </a>
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

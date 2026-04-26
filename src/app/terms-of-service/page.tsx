import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Greetify",
  description: "The terms and conditions governing your use of Greetify.",
};

const LAST_UPDATED = "April 15, 2026";

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-[#7a6f66]">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="space-y-10 text-[#3d3530]">
            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using Greetify (&ldquo;the Service&rdquo;), you agree to be bound
                by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to all of these
                Terms, you may not use the Service. These Terms apply to all visitors,
                users, and others who access or use the Service.
              </p>
            </Section>

            <Section title="2. Description of Service">
              <p>
                Greetify is an AI-powered greeting card generation platform that allows
                users to create personalised digital greeting cards for various occasions
                using OpenAI&apos;s image generation model. The Service enables users to generate card text,
                select templates, and download or share the resulting cards.
              </p>
            </Section>

            <Section title="3. User Accounts">
              <ul>
                <li>
                  You must provide accurate, complete, and current information when
                  creating an account.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of your account
                  credentials.
                </li>
                <li>
                  You are responsible for all activity that occurs under your account.
                </li>
                <li>
                  You must notify us immediately of any unauthorised use of your account.
                </li>
                <li>
                  You must be at least 13 years old to create an account.
                </li>
              </ul>
            </Section>

            <Section title="4. Acceptable Use">
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Generate content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                <li>Infringe any intellectual property rights of any party</li>
                <li>Transmit any malware, viruses, or disruptive code</li>
                <li>Engage in automated scraping, crawling, or data mining without our written consent</li>
                <li>Attempt to gain unauthorised access to any part of the Service</li>
                <li>Impersonate any person or entity</li>
                <li>Use the Service for any commercial purpose without prior written approval</li>
              </ul>
            </Section>

            <Section title="5. AI-Generated Content">
              <p>
                The Service uses artificial intelligence to generate card content. You
                acknowledge that:
              </p>
              <ul>
                <li>AI-generated content may not always be accurate or appropriate for every context</li>
                <li>You are responsible for reviewing generated content before sharing or distributing it</li>
                <li>We do not guarantee the suitability of AI-generated content for any specific purpose</li>
                <li>Content generated using the Service may not be claimed as original creative work for copyright purposes</li>
              </ul>
            </Section>

            <Section title="6. Intellectual Property">
              <p>
                The Service and its original content (excluding user-submitted data and
                AI-generated outputs), features, and functionality are and will remain the
                exclusive property of Greetify. Our trademarks and trade dress may not be
                used in connection with any product or service without the prior written
                consent of Greetify.
              </p>
              <p>
                Card templates and design assets used in the Service are licensed for
                personal, non-commercial use. Commercial use of generated cards may require
                a Pro subscription.
              </p>
            </Section>

            <Section title="7. Free and Pro Plans">
              <p>
                The Service offers a free tier and a paid Pro tier. The free tier includes
                limited card generations per month. Pro tier benefits include unlimited
                generations and access to premium templates. Pricing and features are
                subject to change with reasonable notice.
              </p>
              <p>
                All payments are processed securely by our payment provider. Subscriptions
                renew automatically unless cancelled before the renewal date.
              </p>
            </Section>

            <Section title="8. Disclaimers">
              <p>
                THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT
                LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted, error-free, or
                free of viruses or other harmful components.
              </p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, GREETIFY SHALL NOT BE LIABLE FOR
                ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF OR
                INABILITY TO USE THE SERVICE.
              </p>
            </Section>

            <Section title="10. Termination">
              <p>
                We reserve the right to suspend or terminate your access to the Service at
                any time, with or without cause, with or without notice, effective
                immediately. Upon termination, your right to use the Service will
                immediately cease.
              </p>
            </Section>

            <Section title="11. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws
                of the jurisdiction in which Greetify operates, without regard to conflict
                of law provisions.
              </p>
            </Section>

            <Section title="12. Changes to Terms">
              <p>
                We reserve the right to modify these Terms at any time. We will provide
                notice of significant changes by updating the &ldquo;Last updated&rdquo; date. Your
                continued use of the Service after changes constitutes acceptance of the
                new Terms.
              </p>
            </Section>

            <Section title="13. Contact">
              <p>
                Questions about these Terms should be directed to:{" "}
                <a href="mailto:legal@greetify.app" className="text-[#d4a853] hover:underline">
                  legal@greetify.app
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

import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ContactForm from "@/components/landing/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Greetify",
  description: "Get in touch with the Greetify team. We'd love to hear from you.",
};

const ERROR_MESSAGES: Record<string, string> = {
  fields: "Please fill in all fields.",
  email: "Please enter a valid email address.",
  length: "Message must be 1000 characters or fewer.",
  webhook: "Something went wrong. Please try again.",
  server: "Internal server error. Please try again later.",
  parse: "Invalid submission. Please try again.",
};

interface Props {
  searchParams: Promise<{ sent?: string; error?: string }>;
}

export default async function ContactPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;
  const initialError = error ? (ERROR_MESSAGES[error] ?? "Something went wrong. Please try again.") : undefined;

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-xl mx-auto px-6 py-20">
          <ContactForm initialSuccess={!!sent} initialError={initialError} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

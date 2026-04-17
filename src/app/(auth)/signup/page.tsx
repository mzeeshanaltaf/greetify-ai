import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SignupForm from "@/components/auth/SignupForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create your account — Greetify",
  description: "Sign up to start creating AI-powered greeting cards.",
};

const ERROR_MESSAGES: Record<string, string> = {
  fields: "Please fill in all fields.",
  parse: "Invalid submission. Please try again.",
  exists: "An account with that email already exists. Try signing in.",
  server: "Something went wrong. Please try again.",
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function SignupPage({ searchParams }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) redirect("/dashboard");

  const { error } = await searchParams;
  const initialError = error
    ? (ERROR_MESSAGES[error] ?? "Something went wrong. Please try again.")
    : undefined;

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-md mx-auto px-6 py-16">
          <SignupForm initialError={initialError} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

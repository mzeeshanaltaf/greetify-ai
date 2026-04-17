import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LoginForm from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in — Greetify",
  description: "Sign in to your Greetify account.",
};

const ERROR_MESSAGES: Record<string, string> = {
  fields: "Please enter your email and password.",
  parse: "Invalid submission. Please try again.",
  credentials: "Invalid email or password.",
  server: "Something went wrong. Please try again.",
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
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
          <LoginForm initialError={initialError} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

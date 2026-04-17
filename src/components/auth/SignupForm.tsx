"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth/client";

interface Props {
  initialError?: string;
}

export default function SignupForm({ initialError }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">(
    initialError ? "error" : "idle",
  );
  const [errorMsg, setErrorMsg] = useState(initialError ?? "");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const n = name.trim();
    const em = email.trim();
    const pw = password;

    if (!n || !em || !pw) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (pw.length < 8) {
      setStatus("error");
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    setStatus("loading");
    const { error } = await authClient.signUp.email({
      name: n,
      email: em,
      password: pw,
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message ?? "Could not create account. Please try again.");
      return;
    }
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <form
      action="/api/auth-fallback/signup"
      method="post"
      onSubmit={handleSubmit}
      noValidate
      className="w-full"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#c49240] flex items-center justify-center shadow-[0_0_24px_rgba(212,168,83,0.45)] mb-5">
          <Sparkles className="w-5 h-5 text-[#0d0b18]" />
        </div>
        <h1
          className="text-3xl font-bold text-[#0d0b18]"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Create your account
        </h1>
        <p className="text-sm text-[#7a6f66] mt-2">
          Start designing cards that actually feel personal.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading || status === "loading"}
        className="flex items-center justify-center gap-3 w-full h-11 rounded-full bg-white border border-[#0d0b18]/15 text-sm font-semibold text-[#0d0b18] hover:bg-[#0d0b18]/[0.03] disabled:opacity-50 transition-all cursor-pointer"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 48 48" aria-hidden>
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.5-5.9 8-11.3 8a12 12 0 1 1 0-24 12 12 0 0 1 8.5 3.5l5.7-5.7A20 20 0 1 0 24 44a20 20 0 0 0 19.6-16.3c.3-1.2.4-2.4.4-3.7 0-1.2-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3.2 0 6.1 1.2 8.5 3.5l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44a20 20 0 0 0 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.2-.1-2.3-.4-3.5z"/>
          </svg>
        )}
        Continue with Google
      </button>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-[#0d0b18]/10" />
        <span className="text-xs uppercase tracking-wider text-[#7a6f66]/60">or</span>
        <div className="h-px flex-1 bg-[#0d0b18]/10" />
      </div>

      <label htmlFor="signup-name" className="text-sm font-semibold text-[#3d3530]">
        Full Name
      </label>
      <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-[#0d0b18]/15 rounded-full focus-within:ring-2 focus-within:ring-[#d4a853]/50 focus-within:border-[#d4a853] transition-all overflow-hidden bg-white">
        <User className="w-4 h-4 text-[#7a6f66] shrink-0" />
        <input
          id="signup-name"
          name="name"
          type="text"
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-full px-3 w-full outline-none bg-transparent text-sm text-[#0d0b18] placeholder-[#7a6f66]/50"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </div>

      <label htmlFor="signup-email" className="text-sm font-semibold text-[#3d3530]">
        Email Address
      </label>
      <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-[#0d0b18]/15 rounded-full focus-within:ring-2 focus-within:ring-[#d4a853]/50 focus-within:border-[#d4a853] transition-all overflow-hidden bg-white">
        <Mail className="w-4 h-4 text-[#7a6f66] shrink-0" />
        <input
          id="signup-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-full px-3 w-full outline-none bg-transparent text-sm text-[#0d0b18] placeholder-[#7a6f66]/50"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <label htmlFor="signup-password" className="text-sm font-semibold text-[#3d3530]">
        Password
      </label>
      <div className="flex items-center mt-2 mb-2 h-11 pl-3 border border-[#0d0b18]/15 rounded-full focus-within:ring-2 focus-within:ring-[#d4a853]/50 focus-within:border-[#d4a853] transition-all overflow-hidden bg-white">
        <Lock className="w-4 h-4 text-[#7a6f66] shrink-0" />
        <input
          id="signup-password"
          name="password"
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-full px-3 w-full outline-none bg-transparent text-sm text-[#0d0b18] placeholder-[#7a6f66]/50"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          required
        />
      </div>
      <p className="text-xs text-[#7a6f66]/70 mb-5 pl-3">
        Minimum 8 characters.
      </p>

      {status === "error" && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs mb-4">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || googleLoading}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#d4a853] to-[#c49240] text-[#0d0b18] font-bold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:enabled:shadow-[0_4px_20px_rgba(212,168,83,0.4)] cursor-pointer"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating account…
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <p className="text-sm text-center text-[#7a6f66] mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-[#d4a853] font-semibold hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

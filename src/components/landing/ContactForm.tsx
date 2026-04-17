"use client";

import { useState, useEffect } from "react";
import { User, Mail, MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  initialSuccess?: boolean;
  initialError?: string;
}

export default function ContactForm({ initialSuccess = false, initialError }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    initialSuccess ? "success" : initialError ? "error" : "idle"
  );
  const [errorMsg, setErrorMsg] = useState(initialError ?? "");

  useEffect(() => {
    console.log("[ContactForm] mounted – React hydration OK");
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("[ContactForm] handleSubmit fired");

    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();

    if (!n || !em || !msg) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, email: em, message: msg }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Failed to send message. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2
          className="text-2xl font-bold text-[#0d0b18] mb-2"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Message Sent!
        </h2>
        <p className="text-[#7a6f66] mb-8">
          Your message has been received. We&apos;ll get back to you as soon as possible.
        </p>
        <a
          href="/"
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-[#d4a853] to-[#c49240] text-[#0d0b18] text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col items-center text-sm text-[#0d0b18]"
    >
      <p className="text-xs bg-[#d4a853]/15 text-[#a07830] font-semibold px-3 py-1 rounded-full">
        Contact Us
      </p>
      <h1
        className="text-4xl font-bold py-4 text-center text-[#0d0b18]"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Let&apos;s Get In Touch.
      </h1>
      <p className="text-[#7a6f66] pb-10 text-center text-sm">
        Or reach out directly at{" "}
        <a href="mailto:hello@greetify.app" className="text-[#d4a853] hover:underline">
          hello@greetify.app
        </a>
      </p>

      <div className="w-full">
        {/* Full Name */}
        <label htmlFor="contact-name" className="font-semibold text-[#3d3530]">
          Full Name
        </label>
        <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-[#0d0b18]/15 rounded-full focus-within:ring-2 focus-within:ring-[#d4a853]/50 focus-within:border-[#d4a853] transition-all overflow-hidden bg-white">
          <User className="w-4 h-4 text-[#7a6f66] shrink-0" />
          <input
            id="contact-name"
            name="name"
            type="text"
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-full px-3 w-full outline-none bg-transparent text-[#0d0b18] placeholder-[#7a6f66]/50"
            placeholder="Enter your full name"
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <label htmlFor="contact-email" className="font-semibold text-[#3d3530]">
          Email Address
        </label>
        <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-[#0d0b18]/15 rounded-full focus-within:ring-2 focus-within:ring-[#d4a853]/50 focus-within:border-[#d4a853] transition-all overflow-hidden bg-white">
          <Mail className="w-4 h-4 text-[#7a6f66] shrink-0" />
          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-full px-3 w-full outline-none bg-transparent text-[#0d0b18] placeholder-[#7a6f66]/50"
            placeholder="Enter your email address"
            autoComplete="email"
          />
        </div>

        {/* Message */}
        <label htmlFor="contact-message" className="font-semibold text-[#3d3530]">
          Message
        </label>
        <div className="flex mt-2 mb-1 p-3 border border-[#0d0b18]/15 rounded-2xl focus-within:ring-2 focus-within:ring-[#d4a853]/50 focus-within:border-[#d4a853] transition-all bg-white">
          <MessageSquare className="w-4 h-4 text-[#7a6f66] shrink-0 mt-0.5" />
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 bg-transparent outline-none resize-none text-[#0d0b18] placeholder-[#7a6f66]/50"
            placeholder="Enter your message"
          />
        </div>
        <div className="flex justify-end mb-4">
          <span className={`text-[10px] ${message.length >= 900 ? "text-[#e86f4e]" : "text-[#7a6f66]/40"}`}>
            {message.length}/1000
          </span>
        </div>

        {/* Error */}
        {status === "error" && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 mt-1 w-full py-3 rounded-full bg-linear-to-r from-[#d4a853] to-[#c49240] text-[#0d0b18] font-bold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:enabled:shadow-[0_4px_20px_rgba(212,168,83,0.4)] cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit Form
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

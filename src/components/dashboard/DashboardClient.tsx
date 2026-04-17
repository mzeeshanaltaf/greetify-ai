"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  Check,
  Download,
  Save,
  RefreshCw,
  Zap,
} from "lucide-react";
import { OCCASION_TEMPLATES } from "@/lib/constants/card-types";
import {
  TONES,
  OUTPUT_TYPES,
  LANGUAGES,
  type Tone,
  type OutputType,
  type Language,
} from "@/lib/validation/cards";
import CreditsBadge from "@/components/shared/CreditsBadge";

interface Props {
  userName: string;
  initialCredits: number;
}

const TONE_LABELS: Record<Tone, string> = {
  emotional: "Emotional",
  professional: "Professional",
  funny: "Funny",
  romantic: "Romantic",
  islamic: "Islamic",
  inspirational: "Inspirational",
  respectful: "Respectful",
  short: "Short & Sweet",
  poetic: "Poetic",
};

const OUTPUT_LABELS: Record<OutputType, { label: string; ratio: string }> = {
  ecard: { label: "E-Card", ratio: "1:1 square" },
  poster: { label: "Poster", ratio: "3:4 portrait" },
  flyer: { label: "Flyer", ratio: "16:9 landscape" },
};

const LANGUAGE_LABELS: Record<Language, string> = {
  english: "English",
  arabic: "Arabic",
  urdu: "Urdu",
  hindi: "Hindi",
  french: "French",
  spanish: "Spanish",
};

type GenerateResult = {
  imageBase64: string;
  promptUsed: string;
};

export default function DashboardClient({ userName, initialCredits }: Props) {
  const [occasion, setOccasion] = useState(OCCASION_TEMPLATES[0].occasionId);
  const templates = useMemo(
    () => OCCASION_TEMPLATES.find((o) => o.occasionId === occasion)?.templates ?? [],
    [occasion],
  );
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "");
  const [tone, setTone] = useState<Tone>("emotional");
  const [outputType, setOutputType] = useState<OutputType>("ecard");
  const [language, setLanguage] = useState<Language>("english");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const [credits, setCredits] = useState(initialCredits);

  const [status, setStatus] = useState<"idle" | "generating" | "saving" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Prefill form from ?from=<cardId> — read from window to avoid useSearchParams/Suspense
  useEffect(() => {
    const fromId = new URLSearchParams(window.location.search).get("from");
    if (!fromId) return;
    fetch(`/api/cards/${fromId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.card) return;
        const c = data.card;
        if (c.occasion) {
          setOccasion(c.occasion);
          const nextTemplates =
            OCCASION_TEMPLATES.find((o) => o.occasionId === c.occasion)?.templates ?? [];
          setTemplateId(nextTemplates.find((t) => t.id === c.templateId)?.id ?? nextTemplates[0]?.id ?? "");
        }
        if (c.tone) setTone(c.tone as Tone);
        if (c.outputType) setOutputType(c.outputType as OutputType);
        if (c.language) setLanguage(c.language as Language);
        if (c.recipientName) setRecipientName(c.recipientName);
        if (c.senderName) setSenderName(c.senderName);
        if (c.customMessage) setCustomMessage(c.customMessage);
      })
      .catch(() => null);
  }, []);

  const handleOccasionChange = (id: string) => {
    setOccasion(id);
    const next = OCCASION_TEMPLATES.find((o) => o.occasionId === id)?.templates ?? [];
    setTemplateId(next[0]?.id ?? "");
  };

  const handleGenerate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!templateId) {
      setStatus("error");
      setErrorMsg("Please choose a template.");
      return;
    }
    if (credits === 0) {
      setStatus("error");
      setErrorMsg("You're out of credits. Upgrade to Pro for unlimited cards.");
      return;
    }
    setStatus("generating");
    setErrorMsg("");
    setSavedId(null);

    const payload = {
      occasion,
      templateId,
      tone,
      outputType,
      language,
      recipientName: recipientName.trim() || undefined,
      senderName: senderName.trim() || undefined,
      customMessage: customMessage.trim() || undefined,
    };

    try {
      const res = await fetch("/api/cards/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      // Handle out-of-credits (402) — covers race conditions from other tabs
      if (res.status === 402 || data.code === "out_of_credits") {
        setCredits(0);
        setStatus("error");
        setErrorMsg(data.message ?? "You're out of credits.");
        return;
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Failed to generate card.");
      }

      setResult({ imageBase64: data.imageBase64, promptUsed: data.promptUsed });
      setStatus("idle");

      // Sync credit balance from server response
      if (typeof data.creditsRemaining === "number") {
        setCredits(data.creditsRemaining);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setStatus("saving");
    setErrorMsg("");

    const payload = {
      occasion,
      templateId,
      tone,
      outputType,
      language,
      recipientName: recipientName.trim() || undefined,
      senderName: senderName.trim() || undefined,
      customMessage: customMessage.trim() || undefined,
      imageBase64: result.imageBase64,
      promptUsed: result.promptUsed,
    };

    try {
      const res = await fetch("/api/cards/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Failed to save card.");
      }
      setSavedId(data.id);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Could not save card.");
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${result.imageBase64}`;
    a.download = `greetify-${occasion}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setResult(null);
    setSavedId(null);
    setStatus("idle");
    setErrorMsg("");
  };

  const generating = status === "generating";
  const saving = status === "saving";
  const outOfCredits = credits === 0;

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d4a853]">
            Dashboard
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0d0b18] mt-2"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Welcome back, {userName.split(" ")[0]}.
          </h1>
          <p className="text-sm text-[#7a6f66] mt-2 max-w-xl">
            Pick an occasion, set the vibe, and let Gemini draw a card worth keeping.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <CreditsBadge credits={credits} className="text-sm px-3 py-1.5" />
        </div>
      </div>

      {/* Out-of-credits banner */}
      {outOfCredits && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
          <Zap className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            You&apos;re out of credits.{" "}
            <a
              href="/#pricing"
              className="underline underline-offset-2 hover:text-amber-900 font-semibold"
            >
              Upgrade to Pro →
            </a>
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <form
          onSubmit={handleGenerate}
          className="lg:col-span-3 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#0d0b18]/8 p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Occasion">
              <Select
                value={occasion}
                onChange={(e) => handleOccasionChange(e.target.value)}
              >
                {OCCASION_TEMPLATES.map((o) => (
                  <option key={o.occasionId} value={o.occasionId}>
                    {o.occasionLabel}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Template">
              <Select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Tone">
              <Select value={tone} onChange={(e) => setTone(e.target.value as Tone)}>
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {TONE_LABELS[t]}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Language">
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {LANGUAGE_LABELS[l]}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="mt-5">
            <span className="text-sm font-semibold text-[#3d3530]">Format</span>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {OUTPUT_TYPES.map((type) => {
                const active = outputType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOutputType(type)}
                    className={`flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? "border-[#d4a853] bg-[#d4a853]/10 shadow-[0_0_0_3px_rgba(212,168,83,0.15)]"
                        : "border-[#0d0b18]/15 hover:border-[#0d0b18]/30"
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#0d0b18]">
                      {OUTPUT_LABELS[type].label}
                    </span>
                    <span className="text-xs text-[#7a6f66]">
                      {OUTPUT_LABELS[type].ratio}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <Field label="Recipient (optional)">
              <Input
                value={recipientName}
                maxLength={120}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Fatima"
              />
            </Field>
            <Field label="From (optional)">
              <Input
                value={senderName}
                maxLength={120}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Ahmed"
              />
            </Field>
          </div>

          <div className="mt-5">
            <span className="text-sm font-semibold text-[#3d3530]">
              Custom message (optional)
            </span>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Anything specific you want the card to say…"
              className="mt-2 w-full rounded-xl border border-[#0d0b18]/15 bg-white px-4 py-3 text-sm text-[#0d0b18] placeholder-[#7a6f66]/50 outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/40 resize-none transition-all"
            />
            <p className="text-[11px] text-[#7a6f66]/70 mt-1">
              {customMessage.length}/500
            </p>
          </div>

          {status === "error" && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs mt-4">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {errorMsg}
                {status === "error" && errorMsg.includes("credits") && (
                  <>
                    {" "}
                    <a
                      href="/#pricing"
                      className="underline font-semibold"
                    >
                      Upgrade to Pro →
                    </a>
                  </>
                )}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={generating || saving || outOfCredits}
            className="flex items-center justify-center gap-2 w-full mt-6 py-3 rounded-full bg-gradient-to-r from-[#d4a853] to-[#c49240] text-[#0d0b18] font-bold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:enabled:shadow-[0_4px_20px_rgba(212,168,83,0.4)] cursor-pointer"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating…
              </>
            ) : outOfCredits ? (
              <>
                <Zap className="w-4 h-4" />
                No Credits Left
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Card
              </>
            )}
          </button>
        </form>

        {/* Preview */}
        <aside className="lg:col-span-2">
          <div className="sticky top-24 bg-[#0d0b18] rounded-2xl border border-[#d4a853]/20 shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#d4a853]">
                Preview
              </h2>
              {result && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-[#f7f3ee]/60 hover:text-[#f7f3ee] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>

            <div className="aspect-square rounded-xl bg-[#f7f3ee]/5 border border-[#f7f3ee]/10 overflow-hidden flex items-center justify-center relative">
              {generating && (
                <div className="flex flex-col items-center gap-3 text-[#f7f3ee]/60">
                  <Loader2 className="w-8 h-8 animate-spin text-[#d4a853]" />
                  <span className="text-xs tracking-wide">
                    Drawing something special…
                  </span>
                </div>
              )}
              {!generating && result && (
                <img
                  src={`data:image/png;base64,${result.imageBase64}`}
                  alt="Generated card preview"
                  className="w-full h-full object-contain"
                />
              )}
              {!generating && !result && (
                <div className="text-center px-6">
                  <Sparkles className="w-7 h-7 text-[#d4a853]/70 mx-auto mb-2" />
                  <p className="text-xs text-[#f7f3ee]/50 max-w-[200px]">
                    Your card will appear here once generated.
                  </p>
                </div>
              )}
            </div>

            {result && (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !!savedId}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#d4a853]/15 border border-[#d4a853]/40 text-[#d4a853] text-sm font-semibold hover:bg-[#d4a853]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving…
                    </>
                  ) : savedId ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved to library
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save to library
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#f7f3ee]/15 text-[#f7f3ee]/80 text-sm font-semibold hover:bg-[#f7f3ee]/5 hover:text-[#f7f3ee] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col">
      <span className="text-sm font-semibold text-[#3d3530]">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return (
    <select
      {...rest}
      className={`w-full h-11 rounded-full border border-[#0d0b18]/15 bg-white pl-4 pr-9 text-sm text-[#0d0b18] outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/40 transition-all cursor-pointer appearance-none bg-no-repeat bg-[length:16px_16px] bg-[position:right_14px_center] ${className ?? ""}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%237a6f66'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/></svg>\")",
      }}
    />
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      type={rest.type ?? "text"}
      className={`w-full h-11 rounded-full border border-[#0d0b18]/15 bg-white px-4 text-sm text-[#0d0b18] placeholder-[#7a6f66]/50 outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/40 transition-all ${className ?? ""}`}
    />
  );
}

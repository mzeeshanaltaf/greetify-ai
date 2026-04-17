import type { GenerateCardInput } from "@/lib/validation/cards";
import { findOccasion, findTemplate } from "@/lib/constants/card-types";

const TONE_LABELS: Record<string, string> = {
  emotional: "emotional and heartfelt",
  professional: "professional and polished",
  funny: "playful and humorous",
  romantic: "romantic and tender",
  islamic: "respectful Islamic, spiritually uplifting",
  inspirational: "inspirational and motivating",
  respectful: "respectful and dignified",
  short: "short, sweet, and punchy",
  poetic: "poetic and lyrical",
};

const LANGUAGE_LABELS: Record<string, string> = {
  english: "English",
  arabic: "Arabic (Modern Standard Arabic, right-to-left script)",
  urdu: "Urdu (Nastaʿlīq script, right-to-left)",
  hindi: "Hindi (Devanagari script)",
  french: "French",
  spanish: "Spanish",
};

export function describeInput(input: GenerateCardInput) {
  const occasion = findOccasion(input.occasion);
  const template = findTemplate(input.occasion, input.templateId);
  const occasionLabel = occasion?.occasionLabel ?? input.occasion;
  const templateLabel = template?.label ?? input.templateId;
  const toneLabel = TONE_LABELS[input.tone] ?? input.tone;
  const languageLabel = LANGUAGE_LABELS[input.language] ?? input.language;

  const recipient = input.recipientName?.trim() || "a loved one";
  const sender = input.senderName?.trim() || "a friend";
  const customMessage =
    input.customMessage?.trim() ||
    `a heartfelt ${toneLabel} greeting appropriate for ${occasionLabel}`;

  return {
    occasionLabel,
    templateLabel,
    toneLabel,
    languageLabel,
    recipient,
    sender,
    customMessage,
  };
}

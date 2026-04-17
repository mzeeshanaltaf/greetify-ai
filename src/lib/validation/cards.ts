import { z } from "zod";

export const TONES = [
  "emotional",
  "professional",
  "funny",
  "romantic",
  "islamic",
  "inspirational",
  "respectful",
  "short",
  "poetic",
] as const;

export const OUTPUT_TYPES = ["ecard", "poster", "flyer"] as const;

export const LANGUAGES = [
  "english",
  "arabic",
  "urdu",
  "hindi",
  "french",
  "spanish",
] as const;

export type Tone = (typeof TONES)[number];
export type OutputType = (typeof OUTPUT_TYPES)[number];
export type Language = (typeof LANGUAGES)[number];

export const GenerateCardSchema = z.object({
  occasion: z.string().min(1).max(64),
  templateId: z.string().min(1).max(64),
  tone: z.enum(TONES),
  outputType: z.enum(OUTPUT_TYPES),
  language: z.enum(LANGUAGES).default("english"),
  recipientName: z.string().trim().max(120).optional(),
  senderName: z.string().trim().max(120).optional(),
  customMessage: z.string().trim().max(500).optional(),
});

export type GenerateCardInput = z.infer<typeof GenerateCardSchema>;

export const SaveCardSchema = GenerateCardSchema.extend({
  imageBase64: z.string().min(100),
  promptUsed: z.string().min(1),
});

export type SaveCardInput = z.infer<typeof SaveCardSchema>;

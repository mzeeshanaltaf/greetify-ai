import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "./prompts";
import type { GenerateCardInput } from "@/lib/validation/cards";

const MODEL = "gemini-3.1-flash-image-preview";

let client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI {
  if (!client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

export interface GeneratedCard {
  imageBase64: string;
  promptUsed: string;
}

export async function generateCard(
  input: GenerateCardInput,
): Promise<GeneratedCard> {
  const prompt = buildPrompt(input);
  const ai = getClient();

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      return { imageBase64: part.inlineData.data, promptUsed: prompt };
    }
  }

  throw new Error("Gemini returned no image data");
}

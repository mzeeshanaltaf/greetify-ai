import OpenAI from "openai";
import { buildPrompt } from "./prompts";
import type { GenerateCardInput, OutputType } from "@/lib/validation/cards";

const MODEL = "gpt-image-2";

const SIZE_BY_OUTPUT: Record<OutputType, "1024x1024" | "1024x1536" | "1536x1024"> = {
  ecard: "1024x1024",
  poster: "1024x1536",
  flyer: "1536x1024",
};

let client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");
    client = new OpenAI();
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

  const result = await ai.images.generate({
    model: MODEL,
    prompt,
    size: SIZE_BY_OUTPUT[input.outputType],
    quality: "medium",
    n: 1,
  });

  const b64 = result.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI returned no image data");

  return { imageBase64: b64, promptUsed: prompt };
}

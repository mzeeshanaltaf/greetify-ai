import type { GenerateCardInput } from "@/lib/validation/cards";
import { buildECardPrompt } from "./ecard";
import { buildPosterPrompt } from "./poster";
import { buildFlyerPrompt } from "./flyer";

export function buildPrompt(input: GenerateCardInput): string {
  switch (input.outputType) {
    case "ecard":
      return buildECardPrompt(input);
    case "poster":
      return buildPosterPrompt(input);
    case "flyer":
      return buildFlyerPrompt(input);
  }
}

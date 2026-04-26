import type { GenerateCardInput } from "@/lib/validation/cards";
import { describeInput, buildPersonalisation } from "./shared";

export function buildECardPrompt(input: GenerateCardInput): string {
  const d = describeInput(input);
  const personalisation = buildPersonalisation(
    d,
    "Incorporate this personal message directly into the card's composition:",
  );
  const namesRequirement = (d.recipient || d.sender)
    ? "\n- The greeting and recipient/sender names must be rendered legibly as part of the image — not as empty caption space."
    : "";

  return `Create a digital greeting e-card for ${d.occasionLabel} rendered in the "${d.templateLabel}" visual style.

Tone: ${d.toneLabel}.
Language for any rendered text on the image: ${d.languageLabel}.
${personalisation}Design requirements:
- 1:1 square aspect ratio, optimized for social sharing (Instagram, WhatsApp, Messenger).${namesRequirement}
- Typography should be beautiful and culturally appropriate for ${d.occasionLabel} in ${d.languageLabel}.
- Commit fully to the "${d.templateLabel}" aesthetic — no generic stock-photo look, no AI slop.
- Use color, composition, and iconography that unmistakably evoke ${d.occasionLabel}.
- No watermarks, no placeholder text, no "sample" markings.`;
}

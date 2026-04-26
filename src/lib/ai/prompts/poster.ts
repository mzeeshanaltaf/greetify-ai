import type { GenerateCardInput } from "@/lib/validation/cards";
import { describeInput, buildPersonalisation } from "./shared";

export function buildPosterPrompt(input: GenerateCardInput): string {
  const d = describeInput(input);
  const personalisation = buildPersonalisation(
    d,
    "Incorporate this personal message prominently in the poster layout:",
  );

  return `Create a printable greeting poster for ${d.occasionLabel} rendered in the "${d.templateLabel}" visual style.

Tone: ${d.toneLabel}.
Language for any rendered text on the image: ${d.languageLabel}.
${personalisation}Design requirements:
- 3:4 portrait aspect ratio, print-ready at high resolution (A4/Letter proportions).
- A clear focal hierarchy: dominant headline, supporting greeting body, and refined names block.
- Typography must be print-quality: crisp, kerned, legible from across a room.
- Commit fully to the "${d.templateLabel}" aesthetic — rich, intentional, no AI slop.
- Use generous margins, balanced whitespace, and decorative accents that suit ${d.occasionLabel}.
- No watermarks, no bleed markers, no placeholder or sample text.`;
}

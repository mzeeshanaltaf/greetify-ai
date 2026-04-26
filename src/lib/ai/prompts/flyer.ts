import type { GenerateCardInput } from "@/lib/validation/cards";
import { describeInput, buildPersonalisation } from "./shared";

export function buildFlyerPrompt(input: GenerateCardInput): string {
  const d = describeInput(input);
  const personalisation = buildPersonalisation(
    d,
    "Incorporate this personal message directly in the banner layout:",
  );

  return `Create a wide greeting flyer/banner for ${d.occasionLabel} rendered in the "${d.templateLabel}" visual style.

Tone: ${d.toneLabel}.
Language for any rendered text on the image: ${d.languageLabel}.
${personalisation}Design requirements:
- 16:9 landscape aspect ratio, sized for social banners, cover images, and event headers.
- A strong horizontal composition with clear left-to-right visual flow (or right-to-left for Arabic/Urdu).
- Typography must feel custom and editorial — no generic sans-serif, no default system fonts.
- Commit fully to the "${d.templateLabel}" aesthetic — decisive, intentional, no AI slop.
- Leave breathing room but fill the frame with purposeful design that evokes ${d.occasionLabel}.
- No watermarks, no cropping guides, no placeholder text.`;
}

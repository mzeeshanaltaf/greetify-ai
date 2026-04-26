import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guard";
import { GenerateCardSchema } from "@/lib/validation/cards";
import { generateCard } from "@/lib/ai/openai";
import { deductCredit, refundCredit } from "@/lib/credits/deduct";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { user, response } = await requireUser(req);
  if (!user) return response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = GenerateCardSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request.",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  // Deduct 1 credit atomically before calling OpenAI
  const newBalance = await deductCredit(user.id);
  if (newBalance === null) {
    return NextResponse.json(
      {
        success: false,
        code: "out_of_credits",
        message:
          "You're out of credits. Upgrade to Pro for unlimited cards.",
      },
      { status: 402 },
    );
  }

  try {
    const { imageBase64, promptUsed } = await generateCard(parsed.data);
    return NextResponse.json({
      success: true,
      imageBase64,
      promptUsed,
      input: parsed.data,
      creditsRemaining: newBalance,
    });
  } catch (err) {
    // Refund the credit if generation failed
    await refundCredit(user.id);
    console.error("[cards/generate] gemini error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error ? err.message : "Failed to generate card.",
      },
      { status: 502 },
    );
  }
}

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guard";
import { SaveCardSchema } from "@/lib/validation/cards";
import { uploadCardImage } from "@/lib/storage/blob";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";

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

  const parsed = SaveCardSchema.safeParse(body);
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

  const input = parsed.data;

  try {
    const imageUrl = await uploadCardImage(user.id, input.imageBase64);
    const [inserted] = await db
      .insert(cards)
      .values({
        userId: user.id,
        occasion: input.occasion,
        templateId: input.templateId,
        tone: input.tone,
        outputType: input.outputType,
        language: input.language,
        recipientName: input.recipientName,
        senderName: input.senderName,
        customMessage: input.customMessage,
        promptUsed: input.promptUsed,
        imageUrl,
      })
      .returning({ id: cards.id, imageUrl: cards.imageUrl, createdAt: cards.createdAt });

    return NextResponse.json({ success: true, ...inserted });
  } catch (err) {
    console.error("[cards/save] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save card." },
      { status: 500 },
    );
  }
}

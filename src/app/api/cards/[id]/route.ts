import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { requireUser } from "@/lib/auth/guard";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { deleteCardImage } from "@/lib/storage/blob";

export const runtime = "nodejs";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { user, response } = await requireUser(req);
  if (!user) return response;

  const { id } = await params;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  const [card] = await db
    .select()
    .from(cards)
    .where(and(eq(cards.id, id), eq(cards.userId, user.id)))
    .limit(1);

  if (!card) {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, card });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { user, response } = await requireUser(req);
  if (!user) return response;

  const { id } = await params;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  const [card] = await db
    .select({ id: cards.id, imageUrl: cards.imageUrl })
    .from(cards)
    .where(and(eq(cards.id, id), eq(cards.userId, user.id)))
    .limit(1);

  if (!card) {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  try {
    await deleteCardImage(card.imageUrl);
  } catch (err) {
    console.error("[cards/delete] blob delete failed:", err);
  }

  await db.delete(cards).where(and(eq(cards.id, id), eq(cards.userId, user.id)));

  return new NextResponse(null, { status: 204 });
}

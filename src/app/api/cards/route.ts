import { NextResponse } from "next/server";
import { and, desc, eq, lt } from "drizzle-orm";
import { requireUser } from "@/lib/auth/guard";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";

export const runtime = "nodejs";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export async function GET(req: Request) {
  const { user, response } = await requireUser(req);
  if (!user) return response;

  const { searchParams } = new URL(req.url);
  const limitParam = Number(searchParams.get("limit") ?? DEFAULT_LIMIT);
  const limit = Math.min(
    Math.max(Number.isFinite(limitParam) ? limitParam : DEFAULT_LIMIT, 1),
    MAX_LIMIT,
  );
  const cursor = searchParams.get("cursor");

  const where = cursor
    ? and(eq(cards.userId, user.id), lt(cards.createdAt, new Date(cursor)))
    : eq(cards.userId, user.id);

  const rows = await db
    .select()
    .from(cards)
    .where(where)
    .orderBy(desc(cards.createdAt))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore ? items[items.length - 1].createdAt.toISOString() : null;

  return NextResponse.json({ success: true, items, nextCursor });
}

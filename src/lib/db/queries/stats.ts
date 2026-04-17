import { eq, desc, count, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { cards, user } from "@/lib/db/schema";
import { OCCASION_TEMPLATES } from "@/lib/constants/card-types";
import type { Card } from "@/lib/db/schema";

export interface UserStats {
  totalSaved: number;
  byOutputType: { ecard: number; poster: number; flyer: number };
  topOccasion: { id: string; label: string; count: number } | null;
  credits: number;
}

export async function getUserStats(userId: string): Promise<UserStats> {
  // Credits
  const [userRow] = await db
    .select({ credits: user.credits })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  const credits = userRow?.credits ?? 0;

  // Total saved + by output type
  const typeCounts = await db
    .select({
      outputType: cards.outputType,
      cnt: count(),
    })
    .from(cards)
    .where(eq(cards.userId, userId))
    .groupBy(cards.outputType);

  const byOutputType = { ecard: 0, poster: 0, flyer: 0 };
  let totalSaved = 0;
  for (const row of typeCounts) {
    const n = Number(row.cnt);
    totalSaved += n;
    if (row.outputType === "ecard") byOutputType.ecard = n;
    else if (row.outputType === "poster") byOutputType.poster = n;
    else if (row.outputType === "flyer") byOutputType.flyer = n;
  }

  // Top occasion
  const occasionRows = await db
    .select({
      occasion: cards.occasion,
      cnt: count(),
    })
    .from(cards)
    .where(eq(cards.userId, userId))
    .groupBy(cards.occasion)
    .orderBy(sql`count(*) desc`)
    .limit(1);

  let topOccasion: UserStats["topOccasion"] = null;
  if (occasionRows[0]) {
    const occ = occasionRows[0];
    const label =
      OCCASION_TEMPLATES.find((o) => o.occasionId === occ.occasion)?.occasionLabel ??
      occ.occasion;
    topOccasion = { id: occ.occasion, label, count: Number(occ.cnt) };
  }

  return { totalSaved, byOutputType, topOccasion, credits };
}

export async function getRecentCards(userId: string, limit = 6): Promise<Card[]> {
  return db
    .select()
    .from(cards)
    .where(eq(cards.userId, userId))
    .orderBy(desc(cards.createdAt))
    .limit(limit);
}

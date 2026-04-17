import { eq, and, gt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

/**
 * Atomically deduct 1 credit from a user's balance.
 * Returns the new balance on success, or null if the user was already at 0.
 */
export async function deductCredit(userId: string): Promise<number | null> {
  const [row] = await db
    .update(user)
    .set({ credits: sql`${user.credits} - 1` })
    .where(and(eq(user.id, userId), gt(user.credits, 0)))
    .returning({ credits: user.credits });
  return row?.credits ?? null;
}

/**
 * Compensating update — add 1 credit back when generation fails after deduction.
 */
export async function refundCredit(userId: string): Promise<void> {
  await db
    .update(user)
    .set({ credits: sql`${user.credits} + 1` })
    .where(eq(user.id, userId));
}

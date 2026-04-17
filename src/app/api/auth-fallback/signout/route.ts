import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await auth.api.signOut({ headers: req.headers });
  } catch (err) {
    console.error("[auth-fallback/signout] error:", err);
  }
  return NextResponse.redirect(new URL("/", req.url), 303);
}

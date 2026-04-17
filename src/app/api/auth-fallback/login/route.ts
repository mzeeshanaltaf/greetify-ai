import { NextResponse } from "next/server";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const fd = await req.formData().catch(() => null);
  if (!fd) {
    return NextResponse.redirect(new URL("/login?error=parse", req.url), 303);
  }

  const email = String(fd.get("email") ?? "").trim();
  const password = String(fd.get("password") ?? "");

  if (!email || !password) {
    return NextResponse.redirect(new URL("/login?error=fields", req.url), 303);
  }

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: req.headers,
      asResponse: false,
      returnHeaders: false,
    });
    return NextResponse.redirect(new URL("/dashboard", req.url), 303);
  } catch (err) {
    console.error("[auth-fallback/login] error:", err);
    const code = err instanceof APIError ? "credentials" : "server";
    return NextResponse.redirect(
      new URL(`/login?error=${code}`, req.url),
      303,
    );
  }
}

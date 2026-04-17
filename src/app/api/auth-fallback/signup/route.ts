import { NextResponse } from "next/server";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const fd = await req.formData().catch(() => null);
  if (!fd) {
    return NextResponse.redirect(new URL("/signup?error=parse", req.url), 303);
  }

  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const password = String(fd.get("password") ?? "");

  if (!name || !email || !password) {
    return NextResponse.redirect(new URL("/signup?error=fields", req.url), 303);
  }

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: req.headers,
      asResponse: false,
      returnHeaders: false,
    });
    return NextResponse.redirect(new URL("/dashboard", req.url), 303);
  } catch (err) {
    console.error("[auth-fallback/signup] error:", err);
    const code =
      err instanceof APIError && err.status === "UNPROCESSABLE_ENTITY"
        ? "exists"
        : "server";
    return NextResponse.redirect(
      new URL(`/signup?error=${code}`, req.url),
      303,
    );
  }
}

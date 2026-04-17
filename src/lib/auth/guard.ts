import { NextResponse } from "next/server";
import { auth } from "./index";

export async function requireUser(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return {
      user: null as null,
      response: NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      ),
    };
  }
  return { user: session.user, response: null as null };
}

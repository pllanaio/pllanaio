import { NextResponse } from "next/server";
import { enforceRateLimit, getClientIp } from "@/lib/website-check/rate-limit";
import { verifyEncryptedToken } from "@/lib/website-check/tokens";
import type { MarketingConfirmationPayload } from "@/lib/website-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cookieName = "website_check_doi";

export async function GET(request: Request) {
  const destination = new URL("/website-check/confirm-marketing", request.url);
  try {
    await enforceRateLimit(`doi-prepare:ip:${getClientIp(request)}`, 20, 60 * 60 * 1000);
    const token = new URL(request.url).searchParams.get("token");
    verifyEncryptedToken<MarketingConfirmationPayload>(token, "website-check-marketing-confirmation");
    const response = NextResponse.redirect(destination, 303);
    response.cookies.set(cookieName, token!, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/api/website-check/confirm-marketing",
      maxAge: 15 * 60,
    });
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch {
    destination.searchParams.set("invalid", "1");
    return NextResponse.redirect(destination, 303);
  }
}

import { NextResponse } from "next/server";
import { confirmMarketingContact } from "@/lib/website-check/mail";
import { enforceRateLimit } from "@/lib/website-check/rate-limit";
import { verifySignedToken } from "@/lib/website-check/tokens";
import type { MarketingConfirmationPayload } from "@/lib/website-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const destination = new URL("/website-check", request.url);
  try {
    const token = new URL(request.url).searchParams.get("token") || "";
    const payload = verifySignedToken<MarketingConfirmationPayload>(token, "website-check-marketing-confirmation");
    await enforceRateLimit(`doi:${payload.jti}`, 1, 365 * 24 * 60 * 60 * 1000);
    await confirmMarketingContact(payload);
    destination.searchParams.set("marketing", "confirmed");
  } catch {
    destination.searchParams.set("marketing", "invalid");
  }
  return NextResponse.redirect(destination, 303);
}

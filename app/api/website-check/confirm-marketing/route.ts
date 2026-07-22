import { NextResponse } from "next/server";
import { confirmMarketingContact } from "@/lib/website-check/mail";
import { enforceRateLimit, getClientIp } from "@/lib/website-check/rate-limit";
import { claimIdempotencyKey } from "@/lib/website-check/idempotency";
import { WebsiteCheckError } from "@/lib/website-check/errors";
import { verifyEncryptedToken } from "@/lib/website-check/tokens";
import { assertSameOrigin } from "@/lib/website-check/request-guards";
import type { MarketingConfirmationPayload } from "@/lib/website-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cookieName = "website_check_doi";

export async function POST(request: Request) {
  const destination = new URL("/website-check", request.url);
  try {
    assertSameOrigin(request);
    await enforceRateLimit(`doi:ip:${getClientIp(request)}`, 10, 60 * 60 * 1000);
    const cookieHeader = request.headers.get("cookie") || "";
    const token = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
    const payload = verifyEncryptedToken<MarketingConfirmationPayload>(token, "website-check-marketing-confirmation");
    const claim = await claimIdempotencyKey(`doi:${payload.jti}`, 5 * 60 * 1000, 365 * 24 * 60 * 60 * 1000);
    try {
      await confirmMarketingContact(payload);
      await claim.complete();
      destination.searchParams.set("marketing", "confirmed");
    } catch (error) {
      await claim.release();
      throw error;
    }
  } catch (error) {
    destination.searchParams.set("marketing", error instanceof WebsiteCheckError && error.code === "ALREADY_PROCESSED" ? "confirmed" : "invalid");
  }
  const response = NextResponse.redirect(destination, 303);
  response.cookies.set(cookieName, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/api/website-check/confirm-marketing", maxAge: 0 });
  return response;
}

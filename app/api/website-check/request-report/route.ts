import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { validateReportLead } from "@/lib/website-check/lead";
import { sendReportEmails } from "@/lib/website-check/mail";
import { enforceRateLimit, getClientIp } from "@/lib/website-check/rate-limit";
import { verifyEncryptedToken } from "@/lib/website-check/tokens";
import { assertJsonRequest, assertSameOrigin, isHoneypotTriggered, readJsonObject } from "@/lib/website-check/request-guards";
import { verifyOptionalBotProtection } from "@/lib/website-check/bot-protection";
import { toPublicError, WebsiteCheckError } from "@/lib/website-check/errors";
import type { AnalysisTokenPayload } from "@/lib/website-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hash = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 24);

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertJsonRequest(request);
    const ip = getClientIp(request);
    await enforceRateLimit(`report:ip:${ip}`, 6, 60 * 60 * 1000);

    const body = await readJsonObject(request, 16_384);
    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ ok: true, marketingConfirmationSent: false });
    }

    await verifyOptionalBotProtection(body.turnstileToken, ip);
    const lead = validateReportLead(body);
    const token = typeof body.analysisToken === "string" ? body.analysisToken : "";
    if (!token) throw new WebsiteCheckError("MISSING_ANALYSIS", "Bitte führen Sie den Website-Check erneut aus.", 400);

    const payload = verifyEncryptedToken<AnalysisTokenPayload>(token, "website-check-analysis");
    const result = payload.analysis;
    await enforceRateLimit(`report:email:${hash(lead.email)}`, 3, 24 * 60 * 60 * 1000);
    await enforceRateLimit(`report:analysis:${result.id}`, 2, 30 * 60 * 1000);

    const delivery = await sendReportEmails(lead, result, token);
    return NextResponse.json({
      ok: true,
      marketingConfirmationSent: delivery.marketingConfirmationSent,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const publicError = toPublicError(error);
    return NextResponse.json(publicError.body, { status: publicError.status, headers: { "Cache-Control": "no-store" } });
  }
}

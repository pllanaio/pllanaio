import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/website-check/pagespeed";
import { enforceRateLimit, getClientIp } from "@/lib/website-check/rate-limit";
import { createSignedToken } from "@/lib/website-check/tokens";
import { normalizeAndValidateWebsiteUrl } from "@/lib/website-check/url-security";
import { assertJsonRequest, assertSameOrigin, readJsonObject } from "@/lib/website-check/request-guards";
import { toPublicError, WebsiteCheckError } from "@/lib/website-check/errors";
import type { AnalysisTokenPayload, WebsiteCheckStrategy } from "@/lib/website-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertJsonRequest(request);
    const ip = getClientIp(request);
    await enforceRateLimit(`analysis:ip:${ip}`, 8, 10 * 60 * 1000);

    const body = await readJsonObject(request, 4_096);
    const strategy: WebsiteCheckStrategy = body.strategy === "desktop" ? "desktop" : "mobile";
    if (body.strategy !== undefined && body.strategy !== "mobile" && body.strategy !== "desktop") {
      throw new WebsiteCheckError("INVALID_STRATEGY", "Bitte wählen Sie Mobile oder Desktop aus.", 400);
    }

    const validated = await normalizeAndValidateWebsiteUrl(body.url);
    await enforceRateLimit(`analysis:domain:${validated.domain}`, 4, 15 * 60 * 1000);

    const { result, cacheHit } = await analyzeWebsite(validated.normalizedUrl, strategy);
    const payload: AnalysisTokenPayload = { purpose: "website-check-analysis", analysis: result };
    const analysisToken = createSignedToken(payload, 30 * 24 * 60 * 60);

    return NextResponse.json(
      { ok: true, result, analysisToken, cacheHit },
      { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } },
    );
  } catch (error) {
    const publicError = toPublicError(error);
    return NextResponse.json(publicError.body, {
      status: publicError.status,
      headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
    });
  }
}

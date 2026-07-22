import { NextResponse } from "next/server";
import { getStoredWebsiteCheckResult } from "@/lib/website-check/pagespeed";
import { verifySignedToken } from "@/lib/website-check/tokens";
import { toPublicError, WebsiteCheckError } from "@/lib/website-check/errors";
import type { AnalysisTokenPayload } from "@/lib/website-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const token = new URL(request.url).searchParams.get("token");
    let result = getStoredWebsiteCheckResult(id);

    if (!result && token) {
      const payload = verifySignedToken<AnalysisTokenPayload>(token, "website-check-analysis");
      if (payload.analysis.id !== id) {
        throw new WebsiteCheckError("RESULT_NOT_FOUND", "Das Analyseergebnis ist nicht mehr verfügbar.", 404);
      }
      result = payload.analysis;
    }

    if (!result) {
      throw new WebsiteCheckError("RESULT_NOT_FOUND", "Das Analyseergebnis ist nicht mehr verfügbar.", 404);
    }

    return NextResponse.json({ ok: true, result }, {
      headers: { "Cache-Control": "private, max-age=60", "X-Robots-Tag": "noindex" },
    });
  } catch (error) {
    const publicError = toPublicError(error);
    return NextResponse.json(publicError.body, { status: publicError.status, headers: { "Cache-Control": "no-store" } });
  }
}

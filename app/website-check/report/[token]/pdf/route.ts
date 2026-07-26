import { createWebsiteReportPdf } from "@/lib/website-check/report-pdf";
import { verifyEncryptedToken } from "@/lib/website-check/tokens";
import type { AnalysisTokenPayload } from "@/lib/website-check/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeFilename(domain: string) {
  return domain.toLowerCase().replace(/[^a-z0-9.-]+/g, "-").replace(/^-+|-+$/g, "") || "website";
}

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await context.params;
    const payload = verifyEncryptedToken<AnalysisTokenPayload>(token, "website-check-analysis");
    const pdf = createWebsiteReportPdf(payload.analysis);

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="website-report-${safeFilename(payload.analysis.domain)}.pdf"`,
        "Content-Length": String(pdf.byteLength),
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new Response("Der PDF-Report ist nicht verfügbar oder der Link ist abgelaufen.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }
}

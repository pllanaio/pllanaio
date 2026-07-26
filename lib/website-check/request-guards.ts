import { WebsiteCheckError } from "./errors";

function firstForwardedValue(value: string | null) {
  return value?.split(",")[0]?.trim() || "";
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return;

  const configured = process.env.NEXT_PUBLIC_SITE_URL || "https://pllana.io";
  const configuredHost = new URL(configured).host;
  const forwardedHost = firstForwardedValue(request.headers.get("x-forwarded-host"));
  const requestHost = request.headers.get("host") || "";
  const canonicalHostname = configuredHost.split(":")[0];
  const alternateHostname = canonicalHostname.startsWith("www.")
    ? canonicalHostname.slice(4)
    : `www.${canonicalHostname}`;

  const allowedHosts = new Set([
    configuredHost,
    canonicalHostname,
    alternateHostname,
    forwardedHost,
    requestHost,
  ].filter(Boolean));

  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new WebsiteCheckError("INVALID_ORIGIN", "Die Anfrage konnte nicht verarbeitet werden.", 403);
  }

  if (!allowedHosts.has(originHost)) {
    throw new WebsiteCheckError("INVALID_ORIGIN", "Die Anfrage konnte nicht verarbeitet werden.", 403);
  }
}

export function assertJsonRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new WebsiteCheckError("UNSUPPORTED_CONTENT_TYPE", "Die Anfrage konnte nicht verarbeitet werden.", 415);
  }
}

export async function readJsonObject(request: Request, maxBytes = 16_384) {
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > maxBytes) {
    throw new WebsiteCheckError("REQUEST_TOO_LARGE", "Die Anfrage ist zu groß.", 413);
  }

  const text = await request.text();
  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    throw new WebsiteCheckError("REQUEST_TOO_LARGE", "Die Anfrage ist zu groß.", 413);
  }

  try {
    const parsed = JSON.parse(text) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Expected object");
    }
    return parsed as Record<string, unknown>;
  } catch {
    throw new WebsiteCheckError("INVALID_JSON", "Die Anfrage enthält keine gültigen Formulardaten.", 400);
  }
}

export function isHoneypotTriggered(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

import { WebsiteCheckError } from "./errors";

interface TurnstileResponse {
  success?: boolean;
}

export async function verifyOptionalBotProtection(token: unknown, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return;
  if (typeof token !== "string" || !token.trim()) {
    throw new WebsiteCheckError("BOT_VERIFICATION_REQUIRED", "Bitte bestätigen Sie, dass Sie kein automatisiertes Programm sind.", 400);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const body = new URLSearchParams({ secret, response: token.trim() });
    if (remoteIp !== "unknown") body.set("remoteip", remoteIp);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: controller.signal,
      cache: "no-store",
    });
    const result = await response.json().catch(() => null) as TurnstileResponse | null;
    if (!response.ok || !result?.success) {
      throw new WebsiteCheckError("BOT_VERIFICATION_FAILED", "Die Sicherheitsprüfung war nicht erfolgreich. Bitte versuchen Sie es erneut.", 400);
    }
  } catch (error) {
    if (error instanceof WebsiteCheckError) throw error;
    throw new WebsiteCheckError("BOT_VERIFICATION_UNAVAILABLE", "Die Sicherheitsprüfung ist momentan nicht verfügbar.", 503);
  } finally {
    clearTimeout(timeout);
  }
}

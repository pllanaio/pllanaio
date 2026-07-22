import { createHash } from "node:crypto";
import { WebsiteCheckError } from "./errors";

type Bucket = { count: number; resetAt: number };
type RateLimitGlobal = typeof globalThis & { __websiteCheckRateLimits?: Map<string, Bucket> };

const globalState = globalThis as RateLimitGlobal;
const buckets = globalState.__websiteCheckRateLimits ?? new Map<string, Bucket>();
globalState.__websiteCheckRateLimits = buckets;

function anonymizedKey(key: string) {
  const salt = process.env.WEBSITE_CHECK_TOKEN_SECRET || process.env.PAGESPEED_API_KEY || "website-check";
  return `website-check:${createHash("sha256").update(`${salt}:${key}`).digest("hex")}`;
}

async function enforceDistributedRateLimit(key: string, limit: number, windowMs: number) {
  const baseUrl = process.env.WEBSITE_CHECK_KV_REST_URL?.replace(/\/$/, "");
  const token = process.env.WEBSITE_CHECK_KV_REST_TOKEN;
  if (!baseUrl || !token) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2_500);
  try {
    const response = await fetch(`${baseUrl}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", anonymizedKey(key)],
        ["PEXPIRE", anonymizedKey(key), windowMs],
      ]),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`KV ${response.status}`);
    const data = await response.json() as Array<{ result?: number }>;
    const count = Number(data?.[0]?.result ?? 0);
    if (count > limit) {
      throw new WebsiteCheckError("RATE_LIMITED", "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut.", 429);
    }
    return true;
  } catch (error) {
    if (error instanceof WebsiteCheckError) throw error;
    console.error("Distributed website-check rate limit unavailable");
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function enforceRateLimit(key: string, limit: number, windowMs: number) {
  if (await enforceDistributedRateLimit(key, limit, windowMs)) return;

  const safeKey = anonymizedKey(key);
  const now = Date.now();
  const current = buckets.get(safeKey);
  if (!current || current.resetAt <= now) {
    buckets.set(safeKey, { count: 1, resetAt: now + windowMs });
    return;
  }
  if (current.count >= limit) {
    throw new WebsiteCheckError("RATE_LIMITED", "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut.", 429);
  }
  current.count += 1;
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

import { createHash, randomBytes } from "node:crypto";
import { WebsiteCheckError } from "./errors";

type ClaimStatus = "processing" | "confirmed";
type ClaimEntry = { status: ClaimStatus; expiresAt: number };
type IdempotencyGlobal = typeof globalThis & { __websiteCheckIdempotency?: Map<string, ClaimEntry> };

const globalState = globalThis as IdempotencyGlobal;
const claims = globalState.__websiteCheckIdempotency ?? new Map<string, ClaimEntry>();
globalState.__websiteCheckIdempotency = claims;
const processSalt = randomBytes(32).toString("hex");

function safeKey(key: string) {
  const salt = process.env.WEBSITE_CHECK_TOKEN_SECRET || processSalt;
  return `website-check-idempotency:${createHash("sha256").update(`${salt}:${key}`).digest("hex")}`;
}

async function kvPipeline(commands: unknown[][]) {
  const baseUrl = process.env.WEBSITE_CHECK_KV_REST_URL?.replace(/\/$/, "");
  const token = process.env.WEBSITE_CHECK_KV_REST_TOKEN;
  if (!baseUrl || !token) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2_500);
  try {
    const response = await fetch(`${baseUrl}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) throw new Error("KV request failed");
    return await response.json() as Array<{ result?: unknown }>;
  } catch {
    console.error("Distributed website-check idempotency unavailable");
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function claimIdempotencyKey(key: string, processingTtlMs: number, confirmedTtlMs: number) {
  const keyHash = safeKey(key);
  const distributed = await kvPipeline([["SET", keyHash, "processing", "NX", "PX", processingTtlMs]]);
  if (distributed) {
    if (distributed[0]?.result !== "OK") {
      throw new WebsiteCheckError("ALREADY_PROCESSED", "Diese Bestätigung wurde bereits verarbeitet.", 409);
    }
    return {
      complete: async () => { await kvPipeline([["SET", keyHash, "confirmed", "PX", confirmedTtlMs]]); },
      release: async () => { await kvPipeline([["DEL", keyHash]]); },
    };
  }

  const now = Date.now();
  const current = claims.get(keyHash);
  if (current && current.expiresAt > now) {
    throw new WebsiteCheckError("ALREADY_PROCESSED", "Diese Bestätigung wurde bereits verarbeitet.", 409);
  }
  claims.set(keyHash, { status: "processing", expiresAt: now + processingTtlMs });
  return {
    complete: async () => { claims.set(keyHash, { status: "confirmed", expiresAt: Date.now() + confirmedTtlMs }); },
    release: async () => { claims.delete(keyHash); },
  };
}

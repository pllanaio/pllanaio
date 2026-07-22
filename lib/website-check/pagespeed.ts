import { normalizeAndValidateWebsiteUrl } from "./url-security";
import { fetchPageSpeed } from "./pagespeed-client";
import { parsePageSpeedResponse } from "./pagespeed-parser";
import type { WebsiteCheckResult, WebsiteCheckStrategy } from "./types";

const CACHE_TTL_MS = 15 * 60 * 1000;
const RESULT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type CacheEntry = { expiresAt: number; result: WebsiteCheckResult };
type WebsiteCheckGlobal = typeof globalThis & {
  __websiteCheckCache?: Map<string, CacheEntry>;
  __websiteCheckInflight?: Map<string, Promise<WebsiteCheckResult>>;
  __websiteCheckResults?: Map<string, CacheEntry>;
};

const globalState = globalThis as WebsiteCheckGlobal;
const cache = globalState.__websiteCheckCache ?? new Map<string, CacheEntry>();
const inflight = globalState.__websiteCheckInflight ?? new Map<string, Promise<WebsiteCheckResult>>();
const results = globalState.__websiteCheckResults ?? new Map<string, CacheEntry>();
globalState.__websiteCheckCache = cache;
globalState.__websiteCheckInflight = inflight;
globalState.__websiteCheckResults = results;

async function runAnalysis(input: unknown, strategy: WebsiteCheckStrategy) {
  const initial = await normalizeAndValidateWebsiteUrl(input);
  await normalizeAndValidateWebsiteUrl(initial.normalizedUrl);
  const response = await fetchPageSpeed(initial.normalizedUrl, strategy);
  const finalUrl = response.lighthouseResult?.finalUrl || response.id;
  if (finalUrl) await normalizeAndValidateWebsiteUrl(finalUrl);
  return parsePageSpeedResponse(response, initial.normalizedUrl, initial.domain, strategy);
}

function cleanExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of cache) if (entry.expiresAt <= now) cache.delete(key);
  for (const [key, entry] of results) if (entry.expiresAt <= now) results.delete(key);
}

export async function analyzeWebsite(input: unknown, strategy: WebsiteCheckStrategy) {
  cleanExpiredEntries();
  const normalized = await normalizeAndValidateWebsiteUrl(input);
  const key = `${strategy}:${normalized.normalizedUrl}`;
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) return { result: cached.result, cacheHit: true };

  const pending = inflight.get(key);
  if (pending) return { result: await pending, cacheHit: true };

  const promise = runAnalysis(normalized.normalizedUrl, strategy);
  inflight.set(key, promise);
  try {
    const result = await promise;
    cache.set(key, { result, expiresAt: Date.now() + CACHE_TTL_MS });
    results.set(result.id, { result, expiresAt: Date.now() + RESULT_TTL_MS });
    return { result, cacheHit: false };
  } finally {
    inflight.delete(key);
  }
}

export function getStoredWebsiteCheckResult(id: string) {
  cleanExpiredEntries();
  return results.get(id)?.result ?? null;
}

export { fetchPageSpeed } from "./pagespeed-client";
export { parsePageSpeedResponse } from "./pagespeed-parser";
export type { PageSpeedResponse } from "./pagespeed-parser";

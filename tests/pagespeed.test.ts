import assert from "node:assert/strict";
import test from "node:test";
import { WebsiteCheckError } from "../lib/website-check/errors";
import { fetchPageSpeed, parsePageSpeedResponse, type PageSpeedResponse } from "../lib/website-check/pagespeed";

const fixture: PageSpeedResponse = {
  id: "https://example.com/",
  lighthouseResult: {
    finalUrl: "https://example.com/",
    fetchTime: "2026-07-22T08:00:00.000Z",
    categories: {
      performance: { score: 0.86 },
      accessibility: { score: 0.94 },
      "best-practices": { score: 0.78 },
      seo: { score: 0.91 },
    },
    audits: {
      "largest-contentful-paint": { numericValue: 3100 },
      "first-contentful-paint": { numericValue: 1700 },
      "speed-index": { numericValue: 3600 },
      "total-blocking-time": { numericValue: 280 },
      "cumulative-layout-shift": { numericValue: 0.08 },
      "unused-javascript": { score: 0.6, details: { overallSavingsMs: 350 } },
      "image-alt": { score: 1 },
    },
  },
};

test("scales Lighthouse scores and creates a usable result", () => {
  const result = parsePageSpeedResponse(fixture, "https://example.com/", "example.com", "mobile");
  assert.equal(result.scores.performance.value, 86);
  assert.equal(result.scores.accessibility.value, 94);
  assert.equal(result.strategy, "mobile");
  assert.equal(result.metrics.length, 5);
  assert.ok(result.findings.length >= 1);
});

test("handles a missing category without inventing a score", () => {
  const response = structuredClone(fixture);
  delete response.lighthouseResult?.categories?.seo;
  const result = parsePageSpeedResponse(response, "https://example.com/", "example.com", "desktop");
  assert.equal(result.scores.seo.value, null);
  assert.equal(result.scores.seo.status, "unavailable");
});

test("falls back to lab data when field data is absent", () => {
  const result = parsePageSpeedResponse(fixture, "https://example.com/", "example.com", "mobile");
  assert.equal(result.fieldDataAvailable, false);
  assert.equal(result.metrics[0].source, "lab");
  assert.equal(result.metrics.some((metric) => metric.label === "Interaction to Next Paint"), false);
  assert.equal(result.metrics.some((metric) => metric.label === "Total Blocking Time"), true);
});

test("uses field INP when Google returns it", () => {
  const response = structuredClone(fixture);
  response.loadingExperience = { metrics: { INTERACTION_TO_NEXT_PAINT: { percentile: 180, category: "FAST" } } };
  const result = parsePageSpeedResponse(response, "https://example.com/", "example.com", "mobile");
  assert.equal(result.fieldDataAvailable, true);
  assert.equal(result.metrics[1].label, "Interaction to Next Paint");
  assert.equal(result.metrics[1].source, "field");
});

test("rejects an invalid PageSpeed response", () => {
  assert.throws(
    () => parsePageSpeedResponse({}, "https://example.com/", "example.com", "mobile"),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "INVALID_API_RESPONSE",
  );
});

test("maps Google rate limits to a public service error", async () => {
  process.env.PAGESPEED_API_KEY = "test-key-with-at-least-24-characters";
  const fetchImpl = (async () => new Response(JSON.stringify({ error: { code: 429 } }), { status: 429 })) as typeof fetch;
  await assert.rejects(
    () => fetchPageSpeed("https://example.com/", "mobile", fetchImpl, 100),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "UPSTREAM_RATE_LIMIT",
  );
});

test("maps invalid API payloads to a public error", async () => {
  process.env.PAGESPEED_API_KEY = "test-key-with-at-least-24-characters";
  const fetchImpl = (async () => new Response("not-json", { status: 200 })) as typeof fetch;
  await assert.rejects(
    () => fetchPageSpeed("https://example.com/", "mobile", fetchImpl, 100),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "PAGESPEED_ERROR",
  );
});

test("aborts an analysis after the configured timeout", async () => {
  process.env.PAGESPEED_API_KEY = "test-key-with-at-least-24-characters";
  const fetchImpl = ((_: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_, reject) => {
    init?.signal?.addEventListener("abort", () => {
      const error = new Error("aborted");
      error.name = "AbortError";
      reject(error);
    });
  })) as typeof fetch;
  await assert.rejects(
    () => fetchPageSpeed("https://example.com/", "mobile", fetchImpl, 5),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "ANALYSIS_TIMEOUT",
  );
});

test("maps an unreachable target to a clear validation error", async () => {
  process.env.PAGESPEED_API_KEY = "test-key-with-at-least-24-characters";
  const fetchImpl = (async () => new Response(JSON.stringify({ error: { code: 400 } }), { status: 400 })) as typeof fetch;
  await assert.rejects(
    () => fetchPageSpeed("https://example.com/", "mobile", fetchImpl, 100),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "SITE_UNREACHABLE",
  );
});

test("rejects unexpectedly large upstream responses", async () => {
  process.env.PAGESPEED_API_KEY = "test-key-with-at-least-24-characters";
  const fetchImpl = (async () => new Response("{}", { status: 200, headers: { "content-length": "7000000" } })) as typeof fetch;
  await assert.rejects(
    () => fetchPageSpeed("https://example.com/", "mobile", fetchImpl, 100),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "UPSTREAM_RESPONSE_TOO_LARGE",
  );
});

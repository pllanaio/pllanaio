import assert from "node:assert/strict";
import test from "node:test";
import { WebsiteCheckError } from "../lib/website-check/errors";
import { validateReportLead } from "../lib/website-check/lead";
import { enforceRateLimit } from "../lib/website-check/rate-limit";
import { isHoneypotTriggered } from "../lib/website-check/request-guards";
import { createSignedToken, verifySignedToken } from "../lib/website-check/tokens";

const baseLead = {
  firstName: "Leon",
  lastName: "Pllana",
  company: "Leon Pllana IT-Solutions",
  email: "info@pllana.io",
  phone: "+49 172 7255810",
  consentTextVersion: "2026-07-22",
  source: "website-check-v1",
};

test("accepts a report request without marketing consent", () => {
  const lead = validateReportLead({ ...baseLead, marketingConsent: false });
  assert.equal(lead.marketingConsent, false);
});

test("records an optional marketing consent separately", () => {
  const lead = validateReportLead({ ...baseLead, marketingConsent: true });
  assert.equal(lead.marketingConsent, true);
  assert.equal(lead.consentTextVersion, "2026-07-22");
});

test("rejects stale consent form versions", () => {
  assert.throws(
    () => validateReportLead({ ...baseLead, consentTextVersion: "old" }),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "INVALID_FORM_VERSION",
  );
});

test("detects the honeypot field", () => {
  assert.equal(isHoneypotTriggered(""), false);
  assert.equal(isHoneypotTriggered("bot-value"), true);
});

test("rate limiting prevents repeated submissions", async () => {
  const key = `test-${Date.now()}-${Math.random()}`;
  await enforceRateLimit(key, 1, 60_000);
  await assert.rejects(
    () => enforceRateLimit(key, 1, 60_000),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === "RATE_LIMITED",
  );
});

test("signed tokens cannot be changed and enforce their purpose", () => {
  process.env.WEBSITE_CHECK_TOKEN_SECRET = "test-secret-that-is-definitely-long-enough";
  const token = createSignedToken({ purpose: "website-check-analysis", analysisId: "abc" }, 60);
  const payload = verifySignedToken<{ purpose: string; analysisId: string }>(token, "website-check-analysis");
  assert.equal(payload.analysisId, "abc");
  assert.throws(() => verifySignedToken(`${token}x`, "website-check-analysis"), WebsiteCheckError);
  assert.throws(() => verifySignedToken(token, "different-purpose"), WebsiteCheckError);
});

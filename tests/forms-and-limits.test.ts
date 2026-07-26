import assert from "node:assert/strict";
import test from "node:test";
import { WebsiteCheckError } from "../lib/website-check/errors";
import { validateReportLead } from "../lib/website-check/lead";
import { enforceRateLimit } from "../lib/website-check/rate-limit";
import { claimIdempotencyKey } from "../lib/website-check/idempotency";
import { isHoneypotTriggered } from "../lib/website-check/request-guards";
import { createEncryptedToken, verifyEncryptedToken } from "../lib/website-check/tokens";

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

test("encrypted tokens conceal payloads and reject tampering", () => {
  process.env.WEBSITE_CHECK_TOKEN_SECRET = "test-secret-that-is-definitely-long-enough";
  const token = createEncryptedToken({ purpose: "website-check-marketing-confirmation", email: "person@example.com" }, 60);
  assert.equal(token.includes("person@example.com"), false);
  const payload = verifyEncryptedToken<{ purpose: string; email: string }>(token, "website-check-marketing-confirmation");
  assert.equal(payload.email, "person@example.com");
  const parts = token.split(".");
  const ciphertext = parts[2]!;
  const index = Math.floor(ciphertext.length / 2);
  parts[2] = `${ciphertext.slice(0, index)}${ciphertext[index] === "a" ? "b" : "a"}${ciphertext.slice(index + 1)}`;
  assert.throws(() => verifyEncryptedToken(parts.join("."), "website-check-marketing-confirmation"), WebsiteCheckError);
});

test("Double-Opt-in claims are idempotent and can be released after a failed delivery", async () => {
  const firstKey = `doi-complete-${Date.now()}-${Math.random()}`;
  const first = await claimIdempotencyKey(firstKey, 60_000, 60_000);
  await first.complete();
  await assert.rejects(() => claimIdempotencyKey(firstKey, 60_000, 60_000), (error: unknown) => error instanceof WebsiteCheckError && error.code === "ALREADY_PROCESSED");

  const retryKey = `doi-retry-${Date.now()}-${Math.random()}`;
  const retry = await claimIdempotencyKey(retryKey, 60_000, 60_000);
  await retry.release();
  const secondAttempt = await claimIdempotencyKey(retryKey, 60_000, 60_000);
  await secondAttempt.complete();
});

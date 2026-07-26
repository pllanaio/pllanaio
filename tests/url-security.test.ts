import assert from "node:assert/strict";
import test from "node:test";
import { WebsiteCheckError } from "../lib/website-check/errors";
import { isUnsafeIpAddress, normalizeAndValidateWebsiteUrl, type HostResolver } from "../lib/website-check/url-security";

const publicResolver: HostResolver = async () => [{ address: "93.184.216.34", family: 4 }];

async function rejectsCode(input: string, code: string, resolver: HostResolver = publicResolver) {
  await assert.rejects(
    () => normalizeAndValidateWebsiteUrl(input, resolver),
    (error: unknown) => error instanceof WebsiteCheckError && error.code === code,
  );
}

test("accepts an HTTPS domain", async () => {
  const result = await normalizeAndValidateWebsiteUrl("https://example.com/path?campaign=test", publicResolver);
  assert.equal(result.normalizedUrl, "https://example.com/path?campaign=test");
  assert.equal(result.domain, "example.com");
});

test("adds HTTPS when the protocol is omitted", async () => {
  const result = await normalizeAndValidateWebsiteUrl("www.example.com", publicResolver);
  assert.equal(result.normalizedUrl, "https://www.example.com/");
});

test("accepts a subdomain", async () => {
  const result = await normalizeAndValidateWebsiteUrl("shop.example.com", publicResolver);
  assert.equal(result.domain, "shop.example.com");
});

test("rejects invalid URLs", async () => rejectsCode("http://", "INVALID_URL"));
test("rejects localhost", async () => rejectsCode("http://localhost", "PRIVATE_ADDRESS"));
test("rejects loopback IPv4", async () => rejectsCode("http://127.0.0.1", "PRIVATE_ADDRESS"));
test("rejects private IPv4", async () => rejectsCode("http://10.10.1.2", "PRIVATE_ADDRESS"));
test("rejects private IPv6", async () => rejectsCode("http://[fd00::1]", "PRIVATE_ADDRESS"));
test("rejects IPv6 loopback", async () => rejectsCode("http://[::1]", "PRIVATE_ADDRESS"));
test("rejects link-local addresses", async () => rejectsCode("http://169.254.169.254", "PRIVATE_ADDRESS"));
test("rejects credentials in URLs", async () => rejectsCode("https://user:password@example.com", "CREDENTIALS_NOT_ALLOWED"));
test("rejects non-standard ports", async () => rejectsCode("https://example.com:8080", "PORT_NOT_ALLOWED"));
test("rejects cloud metadata hostnames", async () => rejectsCode("http://metadata.google.internal", "PRIVATE_ADDRESS"));

test("rejects DNS answers containing a private address", async () => {
  const resolver: HostResolver = async () => [
    { address: "93.184.216.34", family: 4 },
    { address: "192.168.1.10", family: 4 },
  ];
  await rejectsCode("https://example.com", "PRIVATE_ADDRESS", resolver);
});

test("revalidates a redirect target and rejects an internal destination", async () => {
  await rejectsCode("http://127.0.0.1/admin", "PRIVATE_ADDRESS");
});

test("classifies reserved and private address ranges", () => {
  assert.equal(isUnsafeIpAddress("192.168.1.1"), true);
  assert.equal(isUnsafeIpAddress("fe80::1"), true);
  assert.equal(isUnsafeIpAddress("93.184.216.34"), false);
  assert.equal(isUnsafeIpAddress("2606:4700:4700::1111"), false);
});

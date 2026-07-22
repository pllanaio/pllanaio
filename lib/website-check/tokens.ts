import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";
import { WebsiteCheckError } from "./errors";

interface TokenEnvelope<T> {
  payload: T;
  iat: number;
  exp: number;
  jti: string;
}

function getSecret() {
  const secret = process.env.WEBSITE_CHECK_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new WebsiteCheckError("SERVICE_NOT_CONFIGURED", "Der Website-Check ist momentan nicht vollständig konfiguriert.", 503);
  }
  return secret;
}

function sign(data: string) {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function createSignedToken<T extends object>(payload: T, ttlSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  const envelope: TokenEnvelope<T> = {
    payload,
    iat: now,
    exp: now + ttlSeconds,
    jti: randomUUID(),
  };
  const compressed = deflateRawSync(Buffer.from(JSON.stringify(envelope), "utf8"), { level: 9 });
  const encoded = compressed.toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySignedToken<T extends { purpose?: string }>(token: unknown, expectedPurpose?: string): T {
  if (typeof token !== "string" || token.length > 16_000) {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }
  const [encoded, signature, extra] = token.split(".");
  if (!encoded || !signature || extra) {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }
  const expected = sign(encoded);
  const receivedBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  if (receivedBuffer.length !== expectedBuffer.length || !timingSafeEqual(receivedBuffer, expectedBuffer)) {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }

  let envelope: TokenEnvelope<T>;
  try {
    const json = inflateRawSync(Buffer.from(encoded, "base64url"), { maxOutputLength: 128_000 }).toString("utf8");
    envelope = JSON.parse(json) as TokenEnvelope<T>;
  } catch {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }
  if (!envelope.exp || envelope.exp < Math.floor(Date.now() / 1000)) {
    throw new WebsiteCheckError("TOKEN_EXPIRED", "Der Report-Bezug ist abgelaufen. Bitte starten Sie eine neue Analyse.", 410);
  }
  if (expectedPurpose && envelope.payload?.purpose !== expectedPurpose) {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }
  return envelope.payload;
}

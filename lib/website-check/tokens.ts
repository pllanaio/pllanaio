import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";
import { WebsiteCheckError } from "./errors";

interface TokenEnvelope<T> {
  payload: T;
  iat: number;
  exp: number;
  jti: string;
}

const TOKEN_AAD = Buffer.from("website-check-token-v1", "utf8");

function getSecret() {
  const secret = process.env.WEBSITE_CHECK_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new WebsiteCheckError("SERVICE_NOT_CONFIGURED", "Der Website-Check ist momentan nicht vollständig konfiguriert.", 503);
  }
  return secret;
}

function createEnvelope<T>(payload: T, ttlSeconds: number): TokenEnvelope<T> {
  const now = Math.floor(Date.now() / 1000);
  return { payload, iat: now, exp: now + ttlSeconds, jti: randomUUID() };
}

function validateEnvelope<T extends { purpose?: string }>(envelope: TokenEnvelope<T>, expectedPurpose?: string) {
  if (!envelope.exp || envelope.exp < Math.floor(Date.now() / 1000)) {
    throw new WebsiteCheckError("TOKEN_EXPIRED", "Der Report-Bezug ist abgelaufen. Bitte starten Sie eine neue Analyse.", 410);
  }
  if (expectedPurpose && envelope.payload?.purpose !== expectedPurpose) {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }
  return envelope.payload;
}

function encryptionKey() {
  return createHash("sha256").update(getSecret(), "utf8").digest();
}

export function createEncryptedToken<T extends object>(payload: T, ttlSeconds: number) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  cipher.setAAD(TOKEN_AAD);
  const compressed = deflateRawSync(Buffer.from(JSON.stringify(createEnvelope(payload, ttlSeconds)), "utf8"), { level: 9 });
  const ciphertext = Buffer.concat([cipher.update(compressed), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1.${iv.toString("base64url")}.${ciphertext.toString("base64url")}.${tag.toString("base64url")}`;
}

export function verifyEncryptedToken<T extends { purpose?: string }>(token: unknown, expectedPurpose?: string): T {
  if (typeof token !== "string" || token.length > 16_000) {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }
  const [version, ivPart, ciphertextPart, tagPart, extra] = token.split(".");
  if (version !== "v1" || !ivPart || !ciphertextPart || !tagPart || extra) {
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }

  try {
    const decodePart = (value: string, maxBytes: number) => {
      if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("Invalid encoding");
      const decoded = Buffer.from(value, "base64url");
      if (!decoded.length || decoded.length > maxBytes || decoded.toString("base64url") !== value) {
        throw new Error("Invalid encoding");
      }
      return decoded;
    };
    const iv = decodePart(ivPart, 12);
    const ciphertext = decodePart(ciphertextPart, 128_000);
    const tag = decodePart(tagPart, 16);
    if (iv.length !== 12 || tag.length !== 16) throw new Error("Invalid token dimensions");

    const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), iv);
    decipher.setAAD(TOKEN_AAD);
    decipher.setAuthTag(tag);
    const compressed = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    const json = inflateRawSync(compressed, { maxOutputLength: 128_000 }).toString("utf8");
    return validateEnvelope(JSON.parse(json) as TokenEnvelope<T>, expectedPurpose);
  } catch (error) {
    if (error instanceof WebsiteCheckError) throw error;
    throw new WebsiteCheckError("INVALID_TOKEN", "Der Report-Bezug ist ungültig oder abgelaufen.");
  }
}

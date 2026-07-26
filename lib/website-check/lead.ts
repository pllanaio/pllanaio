import { WebsiteCheckError } from "./errors";
import type { ReportLeadInput } from "./types";

const namePattern = /^[\p{L}][\p{L}\p{M}'’\- ]{0,79}$/u;
const companyPattern = /^[\p{L}\p{M}\d][\p{L}\p{M}\d&.,'’\-+()\/ ]{1,119}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[\d ()\-/]{6,30}$/;

const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";

export function validateReportLead(body: Record<string, unknown>): ReportLeadInput {
  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const company = clean(body.company);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone);
  const marketingConsent = body.marketingConsent === true;
  const consentTextVersion = clean(body.consentTextVersion);
  const source = clean(body.source);

  if (!namePattern.test(firstName)) {
    throw new WebsiteCheckError("INVALID_FIRST_NAME", "Bitte geben Sie einen gültigen Vornamen ein.");
  }
  if (lastName && !namePattern.test(lastName)) {
    throw new WebsiteCheckError("INVALID_LAST_NAME", "Bitte prüfen Sie den eingegebenen Nachnamen.");
  }
  if (!companyPattern.test(company)) {
    throw new WebsiteCheckError("INVALID_COMPANY", "Bitte geben Sie einen gültigen Unternehmensnamen ein.");
  }
  if (!emailPattern.test(email) || email.length > 254) {
    throw new WebsiteCheckError("INVALID_EMAIL", "Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse ein.");
  }
  if (phone && !phonePattern.test(phone)) {
    throw new WebsiteCheckError("INVALID_PHONE", "Bitte prüfen Sie die eingegebene Telefonnummer.");
  }
  if (consentTextVersion !== "2026-07-22" || source !== "website-check-v1") {
    throw new WebsiteCheckError("INVALID_FORM_VERSION", "Das Formular wurde aktualisiert. Bitte laden Sie die Seite neu.", 409);
  }

  return { firstName, lastName: lastName || undefined, company, email, phone: phone || undefined, marketingConsent, consentTextVersion, source };
}

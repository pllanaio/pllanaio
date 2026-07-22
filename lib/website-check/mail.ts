import nodemailer from "nodemailer";
import { randomUUID } from "node:crypto";
import { createSignedToken } from "./tokens";
import { WebsiteCheckError } from "./errors";
import type { MarketingConfirmationPayload, ReportLeadInput, WebsiteCheckResult, WebsiteLeadRecord } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pllana.io";
const legalFooter = "Leon Pllana IT-Solutions · Rothschwaiger Straße 4 · 82256 Fürstenfeldbruck · info@pllana.io";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[character] ?? character));
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM ?? user;
  if (!host || !Number.isInteger(port) || port <= 0 || !user || !password || !from) {
    throw new WebsiteCheckError("MAIL_NOT_CONFIGURED", "Der Report-Versand ist momentan nicht vollständig konfiguriert.", 503);
  }
  return {
    from,
    transporter: nodemailer.createTransport({ host, port, secure, auth: { user, pass: password } }),
  };
}

function scoreRows(result: WebsiteCheckResult) {
  return Object.values(result.scores).map((score) => `${score.label}: ${score.value ?? "nicht verfügbar"}/100 (${score.statusLabel})`);
}

function reportHtml(lead: ReportLeadInput, result: WebsiteCheckResult, reportUrl: string) {
  const scores = Object.values(result.scores).map((score) => `
    <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(score.label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb"><strong>${score.value ?? "–"}/100</strong> · ${escapeHtml(score.statusLabel)}</td></tr>
  `).join("");
  const findings = result.findings.slice(0, 3).map((finding) => `
    <li style="margin:0 0 14px"><strong>${escapeHtml(finding.title)}</strong><br>${escapeHtml(finding.businessImpact)}</li>
  `).join("");
  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#111827;line-height:1.6">
      <p>Guten Tag ${escapeHtml(lead.firstName)},</p>
      <p>vielen Dank für Ihre Anfrage. Hier ist die Zusammenfassung des Website-Checks für <strong>${escapeHtml(result.domain)}</strong> vom ${new Date(result.createdAt).toLocaleDateString("de-DE")}.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0">${scores}</table>
      <h2 style="font-size:20px">Die drei wichtigsten Erkenntnisse</h2>
      <ol style="padding-left:22px">${findings}</ol>
      <p><a href="${escapeHtml(reportUrl)}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:13px 22px;border-radius:999px">Vollständigen Report öffnen</a></p>
      <p style="margin-top:28px">Bei Fragen können Sie unverbindlich ein Erstgespräch anfragen: <a href="${siteUrl}/#kontakt">Kontakt aufnehmen</a>.</p>
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:32px 0">
      <p style="font-size:12px;color:#6b7280">Dieser Report wurde aufgrund Ihrer ausdrücklichen Anfrage transaktional versendet. Er ist nicht von einer Newsletter-Einwilligung abhängig. Hinweise zur Datenverarbeitung finden Sie unter <a href="${siteUrl}/datenschutz">Datenschutz</a>.</p>
      <p style="font-size:12px;color:#6b7280">${legalFooter}</p>
    </div>
  `;
}

async function postWebhook(url: string | undefined, payload: unknown) {
  if (!url) return;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) console.error("Website check webhook failed", response.status);
  } catch (error) {
    console.error("Website check webhook failed", error instanceof Error ? error.message : "Unknown error");
  } finally {
    clearTimeout(timeout);
  }
}

export async function sendReportEmails(lead: ReportLeadInput, result: WebsiteCheckResult, analysisToken: string) {
  const { transporter, from } = getTransporter();
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  const leadId = randomUUID();
  const reportUrl = `${siteUrl}/website-check/report/${encodeURIComponent(analysisToken)}`;
  const requestedAt = new Date().toISOString();
  const internalTo = process.env.WEBSITE_CHECK_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "info@pllana.io";
  const leadRecord: WebsiteLeadRecord = {
    id: leadId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    analysisId: result.id,
    reportRequestedAt: requestedAt,
    marketingConsent: lead.marketingConsent,
    marketingConsentAt: lead.marketingConsent ? requestedAt : undefined,
    consentTextVersion: lead.consentTextVersion,
    source: lead.source,
    doubleOptInStatus: lead.marketingConsent ? "pending" : "not-requested",
    withdrawalStatus: "not-withdrawn",
  };

  await transporter.sendMail({
    from,
    to: lead.email,
    subject: `Ihr Website-Report für ${result.domain}`,
    text: [
      `Guten Tag ${lead.firstName},`,
      "",
      `Website-Report für ${result.domain}`,
      `Analyse vom ${new Date(result.createdAt).toLocaleDateString("de-DE")}`,
      "",
      ...scoreRows(result),
      "",
      "Wichtigste Erkenntnisse:",
      ...result.findings.slice(0, 3).map((finding, index) => `${index + 1}. ${finding.title}: ${finding.businessImpact}`),
      "",
      `Vollständiger Report: ${reportUrl}`,
      `Unverbindliches Erstgespräch: ${siteUrl}/#kontakt`,
      "",
      legalFooter,
      `Datenschutz: ${siteUrl}/datenschutz`,
    ].join("\n"),
    html: reportHtml(lead, result, reportUrl),
  });

  await transporter.sendMail({
    from,
    to: internalTo,
    replyTo: lead.email,
    subject: `Website-Report angefordert: ${result.domain} · ${lead.company}`,
    text: [
      `Lead-ID: ${leadId}`,
      `Name: ${fullName}`,
      `Unternehmen: ${lead.company}`,
      `E-Mail: ${lead.email}`,
      `Telefon: ${lead.phone || "nicht angegeben"}`,
      `Domain: ${result.domain}`,
      `Analyse-ID: ${result.id}`,
      `Report angefordert: ${requestedAt}`,
      `Marketing-Einwilligung: ${lead.marketingConsent ? "ja, Double-Opt-in ausstehend" : "nein"}`,
      `Einwilligungstext-Version: ${lead.consentTextVersion}`,
      `Quelle: ${lead.source}`,
    ].join("\n"),
  });

  await postWebhook(process.env.WEBSITE_CHECK_LEAD_WEBHOOK_URL, {
    event: "website_report_requested",
    requestedAt,
    analysisId: result.id,
    domain: result.domain,
    strategy: result.strategy,
    lead: leadRecord,
    marketingStatus: lead.marketingConsent ? "pending_double_opt_in" : "not_requested",
  });

  if (lead.marketingConsent) {
    const consentedAt = requestedAt;
    const payload: MarketingConfirmationPayload = {
      purpose: "website-check-marketing-confirmation",
      jti: randomUUID(),
      leadId,
      email: lead.email,
      firstName: lead.firstName,
      company: lead.company,
      requestedAt,
      consentedAt,
      consentTextVersion: lead.consentTextVersion,
      source: lead.source,
    };
    const token = createSignedToken(payload, 7 * 24 * 60 * 60);
    const confirmationUrl = `${siteUrl}/api/website-check/confirm-marketing?token=${encodeURIComponent(token)}`;
    await transporter.sendMail({
      from,
      to: lead.email,
      subject: "Bitte bestätigen Sie Ihre Anmeldung für Website-Tipps",
      text: [
        `Guten Tag ${lead.firstName},`,
        "",
        "bitte bestätigen Sie mit dem folgenden Link, dass Sie gelegentlich Website-Tipps und Informationen zu den Leistungen von Leon Pllana IT-Solutions erhalten möchten:",
        confirmationUrl,
        "",
        "Ohne Bestätigung werden Sie nicht in den Marketing-Verteiler aufgenommen.",
        `Datenschutz: ${siteUrl}/datenschutz`,
        legalFooter,
      ].join("\n"),
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;line-height:1.6"><p>Guten Tag ${escapeHtml(lead.firstName)},</p><p>bitte bestätigen Sie, dass Sie gelegentlich Website-Tipps und Informationen zu den Leistungen von Leon Pllana IT-Solutions erhalten möchten.</p><p><a href="${escapeHtml(confirmationUrl)}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:13px 22px;border-radius:999px">E-Mail-Adresse bestätigen</a></p><p>Ohne Bestätigung werden Sie nicht in den Marketing-Verteiler aufgenommen.</p><p style="font-size:12px;color:#6b7280"><a href="${siteUrl}/datenschutz">Datenschutz</a> · ${legalFooter}</p></div>`,
    });
  }

  return { reportUrl, marketingConfirmationSent: lead.marketingConsent };
}

export async function confirmMarketingContact(payload: MarketingConfirmationPayload) {
  const { transporter, from } = getTransporter();
  const confirmedAt = new Date().toISOString();
  const internalTo = process.env.WEBSITE_CHECK_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "info@pllana.io";
  await transporter.sendMail({
    from,
    to: internalTo,
    subject: `Double-Opt-in bestätigt: ${payload.email}`,
    text: [
      `Lead-ID: ${payload.leadId}`,
      `E-Mail: ${payload.email}`,
      `Vorname: ${payload.firstName}`,
      `Unternehmen: ${payload.company}`,
      `Einwilligung erteilt: ${payload.consentedAt}`,
      `Double-Opt-in bestätigt: ${confirmedAt}`,
      `Einwilligungstext-Version: ${payload.consentTextVersion}`,
      `Quelle: ${payload.source}`,
      `DOI-ID: ${payload.jti}`,
    ].join("\n"),
  });
  await postWebhook(process.env.WEBSITE_CHECK_MARKETING_WEBHOOK_URL, {
    event: "marketing_double_opt_in_confirmed",
    confirmedAt,
    ...payload,
    status: "confirmed",
  });
  return confirmedAt;
}

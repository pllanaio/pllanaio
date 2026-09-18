import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getOfferSummary, isOfferMessageValid, parseOfferSelection } from "../../../lib/offer-selection";

export const runtime = "nodejs";

const namePattern = /^[\p{L}][\p{L}\p{M}'’\- ]{1,79}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?\d{6,20}$/;
const companyPattern = /^[\p{L}\p{M}\d][\p{L}\p{M}\d&.,'’\-+()\/ ]{1,119}$/u;

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[character] ?? character));

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    const form = body as Record<string, unknown>;

    const firstName = clean(form.firstName);
    const lastName = clean(form.lastName);
    const email = clean(form.email);
    const phone = clean(form.phone);
    const company = clean(form.company);
    const message = clean(form.message);
    const website = clean(form.website);
    const inquiryGoal = clean(form.inquiryGoal);
    const timeline = clean(form.timeline);

    if (website) return NextResponse.json({ ok: true });

    const inquiryGoalLabels: Record<string, string> = {
      automation: "Prozesse & Automatisierung",
      workplace: "Microsoft 365 & Arbeitsplatz",
      website: "Website & Web Care",
      cloud: "Cloud & Anwendungen",
      software: "Individuelle Software",
      security: "Security & Backup",
      unsure: "Noch nicht sicher",
    };
    const timelineLabels: Record<string, string> = {
      asap: "So bald wie möglich",
      "one-to-three": "In den nächsten 1–3 Monaten",
      "three-plus": "In mehr als 3 Monaten",
      exploring: "Orientiert sich erst einmal",
    };

    if ((inquiryGoal && !inquiryGoalLabels[inquiryGoal]) || (timeline && !timelineLabels[timeline])) {
      return NextResponse.json({ error: "Invalid qualification data" }, { status: 400 });
    }

    const selectedOffers = parseOfferSelection(form.selectedOffers);
    if (selectedOffers === null) {
      return NextResponse.json({ error: "Invalid offer selection" }, { status: 400 });
    }

    const isValid =
      namePattern.test(firstName) &&
      namePattern.test(lastName) &&
      emailPattern.test(email) &&
      email.length <= 254 &&
      phonePattern.test(phone) &&
      companyPattern.test(company) &&
      (form.message === undefined || typeof form.message === "string") &&
      isOfferMessageValid(message, selectedOffers);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? "587");
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;
    const from = process.env.SMTP_FROM ?? user;
    const to = process.env.CONTACT_TO_EMAIL ?? "info@pllana.io";

    if (!host || !Number.isInteger(port) || port <= 0 || !user || !password || !from) {
      console.error("Missing or invalid SMTP configuration");
      return NextResponse.json({ error: "Mail service is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass: password,
      },
    });

    const fullName = `${firstName} ${lastName}`;
    const summary = getOfferSummary(selectedOffers);
    const currency = (amount: number) => new Intl.NumberFormat("de-DE", {
      style: "currency", currency: "EUR", maximumFractionDigits: 0,
    }).format(amount);
    const selectionLines = summary.items.length ? [
      "Ausgewählte Leistungen (unverbindliche Angebotsanfrage):",
      ...summary.items.map((item) => `${item.name}: ${
        item.onRequest ? "auf Anfrage, nicht in bezifferten Summen enthalten" :
          item.once !== null ? `${currency(item.once)} einmalig netto` : `ab ${currency(item.monthly!)} monatlich netto`
      }`),
      "",
      `Einmalig netto: ${summary.items.some((item) => item.once !== null) ? currency(summary.oneTimeTotal) :
        summary.hasIndividual ? "auf Anfrage (noch nicht kalkuliert)" : "keine Einmalleistung ausgewählt"}`,
      `Monatlich netto ab: ${summary.items.some((item) => item.monthly !== null) ? currency(summary.monthlyTotal) :
        summary.hasIndividual ? "auf Anfrage (noch nicht kalkuliert)" : "keine monatliche Betreuung ausgewählt"}`,
      ...(summary.hasIndividual ? ["Individual Care wird individuell angeboten und ist nicht in den bezifferten Summen enthalten."] : []),
      "Die Auswahl ist keine verbindliche Bestellung. Umfang, Fremdkosten und Umsatzsteuer gemäß Angebot.",
      "Monatliche Betreuung beginnt nach vereinbarter Übergabe.",
    ] : [];
    const selectionHtml = selectionLines.length
      ? `<h3>Ausgewählte Leistungen</h3><p>${selectionLines.map(escapeHtml).join("<br>")}</p>`
      : "";
    const html = `
      <h2>Neue Website-Anfrage</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
      ${inquiryGoal ? `<p><strong>Anliegen:</strong> ${escapeHtml(inquiryGoalLabels[inquiryGoal])}</p>` : ""}
      ${timeline ? `<p><strong>Zeitrahmen:</strong> ${escapeHtml(timelineLabels[timeline])}</p>` : ""}
      ${selectionHtml}
      <p><strong>Nachricht:</strong></p>
      <p>${escapeHtml(message || "Keine zusätzliche Nachricht.").replace(/\n/g, "<br>")}</p>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Neue Anfrage von ${fullName} – ${company}`,
      text: [
        "Neue Website-Anfrage",
        `Name: ${fullName}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone}`,
        `Firma: ${company}`,
        ...(inquiryGoal ? [`Anliegen: ${inquiryGoalLabels[inquiryGoal]}`] : []),
        ...(timeline ? [`Zeitrahmen: ${timelineLabels[timeline]}`] : []),
        "",
        ...selectionLines,
        ...(selectionLines.length ? [""] : []),
        "Nachricht:",
        message || "Keine zusätzliche Nachricht.",
      ].join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}

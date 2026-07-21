import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const body = await request.json();

    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const company = clean(body.company);
    const message = clean(body.message);
    const website = clean(body.website);

    if (website) return NextResponse.json({ ok: true });

    const isValid =
      namePattern.test(firstName) &&
      namePattern.test(lastName) &&
      emailPattern.test(email) &&
      email.length <= 254 &&
      phonePattern.test(phone) &&
      companyPattern.test(company) &&
      message.length >= 10 &&
      message.length <= 2000;

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
    const html = `
      <h2>Neue Website-Anfrage</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
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
        "",
        "Nachricht:",
        message,
      ].join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}

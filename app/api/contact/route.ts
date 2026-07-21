import { NextResponse } from "next/server";

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

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL ?? "info@pllana.io";

    if (!apiKey || !from) {
      console.error("Missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
      return NextResponse.json({ error: "Mail service is not configured" }, { status: 500 });
    }

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

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Neue Anfrage von ${fullName} – ${company}`,
        html,
      }),
    });

    if (!response.ok) {
      console.error("Resend error", await response.text());
      return NextResponse.json({ error: "Mail delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}

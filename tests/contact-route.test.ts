import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import nodemailer, { type SendMailOptions } from "nodemailer";
import { POST } from "../app/api/contact/route";

const contact = {
  firstName: "Leon", lastName: "Pllana", email: "client@example.com",
  phone: "+491234567890", company: "Example GmbH", message: "",
};

function mockMail(t: TestContext) {
  const env = {
    SMTP_HOST: "smtp.example.test", SMTP_PORT: "587", SMTP_USER: "test-user",
    SMTP_PASSWORD: "test-password", SMTP_FROM: "website@example.test", CONTACT_TO_EMAIL: "owner@example.test",
  };
  const before = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]));
  Object.assign(process.env, env);
  t.after(() => {
    for (const [key, value] of Object.entries(before)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  const messages: SendMailOptions[] = [];
  const transport = t.mock.method(nodemailer, "createTransport", () => ({
    sendMail: async (message: SendMailOptions) => { messages.push(message); return { messageId: "test" }; },
  }));
  return { messages, transport };
}

const send = (body: unknown) => POST(new Request("http://localhost/api/contact", {
  method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
}));

const normalize = (body: unknown) => String(body).replace(/\s/g, " ");

test("contact email contains selected setup and monthly care using server catalogue prices", async (t) => {
  const { messages } = mockMail(t);
  const response = await send({
    ...contact, selectedOffers: ["web-care", "website-setup", "web-care"],
    oneTimeTotal: 1, monthlyTotal: 1, price: 1, locale: "en",
  });
  assert.equal(response.status, 200);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to, "owner@example.test");
  assert.equal(messages[0].replyTo, contact.email);
  for (const version of [messages[0].text, messages[0].html]) {
    const content = normalize(version);
    assert.match(content, /Website-Erstellung: 1\.500 € einmalig netto/);
    assert.match(content, /Web Care: ab 199 € monatlich netto/);
    assert.match(content, /Einmalig netto: 1\.500 €/);
    assert.match(content, /Monatlich netto ab: 199 €/);
    assert.match(content, /keine verbindliche Bestellung/);
    assert.equal(content.match(/Web Care: ab/g)?.length, 1);
  }
});

test("Microsoft 365 and mixed selections preserve separate totals in the email", async (t) => {
  const { messages } = mockMail(t);
  const response = await send({ ...contact, selectedOffers: ["workplace-setup", "workplace-care", "cloud-care"] });
  assert.equal(response.status, 200);
  assert.match(normalize(messages[0].text), /Microsoft-365-Einrichtung: 1\.000 € einmalig netto/);
  assert.match(normalize(messages[0].text), /Monatlich netto ab: 898 €/);
});

test("Individual Care is emailed on request without implying a zero price", async (t) => {
  const { messages } = mockMail(t);
  assert.equal((await send({ ...contact, message: "Bitte einen Shopify-Shop erstellen.", selectedOffers: ["individual-care"] })).status, 200);
  for (const version of [messages[0].text, messages[0].html]) {
    const content = normalize(version);
    assert.match(content, /Individual Care: auf Anfrage, nicht in bezifferten Summen enthalten/);
    assert.match(content, /Einmalig netto: auf Anfrage/);
    assert.match(content, /Monatlich netto ab: auf Anfrage/);
    assert.doesNotMatch(content, /\b0 €/);
  }
});

test("mixed Individual Care requests make the unpriced part explicit", async (t) => {
  const { messages } = mockMail(t);
  assert.equal((await send({ ...contact, message: "Zusätzlich einen Shop integrieren.", selectedOffers: ["website-setup", "web-care", "individual-care"] })).status, 200);
  assert.match(normalize(messages[0].text), /Einmalig netto: 1\.500 €/);
  assert.match(normalize(messages[0].text), /Monatlich netto ab: 199 €/);
  assert.match(normalize(messages[0].text), /Individual Care wird individuell angeboten und ist nicht in den bezifferten Summen enthalten/);
});

test("invalid selections and missing required descriptions never send email", async (t) => {
  const { messages, transport } = mockMail(t);
  for (const fields of [
    { selectedOffers: ["nonexistent"] }, { selectedOffers: "web-care" }, { selectedOffers: null },
    { selectedOffers: [{ id: "web-care", monthly: 1 }] }, { selectedOffers: ["individual-care"] },
    { selectedOffers: [] }, { selectedOffers: ["web-care"], message: "short" },
    { selectedOffers: ["web-care"], message: 123 }, { selectedOffers: ["web-care"], message: "x".repeat(2001) },
  ]) {
    assert.equal((await send({ ...contact, ...fields })).status, 400);
  }
  assert.equal(messages.length, 0);
  assert.equal(transport.mock.callCount(), 0);
});

test("normal contact requests remain supported and escape user content in HTML", async (t) => {
  const { messages } = mockMail(t);
  const message = 'Bitte <script>alert("test")</script> prüfen.';
  assert.equal((await send({ ...contact, message })).status, 200);
  assert.match(String(messages[0].text), /<script>/);
  assert.match(String(messages[0].html), /&lt;script&gt;/);
  assert.doesNotMatch(String(messages[0].html), /<script>/);
  assert.doesNotMatch(String(messages[0].text), /Ausgewählte Leistungen/);
});

test("honeypot requests return success without sending mail", async (t) => {
  const { messages, transport } = mockMail(t);
  assert.equal((await send({ ...contact, website: "spam", selectedOffers: ["fake"] })).status, 200);
  assert.equal(messages.length, 0);
  assert.equal(transport.mock.callCount(), 0);
});

test("malformed JSON and non-object form bodies return client errors", async (t) => {
  const { messages } = mockMail(t);
  for (const body of [null, [], "form"]) assert.equal((await send(body)).status, 400);
  const malformed = new Request("http://localhost/api/contact", { method: "POST", body: "{" });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(messages.length, 0);
});

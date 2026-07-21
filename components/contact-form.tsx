"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const namePattern = /^[\p{L}][\p{L}\p{M}'’\- ]{1,79}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?\d{6,20}$/;
const companyPattern = /^[\p{L}\p{M}\d][\p{L}\p{M}\d&.,'’\-+()\/ ]{1,119}$/u;

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
};

const copy = {
  de: {
    title: "Erzählen Sie uns, worum es geht.",
    intro: "Ein paar Angaben genügen. Wir melden uns persönlich und unverbindlich bei Ihnen.",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefonnummer",
    company: "Firma",
    message: "Ihre Nachricht",
    submit: "Anfrage senden",
    sending: "Wird gesendet …",
    success: "Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt.",
    failure: "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@pllana.io.",
    required: "Dieses Feld ist erforderlich.",
    nameInvalid: "Bitte verwenden Sie nur Buchstaben, Leerzeichen, Bindestriche oder Apostrophe.",
    emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    phoneInvalid: "Erlaubt sind nur Zahlen und optional ein Plus am Anfang.",
    companyInvalid: "Bitte geben Sie einen gültigen Firmennamen ein.",
    messageInvalid: "Bitte schreiben Sie mindestens 10 und höchstens 2.000 Zeichen.",
  },
  en: {
    title: "Tell us what you need.",
    intro: "A few details are enough. We will get back to you personally and without obligation.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone number",
    company: "Company",
    message: "Your message",
    submit: "Send enquiry",
    sending: "Sending …",
    success: "Thank you. Your enquiry has been sent successfully.",
    failure: "The enquiry could not be sent. Please try again or email info@pllana.io.",
    required: "This field is required.",
    nameInvalid: "Use letters, spaces, hyphens or apostrophes only.",
    emailInvalid: "Enter a valid email address.",
    phoneInvalid: "Only digits and an optional leading plus are allowed.",
    companyInvalid: "Enter a valid company name.",
    messageInvalid: "Write between 10 and 2,000 characters.",
  },
  sq: {
    title: "Na tregoni për çfarë bëhet fjalë.",
    intro: "Mjaftojnë disa të dhëna. Do t’ju kontaktojmë personalisht dhe pa detyrim.",
    firstName: "Emri",
    lastName: "Mbiemri",
    email: "Email",
    phone: "Numri i telefonit",
    company: "Kompania",
    message: "Mesazhi juaj",
    submit: "Dërgo kërkesën",
    sending: "Po dërgohet …",
    success: "Faleminderit. Kërkesa juaj u dërgua me sukses.",
    failure: "Kërkesa nuk mund të dërgohej. Provoni përsëri ose shkruani në info@pllana.io.",
    required: "Kjo fushë është e detyrueshme.",
    nameInvalid: "Përdorni vetëm shkronja, hapësira, viza ose apostrof.",
    emailInvalid: "Jepni një adresë emaili të vlefshme.",
    phoneInvalid: "Lejohen vetëm numra dhe një plus opsional në fillim.",
    companyInvalid: "Jepni një emër të vlefshëm kompanie.",
    messageInvalid: "Shkruani nga 10 deri në 2.000 karaktere.",
  },
} as const;

export function ContactForm() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = () => {
    const next: FormErrors = {};
    if (!values.firstName.trim()) next.firstName = t.required;
    else if (!namePattern.test(values.firstName.trim())) next.firstName = t.nameInvalid;
    if (!values.lastName.trim()) next.lastName = t.required;
    else if (!namePattern.test(values.lastName.trim())) next.lastName = t.nameInvalid;
    if (!values.email.trim()) next.email = t.required;
    else if (!emailPattern.test(values.email.trim())) next.email = t.emailInvalid;
    if (!values.phone.trim()) next.phone = t.required;
    else if (!phonePattern.test(values.phone.trim())) next.phone = t.phoneInvalid;
    if (!values.company.trim()) next.company = t.required;
    else if (!companyPattern.test(values.company.trim())) next.company = t.companyInvalid;
    if (!values.message.trim()) next.message = t.required;
    else if (values.message.trim().length < 10 || values.message.trim().length > 2000) next.message = t.messageInvalid;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    if (!validate()) return;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      setValues(initialValues);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-2 focus:ring-foreground/10";

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-border bg-card p-6 text-left shadow-premium sm:p-10">
      <div className="text-center">
        <h3 className="text-3xl font-semibold tracking-[-0.04em]">{t.title}</h3>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">{t.intro}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {(["firstName", "lastName"] as const).map((name) => (
          <label key={name} className="text-sm font-medium">
            {t[name]}
            <input
              name={name}
              value={values[name]}
              onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value.replace(/[\d]/g, "") }))}
              autoComplete={name === "firstName" ? "given-name" : "family-name"}
              maxLength={80}
              aria-invalid={Boolean(errors[name])}
              className={fieldClass}
            />
            {errors[name] && <span className="mt-2 block text-sm text-red-600">{errors[name]}</span>}
          </label>
        ))}

        <label className="text-sm font-medium">
          {t.email}
          <input name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} maxLength={254} aria-invalid={Boolean(errors.email)} className={fieldClass} />
          {errors.email && <span className="mt-2 block text-sm text-red-600">{errors.email}</span>}
        </label>

        <label className="text-sm font-medium">
          {t.phone}
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value.replace(/(?!^\+)\D/g, "").replace(/\+(?=.+\+)/g, "") }))} maxLength={21} aria-invalid={Boolean(errors.phone)} className={fieldClass} />
          {errors.phone && <span className="mt-2 block text-sm text-red-600">{errors.phone}</span>}
        </label>

        <label className="text-sm font-medium sm:col-span-2">
          {t.company}
          <input name="company" autoComplete="organization" value={values.company} onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))} maxLength={120} aria-invalid={Boolean(errors.company)} className={fieldClass} />
          {errors.company && <span className="mt-2 block text-sm text-red-600">{errors.company}</span>}
        </label>

        <label className="text-sm font-medium sm:col-span-2">
          {t.message}
          <textarea name="message" rows={6} value={values.message} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} maxLength={2000} aria-invalid={Boolean(errors.message)} className={`${fieldClass} resize-y`} />
          <span className="mt-2 flex justify-between gap-4 text-sm text-muted-foreground"><span>{errors.message && <span className="text-red-600">{errors.message}</span>}</span><span>{values.message.length}/2000</span></span>
        </label>
      </div>

      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))} />
      </label>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"} className="min-w-64">
          {status === "sending" ? t.sending : t.submit} {status !== "sending" && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
        <div aria-live="polite" className="min-h-6 text-center text-sm">
          {status === "success" && <p className="text-green-700">{t.success}</p>}
          {status === "error" && <p className="text-red-600">{t.failure}</p>}
        </div>
      </div>
    </form>
  );
}

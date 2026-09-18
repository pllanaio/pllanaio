"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { useOfferSelection } from "@/components/offer-selection-provider";
import { OfferSelectionSummary } from "@/components/offer-selection-summary";
import { isOfferMessageValid } from "@/lib/offer-selection";
import { selectionCopy } from "@/lib/offer-selection-copy";

type InquiryGoal = "" | "automation" | "workplace" | "website" | "cloud" | "software" | "security" | "unsure";
type Timeline = "" | "asap" | "one-to-three" | "three-plus" | "exploring";

type FormValues = {
  inquiryGoal: InquiryGoal;
  timeline: Timeline;
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
  inquiryGoal: "",
  timeline: "",
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
    title: "Erzählen Sie uns kurz, was besser funktionieren soll.",
    intro: "Vier kurze Schritte statt eines langen Formulars. So können wir Ihre Anfrage direkt einordnen und vorbereitet antworten.",
    progress: "Schritt",
    of: "von",
    back: "Zurück",
    next: "Weiter",
    goalTitle: "Wobei können wir Sie unterstützen?",
    goalText: "Wählen Sie einfach den Bereich, der Ihrer Situation am nächsten kommt.",
    goals: [
      ["automation", "Prozesse & Automatisierung", "Manuelle Arbeit reduzieren und Abläufe verbinden."],
      ["workplace", "Microsoft 365 & Arbeitsplatz", "Zusammenarbeit, Geräte und Benutzer sauber organisieren."],
      ["website", "Website & Web Care", "Website neu aufsetzen, verbessern oder dauerhaft betreuen."],
      ["cloud", "Cloud & Anwendungen", "Systeme modernisieren, betreiben oder miteinander verbinden."],
      ["software", "Individuelle Software", "Eine Lösung entwickeln, die exakt zum Prozess passt."],
      ["security", "Security & Backup", "Risiken reduzieren und Wiederherstellbarkeit sicherstellen."],
      ["unsure", "Noch nicht sicher", "Wir helfen dabei, das eigentliche Problem einzuordnen."],
    ] as const,
    situationTitle: "Was ist aktuell die größte Herausforderung?",
    situationText: "Ein paar Sätze reichen. Danach wissen wir deutlich besser, wo wir ansetzen können.",
    timeline: "Wann möchten Sie das Thema angehen?",
    timelines: [
      ["asap", "So bald wie möglich"],
      ["one-to-three", "In den nächsten 1–3 Monaten"],
      ["three-plus", "In mehr als 3 Monaten"],
      ["exploring", "Ich orientiere mich erst einmal"],
    ] as const,
    message: "Was soll konkret besser funktionieren?",
    aboutTitle: "Mit wem sprechen wir?",
    aboutText: "Fast geschafft – jetzt fehlen nur noch ein paar Eckdaten zu Ihnen und Ihrem Unternehmen.",
    firstName: "Vorname",
    lastName: "Nachname",
    company: "Firma",
    contactTitle: "Wie erreichen wir Sie am besten?",
    contactText: "Wir melden uns persönlich und beziehen uns direkt auf Ihre Angaben aus den vorherigen Schritten.",
    email: "E-Mail",
    phone: "Telefonnummer",
    submit: "Anfrage senden",
    sending: "Wird gesendet …",
    successTitle: "Vielen Dank – Ihre Anfrage ist angekommen.",
    success: "Wir haben Ihre Angaben erhalten und können uns dadurch gezielt auf das Gespräch vorbereiten.",
    failure: "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@pllana.io.",
    required: "Bitte treffen Sie eine Auswahl bzw. füllen Sie dieses Feld aus.",
    nameInvalid: "Bitte verwenden Sie nur Buchstaben, Leerzeichen, Bindestriche oder Apostrophe.",
    emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    phoneInvalid: "Erlaubt sind nur Zahlen und optional ein Plus am Anfang.",
    companyInvalid: "Bitte geben Sie einen gültigen Firmennamen ein.",
    messageInvalid: "Bitte schreiben Sie mindestens 10 und höchstens 2.000 Zeichen.",
  },
  en: {
    title: "Tell us briefly what should work better.",
    intro: "Four short steps instead of one long form. This helps us understand your request and respond well prepared.",
    progress: "Step",
    of: "of",
    back: "Back",
    next: "Continue",
    goalTitle: "How can we support you?",
    goalText: "Choose the area that comes closest to your current situation.",
    goals: [
      ["automation", "Processes & automation", "Reduce manual work and connect workflows."],
      ["workplace", "Microsoft 365 & workplace", "Organise collaboration, users and devices properly."],
      ["website", "Website & web care", "Build, improve or continuously maintain your website."],
      ["cloud", "Cloud & applications", "Modernise, operate or connect systems."],
      ["software", "Custom software", "Build a solution that matches the process precisely."],
      ["security", "Security & backup", "Reduce risk and ensure recoverability."],
      ["unsure", "Not sure yet", "We help identify the actual problem first."],
    ] as const,
    situationTitle: "What is the biggest challenge right now?",
    situationText: "A few sentences are enough. They help us understand where to start.",
    timeline: "When would you like to address this?",
    timelines: [
      ["asap", "As soon as possible"],
      ["one-to-three", "Within the next 1–3 months"],
      ["three-plus", "In more than 3 months"],
      ["exploring", "I am exploring options first"],
    ] as const,
    message: "What should work better in concrete terms?",
    aboutTitle: "Who are we speaking with?",
    aboutText: "Almost there – we only need a few details about you and your company.",
    firstName: "First name",
    lastName: "Last name",
    company: "Company",
    contactTitle: "What is the best way to reach you?",
    contactText: "We will respond personally and refer directly to what you told us in the previous steps.",
    email: "Email",
    phone: "Phone number",
    submit: "Send enquiry",
    sending: "Sending …",
    successTitle: "Thank you – your enquiry has arrived.",
    success: "We have received your details and can prepare specifically for the conversation.",
    failure: "The enquiry could not be sent. Please try again or email info@pllana.io.",
    required: "Please make a selection or complete this field.",
    nameInvalid: "Use letters, spaces, hyphens or apostrophes only.",
    emailInvalid: "Enter a valid email address.",
    phoneInvalid: "Only digits and an optional leading plus are allowed.",
    companyInvalid: "Enter a valid company name.",
    messageInvalid: "Write between 10 and 2,000 characters.",
  },
  sq: {
    title: "Na tregoni shkurt çfarë duhet të funksionojë më mirë.",
    intro: "Katër hapa të shkurtër në vend të një formulari të gjatë. Kështu e kuptojmë më mirë kërkesën dhe përgjigjemi të përgatitur.",
    progress: "Hapi",
    of: "nga",
    back: "Kthehu",
    next: "Vazhdo",
    goalTitle: "Si mund t’ju ndihmojmë?",
    goalText: "Zgjidhni fushën që i afrohet më shumë situatës suaj.",
    goals: [
      ["automation", "Procese & automatizim", "Reduktoni punën manuale dhe lidhni proceset."],
      ["workplace", "Microsoft 365 & workplace", "Organizoni bashkëpunimin, përdoruesit dhe pajisjet."],
      ["website", "Website & Web Care", "Ndërtoni, përmirësoni ose mirëmbani faqen."],
      ["cloud", "Cloud & aplikacione", "Modernizoni, operoni ose lidhni sistemet."],
      ["software", "Softuer individual", "Ndërtoni një zgjidhje sipas procesit tuaj."],
      ["security", "Siguri & backup", "Reduktoni rrezikun dhe siguroni rikuperimin."],
      ["unsure", "Ende jo i sigurt", "Ne ju ndihmojmë të identifikoni problemin e vërtetë."],
    ] as const,
    situationTitle: "Cila është sfida më e madhe aktualisht?",
    situationText: "Mjaftojnë disa fjali. Kjo na tregon ku duhet të fillojmë.",
    timeline: "Kur dëshironi ta trajtoni këtë temë?",
    timelines: [
      ["asap", "Sa më shpejt"],
      ["one-to-three", "Brenda 1–3 muajve"],
      ["three-plus", "Pas më shumë se 3 muajsh"],
      ["exploring", "Po shqyrtoj mundësitë"],
    ] as const,
    message: "Çfarë duhet të funksionojë konkretisht më mirë?",
    aboutTitle: "Me kë po flasim?",
    aboutText: "Pothuajse mbaroi – na duhen vetëm disa të dhëna për ju dhe kompaninë.",
    firstName: "Emri",
    lastName: "Mbiemri",
    company: "Kompania",
    contactTitle: "Si mund t’ju kontaktojmë më mirë?",
    contactText: "Do t’ju përgjigjemi personalisht dhe duke iu referuar përgjigjeve tuaja.",
    email: "Email",
    phone: "Numri i telefonit",
    submit: "Dërgo kërkesën",
    sending: "Po dërgohet …",
    successTitle: "Faleminderit – kërkesa juaj mbërriti.",
    success: "I kemi marrë të dhënat dhe mund të përgatitemi në mënyrë të synuar për bisedën.",
    failure: "Kërkesa nuk mund të dërgohej. Provoni përsëri ose shkruani në info@pllana.io.",
    required: "Ju lutemi bëni një zgjedhje ose plotësoni këtë fushë.",
    nameInvalid: "Përdorni vetëm shkronja, hapësira, viza ose apostrof.",
    emailInvalid: "Jepni një adresë emaili të vlefshme.",
    phoneInvalid: "Lejohen vetëm numra dhe një plus opsional në fillim.",
    companyInvalid: "Jepni një emër të vlefshëm kompanie.",
    messageInvalid: "Shkruani nga 10 deri në 2.000 karaktere.",
  },
} as const;

export function ContactForm() {
  const { locale } = useLocale();
  const { selectedOffers, removeOffers, sending, setSending } = useOfferSelection();
  const t = copy[locale];
  const messageRequired = selectedOffers.length === 0 || selectedOffers.includes("individual-care");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [step, setStep] = useState(0);
  const stepTitleRef = useRef<HTMLHeadingElement>(null);
  const totalSteps = 4;

  useEffect(() => {
    stepTitleRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "success" && selectedOffers.length > 0) {
      setStatus("idle");
      setStep(0);
    }
  }, [selectedOffers.length, status]);

  const validateStep = (currentStep: number) => {
    const next: FormErrors = {};

    if (currentStep === 0 && !values.inquiryGoal) next.inquiryGoal = t.required;

    if (currentStep === 1) {
      if (!values.timeline) next.timeline = t.required;
      if (!isOfferMessageValid(values.message, selectedOffers)) {
        next.message = values.message.trim() ? t.messageInvalid : t.required;
      }
    }

    if (currentStep === 2) {
      if (!values.firstName.trim()) next.firstName = t.required;
      else if (!namePattern.test(values.firstName.trim())) next.firstName = t.nameInvalid;
      if (!values.lastName.trim()) next.lastName = t.required;
      else if (!namePattern.test(values.lastName.trim())) next.lastName = t.nameInvalid;
      if (!values.company.trim()) next.company = t.required;
      else if (!companyPattern.test(values.company.trim())) next.company = t.companyInvalid;
    }

    if (currentStep === 3) {
      if (!values.email.trim()) next.email = t.required;
      else if (!emailPattern.test(values.email.trim())) next.email = t.emailInvalid;
      if (!values.phone.trim()) next.phone = t.required;
      else if (!phonePattern.test(values.phone.trim())) next.phone = t.phoneInvalid;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateAll = () => {
    for (let current = 0; current < totalSteps; current += 1) {
      if (!validateStep(current)) {
        setStep(current);
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || step !== totalSteps - 1) return;
    setStatus("idle");
    if (!validateAll()) return;
    setStatus("sending");
    setSending(true);
    const submittedOffers = [...selectedOffers];

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, selectedOffers: submittedOffers }),
      });
      if (!response.ok) throw new Error("Request failed");
      setValues(initialValues);
      setErrors({});
      removeOffers(submittedOffers);
      setStatus("success");
      setStep(0);
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  const fieldClass = "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-2 focus:ring-foreground/10";
  const choiceClass = (selected: boolean) => `cursor-pointer rounded-2xl border p-5 text-left transition focus-within:ring-2 focus-within:ring-accent/40 ${selected ? "border-foreground bg-foreground text-background shadow-premium" : "border-border bg-background/70 hover:border-foreground/40 hover:bg-muted/40"}`;

  if (status === "success") {
    return (
      <section id="angebotsanfrage" tabIndex={-1} className="mx-auto max-w-3xl scroll-mt-24 rounded-[2rem] border border-emerald-500/30 bg-emerald-500/8 p-8 text-left shadow-premium outline-none sm:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/35 text-emerald-700 dark:text-emerald-300"><Check className="h-5 w-5" /></div>
        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">{t.successTitle}</h3>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{t.success}</p>
      </section>
    );
  }

  const stepTitles = [t.goalTitle, t.situationTitle, t.aboutTitle, t.contactTitle];
  const stepTexts = [t.goalText, t.situationText, t.aboutText, t.contactText];

  return (
    <form id="angebotsanfrage" tabIndex={-1} aria-labelledby="contact-form-title" onSubmit={handleSubmit} noValidate className="mx-auto max-w-3xl scroll-mt-24 rounded-[2rem] border border-border bg-card p-6 text-left shadow-premium focus:outline-none sm:p-10">
      <div className="text-center">
        <h3 id="contact-form-title" className="text-3xl font-semibold tracking-[-0.04em]">{t.title}</h3>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">{t.intro}</p>
      </div>

      <OfferSelectionSummary />

      <div className="mt-8" aria-label={`${t.progress} ${step + 1} ${t.of} ${totalSteps}`}>
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>{t.progress} {step + 1} {t.of} {totalSteps}</span>
          <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>
      </div>

      <fieldset disabled={sending} className="mt-9">
        <legend className="sr-only">{stepTitles[step]}</legend>
        <h4 ref={stepTitleRef} tabIndex={-1} className="text-2xl font-semibold tracking-[-0.035em] outline-none">{stepTitles[step]}</h4>
        <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">{stepTexts[step]}</p>

        {step === 0 && (
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {t.goals.map(([value, label, description]) => (
              <label key={value} className={choiceClass(values.inquiryGoal === value)}>
                <input
                  type="radio"
                  name="inquiryGoal"
                  value={value}
                  checked={values.inquiryGoal === value}
                  onChange={() => { setValues((current) => ({ ...current, inquiryGoal: value })); setErrors({}); }}
                  className="sr-only"
                />
                <span className="block font-medium">{label}</span>
                <span className={`mt-2 block text-sm leading-6 ${values.inquiryGoal === value ? "text-background/75" : "text-muted-foreground"}`}>{description}</span>
              </label>
            ))}
            {errors.inquiryGoal && <p className="text-sm text-red-600 sm:col-span-2">{errors.inquiryGoal}</p>}
          </div>
        )}

        {step === 1 && (
          <div className="mt-7 space-y-7">
            <div>
              <p className="text-sm font-medium">{t.timeline}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {t.timelines.map(([value, label]) => (
                  <label key={value} className={choiceClass(values.timeline === value)}>
                    <input
                      type="radio"
                      name="timeline"
                      value={value}
                      checked={values.timeline === value}
                      onChange={() => { setValues((current) => ({ ...current, timeline: value })); setErrors({}); }}
                      className="sr-only"
                    />
                    <span className="block font-medium">{label}</span>
                  </label>
                ))}
              </div>
              {errors.timeline && <p className="mt-2 text-sm text-red-600">{errors.timeline}</p>}
            </div>

            <label className="block text-sm font-medium">
              {t.message}
              {selectedOffers.length > 0 && <span id="message-hint" className="mt-2 block text-sm font-normal leading-6 text-muted-foreground">{messageRequired ? selectionCopy[locale].messageIndividual : selectionCopy[locale].messageOptional}</span>}
              <textarea name="message" required={messageRequired} aria-describedby={selectedOffers.length > 0 ? "message-hint" : undefined} rows={5} value={values.message} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} maxLength={2000} aria-invalid={Boolean(errors.message)} className={`${fieldClass} resize-y`} placeholder={locale === "de" ? "Zum Beispiel: Angebote werden heute mehrfach übertragen, Freigaben laufen per E-Mail und niemand sieht den aktuellen Stand …" : undefined} />
              <span className="mt-2 flex justify-between gap-4 text-sm text-muted-foreground"><span>{errors.message && <span className="text-red-600">{errors.message}</span>}</span><span>{values.message.length}/2000</span></span>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {(["firstName", "lastName"] as const).map((name) => (
              <label key={name} className="text-sm font-medium">
                {t[name]}
                <input
                  name={name}
                  required
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
            <label className="text-sm font-medium sm:col-span-2">
              {t.company}
              <input name="company" required autoComplete="organization" value={values.company} onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))} maxLength={120} aria-invalid={Boolean(errors.company)} className={fieldClass} />
              {errors.company && <span className="mt-2 block text-sm text-red-600">{errors.company}</span>}
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              {t.email}
              <input name="email" required type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} maxLength={254} aria-invalid={Boolean(errors.email)} className={fieldClass} />
              {errors.email && <span className="mt-2 block text-sm text-red-600">{errors.email}</span>}
            </label>

            <label className="text-sm font-medium">
              {t.phone}
              <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value.replace(/(?!^\+)\D/g, "").replace(/\+(?=.+\+)/g, "") }))} maxLength={21} aria-invalid={Boolean(errors.phone)} className={fieldClass} />
              {errors.phone && <span className="mt-2 block text-sm text-red-600">{errors.phone}</span>}
            </label>
          </div>
        )}
      </fieldset>

      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))} />
      </label>

      <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {step > 0 && (
            <button type="button" onClick={goBack} disabled={sending} className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition hover:bg-muted disabled:opacity-50">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t.back}
            </button>
          )}
        </div>
        {step < totalSteps - 1 ? (
          <button type="button" onClick={goNext} className="inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background shadow-premium transition hover:opacity-90">
            {t.next} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background shadow-premium transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50">
            {status === "sending" ? t.sending : t.submit} {status !== "sending" && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
        )}
      </div>

      <div aria-live="polite" className="min-h-7 pt-4 text-center text-sm">
        {status === "error" && <p className="text-red-600">{t.failure}</p>}
      </div>
    </form>
  );
}

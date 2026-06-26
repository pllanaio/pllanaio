import Link from "next/link";
import { contactEmail } from "@/lib/site-content";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-muted-foreground transition hover:text-foreground">← Zurück zur Startseite</Link>
        <p className="mt-12 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Rechtliches</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Impressum</h1>
        <div className="mt-12 space-y-8 leading-8 text-muted-foreground">
          <p>Leon Pllana IT-Solutions</p>
          <p>Leon Pllana<br />TODO: Straße und Hausnummer<br />TODO: PLZ und Ort<br />Deutschland</p>
          <p>E-Mail: <a className="text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          <p>Telefon: TODO: Telefonnummer</p>
          <p>Umsatzsteuer-ID: TODO</p>
          <p className="rounded-3xl border border-border bg-card p-6">Bitte diese Platzhalter vor Veröffentlichung mit den korrekten Unternehmensdaten ersetzen und rechtlich prüfen lassen.</p>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { contactEmail } from "@/lib/site-content";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-muted-foreground transition hover:text-foreground">← Zurück zur Startseite</Link>
        <p className="mt-12 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Rechtliches</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Datenschutzerklärung</h1>
        <div className="mt-12 space-y-8 leading-8 text-muted-foreground">
          <p>Diese Datenschutzerklärung ist ein Platzhalter und muss vor Veröffentlichung final geprüft und auf die tatsächlich eingesetzten Dienste angepasst werden.</p>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Verantwortliche Stelle</h2>
            <p className="mt-4">Leon Pllana IT-Solutions<br />E-Mail: <a className="text-foreground underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Verarbeitung personenbezogener Daten</h2>
            <p className="mt-4">Personenbezogene Daten werden verarbeitet, wenn Besucher Kontakt aufnehmen oder technische Informationen beim Aufruf der Website übertragen werden.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Kontaktaufnahme</h2>
            <p className="mt-4">Bei Kontaktaufnahme per E-Mail werden die übermittelten Angaben zur Bearbeitung der Anfrage verwendet.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Hosting und technische Bereitstellung</h2>
            <p className="mt-4">TODO: Hosting-Anbieter, Serverstandort und eingesetzte Dienste ergänzen.</p>
          </section>
          <p className="rounded-3xl border border-border bg-card p-6">Bitte diese Seite vor Veröffentlichung rechtlich prüfen und um alle tatsächlich verwendeten Tools, Dienste und Auftragsverarbeiter ergänzen.</p>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function AGBPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-muted-foreground transition hover:text-foreground">← Zurück zur Startseite</Link>
        <p className="mt-12 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Rechtliches</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">AGB</h1>
        <div className="mt-12 space-y-8 leading-8 text-muted-foreground">
          <p>TODO: Inhalte ergänzen.</p>
          <p className="rounded-3xl border border-border bg-card p-6">Diese Seite ist ein Platzhalter und muss vor Veröffentlichung finalisiert werden.</p>
        </div>
      </div>
    </main>
  );
}

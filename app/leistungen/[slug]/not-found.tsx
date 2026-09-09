import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <main className="flex min-h-screen items-center bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">404 · Nicht gefunden</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">Diese Leistung wurde nicht gefunden.</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          In der Leistungsübersicht finden Sie Website-Betreuung, Microsoft 365, Cloud-Dienste und individuelle Projekte.
        </p>
        <Link
          href="/leistungen"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Zur Leistungsübersicht
        </Link>
      </div>
    </main>
  );
}

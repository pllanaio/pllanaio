import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "E-Mail-Anmeldung bestätigen | Leon Pllana IT-Solutions",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function ConfirmMarketingPage({ searchParams }: { searchParams: Promise<{ invalid?: string }> }) {
  const { invalid } = await searchParams;

  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden px-4 py-16 text-foreground sm:px-6">
      <div className="gradient-grid absolute inset-0 -z-10 opacity-40" />
      <section className="w-full max-w-2xl rounded-[2.5rem] border border-border bg-card/90 p-7 text-center shadow-premium backdrop-blur-xl sm:p-12" aria-labelledby="confirm-marketing-title">
        <Link href="/" className="mx-auto flex w-fit items-center gap-3 text-sm font-semibold">
          <Image src="/logo.png" alt="Leon Pllana IT-Solutions Logo" width={36} height={36} className="rounded-xl" priority />
          <span>Leon Pllana IT-Solutions</span>
        </Link>
        <p className="mt-10 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Double-Opt-in</p>
        <h1 id="confirm-marketing-title" className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">E-Mail-Anmeldung bestätigen</h1>
        {invalid ? (
          <p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">Der Bestätigungslink ist unvollständig oder abgelaufen. Eine Anmeldung wurde nicht vorgenommen.</p>
        ) : (
          <>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Bestätigen Sie aktiv, dass Sie gelegentlich praktische Website-Tipps und Informationen zu den Leistungen von Leon Pllana IT-Solutions erhalten möchten.</p>
            <form action="/api/website-check/confirm-marketing" method="post" className="mt-8">
              <button type="submit" className="inline-flex min-h-14 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background shadow-premium transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">E-Mail-Adresse verbindlich bestätigen</button>
            </form>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Erst nach dieser bewussten Bestätigung wird Ihre Einwilligung als abgeschlossen behandelt.</p>
          </>
        )}
        <div className="mt-9 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"><Link href="/datenschutz" className="underline underline-offset-4 hover:text-foreground">Datenschutz</Link><Link href="/website-check" className="underline underline-offset-4 hover:text-foreground">Zum Website-Check</Link></div>
      </section>
    </main>
  );
}

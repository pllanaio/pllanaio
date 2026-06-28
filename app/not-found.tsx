import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { NotFoundTracker } from "@/components/not-found-tracker";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-background px-6 py-24 text-foreground">
      <NotFoundTracker />
      <div className="gradient-grid absolute inset-0 opacity-50" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">404 · Nicht gefunden</p>
        <h1 className="mt-6 text-6xl font-semibold tracking-[-0.075em] sm:text-8xl">Dieser Schritt führt ins Leere.</h1>
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">
          Die angeforderte Seite existiert nicht oder wurde verschoben. Kehren Sie zur Startseite zurück und entdecken Sie, wie aus Prozessen digitale Entwicklungsschritte werden.
        </p>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link href="/">
              Zur Startseite <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

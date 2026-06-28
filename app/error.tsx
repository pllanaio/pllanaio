"use client";

import { useEffect } from "react";
import { Button } from "@/components/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-background px-6 py-24 text-foreground">
      <div className="gradient-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Systemhinweis</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Ein Schritt konnte nicht geladen werden.</h1>
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">
          Bitte versuchen Sie es erneut. Falls das Problem bestehen bleibt, erreichen Sie uns direkt unter info@pllana.io.
        </p>
        <div className="mt-10 flex justify-center">
          <Button onClick={reset} size="lg">Erneut versuchen</Button>
        </div>
      </div>
    </main>
  );
}

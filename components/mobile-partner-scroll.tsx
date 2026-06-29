"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export function MobilePartnerScroll({ children }: { children: ReactNode }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const markInteracted = () => setHasInteracted(true);

  return (
    <div className="md:hidden">
      <div className="relative">
        {!hasInteracted ? (
          <>
            <div className="pointer-events-none absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-lg text-muted-foreground shadow-premium backdrop-blur-xl animate-pulse">
              ←
            </div>
            <div className="pointer-events-none absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-lg text-muted-foreground shadow-premium backdrop-blur-xl animate-pulse">
              →
            </div>
          </>
        ) : null}

        <div
          onPointerDown={markInteracted}
          onTouchStart={markInteracted}
          onScroll={markInteracted}
          className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-8"
          aria-label="Kundenlogos horizontal scrollen"
        >
          {children}
        </div>
      </div>

      {!hasInteracted ? (
        <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Wischen, um weitere Referenzen anzusehen
        </p>
      ) : null}
    </div>
  );
}

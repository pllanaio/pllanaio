"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function MobilePartnerScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pauseUntil = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let last = performance.now();

    const step = (now: number) => {
      const delta = now - last;
      last = now;

      if (now > pauseUntil.current && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += delta * 0.025;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }

      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const pause = () => {
    pauseUntil.current = performance.now() + 1400;
  };

  return (
    <div
      ref={ref}
      onPointerDown={pause}
      onTouchStart={pause}
      onWheel={pause}
      className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-8 md:hidden"
      aria-label="Kundenlogos horizontal scrollen"
    >
      {children}
    </div>
  );
}

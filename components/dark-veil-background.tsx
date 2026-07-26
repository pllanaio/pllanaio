"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const DarkVeil = dynamic(() => import("@/components/dark-veil"), {
  ssr: false,
  loading: () => null,
});

export function DarkVeilBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [enableWebGl, setEnableWebGl] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || resolvedTheme !== "dark") {
      setEnableWebGl(false);
      return;
    }

    const mobile = window.matchMedia("(max-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (mobile.matches || reducedMotion.matches) {
        setEnableWebGl(false);
        return;
      }

      const timer = window.setTimeout(() => setEnableWebGl(true), 1200);
      return () => window.clearTimeout(timer);
    };

    const cleanupTimer = update();
    mobile.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      cleanupTimer?.();
      mobile.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div className="darkveil-background" aria-hidden="true">
      {enableWebGl ? (
        <DarkVeil
          hueShift={18}
          noiseIntensity={0.035}
          speed={0.35}
          warpAmount={0.12}
          resolutionScale={1}
        />
      ) : null}
    </div>
  );
}

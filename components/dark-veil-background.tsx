"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DarkVeil from "@/components/dark-veil";

export function DarkVeilBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div className="darkveil-background" aria-hidden="true">
      <DarkVeil
        hueShift={18}
        noiseIntensity={0.035}
        speed={0.35}
        warpAmount={0.12}
        resolutionScale={1}
      />
    </div>
  );
}

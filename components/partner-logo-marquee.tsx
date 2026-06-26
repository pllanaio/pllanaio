"use client";

import { motion } from "framer-motion";
import { partnerCompanies } from "@/lib/site-content";

export function PartnerLogoMarquee() {
  const logos = [...partnerCompanies, ...partnerCompanies];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card py-5 shadow-premium">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: [0, -50 * partnerCompanies.length * 4] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {logos.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex h-16 min-w-44 items-center justify-center rounded-2xl border border-border bg-background px-8 text-sm font-semibold tracking-[-0.02em] text-muted-foreground grayscale transition hover:text-foreground"
          >
            {logo}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

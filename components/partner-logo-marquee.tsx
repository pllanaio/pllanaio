"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { partnerCompanies } from "@/lib/site-content";

export function PartnerLogoMarquee() {
  const partners = [...partnerCompanies, ...partnerCompanies, ...partnerCompanies];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card py-5 shadow-premium">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: [0, -220 * partnerCompanies.length] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {partners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-16 min-w-52 items-center justify-center rounded-2xl border border-border bg-background px-8 text-sm font-semibold tracking-[-0.02em] text-muted-foreground transition hover:text-foreground"
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={40}
                className="max-h-8 w-auto object-contain opacity-70 grayscale transition group-hover:opacity-100"
              />
            ) : (
              partner.name
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

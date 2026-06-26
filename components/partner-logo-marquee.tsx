"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { partnerCompanies, type PartnerCompany } from "@/lib/site-content";

function PartnerItem({ partner }: { partner: PartnerCompany }) {
  const content = (
    <>
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={280}
          height={96}
          className="max-h-16 w-auto object-contain opacity-70 grayscale transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 dark:brightness-0 dark:invert"
          priority={false}
        />
      ) : (
        <span className="text-xl font-semibold tracking-[-0.04em] text-foreground/70 transition group-hover:text-foreground">
          {partner.name}
        </span>
      )}
    </>
  );

  const className = "group flex h-28 min-w-80 items-center justify-center px-10 transition";

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noreferrer" className={className} aria-label={`${partner.name} Website öffnen`}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export function PartnerLogoMarquee() {
  const partners = [...partnerCompanies, ...partnerCompanies, ...partnerCompanies, ...partnerCompanies];

  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-background py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background via-background/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background via-background/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <motion.div
        className="flex w-max gap-14"
        animate={{ x: [0, -384 * partnerCompanies.length] }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      >
        {partners.map((partner, index) => (
          <PartnerItem key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </motion.div>
    </div>
  );
}

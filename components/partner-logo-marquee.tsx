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
          width={170}
          height={44}
          className="max-h-9 w-auto object-contain opacity-75 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span>{partner.name}</span>
      )}
    </>
  );

  const className = "group flex h-20 min-w-56 items-center justify-center rounded-2xl border border-border bg-background px-8 text-sm font-semibold tracking-[-0.02em] text-muted-foreground transition hover:text-foreground";

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
  const partners = [...partnerCompanies, ...partnerCompanies, ...partnerCompanies];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card py-5 shadow-premium">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: [0, -240 * partnerCompanies.length] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {partners.map((partner, index) => (
          <PartnerItem key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </motion.div>
    </div>
  );
}

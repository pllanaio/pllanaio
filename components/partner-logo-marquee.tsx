import Image from "next/image";
import { partnerCompanies, type PartnerCompany } from "@/lib/site-content";

function PartnerItem({ partner }: { partner: PartnerCompany }) {
  const logoWidth = partner.width ?? 280;
  const logoHeight = partner.height ?? 80;
  const offsetY = partner.offsetY ?? 0;

  const content = (
    <>
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={logoWidth}
          height={logoHeight}
          className="w-auto object-contain opacity-85 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
          style={{
            maxHeight: logoHeight,
            transform: `translateY(${offsetY}px)`,
          }}
          loading="lazy"
          sizes="(max-width: 768px) 240px, 280px"
        />
      ) : (
        <span className="text-xl font-semibold tracking-[-0.04em] text-foreground/70 transition group-hover:text-foreground">
          {partner.name}
        </span>
      )}
    </>
  );

  const className = "group flex h-32 min-w-72 snap-center items-center justify-center px-8 transition sm:min-w-80 sm:px-10";

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
  const desktopPartners = [...partnerCompanies, ...partnerCompanies, ...partnerCompanies, ...partnerCompanies];

  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-background py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-8 md:hidden" aria-label="Kundenlogos horizontal scrollen">
        {partnerCompanies.map((partner) => (
          <PartnerItem key={partner.name} partner={partner} />
        ))}
      </div>

      <div className="marquee-track hidden w-max gap-14 md:flex" aria-hidden="true">
        {desktopPartners.map((partner, index) => (
          <PartnerItem key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

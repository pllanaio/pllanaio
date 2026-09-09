"use client";

import { useLocale } from "@/components/locale-provider";
import { servicePackages } from "@/lib/service-packages";
import { projectOffers } from "@/lib/project-offers";
import { servicesUiCopy } from "@/lib/services/ui-copy";
import type { ServicePackageId } from "@/lib/services/types";

export function ServicePricePreview({ packageId }: { packageId: ServicePackageId }) {
  const { locale } = useLocale();
  const copy = servicesUiCopy[locale];
  const service = servicePackages.find((item) => item.id === packageId);
  const setup = projectOffers.find((item) => item.id === (packageId === "web" ? "website" : packageId === "workplace" ? "microsoft365" : ""));
  const euro = (value: number) => `${new Intl.NumberFormat(locale).format(value)} €`;

  return <div className="mt-6 border-t border-border pt-5">
    {service ? <p className="text-xl font-semibold">{copy.from} {euro(service.monthlyPrice)} <span className="text-sm font-normal text-muted-foreground">{copy.monthly}</span></p> : <p className="text-xl font-semibold">{copy.onRequest}</p>}
    {setup?.fixedPrice != null && <p className="mt-2 text-sm text-muted-foreground">{copy.setupOptional}: {euro(setup.fixedPrice)} {copy.once}</p>}
    <p className="mt-2 text-xs leading-5 text-muted-foreground">{copy.net}</p>
  </div>;
}

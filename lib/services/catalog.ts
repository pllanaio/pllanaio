import type { ServicePackageId, ServiceSlug } from "./types";

export const serviceLinks = [
  { slug: "web-care", name: "Web Care", packageId: "web", href: "/leistungen/web-care" },
  { slug: "workplace-care", name: "Workplace Care", packageId: "workplace", href: "/leistungen/workplace-care" },
  { slug: "cloud-app-care", name: "Cloud & App Care", packageId: "cloud", href: "/leistungen/cloud-app-care" },
  { slug: "individual-care", name: "Individual Care", packageId: "individual", href: "/leistungen/individual-care" },
] as const satisfies readonly { slug: ServiceSlug; name: string; packageId: ServicePackageId; href: string }[];

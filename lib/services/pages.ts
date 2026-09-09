import { serviceLinks } from "./catalog";
import { webCareCopy } from "./web-care";
import { workplaceCareCopy } from "./workplace-care";
import { cloudAppCareCopy } from "./cloud-app-care";
import { individualCareCopy } from "./individual-care";
import type { ServicePage, ServiceSlug } from "./types";

const copyBySlug = {
  "web-care": webCareCopy,
  "workplace-care": workplaceCareCopy,
  "cloud-app-care": cloudAppCareCopy,
  "individual-care": individualCareCopy,
};

export const servicePages: readonly ServicePage[] = serviceLinks.map((link) => ({ ...link, copy: copyBySlug[link.slug] }));

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug);
}

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return serviceLinks.some((service) => service.slug === slug);
}

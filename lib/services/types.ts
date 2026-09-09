import type { Locale } from "@/lib/i18n";

export type ServiceSlug = "web-care" | "workplace-care" | "cloud-app-care" | "individual-care";
export type ServicePackageId = "web" | "workplace" | "cloud" | "individual";
export type ServicePageCopy = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  problemsTitle: string;
  problems: readonly string[];
  benefitsTitle: string;
  benefits: readonly { title: string; text: string }[];
  deliverablesTitle: string;
  deliverables: readonly { title: string; text: string }[];
  processTitle: string;
  process: readonly { title: string; text: string }[];
  faqTitle: string;
  faqs: readonly { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
};

export type ServicePage = {
  slug: ServiceSlug;
  name: string;
  packageId: ServicePackageId;
  href: string;
  copy: Record<Locale, ServicePageCopy>;
};

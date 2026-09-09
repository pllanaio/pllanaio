import { projectOffers } from "./project-offers";
import { servicePackages } from "./service-packages";

export const offerIds = [
  "web-care",
  "website-setup",
  "workplace-care",
  "workplace-setup",
  "cloud-care",
  "individual-care",
] as const;

export type OfferId = (typeof offerIds)[number];

export type OfferSummaryItem = {
  id: OfferId;
  name: string;
  once: number | null;
  monthly: number | null;
  onRequest: boolean;
};

const offers: Record<OfferId, OfferSummaryItem> = {
  "web-care": {
    id: "web-care", name: "Web Care", once: null,
    monthly: servicePackages.find((item) => item.id === "web")!.monthlyPrice, onRequest: false,
  },
  "website-setup": {
    id: "website-setup", name: "Website-Erstellung", monthly: null,
    once: projectOffers.find((item) => item.id === "website")!.fixedPrice, onRequest: false,
  },
  "workplace-care": {
    id: "workplace-care", name: "Workplace Care", once: null,
    monthly: servicePackages.find((item) => item.id === "workplace")!.monthlyPrice, onRequest: false,
  },
  "workplace-setup": {
    id: "workplace-setup", name: "Microsoft-365-Einrichtung", monthly: null,
    once: projectOffers.find((item) => item.id === "microsoft365")!.fixedPrice, onRequest: false,
  },
  "cloud-care": {
    id: "cloud-care", name: "Cloud & App Care", once: null,
    monthly: servicePackages.find((item) => item.id === "cloud")!.monthlyPrice, onRequest: false,
  },
  "individual-care": {
    id: "individual-care", name: "Individual Care", once: null, monthly: null, onRequest: true,
  },
};

/** Treat IDs as the only client-supplied offer data. Prices always come from this catalogue. */
export function parseOfferSelection(value: unknown): OfferId[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 32) return null;
  if (!value.every((id) => typeof id === "string" && offerIds.includes(id as OfferId))) return null;

  // Canonical ordering also removes duplicates, so a package is never charged twice.
  return offerIds.filter((id) => value.includes(id));
}

export function getOfferSummary(ids: readonly OfferId[]) {
  const items = offerIds.filter((id) => ids.includes(id)).map((id) => ({ ...offers[id] }));
  return {
    items,
    oneTimeTotal: items.reduce((total, item) => total + (item.once ?? 0), 0),
    monthlyTotal: items.reduce((total, item) => total + (item.monthly ?? 0), 0),
    hasIndividual: items.some((item) => item.onRequest),
  };
}

/** An individual request needs a brief description; a priced selection can stand on its own. */
export function isOfferMessageValid(message: string, ids: readonly OfferId[]) {
  const length = message.trim().length;
  if (length > 2000) return false;
  if (length >= 10) return true;
  return length === 0 && ids.length > 0 && !ids.includes("individual-care");
}

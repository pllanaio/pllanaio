export const GTM_ID = "GTM-KVZZWNP3";
export const GA_MEASUREMENT_ID = "G-FNWF7LJK3B";
const CONSENT_KEY = "pllana-cookie-consent";

type TrackingParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function pushDataLayer(event: string, params: TrackingParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

function pushGoogleConsent(command: "default" | "update", granted: boolean) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    command,
    {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ]);
}

export function setDefaultGoogleConsent() {
  pushGoogleConsent("default", false);
}

export function updateGoogleConsent(granted: boolean) {
  pushGoogleConsent("update", granted);
}

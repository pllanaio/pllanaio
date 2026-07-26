"use client";

import { useEffect, useRef } from "react";
import { hasAnalyticsConsent } from "@/components/cookie-banner";
import { GTM_ID, pushDataLayer, updateGoogleConsent } from "@/lib/tracking";

type ClickEvent = { event: string; label: string };

declare global {
  interface Window {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  }
}

function getClickEventName(anchor: HTMLAnchorElement): ClickEvent | null {
  const href = anchor.getAttribute("href") ?? "";
  const label = anchor.textContent?.trim().replace(/\s+/g, " ") ?? "";

  if (href.startsWith("mailto:")) return { event: "email_click", label: label || "Email" };
  if (href.startsWith("tel:")) return { event: "phone_click", label: label || "Phone" };
  if (href.includes("api.whatsapp.com")) return { event: "whatsapp_click", label: label || "WhatsApp" };
  if (href.includes("linkedin.com")) return { event: "linkedin_click", label: label || "LinkedIn" };
  if (href.includes("instagram.com")) return { event: "instagram_click", label: label || "Instagram" };
  if (href.includes("/partners/") || anchor.getAttribute("aria-label")?.includes("Website öffnen")) return { event: "partner_click", label: label || href };
  if (href === "#kontakt") return { event: "cta_click", label: label || "Kontakt" };
  if (href === "#denkweise") return { event: "navigation_click", label: label || "Denkweise" };
  if (href.startsWith("http")) return { event: "outbound_link", label: label || href };

  return null;
}

function loadGoogleTagManager() {
  if (document.getElementById("google-tag-manager-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "google-tag-manager-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function scheduleGoogleTagManager() {
  if (document.getElementById("google-tag-manager-script")) return () => undefined;

  if (window.requestIdleCallback) {
    const handle = window.requestIdleCallback(loadGoogleTagManager, { timeout: 4000 });
    return () => window.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(loadGoogleTagManager, 2500);
  return () => window.clearTimeout(handle);
}

export function trackEvent(event: string, params?: Record<string, string | number | boolean>) {
  if (!hasAnalyticsConsent()) return;

  pushDataLayer(event, {
    ...params,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

export function Analytics() {
  const scrollDepths = useRef(new Set<number>());

  useEffect(() => {
    let cancelScheduledLoad = () => undefined;

    const consentGranted = hasAnalyticsConsent();
    updateGoogleConsent(consentGranted);

    if (consentGranted) {
      cancelScheduledLoad = scheduleGoogleTagManager();
      pushDataLayer("page_view", {
        page_path: window.location.pathname,
        page_title: document.title,
        analytics_consent: true,
      });
    }

    function handleConsent(event: Event) {
      const consent = (event as CustomEvent).detail;
      const granted = consent === "accepted";
      updateGoogleConsent(granted);

      if (granted) {
        cancelScheduledLoad();
        cancelScheduledLoad = scheduleGoogleTagManager();
        pushDataLayer("cookie_accept", { analytics_consent: true });
        pushDataLayer("page_view", {
          page_path: window.location.pathname,
          page_title: document.title,
          analytics_consent: true,
        });
      }
    }

    function handleClick(event: MouseEvent) {
      if (!hasAnalyticsConsent()) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const clickEvent = getClickEventName(anchor);
      if (!clickEvent) return;

      pushDataLayer(clickEvent.event, {
        link_url: anchor.href,
        link_text: clickEvent.label,
        page_path: window.location.pathname,
      });
    }

    function handleScroll() {
      if (!hasAnalyticsConsent()) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.round((window.scrollY / scrollable) * 100);

      [25, 50, 75, 100].forEach((depth) => {
        if (percent >= depth && !scrollDepths.current.has(depth)) {
          scrollDepths.current.add(depth);
          pushDataLayer("scroll_depth", { scroll_depth: depth, page_path: window.location.pathname });
        }
      });
    }

    window.addEventListener("pllana-cookie-consent", handleConsent);
    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelScheduledLoad();
      window.removeEventListener("pllana-cookie-consent", handleConsent);
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}

"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/components/cookie-banner";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function getClickEventName(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? "";
  const label = anchor.textContent?.trim().replace(/\s+/g, " ") ?? "";

  if (href.startsWith("mailto:")) return { event: "cta_contact_email", label: label || "Gespräch anfragen" };
  if (href.includes("api.whatsapp.com")) return { event: "cta_whatsapp", label: label || "WhatsApp" };
  if (href.includes("linkedin.com")) return { event: "cta_linkedin", label: label || "LinkedIn" };
  if (href.includes("instagram.com")) return { event: "cta_instagram", label: label || "Instagram" };
  if (href === "#kontakt") return { event: "cta_contact_section", label: label || "Kontakt" };
  if (href === "#denkweise") return { event: "cta_thinking_section", label: label || "Denkweise" };
  if (href.startsWith("http")) return { event: "outbound_link", label: label || href };

  return null;
}

export function trackEvent(event: string, params?: Record<string, string | number | boolean>) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag || !hasAnalyticsConsent()) return;
  window.gtag("event", event, params ?? {});
}

export function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    function handleConsent(event: Event) {
      const consent = (event as CustomEvent).detail;
      setEnabled(consent === "accepted");
    }

    window.addEventListener("pllana-cookie-consent", handleConsent);
    return () => window.removeEventListener("pllana-cookie-consent", handleConsent);
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !enabled) return;

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const clickEvent = getClickEventName(anchor);
      if (!clickEvent) return;

      trackEvent(clickEvent.event, {
        link_url: anchor.href,
        link_text: clickEvent.label,
        page_path: window.location.pathname,
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [enabled]);

  if (!GA_MEASUREMENT_ID || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

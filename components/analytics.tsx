"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { hasAnalyticsConsent } from "@/components/cookie-banner";
import { GTM_ID, pushDataLayer, updateGoogleConsent } from "@/lib/tracking";

type ClickEvent = { event: string; label: string };

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

export function trackEvent(event: string, params?: Record<string, string | number | boolean>) {
  pushDataLayer(event, {
    ...params,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

export function Analytics() {
  const scrollDepths = useRef(new Set<number>());

  useEffect(() => {
    updateGoogleConsent(hasAnalyticsConsent());
    pushDataLayer("page_view", {
      page_path: window.location.pathname,
      page_title: document.title,
      analytics_consent: hasAnalyticsConsent(),
    });

    function handleConsent(event: Event) {
      const consent = (event as CustomEvent).detail;
      const granted = consent === "accepted";
      updateGoogleConsent(granted);
      pushDataLayer(granted ? "cookie_accept" : "cookie_decline", {
        analytics_consent: granted,
      });
    }

    function handleClick(event: MouseEvent) {
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
      window.removeEventListener("pllana-cookie-consent", handleConsent);
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Script id="gtm-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'default_consent',
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `}
      </Script>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    </>
  );
}

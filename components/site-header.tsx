"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { serviceLinks } from "@/lib/services/catalog";
import { siteNav } from "@/lib/site-content";

const linkClass = "rounded-lg text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent aria-[current=page]:text-foreground";
const iconButtonClass = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function SiteHeader() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const mobileId = useId();
  const servicesId = useId();

  function closeNavigation() {
    setMobileOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen && !servicesOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [mobileOpen, servicesOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-xl"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || (!mobileOpen && !servicesOpen)) return;
        event.preventDefault();
        if (servicesOpen) servicesButtonRef.current?.focus();
        else mobileButtonRef.current?.focus();
        closeNavigation();
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" onClick={closeNavigation} className="flex min-w-0 items-center gap-2 rounded-lg text-xs font-semibold tracking-[-0.02em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:gap-3 sm:text-sm">
          <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-xl" priority />
          <span>Leon Pllana IT-Solutions</span>
        </Link>

        <nav className="hidden xl:block" aria-label={t.navigation.main}>
          <ul className="flex items-center gap-4">
            {siteNav.map((item, index) => (
              <li key={item.href} className={item.href === "/leistungen" ? "relative flex items-center" : undefined}>
                <Link href={item.href} onClick={closeNavigation} aria-current={pathname === item.href ? "page" : undefined} className={linkClass}>
                  {t.nav[index]}
                </Link>
                {item.href === "/leistungen" ? (
                  <>
                    <button
                      ref={servicesButtonRef}
                      type="button"
                      className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={t.navigation.services}
                      aria-expanded={servicesOpen}
                      aria-controls={servicesId}
                      onClick={() => setServicesOpen((open) => !open)}
                    >
                      <svg className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    <ul id={servicesId} hidden={!servicesOpen} aria-label={t.navigation.serviceList} className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-border bg-background p-2 shadow-premium">
                      {serviceLinks.map((service) => (
                        <li key={service.slug}>
                          <Link href={service.href} onClick={closeNavigation} aria-current={pathname === service.href ? "page" : undefined} className={`${linkClass} block px-4 py-3 hover:bg-muted aria-[current=page]:bg-muted`}>
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden md:block"><ThemeToggle /></div>
          <div className="hidden md:block"><Button asChild size="sm"><Link href="/#kontakt" onClick={closeNavigation}>{t.headerCta}</Link></Button></div>
          <button
            ref={mobileButtonRef}
            type="button"
            className={`${iconButtonClass} xl:hidden`}
            aria-label={mobileOpen ? t.navigation.close : t.navigation.open}
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => {
              setMobileOpen((open) => !open);
              setServicesOpen(false);
            }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id={mobileId} hidden={!mobileOpen} aria-label={t.navigation.main} className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border px-4 py-4 sm:px-6 xl:hidden">
        <ul className="mx-auto max-w-7xl space-y-1">
          {siteNav.map((item, index) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeNavigation} aria-current={pathname === item.href ? "page" : undefined} className={`${linkClass} block px-3 py-3 hover:bg-muted`}>
                {t.nav[index]}
              </Link>
              {item.href === "/leistungen" ? (
                <ul aria-label={t.navigation.serviceList} className="mb-2 ml-3 border-l border-border pl-2">
                  {serviceLinks.map((service) => (
                    <li key={service.slug}>
                      <Link href={service.href} onClick={closeNavigation} aria-current={pathname === service.href ? "page" : undefined} className={`${linkClass} block px-3 py-3 hover:bg-muted aria-[current=page]:bg-muted`}>
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-4 max-w-7xl border-t border-border pt-4">
          <Button asChild><Link href="/#kontakt" onClick={closeNavigation}>{t.headerCta}</Link></Button>
        </div>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { useOfferSelection } from "@/components/offer-selection-provider";
import { getOfferSummary } from "@/lib/offer-selection";
import { selectionCopy } from "@/lib/offer-selection-copy";
import { portfolioCopy } from "@/lib/service-packages";
import { projectCopy } from "@/lib/project-offers";

export function OfferSelectionSummary() {
  const { locale } = useLocale();
  const { selectedOffers, removeOffers, sending } = useOfferSelection();
  if (selectedOffers.length === 0) return null;
  const copy = selectionCopy[locale];
  const summary = getOfferSummary(selectedOffers);
  const euro = (value: number) => `${new Intl.NumberFormat(locale).format(value)} €`;
  const from = portfolioCopy[locale].from;
  const actionClass = "rounded-sm text-sm underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50";

  return (
    <section aria-labelledby="selected-offers-title" className="mt-8 rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
      <h4 id="selected-offers-title" className="text-xl font-semibold">{copy.summary}</h4>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.summaryIntro}</p>
      <ul className="mt-5 divide-y divide-border">
        {summary.items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
            <div>
              <p className="font-medium">{copy.names[item.id]}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.once !== null && `${euro(item.once)} ${copy.once}`}
                {item.monthly !== null && `${from} ${euro(item.monthly)} ${copy.monthly}`}
                {item.onRequest && projectCopy[locale].onRequest}
              </p>
            </div>
            <button type="button" disabled={sending} onClick={() => removeOffers([item.id])} aria-label={`${copy.remove}: ${copy.names[item.id]}`} className={`${actionClass} min-h-11 px-1`}>{copy.remove}</button>
          </li>
        ))}
      </ul>
      <dl className="mt-2 grid gap-4 border-t border-border pt-5 sm:grid-cols-2" aria-live="polite" aria-atomic="true">
        {summary.oneTimeTotal > 0 && <div><dt className="text-sm text-muted-foreground">{copy.oneTimeTotal}</dt><dd className="mt-1 text-2xl font-semibold">{euro(summary.oneTimeTotal)}</dd></div>}
        {summary.monthlyTotal > 0 && <div><dt className="text-sm text-muted-foreground">{copy.monthlyTotal}</dt><dd className="mt-1 text-2xl font-semibold">{from} {euro(summary.monthlyTotal)}</dd></div>}
        {summary.hasIndividual && <div className="text-sm leading-6 sm:col-span-2"><dt className="font-medium">Individual Care</dt><dd>{copy.individualExtra}</dd></div>}
      </dl>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy.costsNote}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <Link href="/#pakete" className={actionClass}>{copy.change}</Link>
        <button type="button" disabled={sending} onClick={() => removeOffers(selectedOffers)} className={actionClass}>{copy.clear}</button>
      </div>
    </section>
  );
}

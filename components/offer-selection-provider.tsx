"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { parseOfferSelection, type OfferId } from "@/lib/offer-selection";

type SelectionContext = {
  selectedOffers: OfferId[];
  replaceGroup: (group: readonly OfferId[], selection: readonly OfferId[]) => void;
  removeOffers: (ids: readonly OfferId[]) => void;
  sending: boolean;
  setSending: (sending: boolean) => void;
};

const OfferSelectionContext = createContext<SelectionContext | null>(null);

export function OfferSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedOffers, setSelectedOffers] = useState<OfferId[]>([]);
  const [sending, setSending] = useState(false);

  function replaceGroup(group: readonly OfferId[], selection: readonly OfferId[]) {
    setSelectedOffers((current) => parseOfferSelection([...current.filter((id) => !group.includes(id)), ...selection]) ?? current);
  }

  function removeOffers(ids: readonly OfferId[]) {
    setSelectedOffers((current) => current.filter((id) => !ids.includes(id)));
  }

  return <OfferSelectionContext.Provider value={{ selectedOffers, replaceGroup, removeOffers, sending, setSending }}>{children}</OfferSelectionContext.Provider>;
}

export function useOfferSelection() {
  const context = useContext(OfferSelectionContext);
  if (!context) throw new Error("OfferSelectionProvider is required");
  return context;
}

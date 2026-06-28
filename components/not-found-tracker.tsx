"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/tracking";

export function NotFoundTracker() {
  useEffect(() => {
    pushDataLayer("404_view", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, []);

  return null;
}

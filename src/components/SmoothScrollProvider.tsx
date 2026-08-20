"use client";

import { useEffect } from "react";

/**
 * Intercepts clicks on anchor links (href="#...") and performs
 * smooth scrolling via JS instead of relying on CSS scroll-behavior.
 * This avoids the scrollbar-drag lag that CSS scroll-behavior causes.
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      // Extract element id by removing leading # and any query params (?param=value)
      const cleanId = rawHref.split("?")[0].replace(/^#/, "");
      if (!cleanId) return;

      const el = document.getElementById(cleanId);
      if (!el) return;

      e.preventDefault();

      if (rawHref.includes("?")) {
        history.pushState(null, "", rawHref);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else {
        history.pushState(null, "", `#${cleanId}`);
      }

      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

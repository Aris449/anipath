"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Find all scrollable mains (mobile + desktop)
    const mains = document.querySelectorAll("main.flex-1");

    mains.forEach((el) => {
      el.scrollTo({ top: 0, behavior: "instant" as any });
    });
  }, [pathname]);

  return null;
}

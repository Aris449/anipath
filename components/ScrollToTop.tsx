"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>("");

  useEffect(() => {
    const currentAnimeMatch = pathname.match(/\/anime\/(\d+)\//);
    const prevAnimeMatch = prevPathnameRef.current.match(/\/anime\/(\d+)\//);

    const currentAnimeId = currentAnimeMatch?.[1];
    const prevAnimeId = prevAnimeMatch?.[1];

    if (currentAnimeId !== prevAnimeId) {
      const mains = document.querySelectorAll("main.flex-1");
      mains.forEach((el) => {
        el.scrollTo({ top: 0, behavior: "instant" as any });
      });
    }

    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}

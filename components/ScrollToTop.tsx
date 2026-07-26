"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>("");

  useEffect(() => {
    const currentMediaMatch = pathname.match(/\/(anime|manga)\/(\d+)\//);
    const prevMediaMatch = prevPathnameRef.current.match(/\/(anime|manga)\/(\d+)\//);

    const currentMediaId = currentMediaMatch?.[2];
    const prevMediaId = prevMediaMatch?.[2];

    if (currentMediaId !== prevMediaId) {
      const mains = document.querySelectorAll("main.flex-1");
      mains.forEach((el) => {
        el.scrollTo({ top: 0, behavior: "instant" as any });
      });
    }

    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}

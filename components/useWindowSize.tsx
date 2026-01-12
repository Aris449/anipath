"use client";

import { useEffect, useState, useLayoutEffect } from "react";

export default function useIsDesktop() {
  // IMPORTANT: SSR-safe default
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1400);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isDesktop;
}

export function useIsMobile(breakpoint = 1000) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    update(); // measure before paint
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isMobile;
}
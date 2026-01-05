import { useEffect, useState } from "react";

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

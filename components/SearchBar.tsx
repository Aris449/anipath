"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  setSearchOrigin,
  consumeSearchOrigin,
} from "../app/lib/searchHistory";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = searchParams.get("search") ?? "";
  const [value, setValue] = useState(initial);

  const startedSearch = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = value.trim();

      // ⬅️ User cleared input → go back
      if (!trimmed) {
        if (startedSearch.current) {
          const prev = consumeSearchOrigin();
          router.push(prev ?? "/");
          startedSearch.current = false;
        }
        return;
      }

      // Save origin ONCE (only when typing starts)
      if (!startedSearch.current) {
        setSearchOrigin(pathname);
        startedSearch.current = true;
      }

      router.push(`/search/anime?search=${encodeURIComponent(trimmed)}`);
    }, 150);

    return () => clearTimeout(timeout);
  }, [value]); // ❗ ONLY depend on input

  return (
    <div className="w-full h-12 bg-bg-dark rounded-4xl flex items-center px-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search anime..."
        className="w-full bg-transparent outline-none"
      />
      <Image
        src="/icons/search_dark.png"
        alt="search"
        width={20}
        height={20}
      />
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  setSearchOrigin,
  consumeSearchOrigin,
} from "../lib/searchHistory";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = searchParams.get("search") ?? "";
  const [value, setValue] = useState(initial);
  const placeholder = pathname.includes("/manga") ? "Search manga..." : "Search anime...";

  const startedSearch = useRef(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = value.trim();
      const searchPath = pathnameRef.current.includes("/manga") ? "/search/manga" : "/search/anime";

      if (!trimmed) {
        if (startedSearch.current) {
          const prev = consumeSearchOrigin();
          router.push(prev ?? "/");
          startedSearch.current = false;
        }
        return;
      }

      if (!startedSearch.current) {
        setSearchOrigin(pathname);
        startedSearch.current = true;
      }

      router.push(`${searchPath}?search=${encodeURIComponent(trimmed)}`);
    }, 150);

    return () => clearTimeout(timeout);
  }, [value, router]);

  return (
    <div className="w-full h-12 bg-bg-dark rounded-4xl flex items-center px-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
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

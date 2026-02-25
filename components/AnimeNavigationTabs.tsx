"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  title: string;
  href: string;
}

interface AnimeNavigationTabsProps {
  navigationItems: NavigationItem[];
  animeId: number;
}

export default function AnimeNavigationTabs({
  navigationItems,
  animeId,
}: AnimeNavigationTabsProps) {
  const pathname = usePathname();

  return (
    <div className="w-full flex items-center gap-2 sm:gap-4 lg:gap-8 overflow-x-auto mt-4 md:mt-6">
      {navigationItems.map((item) => {
        const href = `/anime/${animeId}/${item.href}`;
        const isActive = pathname === href;

        return (
          <Link
            key={item.title}
            href={href}
            scroll={false}
            className={`px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium whitespace-nowrap transition-all ${
              isActive
                ? "bg-(--color-accent) text-foreground"
                : "bg-bg-light text-foreground hover:opacity-90"
            } ${item.title === "Info" ? "md:hidden" : ""}`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

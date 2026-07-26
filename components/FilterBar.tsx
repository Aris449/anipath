"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type MediaType = "ANIME" | "MANGA";

type FilterBarProps = {
  mediaType?: MediaType;
};

const ANIME_GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

const ANIME_TAGS = [
  "4-koma",
  "Alternate Universe",
  "Body Horror",
  "Coming of Age",
  "Cyberpunk",
  "Delinquents",
  "Dystopian",
  "Found Family",
  "Gore",
  "Isekai",
  "Love Triangle",
  "Military",
  "No Dialogue",
  "School",
  "Surreal Comedy",
  "Time Loop",
  "Urban Fantasy",
  "Villainess",
  "Wuxia",
  "Yandere",
  "Zombie",
];

const SEASONS = ["WINTER", "SPRING", "SUMMER", "FALL"];
const YEARS = Array.from({ length: 25 }, (_, i) => String(2025 - i));

const ANIME_FORMATS = ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA"];
const MANGA_FORMATS = ["MANGA", "NOVEL", "ONE_SHOT", "DOUJINSHI"];

const STATUSES = ["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED"];

const ANIME_SORTS = [
  { label: "Trending", value: "TRENDING" },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "All Time Popular", value: "POPULAR" },
];

const MANGA_SORTS = [
  { label: "Trending", value: "TRENDING" },
  { label: "All Time Popular", value: "POPULAR" },
];

const FILTERS: Record<
  MediaType,
  {
    clearPath: string;
    showSort: boolean;
    showTags: boolean;
    showSeason: boolean;
    showYear: boolean;
    genres: string[];
    tags: string[];
    sorts: { label: string; value: string }[];
    formats: string[];
    statuses: string[];
  }
> = {
  ANIME: {
    clearPath: "/anime",
    showSort: true,
    showTags: true,
    showSeason: true,
    showYear: true,
    genres: ANIME_GENRES,
    tags: ANIME_TAGS,
    sorts: ANIME_SORTS,
    formats: ANIME_FORMATS,
    statuses: STATUSES,
  },
  MANGA: {
    clearPath: "/manga",
    showSort: true,
    showTags: true,
    showSeason: false,
    showYear: false,
    genres: ANIME_GENRES,
    tags: ANIME_TAGS,
    sorts: MANGA_SORTS,
    formats: MANGA_FORMATS,
    statuses: STATUSES,
  },
};

export default function FilterBar({ mediaType = "ANIME" }: FilterBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const filterConfig = FILTERS[mediaType];

  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isSelected = (key: string, value: string) => {
    const current = params.get(key)?.split(",") || [];
    return current.includes(value);
  };

  const hasFilter = (key: string) => params.get(key) !== null;

  const hasAnyFilter =
    hasFilter("sort") ||
    hasFilter("genre") ||
    hasFilter("tag") ||
    hasFilter("season") ||
    hasFilter("year") ||
    hasFilter("format") ||
    hasFilter("status");

  const formatLabel = (value: string | null) =>
    value ? value.replaceAll("_", " ") : "";

  const multiSummary = (key: string) => {
    const selected = params.get(key)?.split(",").filter(Boolean) ?? [];

    if (selected.length === 0) return "Any";
    if (selected.length === 1) return selected[0];

    return `${selected[0]} +${selected.length - 1}`;
  };

  const singleValue = (key: string) => {
    const value = params.get(key);
    return value ? formatLabel(value) : "Any";
  };

  const sortValue = () => {
    const value = params.get("sort");
    if (!value) return "Trending";

    return value === "POPULAR"
      ? "All Time Popular"
      : value === "UPCOMING"
        ? "Upcoming"
        : "Trending";
  };

  const toggleValue = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());
    const SINGLE_SELECT = ["season", "year", "format", "status"];

    if (key === "sort") {
      if (params.get("sort") === value || (value === "TRENDING" && !params.get("sort"))) {
        newParams.delete("sort");
      } else {
        newParams.set("sort", value);
      }
    } else if (SINGLE_SELECT.includes(key)) {
      if (params.get(key) === value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    } else {
      const current = newParams.get(key)?.split(",") || [];
      const updated = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];

      if (updated.length > 0) {
        newParams.set(key, updated.join(","));
      } else {
        newParams.delete(key);
      }
    }

    newParams.set("page", "1");

    const query = newParams.toString();
    router.push(query ? `?${query}` : filterConfig.clearPath);
  };

  const triggerClass = (key: string) =>
    `group w-[132px] sm:w-[145px] rounded-xl bg-bg-dark px-3 py-2 text-left transition-colors hover:bg-bg-light ${
      hasFilter(key) ? "text-(--color-accent)" : "text-foreground"
    }`;

  const menuClass =
    "absolute left-0 top-[calc(100%+14px)] min-w-[200px] max-h-64 overflow-y-auto rounded-xl bg-bg-dark p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.35)] z-50";

  const optionClass = (active: boolean) =>
    `block w-full rounded-lg px-2.5 py-1.5 text-left text-xs sm:text-sm transition-colors ${
      active
        ? "bg-bg-light text-(--color-accent)"
        : "text-(--color-muted) hover:bg-bg-light"
    }`;

  const labelClass = "text-md uppercase font-bold tracking-wide";
  const valueClass =
    "mt-0.5 line-clamp-1 text-xs sm:text-sm font-semibold text-(--color-muted)";

  return (
    <div
      ref={ref}
      className="relative z-20 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-[color-mix(in_hsl,var(--bg-dark)_88%,transparent)] p-2 sm:p-2.5"
    >
      <div className="relative">
        <button
          onClick={() => setOpen(open === "genre" ? null : "genre")}
          className={triggerClass("genre")}
        >
          <p className={labelClass}>Genres</p>
          <p className={valueClass}>{multiSummary("genre")}</p>
        </button>

        {open === "genre" && (
          <div className={menuClass} onClick={(e) => e.stopPropagation()}>
            {filterConfig.genres.map((genre) => {
              const active = isSelected("genre", genre);

              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleValue("genre", genre)}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm transition-colors ${
                    active
                      ? "bg-bg-light text-(--color-accent)"
                      : "text-(--color-muted) hover:bg-bg-light"
                  }`}
                  aria-pressed={active}
                >
                  <span>{genre}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filterConfig.showSort && (
        <div className="relative">
          <button
            onClick={() => setOpen(open === "sort" ? null : "sort")}
            className={triggerClass("sort")}
          >
            <p className={labelClass}>Sort</p>
            <p className={valueClass}>{sortValue()}</p>
          </button>

          {open === "sort" && (
            <div className={menuClass} onClick={(e) => e.stopPropagation()}>
              {filterConfig.sorts.map((sort) => {
                const active = (params.get("sort") ?? "TRENDING") === sort.value;

                return (
                  <button
                    key={sort.value}
                    type="button"
                    onClick={() => toggleValue("sort", sort.value)}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm transition-colors ${
                      active
                        ? "bg-bg-light text-(--color-accent)"
                        : "text-(--color-muted) hover:bg-bg-light"
                    }`}
                    aria-pressed={active}
                  >
                    <span>{sort.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {filterConfig.showTags && (
        <div className="relative">
          <button
            onClick={() => setOpen(open === "tag" ? null : "tag")}
            className={triggerClass("tag")}
          >
            <p className={labelClass}>Tags</p>
            <p className={valueClass}>{multiSummary("tag")}</p>
          </button>

          {open === "tag" && (
            <div className={menuClass} onClick={(e) => e.stopPropagation()}>
              {filterConfig.tags.map((tag) => {
                const active = isSelected("tag", tag);

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleValue("tag", tag)}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm transition-colors ${
                      active
                        ? "bg-bg-light text-(--color-accent)"
                        : "text-(--color-muted) hover:bg-bg-light"
                    }`}
                    aria-pressed={active}
                  >
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {filterConfig.showSeason && (
        <div className="relative">
          <button
            onClick={() => setOpen(open === "season" ? null : "season")}
            className={triggerClass("season")}
          >
            <p className={labelClass}>Season</p>
            <p className={valueClass}>{singleValue("season")}</p>
          </button>

          {open === "season" && (
            <div className={menuClass} onClick={(e) => e.stopPropagation()}>
              {SEASONS.map((season) => (
                <button
                  key={season}
                  onClick={() => {
                    toggleValue("season", season);
                    setOpen(null);
                  }}
                  className={optionClass(isSelected("season", season))}
                >
                  {season}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {filterConfig.showYear && (
        <div className="relative">
          <button
            onClick={() => setOpen(open === "year" ? null : "year")}
            className={triggerClass("year")}
          >
            <p className={labelClass}>Year</p>
            <p className={valueClass}>{singleValue("year")}</p>
          </button>

          {open === "year" && (
            <div className={menuClass}>
              {YEARS.map((year) => (
                <button
                  key={year}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValue("year", year);
                    setOpen(null);
                  }}
                  className={optionClass(isSelected("year", year))}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <button
          onClick={() => setOpen(open === "format" ? null : "format")}
          className={triggerClass("format")}
        >
          <p className={labelClass}>Format</p>
          <p className={valueClass}>{singleValue("format")}</p>
        </button>

        {open === "format" && (
          <div className={menuClass}>
            {filterConfig.formats.map((format) => (
              <button
                key={format}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleValue("format", format);
                  setOpen(null);
                }}
                className={optionClass(isSelected("format", format))}
              >
                {format.replaceAll("_", " ")}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(open === "status" ? null : "status")}
          className={triggerClass("status")}
        >
          <p className={labelClass}>Status</p>
          <p className={valueClass}>{singleValue("status")}</p>
        </button>

        {open === "status" && (
          <div className={menuClass}>
            {filterConfig.statuses.map((status) => (
              <button
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleValue("status", status);
                  setOpen(null);
                }}
                className={optionClass(isSelected("status", status))}
              >
                {status.replaceAll("_", " ")}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => router.push(filterConfig.clearPath)}
        disabled={!hasAnyFilter}
        className="rounded-xl bg-bg-dark px-3.5 py-2 text-xs sm:text-sm font-semibold text-(--color-muted) transition-colors hover:bg-bg-light hover:text-(--color-accent) disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear filters
      </button>
    </div>
  );
}

import Link from "next/link";
import { searchAnime } from "@/app/lib/anilist";

export default async function SearchResults({search,}: {search?: string;}) {
  if (!search) {
    return (
      <p className="text-muted">
        Start typing to search for anime
      </p>
    );
  }

  const results = await searchAnime(search);

  if (!results.length) {
    return <p>No results found</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
      {results.map((anime: any) => (
        <Link
          key={anime.id}
          href={`/anime/${anime.id}`}
          className="group"
        >
          <img
            src={anime.coverImage.large}
            className="rounded-xl group-hover:scale-105 transition"
          />

          <p className="mt-2 font-semibold">
            {anime.title.english ?? anime.title.romaji}
          </p>

          <p className="text-sm text-muted">
            {anime.format} · {anime.seasonYear}
          </p>
        </Link>
      ))}
    </div>
  );
}

import { searchMediaPage } from "@/lib/anilist";
import { getLikedMediaIds } from "./getLikedMediaIds";
import { getSavedMediaIds } from "./getSavedMediaIds";
import InfiniteAnimeGrid from "./InfiniteAnimeGrid";

export default async function SearchResults({
  search,
  type,
}: {
  search?: string;
  type: "ANIME" | "MANGA";
}) {
  
  if (!search) {
    return (
      <p className="text-muted">
        Start typing to search for {type.toLowerCase()}
      </p>
    );
  }

  const [initialData, likedAnimeIds, savedAnimeIds] = await Promise.all([
    searchMediaPage(search, type, 1),
    getLikedMediaIds(type),
    getSavedMediaIds(type),
  ]);

  if (!initialData.media.length) {
    return <p>No results found</p>;
  }

  return (
    <InfiniteAnimeGrid
      initialData={initialData}
      mediaType={type}
      endpointPath="/api/search"
      searchQuery={search}
      likedMediaIds={likedAnimeIds}
      savedMediaIds={savedAnimeIds}
    />
  );
}

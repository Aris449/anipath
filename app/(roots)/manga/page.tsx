import FilterBar from "../../../components/FilterBar";
import InfiniteAnimeGrid from "@/components/InfiniteAnimeGrid";
import { getMangaPage } from "@/lib/anilist";


export default async function MangaPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params =
    searchParams && typeof searchParams.then === "function"
      ? await searchParams
      : searchParams || {};

  const page = Number(params.page || "1");

  const genre = params.genre;
  const tag = params.tag;
  const sort = params.sort;
  const format = params.format;
  const status = params.status;

  const initialData = await getMangaPage(page, { genre, tag, format, status, sort });

  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 flex justify-center text-2xl font-bold min-[1001px]:text-4xl">
        MANGA
      </h1>

      <div className="mb-6 flex justify-center">
        <FilterBar mediaType="MANGA" />
      </div>

      <InfiniteAnimeGrid
        initialData={initialData}
        filters={{ genre, tag, sort, format, status }}
        mediaType="MANGA"
        endpointPath="/api/manga"
      />
    </div>
  );
}
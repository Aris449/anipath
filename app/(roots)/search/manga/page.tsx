import SearchResults from "@/components/SearchResults";

export default async function MangaSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  return (
    <main className="p-8">
      <SearchResults search={search} type="MANGA" />
    </main>
  );
}
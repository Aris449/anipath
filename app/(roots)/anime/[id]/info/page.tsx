import { fetchAnimeById } from "@/lib/anilist";

export default async function InfoPage({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params);
  const anime = await fetchAnimeById(Number(resolvedParams.id));

  if (!anime) {
    return <div>Anime not found</div>;
  }

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getMonthName(month?: number) {
    if (!month) return null;
    return MONTHS[month - 1];
  }

  return (
    <div className="grid grid-cols-2 md:hidden justify-center my-4 w-full">
      <div className="px-2 rounded-2xl">
        {anime.format && (
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold">Format</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base">
              {anime.format}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.status && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Status</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block">
              {anime.status}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.season && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Season</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block">
              {anime.season} {anime.seasonYear}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.startDate && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Start Date</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block">
              {" "}
              {getMonthName(anime.startDate.month)} {anime.startDate?.day}{" "}
              {anime.startDate?.year}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.endDate && (
          <div>
            <span className="text-lg sm:text-xl font-bold">End date</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block">
              {getMonthName(anime.endDate.month)} {anime.endDate?.day}{" "}
              {anime.endDate?.year}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.popularity && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Popularity</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block">
              {anime.popularity}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.studios?.nodes && anime.studios.nodes.length > 0 && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Studios</span>
            <div className="text-(--color-muted) font-semibold flex flex-col text-sm sm:text-base">
              {anime.studios.nodes.map((studio: any) => (
                <span key={studio.id}>{studio.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.producers?.nodes && anime.producers.nodes.length > 0 && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Producers</span>
            <div className="text-(--color-muted) font-semibold flex flex-col text-sm sm:text-base">
              {anime.producers.nodes.map((producer: any) => (
                <span key={producer.id}>{producer.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.source && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Source</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block">
              {anime.source}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.hashtag && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Hashtag</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block break-all">
              {anime.hashtag}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.title.romaji && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Romaji</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block wrap-break-word">
              {anime.title.romaji}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.title.english && (
          <div>
            <span className="text-lg sm:text-xl font-bold">English</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block wrap-break-word">
              {anime.title.english}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.title.native && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Native</span>
            <span className="text-(--color-muted) font-semibold text-sm sm:text-base block wrap-break-word">
              {anime.title.native}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-2 flex flex-col">
        {anime.synonyms && anime.synonyms.length > 0 && (
          <div>
            <span className="text-lg sm:text-xl font-bold">Synonyms</span>
            <div className="text-(--color-muted) font-semibold flex flex-col text-sm sm:text-base">
              {anime.synonyms.map((synonym: any) => (
                <span key={synonym} className="wrap-break-word">
                  {synonym}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

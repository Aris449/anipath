import CarouselSection from "@/components/carouselSection";
import {
  fetchTrendingAnime,
  fetchUpcomingAnime,
  fetchAllTimePopularAnime,
} from "../lib/anilist";
import { Suspense } from "react";

export default async function Home() {


  const [trending, upcoming, popular] = await Promise.all([
    fetchTrendingAnime(1),
    fetchUpcomingAnime(1),
    fetchAllTimePopularAnime(1),
  ]);

  return (
    <main className="flex flex-col justify-center items-center py-6 min-[1001px]:py-10 gap-4 min-[1001px]:gap-10">

      <div className="max-w-full mx-auto">
        <CarouselSection animeList={trending} title={"TRENDING"}/>
      </div>

      <div className="max-w-full mx-auto">
        <CarouselSection animeList={upcoming} title={"UPCOMING"}/>
      </div>

      <div className="max-w-full mx-auto">
        <CarouselSection animeList={popular} title={"ALL TIME POPULAR"}/>
      </div>

    </main>
  );
}

import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { fetchTrendingAnime,fetchUpcomingAnime, fetchAllTimePopularAnime } from "./lib/anilist";

export default async function  Home() {
   const trendingAnime =  await fetchTrendingAnime(1);
   const upcomingAnime =  await fetchUpcomingAnime(1);
   const allTimePopularAnime =  await fetchAllTimePopularAnime(1);
   

   const tredingAnimeArray = trendingAnime.map((anime) => {
      const title = anime.title.english || anime.title.romaji;
      const shortTitle = title.length > 20 ? title.slice(0, 30) + "..." : title;


      return (
         <Card key={anime.id}
            imageSrc={anime.coverImage.large} 
            animeTitle={shortTitle} 
            animeYear={anime.seasonYear}
            animeEpisodes={anime.episodes} />
      )
   })

    const upcomingAnimeArray = upcomingAnime.map((anime) => {
      const title = anime.title.english || anime.title.romaji;
      const shortTitle = title.length > 20 ? title.slice(0, 30) + "..." : title;

       return(
            <Card key={anime.id}
             imageSrc={anime.coverImage.large} 
             animeTitle={shortTitle} 
             animeYear={anime.seasonYear}
             animeEpisodes={anime.episodes} />
       )
    })

    const AllTimePopularAnimeArray = allTimePopularAnime.map((anime) => {
      const title = anime.title.english || anime.title.romaji;
      const shortTitle = title.length > 20 ? title.slice(0, 30) + "..." : title;


      return (
         <Card key={anime.id}
            imageSrc={anime.coverImage.large} 
            animeTitle={shortTitle} 
            animeYear={anime.seasonYear}
            animeEpisodes={anime.episodes} />
      )
   })
   
 
  return (
   <main className="flex flex-col justify-center items-center py-20 gap-20">

      <div className="w-[1820px]">
          <h2 className="text-4xl mb-8 px-12 font-bold">TRENDING ANIME</h2>
          <Carousel items={tredingAnimeArray } step={1} gap={16} visibleItems={8} />
      </div>

      <div className="w-[1820px]">
          <h2 className="text-4xl mb-8 px-12 font-bold">UPCOMING NEXT SEASON ANIME</h2>
          <Carousel items={upcomingAnimeArray } step={1} gap={16} visibleItems={8} />
      </div>

         <div className="w-[1820px]">
          <h2 className="text-4xl mb-8 px-12 font-bold">ALL TIME POPULAR ANIME</h2>
          <Carousel items={AllTimePopularAnimeArray } step={1} gap={16} visibleItems={8} />
      </div>

      
   </main>
  );
}

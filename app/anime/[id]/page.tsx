
import { fetchAnimeById } from "@/app/lib/anilist"
import AnimePageInfo from "@/components/AnimePageInfo";


export default async function AnimePage({ params }: { params: any }) {

  const resolvedParams = await Promise.resolve(params);
  const anime = await fetchAnimeById(Number(resolvedParams.id));


  if (!anime) return <div>Anime not found</div>;



  const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function getMonthName(month?: number) {
  if (!month) return null;
  return MONTHS[month - 1];
}

  return (
    <main>

      <div>
        
      </div>
      {anime.bannerImage ? 
      <img src={anime.bannerImage} alt="banner image" className="w-full relative mask-image-to-bottom "/> : 
      <div className="w-full mt-16"></div>}

      <div className="flex flex-col justify-center items-center">

      <div className="w-9/10 flex ">
        
          <div className={`w-[230px] ${anime.bannerImage ? '' :""} shrink-0`}>
              <img src={anime.coverImage.large} alt="cover image"  className="rounded-2xl"/>

              <div className="w-full flex justify-between">

                  <button className="bg-(--color-accent)  w-1/2 text-xl p-2 mt-4 rounded-2xl">Add to list</button>

                  <div className="w-1/2 mt-4 text-xl flex">
                  <button className="ml-3 bg-(--color-accent) p-2 rounded-2xl"> like</button>
                  <button className="ml-2 bg-(--color-accent) p-2 rounded-2xl"> like</button>
                  </div>

              </div>

          {/* side info */}
          <div className="flex flex-col justify-center w-[230px]">

            <div className=" mt-4 px-2 rounded-2xl">
                {anime.format && (
                  <div className="flex flex-col ">
                    <span className="text-xl font-bold">Format</span>
                    <span className="text-(--color-muted) font-semibold">{anime.format}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.episodes && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Episodes</span>
                    <span className="text-(--color-muted) font-semibold">{anime.episodes}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.duration && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Episode Duration</span>
                    <span className="text-(--color-muted) font-semibold">{anime.duration} mins</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.status && (
                  <div className="mt-4 px-2 flex flex-col ">
                    <span className="text-xl font-bold">Status</span>
                    <span className="text-(--color-muted) font-semibold">{anime.status}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.season && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Season</span>
                    <span className="text-(--color-muted) font-semibold">{anime.season} {anime.seasonYear}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.startDate && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Start Date</span>
                    <span className="text-(--color-muted) font-semibold"> {getMonthName(anime.startDate.month)} {anime.startDate?.day} {anime.startDate?.year}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.endDate && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">End date</span>
                    <span className="text-(--color-muted) font-semibold">{getMonthName(anime.endDate.month)}  {anime.endDate?.day} {anime.endDate?.year}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.popularity && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Popularity</span>
                    <span className="text-(--color-muted) font-semibold">{anime.popularity}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.studios?.nodes && anime.studios.nodes.length > 0 && (
                <div className="flex flex-col mt-4 px-2">
                  <span className="text-xl font-bold">Studios</span>

                  <div className="text-(--color-muted) font-semibold flex flex-col">
                    {anime.studios.nodes.map(studio => (
                      <span key={studio.id} className="">
                        {studio.name}
                      </span>
                    ))}
                  </div>
                </div>
                )}  
            </div>

            
            <div className="">
              {anime.producers?.nodes && anime.producers.nodes.length > 0 && (
                <div className="flex flex-col mt-4 px-2">
                  <span className="text-xl font-bold">Producers</span>

                  <div className="text-(--color-muted) font-semibold flex flex-col">
                    {anime.producers.nodes.map((producer) => (
                      <span key={producer.id}>
                        {producer.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

             <div className="">
                {anime.source && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Source</span>
                    <span className="text-(--color-muted) font-semibold">{anime.source}</span>
                  </div>
                )}
            </div>

             <div className="">
                {anime.hashtag && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Hashtag</span>
                    <span className="text-(--color-muted) font-semibold">{anime.hashtag}</span>
                  </div>
                )}
            </div>

              <div className="">
                {anime.genres && anime.genres.length > 0 && (
                <div className="flex flex-col mt-4 px-2">
                  <span className="text-xl font-bold">Genres</span>

                  <div className="text-(--color-muted) font-semibold flex flex-col">
                    {anime.genres.map((genre) => (
                      <span key={genre}>{genre}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="">
                {anime.title.romaji && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Romaji</span>
                    <span className="text-(--color-muted) font-semibold">{anime.title.romaji}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.title.english && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">English</span>
                    <span className="text-(--color-muted) font-semibold">{anime.title.english}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.title.native && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Native</span>
                    <span className="text-(--color-muted) font-semibold">{anime.title.native}</span>
                  </div>
                )}
            </div>

            <div className="">
                {anime.synonyms && anime.synonyms.length > 0 && (
                  <div className="flex flex-col mt-4 px-2">
                    <span className="text-xl font-bold">Synonyms</span>
                    <div className="text-(--color-muted) font-semibold flex flex-col">
                      {anime.synonyms.map((synonym) => (
                        <span key={synonym}>{synonym}</span>
                      ))}
                    </div>
                  </div>
                )}
            </div>



          </div>

              
          </div>

           <div className={` ${anime.bannerImage ? 'mt-4' :""} mx-16 flex flex-col gap-4`} >

            <div className='flex flex-col justify-center gap-2 min-h-60'>
                  <h1 className="text-3xl font-bold">{anime.title.english}</h1>
                  <div className="text-(--color-muted)" dangerouslySetInnerHTML={{ __html: anime.description ?? "" }} />
            </div>

                  <AnimePageInfo currentAnime={anime} />
                  
          </div>


      </div>

      <div className="w-9/10 flex">

    
            
      </div>

      </div>
      
    </main>
  );
}

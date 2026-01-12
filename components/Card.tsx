import Link from "next/link";
import LikeBtn from "./LikeBtn";

interface CardProps {
    imageSrc?: string;
    animeTitle?: string | null;
    animeSeason?: string | null;
    animeEpisodes?: number | null;
    cardHeight?: number;
    imageHeight?: number;
    animeId?: number;
}


const Card = ({imageSrc = '',  animeTitle = '',   animeId,  }: CardProps) => {
  
  return (
    <div className="w-full bg-bg-dark rounded-xl h-60 min-[1000px]:h-[380px]">

     <Link
       href={animeId ? `/anime/${animeId}` : '#'}
     >
      <img
        src={imageSrc}
        alt=""
        className="w-full rounded-xl object-cover h-[180px] min-[1000px]:h-[300px]"
        style={{ objectFit: 'cover', background: 'var(--bg-light)' }}
      />
    </Link>
      <div className="w-full flex flex-col px-1 min-[1001px]:px-4 my-2">
        <h3 className="text-sm min-[1001px]:text-lg font-semibold ">{ animeTitle}</h3>
      </div>
    </div>
  )
}



export default Card

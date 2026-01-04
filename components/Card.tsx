import Link from "next/link";

interface CardProps {
    imageSrc?: string;
    animeTitle?: string | null;
    animeSeason?: string | null;
    animeEpisodes?: number | null;
    cardHeight?: number;
    imageHeight?: number;
    animeId?: number;
}


const Card = ({imageSrc = '',  animeTitle = '',  cardHeight = 380, imageHeight = 300, animeId,  }: CardProps) => {

  return (
    <div className="w-full bg-bg-dark rounded-xl"
    style={{ height: cardHeight }}>

     <Link
       href={animeId ? `/anime/${animeId}` : '#'}
     >
      <img
        src={imageSrc}
        alt=""
        className="w-full rounded-xl object-cover"
        style={{ height: imageHeight, width: '100%', objectFit: 'cover', background: 'var(--bg-light)' }}
      />
      <div className="w-full flex flex-col px-1 min-[1001px]:px-4 my-2">
        <h3 className="text-sm min-[1001px]:text-lg font-semibold ">{ animeTitle}</h3>
      </div>
    </Link>
    </div>
  )
}



export default Card

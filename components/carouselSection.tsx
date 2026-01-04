"use client";

import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { Anime } from "../app/lib/anilist";
import { useState, useLayoutEffect } from "react";
import { useCardCount } from "@/components/useCardCount";

interface CarouselSectionProps {
  animeList: Anime[];
  title?: string;
}

export default function CarouselSection({ animeList, title }: CarouselSectionProps) {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const cardCount = useCardCount();

  // Measure BEFORE paint
  useLayoutEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (windowWidth === null || cardCount === null) {
    return <div style={{ height: 420 }} />; 
  }

  const isMobile = windowWidth <= 1000;

  const items = animeList.map((anime) => {
    const title = anime.title.english || anime.title.romaji;
    const short = title.length > 20 ? title.slice(0, 30) + "..." : title;
    const shorter = title.length > 15 ? title.slice(0, 24) + "..." : title;

    return (
      <Card
        key={anime.id}
        animeId={anime.id}
        imageSrc={anime.coverImage.large}
        animeTitle={isMobile ? shorter : short}
        animeEpisodes={anime.episodes}
        cardHeight={isMobile ? 240 : 380}
        imageHeight={isMobile ? 180 : 300}
      />
    );
  });

  return (
    <Carousel
      cardFixedWidth={isMobile ? 120 : 200}
      gap={isMobile ? 12 : 16}
      items={items}
      step={cardCount}
      visibleItems={cardCount}
      title={title}
    />
  );
}

"use client";

import { useState, useTransition } from "react";

interface LikeButtonProps {
  animeId: number;
}

export default function LikeBtn({ animeId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      await fetch("/api/anime/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId }),
      });

      setLiked(true);
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="px-3 py-1 rounded bg-pink-500 text-white"
    >
      {liked ? "Liked ❤️" : "Like 🤍"}
    </button>
  );
}

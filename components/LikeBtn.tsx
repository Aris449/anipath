"use client";

import { useEffect, useState } from "react";

export default function LikeBtn({ animeId, title, image }: any) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/like?animeId=${animeId}`)
      .then(res => res.json())
      .then(data => setLiked(data.liked));
  }, [animeId]);

  const toggleLike = async () => {
    if (liked) {
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify({ animeId }),
      });
      setLiked(false);
    } else {
      await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({ animeId, title, image }),
      });
      setLiked(true);
    }
  };

  return (
    <button onClick={toggleLike}>
      {liked ? "❤️" : "🤍"}
    </button>
  );
}

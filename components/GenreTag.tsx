"use client";

import { useRouter } from "next/navigation";

export default function GenreTag({ genre }: { genre: string }) {
  const router = useRouter();

  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        router.push(`/genre/${genre.toLowerCase()}`);
      }}
      className="bg-(--color-accent) rounded-2xl p-2 cursor-pointer"
    >
      {genre}
    </span>
  );
}

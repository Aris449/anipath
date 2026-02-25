import { fetchAnimeById } from "@/lib/anilist";
import CommentSection from "@/components/CommentsSection";

export default async function CommentsPage({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params);
  const anime = await fetchAnimeById(Number(resolvedParams.id));

  if (!anime) {
    return <div>Anime not found</div>;
  }

  return (
    <div className="min-h-100">
      <CommentSection animeId={anime.id} />
    </div>
  );
}

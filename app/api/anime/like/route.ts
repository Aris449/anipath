import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { Anime } from "@/lib/models/anime";

export async function POST(req: Request) {
  const { animeId } = await req.json();
  const session = await auth(); // ← await here
  const userId = session.userId;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await connectDB();

  await Anime.findOneAndUpdate(
    { animeId },
    { $addToSet: { likes: userId } },
    { upsert: true }
  );

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

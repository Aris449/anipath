import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { List } from "@/lib/models/list";
import { fetchAnimeByIds } from "@/lib/anilist";

export async function GET(req: Request,{params}: {params: {id: string}}){
    const {userId} = await auth();

    if(!userId){
        return new Response("Unauthorizised", {status:401})
    }

    await connectDB();

    const list = await List.findOne({
        _id:params.id,
        userId,
    }).lean();

    if(!list) {
        return new Response("List not found", {status:401})
    }

    
    const anime = await fetchAnimeByIds(list.animeIds);
    
    return Response.json(anime);
}
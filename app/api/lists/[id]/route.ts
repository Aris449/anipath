import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import { List } from "@/lib/models/list";

export async function GET(req:Request,{params} : {params:{id:string}}) {
    const {userId} = await auth()

    if(!userId) {
        return new Response("Unauthorized", {status:401})
    }

    await connectDB()

    const list = await List.findOne({
        _id: params.id,
        userId,
    }).lean();


  if (!list) {
    return new Response("List not found", { status: 404 });
  }

    return Response.json({
    _id: list._id.toString(),
    name: list.name,
    animeIds: list.animeIds,
  });
}
import mongoose, {Schema, Document, models, Model} from "mongoose";
import { IComment, ICommentBase } from "./comment";


export interface IAnimeBase {
    animeId: number;
    comments?: IComment[];
    likes?: string[];
}

export interface IAnime extends IAnimeBase, Document {
    createdAt: Date;
    updatedAt: Date;
}

//Define the document methods(for each instance of a post)
interface IAnimeMethods {
    likeAnime(userId: string): Promise<void>;
    unlikeAnime(userId: string): Promise<void>;
    commentOnAnime(comment:ICommentBase): Promise<void>;
    getAllComments(): Promise<IComment[]>;
}

interface IAnimeStatics {
    // add static functions
}

export interface IAnimeDocument extends IAnime, IAnimeMethods {} //singular instance of anime
interface IAnimeModel extends IAnimeStatics, Model<IAnimeDocument>{} // all anime

const AnimeSchema = new Schema<IAnimeDocument>(
    {
      animeId: { type: Number, required: true, unique: true },
       comments: {type: [Schema.Types.ObjectId],ref: "Comment",default: [],},
      likes: {type: [String], default: []},
    },
    {timestamps:true,}
);

export const Anime = models.Anime || mongoose.model<IAnimeDocument>("Anime", AnimeSchema);

// AnimeSchema.methods.likeAnime = async function (userId: string){
//     try {
//         await this.updateOne({$addToSet: {likes: userId}});
//     }catch(error) {
//         console.log("Failed to like anime", error)
//     }
// }

// AnimeSchema.methods.unlikeAnime = async function (userId:string) {
//     try {
//         await this.updateOne({ $pull: {likes:userId}});
//     } catch (error) {
//         console.log("Failed to unlike anime", error)
//     }
// }
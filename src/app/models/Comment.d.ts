import { CommentsLikedByUsers } from "./CommentsLikedByUsers";
import { Post } from "./Post";
import { User } from "./User";
//import { CommentCount } from "../resolvers/outputs/CommentCount";
export declare class Comment {
    id: string;
    createAt: Date;
    updateAt: Date;
    text: string;
    textForSearch?: string | null;
    userId: string;
    postId: string;
    createBy?: User;
    likedBy?: CommentsLikedByUsers[];
    post?: Post;
    //_count?: CommentCount | null;
}

import { Comment } from "../models/Comment";
import { User } from "../models/User";
export declare class CommentsLikedByUsers {
    id: string;
    userId: string;
    commentId: string;
    user?: User;
    comment?: Comment;
}

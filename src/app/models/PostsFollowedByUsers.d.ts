import { Post } from "./Post";
import { User } from "./User";
export declare class PostsFollowedByUsers {
    id: string;
    userId: string;
    postId: string;
    user?: User;
    post?: Post;
}

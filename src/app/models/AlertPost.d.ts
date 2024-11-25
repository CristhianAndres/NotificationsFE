import { Post } from "../models/Post";
import { User } from "../models/User";
export declare class AlertPost {
    id: string;
    userId: string;
    postId: string;
    user?: User;
    post?: Post;
}

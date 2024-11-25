import { Post } from "./Post";
export declare class MediaFile {
    id: string;
    createAt: Date;
    updateAt: Date;
    filename: string;
    mimetype: string;
    encoding: string;
    path: string;
    type: "AUDIO" | "IMAGE" | "VIDEO";
    postId: string;
    belongsTo?: Post;
}

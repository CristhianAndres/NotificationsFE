import { Actor } from "./Actor";
import { AlertPost } from "./AlertPost";
import { Comment } from "./Comment";
import { Group } from "./Group";
import { MediaFile } from "./MediaFile";
import { PostsFollowedByUsers } from "./PostsFollowedByUsers";
import { Topic } from "./Topic";
import { User } from "./User";
import { UsersLikedPosts } from "./UsersLikedPosts";
//import { PostCount } from "../resolvers/outputs/PostCount";
export declare class Post {
    id: string;
    createAt: Date;
    updateAt: Date;
    title: string;
    titleForSearch?: string | null;
    info: string;
    infoForSearch?: string | null;
    aditionalInfo?: string | null;
    aditionalInfoForSearch?: string | null;
    source?: "INTERNET" | "DOCUMENTARY" | "FIELD_OBSERVATION" | "ACTOR_COMMENT" | "PRESS" | "OTHER" | null;
    hotScore?: number | null;
    updateHotScore?: boolean | null;
    userId: string;
    postedBy?: User;
    likedBy?: UsersLikedPosts[];
    followedBy?: PostsFollowedByUsers[];
    alertsTo?: AlertPost[];
    groupId: string;
    actorId: string;
    topicId: string;
    belongsTo?: Group;
    actor?: Actor;
    topic?: Topic;
    mediafiles?: MediaFile[];
    comments?: Comment[];
    //_count?: PostCount | null;
}

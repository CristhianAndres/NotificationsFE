/*import { ActionNotifiesToUser } from "../models/ActionNotifiesToUser";
import { AlertPost } from "../models/AlertPost";
import { Chat } from "../models/Chat";
import { Comment } from "../models/Comment";
import { CommentsLikedByUsers } from "../models/CommentsLikedByUsers";
import { Group } from "../models/Group";
import { Message } from "../models/Message";
import { Notification } from "../models/Notification";
import { Post } from "../models/Post";
import { PostsFollowedByUsers } from "../models/PostsFollowedByUsers";
import { Rol } from "../models/Rol";
import { UserBelongsToGroup } from "../models/UserBelongsToGroup";
import { UsersLikedPosts } from "../models/UsersLikedPosts";
import { UserCount } from "../resolvers/outputs/UserCount";*/
export declare class User {
    id: string;
    createAt: Date;
    updateAt: Date;
    firstName: string;
    firstNameForSearch?: string | null;
    lastName: string;
    lastNameForSearch?: string | null;
    email: string;
    emailForSearch?: string | null;
    userName: string;
    userNameForSearch?: string | null;
    password: string;
    smallPic?: string | null;
    mediumPic?: string | null;
    bigPic?: string | null;
    squarePic?: string | null;
    pic?: string | null;
    birthday: Date;
    gender: "MALE" | "FEMALE" | "UNSPECIFIED";
    address?: string | null;
    aboutMe?: string | null;
    /*rol?: Rol[];
    messages?: Message[];
    chats?: Chat[];
    admimnOf?: Group[];
    belongsTo?: UserBelongsToGroup[];
    createdPosts?: Post[];
    likedPosts?: UsersLikedPosts[];
    followPosts?: PostsFollowedByUsers[];
    alertByPost?: AlertPost[];
    createdComments?: Comment[];
    likedComments?: CommentsLikedByUsers[];
    createNotification?: Notification[];
    notifications?: ActionNotifiesToUser[];
    _count?: UserCount | null;*/

    obtenerAtributos(): string[] {
      // Extraer los nombres de los atributos en un array
      return Object.keys(this);
    }
}

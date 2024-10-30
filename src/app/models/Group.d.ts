/*import { Chat } from "../models/Chat";
import { Post } from "../models/Post";*/
import { User } from "./User";
//import { UserBelongsToGroup } from "../models/UserBelongsToGroup";
//import { GroupCount } from "../resolvers/outputs/GroupCount";
export declare class Group {
    id: string;
    createAt: Date;
    updateAt: Date;
    name: string;
    nameForSearch?: string | null;
    color?: string | null;
    userId?: string | null;
    admin?: User | null;
    members?: UserBelongsToGroup[];
    //chats?: Chat[];
    //posts?: Post[];
    //_count?: GroupCount | null;
}

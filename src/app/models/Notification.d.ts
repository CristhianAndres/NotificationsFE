import { ActionNotifiesToUser } from "./ActionNotifiesToUser";
import { User } from "./User";
//import { NotificationCount } from "../resolvers/outputs/NotificationCount";
export declare class Notification {
    id: string;
    createAt: Date;
    updateAt: Date;
    userId: string;
    createBy?: User;
    seen: boolean;
    notifiesTo?: ActionNotifiesToUser[];
    actorType: "USER";
    actorId: string;
    activityType: "CREATE" | "UPDATE" | "DELETE" | "ASSING" | "FOLLOW" | "UNFOLLOW" | "JOIN" | "LEAVE" | "LIKE" | "DISLIKE" | "SHARE";
    objectType: "POST" | "COMMENT" | "ROL" | "USER" | "GROUP" | "MEDIAFILE";
    objectId: string;
    targetType: "POST" | "USER" | "GROUP";
    targetId: string;
    //_count?: NotificationCount | null;
}

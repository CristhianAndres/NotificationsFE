import { Notification } from "./Notification";
import { User } from "./User";
export declare class ActionNotifiesToUser {
    id: string;
    userId: string;
    notificationId: string;
    user?: User;
    notification?: Notification;
}

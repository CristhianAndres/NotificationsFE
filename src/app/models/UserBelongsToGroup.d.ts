import {Group} from "../models/Group";
import {User} from "../models/User";

export declare class UserBelongsToGroup {
  id: string;
  userId: string;
  groupId: string;
  user?: User;
  group?: Group;

  constructor(user: User) {
    this.user = user;
  }
}

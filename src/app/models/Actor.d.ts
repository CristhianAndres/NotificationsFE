import { Post } from "./Post";
//import { ActorCount } from "../resolvers/outputs/ActorCount";
export declare class Actor {
    id: string;
    createAt: Date;
    updateAt: Date;
    name: string;
    nameForSearch?: string | null;
    appearsIn?: Post[];
    //_count?: ActorCount | null;
}

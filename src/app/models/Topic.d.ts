import { Post } from "./Post";
//import { TopicCount } from "../resolvers/outputs/TopicCount";
export declare class Topic {
    id: string;
    createAt: Date;
    updateAt: Date;
    name: string;
    nameForSearch?: string | null;
    appearsIn?: Post[];
    //_count?: TopicCount | null;
}

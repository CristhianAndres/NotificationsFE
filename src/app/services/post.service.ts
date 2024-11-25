import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//User, Group model
import {Group} from '../models/Group';
import {User} from "../models/User";
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";
import {Post} from "../models/Post";
import {MediaFile} from "../models/MediaFile";
import {PostsFollowedByUsers} from "../models/PostsFollowedByUsers";

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private apollo: Apollo) {
  }

  createPost(post: Post): Observable<any> {
    const createPost: CreatePost = {};
    Object.entries(post).forEach(([key, value]) => {
      if (key == 'postedBy' || key == 'belongsTo') {
        createPost[key] = {
          connect: {
            id : value.id
          }
        }
      } else if (key == 'actor' || key == 'topic') {
        createPost[key] = {
          connectOrCreate: {
            where: {
              id : value.id,
              name : {
                contains : value.name
              }
            },
            create : {
              createAt : value.createAt,
              updateAt : value.updateAt,
              name : value.name
            }
          }
        }
      } else if (key == 'followedBy') {
        createPost.followedBy = createPost.followedBy || {};
        createPost.followedBy.connectOrCreate = value
          .map((postsFollowedByUsers : PostsFollowedByUsers) => ({
            where: {
              id: "cm3iczf5w002i7pvyhvznqvow"
            },
            create : {
              user : {
                connect : {
                  id: postsFollowedByUsers.userId
                }
              }
            }
          }));
      } else if (key == 'mediafiles') {
        createPost.mediafiles = createPost.mediafiles || {};
        createPost.mediafiles.create = value
          .map((mediaFile : MediaFile) => (
            mediaFile
          ));
      } else if (key == 'createAt' || key == 'updateAt' || key == 'title' || key == 'info' || key == 'source') {
        createPost[key] = value
      }
    });
    return this.apollo
      .mutate({
        mutation: gql`
          mutation createOnePost($data:PostCreateInput!){
            createOnePost(data:$data){
              id
              createAt
              updateAt
              title
              info
              belongsTo {
                name
              }
            }
          }`,
        variables: {
          data: createPost
        }
      })
  }
}

interface FollowedBy {
  where:{
    id : string
  }
  create:{
    user:{
      connect:{
        id : string
      }
    }
  }
}

interface CreatePost {
  // @ts-ignore
  followedBy?: {
    connectOrCreate?: FollowedBy[];
  };
  // @ts-ignore
  mediafiles?: {
    create?: [];
  };
  [key: string]: { value: any } |
    {
      connect: {
        id: string
      }
    } |
    {
      connectOrCreate: {
        where: {
          id : string
          name : {
            contains: string
          }
        }
        create:{
          createAt: string
          updateAt: string
          name: string
        }
      }
    }
}

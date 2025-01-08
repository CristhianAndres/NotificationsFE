import {Inject, Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from "../models/Post";
import {MediaFile} from "../models/MediaFile";
import {PostsFollowedByUsers} from "../models/PostsFollowedByUsers";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(
    private apollo: Apollo,
    private apolloClient2: Apollo
    //@Inject('APOLLO_OPTIONS_2') private apolloClient2: Apollo // Cliente Apollo 2 (Inyectado con el nombre 'APOLLO_OPTIONS_2')
  ) {
  }

  getPosts(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            posts {
              id
              title
              groupId
              createAt
              postedBy{
                id
                firstName
                lastName
                userName
              }
              info
              belongsTo {
                id
                name
                color
              }
              topic {
                id
                name
              }
              mediafiles {
                id
                filename
                encoding
                path
              }
              comments {
                createBy {
                  userName
                }
                text
              }
              followedBy {
                 id
                 userId
                 postId
                 user {
                    id
                    firstName
                    lastName
                    userName
                 }
              }
              likedBy {
                id
                user {
                  id
                  firstName
                  lastName
                  userName
                }
              }
            }
          }
        `,
        fetchPolicy: 'no-cache', // Desactiva la caché para esta consulta
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.posts
      ));
  }

  likedPost(userId:string, postId:string): Observable<any> {
    const createOneUsersLikedPosts: CreateOneUsersLikedPosts = {
      post:{
        connect:{
          id : postId
        }
      },
      user:{
        connect:{
          id : userId
        }
      }
    };
    return this.apollo
      .mutate({
        mutation: gql`
          mutation createOneUsersLikedPosts($data: UsersLikedPostsCreateInput!){
            createOneUsersLikedPosts(data: $data){
              id
              postId
              userId
            }
          }`,
        variables: {
          data: createOneUsersLikedPosts
        }
      })
  }

  dislikedPost(id:string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
                      mutation deleteOneUsersLikedPosts($where: UsersLikedPostsWhereUniqueInput!) {
                        deleteOneUsersLikedPosts(where:$where){
                          id
                        }
                      }`,
        variables: {
          where: {id}
        }
      })
  }

  uploadFile(file: File): Observable<any> {
    console.log(file instanceof File);  // Esto debe devolver "true" si es una instancia de Apollo
    console.log('Apollo Client 2:', this.apolloClient2); // Verifica el contenido de apolloClient2
    return this.apolloClient2.use('myAlternativeGraphQl')
      .mutate({
        mutation: gql`
          mutation SingleUpload($file:Upload!){
            singleUpload(file: $file) {
                message
            }
          }`,
        variables: {
          file: file
        }
      })
  }

  createPost(post: Post): Observable<any> {
    const createPost: CreatePost = {};
    Object.entries(post).forEach(([key, value]) => {
      if (key == 'postedBy' || key == 'belongsTo') {
        createPost[key] = {
          connect: {
            id: value.id
          }
        }
      } else if (key == 'actor' || key == 'topic') {
        createPost[key] = {
          connectOrCreate: {
            where: {
              id: value.id,
              name: {
                contains: value.name
              }
            },
            create: {
              createAt: value.createAt,
              updateAt: value.updateAt,
              name: value.name
            }
          }
        }
      } else if (key == 'followedBy') {
        createPost.followedBy = createPost.followedBy || {};
        createPost.followedBy.connectOrCreate = value
          .map((postsFollowedByUsers: PostsFollowedByUsers) => ({
            where: {
              id: "cm3iczf5w002i7pvyhvznqvow"
            },
            create: {
              user: {
                connect: {
                  id: postsFollowedByUsers.userId
                }
              }
            }
          }));
      } else if (key == 'mediafiles') {
        createPost.mediafiles = createPost.mediafiles || {};
        createPost.mediafiles.create = value
          .map((mediaFile: MediaFile) => (
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
  where: {
    id: string
  }
  create: {
    user: {
      connect: {
        id: string
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
          id: string
          name: {
            contains: string
          }
        }
        create: {
          createAt: string
          updateAt: string
          name: string
        }
      }
    }
}

interface CreateOneUsersLikedPosts {
  post: {
    connect:{
      id: string
    }
  }
  user: {
    connect:{
      id: string
    }
  }
}

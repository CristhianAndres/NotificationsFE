import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//User, Group model
import {User} from '../models/User';
import {Comment} from "../models/Comment";

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private apollo: Apollo) {
  }

  getComments(): Observable<any> {
    //console.log(this.fullUrl);
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            comments {
              createAt
              text
              postId
            }
          }
        `,
        fetchPolicy: 'no-cache', // Desactiva la caché para esta consulta
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.comments
      ));
  }

  createComment(comment: Comment): Observable<any> {
    const createOneComment : CreateOneComment = {
      createAt: comment.createAt,
      updateAt: comment.updateAt,
      text: comment.text,
      createBy:{
        connect:{
          id: comment.userId
        }
      },
      post:{
        connect:{
          id: comment.postId
        }
      }
    }
    return this.apollo
      .mutate({
        mutation: gql`
                      mutation CommentCreateManyInput($data: CommentCreateInput!){
                        createOneComment(data:$data){
                          createAt
                          createBy {
                            userName
                          }
                          post {
                            info
                          }
                        }
                      }`,
        variables: {
          data: createOneComment
        }
      })
  }

  deleteUser(user: User): Observable<any> {
    const id = user.id;
    return this.apollo
      .mutate({
        mutation: gql`
                      mutation DeleteOneUser($where: UserWhereUniqueInput!) {
                        deleteOneUser(where:$where){
                          id
                        }
                      }`,
        variables: {
          where: {id}
        }
      })
  }
}

interface CreateOneComment {
  createAt: Date
  updateAt: Date
  text: string
  createBy:{
    connect:{
      id: string
    }
  }
  post:{
    connect:{
      id: string
    }
  }
}

import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//User, Group model
import {Group} from '../models/Group';
import {User} from "../models/User";
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";
import {Topic} from "../models/Topic";

@Injectable({
  providedIn: 'root',
})
export class TopicService {

  constructor(private apollo: Apollo) {
  }

  getTopics(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            topics {
              createAt
              id
              name
              nameForSearch
              updateAt
            }
          }
        `,
        fetchPolicy: 'no-cache', // Desactiva la caché para esta consulta
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.topics
      ));
  }

  createGroup(topic: Topic): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation createOneTopic($data: TopicCreateInput!){
            createOneTopic(data:$data){
              createAt
              id
              name
              nameForSearch
              updateAt
            }
          }`,
        variables: {
          data: topic
        }
      })
  }

}

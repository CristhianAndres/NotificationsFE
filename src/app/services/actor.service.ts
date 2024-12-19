import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//User, Group model
import {Group} from '../models/Group';
import {User} from "../models/User";
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";
import {Topic} from "../models/Topic";
import { Actor } from '../models/Actor';

@Injectable({
  providedIn: 'root',
})
export class ActorService {

  constructor(private apollo: Apollo) {
  }

  getActors(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            actors {
              createAt
              id
              name
              updateAt
              nameForSearch
            }
          }
        `,
        fetchPolicy: 'no-cache', // Desactiva la caché para esta consulta
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.actors
      ));
  }

  createActor(actor: Actor): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation createOneActor($data: ActorCreateInput!){
            createOneActor(data:$data){
              createAt
              id
              name
              nameForSearch
              updateAt
            }
          }`,
        variables: {
          data: actor
        }
      })
  }

}

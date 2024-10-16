import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private apollo: Apollo) { }

  getGroups(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            groups {
              id
              createAt
              updateAt
              name
              nameForSearch
              color
              admin {
                id
              }
            }
          }
        `
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.groups
      ));
  }
}

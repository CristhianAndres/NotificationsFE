import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  private PATH = "/graphql";
  private HOST = "http://localhost:4000";
  private fullUrl = this.HOST + this.PATH;

  constructor(private apollo: Apollo) { }

  getGroups(): Observable<any> {
    console.log(this.fullUrl);
    return this.apollo
      .watchQuery({
        query: gql`
          {
            groups {
              nameGroup
              id
              actionsGroup
            }
          }
        `
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.groups
      ));
  }
}

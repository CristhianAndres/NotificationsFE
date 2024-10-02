import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private PATH = "/graphql";
  private HOST = "http://localhost:4000";
  private fullUrl = this.HOST + this.PATH;

  constructor(private apollo: Apollo) { }

  getUsers(): Observable<any> {
    console.log(this.fullUrl);
    return this.apollo
      .watchQuery({
        query: gql`
          {
            users {
              id
              name
              email
              userName
              birthday
              gender
              role
              actions
            }
          }
        `
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.users
      ));
  }
}

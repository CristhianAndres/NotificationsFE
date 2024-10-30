import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//User, Group model
import {User} from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private apollo: Apollo) {
  }

  getUsers(): Observable<any> {
    //console.log(this.fullUrl);
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            users {
              id
              createAt
              updateAt
              firstName
              firstNameForSearch
              lastName
              lastNameForSearch
              email
              emailForSearch
              userName
              userNameForSearch
              password
              birthday
              gender
              address
              aboutMe
            }
          }
        `,
        fetchPolicy: 'no-cache', // Desactiva la caché para esta consulta
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.users
      ));
    /*.valueChanges.subscribe(({ data, loading }) => {
            this.loading = loading;
            this.posts = data.posts;
          });*/
  }

  createUser(user: User): Observable<any> {
    //console.log(this.fullUrl);
    return this.apollo
      .mutate({
        mutation: gql`
                      mutation createOneUser($data:UserCreateInput!){
                        createOneUser(data:$data){
                          createAt
                          updateAt
                          firstName
                          firstNameForSearch
                          lastName
                          lastNameForSearch
                          email
                          emailForSearch
                          userName
                          userNameForSearch
                          password
                          birthday
                          gender
                        }
                      }`,
        variables: {
          data: user
        }
      })
  }

  updateUser(user: User): Observable<any> {
    //console.log(this.fullUrl);
    const updateUser: Record<string, { set: any }> = {};
    Object.entries(user).forEach(([key, value]) => {
      updateUser[key] = {set: value}
    });
    //console.log(updateUser);
    const id = user.id;
    return this.apollo
      .mutate({
        mutation: gql`
                      mutation updateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!){
                        updateOneUser(data:$data, where:$where){
                          createAt
                          updateAt
                          firstName
                          firstNameForSearch
                          lastName
                          lastNameForSearch
                          email
                          emailForSearch
                          userName
                          userNameForSearch
                          password
                          birthday
                          gender
                        }
                      }`,
        variables: {
          data: updateUser,
          where: {id}
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

/*
variables: {
                                               data : {"createAt": "2024-01-16T00:00:00Z",
                                                     "updateAt": "2024-01-16T00:00:00Z",
                                                     "firstName": "Noemi5",
                                                     "firstNameForSearch": "Noemi",
                                                     "lastName": "Uyaguari",
                                                     "lastNameForSearch": "Uyaguari",
                                                     "email": "noemi.uyaguari@epn.edu.ec",
                                                     "emailForSearch": "noemi.uyaguari@epn.edu.ec",
                                                     "userName": "nuyaguari",
                                                     "userNameForSearch": "nuyaguari",
                                                     "password": "aeiou",
                                                     "birthday": "2000-01-15T00:00:00Z",
                                                     "gender": "FEMALE"}
                                               }
        })
*/
/*.subscribe(
          ({ data }) => {
            console.log('got data', data);
          },
          error => {
            console.log('there was an error sending the query', error);
          },
        );*/
/*.valueChanges.pipe(map((result: any) =>
  result.data.users
));*/

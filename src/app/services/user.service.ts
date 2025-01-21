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
                          id
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
      if(key != 'confirmPassword') {
        updateUser[key] = {set: value}
      }
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

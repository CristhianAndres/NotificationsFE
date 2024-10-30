import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//User, Group model
import {Group} from '../models/Group';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private apollo: Apollo) {
  }

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
        `,
        fetchPolicy: 'no-cache', // Desactiva la caché para esta consulta
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.groups
      ));
  }

  createGroup(group: Group): Observable<any> {
    const createGroup: Record<string, { connect: { id: string } }> = {};
    Object.entries(group).forEach(([key, value]) => {
      if (key == 'userId') {
        createGroup['admin'] = {connect: {id: value}};
      } else {
        createGroup[key] = value
      }
    });
    return this.apollo
      .mutate({
        mutation: gql`
          mutation createOneGroup($data:GroupCreateInput!){
            createOneGroup(data:$data){
              createAt
              updateAt
              name
              nameForSearch
              color
              admin {
                id
              }
            }
          }`,
        variables: {
          data: createGroup
        }
      })
  }

  updateGroup(group: Group): Observable<any> {
    //console.log(this.fullUrl);
    const updateGroup: Record<string, { set: any } | { connect: { id: string } }> = {};
    Object.entries(group).forEach(([key, value]) => {
      if (key == 'userId') {
        updateGroup['admin'] = {connect: {id: value}};
      } else {
        updateGroup[key] = {set: value}
      }
    });
    //console.log(updateUser);
    const id = group.id;
    return this.apollo
      .mutate({
        mutation: gql`
          mutation updateOneGroup($data: GroupUpdateInput!, $where: GroupWhereUniqueInput!){
            updateOneGroup(data:$data, where:$where){
              updateAt
              name
              nameForSearch
              color
            }
          }`,
        variables: {
          data: updateGroup,
          where: {id}
        }
      })
  }

  deleteGroup(group: Group): Observable<any> {
    const id = group.id;
    return this.apollo
      .mutate({
        mutation: gql`
          mutation deleteOneGroup($where: GroupWhereUniqueInput!) {
            deleteOneGroup(where:$where){
              id
            }
          }`,
        variables: {
          where: {id}
        }
      })
  }
}

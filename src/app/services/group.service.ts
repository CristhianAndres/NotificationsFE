import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
//User, Group model
import {Group} from '../models/Group';
import {User} from "../models/User";
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";

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
              members {
                id
                user {
                  id
                  userName
                  firstName
                  lastName
                }
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
    const updateGroup: UpdateGroup = {};
    Object.entries(group).forEach(([key, value]) => {
      if (key == 'members') {
        // Inicializa members si aún no existe
        updateGroup.members = updateGroup.members || {};
        updateGroup.members.create = value
          .filter((member: UserBelongsToGroup) => !member.id) // Filtra miembros que no tienen un id válido
          .map((member: UserBelongsToGroup) => ({
            user: {
              connect: {
                id: member.user?.id
              }
            }
          }));

      } else if (key == 'userId') {
        updateGroup['admin'] = {connect: {id: value}};

      } else if (key == 'membersToDeleted') {
        // Inicializa members si aún no existe
        updateGroup.members = updateGroup.members || {};
        updateGroup.members.delete = value?.map((memberToDelete: string) => ({
          id: memberToDelete
        }));
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

interface CreateMember {
  user: {
    connect: {
      id: string;
    };
  };
}

interface DeleteMember {
  id: string;
}

interface UpdateGroup {
  // @ts-ignore
  members?: {
    create?: CreateMember[];
    delete?: DeleteMember[];
  };
  admin?: {
    connect: {
      id: string;
    };
  };
  [key: string]: { set: any } | { connect: { id: string } } | { members?: { create?: CreateMember[]; delete?: DeleteMember[] } } | undefined;
}

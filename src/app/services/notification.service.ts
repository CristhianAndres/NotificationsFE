import {Inject, Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from "../models/Post";
import {MediaFile} from "../models/MediaFile";
import {PostsFollowedByUsers} from "../models/PostsFollowedByUsers";
import {Notification} from "../models/Notification";
import {ActionNotifiesToUser} from "../models/ActionNotifiesToUser";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getNotificationsToUsers(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          {
            actionNotifiesToUsers {
              id
              userId
              user {
                id
                userName
              }
              notification {
                id
                userId
                createBy {
                  userName
                }
                objectType
                targetType
                targetId
                objectId
              }
            }
          }
        `,
        fetchPolicy: 'no-cache', // Desactiva la caché para esta consulta
      })
      .valueChanges.pipe(map((result: any) =>
        result.data.actionNotifiesToUsers
      ));
  }

  createNotification(notification: Notification): Observable<any> {
    const createNotification: CreateNotification = {};
    Object.entries(notification).forEach(([key, value]) => {
      if (key == 'createBy') {
        createNotification[key] = {
          connect: {
            id: value.id
          }
        }
      } else if (key == 'notifiesTo') {
        createNotification.notifiesTo = createNotification.notifiesTo || {};
        createNotification.notifiesTo.create = value
          .map((actionNotifiesToUser: ActionNotifiesToUser) => ({
              user: {
                connect: {
                  id: actionNotifiesToUser.userId
                }
            }
          }));
      } else if (key == 'createAt' || key == 'updateAt' || key == 'seen' || key == 'actorType' || key == 'actorId'
              || key == 'activityType' || key == 'objectType' || key == 'objectId' || key == 'targetType' || key == 'targetId') {
        createNotification[key] = value
      }
    });
    return this.apollo
      .mutate({
        mutation: gql`
          mutation createOneNotification($data:NotificationCreateInput!){
            createOneNotification(data:$data){
              id
            }
          }`,
        variables: {
          data: createNotification
        }
      })
  }
}

interface ActionNotifiesToUserObj {
  user: {
    connect: {
        id: string
    }
  }
}

interface CreateNotification {
  // @ts-ignore
  notifiesTo?: {
    create?: ActionNotifiesToUserObj[];
  };
  // @ts-ignore
  createBy?: {
    connect?: {
      id: string
    }
  };
  [key: string]: { value: any }
}

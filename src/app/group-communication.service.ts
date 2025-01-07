import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupCommunicationService {

  private allGroupsSubject = new BehaviorSubject<any[]>([]);
  allGroups$ = this.allGroupsSubject.asObservable();

  constructor() { }

  setGroups(groups: any[]) {
    this.allGroupsSubject.next(groups);
  }

  getGroups(): any[] {
    return this.allGroupsSubject.getValue();
  }
}

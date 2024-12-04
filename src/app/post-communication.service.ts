import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostCommunicationService {

  private postListUpdateSource = new Subject<void>();

  postListUpdated$ = this.postListUpdateSource.asObservable();

  notifyPostListUpdate() {
    this.postListUpdateSource.next();
  }
}

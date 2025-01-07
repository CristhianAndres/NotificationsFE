import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
//Expone el metodo loadPosts() del componente post-list
//Objetivo: refrescar lista de posts despues de crear un post nuevo desde componente post-options
export class PostCommunicationService {

  private postListUpdateSource = new Subject<void>();

  postListUpdated$ = this.postListUpdateSource.asObservable();

  notifyPostListUpdate(data: any) {
    this.postListUpdateSource.next(data);
  }
}

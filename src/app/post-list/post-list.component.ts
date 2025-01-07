import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {MatGridListModule} from '@angular/material/grid-list';
import {PostComponent} from '../post/post.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {PostService} from "../services/post.service";
import {Post} from "../models/Post";
import {FormBuilder} from "@angular/forms";
import {PostCommunicationService} from "../post-communication.service";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatGridListModule, PostComponent, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  private postService = inject(PostService);
  posts: Post[] = [];
  @Input() loginUserId = ''; // Recibe el mensaje del padre

  constructor(private postCommunicationService: PostCommunicationService) {
    this.loadPosts("post-options");
  }

  ngOnInit() {
    this.postCommunicationService.postListUpdated$.subscribe(data => {
      this.updatePostList(data);
    });
  }

  updatePostList(data: any) {
    // Implementa aquí la lógica que necesitas ejecutar
    this.loadPosts(data);
  }

  loadPosts(data:any) {
    this.postService.getPosts().subscribe(
      response => {
        if(data == "post-options") {
          //this.posts = response.reverse();
          // Ordenar por createdAt de más reciente a más antiguo
          this.posts = response.sort((a:Post, b:Post) => {
            return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
          });

        } else if (typeof data === 'string'){
          this.posts = response.filter((post:Post) =>
            post.groupId === data).sort((a:Post, b:Post) => {
            return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
          });

        } else if (typeof data === 'object'){
          this.posts = response.filter((post:Post) =>
            post.info.toLowerCase().includes(data.postText.toLowerCase())).sort((a:Post, b:Post) => {
            return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
          });
        }
      },
      error => {
        console.error('Error al obtener datos', error);
      });
  }

  like(postId : string) {
    this.postService.likedPost(this.loginUserId, postId).subscribe(
      response => {
        this.loadPosts("post-options");
      },
      error => {
        console.error('Error al obtener datos', error);
      });
  }

  comment() {

  }
}

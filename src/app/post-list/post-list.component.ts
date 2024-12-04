import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {MatGridListModule} from '@angular/material/grid-list';
import {PostComponent} from '../post/post.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {PostService} from "../services/post.service";
import {Post} from "../models/Post";
import {FormBuilder} from "@angular/forms";
import {PostCommunicationService} from "../post-communication.service";

export interface CardData {
  user: string;
  group: string;
  title: string;
  content: string;
}

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

  constructor(private postCommunicationService: PostCommunicationService) {
    this.loadPosts();
  }

  ngOnInit() {
    this.postCommunicationService.postListUpdated$.subscribe(() => {
      this.updatePostList();
    });
  }

  updatePostList() {
    // Implementa aquí la lógica que necesitas ejecutar
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      response => {
        this.posts = response.reverse();
      },
      error => {
        console.error('Error al obtener datos', error);
      });
  }

  cards: CardData[] = [
    {user: 'User 1', group: 'Group 1', title: 'Seminario', content: 'Contenido de la tarjeta 1'},
    {user: 'User 2', group: 'Group 1', title: 'Seminario', content: 'Contenido de la tarjeta 2'},
    {user: 'User 3', group: 'Group 1', title: 'Seminario', content: 'Contenido de la tarjeta 3'},
    {user: 'User 4', group: 'Group 1', title: 'Seminario', content: 'Contenido de la tarjeta 4'},
    {user: 'User 5', group: 'Group 1', title: 'Seminario', content: 'Contenido de la tarjeta 5'}
  ];
}

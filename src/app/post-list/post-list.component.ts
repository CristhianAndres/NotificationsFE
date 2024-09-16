import {Component} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import {MatGridListModule} from '@angular/material/grid-list';
import {PostComponent} from '../post/post.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

export interface CardData {
  user: string;
  group: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatGridListModule, PostComponent, MatCardModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

cards: CardData[] = [
    { user: 'User 1', group:'Group 1', title:'Seminario', content: 'Contenido de la tarjeta 1' },
    { user: 'User 2', group:'Group 1', title:'Seminario', content: 'Contenido de la tarjeta 2' },
    { user: 'User 3', group:'Group 1', title:'Seminario', content: 'Contenido de la tarjeta 3' },
    { user: 'User 4', group:'Group 1', title:'Seminario', content: 'Contenido de la tarjeta 4' },
    { user: 'User 5', group:'Group 1', title:'Seminario', content: 'Contenido de la tarjeta 5' }
  ];
}

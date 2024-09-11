import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-post-options',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './post-options.component.html',
  styleUrl: './post-options.component.css'
})
export class PostOptionsComponent {

}

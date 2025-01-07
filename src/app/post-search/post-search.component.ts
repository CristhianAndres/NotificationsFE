import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GroupCommunicationService} from "../group-communication.service";
import {PostCommunicationService} from "../post-communication.service"; // Asegúrate de incluir esto

@Component({
  selector: 'app-post-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-search.component.html',
  styleUrl: './post-search.component.css'
})
export class PostSearchComponent {
  postText: string = ''; // Atributo que se vinculará al input

  constructor(private postCommunicationService: PostCommunicationService) {
  }

  triggerUpdate() {
    this.postCommunicationService.notifyPostListUpdate("tree-groups");
  }

  cargarPostsFromPostText() {
    this.postCommunicationService.notifyPostListUpdate({postText : this.postText});
  }
}

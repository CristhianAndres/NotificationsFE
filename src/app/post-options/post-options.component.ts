import {ChangeDetectionStrategy, Component, inject, Input, model, Output, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {PostComponent} from '../post/post.component';
import EventEmitter from "node:events";
import {PostCommunicationService} from "../post-communication.service";
import {User} from "../models/User";

@Component({
  selector: 'app-post-options',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, PostComponent, MatDialogModule],
  templateUrl: './post-options.component.html',
  styleUrl: './post-options.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostOptionsComponent {

  readonly dialog = inject(MatDialog);
  @Input() loginUserId = ''; // Recibe el mensaje del padre
  @Input() mensajeDelPadre = ''; // Recibe el mensaje del padre

  constructor(private postCommunicationService: PostCommunicationService) {
    console.log(this.loginUserId);
  }
  triggerUpdate() {
    this.postCommunicationService.notifyPostListUpdate("post-options");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostComponent, {
      data: {
        loginUserId: this.loginUserId
      },
      width: '60%', // Ajusta el ancho según sea necesario
      height: '95%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.postCommunicationService.notifyPostListUpdate("post-options");
    });
  }

  homeListPosts() {
    this.postCommunicationService.notifyPostListUpdate("post-options");
  }
}

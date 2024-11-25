import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
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
  openDialog(): void {
      const dialogRef = this.dialog.open(PostComponent, {
        data: {},
         width: '60%', // Ajusta el ancho según sea necesario
         height: '95%', // Ajusta la altura según sea necesario
         maxWidth: '900px', // Puedes establecer un tamaño máximo
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
}

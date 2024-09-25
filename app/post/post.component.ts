import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogModule
} from '@angular/material/dialog';

import {DropdownGroupsComponent} from '../dropdown-groups/dropdown-groups.component';
import {TextImagePostComponent} from '../text-image-post/text-image-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, DropdownGroupsComponent, TextImagePostComponent, MatIconModule, MatListModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {

  photos = [
      { name: 'photo 1' },
      { name: 'photo 2' },
      { name: 'photo 3' },
      { name: 'photo 4' },
      { name: 'photo 5' },
      { name: 'photo 6' }
    ];

  documents = [
        { name: 'document 1' },
        { name: 'document 2' }
      ];

  tags = [
        { name: 'tag 1' },
        { name: 'tag 2' },
        { name: 'tag 3' },
        { name: 'tag 4' },
        { name: 'tag 5' }
      ];

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

   onButtonClick(item: string) {
      console.log(`${item} fue clickeado!`);
    }
}

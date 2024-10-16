import {ChangeDetectionStrategy, Component, inject, model, signal, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
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

import {PostSearchComponent} from '../post-search/post-search.component';
import {PostOptionsComponent} from '../post-options/post-options.component';
import { TreeGroupsComponent } from '../tree-groups/tree-groups.component';
import { UserNotificationComponent } from '../user-notification/user-notification.component';
import {PostListComponent} from '../post-list/post-list.component';
import {ConfigurationComponent} from '../configuration/configuration.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [MatGridListModule, MatToolbarModule, MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatSelectModule,
    TreeGroupsComponent,
    PostSearchComponent,
    UserNotificationComponent,
    PostOptionsComponent,
    PostListComponent,
    ConfigurationComponent
  ],
  templateUrl: './news-feed.component.html',
  styleUrl: './news-feed.component.css'
})
export class NewsFeedComponent implements OnInit{
  filteredOptions!: Observable<string[]>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  readonly dialog = inject(MatDialog);
    openDialog(): void {
        const dialogRef = this.dialog.open(ConfigurationComponent, {
          data: {},
           width: '100%', // Ajusta el ancho según sea necesario
           height: '100%', // Ajusta la altura según sea necesario
           maxWidth: '1300px', // Puedes establecer un tamaño máximo
           maxHeight: '750px', // Puedes establecer un tamaño máximo
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
}

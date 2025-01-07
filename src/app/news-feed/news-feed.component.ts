import {ChangeDetectionStrategy, Component, inject, model, signal, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {
  MatDialog,
} from '@angular/material/dialog';

import {PostSearchComponent} from '../post-search/post-search.component';
import {PostOptionsComponent} from '../post-options/post-options.component';
import {TreeGroupsComponent} from '../tree-groups/tree-groups.component';
import {UserNotificationComponent} from '../user-notification/user-notification.component';
import {PostListComponent} from '../post-list/post-list.component';
import {ConfigurationComponent} from '../configuration/configuration.component';
import {User} from "../models/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

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
export class NewsFeedComponent{
  filteredOptions!: Observable<string[]>;
  myControl = new FormControl('');
  readonly dialog = inject(MatDialog);
  router : ActivatedRoute = inject(ActivatedRoute);
  loginUser!: User | undefined;
  private userService = inject(UserService);
  users: User[] = [];
  userName: any;
  mensaje: string = 'Hola desde el componente padre!';
  loginUserId = "xx";

  constructor(/*private loginUser: User*/) {
    //this.loginUser.userName = this.router.snapshot.params['login'];
    this.userName = this.router.snapshot.params['login'];
    this.loginUserId = this.router.snapshot.params['id'];
    //this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
        this.loginUser = this.users.find((user: User) => {
          return this.userName === user.userName;
        });
        //this.loginUserId = this.loginUser?.id;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

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

import {ChangeDetectionStrategy, Component, inject, model, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import {MatTable, MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
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
import { Apollo, gql } from 'apollo-angular';

import { UserInformationComponent } from '../user-information/user-information.component';

//User, Group service
import { UserService } from '..//services/user.service';
import { GroupService } from '..//services/group.service';

//User, Group model
import {User} from '../models/User.d';

/*export interface User {
  name: string;
  email: string;
  userName: string;
  birthday: string;
  gender: string;
  role: string;
  actions: string;
}*/

export interface Group {
  nameGroup: string;
  id: string;
  actionsGroup: string;
}

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatToolbarModule, MatGridListModule, MatIconModule, UserInformationComponent, CommonModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  private userService = inject(UserService);
  private groupService = inject(GroupService);

  users : User[] = [];
  loading = true;
  error: any;
  displayedColumnsUsers: string[] = ['id', 'createAt', 'updateAt', 'firstName', 'firstNameForSearch', 'lastName', 'lastNameForSearch', 'email']
  dataSourceUsers = new MatTableDataSource<any>();
  displayedColumnsGroups: string[] = ['id', 'createAt', 'updateAt', 'name', 'nameForSearch', 'color', 'admin.id'];
  dataSourceGroups = new MatTableDataSource<any>();

  isTileUserVisible: boolean = true; // Inicialmente el tile es visible
  isTileGroupVisible: boolean = false; // Inicialmente el tile es visible

  constructor() {
    //this.userService.getUsers().subscribe((data) => (this.users = data));
  }
  ngOnInit() {
    /*this.userService.getUsers().subscribe((data) =>
      (this.dataSourceUsers.data = data)
    );*/
    this.userService.getUsers().subscribe(
      response => {
        this.dataSourceUsers.data = response;
        console.log(this.dataSourceUsers.data);
        //this.displayedColumnsUsers = this.dataSourceUsers.data[0].obtenerAtributos();
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
    /*this.groupService.getGroups().subscribe((data) =>
      (this.dataSourceGroups.data = data)
    );*/
    this.groupService.getGroups().subscribe(
      response => {
        this.dataSourceGroups.data = response;
        console.log(this.dataSourceGroups.data);
        //this.displayedColumnsUsers = this.dataSourceUsers.data[0].obtenerAtributos();
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  openDialogUser(): void {
    this.isTileUserVisible = !this.isTileUserVisible; // Cambiar el estado de visibilidad
    this.isTileGroupVisible = !this.isTileGroupVisible;
  };
  openDialogActor(): void {};
  openDialogTopic(): void {};

  openDialogGroup(): void {
    this.isTileUserVisible = !this.isTileUserVisible; // Cambiar el estado de visibilidad
    this.isTileGroupVisible = !this.isTileGroupVisible;
  };

  openCreateUser(): void {
        const dialogRef = this.dialog.open(UserInformationComponent, {
          data: {},
           width: '90%', // Ajusta el ancho según sea necesario
           height: '100%', // Ajusta la altura según sea necesario
           maxWidth: '600px', // Puedes establecer un tamaño máximo
           maxHeight: '600px', // Puedes establecer un tamaño máximo
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      };

   editUser(user: User) : void {
        const dialogRef = this.dialog.open(UserInformationComponent, {
          data: {user},
           width: '90%', // Ajusta el ancho según sea necesario
           height: '100%', // Ajusta la altura según sea necesario
           maxWidth: '600px', // Puedes establecer un tamaño máximo
           maxHeight: '600px', // Puedes establecer un tamaño máximo
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          /*if (result) {
            const index = this.dataSourceUsers.data.findIndex(item => item.id === result.id);
            if (index !== -1) {
              this.dataSourceUsers.data[index] = result; // Actualiza el registro en el dataSource
              this.dataSourceUsers.data = [...this.dataSourceUsers.data]; // Forzar la actualización de la tabla
            }
          }*/
        });
      };

    deleteUser(user: User) {
      console.log('Eliminando:', user);
      // Aquí puedes implementar la lógica para eliminar al usuario
    }
}

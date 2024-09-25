import {ChangeDetectionStrategy, Component, inject, model, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import {MatTable, MatTableModule} from '@angular/material/table';
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

import { UserInformationComponent } from '../user-information/user-information.component';

export interface User {
  name: string;
  email: string;
  userName: string;
  birthday: string;
  gender: string;
  role: string;
  actions: string;
}

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
export class ConfigurationComponent {

readonly dialog = inject(MatDialog);

isTileUserVisible: boolean = true; // Inicialmente el tile es visible
isTileGroupVisible: boolean = false; // Inicialmente el tile es visible

  users : User[] = [
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', actions: ''},
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', actions: ''},
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', actions: ''},
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', actions: ''},
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', actions: ''},
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', actions: ''}
    ];

  displayedColumnsUsers: string[] = ['name', 'email', 'userName', 'birthday', 'gender', 'role', 'actions'];
  dataSourceUsers = [...this.users];

  //@ViewChild(MatTable) table!: MatTable<User>;

  groups : Group[] = [
          { nameGroup: 'Group', id: '1', actionsGroup: ''},
          { nameGroup: 'Group', id: '2', actionsGroup: ''},
          { nameGroup: 'Group', id: '3', actionsGroup: ''},
          { nameGroup: 'Group', id: '4', actionsGroup: ''}
      ];

    displayedColumnsGroups: string[] = ['id', 'nameGroup', 'actionsGroup'];
    dataSourceGroups = [...this.groups];

    //@ViewChild(MatTable) table!: MatTable<Group>;

  openDialogUser(): void {
    this.isTileUserVisible = !this.isTileUserVisible; // Cambiar el estado de visibilidad
    this.isTileGroupVisible = !this.isTileGroupVisible;
  };
  openDialogActor(): void {

          };
  openDialogTopic(): void {

          };
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

    deleteUser(user: User) {
      console.log('Eliminando:', user);
      // Aquí puedes implementar la lógica para eliminar al usuario
    }
}

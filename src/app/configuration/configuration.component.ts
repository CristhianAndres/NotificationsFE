import {ChangeDetectionStrategy, Component, inject, model, signal, OnInit, ViewChild, Inject} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
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
import {HttpErrorResponse} from '@angular/common/http';

import {UserInformationComponent} from '../user-information/user-information.component';
import {GroupInformationComponent} from '../group-information/group-information.component';

//User, Group service
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';

//User, Group model
import {User} from '../models/User';
import {Group} from '../models/Group';
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";

const backgroundColorSelected: string = '#1abc9c';  // seleccionado
const backgroundColorNotSelected: string = '#ebf5fb';  // no seleccionado

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

  users: User[] = [];
  loading = true;
  error: any;
  displayedColumnsUsers: string[] = ['id', 'createAt', 'updateAt', 'firstName', 'firstNameForSearch', 'lastName', 'lastNameForSearch', 'email', 'emailForSearch', 'userName', 'userNameForSearch',/* 'password', */'birthday', 'gender', 'address',/* 'aboutMe',*/ 'actions'];
  dataSourceUsers = new MatTableDataSource<any>();
  displayedColumnsGroups: string[] = ['id', 'createAt', 'updateAt', 'name', 'nameForSearch', 'color', 'admin.id', 'actions'];
  dataSourceGroups = new MatTableDataSource<any>();

  isTileUserVisible: boolean = true; // Inicialmente el tile es visible
  backgroundColorUser: string = backgroundColorSelected;

  isTileGroupVisible: boolean = false; // Inicialmente el tile es visible
  backgroundColorGroup: string = backgroundColorNotSelected;
  loginUserId = "";

  constructor(@Inject(MAT_DIALOG_DATA) public user: any) {
    this.loginUserId = user.loginUserId;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.dataSourceUsers.data = response;
        console.log(this.dataSourceUsers.data);
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe(
      response => {
        this.dataSourceGroups.data = response;
        console.log(this.dataSourceGroups.data);
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  ngOnInit() {
    this.loadUsers();
    this.loadGroups();
  }

  openDialogUser(): void {
    if (!this.isTileUserVisible) {
      this.isTileUserVisible = !this.isTileUserVisible; // Cambiar el estado de visibilidad
      this.isTileGroupVisible = !this.isTileGroupVisible;

      this.backgroundColorUser = backgroundColorSelected;
      this.backgroundColorGroup = backgroundColorNotSelected
    }
  };

  openDialogActor(): void {
  };

  openDialogTopic(): void {
  };

  openDialogGroup(): void {
    if (!this.isTileGroupVisible) {
      this.isTileUserVisible = !this.isTileUserVisible; // Cambiar el estado de visibilidad
      this.isTileGroupVisible = !this.isTileGroupVisible;

      this.backgroundColorGroup = backgroundColorSelected;
      this.backgroundColorUser = backgroundColorNotSelected
    }
  };

  openCreateUser(): void {
    const dialogRef = this.dialog.open(UserInformationComponent, {
      data: {
        loginUserId : this.loginUserId,
        groups: this.dataSourceGroups.data
      },
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUsers();
    });
  };

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserInformationComponent, {
      //data: user,
      data: {
        loginUserId : this.loginUserId,
        user: user,
        groups: this.dataSourceGroups.data
      },
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUsers();
    });
  };

  deleteUser(user: User) {
    console.log('Elimination:', user);

    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user).subscribe(
          (data: User) => {
            this.loadUsers();
            console.log('got data', data);
          },
          (error: HttpErrorResponse) => {
            console.log('there was an error sending the query', error);
          }
        );
      }
    });
  }

  openCreateGroup(): void {
    const dialogRef = this.dialog.open(GroupInformationComponent, {
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadGroups();
    });
  };

  editGroup(group: Group): void {
    const dialogRef = this.dialog.open(GroupInformationComponent, {
      data: group,
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadGroups();
    });
  };

  deleteGroup(group: Group) {
    console.log('Elimination:', group);
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(group).subscribe(
          (data: Group) => {
            this.loadGroups();
            console.log('got data', data);
          },
          (error: HttpErrorResponse) => {
            console.log('there was an error sending the query', error);
          }
        );
      }
    });
  }

  readonly dialogRefPost = inject(MatDialogRef<ConfigurationComponent>);
  closeModal() {
    this.dialogRefPost.close(); // Cierra el modal
  }
}

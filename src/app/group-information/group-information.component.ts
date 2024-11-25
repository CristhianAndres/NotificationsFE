import {Component, OnInit, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'; // Asegúrate de importar esto
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms'; // Asegúrate de incluir esto
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
//User, Group model
import {User} from '../models/User';
import {Group} from '../models/Group';

//User, Group service
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {UsersListCheckComponent} from "../users-list-check/users-list-check.component";

@Component({
  selector: 'app-group-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatToolbarModule, MatButtonModule],
  templateUrl: './group-information.component.html',
  styleUrl: './group-information.component.css'
})
export class GroupInformationComponent {

  groupForm: FormGroup;
  isEditMode: boolean; // Variable para saber si estamos en modo edición
  private groupService = inject(GroupService);
  private userService = inject(UserService);
  readonly dialogRef = inject(MatDialogRef<GroupInformationComponent>);
  users: User[] = [];
  selectedAdmin: string = '';
  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public group: Group
  ) {
    this.isEditMode = !!group; // Establecer el modo basado en la presencia de datos
    this.loadUsers();
    //this.userAdmin = new User("");

    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      nameForSearch: [''],
      color: ['', Validators.required],
      userId: ['', Validators.required]
    });

    // Si data está definido, establece los valores del formulario
    if (this.isEditMode) {
      this.selectedAdmin = group.admin!.id;
      this.groupForm.patchValue({
        name: group.name,
        nameForSearch: group.nameForSearch,
        color: group.color
      });
    }

  }

  onSubmit() {
    if (this.groupForm.valid) {
      //console.log(this.groupForm.value);
      const group: Group = this.groupForm.value;
      const now = new Date();
      group.updateAt = now;
      // @ts-ignore
      group.userId = this.selectedAdmin
      if (!this.isEditMode) {
        group.createAt = now;
        this.groupService.createGroup(group).subscribe(
          (data: Group) => {
            this.dialogRef.close();
          },
          (error: HttpErrorResponse) => {
            console.log('there was an error sending the query', error);
          }
        );
      } else {
        group.id = this.group.id;
        group.members = this.group.members;
        group.membersToDeleted = this.group.membersToDeleted;
        this.groupService.updateGroup(group).subscribe(
          (data: Group) => {
            this.dialogRef.close();
          },
          (error: HttpErrorResponse) => {
            console.log('there was an error sending the query', error);
          }
        );
      }
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  openAddUsers(): void {
    const dialogRefUsersList = this.dialog.open(UsersListCheckComponent, {
      data: this.group,
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '400px', // Puedes establecer un tamaño máximo
      maxHeight: '600px', // Puedes establecer un tamaño máximo
    });

    dialogRefUsersList.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        //this.animal.set(result);
      }
    });
  }
}


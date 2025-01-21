import {Component, OnInit, inject, model, Inject} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'; // Asegúrate de importar esto
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms'; // Asegúrate de incluir esto
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';

//User, Group service
import {UserService} from '../services/user.service';

//User, Group model
import {User} from '../models/User';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIcon],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css',
  providers: [provideNativeDateAdapter()]
})

export class UserInformationComponent {

  userForm!: FormGroup;
  isEditMode!: boolean; // Variable para saber si estamos en modo edición
  private userService = inject(UserService);
  readonly dialogRef = inject(MatDialogRef<UserInformationComponent>);
  hide = true; // Propiedad para controlar la visibilidad

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    this.isEditMode = !!user; // Establecer el modo basado en la presencia de datos

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      firstNameForSearch: [''],
      lastName: ['', Validators.required],
      lastNameForSearch: [''],
      email: ['', [Validators.required, Validators.email]],
      emailForSearch: [''],
      userName: ['', Validators.required],
      userNameForSearch: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      aboutMe: ['', Validators.required]
    });

    // Si data está definido, establece los valores del formulario
    if (this.isEditMode) {
      this.userForm.patchValue({
        firstName: user.firstName,
        firstNameForSearch: user.firstNameForSearch,
        lastName: user.lastName,
        lastNameForSearch: user.lastNameForSearch,
        email: user.email,
        emailForSearch: user.emailForSearch,
        userName: user.userName,
        userNameForSearch: user.userNameForSearch,
        birthday: user.birthday,
        gender: user.gender,
        address: user.address,
        aboutMe: user.aboutMe,
        password: user.password,
        confirmPassword: user.password
      });
    }
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault(); // Evita que el evento se propague
    this.hide = !this.hide; // Cambia la visibilidad
  }

  onSubmit() {
    if (this.userForm.valid) {
      if(this.userForm.value.password != this.userForm.value.confirmPassword){
        alert("Campos contraseña deben coicidir");
        return;
      }
      delete this.userForm.value.confirmPassword;

      const user: User = this.userForm.value;
      const now = new Date();
      user.updateAt = now;

      if (!this.isEditMode) {
        user.createAt = now;
        this.userService.createUser(user).subscribe(
          (data: User) => {
            console.log('got data', data);
            this.dialogRef.close();
          },
          (error: HttpErrorResponse) => {
            console.log('there was an error sending the query', error);
          }
        );
      } else {
        user.id = this.user.id;
        this.userService.updateUser(user).subscribe(
          (data: User) => {
            console.log('got data', data);
            this.dialogRef.close();
          },
          (error: HttpErrorResponse) => {
            console.log('there was an error sending the query', error);
          }
        );
      }
    }
  }

  closeModal() {
    this.dialogRef.close(); // Cierra el modal
  }
}

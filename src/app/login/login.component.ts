import {Component, OnInit, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, MatToolbarModule, MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  users: User[] = [];
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder) {

    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Login Data:', this.userForm);
    // Aquí puedes llamar a un servicio para autenticar al usuario
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
        console.log(this.users);
        let user = this.users.find((user: User) => {
          return this.userForm.value.email === user.email;
        });
        if (user?.password == this.userForm.value.password) {
          this.router.navigate(['news', user?.userName, user?.id]);
        } else {
          alert("Contraseña incorrecta");
        }
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }
}

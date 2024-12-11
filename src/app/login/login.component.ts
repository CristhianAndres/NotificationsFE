import {Component, OnInit, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  users: User[] = [];

  constructor(private router: Router) {
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
        console.log(this.users);
        let user = this.users.find((user: User) => {
          return this.loginData.email === user.email;
        });
        if (user?.password == this.loginData.password) {
          this.router.navigate(['news']);
        } else {
          alert("Contraseña incorrecta");
        }
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  loginData = {
    email: '',
    password: '',
  };

  onSubmit() {
    console.log('Login Data:', this.loginData);
    // Aquí puedes llamar a un servicio para autenticar al usuario
    this.loadUsers();
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MatNativeDateModule, DateAdapter, NativeDateAdapter } from '@angular/material/core'; // Importa esto
import { ReactiveFormsModule } from '@angular/forms';
import {LoginComponent} from "./login/login.component"; // Importar ReactiveFormsModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewsFeedComponent, CommonModule, ReactiveFormsModule, MatNativeDateModule, LoginComponent, MatDatepickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideNativeDateAdapter()]
})
export class AppComponent {
  title = 'NotificationsFE';
}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from "@angular/router"; // Si estás usando formularios reactivos

@Component({
  selector: 'app-user-notification',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ReactiveFormsModule, MatMenuTrigger, MatMenu, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css'
})
export class UserNotificationComponent {

  constructor(private router: Router) {
  }

  logout() {
    this.router.navigate(['login']);
  }
}

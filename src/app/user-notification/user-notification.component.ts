import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // Para mat-button
import { ReactiveFormsModule } from '@angular/forms'; // Si estás usando formularios reactivos

@Component({
  selector: 'app-user-notification',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css'
})
export class UserNotificationComponent {

}

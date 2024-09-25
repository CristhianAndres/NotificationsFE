import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de incluir esto

@Component({
  selector: 'app-post-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-search.component.html',
  styleUrl: './post-search.component.css'
})
export class PostSearchComponent {
  onButtonClick(item: string) {
        console.log(`${item} fue clickeado!`);
      }
}

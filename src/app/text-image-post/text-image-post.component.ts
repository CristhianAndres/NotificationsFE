import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de incluir esto


@Component({
  selector: 'app-text-image-post',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatIconModule, MatCardModule, CommonModule, ReactiveFormsModule],
  templateUrl: './text-image-post.component.html',
  styleUrl: './text-image-post.component.css'
})
export class TextImagePostComponent {
  //form: FormGroup;
  imageUrl: string  = ""; // Para almacenar la URL de la imagen
  info: any;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario
    /*this.form = this.fb.group({
      image: [''] // Inicializa el campo de imagen
    });*/
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]; // Obtén el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof reader.result === "string") {
          this.imageUrl = reader.result;
        } // Establece la URL de la imagen
        //const base64String = e.target?.result as string;
        //console.log(base64String);
      };
      reader.readAsDataURL(file); // Lee el archivo como URL de datos
    }
  }
}

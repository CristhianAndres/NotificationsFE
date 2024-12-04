import {CommonModule} from '@angular/common'; // Importa CommonModule
import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {PostService} from "../services/post.service"; // Asegúrate de incluir esto


@Component({
  selector: 'app-text-image-post',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatIconModule, MatCardModule, CommonModule, ReactiveFormsModule],
  templateUrl: './text-image-post.component.html',
  styleUrl: './text-image-post.component.css'
})
export class TextImagePostComponent {
  //form: FormGroup;
  imageUrl: string = ""; // Para almacenar la URL de la imagen
  info: any;
  selectedFiles: File[] = [];
  private postService = inject(PostService);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      alert('Por favor, selecciona archivos para subir.');
      return;
    }
    let url;
    this.postService.uploadFile(this.selectedFiles[0]).subscribe(
      response => {
        console.log('Archivo subido exitosamente', response);
        url = response;
      },
      error => {
        console.error('Error al obtener datos', error);
      });

    // Aquí puedes implementar la lógica para subir los archivos a tu servidor.
    // Esto podría incluir el uso de FormData para enviar los archivos a través de una petición HTTP.

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    // Ejemplo de cómo podrías enviar los archivos a un servidor usando HttpClient
    /*
    this.httpClient.post('URL_DE_TU_API', formData).subscribe(response => {
      console.log('Archivos subidos exitosamente', response);
    }, error => {
      console.error('Error al subir archivos', error);
    });
    */
  }


  constructor(private fb: FormBuilder) {
    // Inicializa el formulario
    /*this.form = this.fb.group({
      image: [''] // Inicializa el campo de imagen
    });*/
  }

  /*onFileSelected(event: Event): void {
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
  }*/
}

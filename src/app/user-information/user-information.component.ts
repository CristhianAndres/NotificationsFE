import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Asegúrate de importar esto
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de incluir esto
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatToolbarModule, MatButtonModule],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css'
})

export class UserInformationComponent implements OnInit {

userForm: FormGroup;

  constructor(private fb: FormBuilder)
  {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}

import {Component, inject, model} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Topic} from "../models/Topic";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-topic-create',
  standalone: true,
  imports: [
    MatToolbar,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatFabButton
  ],
  templateUrl: './topic-create.component.html',
  styleUrl: './topic-create.component.css'
})
export class TopicCreateComponent {

  readonly dialogRef = inject(MatDialogRef<TopicCreateComponent>);
  //readonly data = inject<Topic>(MAT_DIALOG_DATA);
  //readonly animal = model(this.data.name);

  onNoClick(): void {
    this.dialogRef.close();
  }

  //protected Topic = Topic;
}

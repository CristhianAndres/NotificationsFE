import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-privacy-and-security',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './privacy-and-security.component.html',
  styleUrl: './privacy-and-security.component.css'
})
export class PrivacyAndSecurityComponent {

}

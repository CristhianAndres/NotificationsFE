import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-privacy-and-security',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './privacy-and-security.component.html',
  styleUrl: './privacy-and-security.component.css'
})
export class PrivacyAndSecurityComponent {

}

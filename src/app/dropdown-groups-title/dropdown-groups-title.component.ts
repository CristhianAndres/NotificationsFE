import {Component, inject} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GroupService} from "../services/group.service";
import {Group} from "../models/Group";

@Component({
  selector: 'app-dropdown-groups-title',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown-groups-title.component.html',
  styleUrl: './dropdown-groups-title.component.css'
})
export class DropdownGroupsTitleComponent {
  private groupService = inject(GroupService);
  selectedGroup: any = {};
  groups : Group[] = [];
  title: any;

  constructor() {
    this.loadGroups();
  }
  loadGroups(): void {
    this.groupService.getGroups().subscribe(
      response => {
        this.groups = response;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }
}

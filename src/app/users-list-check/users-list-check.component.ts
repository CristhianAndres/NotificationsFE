import {ChangeDetectionStrategy, Component, computed, inject, Inject, signal} from '@angular/core';
import {FormBuilder, FormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {User} from "../models/User";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Group} from "../models/Group";

//User, Group service
import {UserService} from '../services/user.service';
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";

@Component({
  selector: 'app-users-list-check',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule],
  templateUrl: './users-list-check.component.html',
  styleUrl: './users-list-check.component.css'
})
export class UsersListCheckComponent {

  private userService = inject(UserService);
  users: User[] = [];
  belongsTo: UserBelongsToGroup[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public group: Group
  ) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  update(user: User, completed: boolean, index?: number) {
    if(completed){
      /*this.belongsTo.push({
        userId : user.id,
        groupId : '1'
      })*/
    }
  }

}

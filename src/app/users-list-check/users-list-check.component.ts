import {ChangeDetectionStrategy, Component, computed, inject, Inject, signal} from '@angular/core';
import {FormBuilder, FormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {User} from "../models/User";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Group} from "../models/Group";

//User, Group service
import {UserService} from '../services/user.service';
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";
import {MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-users-list-check',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, MatFabButton],
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

        if (this.group.members) {
          this.group.members.forEach(member => {
            const user = this.users.find((user: User) => {
              return user.id === member.user.id;
            });
            if (user) {
              user.completed = true; // Marca el campo completed como true
            }
          });
        }
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  update(user: User, completed: boolean, index?: number) {
    if (completed) {
      /*this.belongsTo.push({
        userId : user.id,
        groupId : '1'
      })*/
    }
  }

  saveUsers() {

  }

}

import {Component, Inject, inject} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFabButton} from "@angular/material/button";
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {Group} from "../models/Group";

@Component({
  selector: 'app-actors-list-check',
  standalone: true,
    imports: [
        MatCheckbox,
        MatFabButton
    ],
  templateUrl: './actors-list-check.component.html',
  styleUrl: './actors-list-check.component.css'
})
export class ActorsListCheckComponent {

  private userService = inject(UserService);
  users: User[] = [];
  readonly dialogRef = inject(MatDialogRef<ActorsListCheckComponent>);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public actors: User[]
  ) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;

        if (this.actors) {
          this.actors.forEach(actor => {
            const user = this.users.find((user: User) => {
              return user.id === actor.id;
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
      if(!this.actors){
        this.actors = [];
      }
      //asignar usuario a grupo
      if (this.actors) {
        //const userBelongstoGroup : UserBelongsToGroup = new UserBelongsToGroup(user);
        this.actors.push(user);
      }
    } else {
      //desasignar usuario a grupo
      let idToDeleted = user.id;

      if (this.actors) {
        const index = this.actors.findIndex(actorToDelete => actorToDelete.id === idToDeleted);
        if (index !== -1) {
          if(this.actors[index].id){
            //this.group.membersToDeleted?.push(this.group.members[index].id);
          }
          this.actors.splice(index, 1); // Elimina el elemento en el índice encontrado
        }
      }
    }
  }

  saveUsers() {
    this.dialogRef.close(this.actors);
  }
}

import {ChangeDetectionStrategy, Component, Inject, inject, model, signal, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogModule
} from '@angular/material/dialog';

import {DropdownGroupsTitleComponent} from '../dropdown-groups-title/dropdown-groups-title.component';
import {TextImagePostComponent} from '../text-image-post/text-image-post.component';
import {UsersListCheckComponent} from "../users-list-check/users-list-check.component";
import {ActorsListCheckComponent} from "../actors-list-check/actors-list-check.component";
import {User} from "../models/User";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Group} from "../models/Group";
import {Topic} from "../models/Topic";
import {UserService} from "../services/user.service";
import {TopicService} from "../services/topic.service";
import {TopicCreateComponent} from "../topic-create/topic-create.component";
import {MatInput} from "@angular/material/input";
import {Post} from "../models/Post";
import {FormsModule} from "@angular/forms";
import {PostsFollowedByUsers} from "../models/PostsFollowedByUsers";
import {MediaFile} from "../models/MediaFile";
import {PostService} from "../services/post.service";
import {Actor} from "../models/Actor";
import {HttpErrorResponse} from "@angular/common/http";
import {ActorService} from "../services/actor.service";
import {NotificationService} from "../services/notification.service";
import {Notification} from "../models/Notification";
import {ActionNotifiesToUser} from "../models/ActionNotifiesToUser";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, DropdownGroupsTitleComponent, TextImagePostComponent, MatIconModule, MatListModule, MatFormField, MatLabel, MatOption, MatSelect, MatInput, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {

  users: User[] = [];
  topics: Topic[] = [];
  actors: Actor[] = [];
  selectedTopic: any = {};
  selectedActor: any = {};
  newTopicText: any;
  newActorText: any;
  loginUserId = "";

  private topicService = inject(TopicService);
  private actorService = inject(ActorService);
  private postService = inject(PostService);
  private notificationService = inject(NotificationService);
  readonly dialogRefPost = inject(MatDialogRef<PostComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public user: any) {
    this.loadTopics();
    this.loadActors();
    this.loginUserId = user.loginUserId;
  }

  loadTopics() {
    this.topicService.getTopics().subscribe(
      response => {
        this.topics = response;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    )
  }

  loadActors() {
    this.actorService.getActors().subscribe(
      response => {
        this.actors = response;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    )
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(PostComponent, {
      data: {},
      width: '60%', // Ajusta el ancho según sea necesario
      height: '95%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onButtonClick(item: string) {
    console.log(`${item} fue clickeado!`);
  }

  openAddUsers(): void {
    const dialogRefUsersList = this.dialog.open(ActorsListCheckComponent, {
      data: this.users,
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '400px', // Puedes establecer un tamaño máximo
      maxHeight: '600px', // Puedes establecer un tamaño máximo
    });

    dialogRefUsersList.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.users = result;
      }
    });
  }

  onSelectChange() {
    if (this.selectedTopic !== undefined) {
      this.newTopicText = ''; // Vacía el input cuando el select tiene un valor diferente de undefined
    }
  }

  onTopicChange() {
    this.selectedTopic = undefined;
  }

  onSelectChangeActor() {
    if (this.selectedActor !== undefined) {
      this.newActorText = ''; // Vacía el input cuando el select tiene un valor diferente de undefined
    }
  }

  onActorChange() {
    this.selectedActor = undefined;
  }

  @ViewChild(DropdownGroupsTitleComponent) dropdownGroupsTitle!: DropdownGroupsTitleComponent;
  @ViewChild(TextImagePostComponent) textImagePostComponent!: TextImagePostComponent;
  savePosts() {
    console.log();
    const now = new Date();
    const title : string = this.dropdownGroupsTitle.title;
    //validacion de titulo, obligatorio
    if(!title){
      alert("Ingresar Titulo");
      return;
    }
    const info : string = this.textImagePostComponent.info;
    //validacion de comentario, obligatorio
    if(!info){
      alert("Ingresar Comentario");
      return;
    }
    //source
    const postedBy : User = {
      birthday: now,
      createAt: now,
      email: "",
      firstName: "",
      gender: "MALE",
      lastName: "",
      password: "",
      updateAt: now,
      userName: "",
      id : this.loginUserId
    }
    const belongsTo : Group = this.dropdownGroupsTitle.selectedGroup;
    //validacion de grupo, obligatorio
    if(!belongsTo?.id){
      alert("Seleccionar Grupo");
      return;
    }
    const actor : Actor = this.selectedActor ? this.selectedActor : {
      id : '',
      name : this.newActorText,
      createAt: now,
      updateAt: now
    };
    //validacion de actor, obligatorio
    if(!actor?.name){
      alert("Seleccionar o ingresar Actor");
      return;
    }

    const topic : Topic = this.selectedTopic ? this.selectedTopic : {
      id : '',
      name : this.newTopicText,
      createAt : now,
      updateAt : now
    };
    //validacion de actor, obligatorio
    if(!topic?.name){
      alert("Seleccionar o ingresar Topic");
      return;
    }

    let followedByUsers : PostsFollowedByUsers[] = [];
    let actionNotifiesToUsers : ActionNotifiesToUser[] = [];
    this.users.forEach(user => {
      let postsFollowedByUsers : PostsFollowedByUsers = {
        id: 'idTemp',
        postId : 'postIdTemp',
        userId : user.id
      };
      followedByUsers.push(postsFollowedByUsers)
      let actionNotifiesToUser : ActionNotifiesToUser = {
        id: "",
        notificationId: "",
        userId : user.id
      }
      actionNotifiesToUsers.push(actionNotifiesToUser);
    });
    /*let notificacion : Notification;
    notificacion.createBy?.id = this.loginUserId;
    notificacion.notifiesTo = actionNotifiesToUsers;*/
    this.postService.createPost({
      actorId: "", groupId: "", topicId: "", userId: "", id : "",
      createAt : now,
      updateAt : now,
      title : title,
      info : info,
      source : "INTERNET",
      postedBy : postedBy,
      belongsTo : belongsTo,
      actor : actor,
      topic : topic,
      // @ts-ignore
      followedBy : followedByUsers,
      // @ts-ignore
      mediafiles : this.textImagePostComponent.mediaFiles
    }).subscribe(
      (postCreated: any) => {
        console.log('got data', postCreated);
        this.notificationService.createNotification({
          activityType: "CREATE",
          actorId: actor.id,
          actorType: "USER",
          createAt: now,
          id: "",
          objectId: postCreated.data.createOnePost.id,
          objectType: "POST",
          seen: false,
          targetId: belongsTo.id,
          targetType: "GROUP",
          updateAt: now,
          userId: this.loginUserId,
          notifiesTo: actionNotifiesToUsers,
          // @ts-ignore
          createBy : {
            id : this.loginUserId
          }
        }).subscribe(
          data => {
            console.log('got data notification', data);
          },
          (error: HttpErrorResponse) => {
            console.log('there was an error sending the query', error);
          }
        )

        this.dialogRefPost.close();
      },
      (error: HttpErrorResponse) => {
        console.log('there was an error sending the query', error);
      }
    );
  }
}

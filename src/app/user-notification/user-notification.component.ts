import {ChangeDetectionStrategy, Component, inject, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {ConfigurationComponent} from "../configuration/configuration.component";
import {MatDialog} from "@angular/material/dialog";
import {Group} from "../models/Group";
import {GroupCommunicationService} from "../group-communication.service";
import {UserInformationComponent} from "../user-information/user-information.component";
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {PrivacyAndSecurityComponent} from "../privacy-and-security/privacy-and-security.component";
import {HelpTextComponent} from "../help-text/help-text.component";
import {AboutUsComponent} from "../about-us/about-us.component";
import {Post} from "../models/Post";
import {PostService} from "../services/post.service";
import {PostsFollowedByUsers} from "../models/PostsFollowedByUsers";
import {MatBadge} from "@angular/material/badge"; // Si estás usando formularios reactivos

@Component({
  selector: 'app-user-notification',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ReactiveFormsModule, MatMenuTrigger, MatMenu, RouterLink, CommonModule, MatBadge, MatMenuItem, MatBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css'
})

export class UserNotificationComponent implements OnInit {

  // Inyectando ChangeDetectorRef
  private cdr = inject(ChangeDetectorRef);

  readonly dialog = inject(MatDialog);
  users: User[] = [];
  //private userService = inject(UserService);
  @Input() loginUserId = ''; // Recibe el mensaje del padre
  allGroups: Group[] = []; // grupos que se cargaron en componente tree-group
  showConfigurationButton: boolean = false; // Cambia a false para ocultar el botón

  //private postService = inject(PostService);
  userPosts: Post[] = [];
  protected user: any;
  protected userNameLogin = "";
  protected notificationsNumber: number | undefined;

  constructor(private router: Router,
              private groupCommunicationService: GroupCommunicationService,
              private postService: PostService,
              private userService: UserService) {
    this.groupCommunicationService.allGroups$.subscribe(allGroups => {
      //this.loadPosts(this.loginUserId);
      this.allGroups = allGroups;

      this.allGroups.forEach(group => {
        if (group.admin?.id == this.loginUserId) {
          this.showConfigurationButton = true;
          return true;
        } else {
          return false;
        }
      });
    });
  }

  ngOnInit(): void {
    this.loadPosts(this.loginUserId);
  }

  logout() {
    this.router.navigate(['login']);
  }

  openConfiguration(): void {
    const dialogRef = this.dialog.open(ConfigurationComponent, {
      data: {},
      width: '100%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '1300px', // Puedes establecer un tamaño máximo
      maxHeight: '750px', // Puedes establecer un tamaño máximo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openMyProfile() {
    const dialogRef = this.dialog.open(UserInformationComponent, {
      //data: user,
      data: this.user,
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });

    /*},
    error => {
      console.error('Error al obtener datos', error);
    }
  );*/
  }

  openPrivacyAndSecurity() {
    const dialogRef = this.dialog.open(PrivacyAndSecurityComponent, {
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });
  }

  openHelp() {
    const dialogRef = this.dialog.open(HelpTextComponent, {
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });
  }

  openAboutUs() {
    const dialogRef = this.dialog.open(AboutUsComponent, {
      width: '90%', // Ajusta el ancho según sea necesario
      height: '100%', // Ajusta la altura según sea necesario
      maxWidth: '900px', // Puedes establecer un tamaño máximo
      maxHeight: '700px', // Puedes establecer un tamaño máximo
    });
  }

  loadPosts(data: any) {
    this.postService.getPosts().subscribe(
      response => {
        this.userPosts = response.reverse().filter((post: Post) =>
          post.followedBy?.some((postFBU: PostsFollowedByUsers) =>
            postFBU.userId === data)
        );
        this.notificationsNumber = this.userPosts.length;
        // Forzar la detección de cambios
        this.cdr.markForCheck(); // O this.cdr.detectChanges();

        //asignacion de usuario login
        this.userService.getUsers().subscribe(
          response => {
            this.users = response;
            this.user = this.users.find((user: User) => {
              return this.loginUserId === user.id;
            });
            this.userNameLogin = this.user.userName;
            // Forzar la detección de cambios aquí también si es necesario
            this.cdr.markForCheck(); // O this.cdr.detectChanges();
          },
          error => {
            console.error('Error al obtener datos', error);
          }
        );

      },
      error => {
        console.error('Error al obtener datos', error);
      });
  }
}

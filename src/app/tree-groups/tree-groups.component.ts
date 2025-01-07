import {ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlatTreeControl} from '@angular/cdk/tree';
import {GroupService} from "../services/group.service";
import {Group} from "../models/Group";
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";
import {MatToolbar} from "@angular/material/toolbar";
import {GroupCommunicationService} from "../group-communication.service";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatSuffix} from "@angular/material/form-field";
import {PostCommunicationService} from "../post-communication.service";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface GroupUserNode {
  name: string;
  members?: GroupUserNode[];
  id?: string;
  typeObject?: "GROUP" | "USER";
}
//declarando aqui el objeto const no se destruye, mantiene los valores cada vez que se vuelve a llamar al componente
//const TREE_DATA_GROUP_USERS: GroupUserNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  typeObject?: "GROUP" | "USER";
}

@Component({
  selector: 'app-tree-groups',
  templateUrl: './tree-groups.component.html',
  styleUrl: './tree-groups.component.css',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatToolbar, MatMenu, MatMenuTrigger, MatSuffix, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeGroupsComponent implements OnInit {
  private groupService = inject(GroupService);
  allGroups : Group[] = [];
  TREE_DATA_GROUP_USERS: GroupUserNode[] = [];

  private _transformer = (node: GroupUserNode, level: number) => {
    return {
      expandable: !!node.members && node.members.length > 0,
      name: node.name,
      level: level,
      typeObject: node.typeObject // Asegúrate de incluir esto
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.members
  );

  // @ts-ignore
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private groupCommunicationService : GroupCommunicationService,
              private postCommunicationService: PostCommunicationService) {
    //this.dataSource.data = TREE_DATA;
    this.loadGroups();
  }

  triggerUpdate() {
    this.postCommunicationService.notifyPostListUpdate("tree-groups");
  }

  ngOnInit(): void {
    //this.TREE_DATA_GROUP_USERS = []; // Reinicia el array aquí
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  loadGroups(): void {
    this.TREE_DATA_GROUP_USERS = []; // Reinicia el array aquí
    this.groupService.getGroups().subscribe(
      response => {
        //this.groups = response;
        //this.dataSource = this.groups; // Asigna los grupos al control del árbol
        let groups : Group[] = response;
        this.allGroups = groups;
        this.groupCommunicationService.setGroups(this.allGroups);
        groups.forEach((group: Group) => {
          let members : GroupUserNode[] = [];
          if(group.members) {
            group.members.forEach((member: UserBelongsToGroup) => {
              members.push({
                name: member.user?.firstName + ' ' + member.user?.lastName,
                id: member.user?.id,
                typeObject: "USER"
              })
            });
          }
          this.TREE_DATA_GROUP_USERS.push({
            name: group.name,
            members: members,
            id : group.id,
            typeObject: "GROUP"
          })
        });

        this.dataSource.data = this.TREE_DATA_GROUP_USERS;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  cargarPosts({$event, node}: { $event: MouseEvent, node: any }) {
    let group = this.TREE_DATA_GROUP_USERS.find((nodeGU: GroupUserNode) => {
      return node.name == nodeGU.name && nodeGU.typeObject == "GROUP";
    });
    this.postCommunicationService.notifyPostListUpdate(group?.id);
  }
}

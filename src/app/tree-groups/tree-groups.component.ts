import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlatTreeControl} from '@angular/cdk/tree';
import {GroupService} from "../services/group.service";
import {Group} from "../models/Group";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {group} from "@angular/animations";
import {UserBelongsToGroup} from "../models/UserBelongsToGroup";
import {MatToolbar} from "@angular/material/toolbar";

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

const TREE_DATA: GroupUserNode[] = [
  {
    name: 'Fruit',
    members: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    members: [
      {
        name: 'Green'
      },
      {
        name: 'Orange'
      },
    ],
  },
];

const TREE_DATA_GROUP_USERS: GroupUserNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree-groups',
  templateUrl: './tree-groups.component.html',
  styleUrl: './tree-groups.component.css',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatToolbar],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeGroupsComponent{
  private groupService = inject(GroupService);

  private _transformer = (node: GroupUserNode, level: number) => {
    return {
      expandable: !!node.members && node.members.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.members,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    //this.dataSource.data = TREE_DATA;
    this.loadGroups();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  loadGroups(): void {
    this.groupService.getGroups().subscribe(
      response => {
        //this.groups = response;
        //this.dataSource = this.groups; // Asigna los grupos al control del árbol
        let groups : Group[] = response;
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
          TREE_DATA_GROUP_USERS.push({
            name: group.name,
            members: members,
            id : group.id,
            typeObject: "GROUP"
          })
        });

        this.dataSource.data = TREE_DATA_GROUP_USERS;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  }

}

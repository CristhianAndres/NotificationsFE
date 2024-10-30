import {FlatTreeControl} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {GroupService} from "../services/group.service";
import {Group} from "../models/Group";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'View all',
  },
  {
    name: 'Group 1',
    children: [{name: 'Post'}, {name: 'People'}],
  },
  {
    name: 'Group 2',
    children: [{name: 'Post'}, {name: 'People'}],
  },
  {
    name: 'Group 3',
    children: [{name: 'Post'}, {name: 'People'}],
  },
];

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
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeGroupsComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
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
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.loadGroups();

    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  private groupService = inject(GroupService);
  groups: Group[] = []

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

import { Component, ViewChild } from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';

export interface User {
  name: string;
  email: string;
  userName: string;
  birthday: string;
  gender: string;
  role: string;
  action: string;
}

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatToolbarModule, MatGridListModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {

  users : User[] = [
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', action: ''},
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', action: ''},
        { name: 'Carlos Garcia', email: 'example@example.com', userName: 'agarcia',
          birthday: '12-01-1992', gender: 'Male', role: 'admin', action: ''}
    ];

  displayedColumns: string[] = ['name', 'email', 'userName', 'birthday', 'gender', 'role', 'action'];
    dataSource = [...this.users];

    @ViewChild(MatTable) table!: MatTable<User>;

  openDialogUser(): void {

        };
  openDialogActor(): void {

          };
  openDialogTopic(): void {

          };
  openDialogGroup(): void {

          };
}

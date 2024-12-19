import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {NewsFeedComponent} from "./news-feed/news-feed.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
    //loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'news/:login/:id',
    component: NewsFeedComponent
    //loadComponent: ()  => import('./news-feed/news-feed.component').then(m => m.NewsFeedComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }
];

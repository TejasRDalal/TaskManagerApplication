import { Routes } from '@angular/router';
import { Createtask } from './createtask/createtask';
import { Dashboard } from './dashboard/dashboard';
import { Viewall } from './viewall/viewall';
import { Add } from './role/add/add';
import { View } from './role/view/view';
import { AddUser } from './user/add-user/add-user';
import { ViewUser } from './user/view-user/view-user';

export const routes: Routes = [
    { path: 'create', component: Createtask },
    { path: 'dashboard', component: Dashboard },
    { path: 'viewall', component: Viewall },
    {
    path: 'role',
    children: [
      { path: 'add', component: Add },
      { path: 'view', component: View }
    ]
  },

  {
    path: 'user',
    children: [
      { path: 'add', component: AddUser },
      { path: 'view', component: ViewUser }
    ]
  }


];

import { Routes } from '@angular/router';
import { Createtask } from './createtask/createtask';
import { Dashboard } from './dashboard/dashboard';
import { Viewall } from './viewall/viewall';

export const routes: Routes = [
    { path: 'create', component: Createtask },
    { path: 'dashboard', component: Dashboard },
    { path: 'viewall', component: Viewall }
];

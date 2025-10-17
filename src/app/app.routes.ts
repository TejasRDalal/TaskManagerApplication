import { Routes } from '@angular/router';
import { Createtask } from './createtask/createtask';
import { Dashboard } from './dashboard/dashboard';
import { Viewall } from './viewall/viewall';
import { Add } from './role/add/add';
import { View } from './role/view/view';

export const routes: Routes = [
    { path: 'create', component: Createtask },
    { path: 'dashboard', component: Dashboard },
    { path: 'viewall', component: Viewall },
    { path: 'role/add', component: Add },
    { path: 'role/view', component: View }

];

import { Routes } from "@angular/router";
import { Fatherdashboard } from "./features/fatherdashboard/fatherdashboard";
import { Login } from "./features/login/login";
import { Main } from "./features/main/main";
import { Motherdashboard } from "./features/motherdashboard/motherdashboard";
import { Navbar } from "./features/navbar/navbar";
import { FEvents } from "./features/f-events/f-events";
import { MEvents } from "./features/m-events/m-events";
import { Add } from "./features/motherdashboard/add/add";
import {ManageusersM } from "./features/manageusers/manageusersm";
import { AddF } from "./features/fatherdashboard/add/add";
import { Status } from "./features/status/status";
import { ManageuserF } from "./features/manageuserf/manageuserf";
import {EditM } from "./features/manageusers/editm/edit";
import { EditF } from "./features/manageuserf/editf/edit";
import { Profile } from "./features/profile/profile";
import { Calendar } from "./features/calendar/calendar";

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: Navbar,
    children: [

      { path: 'father/dashboard', component: Fatherdashboard },
       { path: 'father/add', component: AddF },
    //  { path: 'father/calendar', component: CalendarF },
      { path: 'father/users', component: ManageuserF },
      { path: 'mother/dashboard', component: Motherdashboard },
     { path: 'mother/add', component: Add },
      { path: 'mother/users', component: ManageusersM },
   //  { path: 'mother/calendar', component: CalendarM },
     {path: 'edit/:id',component: EditM},
     {path: 'editf/:id',component: EditF},
      { path: 'import', component: Main },
      {path:'father/events',component:FEvents},
      {path:'mother/events',component:MEvents},
      {path:'calendar',component:Calendar},
       { path: 'status', component: Status },
      { path: 'profile', component: Profile }


    ]
  }

];
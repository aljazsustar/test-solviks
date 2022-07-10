import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./guards/auth-guard";
import {LoginComponent} from "./login/login.component";
import {LogsComponent} from "./logs/logs.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'logs/:id', component: LogsComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards';

import {
    LoginComponent,
    UsernameComponent,
    RegisterComponent,
    DashboardComponent,
    HeroesComponent
} from './components/';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'username', component: UsernameComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouter { }

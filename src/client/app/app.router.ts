import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/_';

import {
    LoginComponent,
    ForgotPasswordComponent,
    UsernameComponent,
    RegisterComponent,
    DashboardComponent,
    HeroesComponent
} from './components/_';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpass', component: ForgotPasswordComponent },
    { path: 'username', component: UsernameComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouter { }

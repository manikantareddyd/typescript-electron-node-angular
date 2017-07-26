import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDialogModule} from '@angular/material';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { UsernameComponent } from './components/username/username.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroService } from './services/hero.service';
import { AuthService } from './services/auth.service';

import { AppRouter } from './app.router';
import { MaterialModule } from './modules/material.module';
import 'hammerjs';
import { AuthGuard } from './_guards/auth.guard';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRouter,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    LoginComponent,
    UsernameComponent,
    RegisterComponent,
    HeroesComponent
  ],
  entryComponents: [
    HeroDetailComponent
  ],
  providers: [
    HeroService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

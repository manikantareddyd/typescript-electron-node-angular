import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDialogModule} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

import {
    AppComponent,
    LoginComponent,
    UsernameComponent,
    RegisterComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent
} from './components/';

import {
    HeroService,
    AuthService
} from './services';

import { AppRouter } from './app.router';

import { 
  MaterialModule 
} from './modules';

import { 
  AuthGuard 
} from './_guards';

import 'hammerjs';


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
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

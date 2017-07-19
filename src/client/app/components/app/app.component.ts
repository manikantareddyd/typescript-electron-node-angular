import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({ 
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Harambe 9.0';
  public username: string = null;

  constructor(private authService: AuthService, private router: Router){
    this.setUsername();
  }

  private setUsername(){
    this.username = this.authService.getAuthdetails()["username"];
  }

  public logout(){
    this.authService.logout();
  }
}

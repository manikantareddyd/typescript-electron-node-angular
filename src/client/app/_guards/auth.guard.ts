import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    let auth_details = this.authService.getAuthdetails();
    if(auth_details["id"]){
      if(auth_details["username"])
        return true;
      else
      {
        this.router.navigate(['username']);
        return false;
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
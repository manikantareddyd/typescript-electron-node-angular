import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/_';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        let cookies = this.authService.getAuthdetails();
        if (cookies["password-reset"] == "1") {
            console.log("Rsetting password");
            this.router.navigate(["password-reset"]);
            return false;
        }
        if (cookies["id"]) {
            if (cookies["username"])
                return true;
            else {
                this.router.navigate(['username']);
                return false;
            }
        }
        this.router.navigate(['login']);
        return false;
    }
}
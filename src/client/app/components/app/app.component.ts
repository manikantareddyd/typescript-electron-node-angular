import { Component } from '@angular/core';
import { AuthService } from '../../services/_';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Tour of Heroes 2.0';
    public id: string = null;
    public cookie = {};


    constructor(private authService: AuthService, private router: Router, public snackBar: MdSnackBar) {
        this.id = this.authService.cookieService.get("id");
        let message = this.authService.cookieService.get("snackbar-message");
        if (message) {
            this.authService.cookieService.delete("snackbar-message");
            this.snackBar.open(message, "", {
                duration: 5000
            });
        }
    }



    public logout() {
        this.authService.logout();
    }
}

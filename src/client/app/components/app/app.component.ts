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
    public passwordResetMessage = "";
    constructor(private authService: AuthService, private router: Router, public snackBar: MdSnackBar) {
        this.id = this.authService.getAuthdetails()["id"];
        this.passwordResetMessage = this.authService.getAuthdetails()["password-reset-message"];
        if (this.passwordResetMessage) {
            this.authService.cookieService.delete("password-reset-message");
            this.snackBar.open(this.passwordResetMessage, "", {
                duration: 5000
            });
        }
    }



    public logout() {
        this.authService.logout();
    }
}

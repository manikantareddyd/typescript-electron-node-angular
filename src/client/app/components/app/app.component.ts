import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Tour of Heroes 2.0';
    public id: string = null;

    constructor(private authService: AuthService, private router: Router) {
        this.setId();
    }

    private setId() {
        this.id = this.authService.getAuthdetails()["id"];
    }

    public logout() {
        this.authService.logout();
    }
}

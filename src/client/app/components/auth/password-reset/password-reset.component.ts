import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/_';
import { Router } from '@angular/router';
import { User } from '../../../classes/_';
@Component({
    selector: 'my-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
    public user = new User();
    public message: string;
    public success = 1;
    public cookie = {};
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.cookie = this.authService.getAuthdetails();
        this.authService.deleteAuthDetails();
        console.log(this.router.url);
    }
    public onSubmit() {
        console.log(this.user.username, this.user.password);
        this.authService.login(this.user.username, this.user.password)
            .then(success => {
                this.success = success;
                if (success)
                    location.reload();
                else
                    this.message = "Incorrect username or password";
            });
    }

}

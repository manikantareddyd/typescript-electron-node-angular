import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/_';
import { Router } from '@angular/router';
import { User } from '../../../classes/_';
@Component({
    selector: 'my-forgotpassword',
    templateUrl: './fp.component.html',
    styleUrls: ['./fp.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    public user = new User();
    public message: string;
    public success = 1;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
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

    public goToRegister() {
        console.log("Register Clicked");
        this.router.navigate(["register"]);
    }

    public gotoFacebook() {
        console.log("Facebook clicked");
        this.authService.facebook(null)
            .then(success => {
                if (success == 3) {
                    this.success = 0;
                    this.message = "Facebook account already linked with someone else!"
                }
                else if (success == 1) {
                    this.success = 1;
                    location.reload();
                }
                else {
                    this.success = 0;
                    this.message = "hey ram"
                }

            });
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/_';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../classes/_';
@Component({
    selector: 'my-username',
    templateUrl: './username.component.html',
    styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
    public user = new User();
    public message: string;
    public success = 1;
    title: string;
    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.route.snapshot.data['forgotpassword']) {
            this.title = "Enter Your Usernamedssx";
        }
        else {
            this.title = "Choose a username";
        }
    }

    public onSubmit() {
        console.log(this.user.username);
        if (this.route.snapshot.data['forgotpassword']) {
            this.title = "Enter Your Username";
            this.authService.forgotPassword(this.user.username);
            this.success = 0;
            this.message = "If the Username exists in our System, an Email will be sent to the registered Email Id. Click on the Password Reset Link in it. You may now close this window.";
        }
        else {
            this.title = "Choose a username";
            this.authService.updateUsername(this.user.username)
                .then(success => {
                    this.success = success;
                    if (success)
                        location.reload();
                    else
                        this.message = "Username in use, try a different one";
                });
        }
    }

}

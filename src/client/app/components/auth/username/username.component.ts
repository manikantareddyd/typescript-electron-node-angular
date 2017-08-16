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
    public forgotpass = 0;
    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.forgotpass = localStorage.getItem("forgotpass") == "true" ? 1 : 0;
        if (this.forgotpass) {
            this.title = "Enter Your Username";
            localStorage.removeItem("forgotpass");
        }
        else {
            this.title = "Choose a username";
        }
    }

    public onSubmit() {
        console.log(this.user.username);
        if (this.forgotpass) {
            this.authService.forgotPassword(this.user.username);
            this.success = 0;
        }
        else {
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

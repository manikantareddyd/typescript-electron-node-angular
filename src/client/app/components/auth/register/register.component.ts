import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';
import { User } from '../../../classes';
@Component({
    selector: 'my-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public user = new User();
    public message: string;
    public success = 1;
    constructor(private authService: AuthService) { }

    ngOnInit(): void {

    }

    public onSubmit() {
        console.log("Register", this.user.username, this.user.password)
        this.authService.register(this.user.username, this.user.password)
            .then(success => {
                if (success) {
                    this.success = success;
                    location.reload();
                }
                else {
                    this.success = 0;
                    this.message = "User Already Registered";
                }

            });
    }
}

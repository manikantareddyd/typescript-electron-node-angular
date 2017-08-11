import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/_';
import { Router } from '@angular/router';
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
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {

    }

    public onSubmit() {
        console.log(this.user.username);
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

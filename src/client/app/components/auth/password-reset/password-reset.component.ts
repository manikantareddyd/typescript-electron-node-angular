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
    public model = {
        password: "",
        pin: ""
    };
    public message: string;
    public success = 1;
    public cookie = {};
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {

    }
    public onSubmit() {
        console.log(this.model.password, this.model.pin);
        this.authService.resetPassword(this.model.pin, this.model.password)
            .then(success => {
                location.reload();
            });
    }

}

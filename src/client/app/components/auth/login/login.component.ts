import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/_';
import { Router } from '@angular/router';
import { User } from '../../../classes/_';
@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public user = new User();
    public message: string;
    public success = 1;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {

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

    public forgotPassword() {
        localStorage.setItem("forgotpass", "true");
        this.router.navigate(["forgotpass"]);
    }

    public goToRegister() {
        console.log("Register Clicked");
        this.router.navigate(["register"]);
    }


}

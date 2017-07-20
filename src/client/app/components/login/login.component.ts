import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public message: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  public onSubmit(){
    console.log(this.username, this.password);
    this.authService.login(this.username, this.password)
    .then(success=>{
      if(success)
        location.reload();
      else
        this.message = "Incorrect username or password";
    });
  }

  public goToRegister(){
    console.log("Register Clicked");
    this.router.navigate(["register"]);
  }
}
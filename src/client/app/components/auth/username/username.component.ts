import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';
@Component({
  selector: 'my-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  public username: string;
  public message: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  public onSubmit(){
    console.log(this.username);
    this.authService.updateUsername(this.username)
    .then(success => {
      if(success)
        location.reload();
      else
        this.message = "Username in use, try a different one";
    });
  }

  public goToRegister(){
    console.log("Register Clicked");
    this.router.navigate(["register"]);
  }
}

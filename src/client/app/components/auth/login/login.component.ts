import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services';
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

  public gotoFacebook(){
    console.log("Facebook clicked");
    this.authService.facebook(null)
    .then(success=>{
      if(success==3){
        this.message = "Facebook account already linked with someone else!"
      }
      else if(success==1){
        location.reload();
      }
      else{
        this.message ="hey ram"
      }
      
    });
  }
}

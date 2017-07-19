import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
public username: string;
  public password: string;
  public message: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  public onSubmit(){
    console.log("Register", this.username, this.password)
    this.authService.register(this.username, this.password)
    .then(success=>{
      if(success)
        location.reload();
      else
        this.message = "User Already Registered";
    });;
  }
}

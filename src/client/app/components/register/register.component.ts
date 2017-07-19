import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
public username: string;
  public password: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  public onSubmit(){
    console.log("Register", this.username, this.password)
    this.authService.register(this.username, this.password);
  }
}
